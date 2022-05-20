import express from 'express';
import cors from 'cors';
import { mongooseDb } from './db';
import Constants from './constants/Constants';
import { router } from './endpoints';
import GoogleDriveService from './services/GoogleDriveService';
import decodeBearerToken from './endpoints/middleware';
import NftSrb from './nftsrb/NftSrb';

export const app = express();
const port = Number(Constants.SERVER_PORT);

app.use(cors());
app.use(express.json());

app.use(decodeBearerToken);
app.use(router);

app.listen(port, () => {
  return console.log(`NftSrb server is listening on port ${port}`);
});

mongooseDb.connect();

GoogleDriveService.init();

NftSrb.init();
