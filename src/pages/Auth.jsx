import { TwitterIcon } from "@/icons";
import { useNavigate, Outlet } from "react-router-dom";

const Auth = () => {
  document.title = "Twitter";
  const navigate = useNavigate();

  return (
    <>
      <section className="flex-center min-h-dvh lg:gap-25 xl:gap-50">
        <div className="hidden lg:flex lg:items-center lg:justify-center">
          <TwitterIcon className="size-[350px]" />
        </div>
        <div>
          <h1 className="mb-10 text-[40px] font-black sm:text-[64px]">Happening now</h1>
          <h2 className="mb-8 text-[22px] font-bold sm:text-3xl">Join today.</h2>
          <div className="w-75 space-y-3">
            <button className="btn flex-center w-full gap-3 bg-[#EFF3F4] text-[#0F1418]">
              <img src="https://cdn-icons-png.flaticon.com/128/281/281764.png" className="size-5"/>
              Sign up with Google
            </button>
            <button className="btn flex-center w-full gap-3 bg-[#EFF3F4] text-[#0F1418]">
              <img src="https://cdn-icons-png.flaticon.com/128/1051/1051326.png" className="size-5"/>
                Sign up with Github
              </button>
            <div className="flex-center w-full gap-3">
              <div className="w-full border-1"></div>
              <div className="text-primaryTxt">or</div>
              <div className="w-full border-1"></div>
            </div>
          </div>
          <button className="btn accent-btn w-75 mt-3" onClick={() => navigate("/signup")}>
            Sign Up with email
          </button>
          <p className="text-17 mt-10 font-bold">Already have an account?</p>
          <button className="btn hollow-btn w-75 mt-2" onClick={() => navigate("/signin")}>
            Sign In
          </button>
        </div>
      </section>
      <Outlet />
    </>
  );
};

export default Auth;
