import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const client = await pool.connect();
        try {
            const formData = await req.json();
            const { username, BlogID } = formData;

            if (!username || !BlogID) {
                return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 })
            }
            
            await client.query(
                `INSERT INTO "Like" (BlogID, username) VALUES ($1, $2)`,
                [BlogID, username]
            );
            return NextResponse.json({ message: 'Successfully inserted into Like table' }, { status: 201 });
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