import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const connectToDatabase = async () => {
  return open({
    filename: process.env.SQLITE_DB_PATH || './src/database/database.sqlite',
    driver: sqlite3.Database,
  });
};

export default connectToDatabase;
