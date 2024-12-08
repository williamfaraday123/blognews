import { NextResponse } from "next/server";
import connectToDatabase from "../../db";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { username, password } = formData;

        //open database
        const db = await connectToDatabase();

        //check user exists
        const userExists = await db.get(
            'SELECT * FROM User WHERE username = ? AND password = ?',
            [username, password]
        );

        if (!userExists) {
            return NextResponse.json({ error: 'User with this username and password does not exist' }, { status: 404 });
        }

        return NextResponse.json({ message: { username, password } }, { status: 200 });
    } catch (err) {
        console.error('Error sending to backend', err);
        return NextResponse.json({ error: err }, { status: 500 });
    }
}