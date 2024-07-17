import { Header } from "@/layout";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts";
import { Form, Tweet } from "@/components/tweet";

const Feed = () => {
  const { tweets } = useAuth();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Home / Twitter";
  }, []);

  console.log("useTweets changed");
  return (
    <>
      <Header title="Home" back={false} />
      <section className="w-full">
        <Form />
      </section>
      <section className="w-full pb-96">
        {tweets.map((data) => (
          <Tweet key={data.$id} data={data} />
        ))}
      </section>
    </>
  );
};

export default Feed;
