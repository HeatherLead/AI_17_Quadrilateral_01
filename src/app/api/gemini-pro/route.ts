import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY_PRO;
const MODEL_ID = process.env.GOOGLE_GEMINI_ID_PRO;

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
  }
  const genAI = new GoogleGenerativeAI(API_KEY as string);
  const model = genAI.getGenerativeModel({
    model: MODEL_ID as string,
    systemInstruction: "",
  });
  const result = await model.generateContent(prompt);
}
