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

const createMessageTable = async () => {
  const messageTable = `CREATE TABLE IF NOT EXISTS
      messageTable(
        id SERIAL PRIMARY KEY,
        createOn TIMESTAMP,
        subject VARCHAR(128) NOT NULL,
        message TEXT NOT NULL,
        parentMessageId integer NOT NULL,
        status VARCHAR(128) NOT NULL,
        senderId VARCHAR(128) REFERENCES userTable(email),
        receiverId VARCHAR(128) REFERENCES userTable(email),
        senderDelete BOOLEAN NOT NULL,
        receiverDelete BOOLEAN NOT NULL,
        groupmail VARCHAR(128),
        constraint check_status check (status in ('unread', 'read', 'draft'))
      )`;

  await pool.query(messageTable)
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
const dropMessageTable = async () => {
  const dropMessageT = 'DROP TABLE IF EXISTS messageTable';
  await pool.query(dropMessageT)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      pool.end();
    });
};


module.exports = {
  createMessageTable,
  dropMessageTable,
};
