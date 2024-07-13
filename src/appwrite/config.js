import { Client, Account, Databases, Storage } from "appwrite";

const client = new Client();
client.setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT);
client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export { client };
export const account = new Account(client);
export const storage = new Storage(client);
export const databases = new Databases(client);

export const baseUrl = import.meta.env.VITE_APPWRITE_ENDPOINT;
export const projectId = import.meta.env.VITE_APPWRITE_PROJECT_ID;
export const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const usersBucketId = import.meta.env.VITE_APPWRITE_USERS_BUCKET_ID;
export const tweetsBucketId = import.meta.env.VITE_APPWRITE_TWEETS_BUCKET_ID;
export const usersCollectionId = import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID;
export const tweetsCollectionId = import.meta.env.VITE_APPWRITE_TWEETS_COLLECTION_ID;
export const trendsCollectionId = import.meta.env.VITE_APPWRITE_TRENDS_COLLECTION_ID;
