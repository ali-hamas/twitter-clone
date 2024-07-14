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
  const [userData, setUserData] = useState([]);

  const fetchAsideUsers = async () => {
    try {
      setLoading(true);
      let response = await getUsers(user.$id);
      setUserData(response);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAsideUsers();
  }, []);

  if (error) {
    return (
      <section className="border-1 flex-center flex h-40 w-full flex-col gap-3 overflow-hidden rounded-2xl">
        <ErrorIcon />
        <p className="text-secondryTxt text-17 text-center">
          Something went wrong, try reloading
        </p>
      </section>
    );
  }

  return (
    <section className="border-1 w-full overflow-hidden rounded-2xl">
      <h2 className="text-primaryTxt text-20 px-4 py-3 font-black">
        Who to follow
      </h2>
      {!loading ? (
        <>
          {userData.map((data) => <ProfileCard data={data} />)}
          <Link to="/users" className="text-accent transition-200 hover:bg-hoverBg/70 block px-4 py-2">
            Show more
          </Link>
        </>
      ) : (
        <div className="spinner my-20" />
      )}
    </section>
  );
};

export default Follow;
