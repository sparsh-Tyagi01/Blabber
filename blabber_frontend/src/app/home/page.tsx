"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import Loading from "./loading";
import { SmoothCursor } from "@/components/cursor";
import { Meteors } from "@/components/magicui/meteors";

type Post = {
  id: number;
  description: string;
  category: string;
  image: string;
  username: string;
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    load();
  }, []);

  const [data, setData] = useState<Post[]>([]);
  useEffect(() => {
    const handlePost = async () => {
      const res = await fetch(
        "https://blabber-backend-9cgr.onrender.com/posts",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      setData(result);
    };

    handlePost();
  }, []);

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

          const likedRes = await fetch(
            `https://blabber-backend-9cgr.onrender.com/likes/${data.username}`
          );
          const likedIds: number[] = await likedRes.json();
          const likedMap: { [key: number]: boolean } = {};
          likedIds.forEach((id) => (likedMap[id] = true));
          setLikedPosts(likedMap);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        router.push("/");
      });
  }, []);

  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});

  async function likeHandler(postid: number, userid: string) {
    const result = await fetch(
      "https://blabber-backend-9cgr.onrender.com/like",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postid, user_id: userid }),
      }
    );
    const likes = await result.json();
    setLikedPosts((prev) => ({ ...prev, [postid]: likes.status === "like" }));
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-hidden h-screen w-full">
      <Meteors />
      <div className="h-screen bg-black/95 w-[60vw] overflow-hidden border-x-1 border-white">
        <SmoothCursor />
        <div className="flex justify-around">
          <h1 className="text-white text-4xl font-sans mt-10 ml-5 ">
            All Posts
          </h1>
          <h1 className="text-white text-2xl font-sans mt-10 ml-5 text-shadow-white text-shadow-2xs border-1 border-white py-1 px-2 rounded-xl shadow-fuchsia-100 shadow-xl">
            {username}
          </h1>
        </div>
        <div className="h-[100%] w-[100%] flex justify-center items-center">
          <div className="h-[80vh] w-[55vw] border-2 rounded-2xl overflow-auto hide-scrollbar border-double border-white text-white flex flex-col items-center">
            {data.map((post) => (
              <div key={post.id}>
                <div className="flex flex-col justify-between items-center text-2xs text-cyan-100 font-bold w-[50vw]  border-6 border-r-12 border-r-fuchsia-500 border-t-pink-500 border-b-emerald-600 rounded-xl mt-2 mb-14 p-2">
                  <div className="flex justify-start w-[45vw]">
                    <p className="text-blue-300">By: {post.username}</p>
                  </div>
                  {post.description}
                  <img
                    src={post.image}
                    alt=""
                    className="rounded-xl w-[50vw] mt-1"
                  />
                  <div>
                    <p
                      onClick={() =>
                        likeHandler(Number(post.id), String(username))
                      }
                      className={`${
                        likedPosts[post.id] ? "text-red-700" : "text-white"
                      } flex items-center justify-start text-4xl mt-0.5 cursor-pointer transition-colors duration-200`}
                    >
                      ♥
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
