import connectToDatabase from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { title, category, description, image, username } = formData;
        const publishDate = new Date().toISOString();

        console.log(username, publishDate, title, category, description, image);
        const db = await connectToDatabase();

        await db.run(
            'INSERT INTO Blog (username, publishDate, title, category, description, image) VALUES (?, ?, ?, ?, ?, ?)',
            [username, publishDate, title, category, description, image]
        );
        return NextResponse.json({ message: 'Blog post created successfully!' }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
