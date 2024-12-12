import connectToDatabase from '@/app/api/db';
import { NextResponse } from "next/server";

export async function GET () {
    const tables = ["User", "Blog", "Comment"];
    const tableData = {};

    try {
        const db = await connectToDatabase();
        for (const table of tables) {
            const rows = await db.all(`SELECT * FROM ${table}`);
            tableData[table] = rows;
        }

        return NextResponse.json(tableData, {
            status: 200,
        });
    } catch (err) {
        return NextResponse.json({ error: 'Error fetching data from database' }, {
            status: 500,
        });
    }
};