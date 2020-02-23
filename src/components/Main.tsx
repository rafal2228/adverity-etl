import { Card } from '@blueprintjs/core';
import React from 'react';
import { ETLData } from '../types';
import './Main.css';

interface Props {
  data: ETLData[];
}

export function Main(props: Props) {
  return <Card className="main__card"></Card>;
}
