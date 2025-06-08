"use client"
import React, { useEffect } from 'react'
import Button from "@/components/button"; 
import Link from 'next/link';

const Page = () => {

  useEffect(() => {
      localStorage.clear();
      },[])

  return (
    <div className='bg-black flex justify-center items-center h-screen w-screen'>
      <div>
        <Link href="/register"><Button/></Link>
      </div>
    </div>
  )
}

export default Page