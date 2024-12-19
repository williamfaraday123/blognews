import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { BlogID, username } = formData;
        
        const client = await pool.connect();
        await client.query(
            `DELETE FROM "Blog" WHERE id = $1 AND username = $2`,
            [BlogID, username]
        );

        client.release();

        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
};