import { Typography } from '@rmwc/typography';
import React, { FC } from 'react';
import './CenterMessage.css';

export const CenterMessage: FC = props => {
  return (
    <div className="center-message__wrapper">
      <Typography use="headline4">{props.children}</Typography>
    </div>
  );
};
