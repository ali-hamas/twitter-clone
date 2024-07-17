import { cn } from "@/utils/cn";
import { useState } from "react";
import { useAuth } from "@/contexts";
import { followUser, unfollowUser } from "@/appwrite/db";

const FollowButton = ({ profileData }) => {
  const { user } = useAuth();
  const [hover, setHover] = useState(null);
  const [isFollowing, setIsFollowing] = useState(
    profileData.followers.includes(user.$id),
  );

  const handleClick = async (e) => {
    e.target.setAttribute("disabled", true);
    isFollowing
      ? await unfollowUser(profileData, user)
      : await followUser(profileData, user);
    e.target.removeAttribute("disabled");
    setIsFollowing((prevState) => !prevState);
  };

  if (profileData.$id === user.$id) {
    return <></>;
  }

  if (isFollowing) {
    return (
      <button
        onClick={handleClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className={cn("btn hollow-btn min-w-[101px]", {
          "border-red/50 bg-red/10 text-red": hover,
        })}
      >
        {hover ? "Unfollow" : "Following"}
      </button>
    );
  }

  return (
    <button className="btn theme-btn" onClick={handleClick}>
      Follow
    </button>
  );
};

export default FollowButton;
