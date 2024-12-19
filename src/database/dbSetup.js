import { pool } from '@/app/api/db';
import fs from 'fs';
import path from 'path';

const schemaFilePath = path.join(process.cwd(), 'src', 'database', 'schema.sql');

const initializeDatabase = async () => {
    try {
        //open the database
        const client = await pool.connect();

        //read from schema.sql file
        const schema = fs.readFileSync(schemaFilePath, 'utf-8');

        //execute the sql schema
        await client.query(schema);

        console.log('Database initialized successfully');
        
        client.release();
    } catch (err) {
        console.error('Error initializing database:', err);
        throw err;
    }
}

export default initializeDatabase;