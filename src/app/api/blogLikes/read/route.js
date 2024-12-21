import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const client = await pool.connect();
        try {
            const { searchParams } = new URL(req.url);
            const BlogID = searchParams.get('BlogID');

            if (!BlogID) {
                return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
            }

            const res = await client.query(
                `SELECT likes FROM "BlogLikes" WHERE BlogID = $1`,
                [BlogID]
            );

            if (res.rowCount === 0) {
                return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
            }
            const likes = res.rows[0].likes;

            return NextResponse.json({ likes }, { status: 200 });
        } catch (err) {
            console.error(err);
            return NextResponse.json({ error: err.message }, { status: 500 });
        } finally {
            client.release();
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Error connecting to database pool' }, { status: 500 });
    }
}