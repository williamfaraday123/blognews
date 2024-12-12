import connectToDatabase from "@/app/api/db";
import { NextResponse } from "next/server";

export async function GET (req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category');
        const username = searchParams.get('username');

        const db = await connectToDatabase();
        let rows;

        if (category && username) {
            rows = await db.all(`SELECT * FROM Blog WHERE category = ? AND username = ?`, [category, username]);
        } else if (category) {
            rows = await db.all(`SELECT * FROM Blog WHERE category = ?`, [category]);
        } else if (username) {
            rows = await db.all(`SELECT * FROM Blog WHERE username = ?`, [username]);
        } else {
            rows = await db.all(`SELECT * FROM Blog`);
        }
        return NextResponse.json(rows, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Error fetching blogs from database' }, { status: 500 });
    }
};