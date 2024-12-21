import { pool } from "@/app/api/db";
import { NextResponse } from "next/server";

const validTables = ["User", "Blog", "Comment"];

export async function POST (req) {
    try {
        const formData = await req.json();
        const { table, rowId } = formData;

        if (!validTables.includes(table)) {
            return NextResponse.json({ error: `Invalid table name` }, { status: 400 });
        }

        const client = await pool.connect();
        try {
            await client.query(
                `DELETE FROM "${table}" WHERE id = $1`,
                [rowId]
            );
            return NextResponse.json({ message: `Deleted from ${table}` }, { status: 200 });
        } catch(error) {
            throw error;
        } finally {
            client.release();
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: `Error in deleting from table` }, { status: 500 });
    }
};