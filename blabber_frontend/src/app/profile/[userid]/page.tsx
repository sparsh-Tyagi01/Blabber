"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Loading from "../loading";

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
  const params = useParams();
  const userid = params?.userid as string;

  const [loading, setLoading] = useState(true);
  const [check, setCheck] = useState(false)

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

  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (!userid) return;
    const descHandle = async () => {
      const res = await fetch(
        `https://blabber-backend-9cgr.onrender.com/profile/${userid}`,
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
  }, [userid]);

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
        if (!res.ok) {
          router.push("/");
        } else {
          const likedRes = await fetch(
            `https://blabber-backend-9cgr.onrender.com/likes/${userid}`
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

  const [imageurl, setUrl] = useState<userImg | null>(null);

  useEffect(() => {
    if (!userid) return;
    const handleimage = async () => {
      const res = await fetch(
        `https://blabber-backend-9cgr.onrender.com/image/${userid}`,
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
        setCheck(true)
        if(check==false){
          alert("user does not exist!")
          router.push("/home");
        }
      }
    };

    handleimage();
  }, [userid]);


  if (loading) {
    return <Loading />;
  }

  return (
    <div className="h-screen bg-black/95 w-[60vw] overflow-auto hide-scrollbar border-x-1 border-white">
      <div className="text-white text-2xl bg-black flex justify-center items-center h-11 border-b-1 border-white">
        {userid}
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
            </div>
            <div className="flex flex-col items-center">
              <h1 className="text-white/50">{userid}</h1>
            </div>
          </div>
        </div>
        <div className="w-[30vw]">
          <form>
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
                <input type="hidden" value={userid} onChange={handleChange} />
              </div>
            </div>
          </form>
        </div>
      </div>
      <div>
        <h1 className="text-white/70 ml-5 mt-4 text-xl">Posts</h1>
        <hr className="text-white" />
        <div className="h-[100%] w-[100%] flex justify-center items-center">
          <div className="h-[80vh] w-[55vw] mt-2 border-2 rounded-2xl overflow-auto hide-scrollbar border-double border-white text-white flex flex-col items-center">
            {data
              .filter((post) => post.username == userid)
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
                          className={`${
                            likedPosts[post.id] ? "text-red-700" : "text-white"
                          } flex items-center justify-start text-4xl mt-0.5 `}
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
