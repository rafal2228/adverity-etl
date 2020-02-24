import { act, renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import { API_URL } from '../constants';
import { useETL } from './api';

jest.mock('axios', () => {
  const source = {
    token: {},
    cancel: jest.fn()
  };

  return {
    CancelToken: {
      source() {
        return source;
      }
    },
    get: jest.fn().mockReturnValue(Promise.resolve({ data: [] }))
  };
});

const mockAxios = (axios as unknown) as {
  get: jest.Mock;
  CancelToken: {
    source(): {
      token: {};
      cancel: jest.Mock;
    };
  };
};

describe('API Service', () => {
  beforeEach(() => {
    mockAxios.get.mockClear();

    const source = mockAxios.CancelToken.source();
    source.cancel.mockClear();
  });

  it('should make http request on first render', async () => {
    const result = renderHook(() => useETL());

    await act(async () => {
      await result.waitForNextUpdate();
    });

    expect(mockAxios.get.mock.calls[0][0]).toBe(API_URL);
    expect(mockAxios.get.mock.calls[0][1]).toHaveProperty('cancelToken');
  });

  it('should change default pending state', async () => {
    const result = renderHook(() => useETL());

    expect(result.result.current.pending).toBe(true);

    await act(async () => {
      await result.waitForNextUpdate();
    });

    expect(result.result.current.pending).toBe(false);
  });

  it('should set failed flag on request error', async () => {
    mockAxios.get.mockImplementation(() => Promise.reject());

    const result = renderHook(() => useETL());

    expect(result.result.current.failed).toBe(false);

    await act(async () => {
      await result.waitForNextUpdate();
    });

    expect(result.result.current.failed).toBe(true);
  });

  it('should call token cancel method on hook unregister', async () => {
    mockAxios.get.mockImplementation(() => new Promise(() => {}));
    const source = mockAxios.CancelToken.source();
    const result = renderHook(() => useETL());

    expect(source.cancel).not.toBeCalled();

    await act(async () => {
      result.unmount();
    });

    expect(source.cancel).toBeCalled();
  });
});
