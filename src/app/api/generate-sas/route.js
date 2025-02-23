import { generateSasToken } from "@/utils/generateSasToken";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const containerName = searchParams.get("containerName");
        const blobName = searchParams.get("blobName");

        if (!containerName) {
            return new Response(JSON.stringify({ error: "Container name is required" }), { status: 400 });
        }

        const sasToken = await generateSasToken(containerName, blobName);

        //return the sas token to client
        return new Response(JSON.stringify({ sasToken }), { status: 200 });
    } catch (err) {
        console.error("Error generating SAS token:", err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}