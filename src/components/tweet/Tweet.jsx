import { cn } from "@/utils/cn";
import { useState } from "react";
import { LinkIcon } from "@/icons";
import { useAuth } from "@/contexts";
import { Link } from "react-router-dom";
import { copyLink } from "@/utils/utils";
import { useDate, useFormat } from "@/hooks";
import { BookmarkIcon, CommentIcon } from "@/icons/TweetIcons";
import { ProfileImage, ProfileUsername, ProfileName } from "../user";
import { LikeIcon, RetweetIcon, ShareIcon } from "@/icons/TweetIcons";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const Tweet = ({ tweetData, userData }) => {
  const { user } = useAuth();
  const tweetText = useFormat(tweetData.tweet_body);
  const [like, setLike] = useState(tweetData.liked_by.includes(user.$id));
  const [bookmark, setBookmark] = useState(tweetData.bookmark_by.includes(user.$id));

  const noRoute = (e) => e.preventDefault();
  const handleLike = async (e) => {
    e.preventDefault();
    setLike((prevstate) => !prevstate);
  };
  const handleBookmark = (e) => {
    e.preventDefault();
    setBookmark((prevstate) => !prevstate);
  };

  return (
    <Link to={`/tweets/${tweetData.$id}`} className="border-b-border flex gap-3 border-b p-2 md:px-4">
      <ProfileImage data={userData} />
      <div className="w-full">
        <div className="text-secondryTxt text-15 flex w-full items-center gap-1.5">
          <ProfileName data={userData} />
          <ProfileUsername data={userData} />
          <span>·</span>
          <span className="hover:underline" tooltip={useDate(tweetData.$createdAt)}>
            {useDate(tweetData.$createdAt, "short")}
          </span>
        </div>
        <p className="text-base font-regular text-primaryTxt mt-1">
          {tweetText}
        </p>
        <div className="mt-2 flex h-6 w-full items-center justify-between *:cursor-pointer">
          <button tooltip="Reply" className="group tweet-btn" onClick={noRoute}>
            <CommentIcon className="group-hover:fill-blue" />
          </button>
          <button tooltip="Retweet" className="group tweet-btn hover:bg-green/30" onClick={noRoute}>
            <RetweetIcon className="group-hover:fill-green" />
          </button>
          <button tooltip={like ? "Unlike" : "Like"} onClick={handleLike} className="flex items-center gap-1 group">
            <div className="tweet-btn group-hover:bg-pink/30">
              <LikeIcon className="group-hover:fill-pink" solid={like} />
            </div>
            <p className={cn("tweet-btn-txt", {"invisible" : tweetData.liked_by.length === 0}, {"text-pink" : like})}>
              {tweetData.liked_by.length}
            </p>
          </button>
          <button tooltip={bookmark ? "Remove from Bookmark" : "Bookmarks"} className="group tweet-btn" onClick={handleBookmark}>
            <BookmarkIcon className="group-hover:fill-blue" solid={bookmark} />
          </button>
          <div onClick={noRoute}>
            <Menu>
              <MenuButton tooltip="Share" className="group tweet-btn">
                <ShareIcon className="group-hover:fill-blue" />
              </MenuButton>
              <MenuItems transition="true" anchor={{ to: "bottom end", gap: "-20px" }} className="transition-menu">
                <MenuItem>
                  <button className="menu-item" onClick={() => copyLink(`/tweets/${tweetData.$id}`)}>
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
