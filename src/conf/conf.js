const config = {
    appWriteEndPoint  : String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appWriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appWriteCollectioId : String(import.meta.env.VITE_APPWRITE_COLLECTIO_ID),
    appWriteDataBaseId : String(import.meta.env.VITE_APPWRITE_DATEBASE_ID),
    appWriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
}


export default config;
