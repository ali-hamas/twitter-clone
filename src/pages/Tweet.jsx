import { Header } from "@/layout";
import { LinkIcon } from "@/icons";
import { useAuth } from "@/contexts";
import { copyLink } from "@/utils/utils";
import { getIdTweet } from "@/appwrite/db";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDate, useFormat } from "@/hooks";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ProfileImage, ProfileName, ProfileUsername } from "@/components/user";
import { LikeIcon, RetweetIcon, ShareIcon, CommentIcon, BookmarkIcon } from "@/icons/TweetIcons";

const Tweet = () => {
  const { user } = useAuth();
  const { tweetId } = useParams();
  const [liked, setLiked] = useState(null);
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(null);

  const handleLike = () => {
    setLiked((prevState) => !prevState);
  }
  const handleBookmark = () => {
    setBookmarked((prevState) => !prevState);
  }

  const fetchTweet = async () => {
    try {
      setLoading(true);
      let res = await getIdTweet(tweetId);
      document.title = `${res.user.profile_name} on Twitter: "${res.tweet_body}"`;
      setTweet(res);
      setLiked(res.liked_by.includes(user.$id));
      setBookmarked(res.bookmark_by.includes(user.$id));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchTweet();
  }, [tweetId]);

  return (
    <>
      <Header title="Tweet" />
      {!loading ? (
        <section className="border-b border-b-border px-3 pt-3 md:px-4 mb-96">
          <div className="flex items-center gap-3">
            <ProfileImage data={tweet.user} />
            <div>
              <ProfileName data={tweet.user} />
              <ProfileUsername data={tweet.user} />
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
            <p className="cursor-pointer underline-offset-2 hover:underline">
              <span className="text-primaryTxt">{tweet.liked_by.length}</span>
              {tweet.liked_by === 1 ? " Like" : " Likes"}
            </p>
            {tweet.user.$id === user.$id && (
              <>
                <span>·</span>
                <p className="cursor-pointer underline-offset-2 hover:underline">
                  <span className="text-primaryTxt">{tweet.bookmark_by.length}</span>
                  {tweet.bookmark_by === 1 ? " Bookmark" : " Bookmarks"}
                </p>
              </>
            )}
          </div>
          <div className="flex py-3 w-full items-center justify-between *:cursor-pointer">
            <button tooltip="Reply" className="group tweet-btn">
              <CommentIcon className="group-hover:fill-blue" />
            </button>
            <button tooltip="Retweet" className="group tweet-btn hover:bg-green/30">
              <RetweetIcon className="group-hover:fill-green" />
            </button>
            <button tooltip="Like" className="group tweet-btn hover:bg-pink/30" onClick={handleLike}>
              <LikeIcon className="group-hover:fill-pink" solid={liked} />
            </button>
            <button tooltip="Bookmark" className="group tweet-btn" onClick={handleBookmark}>
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
        </section> 
      ) : (
      <div className="spinner" />
    )}
    </>
  );
};

export default Tweet;
