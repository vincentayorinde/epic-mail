// app dependencies
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../docs/swagger.json';
import router from './routes/index';

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// load our API routes
app.use(router);

app.get('/', (req, res) => {
  res.send('Welcome to Epic Mail');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 5000;

app.listen(PORT);

export default app;
