import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Inline rich text: renders [label](/href) markdown-style links and  */
/* **bold** spans inside plain strings. Internal links use next/link. */
/* ------------------------------------------------------------------ */

const INLINE_PATTERN = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;

export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  const pattern = new RegExp(INLINE_PATTERN);
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined && match[2] !== undefined) {
      const href = match[2];
      nodes.push(
        href.startsWith("/") ? (
          <Link
            key={`${match.index}-link`}
            href={href}
            className="text-forge-400 underline decoration-forge-500/40 underline-offset-2 hover:text-forge-300 transition"
          >
            {match[1]}
          </Link>
        ) : (
          <a
            key={`${match.index}-link`}
            href={href}
            className="text-forge-400 underline decoration-forge-500/40 underline-offset-2 hover:text-forge-300 transition"
          >
            {match[1]}
          </a>
        )
      );
    } else if (match[3] !== undefined) {
      nodes.push(
        <strong key={`${match.index}-strong`} className="font-semibold text-zinc-100">
          {match[3]}
        </strong>
      );
    }
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return <>{nodes}</>;
}

/* ------------------------------------------------------------------ */
/* Shared chrome                                                       */
/* ------------------------------------------------------------------ */

export function MarketingNav() {
  return (
    <nav className="relative z-10 border-b border-zinc-800/60">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-forge-400 to-indigo-400 bg-clip-text text-transparent">
            Forge
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/guides" className="text-sm text-zinc-400 hover:text-white transition">
            Guides
          </Link>
          <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition">
            Pricing
          </Link>
          <Link
            href="/sign-in"
            className="hidden text-sm text-zinc-400 hover:text-white transition sm:block"
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
      </div>
    </nav>
  );
}

const footerToolLinks = [
  { label: "Invoice Generator", href: "/invoice-generator" },
  { label: "AI Content Repurposer", href: "/ai-content-repurposer" },
  { label: "Portfolio Builder", href: "/portfolio-builder" },
  { label: "CSV Dashboards", href: "/csv-dashboard" },
  { label: "Form & Quiz Builder", href: "/form-quiz-builder" },
];

const footerGuideLinks = [
  { label: "All guides", href: "/guides" },
  { label: "Invoicing for freelancers", href: "/guides/free-invoice-generator-for-freelancers" },
  { label: "AI content repurposing", href: "/guides/how-to-repurpose-content-with-ai" },
  { label: "Developer portfolios", href: "/guides/portfolio-website-for-developers" },
  { label: "The freelancer toolkit", href: "/guides/freelancer-toolkit" },
];

export function MarketingFooter() {
  return (
    <footer className="relative z-10 border-t border-zinc-800 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="text-lg font-bold">
            <span className="bg-gradient-to-r from-forge-400 to-indigo-400 bg-clip-text text-transparent">
              Forge
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-500">
            Seven productivity tools for freelancers and small teams — invoicing, AI content,
            portfolios, dashboards, and more. One login, one subscription.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-300">Tools</h3>
          <ul className="mt-3 space-y-2">
            {footerToolLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-zinc-500 hover:text-white transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-300">Guides</h3>
          <ul className="mt-3 space-y-2">
            {footerGuideLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-zinc-500 hover:text-white transition">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-zinc-300">Company</h3>
          <ul className="mt-3 space-y-2">
            <li>
              <Link href="/pricing" className="text-sm text-zinc-500 hover:text-white transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/sign-up" className="text-sm text-zinc-500 hover:text-white transition">
                Create an account
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/ameti21/forge"
                className="text-sm text-zinc-500 hover:text-white transition"
              >
                GitHub
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl px-6">
        <p className="text-sm text-zinc-600">© 2026 Forge by Jet Ameti. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Reusable sections                                                   */
/* ------------------------------------------------------------------ */

export interface Faq {
  question: string;
  answer: string;
}

export function FaqSection({ faqs }: { faqs: Faq[] }) {
  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold">Frequently asked questions</h2>
      <div className="mt-8 space-y-6">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <h3 className="text-lg font-semibold text-zinc-100">{faq.question}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              <RichText text={faq.answer} />
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner({
  title,
  body,
  primaryLabel,
  primaryHref,
  secondaryLabel = "See pricing",
  secondaryHref = "/pricing",
}: {
  title: string;
  body: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="mt-16 rounded-2xl border border-forge-500/30 bg-gradient-to-br from-forge-500/10 to-indigo-500/10 p-8 sm:p-10">
      <h2 className="text-2xl font-bold sm:text-3xl">{title}</h2>
      <p className="mt-3 max-w-2xl text-zinc-400 leading-relaxed">{body}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Link
          href={primaryHref}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-forge-500 to-indigo-500 px-6 py-3 font-semibold text-white shadow-lg shadow-forge-500/25 hover:shadow-forge-500/40 transition-all"
        >
          {primaryLabel}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
        <Link
          href={secondaryHref}
          className="rounded-xl border border-zinc-700 px-6 py-3 font-medium text-zinc-300 hover:border-zinc-500 hover:text-white transition"
        >
          {secondaryLabel}
        </Link>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function faqPageJsonLd(faqs: Faq[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        // Strip inline markdown links/bold for the structured-data text.
        text: faq.answer.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*/g, ""),
      },
    })),
  };
}
