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

const createGroupMemberTable = async () => {
  const groupMemberTable = `CREATE TABLE IF NOT EXISTS
      groupMemberTable(
        id SERIAL PRIMARY KEY,
        groupId integer REFERENCES groupTable(id),
        memberId integer REFERENCES userTable(id),
        membermail VARCHAR(128) REFERENCES usertable(email),
        groupMail VARCHAR(128),
        join_date TIMESTAMP
      )`;

  await pool.query(groupMemberTable)
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
const dropGroupMemberTable = async () => {
  const dropGroupMember = 'DROP TABLE IF EXISTS groupMemberTable';
  await pool.query(dropGroupMember)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

module.exports = {
  createGroupMemberTable,
  dropGroupMemberTable,
};
