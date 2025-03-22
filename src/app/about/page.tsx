"use client";
import React, { useState } from "react";
import { Suspense } from "react";
import { Styles, Avatars } from "@/data/avatar";
import axios from "axios";
import { Button } from "@/components/ui/button";
const page = () => {
  const [video, setVideo] = useState("/");
  const text =
    "A solution to reduce API polling inefficiency is using webhooks. Instead of repeatedly checking the status, the server sends a notification when the video is ready. This reduces unnecessary requests, improves performance, and ensures real-time updates, making it a more scalable and efficient approach.";
  const style = Styles.cheerful;
  const avatar = Avatars[0];

  const generateVideo = async () => {
    const response = await axios.post("/api/textToSpeech", {
      text,
      style,
      avatar,
    });
    const { videoUrl } = response.data;
    setVideo(videoUrl);
  };
  return (
    <div className=" w-full h-[80vh] flex justify-center items-center flex-col-reverse gap-5">
      <Button onClick={generateVideo}>Generate Video</Button>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="w-96 h-96 border rounded-full border-white">
          <video className="w-96 h-96 rounded-full" src={video} autoPlay />
        </div>
      </Suspense>
    </div>
  );
};

export default page;
