import dotenv from 'dotenv';
import { Pool } from 'pg';

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



//  Create Messate Table

const createGroupTable = async () => {
  const groupTable = `CREATE TABLE IF NOT EXISTS
      groupTable(
        id SERIAL PRIMARY KEY,
        groupName VARCHAR(128) NOT NULL,
        groupDesc VARCHAR(128) NOT NULL,
        groupMail VARCHAR(128) UNIQUE NOT NULL,
        role VARCHAR(128) NOT NULL,
        ownerId VARCHAR(128) REFERENCES userTable(email),
        createdOn TIMESTAMP,
        modifiedDate TIMESTAMP,
        constraint check_role check (role in ('admin', 'user'))
      )`;

  await pool.query(groupTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Drop User Table
 */
const dropGroupTable = async () => {
  const dropGroup = 'DROP TABLE IF EXISTS groupTable';
  await pool.query(dropGroup)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

// pool.on('remove', () => {
//   console.log('groupTable removed');
//   process.exit(0);
// });

module.exports = {
  createGroupTable,
  dropGroupTable,
};
