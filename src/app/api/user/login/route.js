import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { username, password } = formData;
        console.log('Sent to backend', username, password);
        return NextResponse.json({ message: { username, password } });
    } catch (err) {
        console.error('Error sending to backend', err);
        return NextResponse.json({ error: err});
    }
}