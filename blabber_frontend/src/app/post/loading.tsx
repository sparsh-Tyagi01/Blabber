"use client"
import React from 'react'
import Loader from "@/components/homeLoader"; 

const Loading = () => {
  return (
    <div className='bg-black flex justify-center items-center h-screen w-[60vw] border-x-1 border-white'>
        <div><Loader/></div>
    </div>
  )
}

export default Loading