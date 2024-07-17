import { ErrorIcon } from "@/icons";
import { useAuth } from "@/contexts";
import { Link } from "react-router-dom";
import { getUsers } from "@/appwrite/auth";
import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/user";

const Follow = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [asideUsers, setAsideUsers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setError(false);
        setLoading(true);
        let res = await getUsers(user.$id, 3);
        setAsideUsers(res);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading || error) {
    return (
      <section className="border-1 flex-center h-75 w-full rounded-2xl">
        {loading && <div className="spinner mx-0 my-0" />}
        {error && (
          <div className="flex-center flex-col gap-2">
            <ErrorIcon />
            <p className="text-secondryTxt">
              Something went wrong, try reloading
            </p>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="border-1 w-full overflow-hidden rounded-2xl">
      <h2 className="px-4 py-3 text-20 font-black text-primaryTxt">
        Who to follow
      </h2>
      {asideUsers.map((data) => <ProfileCard data={data} key={data.$id} />)}
      <Link to="/users" className="transition-200 block px-4 py-2 text-accent hover:bg-hoverBg/70">
        Show more
      </Link>
    </section>
  );
};

export default Follow;
