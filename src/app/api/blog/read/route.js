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
            res = await client.query(`SELECT * FROM "Blog" WHERE category = ? AND username = ?`, [category, username]);
        } else if (category) {
            res = await client.query(`SELECT * FROM "Blog" WHERE category = ?`, [category]);
        } else if (username) {
            res = await client.query(`SELECT * FROM "Blog" WHERE username = ?`, [username]);
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