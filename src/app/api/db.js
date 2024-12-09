import path from 'path';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const getDatabasePath = () => {
  // if in serverless environment like Vercel, use /tmp directory
  if (process.env.VERCEL) {
    return path.join('/tmp', 'database.sqlite'); // sqlite file in Vercel's temp storage
  } else {
    return process.env.SQLITE_DB_PATH || path.join(process.cwd(), 'src', 'database', 'database.sqlite'); //local development path
  }
}

const connectToDatabase = async () => {
  const dbPath = getDatabasePath();
  console.log('Database path:', dbPath); //check dbPath for error
  return open({
    filename: dbPath,
    driver: sqlite3.Database,
  });
};

export default connectToDatabase;
