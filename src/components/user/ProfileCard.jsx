import { FollowButton } from "./";
import { Link } from "react-router-dom";

const ProfileCard = ({ data }) => {
  return (
    <Link to={`/users/${data.profile_username}`} className="transition-200 flex items-center gap-3 px-4 py-3 hover:bg-hoverBg/70">
      <img src={data.profile_img} alt="profile image" className="size-10 min-w-10 rounded-full bg-secondryBg" />
      <div>
        <p className="profile-name">{data.profile_name}</p>
        <p className="profile-username">{`@${data.profile_username}`}</p>
      </div>
      <div className="ml-auto cursor-pointer" onClick={(e) => e.preventDefault()}>
        <FollowButton profileData={data} />
      </div>
    </Link>
  );
};

export default ProfileCard;
