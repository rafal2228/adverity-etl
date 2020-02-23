import { Checkbox } from '@rmwc/checkbox';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@rmwc/drawer';
import { Typography } from '@rmwc/typography';
import React from 'react';
import { FilterOption } from '../types';
import './Side.css';

interface Props {
  campaigns: FilterOption[];
  dataSources: FilterOption[];
  onToggleCampaign(campaign: string): void;
  onToggleDataSource(dataSource: string): void;
}

export function Side(props: Props) {
  return (
    <Drawer>
      <DrawerHeader>
        <DrawerTitle>Filter dimension values</DrawerTitle>
      </DrawerHeader>
      <DrawerContent className="side__content">
        <Typography use="caption">Data source:</Typography>
        {props.dataSources.map(dataSource => (
          <Checkbox
            key={dataSource.label}
            checked={dataSource.checked}
            label={dataSource.label}
            onChange={() => props.onToggleDataSource(dataSource.label)}
          />
        ))}
        <br />
        <Typography use="caption">Campaign:</Typography>
        {props.campaigns.map(campaign => (
          <Checkbox
            key={campaign.label}
            checked={campaign.checked}
            label={campaign.label}
            onChange={() => props.onToggleCampaign(campaign.label)}
          />
        ))}
      </DrawerContent>
    </Drawer>
  );
}
