import React from 'react';
import { CenterMessage } from '../components/CenterMessage';
import { useETL } from '../services/api';
import { Challenge } from './Challenge';

export function Setup() {
  const state = useETL();

  if (state.pending) {
    return <CenterMessage>Loading ...</CenterMessage>;
  }

  if (state.failed) {
    return (
      <CenterMessage>Load failed, make sure to run "yarn mock"</CenterMessage>
    );
  }

  return <Challenge data={state.data} />;
}
