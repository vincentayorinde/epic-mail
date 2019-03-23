import dotenv from 'dotenv';
import { Pool } from 'pg';
import 'idempotent-babel-polyfill';


dotenv.config();

let pool;
const env = process.env.NODE_ENV;

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

/**
 * Create User Table
 */
const createUserTable = async () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
      userTable(
        id SERIAL PRIMARY KEY,
        email VARCHAR(128) UNIQUE NOT NULL,
        firstname VARCHAR(128) NOT NULL,
        lastname VARCHAR(128) NOT NULL,
        password VARCHAR(128) NOT NULL,
        mobile VARCHAR(128) NOT NULL,
        join_date TIMESTAMP
      )`;

  await pool.query(userTable)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropUserTable = async () => {
  const dropUsers = 'DROP TABLE IF EXISTS userTable';
  await pool.query(dropUsers)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};


module.exports = {
  createUserTable,
  dropUserTable,
};