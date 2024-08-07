import { TwitterIcon } from "@/icons";
import { createDbUser, getDBUser } from "@/appwrite/auth";
import { registerAccount, loginAccount } from "@/appwrite/auth";
import { createContext, useState, useEffect, useContext } from "react";
import { client, databaseId, usersCollectionId } from "@/appwrite/config";
import { logoutAccount, getAccount, checkUsername } from "@/appwrite/auth";

const ScreenLoader = () => {
  return (
    <div className="flex-center h-dvh w-full">
      <TwitterIcon className="size-12.5 md:size-[72px]" />
    </div>
  );
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let res = await getUser();
      client.subscribe(`databases.${databaseId}.collections.${usersCollectionId}.documents.${res.$id}`, (response) => {
        if (response.events.includes("databases.*.collections.*.documents.*.update")) {
          setUser(response.payload);
        }
      });
    })()
  }, []);

  const registerUser = async (email, password, name, username) => {
    await checkUsername(username);
    let newUser = await registerAccount(email, password, name, username);
    await createDbUser(newUser.$id, name, username);
    await loginUser(email, password);
  };

  const loginUser = async (email, password) => {
    await loginAccount(email, password);
    await getUser();
  };

  const logoutUser = async () => {
    try {
      setLoading(true);
      await logoutAccount();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const logedInUser = await getAccount();
      let dbUser = await getDBUser(logedInUser.$id);
      setUser(dbUser);
      return dbUser;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = { user, registerUser, loginUser, logoutUser };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <ScreenLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
