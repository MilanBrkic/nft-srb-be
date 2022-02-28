import express from 'express';
import cors from 'cors';
import { mongooseDb } from './db';
import Constants from './constants/Constants';
import { router } from './endpoints';


export const app = express();
const port = Number(Constants.SERVER_PORT);

app.use(cors())
app.use(express.json())

app.use(router)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

mongooseDb.connect();