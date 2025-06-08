'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react'
import React from 'react'
import Loading from './loading';

const Posts = () => {

  const [loading, setLoading] = useState(true);
    
      useEffect(() => {
        const load = async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          setLoading(false);
        };
    
        load();
      }, []);
  

    const [formData, setFormData] = useState({
      description: "",
      username: "",
      image: "",
      category: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
      setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.FormEvent)=>{
      e.preventDefault();

      await fetch("http://localhost:8000/posts", {
        method: "post",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)
      })
      router.push("/home");
    }

      const router = useRouter();
    
      useEffect(() => {
        const token = localStorage.getItem("token");
    
        
        if (!token) {
          router.push("/");
          return;
        }
    
     
        fetch("http://localhost:8000/protected", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then(async (res) => {
            if (!res.ok) {
              router.push("/"); 
            }
          })
          .catch((err) => {
            console.error("Error:", err);
            router.push("/"); 
          });
      }, []);

       if(loading){
      return (
        <Loading/>
      )
    }


  return (
    <div className='h-screen w-[60vw] bg-black flex justify-center items-center border-1 border-x-white'>
        <div className='h-[40vh] w-[50vw] border-2 border-white rounded-2xl'>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col w-[50vw] h-[20vh]'>
                    <div className='flex flex-col items-center'>
                        <label htmlFor='data' className='text-white flex justify-center items-center text-xl'><User size={35}/>Create Your Post</label>
                        <hr className='text-white w-[30vw]'/>
                    </div>
                    <input id='data' type='text' name='description' placeholder="What's happening?" value={formData.description} onChange={handleChange} required className='text-white focus:outline-none text-2xl w-[40vw] mt-2 ml-4'/>
                </div>
                <div className='flex justify-around'>
                  <input type='text' placeholder='Enter image url' name='image' value={formData.image} onChange={handleChange} className='text-white focus:outline-none border-1 border-white rounded-2xl p-1 w-[18vw] shadow-2xl shadow-white'/>
                  <input type='text' placeholder='Enter your username' name='username' value={formData.username} onChange={handleChange} required className='focus:outline-none text-white border-1 border-white rounded-2xl p-1 w-[18vw] shadow-2xl shadow-white'/>
                </div>
                <div className='w-[50vw] text-white flex justify-around mt-5'>
                    <div>
                        <label htmlFor='category' className='text-white mr-2'>Category:</label>
                        <select id='category' name='category' value={formData.category} onChange={handleChange} required className='border-1 rounded-sm border-white focus:outline-none'>
                            <option className='bg-black'>Sports</option>
                            <option className='bg-black'>Technology</option>
                            <option className='bg-black'>Entertainment</option>
                            <option className='bg-black'>Politics</option>
                            <option className='bg-black'>Job_and_Career</option>
                            <option className='bg-black'>Health_and_Fitness</option>
                            <option className='bg-black'>Travel</option>
                        </select>
                    </div>
                    <button type='submit' className='text-xl bg-gray-600 rounded-xl px-2 py-1 border-1 cursor-pointer'>Post</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Posts