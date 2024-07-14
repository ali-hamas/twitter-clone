import { useAuth } from "@/contexts";
import { Outlet, Navigate } from "react-router-dom";
import { Follow, Navbar, Search, Trends } from "@/layout";

const SecureLayout = () => {
  const { user } = useAuth();
  return user ? (
    <section className="container relative mx-auto flex md:gap-2 lg:gap-4 xl:gap-8">
      <header className="xs:block xs:min-w-[90px] hidden h-dvh min-w-[70px] max-w-[260px] xl:w-full">
        <Navbar />
      </header>
      <main className="border-x-border w-full max-w-[600px] border-x">
        <Outlet />
      </main>
      <aside className="hidden max-w-[350px] space-y-4 lg:block lg:min-w-[300px] xl:w-full">
        <Search />
        <section className="border-1 bg-primaryBg w-full space-y-2.5 rounded-2xl px-4 py-3">
          <h2 className="text-primaryTxt text-20 font-black">
            Subscribe to Premium
          </h2>
          <p className="text-primaryTxt font-regular text-15">
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </p>
          <button className="btn accent-btn">Subscribe</button>
        </section>
        <Trends />
        <Follow />
      </aside>
    </section>
  ) : (
    <Navigate to={"/"} />
  );
};

export default SecureLayout;
