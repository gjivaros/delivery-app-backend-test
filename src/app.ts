import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import * as middlewares from './middlewares';
import { api } from './modules/api';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
