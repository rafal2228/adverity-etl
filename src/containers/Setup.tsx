import React from 'react';
import { CenterMessage } from '../components/CenterMessage';
import { useETL } from '../services/api';
import { Challenge } from './Challenge';
import { Intent, Code } from '@blueprintjs/core';

export function Setup() {
  const state = useETL();

  if (state.pending) {
    return <CenterMessage intent={Intent.NONE}>Loading ...</CenterMessage>;
  }

  if (state.failed) {
    return (
      <CenterMessage intent={Intent.WARNING}>
        Load failed, make sure to run <Code>yarn mock</Code>
      </CenterMessage>
    );
  }

  return <Challenge data={state.data} />;
}
