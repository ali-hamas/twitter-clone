import React, { useEffect, useState } from "react";
import Auth, { OAuthButtons } from "./Auth";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthContext";

const SignUp = () => {
  useEffect(() => {
    document.body.style.background = "var(--dim-primary-bg)";
  }, []);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const { registerUser } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formValues.email, formValues.password, formValues.name);
    registerUser(formValues.email, formValues.password, formValues.name);
  };
  return (
    <>
      <Auth />
      <div className="absolute-center size-full bg-primaryBg sm:h-auto sm:w-[600px] sm:rounded-2xl">
        <div className="relative size-full">
          <Link to={"/"} className="cross-btn">
            &#10005;
          </Link>
          <div className="w-300 relative mx-auto flex h-full flex-col items-center py-5 pb-10">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-9">
              <g>
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </g>
            </svg>
            <h1 className="my-5 font-chirp-bold text-[32px]">Create account</h1>
            <OAuthButtons text="Sign up" />
            <form className="mb-3 w-full" onSubmit={handleSubmit}>
              <div className=" relative">
                <input
                  name="name"
                  type="text"
                  id="signup-name"
                  className="input-field peer/name"
                  onChange={handleFormChange}
                  value={formValues.name}
                  required
                />
                <label
                  htmlFor="signup-name"
                  className="label-txt peer-focus/name:text-12 peer-valid/name:text-12 peer-valid/name:top-3 peer-focus/name:top-3 peer-focus/name:text-accent"
                >
                  Enter Name
                </label>
              </div>
              <div className=" relative my-5">
                <input
                  name="email"
                  type="text"
                  id="signup-email"
                  className="input-field peer/email"
                  onChange={handleFormChange}
                  value={formValues.email}
                  required
                />
                <label
                  htmlFor="signup-email"
                  className="label-txt peer-focus/email:text-12 peer-valid/email:text-12 peer-valid/email:top-3 peer-focus/email:top-3 peer-focus/email:text-accent"
                >
                  Enter Email
                </label>
              </div>
              <div className="relative my-5">
                <input
                  name="password"
                  type="password"
                  id="signup-password"
                  className="input-field peer/password"
                  onChange={handleFormChange}
                  value={formValues.password}
                  required
                />
                <label
                  htmlFor="signup-password"
                  className="label-txt peer-focus/password:text-12 peer-valid/password:text-12 peer-valid/password:top-3 peer-focus/password:top-3 peer-focus/password:text-accent"
                >
                  Enter Password
                </label>
              </div>
              <button type="submit" className="accent-btn h-10 w-full">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
