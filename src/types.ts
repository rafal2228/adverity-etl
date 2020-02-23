export interface ETLData {
  date: Date;
  dataSource: string;
  campaign: string;
  clicks: number;
  impressions: number;
}

export interface FilterOption {
  label: string;
  checked: boolean;
}
