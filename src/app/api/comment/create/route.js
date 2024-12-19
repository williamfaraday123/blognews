import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { username, BlogID, content } = formData;
        const createdAt = new Date().toISOString();
        
        const client = await pool.connect();
        await client.query(
            `INSERT INTO "Comment" (username, BlogID, content, createdAt) VALUES ($1, $2, $3, $4)`,
            [username, BlogID, content, createdAt]
        );

        client.release();
        
        return NextResponse.json({ message: 'Comment created successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
};