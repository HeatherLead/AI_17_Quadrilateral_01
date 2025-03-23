import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY_PRO;
const MODEL_ID = process.env.GOOGLE_GEMINI_ID_PRO;

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });
    }
    const genAI = new GoogleGenerativeAI(API_KEY as string);
    const model = genAI.getGenerativeModel({
      model: MODEL_ID as string,
      systemInstruction:
        "You are a chat system that explains steps briefly while providing necessary context. For each step, give a **short explanation** (1-2 sentences) that helps the user understand its purpose.  Keep it **clear, structured, and easy to follow**.",
    });
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
