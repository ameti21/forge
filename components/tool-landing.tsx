import type { Metadata } from "next";
import Link from "next/link";
import {
  CtaBanner,
  FaqSection,
  JsonLd,
  MarketingFooter,
  MarketingNav,
  faqPageJsonLd,
} from "@/components/marketing";
import type { ToolPage } from "@/lib/tool-pages";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export function toolMetadata(tool: ToolPage): Metadata {
  const url = absoluteUrl(`/${tool.slug}`);
  return {
    title: tool.title,
    description: tool.description,
    alternates: { canonical: url },
    openGraph: {
      title: tool.title,
      description: tool.description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.title,
      description: tool.description,
    },
  };
}

function softwareApplicationJsonLd(tool: ToolPage): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.heading,
    description: tool.description,
    url: absoluteUrl(`/${tool.slug}`),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "9",
      priceCurrency: "USD",
      description: "Forge plans start at $9/month; all seven tools at $49/month.",
    },
    publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
  };
}

export function ToolLandingPage({ tool }: { tool: ToolPage }) {
  return (
    <main className="relative overflow-hidden bg-zinc-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-forge-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <JsonLd data={softwareApplicationJsonLd(tool)} />
      <JsonLd data={faqPageJsonLd(tool.faqs)} />

      <MarketingNav />

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-20 pb-16 text-center">
        <div
          className={`mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-3xl`}
        >
          {tool.icon}
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            {tool.heading}
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          {tool.subheading}
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-forge-500 to-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-forge-500/25 hover:shadow-forge-500/40 transition-all"
          >
            Get started free
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <Link
            href="/pricing"
            className="rounded-xl border border-zinc-700 px-8 py-4 text-lg font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition"
          >
            See pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">What you get</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tool.features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-zinc-600"
            >
              <h3 className="text-lg font-semibold text-zinc-100">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 mx-auto max-w-4xl px-6 py-16">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">How it works</h2>
        <ol className="mt-12 space-y-6">
          {tool.steps.map((step, i) => (
            <li key={step.title} className="flex gap-5">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${tool.gradient} font-bold text-white`}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-zinc-100">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-zinc-400">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ + CTA */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8">
        <FaqSection faqs={tool.faqs} />
        <CtaBanner
          title="Ready to try it?"
          body={`${tool.heading} is included in your Forge subscription alongside six other tools — one login, one bill.`}
          primaryLabel="Create your free account"
          primaryHref="/sign-up"
        />

        {/* Internal links */}
        <section className="mt-16 grid gap-8 border-t border-zinc-800 pt-10 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Learn more
            </h2>
            <ul className="mt-3 space-y-2">
              {tool.relatedGuides.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="text-forge-400 hover:text-forge-300 transition">
                    {g.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              More Forge tools
            </h2>
            <ul className="mt-3 space-y-2">
              {tool.otherTools.map((t) => (
                <li key={t.href}>
                  <Link href={t.href} className="text-forge-400 hover:text-forge-300 transition">
                    {t.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <MarketingFooter />
    </main>
  );
}
