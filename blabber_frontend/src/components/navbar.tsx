import React from "react";
import {
  ArrowBigDown,
  Home,
  List,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="min-h-screen w-[20vw] bg-black relative">
      <div className="text-white">
        <Image
          src="/image/blabberIcon.png"
          alt="logo"
          width={100}
          height={70}
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-center items-center">
          <Link href="/home">
            <span className="text-white mt-1 cursor-pointer hover:shadow-white hover:shadow-2xl p-5 rounded-b-full flex items-center">
              <Home size={35} /> Home
            </span>
          </Link>
          <Link href="/post">
            <span className="text-white mt-1 cursor-pointer hover:shadow-white hover:shadow-2xl p-5 rounded-b-full flex items-center">
              <List size={35} /> Post
            </span>
          </Link>
          <Link href="/profile">
            <span className=" text-white mt-1 cursor-pointer hover:shadow-white hover:shadow-2xl p-5 rounded-b-full flex items-center">
              <User size={35} /> Profile
            </span>
          </Link>
        </div>
        <div>
          <span className="text-white mt-1 hover:shadow-white hover:shadow-2xl p-5 rounded-b-full flex items-center">
            <ArrowBigDown size={35} />
          </span>
          <span className="text-white mt-1 hover:shadow-white hover:shadow-2xl p-5 rounded-b-full flex items-center">
            <ArrowBigDown size={35} />
          </span>
          <Link href="/login">
            <span className="text-white mt-1 cursor-pointer hover:shadow-white hover:shadow-2xl p-5 rounded-b-full absolute bottom-5 flex items-center">
              <LogOut size={35} /> Logout
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
