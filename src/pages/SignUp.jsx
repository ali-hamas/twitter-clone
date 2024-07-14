import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CrossIcon, TwitterIcon } from "@/icons";

const SignUp = () => {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { watch, register, handleSubmit, formState: { errors }} = useForm();
  document.title = "Sign Up / Twitter";
  

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await registerUser(data.email, data.password, data.name, data.username);
    } catch (error) {
      console.log(error);
      error.message.includes("Username already taken") && toast.error(error.message);
      error.message.includes("A user with the same id") && toast.error("User with same email already exist");
      error.message.includes("Rate limit for the current endpoint") && toast.error("Maximum signup limit reached");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitting) {
    return (
      <div className="overlay flex-center">
        <div className="model flex-center size-full py-10 sm:h-[520px] sm:w-[600px] sm:rounded-2xl">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  return (
    <div className="overlay flex-center">
      <div className="model size-full sm:h-[520px] sm:w-[600px] sm:rounded-2xl">
        <button tooltip="Close" className="cross-btn" onClick={() => navigate("/")}>
          <CrossIcon />
        </button>
        <div className="flex-center size-full flex-col py-10">
          <TwitterIcon />
          <h1 className="my-5 text-2xl font-black">Create your account</h1>
          <form className="w-75 mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="relative">
              <input type="text" id="name" maxLength={30} required 
                className={`text-field ${errors.name && "!border-danger focus:!ring-danger"}`}
                {...register("name", {
                  required: { value: true, message: "Name is required" },
                  minLength: { value: 3, message: "Name must contain 3 letters"},
                  maxLength: { value: 30, message: "Name can contain only 30 letters"}
                })}
              />
              <label htmlFor="name" className={`text-field-label ${errors.name && "!text-danger"}`}>Enter Name</label>
              <span className="text-field-count">{watch("name") ? watch("name").length : 0}/30</span>
              {errors.name && <p className="text-field-error">{errors.name.message}</p>}
            </div>
            <div className="relative">
              <input type="text" id="username" maxLength={30} required
                className={`text-field ${errors.username && "!border-danger focus:!ring-danger"}`}
                {...register("username", {
                  required: { value: true, message: "Username is required" },
                  minLength: { value: 3, message: "Username must contain 3 letters"},
                  maxLength: { value: 30, message: "Username can contain only 30 letters"},
                  pattern: { value: /^(?![._])(?!.*[.]{2,})[A-Za-z0-9._]{3,30}$/, message: `Invalid pattern`},
                })}
              />
              <label htmlFor="username" className={`text-field-label ${errors.username && "!text-danger"}`}>Enter Username</label>
              <span className="text-field-count">{watch("username") ? watch("username").length : 0}/30</span>
              {errors.username && <p className="text-field-error">{errors.username.message}</p>}
            </div>
            <div className="relative">
              <input type="text" id="email" required
                className={`text-field ${errors.email && "!border-danger focus:!ring-danger"}`}
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/,  message: "Invalid email pattern"},
                })}
              />
              <label htmlFor="email" className={`text-field-label ${errors.email && "!text-danger"}`}>Enter Email</label>
              {errors.email && <p className="text-field-error">{errors.email.message}</p>}
            </div>
            <div className="relative">
              <input type="password" id="password" required
                className={`text-field ${errors.password && "!border-danger focus:!ring-danger"}`}
                {...register("password", {
                  required: { value: true, message: "Password is required" },
                  minLength: { value: 8, message: "Password must contain 8 letters"},
                })}
              />
              <label htmlFor="password" className={`text-field-label ${errors.password && "!text-danger"}`}>Enter Password</label>
              {errors.password && <p className="text-field-error">{errors.password.message}</p>}
            </div>
            <div className="relative">
              <button className="btn accent-btn w-full">Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
