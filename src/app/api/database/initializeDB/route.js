import initializeDatabase from '@/database/dbSetup';
import { NextResponse } from "next/server";

export async function POST () {
    try {
        await initializeDatabase();
        return NextResponse.json({ message: 'Database initialized successfully' }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};