import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { username, password } = formData;

        //open database
        const client = await pool.connect();

        //check if account exists
        const res = await client.query(
            'SELECT * FROM "User" WHERE username = $1',
            [username]
        );

        if (res.rows.length > 0) {
            return NextResponse.json({ error: 'User with this username already exists'}, { status: 409 });
        }

        await client.query(
            `INSERT INTO "User" (username, password) VALUES ($1, $2)`,
            [username, password]
        );
        return NextResponse.json({ message: 'Successful registration' }, { status: 201 });
    } catch (err) {
        console.error('error in src/app/api/user/register/route.js:', err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}