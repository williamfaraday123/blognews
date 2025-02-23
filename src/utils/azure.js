import { BlobServiceClient } from "@azure/storage-blob";

const containerName = process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME;
const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
console.log(`containerName = ${process.env.NEXT_PUBLIC_AZURE_STORAGE_CONTAINER_NAME}, accountName = ${accountName}`);

export const uploadImageToAzure = async (file) => {
    try {
        //fetch sas token from server
        const response = await fetch(`/api/generate-sas?containerName=${containerName}`);
        const { sasToken } = await response.json();

        //upload to Azure blob storage using the sas token
        const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net?${sasToken}`);
        const containerClient = blobServiceClient.getContainerClient(`${containerName}`);
        const blobName = `${Date.now()}-${file.name}`;
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);

        const uploadResponse = await blockBlobClient.uploadBrowserData(file, {
            blobHTTPHeaders: { blobContentType: file.type },
        });

        return `https://${accountName}.blob.core.windows.net/${containerName}/${blobName}`;
    } catch (err) {
        console.error("Error uploading file", error);
        return null;
    }
};
/*
export const deleteImage = async (blobName) => {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.delete();
};
*/