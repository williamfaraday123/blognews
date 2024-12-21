import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { title, category, description, image, username } = formData;
        const publishDate = new Date().toISOString();

        console.log(username, publishDate, title, category, description, image);
        const client = await pool.connect();

        await client.query(
            'INSERT INTO "Blog" (username, publishDate, title, category, description, image) VALUES ($1, $2, $3, $4, $5, $6)',
            [username, publishDate, title, category, description, image]
        );

        client.release();

        return NextResponse.json({ message: 'Blog post created successfully!' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
