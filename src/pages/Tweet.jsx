import { Header } from "@/layout";
import { useAuth } from "@/contexts";
import { copyLink } from "@/utils/utils";
import { useParams } from "react-router-dom";
import { useDate, useFormat } from "@/hooks";
import { ErrorIcon, LinkIcon } from "@/icons";
import { useEffect, useRef, useState } from "react";
import { bookmarkTweet, getIdTweet, likeTweet } from "@/appwrite/db";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FollowButton, ProfileImage, ProfileName, ProfileUsername } from "@/components/user";
import { LikeIcon, RetweetIcon, ShareIcon, CommentIcon, BookmarkIcon } from "@/icons/TweetIcons";

const Tweet = () => {
  const likeRef = useRef(null);
  const { tweetId } = useParams();
  const bookmarkRef = useRef(null);
  const [tweet, setTweet] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, tweets, updateTweets } = useAuth();
  const liked = tweet?.liked_by.includes(user.$id);
  const bookmarked = tweet?.bookmark_by.includes(user.$id);
  if (tweet) {
    document.title = `${tweet.user.profile_name} on Twitter: "${tweet.tweet_body}"`;
  }
  const fetchTweet = async () => {
    try {
      setLoading(true);
      let filterTweet = tweets.find((i) => i.$id === tweetId);
      if (filterTweet) {
        setTweet(filterTweet);
      } else {
        let res = await getIdTweet(tweetId);
        setTweet(res);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  const handleLike = async () => {
    likeRef.current.setAttribute("disabled", true);
    let res = await likeTweet(liked, tweet, user.$id);
    updateTweets(tweetId, res);
    setTweet(res);
    likeRef.current.removeAttribute("disabled");
  }
  const handleBookmark = async () => {
    bookmarkRef.current.setAttribute("disabled", true);
    let res = await bookmarkTweet(bookmarked, tweet, user.$id);
    updateTweets(tweetId, res);
    setTweet(res);
    bookmarkRef.current.removeAttribute("disabled");
  }

  useEffect(() => {
    window.scrollTo({ top: 0 });
    fetchTweet();
  }, [tweetId]);

  if (error) {
    return (
      <>
        <Header title="Tweet" />
        <section className="flex-center flex-col gap-3 mt-20">
          <ErrorIcon className="size-14" />
          <p className="text-center text-17 text-secondryTxt">
          {error.includes("Document with the requested ID could not be found") ? (
            "This tweet doesn't exist"
          ) : (
            "Something went wrong, try reloading"
          )}
          </p>
        </section>
      </>
    );
  }
  
  return (
    <>
      <Header title="Tweet" />
      {!loading ? (
        <article className="border-b border-b-border px-3 pt-3 md:px-4 mb-[100dvh]">
          <div className="flex items-center gap-3">
            <ProfileImage data={tweet.user} />
            <div>
              <ProfileName data={tweet.user} />
              <ProfileUsername data={tweet.user} />
            </div>
            <div className="ml-auto">
              <FollowButton profileData={tweet.user} />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-15 md:text-17/6 font-regular text-primaryTxt">
              {useFormat(tweet.tweet_body)}
            </p>
          </div>
          <div className="flex w-full items-center gap-1.5 border-b border-b-border py-3 text-secondryTxt">
            <p>{useDate(tweet.$createdAt)}</p>
            <span>·</span>
            <p>
              <span className="text-primaryTxt">{tweet.liked_by.length}</span>
              {tweet.liked_by === 1 ? " Like" : " Likes"}
            </p>
          </div>
          <div className="flex py-3 w-full items-center justify-between *:cursor-pointer">
            <button tooltip="Reply" className="group tweet-btn">
              <CommentIcon className="group-hover:fill-blue" />
            </button>
            <button tooltip="Retweet" className="group tweet-btn hover:bg-green/30">
              <RetweetIcon className="group-hover:fill-green" />
            </button>
            <button tooltip="Like" className="group tweet-btn hover:bg-pink/30" ref={likeRef} onClick={handleLike}>
              <LikeIcon className="group-hover:fill-pink" solid={liked} />
            </button>
            <button tooltip="Bookmark" className="group tweet-btn" ref={bookmarkRef} onClick={handleBookmark}>
              <BookmarkIcon className="group-hover:fill-blue" solid={bookmarked} />
            </button>
            <Menu>
              <MenuButton tooltip="Share" className="group tweet-btn">
                <ShareIcon className="group-hover:fill-blue" />
              </MenuButton>
              <MenuItems transition="true" anchor={{ to: "bottom end", gap: "-20px" }} className="transition-menu">
                <MenuItem>
                  <button className="menu-item" onClick={() => copyLink(`/tweets/${tweet.$id}`)}>
                    <LinkIcon />
                    <span className="text-15 font-bold">Copy link to tweet</span>
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </article> 
      ) : (
      <div className="spinner" />
    )}
    </>
  );
};

export default Tweet;
