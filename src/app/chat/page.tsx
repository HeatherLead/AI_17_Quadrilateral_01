"use client";

import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { useState } from "react";
import axios from "axios";

export default function AIVoiceInputDemo() {
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");

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
    <div className="space-y-8">
      <div className="space-y-4">
        <AIVoiceInput onStart={handleStart} onTranscript={handleTranscript} />
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
    </div>
  );
}
