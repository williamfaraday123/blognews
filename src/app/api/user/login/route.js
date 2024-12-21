import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { username, password } = formData;

        //open database
        const client = await pool.connect();

        //check user exists
        const res = await client.query(
            'SELECT * FROM "User" WHERE username = $1 AND password = $2',
            [username, password]
        );

        if (res.rows.length === 0) {
            return NextResponse.json({ error: 'User with this username and password does not exist' }, { status: 404 });
        }

        return NextResponse.json({ message: { username, password } }, { status: 200 });
    } catch (err) {
        console.error('Error sending to backend', err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}