"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FaFacebook, FaLinkedin } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { MdError } from 'react-icons/md';

interface LoginInputs {
  email: string;
  password: string;
}

const CredentialsErrorMessage: React.FC = () => (
  <div className="flex justify-center gap-1 items-center mt-5 text-[#000000]">
    <MdError />
    <p className="text-xs">Unknown email address. Try again!</p>
  </div>
);

const SocialLoginIcons: React.FC = () => (
  <div className="flex justify-center items-center gap-3 mt-3">
    <FcGoogle 
      size="24px" 
      className="cursor-pointer hover:opacity-80 transition" 
      aria-label="Sign in with Google" 
    />
    <FaFacebook 
      size="24px" 
      className="cursor-pointer hover:opacity-80 transition text-blue-600" 
      aria-label="Sign in with Facebook" 
    />
    <FaLinkedin 
      size="24px" 
      className="cursor-pointer hover:opacity-80 transition text-blue-800" 
      aria-label="Sign in with LinkedIn" 
    />
  </div>
);

const loginService = {
  async signIn(credentials: LoginInputs) {
    try {
      const response = await fetch('https://social-login.druckland.de/api/v1/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
};

const Login: React.FC = () => {
  const [showCredentialsError, setShowCredentialsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setShowCredentialsError(false);
    setIsLoading(true);

    try {
      const result = await loginService.signIn(data);
      console.log('Login successful:', result);
      // TODO: Handle successful login (e.g., redirect, set auth context)
    } catch {
      setShowCredentialsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl lg:p-8 p-4 max-w-md mx-auto">
      <header className="text-center mb-6">
        <h2 className="text-[#0F0F0F] text-2xl font-bold capitalize">
          Drukland.de
        </h2>
        <h3 className="text-base font-semibold text-[#0F0F0F] mt-3">
          Sign In to your account
        </h3>
        <p className="text-[#292929] text-sm mt-2">
          {"Don't"} have an account?{" "}
          <Link 
            href="/register" 
            className="text-black font-medium hover:underline"
          >
            Register
          </Link>
        </p>
      </header>

      {showCredentialsError && <CredentialsErrorMessage />}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label 
            htmlFor="email" 
            className="block text-sm font-medium text-[#292929] mb-1"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            aria-describedby="emailError"
            {...register("email", { 
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid email address"
              }
            })}
            className={`block w-full p-2 border-b outline-none 
              ${errors.email ? 'border-red-500' : 'border-gray-300'}
              focus:border-black transition`}
            disabled={isLoading}
          />
          {errors.email && (
            <p id="emailError" className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label 
            htmlFor="password" 
            className="block text-sm text-[#292929] mb-1"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            aria-describedby="passwordError"
            {...register("password", { 
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters"
              }
            })}
            className={`block w-full p-2 border-b outline-none 
              ${errors.password ? 'border-red-500' : 'border-gray-300'}
              focus:border-black transition`}
            disabled={isLoading}
          />
          {errors.password && (
            <p id="passwordError" className="text-xs text-red-500 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center">
          <input 
            type="checkbox" 
            id="terms" 
            className="mr-2" 
            required 
          />
          <label htmlFor="terms" className="text-sm text-[#292929]">
            I agree to all{" "}
            <Link 
              href="/terms" 
              className="font-semibold text-black hover:underline"
            >
              Terms & Conditions
            </Link>
          </label>
        </div>

        <button
          type="submit"
          className={`w-full text-white py-2 rounded-md font-medium transition 
            ${isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-black hover:bg-gray-800'
            }`}
          disabled={isLoading}
        >
          {isLoading ? 'Logging In...' : 'Log In'}
        </button>

        <div className="mt-5 flex items-center justify-center">
          <div className="border-b border-gray-400 w-full"></div>
          <div className="w-full text-center text-sm text-[#676767]">
            or sign in with
          </div>
          <div className="border-b border-gray-400 w-full"></div>
        </div>

        <SocialLoginIcons />
      </form>
    </div>
  );
};

export default Login;