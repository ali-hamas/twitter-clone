import { useAuth } from "@/contexts";
import { Navbar, Aside } from "@/layout";
import { Outlet, Navigate } from "react-router-dom";

const SecureLayout = () => {
  const { user } = useAuth();

  return user ? (
    <section className="container relative mx-auto flex md:gap-2 lg:gap-4 xl:gap-8">
      <header className="sticky top-0 hidden h-dvh min-w-[70px] max-w-[260px] xs:block xs:min-w-[90px] xl:w-full">
        <Navbar />
      </header>
      <main className="min-h-dvh w-full max-w-[600px] border-x border-x-border pb-96">
        <Outlet />
      </main>
      <Aside />
    </section>
  ) : (
    <Navigate to={"/"} />
  );
};

export default SecureLayout;
