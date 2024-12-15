import connectToDatabase from "@/app/api/db";
import { NextResponse } from "next/server";

export async function POST (req) {
    try {
        const formData = await req.json();
        const { table, rowId } = formData;

        const db = await connectToDatabase();
        await db.run(
            `DELETE FROM ${table} WHERE id = ?`,
            [rowId]
        );

        return NextResponse.json({ message: `Deleted from ${table}` }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: `Error in deleting from table` }, { status: 500 });
    }
};