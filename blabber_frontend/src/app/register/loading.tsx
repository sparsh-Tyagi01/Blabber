"use client";
import React from "react";
import Loader from "@/components/loader";

const Loading = () => {
  return (
    <div className="bg-black flex justify-center items-center h-screen w-screen">
      <div>
        <Loader />
      </div>
    </div>
  );
};

export default Loading;
