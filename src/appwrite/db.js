import { ID, Query } from "appwrite";
import { databaseId, databases, tweetsCollectionId } from "./config";

export const createTweet = async (tweet_body, userId) => {
  return await databases.createDocument(
    databaseId,
    tweetsCollectionId,
    ID.unique(),
    {
      tweet_body,
      user: userId,
    },
  );
};

export const getTweets = async (limit) => {
  let response = await databases.listDocuments(databaseId, tweetsCollectionId, [
    Query.limit(limit),
    Query.orderDesc("$createdAt"),
  ]);
  return response.documents;
};