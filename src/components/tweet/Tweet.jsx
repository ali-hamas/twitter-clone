import { useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { LinkIcon } from "@/icons";
import { useAuth } from "@/contexts";
import { Link } from "react-router-dom";
import { copyLink } from "@/utils/utils";
import { useDate, useFormat } from "@/hooks";
import { bookmarkTweet, likeTweet } from "@/appwrite/db";
import { BookmarkIcon, CommentIcon } from "@/icons/TweetIcons";
import { ProfileImage, ProfileUsername, ProfileName } from "../user";
import { LikeIcon, RetweetIcon, ShareIcon } from "@/icons/TweetIcons";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const Tweet = ({ data }) => {
  const likeRef = useRef(null);
  const bookmarkRef = useRef(null);
  const [tweet, setTweet] = useState(data);
  const { user, updateTweets } = useAuth();
  const liked = tweet.liked_by.includes(user.$id);
  const bookmarked = tweet.bookmark_by.includes(user.$id);

  const noRoute = (e) => e.preventDefault();
  const handleLike = async (e) => {
    e.preventDefault();
    likeRef.current.setAttribute("disabled", true);
    let res = await likeTweet(liked, tweet, user.$id);
    updateTweets(tweet.$id, res);
    setTweet(res);
    likeRef.current.removeAttribute("disabled");
  };
  const handleBookmark = async (e) => {
    e.preventDefault();
    bookmarkRef.current.setAttribute("disabled", true);
    let res = await bookmarkTweet(bookmarked, tweet, user.$id);
    updateTweets(tweet.$id, res);
    setTweet(res);
    bookmarkRef.current.removeAttribute("disabled");
  };

  return (
    <Link to={`/tweets/${tweet.$id}`} className="border-b-border flex gap-3 border-b p-2 md:px-4">
      <ProfileImage data={tweet.user} />
      <div className="w-full">
        <div className="text-secondryTxt text-15 flex w-full items-center gap-1.5">
          <ProfileName data={tweet.user} />
          <ProfileUsername data={tweet.user} />
          <span>·</span>
          <span className="hover:underline" tooltip={useDate(tweet.$createdAt)}>
            {useDate(tweet.$createdAt, "short")}
          </span>
        </div>
        <p className="text-15/5 font-regular text-primaryTxt mt-1">
          {useFormat(tweet.tweet_body)}
        </p>
        <div className="mt-2 flex h-6 w-full items-center justify-between">
          <button tooltip="Reply" className="group tweet-btn" onClick={noRoute}>
            <CommentIcon className="group-hover:fill-blue" />
          </button>
          <button tooltip="Retweet" className="group tweet-btn hover:bg-green/30" onClick={noRoute}>
            <RetweetIcon className="group-hover:fill-green" />
          </button>
          <button tooltip={liked ? "Unlike" : "Like"} ref={likeRef}
            className="flex items-center gap-1 group !cursor-pointer" onClick={handleLike}
          >
            <div className="tweet-btn group-hover:bg-pink/30">
              <LikeIcon className="group-hover:fill-pink" solid={liked} />
            </div>
            <p className={cn("tweet-btn-txt", {"invisible" : tweet.liked_by.length === 0}, {"text-pink" : liked})}>
              {tweet.liked_by.length}
            </p>
          </button>
          <button tooltip={bookmarked ? "Remove from Bookmark" : "Bookmark"} 
            className="group tweet-btn" ref={bookmarkRef} onClick={handleBookmark}
          >
            <BookmarkIcon className="group-hover:fill-blue" solid={bookmarked} />
          </button>
          <div onClick={noRoute}>
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
        </div>
      </div>
    </Link>
  );
};

export default Tweet;
