import React from 'react';
import './Main.css';
import { Typography } from '@rmwc/typography';

interface Props {
  dataSourceNames?: string[];
  campaignNames?: string[];
}

export function Main(props: Props) {
  return (
    <div className="main__wrapper">
      <Typography use="caption">Selected data sources:</Typography>
      {!!props.dataSourceNames?.length
        ? props.dataSourceNames.join(', ')
        : 'All'}

      <br />

      <Typography use="caption">Selected data sources:</Typography>
      {!!props.campaignNames?.length ? props.campaignNames.join(', ') : 'All'}
    </div>
  );
}
