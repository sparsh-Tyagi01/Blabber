"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "./loading";

type Post = {
  id: number;
  description: string;
  category: string;
  image: string;
  username: string;
};

type userImg = {
  id: number;
  imgurl: string;
  username: string;
};

const Profile = () => {
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

  const [formData, setFormData] = useState({
    description: "",
    username: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch(
      `https://blabber-backend-9cgr.onrender.com/profile/${username}`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    alert("Profile updated.");
  };

  const [desc, setDesc] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!username) return;
    const descHandle = async () => {
      const res = await fetch(
        `https://blabber-backend-9cgr.onrender.com/profile/${username}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (result && result.description) {
        setDesc(result.description);
      }
    };

    descHandle();
  }, [username]);

  const [name, setName] = useState("");

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
          setName(data.name);

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
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ post_id: postid, user_id: userid }),
      }
    );
    const likes = await result.json();
    setLikedPosts((prev) => ({ ...prev, [postid]: likes.status === "like" }));
  }

  const [imageurl, setUrl] = useState<userImg | null>(null);

  useEffect(() => {
    if (!username) return;
    const handleimage = async () => {
      const res = await fetch(
        `https://blabber-backend-9cgr.onrender.com/image/${username}`,
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await res.json();
      if (result) {
        setUrl(result);
      }
    };

    handleimage();
  }, [username]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-black/95 w-[60vw] overflow-auto hide-scrollbar border-x-1 border-white">
      <div className="text-white text-2xl bg-black flex justify-center items-center h-11 border-b-1 border-white">
        {username}
      </div>
      <div className="flex justify-center items-center">
        <div className="w-[30vw]">
          <div className="flex items-center">
            <div className="flex flex-col justify-center w-[18vw] items-center gap-2 mt-5">
              <div className="w-[200px] h-[200px] rounded-full">
                {imageurl && (
                  <img
                    src={imageurl.imgurl}
                    alt="profile image"
                    className="rounded-[100%] border-white border-2 w-[100%] h-[100%]"
                  />
                )}
              </div>

              <button
                onClick={() => router.push("/editImage")}
                className="text-white cursor-pointer bg-gray-800 hover:bg-gray-900 p-1 pl-2 pr-2 rounded-xl"
              >
                Edit Image
              </button>
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-white text-xl">{name}</h1>
              <h1 className="text-white/50">{username}</h1>
            </div>
          </div>
        </div>
        <div className="w-[30vw]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center gap-2">
              <h1 className="text-white">Description</h1>
              <div className="border-1 border-white h-[30vh] w-[20vw] rounded-2xl overflow-auto hide-scrollbar text-white/70 flex justify-center items-center">
                <textarea
                  name="description"
                  placeholder="Write about yourself..."
                  className="focus:outline-none hide-scrollbar w-[18vw] h-[28vh]"
                  value={formData.description || desc}
                  onChange={handleChange}
                />
                <input type="hidden" value={username} onChange={handleChange} />
              </div>
              <button
                type="submit"
                className="text-white bg-gray-600 py-1 px-2 rounded-xl hover:bg-gray-700 cursor-pointer mt-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-white/70 ml-5 mt-4 text-xl">My Posts</h1>
        <hr className="text-white" />
        <div className="h-[100%] w-[100%] flex justify-center items-center">
          <div className="h-[80vh] w-[55vw] mt-2 border-2 rounded-2xl overflow-auto hide-scrollbar border-double border-white text-white flex flex-col items-center">
            {data
              .filter((post) => post.username == username)
              .map((post) => (
                <div key={post.id}>
                  <div className="flex flex-col justify-between text-2xs text-cyan-100 font-bold w-[50vw] border-6 border-r-12 border-r-fuchsia-500 border-t-pink-500 border-b-emerald-600 rounded-xl mt-2 mb-14 p-2">
                    <div className="flex flex-col items-center">
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
