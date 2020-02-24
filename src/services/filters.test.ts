import { ETLData, AggregatedData } from '../types';
import { act, renderHook } from '@testing-library/react-hooks';
import { useFilters } from './filters';

const data: ETLData[] = [
  {
    campaign: 'first',
    clicks: 10,
    dataSource: 'google',
    date: '22.02.2020',
    impressions: 20
  },
  {
    campaign: 'second',
    clicks: 10,
    dataSource: 'adobe',
    date: '22.02.2020',
    impressions: 20
  },
  {
    campaign: 'third',
    clicks: 10,
    dataSource: 'google',
    date: '23.02.2020',
    impressions: 20
  },
  {
    campaign: 'fourth',
    clicks: 10,
    dataSource: 'adobe',
    date: '23.02.2020',
    impressions: 20
  }
];

const fullAggregatedData: AggregatedData[] = [
  {
    date: '22.02.2020',
    clicks: 20,
    impressions: 40
  },
  {
    date: '23.02.2020',
    clicks: 20,
    impressions: 40
  }
];

describe('Filters Service', () => {
  it('Should return all campaigns and datasources', () => {
    const result = renderHook(() => useFilters(data));

    expect(result.result.current.allCampaigns).toEqual([
      'first',
      'second',
      'third',
      'fourth'
    ]);

    expect(result.result.current.allDataSources).toEqual(['google', 'adobe']);
  });

  it('Should return aggregated data for full set', () => {
    const result = renderHook(() => useFilters(data));

    expect(result.result.current.aggregatedData).toEqual(fullAggregatedData);
  });

  it('should select google as only data source', () => {
    const result = renderHook(() => useFilters(data));

    act(() => {
      result.result.current.toggleDataSource('google');
    });

    expect(result.result.current.selectedDataSources).toEqual(['google']);
    expect(result.result.current.aggregatedData).toEqual([
      {
        date: '22.02.2020',
        clicks: 10,
        impressions: 20
      },
      {
        date: '23.02.2020',
        clicks: 10,
        impressions: 20
      }
    ]);
  });

  it('should select third as campaign', () => {
    const result = renderHook(() => useFilters(data));

    act(() => {
      result.result.current.toggleCampaign('third');
    });

    expect(result.result.current.selectedCampaigns).toEqual(['third']);
    expect(result.result.current.aggregatedData).toEqual([
      {
        date: '23.02.2020',
        clicks: 10,
        impressions: 20
      }
    ]);
  });

  it('It should show full set after untoggling element', () => {
    const result = renderHook(() => useFilters(data));

    act(() => {
      result.result.current.toggleCampaign('third');
    });

    act(() => {
      result.result.current.toggleCampaign('third');
    });

    expect(result.result.current.selectedCampaigns).toEqual([]);
    expect(result.result.current.aggregatedData).toEqual(fullAggregatedData);
  });
});
