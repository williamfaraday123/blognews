import connectToDatabase from '@/app/api/db';
import fs from 'fs';
import path from 'path';

const schemaFilePath = path.join(process.cwd(), 'src', 'database', 'schema.sql');

const initializeDatabase = async () => {
    try {
        //open the database
        const db = await connectToDatabase();

        //read from schema.sql file
        const schema = fs.readFileSync(schemaFilePath, 'utf-8');

        //execute the sql schema
        await db.exec(schema);

        console.log('Database initialized successfully');
        return db;
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

export default initializeDatabase;