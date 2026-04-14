"use client";

import Link from "next/link";

const tiers = [
  {
    name: "Starter",
    price: 9,
    desc: "InvoiceForge only",
    priceId: "price_starter",
    features: ["1 tool — InvoiceForge", "Unlimited invoices", "PDF export", "Email support"],
  },
  {
    name: "Pro",
    price: 19,
    desc: "AI Content + 3 tools",
    priceId: "price_pro",
    features: ["4 tools included", "Groq AI integration", "Priority support", "Custom branding"],
    popular: true,
  },
  {
    name: "Empire",
    price: 49,
    desc: "ALL 7 tools — the money-maker",
    priceId: "price_empire",
    features: [
      "All 7 tools unlocked",
      "Unlimited AI credits",
      "White-label option",
      "1-on-1 onboarding call",
      "API access",
      "Early access to new tools",
    ],
  },
];

export default function PricingPage() {
  const handleCheckout = async (priceId: string) => {
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="bg-gradient-to-r from-forge-400 to-indigo-400 bg-clip-text text-transparent">Forge</span>
          </Link>
          <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition">Dashboard</Link>
        </div>
      </nav>

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold sm:text-6xl">Choose Your Empire Tier</h1>
          <p className="mt-4 text-lg text-zinc-400">Start free. Upgrade when you&apos;re ready to scale.</p>
          <p className="mt-2 text-sm text-emerald-400 font-medium">First 100 users: use code DEVJET50 for lifetime 50% off Empire plan</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 transition-all ${
                tier.popular
                  ? "border-forge-500 bg-zinc-900 shadow-lg shadow-forge-500/10 md:scale-105"
                  : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-forge-500 px-4 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold">{tier.name}</h3>
              <p className="mt-1 text-sm text-zinc-400">{tier.desc}</p>
              <div className="mt-6">
                <span className="text-5xl font-extrabold">${tier.price}</span>
                <span className="text-zinc-400">/mo</span>
              </div>
              <ul className="mt-8 space-y-3">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                    <svg className="h-5 w-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(tier.priceId)}
                className={`mt-8 block w-full rounded-xl py-3 text-center font-semibold transition cursor-pointer ${
                  tier.popular
                    ? "bg-gradient-to-r from-forge-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-forge-500/25"
                    : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                Get {tier.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
