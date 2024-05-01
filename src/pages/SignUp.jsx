import React, { useEffect, useState } from "react";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import useAuth from "../context/AuthContext";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, formLoader } = useAuth();
  const onSubmit = (data) => {
    registerUser(data.username, data.email, data.password, data.name);
  };
  return (
    <>
      <Auth />
      <div className="overlay-div"></div>
      <div className="absolute-center z-10 size-full bg-primaryBg shadow-xl sm:h-auto sm:w-[600px] sm:rounded-2xl">
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
              Create account
            </h1>
            <form
              className="mb-3 w-full"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              {/* ToDo Name */}
              <div className=" relative">
                <input
                  type="text"
                  id="signup-name"
                  className={`input-field peer/form ${errors.name !== undefined && " ring-red"}`}
                  required
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                    minLength: {
                      value: 6,
                      message: "Name must contain 6 letters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name can contain only 20 letters",
                    },
                  })}
                />
                <label htmlFor="signup-name" className="label-txt ">
                  Enter Name
                </label>
                {errors.name && (
                  <p className="input-error">{errors.name.message}</p>
                )}
              </div>
              {/* ToDo Username */}
              <div className="relative my-7">
                <input
                  type="text"
                  id="signup-username"
                  className={`input-field peer/form ${errors.username !== undefined && " ring-red"}`}
                  required
                  {...register("username", {
                    required: { value: true, message: "Username is required" },
                    pattern: {
                      value: /^\S+$/,
                      message: `Username shouldn't have spaces`,
                    },
                    minLength: {
                      value: 6,
                      message: "Username must contain 6 letters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Username can contain only 20 letters",
                    },
                  })}
                />
                <label htmlFor="signup-username" className="label-txt ">
                  Enter Username
                </label>
                {errors.username && (
                  <p className="input-error">{errors.username.message}</p>
                )}
              </div>
              {/* ToDO Email */}
              <div className=" relative my-7">
                <input
                  type="text"
                  id="signup-email"
                  className={`input-field peer/form ${errors.email !== undefined && " ring-red"}`}
                  required
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: {
                      value:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,
                      message: "Invalid email pattern",
                    },
                  })}
                />
                <label htmlFor="signup-email" className="label-txt ">
                  Enter Email
                </label>
                {errors.email && (
                  <p className="input-error">{errors.email.message}</p>
                )}
              </div>
              {/* ToDo Password */}
              <div className="relative my-7">
                <input
                  type="password"
                  id="signup-password"
                  className={`input-field peer/form ${errors.password !== undefined && "ring-red"}`}
                  required
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                    minLength: {
                      value: 8,
                      message: "Password must contain 8 letters",
                    },
                  })}
                />
                <label htmlFor="signup-password" className="label-txt">
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
