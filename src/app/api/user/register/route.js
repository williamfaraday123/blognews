import { NextResponse } from "next/server";
import connectToDatabase from "../../db";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { username, password } = formData;

        //open database
        const db = await connectToDatabase();

        //check if account exists
        const userExists = await db.get(
            'SELECT * FROM User WHERE username = ?',
            [username]
        );

        if (userExists) {
            return NextResponse.json({ error: 'User with this username already exists'}, { status: 409 });
        }

        await db.run(
            `INSERT INTO User (username, password) VALUES (?, ?)`,
            [username, password]
        );
        return NextResponse.json({ message: 'Successful registration' }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ error: err }, { status: 500 });
    }
}