import Search from "./Search";
import Follow from "./Follow";
import { useState, useEffect } from "react";

const Aside = () => {
  const [aside, setAside] = useState(false);

  const handleResize = () => {
    setAside(window.innerWidth > 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    aside && (
      <aside className="max-w-[350px] lg:min-w-[300px] xl:w-full mr-2">
        <div className="sticky top-2 w-full space-y-4">
          <Search />
          <section className="border-1 w-full space-y-2.5 rounded-2xl bg-primaryBg px-4 py-3">
            <h2 className="text-20 font-black text-primaryTxt">
              Fork it on GitHub
            </h2>
            <p className="text-15 font-regular text-primaryTxt">
              Explore the codebase behind Twitter and contribute to its
              development.
            </p>
            <a target="_blank" href="https://github.com/ali-hamas/twitter-clone" className="btn accent-btn flex-center w-fit">
              GitHub Repo
            </a>
          </section>
          <Follow />
          <section className="flex flex-wrap justify-center gap-x-3 gap-y-0 text-sm text-secondryTxt hover:*:underline">
            <a target="_blank" href="https://x.com/en/tos">Terms of Service</a>
            <a target="_blank" href="https://x.com/en/privacy">Privacy Policy</a>
            <a target="_blank" href="https://help.twitter.com/en/rules-and-policies/x-cookies">Cookie Policy</a>
            <a target="_blank" href="https://help.x.com/en/resources/accessibility">Accessibility</a>
            <a target="_blank" href="https://business.x.com/en/help/troubleshooting/how-x-ads-work.html">Ads info</a>
            <a target="_blank" href="https://x.com">More</a>
            <span className="hover:!no-underline">&copy; 2024 X Corp.</span>
        </section>
        </div>
      </aside>
    )
  );
};

export default Aside;
