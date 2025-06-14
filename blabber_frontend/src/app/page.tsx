"use client";
import React, { useEffect } from "react";
import Button from "@/components/button";
import Link from "next/link";
import { BackgroundLines } from "@/components/ui/background-lines";

const Page = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <BackgroundLines>
      <div className="bg-black flex justify-center items-center h-screen w-screen">
        <div>
          <Link href="/register">
            <Button />
          </Link>
        </div>
      </div>
    </BackgroundLines>
  );
};

export default Page;
