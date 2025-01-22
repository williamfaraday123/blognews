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
                `SELECT * FROM "Location" WHERE BlogID = $1`,
                [BlogID]
            );

            const rows = res.rows;
            return NextResponse.json(rows, { status: 200 });
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