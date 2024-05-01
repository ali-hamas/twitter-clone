import { ID, Client, Account, Databases, Storage } from "appwrite";

const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT);
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export { ID };
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const imagesBucketId = import.meta.env.VITE_APPWRITE_IMAGES_BUCKET_ID;
export const tweetsCollectionId = import.meta.env
  .VITE_APPWRITE_TWEETS_COLLECTION_ID;
export const trendsCollectionId = import.meta.env
  .VITE_APPWRITE_TRENDS_COLLECTION_ID;
export const followCollectionId = import.meta.env
  .VITE_APPWRITE_FOLLOW_COLLECTION_ID;

export const apiBaseUrl = import.meta.env.VITE_APPWRITE_ENDPOINT;

export const serverHeaders = {
  "Content-Type": "application/json",
  "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_PROJECT_ID,
  "X-Appwrite-Key": import.meta.env.VITE_APPWRITE_API_KEY,
};

export const headers = {
  "Content-Type": "application/json",
  "X-Appwrite-Project": import.meta.env.VITE_APPWRITE_PROJECT_ID,
};
