import connectToDatabase from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { username, BlogID, content } = formData;
        const createdAt = new Date().toISOString();
        
        const db = await connectToDatabase();
        await db.run(
            `INSERT INTO Comment (username, BlogID, content, createdAt) VALUES (?, ?, ?, ?)`,
            [username, BlogID, content, createdAt]
        );
        return NextResponse.json({ message: 'Comment created successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
};