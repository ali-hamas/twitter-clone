import { useAuth } from "@/contexts";
import { Follow, Navbar, Search } from "@/layout";
import { Outlet, Navigate } from "react-router-dom";

const SecureLayout = () => {
  const { user } = useAuth();
  return user ? (
    <section className="container relative mx-auto flex md:gap-2 lg:gap-4 xl:gap-8">
      <header className="xs:block xs:min-w-[90px] sticky top-0 hidden h-dvh min-w-[70px] max-w-[260px] xl:w-full">
        <Navbar />
      </header>
      <main className="border-x-border w-full max-w-[600px] border-x">
        <Outlet />
      </main>
      <aside className="hidden max-w-[350px] lg:block lg:min-w-[300px] xl:w-full">
        <div className="sticky top-2 w-full space-y-4">
          <Search />
          <section className="border-1 bg-primaryBg w-full space-y-2.5 rounded-2xl px-4 py-3">
            <h2 className="text-primaryTxt text-20 font-black">
              Subscribe to Premium
            </h2>
            <p className="text-primaryTxt font-regular text-15">
              Subscribe to unlock new features and if eligible, receive a share
              of ads revenue.
            </p>
            <button className="btn accent-btn">Subscribe</button>
          </section>
          <Follow />
          <section className="text-secondryTxt flex flex-wrap justify-center gap-x-3 gap-y-0 text-sm hover:*:underline">
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
    </section>
  ) : (
    <Navigate to={"/"} />
  );
};

export default SecureLayout;
