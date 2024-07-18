import { getTweets } from "@/appwrite/db";
import { createContext, useState, useEffect, useContext } from "react";
import { client, databaseId, tweetsCollectionId } from "@/appwrite/config";

const TweetsContext = createContext();

export const TweetProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    getFeedTweets();

    client.subscribe(`databases.${databaseId}.collections.${tweetsCollectionId}.documents`, (response) => {
        if (response.events.includes("databases.*.collections.*.documents.*.create")) {
          setTweets((prevState) => [response.payload, ...prevState]);
        }
        if (response.events.includes("databases.*.collections.*.documents.*.update")) {
          console.log("payload: ",response.payload);
          setTweets((prevState) => {
            const updatedTweet = prevState.map((i) => {
              if (i.$id === response.payload.$id) {
                return response.payload;
              }
              return i;
            });
            console.log(updatedTweet);
            return updatedTweet;
          });
        }
      });
  }, []);

  const getFeedTweets = async () => {
    let resTweets = await getTweets(25, 0);
    setTweets((prevArray) => [...prevArray, ...resTweets]);
  };

  const contextValue = { tweets, getFeedTweets };

  return (
    <TweetsContext.Provider value={contextValue}>
      {children}
    </TweetsContext.Provider>
  );
};

export const useTweet = () => {
  return useContext(TweetsContext);
};
