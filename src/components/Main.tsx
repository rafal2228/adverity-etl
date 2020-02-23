import { Card } from '@blueprintjs/core';
import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { AggregatedData } from '../types';
import './Main.css';

interface Props {
  data: AggregatedData[];
}

export function Main(props: Props) {
  return (
    <Card className="main__card">
      <ResponsiveContainer aspect={16 / 9}>
        <LineChart
          data={props.data}
          margin={{ top: 20, right: 40, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickSize={20}
            minTickGap={20}
            tickFormatter={(date: string) => date.substr(0, 5)}
          />
          <YAxis
            type="number"
            orientation="left"
            dataKey="impressions"
            yAxisId="impressions"
          />
          <YAxis
            type="number"
            orientation="right"
            dataKey="clicks"
            yAxisId="clicks"
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            yAxisId="impressions"
            dataKey="impressions"
            stroke="#82ca9d"
          />
          <Line
            type="monotone"
            yAxisId="clicks"
            dataKey="clicks"
            stroke="#8884d8"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
