import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill';
import swaggerDoc from '../docs/swagger.json';
import router from './routes/index';

import UserWithDB from './v2/controllers/user';

dotenv.config();
// const User = process.env.TYPE === 'db' ? UserWithDB : null;

// Global app object
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(router);

app.get('/', (req, res) => {
  res.send('Welcome to Epic Mail');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 6000;

app.listen(PORT);

export default app;
