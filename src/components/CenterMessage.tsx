import { Callout, Intent } from '@blueprintjs/core';
import React, { FC } from 'react';
import './CenterMessage.css';

interface Props {
  intent: Intent;
}

export const CenterMessage: FC<Props> = props => {
  return (
    <div className="center-message__wrapper">
      <Callout intent={props.intent}>{props.children}</Callout>
    </div>
  );
};
