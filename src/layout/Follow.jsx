import { useAuth } from "@/contexts";
import { Link } from "react-router-dom";
import { ProfileCard } from "@/components/user";

const Follow = () => {
  const { asideUsers } = useAuth();

  return (
    <section className="border-1 w-full overflow-hidden rounded-2xl">
      <h2 className="text-primaryTxt text-20 px-4 py-3 font-black">
        Who to follow
      </h2>
      {asideUsers.map((data) => <ProfileCard data={data} key={data.$id} />)}
      <Link to="/users" className="text-accent transition-200 hover:bg-hoverBg/70 block px-4 py-2">
        Show more
      </Link>
    </section>
  );
};

export default Follow;
