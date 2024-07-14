import { Header } from "@/layout";
import { ErrorIcon } from "@/icons";
import { useAuth } from "@/contexts";
import { getUsers } from "@/appwrite/auth";
import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/user";

const Users = () => {
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const fetchUsers = async () => {
    try {
      setLoading(true);
      let response = await getUsers(user.$id, 25);
      setUserData(response);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (error) {
    return (
      <>
        <Header title="Users" />
        <div className="flex-center mt-10 flex-col gap-4">
          <ErrorIcon className="size-20" />
          <p className="text-secondryTxt text-20 text-center">
            Something went wrong, try reloading
          </p>
          <button className="btn accent-btn" onClick={fetchUsers}>
            Reload
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="Users" />
      {!loading ? (
        userData.map((data) => <ProfileCard data={data} />)
      ) : (
        <div className="spinner my-20" />
      )}
    </>
  );
};

export default Users;
