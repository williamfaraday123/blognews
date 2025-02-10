import { BlobServiceClient } from "@azure/storage-blob";
import { Readable } from "stream";

const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
const containerClient = blobServiceClient.getContainerClient("container1");
/* 
export const uploadImage = async (image) => {
    const blobName = `${Date.now()}-${image.name}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(image);
    return blobName;
};
 */

export const uploadImage = async (stream, fileName, mimeType) => {
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const uploadOptions = { blobHTTPHeaders: { blobContentType: mimeType } };

    //convert buffer to stream
    const readableStream = Readable.from(stream);

    // upload using a stream to avoid memory issues
    await blockBlobClient.uploadStream(readableStream, 4 * 1024 * 1024, 5, uploadOptions);

    return blockBlobClient.url;
};

export const deleteImage = async (blobName) => {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
};