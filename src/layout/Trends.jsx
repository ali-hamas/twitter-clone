import { ErrorIcon } from "@/icons";
import { useState, useEffect } from "react";

const Trends = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <section className="border-1 flex-center flex h-40 w-full flex-col gap-3 overflow-hidden rounded-2xl">
      {loading ? (
        <div className="spinner mx-0 my-0" />
      ) : (
        <>
          <ErrorIcon />
          <p className="text-secondryTxt text-17 text-center">
            Something went wrong, try reloading
          </p>
        </>
      )}
    </section>
  );
};

export default Trends;
