import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

const ProfileUsername = ({ data, className }) => {
  return (
    <Link to={`/users/${data.profile_username}`} className={cn("text-15 font-regular text-secondryTxt", className)}>
      {`@${data.profile_username}`}
    </Link>
  );
};

export default ProfileUsername;
