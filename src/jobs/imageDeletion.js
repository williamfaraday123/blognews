//background function to periodically check the ImageDeletionQueue table for images that need to be deleted and call the deleteImage function accordingly.

import { pool } from "@/app/api/db";
import { deleteImage } from "@/utils/azure";

async function processImageDeletions () {
    const client = await pool.connect();

    try {
        const result = await client.query(
            `SELECT id, imageBlobName from "ImageDeletionQueue"`
        );

        for (const row of result.rows) {
            await deleteImage(row.imageBlobName);

            await client.query(`DELETE FROM "ImageDeletionQueue" WHERE id = $1`, [row.id]);
        }
    } catch (err) {
        console.error('Error processing image deletions: ', err);
    } finally {
        client.release();
    }
};

setInterval(processImageDeletions, 600000);