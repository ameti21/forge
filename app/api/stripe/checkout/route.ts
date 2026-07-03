import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

// Server-side allowlist: clients send a tier name, never a raw Stripe price ID.
function getPriceIdForTier(tier: string): string | undefined {
  const priceIds: Record<string, string | undefined> = {
    starter: process.env.STRIPE_PRICE_STARTER,
    pro: process.env.STRIPE_PRICE_PRO,
    empire: process.env.STRIPE_PRICE_EMPIRE,
  };
  return priceIds[tier];
}

export async function POST(req: Request) {
  const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  let userId: string | null = null;
  if (clerkKey && clerkKey.startsWith("pk_")) {
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

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json(
      { error: "Stripe not configured. Add STRIPE_SECRET_KEY to environment variables." },
      { status: 503 }
    );
  }

  let tier: unknown;
  try {
    ({ tier } = await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!tier || typeof tier !== "string") {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  const priceId = getPriceIdForTier(tier);
  if (!priceId) {
    return NextResponse.json({ error: "Unknown pricing tier" }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://forge.ameti.one";

  try {
    const stripe = new Stripe(stripeKey);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${baseUrl}/dashboard?success=true`,
      cancel_url: `${baseUrl}/pricing`,
      client_reference_id: userId,
    });
    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session. Please try again." },
      { status: 502 }
    );
  }
}
