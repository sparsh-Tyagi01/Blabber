'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import React from 'react'
import Loading from './loading';
import { Heart } from 'lucide-react';

type Post = {
  id: number;
  description: string;
  category: string;
  image: string;
  username: string;
  createdAt: string;
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


    const [data, setData] = useState<Post[]>([])
    useEffect(()=>{
      const handlePost = async ()=>{
        const res = await fetch("https://blabber-backend-9cgr.onrender.com/posts", {
        method: "get",
        headers: {
          "Content-Type" : "application/json"
        }
      })
      const result = await res.json();
      setData(result);
      }

      handlePost()
      
    },[])

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



  const [like, setLike] = useState(false)
  const [count, setCount] = useState(0)


    async function likeHandler(post_id:number, user_id:string) {
     const result = await fetch("https://blabber-backend-9cgr.onrender.com/like", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({post_id: post_id,user_id: user_id})
     })
     const likes = await result.json()
     setLike(likes.status==="like")
    }
    
    useEffect(()=>{
      const countLikes = async ()=>{
        const result = await fetch("https://blabber-backend-9cgr.onrender.com/like",{
          method: "get",
          headers: {
            "Content-Type" : "application/json"
          }
        })
        const like = await result.json()
        setCount(like.likes)
      }

      countLikes()
    },[])

    if(loading){
      return (
        <Loading/>
      )
    }

  return (
    <div className='h-screen bg-black/95 w-[60vw] overflow-hidden border-x-1 border-white'>
        <div className='flex justify-around'>
          <h1 className='text-white text-4xl font-sans mt-10 ml-5 '>All Posts</h1>
          <h1 className='text-white text-2xl font-sans mt-10 ml-5 text-shadow-white text-shadow-2xs border-1 border-white py-1 px-2 rounded-xl shadow-fuchsia-100 shadow-xl'>{username}</h1>
        </div>
        <div className='h-[100%] w-[100%] flex justify-center items-center'>
          <div className='h-[80vh] w-[55vw] border-2 rounded-2xl overflow-auto hide-scrollbar border-double border-white text-white flex flex-col items-center'>
           {data.map((post)=>(
            <div key={post.id}>
            <div className='flex flex-col justify-between items-center text-2xs text-cyan-100 font-bold w-[50vw]  border-6 border-r-12 border-r-fuchsia-500 border-t-pink-500 border-b-emerald-600 rounded-xl mt-2 mb-14 p-2'>
              <div className='flex justify-around'>
              <p className='text-blue-300 w-[35vw]'>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
              <p className='text-blue-300'>By: {post.username}</p>
              </div>
              {post.description}
              <img src={post.image} alt='' className='rounded-xl w-[50vw] mt-1'/>
            </div>
            <div onClick={()=>likeHandler(post.id,username)} className={`${like?"text-red-700":"text-white"} cursor-pointer transition-colors duration-300 flex items-center justify-center`}><Heart/><span className='text-white ml-0.5'>{count}</span></div>
            </div>
           ))}
          </div>
        </div>
    </div>
  )
}

export default Home