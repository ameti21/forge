import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const RATE_LIMIT = 10; // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Simple in-memory rate limiter, per user. Resets on server restart and is
// per-instance, but is enough to stop casual abuse of the AI endpoint.
const MAX_TRACKED_USERS = 5000;
const rateBuckets = new Map<string, { count: number; windowStart: number }>();

function pruneExpiredBuckets(now: number) {
  for (const [id, bucket] of rateBuckets) {
    if (now - bucket.windowStart >= RATE_WINDOW_MS) {
      rateBuckets.delete(id);
    }
  }
}

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(userId);
  if (!bucket || now - bucket.windowStart >= RATE_WINDOW_MS) {
    if (rateBuckets.size >= MAX_TRACKED_USERS) {
      pruneExpiredBuckets(now);
      // Fail closed for new users while the map is saturated so the map
      // cannot grow without bound under a high-cardinality attack.
      if (rateBuckets.size >= MAX_TRACKED_USERS && !rateBuckets.has(userId)) {
        return true;
      }
    }
    rateBuckets.set(userId, { count: 1, windowStart: now });
    return false;
  }
  bucket.count += 1;
  return bucket.count > RATE_LIMIT;
}

export async function POST(req: Request) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  // Clerk is only usable when both halves of the key pair are present;
  // a publishable key without the secret would make auth() throw.
  const clerkConfigured =
    !!clerkKey && clerkKey.startsWith("pk_") && !!process.env.CLERK_SECRET_KEY;
  let userId: string | null = null;
  if (clerkConfigured) {
    ({ userId } = await auth());
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } else if (process.env.NODE_ENV === "production") {
    // Fail closed: no auth configured means nobody is authenticated.
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } else {
    userId = "dev-user";
  }

  if (isRateLimited(userId)) {
    return NextResponse.json(
      { error: `Rate limit exceeded. You can make ${RATE_LIMIT} requests per hour — please try again later.` },
      { status: 429 }
    );
  }

  let text: unknown;
  try {
    ({ text } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

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
