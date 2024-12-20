import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET (req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const username = searchParams.get('username');

        const client = await pool.connect();
        let res;

        if (category && username) {
            res = await client.query(`SELECT * FROM "Blog" WHERE category = $1 AND username = $2`, [category, username]);
        } else if (category) {
            res = await client.query(`SELECT * FROM "Blog" WHERE category = $1`, [category]);
        } else if (username) {
            res = await client.query(`SELECT * FROM "Blog" WHERE username = $1`, [username]);
        } else {
            res = await client.query(`SELECT * FROM "Blog"`);
        }
        let rows = res.rows;

        client.release();

        return NextResponse.json(rows, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: `Error fetching blogs from database, ${err.message}` }, { status: 500 });
    }
};