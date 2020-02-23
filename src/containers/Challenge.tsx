import React from 'react';
import { Main } from '../components/Main';
import { Side } from '../components/Side';
import { useFilters } from '../services/filters';
import { ETLData } from '../types';
import './Challenge.css';

interface Props {
  data: ETLData[];
}

export function Challenge(props: Props) {
  const state = useFilters(props.data);

  return (
    <div className="challenge__wrapper">
      <Side
        dataSources={state.allDataSources}
        campaigns={state.allCampaigns}
        selectedCampaigns={state.selectedCampaigns}
        selectedDataSources={state.selectedDataSources}
        onToggleCampaign={state.toggleCampaign}
        onToggleDataSource={state.toggleDataSource}
      />

      <Main data={state.filteredData} />
    </div>
  );
}
