"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";

const EditImage = () => {
  const [username, setUsername] = useState("");

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/");
      return;
    }

    fetch("https://blabber-backend-9cgr.onrender.com/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          router.push("/");
        } else {
          setUsername(data.username);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        router.push("/");
      });
  }, []);

  const [formData, setFormData] = useState({
    imgurl: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await fetch(`https://blabber-backend-9cgr.onrender.com/image/${username}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    router.push("/profile");
  };

  return (
    <div className="h-screen w-[60vw] bg-black flex flex-col justify-center items-center border-1 border-x-white">
      <h1 className="text-white mb-1 text-xl shadow-2xl shadow-white">
        Upload Image
      </h1>
      <div className="h-[40vh] w-[40vw] border-2 border-white rounded-2xl flex flex-col justify-center items-center">
        <form onSubmit={handleSubmit}>
          <div className="text-white w-[40vw] h-[25vh] flex justify-center gap-2 items-center">
            <input
              type="text"
              name="imgurl"
              placeholder="Enter image URL"
              required
              onChange={handleChange}
              className="border-1 border-white rounded-2xl w-[20vw] p-0.5 pl-1"
            />
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              required
              value={formData.username}
              onChange={handleChange}
              className="focus:outline-none border-1 border-white rounded-2xl p-0.5 pl-1"
            />
          </div>
          <div className="w-[40vw] h-[15vh] flex justify-center items-center">
            <button
              type="submit"
              className="text-white cursor-pointer bg-gray-700 hover:bg-gray-800 p-2 rounded-xl transition-colors duration-200"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImage;
