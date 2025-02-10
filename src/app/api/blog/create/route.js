import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { title, category, description, images, location, username } = formData;
        const publishDate = new Date().toISOString();
        
        console.log(username, publishDate, title, category, description, images, location);
        const client = await pool.connect();

        try {
            await client.query('BEGIN');

            //Insert into Blog table
            const blogResult = await client.query(
                'INSERT INTO "Blog" (username, publishDate, title, category, description) VALUES ($1, $2, $3, $4, $5) RETURNING id',
                [username, publishDate, title, category, description]
            );
            const BlogID = blogResult.rows[0].id;

            //Insert into Image table
            const validImages = images.filter(image => image !== null); //filter out null values from images array
            if (validImages && validImages.length > 0) {
                const imageQueries = validImages.map((image) =>
                    client.query(
                        `INSERT INTO "Image" (BlogID, image) VALUES ($1, $2)`,
                        [BlogID, image]
                    )
                );
                await Promise.all(imageQueries);
            }
            
            //Insert into Location table
            if (location) {
                const latitude = location?.geometry?.coordinates[1];
                const longitude = location?.geometry?.coordinates[0];
                const country = location?.properties?.country;
                const name = location?.properties?.name;
                await client.query(
                    'INSERT INTO "Location" (BlogID, latitude, longitude, country, name) VALUES ($1, $2, $3, $4, $5)',
                    [BlogID, latitude, longitude, country, name]
                );
            }

            await client.query('COMMIT');
            return NextResponse.json({ message: 'Blog post created successfully!' }, { status: 201 });
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Database insertion error:',  error.message, error.stack);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
