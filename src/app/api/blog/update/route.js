import connectToDatabase from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const {BlogID, username, title, category, description, image} = formData;

        const db = await connectToDatabase();
        await db.run(
            `UPDATE Blog SET title = ?, category = ?, description = ?, image = ? WHERE id = ? AND username = ?`,
            [title, category, description, image, BlogID, username]
        );

        return NextResponse.json({ message: 'Blog updated successfully' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
};