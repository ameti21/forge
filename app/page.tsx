import Link from "next/link";

const tools = [
  {
    name: "InvoiceForge",
    desc: "Professional PDF invoices with client portal. Generate, send, track — in seconds.",
    icon: "📄",
    href: "/tools/invoice",
    color: "from-violet-600 to-indigo-600",
  },
  {
    name: "AI Content Repurposer",
    desc: "Paste a blog post → get Twitter threads, LinkedIn posts, and email newsletters. Powered by Groq.",
    icon: "🤖",
    href: "/tools/ai-content",
    color: "from-emerald-600 to-teal-600",
  },
  {
    name: "Portfolio & CV Builder",
    desc: "Drag-and-drop portfolio sites and polished CVs. Export as PDF or publish as a live page.",
    icon: "💼",
    href: "/tools/portfolio",
    color: "from-pink-600 to-rose-600",
  },
  {
    name: "Business Dashboards",
    desc: "Upload CSV → get live charts, KPI cards, and exportable reports. No spreadsheet headaches.",
    icon: "📊",
    href: "/tools/dashboard-builder",
    color: "from-amber-600 to-orange-600",
  },
  {
    name: "Template Marketplace",
    desc: "100+ responsive site templates. Preview, customize, download. Built with modern CSS.",
    icon: "🎨",
    href: "/tools/templates",
    color: "from-cyan-600 to-blue-600",
  },
  {
    name: "Form & Quiz Builder",
    desc: "Build forms, surveys, and quizzes with conditional logic. Collect responses in real time.",
    icon: "📝",
    href: "/tools/forms",
    color: "from-fuchsia-600 to-purple-600",
  },
  {
    name: "Learning Platform",
    desc: "Personalized learning paths for web development. Track progress, earn badges, master skills.",
    icon: "🎓",
    href: "/tools/learn",
    color: "from-lime-600 to-green-600",
  },
];

const tiers = [
  { name: "Starter", price: 9, desc: "InvoiceForge only", features: ["1 tool", "Unlimited invoices", "PDF export", "Email support"] },
  { name: "Pro", price: 19, desc: "AI Content + 3 tools", features: ["4 tools", "Groq AI included", "Priority support", "Custom branding"], popular: true },
  { name: "Empire", price: 49, desc: "ALL 7 tools", features: ["All 7 tools", "Unlimited AI credits", "White-label option", "1-on-1 onboarding", "API access"] },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Gradient background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-forge-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* Nav */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-2xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-forge-400 to-indigo-400 bg-clip-text text-transparent">Forge</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="#tools" className="text-sm text-zinc-400 hover:text-white transition">Tools</Link>
          <Link href="#pricing" className="text-sm text-zinc-400 hover:text-white transition">Pricing</Link>
          <Link
            href="/sign-in"
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-forge-500 px-4 py-2 text-sm font-medium text-white hover:bg-forge-600 transition"
          >
            Get started free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-forge-500/30 bg-forge-500/10 px-4 py-1.5 text-sm text-forge-300">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          7 ready-to-sell micro-SaaS tools
        </div>

        <h1 className="text-7xl font-extrabold tracking-tight sm:text-8xl lg:text-9xl">
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Forge
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-xl text-zinc-400 leading-relaxed">
          Seven AI-powered tools. One dashboard. One subscription.
          <br />
          Invoice clients, repurpose content, build portfolios, analyze data — and start earning today.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-forge-500 to-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-forge-500/25 hover:shadow-forge-500/40 transition-all duration-300"
          >
            Get All 7 — $49/mo
            <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
          </Link>
          <Link
            href="#tools"
            className="rounded-xl border border-zinc-700 px-8 py-4 text-lg font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition"
          >
            See all tools
          </Link>
        </div>

        {/* Social proof */}
        <div className="mt-16 flex items-center justify-center gap-8 text-sm text-zinc-500">
          <span>Built with Next.js + AI</span>
          <span className="h-4 w-px bg-zinc-700" />
          <span>Stripe billing included</span>
          <span className="h-4 w-px bg-zinc-700" />
          <span>Deploy in 5 minutes</span>
        </div>
      </section>

      {/* Tools grid */}
      <section id="tools" className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold sm:text-5xl">
            7 tools. 7 revenue streams.
          </h2>
          <p className="mt-4 text-lg text-zinc-400">Each tool is a standalone micro-SaaS that your customers will pay for.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color} text-2xl`}>
                {tool.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-forge-300 transition">{tool.name}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{tool.desc}</p>
              <div className="mt-4 text-sm text-forge-400 opacity-0 group-hover:opacity-100 transition">
                Try it →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold sm:text-5xl">Simple, transparent pricing</h2>
          <p className="mt-4 text-lg text-zinc-400">Start free. Upgrade when you&apos;re ready to scale.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl border p-8 transition-all ${
                tier.popular
                  ? "border-forge-500 bg-zinc-900 shadow-lg shadow-forge-500/10 scale-105"
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
                    <svg className="h-5 w-5 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/sign-up"
                className={`mt-8 block w-full rounded-xl py-3 text-center font-semibold transition ${
                  tier.popular
                    ? "bg-gradient-to-r from-forge-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-forge-500/25"
                    : "border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white"
                }`}
              >
                Get {tier.name}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 className="text-4xl font-bold sm:text-5xl">Ready to build your empire?</h2>
        <p className="mt-4 text-lg text-zinc-400">
          Join Forge today and start generating revenue with 7 production-ready tools.
        </p>
        <Link
          href="/sign-up"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-forge-500 to-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-forge-500/25 hover:shadow-forge-500/40 transition-all"
        >
          Get started free
        </Link>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-zinc-500">© 2026 Forge by Jet Ameti. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
            <Link href="/dashboard" className="hover:text-white transition">Dashboard</Link>
            <a href="https://github.com/ameti21/forge" className="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
