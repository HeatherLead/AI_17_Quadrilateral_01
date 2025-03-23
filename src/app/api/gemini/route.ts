import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const MODEL_ID = "tunedModels/idmsinfotecherp-felf1vlm8k4p";

// Store chat history (Temporary: Use a database in production)
const chatHistory: { role: "user" | "model"; content: string }[] = [];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt)
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

    const genAI = new GoogleGenerativeAI(API_KEY as string);
    const model = genAI.getGenerativeModel({ model: MODEL_ID as string });

    const messages = [...chatHistory, { role: "user", content: prompt }];
    const result = await model.generateContent({
      contents: messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
    });
    const responseText = result.response.text();
    // Update chat history
    chatHistory.push({ role: "user", content: prompt });
    chatHistory.push({ role: "model", content: responseText });

    const formatedResponse = convertToSteps(responseText);
    console.log(formatedResponse, "formattt");
    const genProResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/gemini-pro`,
      {
        prompt: formatedResponse,
      }
    );
    console.log(genProResponse, "genPro");

    const formattedGenProResponse = removeAsterisks(genProResponse.data.text);

    return NextResponse.json({ text: formattedGenProResponse });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

const convertToSteps = (instruction: string) => {
  return instruction
    .split(" → ")
    .map((step, index) => `${index + 1}. ${step}`)
    .join("\n");
};

const removeAsterisks = (input: string) => {
  return input.replace(/\*\*/g, "");
};