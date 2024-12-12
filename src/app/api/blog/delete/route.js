import connectToDatabase from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { BlogID, username } = formData;
        
        const db = await connectToDatabase();
        await db.run(
            `DELETE FROM Blog WHERE id = ? AND username = ?`,
            [BlogID, username]
        );

        return NextResponse.json({ message: 'Blog deleted successfully' }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
};