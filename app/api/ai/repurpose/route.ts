import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text || typeof text !== "string" || text.length > 10000) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const groqKey = process.env.GROQ_API_KEY;
  if (!groqKey || groqKey === "gsk_placeholder") {
    return NextResponse.json(
      { error: "AI service not configured yet. The site owner needs to add a Groq API key." },
      { status: 503 }
    );
  }

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${groqKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            "You are a content repurposing expert. Given input content, create three distinct outputs separated by ---SECTION---:\n1. A Twitter/X thread (5-8 tweets, each under 280 chars)\n2. A LinkedIn post (professional tone, 200-400 words)\n3. An email newsletter (subject line + body, conversational tone)\nLabel each section clearly.",
        },
        { role: "user", content: text },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    }),
  });

  if (!response.ok) {
    const errBody = await response.text().catch(() => "");
    console.error("Groq API error:", response.status, errBody);
    return NextResponse.json(
      { error: response.status === 401 ? "Invalid Groq API key. Please check your GROQ_API_KEY." : "AI service temporarily unavailable. Please try again." },
      { status: 502 }
    );
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || "";
  const outputs = content
    .split(/---SECTION---|---/)
    .map((s: string) => s.trim())
    .filter(Boolean);

  return NextResponse.json({ outputs: outputs.length > 0 ? outputs : [content] });
}
