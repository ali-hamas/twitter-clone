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

export const followUser = async (profileData, userData) => {
  const profilePayload = [...profileData.followers, userData.$id];
  await databases.updateDocument(databaseId, usersCollectionId, profileData.$id, {
    followers: profilePayload,
  });

  const userPayload = [...userData.following, profileData.$id];
  await databases.updateDocument(databaseId, usersCollectionId, userData.$id, {
    following: userPayload,
  });

}

export const unfollowUser = async (profileData, userData) => {
  const profilePayload = profileData.followers.filter((i) => i !== userData.$id);
  await databases.updateDocument(databaseId, usersCollectionId, profileData.$id, {
    followers: profilePayload,
  });

  const userPayload = userData.following.filter((i) => i !== profileData.$id)
  await databases.updateDocument(databaseId, usersCollectionId, userData.$id, {
    following: userPayload,
  });
}

export const getBookarks = async (userId, limit) => {
  let res = await databases.listDocuments(databaseId, tweetsCollectionId, [
    Query.limit(limit),
    Query.orderDesc("$createdAt"),
    Query.equal("bookmark_by", [userId]),
  ])
  return res.documents;
}

export const getProfileTweets = async (userId, limit, offset) => {
  let res = await databases.listDocuments(databaseId, tweetsCollectionId, [
    Query.limit(limit),
    Query.offset(offset),
    Query.equal("user", [userId]),
  ])
  return res.documents;
}