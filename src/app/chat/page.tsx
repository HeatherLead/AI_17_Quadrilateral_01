"use client";

import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { useState, Suspense, useEffect, useCallback } from "react";
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
import { LoaderCircle } from "lucide-react";

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

interface Message {
  role: "user" | "assistant";
  content: string;
  videoUrl?: string;
  isLoading?: boolean;
  isVideoLoaded?: boolean;
}

export default function AIVoiceInputDemo() {
  const [transcript, setTranscript] = useState("");
  // const [response, setResponse] = useState("");
  const [language, setLanguage] = useState<"en" | "hi" | "mr">("en");
  const [avatar, setAvatar] = useState<AvatarType>(Avatars[0]);
  // const [video, setVideo] = useState("/");
  const [isRecording, setIsRecording] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const style = Styles.cheerful;

  const generateVideo = async (text: string) => {
    try {
      const videoResult = await axios.post("/api/textToSpeech", {
        text,
        style,
        avatarUrl: avatar.image,
        language: avatar.voices[language],
      });
      const { videoUrl } = videoResult.data;
      if (!videoUrl) throw new Error("No video URL received");
      // setVideo(videoUrl);
      // console.log(video)
      return videoUrl;
    } catch (error) {
      console.error("Error generating video:", error);
      return null;
    }
  };

  const handleVideoClick = (videoElement: HTMLVideoElement) => {
    videoElement.currentTime = 0;
    videoElement.play();
  };

  const handleVideoLoad = (messageIndex: number) => {
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === messageIndex ? { ...msg, isVideoLoaded: true } : msg
      )
    );
  };

  const fetchAIResponse = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      setIsLoading(true);
      try {
        setMessages((prev) => [...prev, { role: "user", content: text }]);

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Loading...",
            isLoading: true,
            isVideoLoaded: false,
          },
        ]);

        const res = await axios.post("/api/gemini", {
          prompt: text,
        });

        if (!res.data || !res.data.text) {
          throw new Error("Invalid response from AI");
        }

        const aiResponse = res.data.text;
        // setResponse(aiResponse);

        const videoUrl = await generateVideo(aiResponse);

        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isLoading),
          {
            role: "assistant",
            content: aiResponse,
            videoUrl,
            isVideoLoaded: false,
          },
        ]);

        setTranscript("");
        // setVideo("/");
      } catch (error) {
        console.error("Error fetching AI response:", error);
        // setResponse("Error generating response.");
        setMessages((prev) => [
          ...prev.filter((msg) => !msg.isLoading),
          {
            role: "assistant",
            content:
              "Sorry, there was an error generating the response. Please try again.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [language, avatar]
  );

  const handleTranscript = (text: string, recording: boolean) => {
    setTranscript(text);
    setIsRecording(recording);
  };

  const handleSubmit = () => {
    if (transcript.trim() && !isRecording) {
      fetchAIResponse(transcript);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    if (!isRecording && transcript.trim()) {
      fetchAIResponse(transcript);
    }
  }, [isRecording]);

  return (
    <div className="h-[calc(100vh-120px)] mx-20 p-4 flex flex-row-reverse justify-center gap-20">
      {/* Chat History */}
      <div className="flex-1 max-w-[40rem] overflow-y-auto mb-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={`message-${index}-${message.role}`}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start flex-col"
            }`}
          >
            {message.role === "assistant" &&
            (message.isLoading ||
              (message.videoUrl && !message.isVideoLoaded)) ? (
              <div className="flex items-center gap-2 bg-gray-950 rounded-lg p-4">
                <LoaderCircle className="w-5 h-5 animate-spin" />
                <span className="text-sm">
                  {message.isLoading
                    ? "Generating response..."
                    : "Loading video..."}
                </span>
              </div>
            ) : (
              <>
                {message.videoUrl && (
                  <div className="mb-2">
                    <Suspense
                      fallback={
                        <div>
                          <LoaderCircle className="w-20 h-20 text-white animate-spin" />
                        </div>
                      }
                    >
                      <video
                        className="ml-4 w-36 h-36 object-cover rounded-full cursor-pointer"
                        src={message.videoUrl}
                        autoPlay
                        onClick={(e) => handleVideoClick(e.currentTarget)}
                        onLoadedData={() => handleVideoLoad(index)}
                        onError={(e) => {
                          console.error("Video playback error:", e);
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </Suspense>
                  </div>
                )}
                <div
                  className={`max-w-[60%] text-wrap rounded-lg p-2 flex-col ${
                    message.role === "user"
                      ? "bg-[#8B3DFF] text-gray-100 ml-4"
                      : "bg-gray-950 mr-4"
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="flex flex-col justify-center items-center gap-5  mb-8 ">
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  className="w-40 h-40 rounded-full object-cover"
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
        <div className="flex justify-center items-center flex-col">
          <AIVoiceInput
            onTranscript={(text) => handleTranscript(text, isRecording)}
          />
          <Input
            className="w-80"
            placeholder="What's on your mind?"
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
