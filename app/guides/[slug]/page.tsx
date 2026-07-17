import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CtaBanner,
  FaqSection,
  JsonLd,
  MarketingFooter,
  MarketingNav,
  RichText,
  faqPageJsonLd,
} from "@/components/marketing";
import { getGuide, guides, type GuideBlock } from "@/lib/guides";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};
  const url = absoluteUrl(`/guides/${guide.slug}`);
  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url,
      siteName: SITE_NAME,
      type: "article",
      publishedTime: guide.datePublished,
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
    },
  };
}

function articleJsonLd(guide: NonNullable<ReturnType<typeof getGuide>>) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.heading,
    description: guide.description,
    datePublished: guide.datePublished,
    dateModified: guide.datePublished,
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
    author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
  };
}

function Block({ block }: { block: GuideBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="mt-12 text-2xl font-bold text-zinc-100 sm:text-3xl">{block.text}</h2>
      );
    case "h3":
      return <h3 className="mt-8 text-xl font-semibold text-zinc-100">{block.text}</h3>;
    case "p":
      return (
        <p className="mt-5 leading-relaxed text-zinc-400">
          <RichText text={block.text} />
        </p>
      );
    case "ul":
      return (
        <ul className="mt-5 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-relaxed text-zinc-400">
              <svg
                className="mt-1.5 h-4 w-4 shrink-0 text-forge-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4 leading-relaxed text-zinc-400">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-forge-500 to-indigo-500 text-sm font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">
                <RichText text={item} />
              </span>
            </li>
          ))}
        </ol>
      );
  }
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guide.related
    .map((s) => getGuide(s))
    .filter((g): g is NonNullable<typeof g> => Boolean(g));

  return (
    <main className="relative overflow-hidden bg-zinc-950">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-forge-500/10 blur-[120px]" />
      </div>

      <JsonLd data={articleJsonLd(guide)} />
      <JsonLd data={faqPageJsonLd(guide.faqs)} />

      <MarketingNav />

      <article className="relative z-10 mx-auto max-w-3xl px-6 pt-16 pb-8">
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <Link
            href="/guides"
            className="rounded-full border border-forge-500/30 bg-forge-500/10 px-3 py-1 font-medium text-forge-300 hover:bg-forge-500/20 transition"
          >
            {guide.category}
          </Link>
          <span>{guide.readingTime}</span>
        </div>

        <h1 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">
            {guide.heading}
          </span>
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-zinc-300">{guide.intro}</p>

        {guide.blocks.map((block, i) => (
          <Block key={i} block={block} />
        ))}

        <FaqSection faqs={guide.faqs} />

        <CtaBanner
          title={guide.cta.title}
          body={guide.cta.body}
          primaryLabel={guide.cta.primaryLabel}
          primaryHref={guide.cta.primaryHref}
        />

        {related.length > 0 && (
          <section className="mt-16 border-t border-zinc-800 pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Keep reading
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/guides/${r.slug}`}
                  className="group rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition hover:border-zinc-600"
                >
                  <span className="text-xs text-forge-300">{r.category}</span>
                  <h3 className="mt-2 text-sm font-semibold leading-snug text-zinc-200 group-hover:text-forge-300 transition">
                    {r.heading}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <MarketingFooter />
    </main>
  );
}
