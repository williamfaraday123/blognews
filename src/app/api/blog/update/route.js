import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const {BlogID, username, title, category, description} = formData;

        const client = await pool.connect();
        await client.query(
            `UPDATE "Blog" SET title = $1, category = $2, description = $3 WHERE id = $4 AND username = $5`,
            [title, category, description, BlogID, username]
        );

        client.release();
        
        return NextResponse.json({ message: 'Blog updated successfully' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
};