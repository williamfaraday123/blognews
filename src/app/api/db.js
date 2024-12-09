import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const dbPath = process.env.SQLITE_DB_PATH || './src/database/database.sqlite';

const connectToDatabase = async () => {
  console.log(dbPath); //check dbPath for error
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};

export default connectToDatabase;
