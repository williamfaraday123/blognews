import { uploadImage } from "@/utils/azure";
import getStream from "get-stream";
import { NextResponse } from "next/server";
import { PassThrough } from "stream";

export const config = {
    api: {
        bodyParser: false, // Disable body parser to prevent 413 error
    },
};

export async function POST (req) {
    try {
        // extract search params
        const { searchParams } = new URL(req.url);
        const fileName = `${Date.now()}-${searchParams.get("fileName")}`;
        const mimeType = searchParams.get("fileType");

        //convert ReadableStream to Node.js ReadableStream
        const buffer = await getStream(req.body);
        const readableStream = new PassThrough();
        readableStream.end(buffer);

        // upload stream directly (no memory overhead)
        const imageUrl = await uploadImage(readableStream, fileName, mimeType);

        return NextResponse.json({ url: imageUrl }, { status: 200 });
    } catch (err) {
        console.error("Upload error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
};