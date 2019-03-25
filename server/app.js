import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill';
import swaggerDoc from '../docs/swagger.json';
import router from './routes/index';


dotenv.config();

// Global app object
const app = express();

const corsOptions = {
  origin: 'http://localhost:5500',
  credentials: true,
};

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(router);

app.get('/', (req, res) => {
  res.cookie('myfirstcookie', 'looks good', { maxAge: 360000, httpOnly: true });
  res.end('Welcome to Epic Mail');
  console.log(req.cookies.myfirstcookie);
});

app.get('/logout', (req, res) => {
  res.clearCookie('myfirstcookie');
  res.redirect('http://localhost:5500/ui/index.html');
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

const PORT = process.env.PORT || 5000;

app.listen(PORT);

export default app;
