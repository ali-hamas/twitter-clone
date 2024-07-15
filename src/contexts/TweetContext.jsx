import { getTweets } from "@/appwrite/db";
import { createContext, useContext, useState, useEffect } from "react";

const TweetContext = createContext();

export const TweetProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTweets = async () => {
    try {
      setLoading(true);
      let response = await getTweets(25);
      setTweets(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTweets();
  }, []);

  const contextValue = { tweets, loading, setTweets };

  return (
    <TweetContext.Provider value={contextValue}>
      {children}
    </TweetContext.Provider>
  );
};

export const useTweet = () => {
  return useContext(TweetContext);
};
