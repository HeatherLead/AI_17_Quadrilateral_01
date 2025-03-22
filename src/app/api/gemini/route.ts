import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
const MODEL_ID = "tunedModels/erpqueriesfinetuning500-78yndkjw5iza";


// Store chat history (Temporary: Use a database in production)
const chatHistory: { role: "user" | "model"; content: string }[] = [];

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt)
      return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

    const genAI = new GoogleGenerativeAI(API_KEY as string);
    const model = genAI.getGenerativeModel({ model: MODEL_ID });

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

    return NextResponse.json({ text: responseText });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
