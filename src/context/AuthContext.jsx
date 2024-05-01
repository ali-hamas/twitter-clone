import { createContext, useContext, useState, useEffect } from "react";
import ScreenLoader from "../utils/ScreenLoader";
import { account, ID } from "../appwrite/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [formLoader, setFormLoader] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    userStatus();
  }, []);

  const loginUser = async (email, password) => {
    setFormLoader(true);
    try {
      await account.createEmailPasswordSession(email, password);
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    setFormLoader(false);
  };

  const registerUser = async (id, email, password, name) => {
    setFormLoader(true);
    try {
      let a = await account.create(id, email, password, name);
      loginUser(email, password);
    } catch (error) {
      console.log(error);
    }
    setFormLoader(false);
  };

  const OAuth = async (provider) => {
    account.createOAuth2Session(
      provider,
      "http://localhost:5173/home",
      "http://localhost:5173/signup",
    );
  };

  const logoutUser = () => {
    setLoading(true);
    account.deleteSession("current");
    setUser(null);
    setLoading(false);
  };

  const userStatus = async () => {
    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const contextValue = {
    user,
    setUser,
    OAuth,
    loginUser,
    registerUser,
    logoutUser,
    userStatus,
    formLoader,
    setFormLoader,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {loading ? <ScreenLoader /> : children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
