import { useAuth } from "@/contexts";
import { Outlet, Navigate } from "react-router-dom";

const SecureLayout = () => {
  const { user } = useAuth();
  return user ? (
    <section className="container relative mx-auto flex *:min-h-dvh md:gap-2 lg:gap-4 xl:gap-8">
      <header className="xs:min-w-[90px] min-w-[70px] max-w-[260px] xl:w-full">
        navbar
      </header>
      <main className="border-x-border w-full max-w-[600px] border-x">
        <Outlet />
      </main>
      <aside className="hidden max-w-[350px] lg:block lg:min-w-[300px] xl:w-full">
        aside
      </aside>
    </section>
  ) : (
    <Navigate to={"/"} />
  );
};

export default SecureLayout;
