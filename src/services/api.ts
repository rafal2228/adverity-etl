import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants';
import { ETLData } from '../types';

function loadETL() {
  const source = axios.CancelToken.source();

  const req = axios.get<ETLData[]>(API_URL, {
    cancelToken: source.token
  });

  return {
    req,
    cancel: source.cancel
  };
}

interface State {
  data: ETLData[];
  pending: boolean;
  failed: boolean;
}

export function useETL() {
  const [state, setState] = useState<State>({
    data: [],
    pending: true,
    failed: false
  });

  useEffect(() => {
    const { req, cancel } = loadETL();

    req.then(
      res => {
        setState({
          data: res.data,
          pending: false,
          failed: false
        });
      },
      () => {
        setState({
          data: [],
          pending: false,
          failed: true
        });
      }
    );

    return () => {
      if (!state.pending) {
        return;
      }

      cancel('Component unmounted');
    };
    // eslint-disable-next-line
  }, []);

  return state;
}
