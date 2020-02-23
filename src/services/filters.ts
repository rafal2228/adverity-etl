import { concat, filter, includes, map, uniq } from 'lodash-es';
import { useCallback, useMemo, useState } from 'react';
import { ETLData, FilterOption } from '../types';

export function toggleElement(arr: string[], element: string) {
  return includes(arr, element)
    ? filter(arr, e => e !== element)
    : concat(arr, element);
}

export function getAllCampaigns(data: ETLData[]) {
  return uniq(map(data, 'campaign'));
}

export function filterDataByCampaigns(data: ETLData[], campaigns: string[]) {
  if (campaigns.length < 1) {
    return data;
  }

  return filter(data, record => campaigns.includes(record.campaign));
}

export function getAllDataSources(data: ETLData[]) {
  return uniq(map(data, 'dataSource'));
}

export function filterDataByDataSource(data: ETLData[], dataSources: string[]) {
  if (dataSources.length < 1) {
    return data;
  }

  return filter(data, record => dataSources.includes(record.dataSource));
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

  const campaigns: FilterOption[] = map(allCampaigns, campaign => ({
    label: campaign,
    checked: includes(selectedCampaigns, campaign)
  }));

  // DataSources
  const allDataSources = useMemo(() => getAllDataSources(data), [data]);
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>([]);

  const toggleDataSource = useCallback(
    (dataSource: string) =>
      setSelectedDataSources(toggleElement(selectedDataSources, dataSource)),
    [selectedDataSources, setSelectedDataSources]
  );

  const dataSources: FilterOption[] = map(allDataSources, dataSource => ({
    label: dataSource,
    checked: includes(selectedDataSources, dataSource)
  }));

  const filteredData = filterDataByCampaigns(
    filterDataByDataSource(data, selectedDataSources),
    selectedCampaigns
  );

  return {
    campaigns,
    toggleCampaign,
    dataSources,
    toggleDataSource,
    filteredData
  };
}
