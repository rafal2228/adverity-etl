import { concat, filter, includes, map, uniq, reduce } from 'lodash-es';
import { useCallback, useMemo, useState } from 'react';
import { ETLData, AggregatedData } from '../types';

function toggleElement(arr: string[], element: string) {
  return includes(arr, element)
    ? filter(arr, e => e !== element)
    : concat(arr, element);
}

function getAllCampaigns(data: ETLData[]) {
  return uniq(map(data, 'campaign'));
}

function filterDataByCampaigns(data: ETLData[], campaigns: string[]) {
  if (campaigns.length < 1) {
    return data;
  }

  return filter(data, record => campaigns.includes(record.campaign));
}

function getAllDataSources(data: ETLData[]) {
  return uniq(map(data, 'dataSource'));
}

function filterDataByDataSource(data: ETLData[], dataSources: string[]) {
  if (dataSources.length < 1) {
    return data;
  }

  return filter(data, record => dataSources.includes(record.dataSource));
}

function aggregateByDate(data: ETLData[]): AggregatedData[] {
  return Object.values(
    reduce(
      data,
      (accumulator, record) => {
        if (!accumulator[record.date]) {
          accumulator[record.date] = {
            date: record.date,
            clicks: record.clicks ?? 0,
            impressions: record.impressions ?? 0
          };

          return accumulator;
        }

        accumulator[record.date].clicks += record.clicks ?? 0;
        accumulator[record.date].impressions += record.impressions ?? 0;

        return accumulator;
      },
      {} as Record<string, AggregatedData>
    )
  );
}

export function useFilters(data: ETLData[]) {
  // Campaigns
  const allCampaigns = useMemo(() => getAllCampaigns(data), [data]);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);

  const toggleCampaign = useCallback(
    (campaign: string) =>
      setSelectedCampaigns(toggleElement(selectedCampaigns, campaign)),
    [selectedCampaigns, setSelectedCampaigns]
  );

  // DataSources
  const allDataSources = useMemo(() => getAllDataSources(data), [data]);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

  const toggleDataSource = useCallback(
    (dataSource: string) =>
      setSelectedDataSources(toggleElement(selectedDataSources, dataSource)),
    [selectedDataSources, setSelectedDataSources]
  );

  const aggregatedData = aggregateByDate(
    filterDataByCampaigns(
      filterDataByDataSource(data, selectedDataSources),
      selectedCampaigns
    )
  );

  return {
    allCampaigns,
    selectedCampaigns,
    toggleCampaign,
    allDataSources,
    selectedDataSources,
    toggleDataSource,
    aggregatedData
  };
}
