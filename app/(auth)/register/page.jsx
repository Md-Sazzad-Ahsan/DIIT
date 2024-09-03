"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";



export default function Register() {
  const [formData, setFormData] = useState({
    // username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });


  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email) =>{
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
    
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("This email is invalid");
      return;
    }
    if(!password || password.length < 8) {
      setError("The password must be at least 8 characters");
      setError("");
      return;
    }

    try{
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 400) {
       setError("This email is already registered.")
      }if (res.status ===200) {
        setError("");
        router.push("/login");
      }
    }catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-darkBg">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-100 dark:bg-darkBg rounded md:shadow-lg">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-100">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-400 bg-gray-50 dark:bg-darkBg"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-100">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-400 bg-gray-50 dark:bg-darkBg"
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-100">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-teal-400 bg-gray-50 dark:bg-darkBg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-600 text-white font-semibold rounded hover:bg-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-400"
          >
            Sign Up
          </button>
          <p className="text-red-500 text-xs mb-2">{error && error}</p>
        </form>
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
          <p className="text-gray-700 dark:text-gray-100">Sign up with </p>
        <div className="flex justify-center space-x-4">
          <button className="flex items-start justify-center w-full px-4 py-2 border border-gray-200 rounded hover:bg-gray-100 focus:outline-none">
            Google
          </button>
          <button className="flex items-center justify-center w-full px-4 py-2 border border-gray-200 rounded hover:bg-gray-100 focus:outline-none">
            GitHub
          </button>
        </div>
        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-teal-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
