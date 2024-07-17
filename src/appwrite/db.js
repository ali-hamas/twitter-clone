import { ID, Query } from "appwrite";
import { databaseId, databases } from "./config";
import { tweetsCollectionId, usersCollectionId } from "./config";

export const createTweet = async (tweet_body, userId) => {
  return await databases.createDocument(databaseId, tweetsCollectionId, ID.unique(), {
      tweet_body, user: userId,
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

export const getIdTweet = async (tweetId) => {
  return await databases.getDocument(databaseId, tweetsCollectionId, tweetId);
}

export const getProfileTweets = async (userId, limit, offset) => {
  let res = await databases.listDocuments(databaseId, tweetsCollectionId, [
    Query.limit(limit),
    Query.offset(offset),
    Query.equal("user", [userId]),
  ])
  return res.documents;
}