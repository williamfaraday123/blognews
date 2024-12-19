import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET (req) {
    try {
        const { searchParams } = new URL(req.url);
        const BlogID = searchParams.get('BlogID');

        if (!BlogID) {
            return NextResponse.json({ error: 'BlogID is required' });
        }
        
        const client = await pool.connect();
        const res = await client.query(
            `SELECT * FROM "Comment" WHERE BlogID = $1`,
            [BlogID]
        );
        const rows = res.rows;
        client.release();
        return NextResponse.json(rows, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
};