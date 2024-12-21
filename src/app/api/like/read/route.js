import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const client = await pool.connect();
        try {
            const { searchParams } = new URL(req.url);
            const BlogID = searchParams.get('BlogID');
            const username = searchParams.get('username');

            if (!BlogID || !username) {
                return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
            }

            const res = await client.query(
                `SELECT * FROM "Like" WHERE BlogID = $1 AND username = $2`,
                [BlogID, username]
            );

            const liked = res.rowCount > 0;
            return NextResponse.json({ liked }, { status: 200 });
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