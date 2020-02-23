import { H4 } from '@blueprintjs/core';
import React, { FC } from 'react';
import './CenterMessage.css';

export const CenterMessage: FC = props => {
  return (
    <div className="center-message__wrapper">
      <H4>{props.children}</H4>
    </div>
  );
};
