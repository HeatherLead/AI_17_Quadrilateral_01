"use client";

import { AIVoiceInput } from "@/components/ui/ai-voice-input";
import { useState } from "react";

export default function AIVoiceInputDemo() {
  const [transcript, setTranscript] = useState("");

  const handleStart = () => {
    console.log("Recording started");
  };

  const handleTranscript = (text: string) => {
    setTranscript((prev) => prev + text);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <AIVoiceInput onStart={handleStart} onTranscript={handleTranscript} />
      </div>
      <div className="w-1/">
        <p>{transcript || "Start speaking..."}</p>
      </div>
    </div>
  );
}

