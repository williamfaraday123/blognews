import { pool } from '@/app/api/db';
import { NextResponse } from "next/server";

export async function GET () {
    const tables = ["User", "Blog", "Comment"];
    const tableData = {};

    try {
        const client = await pool.connect();
        for (const table of tables) {
            const res = await client.query(`SELECT * FROM "${table}"`);
            const rows = res.rows;
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