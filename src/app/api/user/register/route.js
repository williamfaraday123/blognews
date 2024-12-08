import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { username, password } = formData;
        return NextResponse.json({ message: { username, password }});
    } catch (err) {
        return NextResponse.json({ error: err });
    }
}