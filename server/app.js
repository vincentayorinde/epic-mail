import express from 'express';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'idempotent-babel-polyfill';
import swaggerDoc from '../docs/swagger.json';
import router from './routes/index';


dotenv.config();

// Global app object
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'secret',
  }),
);
// Middleware
app.use(router);

app.get('/', (req, res) => res.status(200).json({
  status: 200,
  message: 'welcome to Epic Mail',
}));
app.use((req, res) => res.status(404).json({
  status: 404,
  error: `Route ${req.url} Not found`,
}));

app.use((error, req, res) => res.status(500).json({
  status: 500,
  error,
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 5000;

app.listen(PORT);

export default app;
