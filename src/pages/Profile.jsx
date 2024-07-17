import { useDate } from "@/hooks";
import { useAuth } from "@/contexts";
import { copyLink } from "@/utils/utils";
import { Tweet } from "@/components/tweet";
import { useEffect, useState } from "react";
import { BackButton } from "@/layout/Header";
import { useParams } from "react-router-dom";
import { getProfileTweets } from "@/appwrite/db";
import { getProfileUser } from "@/appwrite/auth";
import { FollowButton } from "@/components/user";
import { DotsIcon, LinkIcon, VerifiedIcon } from "@/icons";
import { CalenderIcon, LocationIcon } from "@/icons/FormIcons";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Profile = () => {
  const { user } = useAuth();
  const { username } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileUser, setProfileUser] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        setLoading(true);
        let fetchedUser = await getProfileUser(username);
        let userTweets = await getProfileTweets(fetchedUser.$id, 25, 0);
        setProfileUser({ ...fetchedUser, tweets: userTweets });
        document.title = `${fetchedUser.profile_name} (@${fetchedUser.profile_username}) / Twitter`;
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [username]);

  if (loading) {
    return (
      <>
        <header className="header z-[2] flex items-center gap-5">
          <BackButton />
          <div>
            <div className="h-6 w-36 animate-pulse rounded-md bg-secondryBg lg:h-7" />
            <div className="mt-1 h-5 w-16 animate-pulse rounded-md bg-secondryBg" />
          </div>
        </header>
        <section className="h-32 w-full animate-pulse overflow-hidden border-b border-b-border bg-secondryBg md:h-50" />
        <section className="relative z-[1] -mt-12 px-2 lg:-mt-[70px] lg:px-4">
          <div className="size-24 overflow-hidden rounded-full border-4 border-primaryBg bg-secondryBg md:size-[140px]" />
        </section>
        <div className="spinner" />
      </>
    );
  }

  if (error) {
    return (
      <>
        <header className="header z-[2] flex items-center gap-5">
          <BackButton />
          <h1 className="text-17 font-black md:text-xl">User</h1>
        </header>
        <section className="h-32 w-full overflow-hidden border-b border-b-border bg-secondryBg md:h-50" />
        <section className="relative z-[1] -mt-12 px-2 lg:-mt-[70px] lg:px-4">
          <div className="size-24 overflow-hidden rounded-full border-4 border-primaryBg bg-secondryBg md:size-[140px]" />
        </section>
        <section className="px-2 py-3 lg:px-4">
          <h1 className="text-20/5 font-black lg:text-2xl/6">
            {`@${username}`}
          </h1>
          <div className="flex-center mt-10 flex-col gap-3">
            <h2 className="text-20 font-black lg:text-3xl">
              This account doesn't exist
            </h2>
            <p className="text-secondryTxt">Try searching for another</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <header className="header z-[2] flex items-center gap-5">
        <BackButton />
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-17 font-black md:text-xl">
              {profileUser.profile_name}
            </h1>
            {profileUser.verified && <VerifiedIcon className="lg:size-5 lg:min-w-5" />}
          </div>
          <p className="w-fit text-13 text-secondryTxt">{`${profileUser.tweets.length} tweets`}</p>
        </div>
      </header>
      <section className="relative w-full">
        <div className="h-32 w-full overflow-hidden border-b border-b-border bg-secondryBg md:h-50">
          {profileUser.header_img && <img src={profileUser.header_img} className="size-full min-h-32 cursor-pointer object-cover" />}
        </div>
      </section>
      <section className="flex flex-col gap-y-3 border-b border-b-border px-2 py-3 lg:px-4">
        <div className="flex justify-between">
          <div className="relative z-[1] -mt-[52px] lg:-mt-[76px]">
            <div className="size-24 overflow-hidden rounded-full border-4 border-primaryBg bg-secondryBg md:size-[140px]">
              <img src={profileUser.profile_img} className="size-full bg-hoverBg object-cover" />
            </div>
          </div>
          <div className="flex h-fit items-center gap-x-3">
            <Menu>
              <MenuButton tooltip="More" className="ml-auto rounded-full border border-[#536471] p-1">
                <DotsIcon className="size-5 fill-primaryTxt xl:size-5" />
              </MenuButton>
              <MenuItems transition className="transition-menu relative z-10" anchor={{ to: "bottom end", gap: "5px" }}>
                <MenuItem>
                  <button className="menu-item" onClick={() => copyLink(`/users/${username}`)}>
                    <LinkIcon className="fill-primaryTxt" />
                    Copy link to profile
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
            {profileUser.$id === user.$id ? (
              <button className="btn hollow-btn h-9">Edit Profile</button>
            ) : (
              <FollowButton profileData={profileUser} />
            )}
          </div>
        </div>
        <div>
          <h1 className="text-20/5 font-black lg:text-2xl/6">
            {profileUser.profile_name}
          </h1>
          <p className="text-15 text-secondryTxt lg:text-17">
            {`@${profileUser.profile_username}`}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {profileUser.bio && <p className="whitespace-pre-line break-words text-15 lg:text-17">{profileUser.bio}</p>}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-15 text-secondryTxt">
            {profileUser.location && (
              <div className="flex items-center gap-1">
                <LocationIcon className="size-5 fill-secondryTxt" />
                <p>{profileUser.location}</p>
              </div>
            )}
            {profileUser.website && (
              <div className="flex items-center gap-1">
                <LinkIcon className="size-5 fill-secondryTxt" />
                <a target="_blank" href={`https://${profileUser.website}`}
                  className="cursor-pointer text-accent underline-offset-2 hover:underline">
                  {profileUser.website}
                </a>
              </div>
            )}
            <div className="flex items-center gap-1">
              <CalenderIcon className="size-5 fill-secondryTxt" />
              <p tooltip={useDate(profileUser.$createdAt)} className="cursor-pointer underline-offset-2 hover:underline">
                {`Joined ${useDate(profileUser.$createdAt, "profile")}`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-x-3 *:cursor-pointer">
          <div className="transition-200 flex items-center gap-1 border-b border-b-transparent hover:border-b-primaryTxt">
            <span>{profileUser.following.length}</span>
            <span className="text-secondryTxt">Following</span>
          </div>
          <div className="transition-200 flex items-center gap-1 border-b border-b-transparent hover:border-b-primaryTxt">
            <span>{profileUser.followers.length}</span>
            <span className="text-secondryTxt">Followers</span>
          </div>
        </div>
      </section>
      <section className="pb-96">
        {profileUser.tweets.length > 0 ? (
          profileUser.tweets.map((data) => <Tweet key={data.$id} data={data} />)
        ) : (
          <div className="mt-5">
            <h1 className="text-center text-20 font-black lg:text-3xl">{`@${username} hasn't tweeted`}</h1>
            <p className="text-center text-secondryTxt">
              When they do, their Tweets will show up here.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Profile;
