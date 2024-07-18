import { Header } from "@/layout";
import { useAuth } from "@/contexts";
import { Tweet } from "@/components/tweet";
import { useEffect, useState } from "react";
import { getBookarks } from "@/appwrite/db";

const Bookmarks = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState([]);
  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      let res = await getBookarks(user.$id, 25);
      setBookmarks(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <>
      <Header title="Bookmarks" />
      <section>
        {!loading ? (
          bookmarks.length > 0 ? (
            bookmarks.map((data) => (
              <Tweet key={data.$id} tweet={data} />
            ))
          ) : (
            <div className="mx-auto flex w-[90%] flex-col items-center justify-center mt-10 gap-2 md:w-2/3">
              <img src="/no-bookmarks.png" className="w-full" />
              <h1 className="mt-4 text-center text-2xl font-black md:text-3xl">
                Save Tweets for later
              </h1>
              <p className="mt-2 text-center text-13 text-secondryTxt md:text-15">
                Don't let the good ones fly away! Bookmark Tweets to easily find
                them again in the future.
              </p>
            </div>
          )
        ) : (
          <div className="spinner" />
        )}
      </section>
    </>
  );
};

export default Bookmarks;
