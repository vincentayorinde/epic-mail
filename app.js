import express from 'express';
import bodyParser from 'body-parser';
import router from './server/routes/index';


const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware
app.use(router);

const PORT = process.env.PORT || 5000;

app.listen(PORT);

export default app;
