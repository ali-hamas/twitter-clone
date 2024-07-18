import { ID, Query } from "appwrite";
import { databaseId, databases } from "./config";
import { tweetsCollectionId, usersCollectionId } from "./config";

export const createTweet = async (tweet_body, user) => {
  let res = await databases.createDocument(databaseId, tweetsCollectionId, ID.unique(), {
    tweet_body,
    user: user.$id,
  });
  await databases.updateDocument(databaseId, usersCollectionId, user.$id, {
    total_tweets: user.total_tweets + 1,
  });
  return res;
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

export const likeTweet = async (liked, tweetData, userId) => {
  if (liked) {
    const payload = tweetData.liked_by.filter((i) => i !== userId);
    let res = await databases.updateDocument(databaseId, tweetsCollectionId, tweetData.$id, {
      liked_by: payload,
    });
    return res;
  } else {
    const payload = [...tweetData.liked_by, userId];
    let res = await databases.updateDocument(databaseId, tweetsCollectionId, tweetData.$id, {
      liked_by: payload,
    });
    return res;
  }
}

export const bookmarkTweet = async (bookmarked, tweetData, userId) => {
  if (bookmarked) {
    const payload = tweetData.bookmark_by.filter((i) => i !== userId);
    let res = await databases.updateDocument(databaseId, tweetsCollectionId, tweetData.$id, {
      bookmark_by: payload,
    });
    return res;
  } else {
    const payload = [...tweetData.bookmark_by, userId];
    let res = await databases.updateDocument(databaseId, tweetsCollectionId, tweetData.$id, {
      bookmark_by: payload,
    });
    return res;
  }
};