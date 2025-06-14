"use client";
import Link from "next/link";
import { useState } from "react";
import React from "react";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://blabber-backend-9cgr.onrender.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();
      if (res.ok) {
        localStorage.clear();
        localStorage.setItem("token", result.access_token);
        window.location.href = "/home";
      } else {
        alert(result.detail || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <div className="h-screen w-[100vw] bg-black flex justify-center items-center">
      <div className="h-[40vh] w-[30vw] border-2 border-white rounded-2xl shadow-2xl shadow-white">
        <form
          method="post"
          onSubmit={handleLogin}
          className="flex flex-col justify-center items-center mt-5"
        >
          <div className="mb-2">
            <label htmlFor="username" className="text-white mr-2 text-xl">
              Username:
            </label>
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              value={formData.username}
              onChange={handleChange}
              className="text-white focus:outline-none"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="text-white mr-2 text-xl">
              Password:
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              value={formData.password}
              onChange={handleChange}
              className="text-white focus:outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="text-white text-xl bg-gray-500 rounded-xl p-1 cursor-pointer hover:bg-gray-600 mt-10"
            >
              Login
            </button>
          </div>
          <Link href="/register" className="text-blue-600 mt-3">
            Go to Register page
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
