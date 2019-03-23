import { Pool } from 'pg';

let pool;

const environment = (env) => {
  this.env = process.env.NODE_ENV;
  if (env === 'development') {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL_DEV,
    });
  }
  if (env === 'test') {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL_TEST,
    });
  }
  if (env === 'production') {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL_PROD,
    });
  }
};

export default environment;
