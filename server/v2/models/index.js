import { Pool } from 'pg';
import dotenv from 'dotenv';

// Import Table Models
import { createUserTable, dropUserTable } from './userTable';
import { createMessageTable, dropMessageTable } from './messageTable';
import { createGroupMemberTable, dropGroupMemberTable } from './groupMemberTable';
import { createGroupTable, dropGroupTable } from './groupTable';

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


pool.on('connect', () => {
});

const createTables = async () => {
  try {
    await createUserTable();
    await createMessageTable();
    await createGroupTable();
    await createGroupMemberTable();
  } catch (err) {
  }
};

const dropTables = async () => {
  try {
    await dropGroupMemberTable();
    await dropGroupTable();
    await dropMessageTable();
    await dropUserTable();
  } catch (err) {
  }
};

module.exports = {
  createTables,
  dropTables,
};
require('make-runnable');
