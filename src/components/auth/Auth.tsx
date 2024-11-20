"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdError } from "react-icons/md";

// Types for form inputs
type Inputs = {
  email: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("https://social-login.druckland.de/api/v1/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const result = await res.json();
        console.log(result);
      } else {
        console.error("Failed to login:", res.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl lg:p-8 p-4">
      <h2 className="text-[#0F0F0F] text-3xl font-medium text-center capitalize">
        Drukland.de
      </h2>
      <h3 className="text-2xl font-regular text-center text-[#0F0F0F] mt-3">
        Sign In to your account
      </h3>
      <p className="text-[#292929] text-sm font-regular text-center">
        {"Don’t"} have an account?{" "}
        <Link href="/" className="text-black font-medium">
          Register
        </Link>
      </p>

      <div className="flex justify-center gap-1 items-center mt-5">
        <MdError />
        <p className="text-[12px]">Unknown email address. Try again!</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/* Email Input */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#292929]"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            aria-describedby="emailError"
            {...register("email", { required: "Email is required" })}
            className={`block w-full py-1 border-b outline-none border-black ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p id="emailError" className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-regular text-[#292929]"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            aria-describedby="passwordError"
            {...register("password", { required: "Password is required" })}
            className={`block w-full py-1 border-b outline-none border-black ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p id="passwordError" className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center">
          <input type="checkbox" id="terms" className="mr-2" />
          <label htmlFor="terms" className="text-sm text-[#292929]">
            I agree to all{" "}
            <Link href="/" className="font-semibold text-black">
              Terms & Conditions
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition"
        >
          Log In
        </button>

        {/* Social Media Login */}
        <div className="mt-5 flex items-center justify-center">
          <div className="border-b border-gray-400 w-full"></div>
          <div className="w-full text-center text-sm text-[#676767]">
            or sign in with
          </div>
          <div className="border-b border-gray-400 w-full"></div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center items-center gap-3 mt-3">
          <FcGoogle size="24px" />
          <FaFacebook size="24px" />
          <FaLinkedin size="24px" />
        </div>
      </form>
    </div>
  );
}