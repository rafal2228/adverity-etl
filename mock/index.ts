import express from 'express';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import { ETLData } from '../src/types';

const port = 5000;
const app = express();

function prepareData() {
  console.log('Preparing data ...');

  return new Promise<ETLData[]>((resolve, reject) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(path.resolve(__dirname, './data.csv'))
    });
    const data: ETLData[] = [];

    readInterface.on('line', line => {
      const [date, dataSource, campaign, clicks, impressions] = line.split(',');

      data.push({
        date,
        dataSource,
        campaign,
        clicks: +clicks,
        impressions: +impressions
      });
    });

    readInterface.on('close', () => resolve(data));
  });
}

function serve(data: ETLData[]) {
  app.use(cors());

  app.get('/', (req, res) => {
    res.json(data);
  });

  app.listen(port, () => console.log(`App listening on ${port}`));
}

prepareData().then(serve, () => console.log('App failed to start'));
