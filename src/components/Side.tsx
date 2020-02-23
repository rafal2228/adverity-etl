import { Card, H3, H5, MenuItem } from '@blueprintjs/core';
import { ItemRenderer, MultiSelect } from '@blueprintjs/select';
import React from 'react';
import './Side.css';

const renderItem: ItemRenderer<string> = (value, props) => {
  if (!props.modifiers.matchesPredicate) {
    return null;
  }

  return (
    <MenuItem
      onClick={props.handleClick}
      key={value}
      active={props.modifiers.active}
      disabled={props.modifiers.disabled}
      text={value}
    />
  );
};

const renderString = (value: string) => value;

const noResults = <MenuItem disabled={true} text="No results." />;

const initialContent = (
  <MenuItem disabled={true} text="Start typing campaign name..." />
);

const matchStrings = (query: string, value: string) =>
  value.toLowerCase().includes(query.toLowerCase());

interface Props {
  campaigns: string[];
  selectedCampaigns: string[];
  dataSources: string[];
  selectedDataSources: string[];
  onToggleCampaign(campaign: string): void;
  onToggleDataSource(dataSource: string): void;
}

export function Side(props: Props) {
  return (
    <Card>
      <H3>Filter dimension values</H3>

      <div className="side__content">
        <H5>Data source:</H5>
        <MultiSelect
          items={props.dataSources}
          selectedItems={props.selectedDataSources}
          onItemSelect={props.onToggleDataSource}
          itemRenderer={renderItem}
          tagRenderer={renderString}
          fill={true}
          itemPredicate={matchStrings}
          tagInputProps={{
            onRemove(dataSource) {
              props.onToggleDataSource(dataSource);
            }
          }}
          noResults={noResults}
        />
        <br />
        <H5>Campaign:</H5>
        <MultiSelect
          items={props.campaigns}
          selectedItems={props.selectedCampaigns}
          onItemSelect={props.onToggleCampaign}
          itemRenderer={renderItem}
          tagRenderer={renderString}
          fill={true}
          itemPredicate={matchStrings}
          initialContent={initialContent}
          tagInputProps={{
            onRemove(campaign) {
              props.onToggleCampaign(campaign);
            }
          }}
          noResults={noResults}
        />
      </div>
    </Card>
  );
}
