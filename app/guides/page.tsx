import type { Metadata } from "next";
import Link from "next/link";
import {
  CtaBanner,
  JsonLd,
  MarketingFooter,
  MarketingNav,
} from "@/components/marketing";
import { guides } from "@/lib/guides";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const title = "Guides for Freelancers & Small Teams | Forge";
const description =
  "Practical guides on invoicing, AI content repurposing, developer portfolios, CSV dashboards, and quizzes — from the team behind Forge's toolkit.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/guides") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/guides"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url: absoluteUrl("/guides"),
  hasPart: guides.map((g) => ({
    "@type": "Article",
    headline: g.heading,
    url: absoluteUrl(`/guides/${g.slug}`),
  })),
};

export default function GuidesPage() {
  return (
    <main className="relative overflow-hidden bg-zinc-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-forge-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      <JsonLd data={collectionJsonLd} />
      <MarketingNav />

      <section className="relative z-10 mx-auto max-w-4xl px-6 pt-20 pb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Guides
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
          Practical, no-filler playbooks for running a one-person business: invoicing that gets
          paid, content that compounds, portfolios that convert, and reporting clients understand.
        </p>
      </section>

      <section className="relative z-10 mx-auto max-w-6xl px-6 pb-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="group flex flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-7 transition-all duration-300 hover:border-zinc-600 hover:bg-zinc-900"
            >
              <div className="mb-4 flex items-center gap-3 text-xs text-zinc-500">
                <span className="rounded-full border border-forge-500/30 bg-forge-500/10 px-3 py-1 font-medium text-forge-300">
                  {guide.category}
                </span>
                <span>{guide.readingTime}</span>
              </div>
              <h2 className="text-lg font-semibold leading-snug group-hover:text-forge-300 transition">
                {guide.heading}
              </h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-400">
                {guide.description}
              </p>
              <span className="mt-5 text-sm font-medium text-forge-400 opacity-0 transition group-hover:opacity-100">
                Read the guide →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-8">
        <CtaBanner
          title="Put the guides into practice"
          body="Every workflow in these guides runs on Forge's seven-tool suite — invoicing, AI content, portfolios, dashboards, forms, and more. One login, from $9/month."
          primaryLabel="Get started free"
          primaryHref="/sign-up"
        />
      </div>

      <MarketingFooter />
    </main>
  );
}
