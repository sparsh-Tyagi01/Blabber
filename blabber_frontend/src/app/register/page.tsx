'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "./loading";

export default function Register() {

     const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      setLoading(false);
    };

    load();
  }, []);
    

  const [formData, setFormData] = useState({
  name: "",
  username: "",
  email: "",
  password: ""
});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    if (res.ok) {
      alert("Registration successful!");
      window.location.href = "/login";
    } else {
      alert(result.detail || "Registration failed");
    }
  } catch (err) {
    console.error("Registration error:", err);
  }
};

useEffect(() => {
    localStorage.clear();
    },[])

    if(loading){
        return (
            <Loading/>
        )
    }

  return (
    <div className='h-screen bg-black/95 w-[100vw] overflow-hidden flex'>
        <div className='h-screen w-[60vw] bg-black border-r-1 border-white flex justify-center items-center'>
          <Image src="/image/blabberIcon.png" alt="logo" width={500} height={10}/>
        </div>
        <div className='h-screen w-[40vw] bg-black flex flex-col gap-10 justify-center items-center'>
          <h1 className="text-white text-3xl">Welcome!</h1>
          <div className="h-[50vh] w-[30vw] border-1 border-white rounded-2xl text-white">
            <form onSubmit={handleSubmit} className="mt-2 ml-5">
              <label htmlFor="name" className="block mt-2">Name:</label>
              <input id="name" name="name" type="text" placeholder="Enter your full name" required value={formData.name} onChange={handleChange} className="focus:outline-none"/>
              <label htmlFor="username" className="block mt-2">Username:</label>
              <input id="username" name="username" type="text" placeholder="Enter your username" required value={formData.username} onChange={handleChange} className="focus:outline-none"/>
              <label htmlFor="email" className="block mt-2">Email:</label>
              <input id="email" name="email" type="email" placeholder="Enter your email" required value={formData.email} onChange={handleChange} className="focus:outline-none"/>
              <label htmlFor="password" className="block mt-2">Password:</label>
              <input id="password" name="password" type="password" placeholder="Create your password" required value={formData.password} onChange={handleChange} className="focus:outline-none"/>
              <div className="flex flex-col justify-center items-center">
              <button type="submit" className="text-white bg-gray-800 p-1 rounded-2xl cursor-pointer hover:bg-gray-900">Register</button>
              <div className="flex">
                <span className="text-white">Already have an account?</span><Link href="/login" className="text-blue-700 ml-0.5">Login</Link>
              </div>
            </div>
            </form>
            
          </div>
        </div>
    </div>
  );
}