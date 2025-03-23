import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const MODEL_ID = process.env.GOOGLE_GEMINI_MODEL_ID!;


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
    console.log("1", messages);

    const result = await model.generateContent({
      contents: messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.content }],
      })),
    });
    console.log(result, "2");

    const responseText = result.response.text();
    console.log(responseText, "3");

    // Update chat history
    chatHistory.push({ role: "user", content: prompt });
    chatHistory.push({ role: "model", content: responseText });

    const formatedResponse = convertToSteps(responseText);

    const genProResponse = await axios.post("/api/gemini-pro", {
      prompt: formatedResponse,
    });

    return NextResponse.json({ text: genProResponse.data.text });
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
