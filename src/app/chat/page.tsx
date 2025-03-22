"use client";

import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useState, Suspense, useEffect } from "react";
import { Styles, Avatars } from "@/data/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";

interface AvatarType {
  id: number;
  name: string;
  image: string;
  voices: {
    en: string;
    hi: string;
    mr: string;
  };
}

export default function AIVoiceInputDemo() {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

  const [outputText, setOutputText] = useState(
    "A solution to reduce API polling inefficiency is using webhooks..."
  );
  const [language, setLanguage] = useState<"en" | "hi" | "mr">("en");
  const [avatar, setAvatar] = useState<AvatarType>(Avatars[0]);
  const [video, setVideo] = useState("/");
  const style = Styles.cheerful;

  const generateVideo = async () => {
    const response = await axios.post("/api/textToSpeech", {
      outputText,
      style,
      avatarUrl: avatar.image,
      language: avatar.voices[language],
    });
    const { videoUrl } = response.data;
    setVideo(videoUrl);
  };

  const handleStart = () => {
    console.log("Recording started");
  };

  const handleTranscript = async (text: string) => {
    const updatedTranscript = text;
    setTranscript(updatedTranscript);

    try {
      const res = await axios.post("/api/gemini", {
        prompt: "how can i get my gst bill",
      });
      setResponse(res.data.text);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setResponse("Error generating response.");
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] p-8 flex flex-col items-center justify-center gap-5">
      {/** Avatar Output */}
      <div
        className={`absolute z-10 left-8 top-24 flex gap-10 items-start 
          transition-opacity duration-1000 ease-in-out ${
            outputText ? "opacity-100" : "opacity-0"
          }`}
      >
        <div>
          <Suspense
            fallback={
              <div className="w-44 h-44 border rounded-full border-gray-500 dark:border-white animate-pulse">
                Loading...
              </div>
            }
          >
            <div className="w-44 h-44 border rounded-full border-gray-500 dark:border-white">
              <video className="w-44 h-44 rounded-full" src={video} autoPlay />
            </div>
          </Suspense>
        </div>
        <div className="relative flex items-center justify-center">
          <div
            className="relative p-5 text-sm max-w-xs md:max-w-md lg:max-w-lg 
          border border-gray-300 font-medium shadow-lg 
          rounded-3xl px-6 py-4 transition-opacity duration-500 ease-in-out
          before:content-[''] before:absolute before:w-10 before:h-10 before:bg-white 
          before:rounded-full before:border before:border-gray-300 
          before:bottom-[-10px] before:left-[-5%]
          after:content-[''] after:absolute after:w-6 after:h-6 after:bg-white 
          after:rounded-full after:border after:border-gray-300 
          after:bottom-[-20px] after:left-[-10%]"
          >
            {outputText}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <AIVoiceInput onStart={handleStart} onTranscript={handleTranscript} />
        <Input
          className="w-80"
          placeholder="What's on your mind?"
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
        />
      </div>
      <div className="w-full p-4 border rounded-lg">
        <p className="text-gray-700 font-semibold">🎙 Transcript:</p>
        <p className="text-blue-500">{transcript || "Start speaking..."}</p>
      </div>
      <div className="w-full p-4 border rounded-lg">
        <p className="text-gray-700 font-semibold">🤖 AI Response:</p>
        <p className="text-green-500">
          {response || "Waiting for response..."}
        </p>
      </div>
      <div className="absolute right-1 bottom-16">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage
                className="w-10 h-10 rounded-full object-cover"
                src={avatar.image}
              />
              <AvatarFallback>{avatar.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Avatar settings</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Avatar</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {Avatars.map((av) => (
                  <DropdownMenuItem
                    className={
                      avatar.name === av.name ? "bg-gray-800 font-bold" : ""
                    }
                    key={av.id}
                    onClick={() => setAvatar(av)}
                  >
                    {av.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Language</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => setLanguage("en")}
                  className={language === "en" ? "bg-gray-800 font-bold" : ""}
                >
                  English
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("mr")}
                  className={language === "mr" ? "bg-gray-800 font-bold" : ""}
                >
                  Marathi
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setLanguage("hi")}
                  className={language === "hi" ? "bg-gray-800 font-bold" : ""}
                >
                  Hindi
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
