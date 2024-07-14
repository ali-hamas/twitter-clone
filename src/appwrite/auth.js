import { ID, Query } from "appwrite";
import { usersCollectionId } from "./config";
import { account, databases, databaseId } from "./config";

export const checkUsername = async (username) => {
  console.log("user check request", username);
  let queryUser = await databases.listDocuments(databaseId, usersCollectionId, [
    Query.equal("profile_username", [username]),
  ]);
  if (queryUser.total > 0) {
    throw new Error("Username already taken");
  }
};

export const registerAccount = async (email, password, name) => {
  return await account.create(ID.unique(), email, password, name);
};

export const loginAccount = async (email, password) => {
  return await account.createEmailPasswordSession(email, password);
};

export const logoutAccount = async () => {
  await account.deleteSession("current");
};

export const getAccount = async () => {
  return await account.get();
};

export const createDbUser = async (id, profile_name, profile_username) => {
  let image = encodeURI(
    `https://cloud.appwrite.io/v1/avatars/initials?name=${profile_name}`,
  );
  await databases.createDocument(databaseId, usersCollectionId, id, {
    profile_name,
    profile_username,
    profile_img: image,
    bio: `👋 Hi! My name is ${profile_name}. I am new to twitter.`,
  });
};

export const getDBUser = async (id) => {
  return await databases.getDocument(databaseId, usersCollectionId, id);
};

export const getUsers = async (userId) => {
  let response =  await databases.listDocuments(databaseId, usersCollectionId, [
    Query.limit(3),
    Query.orderDesc("$createdAt"),
    Query.notEqual("$id", [userId]),
  ]);
  return response.documents;
};
