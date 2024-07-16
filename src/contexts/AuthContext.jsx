import { TwitterIcon } from "@/icons";
import { getTweets } from "@/appwrite/db";
import { registerAccount, loginAccount } from "@/appwrite/auth";
import { createDbUser, getDBUser, getUsers } from "@/appwrite/auth";
import { createContext, useState, useEffect, useContext } from "react";
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
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [asideUsers, setAsideUsers] = useState([]);

  useEffect(() => {
    getUser();
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
      let asideUsers = await getUsers(logedInUser.$id, 3);
      setAsideUsers(asideUsers);
      let allTweets = await getTweets(25);
      setTweets(allTweets);
      setUser(dbUser);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    user,
    registerUser,
    loginUser,
    logoutUser,
    asideUsers,
    tweets,
    setTweets,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <ScreenLoader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
