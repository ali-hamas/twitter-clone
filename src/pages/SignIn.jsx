import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { CrossIcon, TwitterIcon } from "@/icons";

const SignIn = () => {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }} = useForm();
  document.title = "Sign In / Twitter";


  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      await loginUser(data.email, data.password);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setIsSubmitting(false);
  };

  if (isSubmitting) {
    return (
      <div className="overlay flex-center">
        <div className="model flex-center size-full py-10 sm:h-[566px] sm:w-[600px] sm:rounded-2xl">
          <div className="spinner" />
        </div>
      </div>
    );
  }
  return (
    <div className="overlay flex-center">
      <div className="model size-full sm:h-auto sm:w-[600px] sm:rounded-2xl">
        <button tooltip="close" className="cross-btn" onClick={() => navigate("/")}>
          <CrossIcon />
        </button>
        <div className="flex-center size-full flex-col py-10">
          <TwitterIcon />
          <h1 className="my-5 text-2xl font-black">Sign in to Twitter</h1>
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
              <div className="border-1 w-full"></div>
              <div className="text-primaryTxt">or</div>
              <div className="border-1 w-full"></div>
            </div>
          </div>
          <form className="w-75 mx-auto mt-3 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="relative">
              <input type="text" id="email" required
                className={`text-field ${errors.email && "!border-danger focus:!ring-danger"}`}
                {...register("email", {
                  required: { value: true, message: "Email is required" },
                  pattern: { value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/, message: "Invalid email pattern"}
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
                  minLength: { value: 8, message: "Password must contain 8 letters"}
                })}
              />
              <label htmlFor="password" className={`text-field-label ${errors.password && "!text-danger"}`}>Enter Password</label>
              {errors.password && <p className="text-field-error">{errors.password.message}</p>}
            </div>
            <div className="relative">
              <button className="btn accent-btn w-full">Sign In</button>
            </div>
          </form>
          <button className="btn hollow-btn w-75 mt-8">Forget password</button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
