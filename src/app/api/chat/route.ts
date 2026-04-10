import { NextResponse } from "next/server";
import { sendToGrok } from "@/lib/grok";

type ChatRequest = {
  message?: string;
};

export async function POST(req: Request) {
  const body = (await req.json()) as ChatRequest;
  const message = body.message?.trim();

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  try {
    const reply = await sendToGrok(message);
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Grok error:", error);
    return NextResponse.json({ error: "API error" }, { status: 500 });
  }
}
