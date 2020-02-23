export interface ETLData {
  date: string;
  dataSource: string;
  campaign: string;
  clicks: number;
  impressions: number;
}

export interface AggregatedData {
  date: string;
  clicks: number;
  impressions: number;
}
