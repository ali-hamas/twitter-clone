import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

const ProfileImage = ({ data, className }) => {
  return (
    <Link to={`/users/${data.profile_username}`} className="size-fit">
      <img src={data.profile_img} className={cn("bg-secondryBg size-10 min-h-10 min-w-10 rounded-full", className)}/>
    </Link>
  );
};

export default ProfileImage;