import Auth, { OAuthButtons } from "./Auth";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, formLoader } = useAuth();

  const onSubmit = (data) => {
    loginUser(data.email, data.password);
  };

  return (
    <>
      <Auth />
      <div className="overlay-div"></div>
      <div className="absolute-center z-10 size-full min-h-600 bg-primaryBg shadow-xl sm:h-auto sm:w-[600px] sm:rounded-2xl">
        <div className="relative size-full">
          <Link to={"/"} className="cross-btn">
            &#10005;
          </Link>
          <div className="relative mx-auto flex h-full w-300 flex-col items-center justify-center py-10">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-9">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
            <h1 className="my-5 font-chirp-black text-[32px] font-bold">
              Sign in to X
            </h1>
            <OAuthButtons text="Sign in" />
            <form
              className="mb-3 w-full"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className=" relative">
                <input
                  type="text"
                  id="signin-email"
                  className={`input-field peer/form ${errors.email !== undefined && " ring-red"}`}
                  required
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email address",
                    },
                  })}
                />
                <label htmlFor="signin-email" className="label-txt">
                  Enter Email
                </label>
                {errors.email && (
                  <p className="input-error">{errors.email.message}</p>
                )}
              </div>
              <div className="relative my-7">
                <input
                  type="password"
                  id="signin-password"
                  className={`input-field peer/form ${errors.password !== undefined && " ring-red"}`}
                  required
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                    minLength: {
                      value: 8,
                      message: "Password must contain 8 letters",
                    },
                  })}
                />
                <label htmlFor="signin-password" className="label-txt">
                  Enter Password
                </label>
                {errors.password && (
                  <p className="input-error">{errors.password.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="accent-btn h-10 w-full"
                disabled={formLoader}
              >
                Sign In
              </button>
            </form>
            <Link to={"/"} className="hollow-btn mt-4 w-full">
              Forgot password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
