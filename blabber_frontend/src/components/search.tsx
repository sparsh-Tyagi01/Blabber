"use client";
import {
  Brain,
  Gamepad,
  HeartHandshake,
  House,
  Mountain,
  Music,
  SearchIcon,
  User2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Search = () => {
  const [searchUsername, setSearchUsername] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchUsername.trim()) {
      router.push(`/profile/${searchUsername}`);
    }
  };

  return (
    <div className="h-screen w-[20vw] bg-black overflow-auto hide-scrollbar flex flex-col items-center ">
      <div className="flex mt-5">
        <SearchIcon size={30} className="text-white" />
        <input
          className="text-white focus:outline-none border-t-2 border-b-2 border-r-2 border-white rounded-e-xl"
          type="text"
          placeholder="Search by username..."
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
      </div>
      <div className=" text-white mt-10">
        <h1 className="text-xl">Categories</h1>
        <Link href="/Sports">
          <span className="flex items-center text-white mt-4 p-2 cursor-pointer hover:shadow-white hover:shadow-2xl rounded-b-full">
            <Gamepad size={35} /> Sports
          </span>
        </Link>
        <Link href="/Technology">
          <span className="flex items-center text-white p-2 cursor-pointer hover:shadow-white hover:shadow-2xl rounded-b-full">
            <Brain size={35} /> Technology
          </span>
        </Link>
        <Link href="/Entertainment">
          <span className="flex items-center text-white p-2 cursor-pointer hover:shadow-white hover:shadow-2xl rounded-b-full">
            <Music size={35} /> Entertainment
          </span>
        </Link>
        <Link href="/Politics">
          <span className="flex items-center text-white p-2 cursor-pointer hover:shadow-white hover:shadow-2xl rounded-b-full">
            <User2 size={35} /> Politics
          </span>
        </Link>
        <Link href="/Job_and_Career">
          <span className="flex items-center text-white p-2 cursor-pointer hover:shadow-white hover:shadow-2xl rounded-b-full">
            <House size={35} /> Job & Career
          </span>
        </Link>
        <Link href="/Health_and_Fitness">
          <span className="flex items-center text-white p-2 cursor-pointer hover:shadow-white hover:shadow-2xl rounded-b-full">
            <HeartHandshake size={35} /> Health & Fitness
          </span>
        </Link>
        <Link href="/Travel">
          <span className="flex items-center text-white p-2 cursor-pointer hover:shadow-white hover:shadow-2xl rounded-b-full">
            <Mountain size={35} /> Travel
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Search;
