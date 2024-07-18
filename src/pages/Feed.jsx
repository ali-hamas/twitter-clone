import { Header } from "@/layout";
import { useEffect } from "react";
import { useTweet } from "@/contexts";
import { Form, Tweet } from "@/components/tweet";

const Feed = () => {
  const { tweets } = useTweet();
  document.title = "Home / Twitter";

  useEffect(() => {
    const handleScroll = async () => {
      const scrolledHeight = window.scrollY;
      const visibleHeight = window.innerHeight;
      const totalHeight = document.body.scrollHeight;
      if (scrolledHeight + visibleHeight >= totalHeight) {
        console.log("end");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header title="Home" back={false} />
      <section className="w-full">
        <Form />
      </section>
      <section className="w-full pb-96">
        {console.log(tweets)}
        {tweets.map((data, index) => {
          return <Tweet key={index} tweet={data} />;
        })}
        <div className="spinner" />
      </section>
    </>
  );
};

export default Feed;
