import { cn } from "@/utils/cn";
import { VerifiedIcon } from "@/icons";
import { Link } from "react-router-dom";

const ProfileName = ({ data, className }) => {
  return (
    <Link to={`/users/${data.profile_username}`} className={cn("text-15 text-primaryTxt flex items-center gap-1.5 font-bold", className)}>
      {data.profile_name}
      {data.verified && <VerifiedIcon />}
    </Link>
  );
};

export default ProfileName;
