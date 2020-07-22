import express from 'express';
import { errors } from 'celebrate';

import 'reflect-metadata';
import './database';

import routes from './routes';

const app = express();

app.use(express.json());

app.use(routes);

app.use(errors());

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333');
});
