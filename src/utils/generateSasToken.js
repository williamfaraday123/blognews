import { BlobSASPermissions, generateBlobSASQueryParameters, StorageSharedKeyCredential } from "@azure/storage-blob";

export async function generateSasToken(containerName, blobName = "") {
    //azure storage account credentials
    const accountName = process.env.NEXT_PUBLIC_AZURE_STORAGE_ACCOUNT_NAME;
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY;

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

    //define SAS permissions (read, write, delete, etc)
    const permissions = new BlobSASPermissions();
    permissions.read = true; //allow read access
    permissions.write = true; // Allow write access
    permissions.create = true; // Allow creating new blobs
    permissions.delete = true; // Allow deleting blobs

    const sasOptions = {
        containerName,
        blobName,
        permissions,
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour from now
    };

    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();

    return sasToken;
}