import type { Faq } from "@/components/marketing";

/**
 * Static content for the /guides hub. Paragraph and list-item strings
 * support [label](/href) links and **bold** spans via <RichText />.
 */

export type GuideBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

export interface Guide {
  slug: string;
  /** <title> — keep under 60 characters. */
  title: string;
  /** Meta description — 140-160 characters. */
  description: string;
  /** H1 shown on the page. */
  heading: string;
  intro: string;
  category: string;
  readingTime: string;
  datePublished: string;
  primaryKeyword: string;
  blocks: GuideBlock[];
  faqs: Faq[];
  cta: {
    title: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
  };
  related: string[]; // slugs
}

export const guides: Guide[] = [
  /* ---------------------------------------------------------------- */
  {
    slug: "free-invoice-generator-for-freelancers",
    title: "Free Invoice Generator for Freelancers (2026 Guide)",
    description:
      "How freelancers can create professional invoices in minutes: required fields, numbering, payment terms, late-fee wording, and a free generator to start.",
    heading: "The Freelancer's Guide to Invoicing (and Getting Paid Faster)",
    intro:
      "A professional invoice is the difference between getting paid in 3 days and chasing a client for 3 weeks. This guide covers exactly what belongs on a freelance invoice, how to structure payment terms that clients actually respect, and how to automate the whole thing so you never build an invoice in a word processor again.",
    category: "Invoicing",
    readingTime: "9 min read",
    datePublished: "2026-07-06",
    primaryKeyword: "free invoice generator for freelancers",
    blocks: [
      { type: "h2", text: "Why invoices are a sales document, not paperwork" },
      {
        type: "p",
        text: "Most freelancers treat invoicing as admin. Clients treat it as a signal. A clear, branded, correctly itemized invoice tells an accounts-payable team that you run a real business and that this bill will not be fun to ignore. A screenshot of a spreadsheet tells them the opposite. In practice, well-structured invoices get routed and approved faster because the person paying doesn't have to email you back asking for your address, tax ID, or bank details.",
      },
      {
        type: "p",
        text: "The goal of everything in this guide is a single metric: **days sales outstanding** — how long it takes from sending the invoice to money in your account. Every section below removes one common reason payments stall.",
      },
      { type: "h2", text: "The 9 fields every freelance invoice needs" },
      {
        type: "p",
        text: "Skip any of these and you invite a clarification email, which resets the payment clock. A complete invoice includes:",
      },
      {
        type: "ol",
        items: [
          "**A unique invoice number.** Sequential (INV-0042) or date-based (2026-07-001). Never reuse numbers — accounting systems reject duplicates.",
          "**Your legal name and address** (plus VAT/tax ID where applicable). Companies often can't legally pay an invoice without it.",
          "**The client's legal entity name**, not the contact person. \"Acme GmbH\", not \"Sarah from Acme\".",
          "**Issue date and due date.** Spell out the actual calendar due date, not just \"Net 14\" — people don't do date math.",
          "**Itemized line items** with quantity, rate, and amount. \"Design work — $2,000\" invites pushback; \"Homepage redesign: 3 concepts, 2 revision rounds — $2,000\" doesn't.",
          "**Subtotal, tax, and total** clearly separated, with the tax rate shown.",
          "**Accepted payment methods and full payment details** — IBAN/routing number, payment link, or both.",
          "**Payment terms and late-fee policy** (see below).",
          "**A reference or PO number** if the client issued one. Invoices without the PO number get bounced by AP departments automatically.",
        ],
      },
      { type: "h2", text: "Payment terms that actually get respected" },
      {
        type: "p",
        text: "Default to **Net 14** for new clients and Net 30 only when a client's procurement process demands it. Research across invoicing platforms consistently shows shorter stated terms correlate with faster payment even when clients miss the exact deadline — an invoice due in 14 days paid 6 days late still beats a Net 30 invoice paid on time.",
      },
      {
        type: "ul",
        items: [
          "**Due on receipt** works for small, recurring retainers with established clients — not for first invoices.",
          "**50% upfront, 50% on delivery** is the standard risk hedge for projects over ~$1,000. Put it in the proposal and the invoice.",
          "**Late fees**: 1.5% per month (or the statutory rate in your jurisdiction) is typical. The fee matters less than the sentence — its presence signals you track receivables.",
          "**Early-payment nudge**: some freelancers offer 2% off for payment within 5 days. Use sparingly; it trains discounts.",
        ],
      },
      { type: "h2", text: "Invoice numbering and record-keeping" },
      {
        type: "p",
        text: "Pick one numbering scheme and never deviate. A common, audit-friendly format is `YYYY-NNN` (2026-014), which resets yearly and makes tax season trivial. Keep every issued invoice — including cancelled ones — because gaps in the sequence are what tax auditors ask about first. A generator that stores your history does this automatically; a folder of Word documents does not.",
      },
      { type: "h2", text: "Word and Excel templates vs. an invoice generator" },
      {
        type: "p",
        text: "A template is fine for your first two invoices. The problems compound after that: no automatic numbering, no stored client details, manual tax math, no record of what was sent when, and a new opportunity for a typo in your bank details every single time. An invoice generator flips each of those — client details and rates are saved, numbering increments itself, totals and tax are computed, and every invoice lives in one searchable history.",
      },
      {
        type: "p",
        text: "Forge's [invoice generator](/invoice-generator) is built exactly for this workflow: pick a client, add line items, and export a branded PDF in under a minute. It's part of the same [freelancer toolkit](/guides/freelancer-toolkit) that covers your portfolio, forms, and reporting, so invoicing stops being a separate app you forget to open.",
      },
      { type: "h2", text: "A 60-second invoicing workflow" },
      {
        type: "ol",
        items: [
          "Save each client once: legal name, billing email, address, currency, default payment terms.",
          "At project end (or on the 1st for retainers), create an invoice from that client record.",
          "Add line items straight from your proposal wording — deliverables, not hours, unless the contract is hourly.",
          "Export the PDF and send it with a two-line email: what it's for, when it's due, how to pay.",
          "Calendar a follow-up for the due date. A same-day \"friendly reminder\" recovers most late invoices without awkwardness.",
        ],
      },
      { type: "h2", text: "Handling late payers without burning the relationship" },
      {
        type: "p",
        text: "Escalate in writing, in stages: a neutral reminder on the due date, a firmer note at +7 days referencing your late-fee clause, and at +21 days a pause on ongoing work \"until the account is current\". That last phrase does the heavy lifting — it's factual, unemotional, and almost always produces payment within days. Freelancers who invoice from a system with a visible paper trail rarely reach stage three.",
      },
    ],
    faqs: [
      {
        question: "Is there a genuinely free way to generate invoices as a freelancer?",
        answer:
          "Yes. You can create a Forge account for free and build professional PDF invoices with the [invoice generator](/invoice-generator). Paid tiers add unlimited invoices, saved clients, and custom branding — see [pricing](/pricing).",
      },
      {
        question: "What payment terms should a freelancer put on an invoice?",
        answer:
          "Net 14 is the sweet spot for most freelance work: short enough to keep cash flowing, long enough for a client's approval cycle. For projects over about $1,000, invoice 50% upfront before work begins.",
      },
      {
        question: "Do freelance invoices need to be numbered?",
        answer:
          "Yes — unique, sequential numbering is a legal or tax requirement in most jurisdictions and mandatory for VAT invoices in the EU and UK. Use one consistent scheme like 2026-001 and never reuse or skip numbers.",
      },
      {
        question: "Can I charge late fees on freelance invoices?",
        answer:
          "In most jurisdictions yes, provided the fee is stated on the invoice (and ideally in your contract) before the work is billed. 1.5% per month is a common rate; some regions set a statutory rate you can reference directly.",
      },
      {
        question: "Should I invoice in my currency or the client's?",
        answer:
          "Invoice in the currency your contract names. If you have the choice, billing in your own currency moves exchange-rate risk to the client; just make sure your payment details support receiving it cheaply.",
      },
    ],
    cta: {
      title: "Send your next invoice in under a minute",
      body: "Forge's InvoiceForge tool handles numbering, tax math, branded PDFs, and client records — so you can spend the time you saved doing billable work.",
      primaryLabel: "Try the invoice generator",
      primaryHref: "/invoice-generator",
    },
    related: ["freelancer-toolkit", "portfolio-website-for-developers", "csv-to-dashboard"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "how-to-repurpose-content-with-ai",
    title: "How to Repurpose Content With AI: A Practical Playbook",
    description:
      "Turn one blog post into Twitter threads, LinkedIn posts, and newsletters with AI. A step-by-step repurposing workflow, prompts, and quality checks.",
    heading: "How to Repurpose Content With AI (Without Sounding Like a Robot)",
    intro:
      "You already wrote the hard part. A single 1,500-word blog post contains a Twitter/X thread, three LinkedIn posts, a newsletter section, and a dozen short hooks — the work is extraction and reformatting, and that is exactly what AI is good at. This playbook shows the full workflow: what to feed the model, how to prompt per platform, and the editing pass that keeps your voice intact.",
    category: "AI & Content",
    readingTime: "10 min read",
    datePublished: "2026-07-06",
    primaryKeyword: "how to repurpose content with AI",
    blocks: [
      { type: "h2", text: "Why repurposing beats creating from scratch" },
      {
        type: "p",
        text: "Content compounds through distribution, not volume. One well-researched post reformatted for four channels reaches four audiences with one research effort — and each format reinforces the others. The math is stark: writing a good long-form post might take 4 hours, while deriving a thread, two LinkedIn posts, and a newsletter blurb from it takes 30 minutes with an AI workflow. That's the difference between publishing weekly everywhere and publishing monthly somewhere.",
      },
      { type: "h2", text: "Step 1: Start from your strongest source material" },
      {
        type: "p",
        text: "AI repurposing amplifies whatever you feed it. Ideal sources are pieces with a clear argument and concrete specifics: tutorials, case studies with numbers, opinionated essays, teardown posts. Weak sources — thin listicles, news reactions — produce generic derivatives no matter how good the model. Before repurposing, check the source has: one central claim, at least three specific facts or examples, and a takeaway a reader could act on today.",
      },
      { type: "h2", text: "Step 2: Match the format to the platform, not vice versa" },
      {
        type: "p",
        text: "Each platform rewards a different shape. Don't ask AI to \"summarize for social\" — ask for the platform's native structure:",
      },
      {
        type: "ul",
        items: [
          "**Twitter/X thread**: hook tweet with the payoff up front, one idea per tweet, 6-10 tweets, closing tweet with a CTA. Numbers and contrarian framings outperform summaries.",
          "**LinkedIn post**: personal angle first (\"I spent 3 years doing X wrong\"), short lines, white space, one lesson per post. Split a long article into 2-3 separate posts rather than compressing it into one.",
          "**Newsletter section**: context for why the topic matters this week, the 3 best insights, then a link to the full piece. Write to one reader, not an audience.",
          "**Short-form video script**: 30-second structure — hook (3s), problem (7s), insight (15s), CTA (5s). AI drafts these well from a post's key claim.",
        ],
      },
      { type: "h2", text: "Step 3: Prompt with constraints, not vibes" },
      {
        type: "p",
        text: "The single biggest quality lever is a constrained prompt. Compare \"turn this into a Twitter thread\" with: \"Turn this article into an 8-tweet thread. Tweet 1 must state the most surprising claim as a hook without hashtags. Each following tweet covers exactly one point with a concrete number or example from the article. Do not invent facts not present in the article. Plain language, no emojis, no 'thread 🧵'.\" The second prompt produces something publishable; the first produces filler.",
      },
      {
        type: "p",
        text: "A purpose-built tool encodes those constraints for you. Forge's [AI Content Repurposer](/ai-content-repurposer) runs on Groq for near-instant generation: paste a post, pick the target formats, and get platform-shaped drafts with the per-platform rules already baked into the prompts.",
      },
      { type: "h2", text: "Step 4: The 10-minute human edit that saves your voice" },
      {
        type: "p",
        text: "Never publish raw AI output. The edit pass is short but non-negotiable:",
      },
      {
        type: "ol",
        items: [
          "**Fact-check every number and name** against the source. Models paraphrase confidently and occasionally wrongly.",
          "**Rewrite the hook in your own words.** The first line carries 80% of the performance; it should sound like you on your best day.",
          "**Cut hedge words** — \"arguably\", \"in today's fast-paced world\", \"it's important to note\". These are AI fingerprints.",
          "**Add one thing the AI can't know**: a personal result, a client anecdote, this week's context.",
          "**Read it aloud.** If a sentence doesn't survive being spoken, it doesn't survive the feed.",
        ],
      },
      { type: "h2", text: "Step 5: Build a repeatable weekly cadence" },
      {
        type: "p",
        text: "Repurposing works as a system, not a one-off. A sustainable weekly loop for a solo creator: Monday, publish or pick one strong long-form piece. Tuesday, generate and edit the thread and LinkedIn posts (30 minutes). Schedule everything for the week. Friday, note which derivative performed best — that signal tells you what the next long-form piece should be. The flywheel runs in reverse too: a tweet that pops is a validated thesis for a full article.",
      },
      { type: "h2", text: "Measuring whether repurposing is working" },
      {
        type: "p",
        text: "Track three numbers per source article: total derivative impressions, clicks back to the original, and email signups (or sign-ups for your product) attributed to the campaign. If you're collecting responses or feedback along the way, pipe them into a [form](/form-quiz-builder) and review results monthly in a [dashboard](/csv-dashboard) — the pattern of which topics travel is worth more than any individual post's stats.",
      },
    ],
    faqs: [
      {
        question: "Will AI-repurposed content hurt my SEO or get flagged as spam?",
        answer:
          "Not if the derivatives live on social platforms and point back to your original article — that's distribution, not duplication. Search engines penalize mass-produced pages of thin AI text, not human-edited social posts derived from your own work.",
      },
      {
        question: "What's the best AI model for content repurposing?",
        answer:
          "Fast instruction-following models are ideal because repurposing is reformatting, not deep reasoning. Forge's [AI Content Repurposer](/ai-content-repurposer) uses Groq's inference platform, which returns full drafts in seconds so you can iterate on tone quickly.",
      },
      {
        question: "How many pieces of content can I get from one blog post?",
        answer:
          "A 1,500-word post typically yields one Twitter/X thread, 2-3 LinkedIn posts, one newsletter section, 5-10 standalone quote/hook posts, and a short video script — roughly 10-15 assets per article.",
      },
      {
        question: "Should I disclose that content was AI-assisted?",
        answer:
          "For social posts derived from your own writing and edited by you, disclosure is generally a personal/brand choice rather than a requirement. Whatever you decide, the fact-check and voice edit steps matter more than the label.",
      },
      {
        question: "Can I repurpose other people's content with AI?",
        answer:
          "Summarizing with attribution and commentary is normal; regenerating someone else's article as your own is plagiarism regardless of the tool. Repurpose your own material, or add substantial original analysis when building on others'.",
      },
    ],
    cta: {
      title: "Turn one post into a week of content",
      body: "Paste a blog post into Forge's AI Content Repurposer and get Twitter threads, LinkedIn posts, and newsletter copy in seconds — powered by Groq.",
      primaryLabel: "Try the AI Content Repurposer",
      primaryHref: "/ai-content-repurposer",
    },
    related: ["freelancer-toolkit", "portfolio-website-for-developers", "form-builder-for-quizzes"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "portfolio-website-for-developers",
    title: "Portfolio Website for Developers: What to Build in 2026",
    description:
      "What a developer portfolio needs in 2026: which projects to show, how to write case studies, CV pairing, and the fastest way to ship a portfolio site.",
    heading: "The Developer Portfolio That Actually Gets Interviews",
    intro:
      "Hiring managers spend under two minutes on a portfolio. Most developer portfolios waste that time on animated hero sections and a wall of technology logos. This guide covers what reviewers actually look for, how to present 2-3 projects so they read as evidence rather than decoration, and how to ship the whole thing this weekend instead of building a portfolio site as your next never-finished side project.",
    category: "Careers",
    readingTime: "9 min read",
    datePublished: "2026-07-06",
    primaryKeyword: "portfolio website for developers",
    blocks: [
      { type: "h2", text: "What reviewers actually look for (in order)" },
      {
        type: "p",
        text: "Talk to engineering managers and the pattern is consistent. In the first 90 seconds they try to answer three questions: **Can this person build real things?** (working links beat screenshots), **Can they communicate?** (clear writing about decisions and trade-offs), and **What are they like to work with?** (tone, ownership of failures, curiosity). Visual polish ranks fourth at best — it only hurts you when it's absent for a frontend role or when it replaces substance.",
      },
      { type: "h2", text: "Pick 2-3 projects, not 10" },
      {
        type: "p",
        text: "A portfolio is a highlight reel, not an archive. Ten tutorial-grade projects signal you follow instructions; two substantial ones signal you finish things. The strongest picks share three traits: they solve a real problem for a real user (even if that user is you), they're deployed and clickable right now, and something about them was hard — scale, an integration, a gnarly edge case you can talk about. A weather app clone has none of these. A tool your freelance clients actually use has all three.",
      },
      { type: "h2", text: "Write each project as a mini case study" },
      {
        type: "p",
        text: "The write-up is where developers differentiate, because most don't write one. Use this five-part structure per project, ~150 words total:",
      },
      {
        type: "ol",
        items: [
          "**Problem** — one sentence on who needed this and why.",
          "**Constraints** — timeline, solo vs. team, unfamiliar stack. Constraints make outcomes impressive.",
          "**Decisions** — 2-3 technical choices and *why*. \"Chose SQLite over Postgres because the app is single-tenant and I wanted zero-ops deploys\" is worth more than a stack list.",
          "**Outcome** — numbers where possible: users, load time, revenue, time saved.",
          "**What I'd do differently** — one honest sentence. This is the highest-signal line in the whole portfolio.",
        ],
      },
      { type: "h2", text: "The anatomy of the site itself" },
      {
        type: "ul",
        items: [
          "**Above the fold**: your name, what you do in plain words (\"Backend engineer — Python, Go, distributed systems\"), location/remote status, and links to GitHub, email, and CV. No typewriter animations.",
          "**Projects section**: the 2-3 case studies, each with a live link and a repo link.",
          "**Optional writing section**: even two solid technical posts materially boost credibility — and you can [repurpose them for distribution](/guides/how-to-repurpose-content-with-ai).",
          "**Contact**: a mailto link is fine; a short [contact form](/form-quiz-builder) is better because it lowers the sender's activation energy.",
          "**Speed and accessibility**: static pages, real HTML, alt text. Reviewers notice a 4-second load on a *developer's own site*.",
        ],
      },
      { type: "h2", text: "Pair the portfolio with a matching CV" },
      {
        type: "p",
        text: "Recruiters and hiring managers consume different artifacts: recruiters screen CVs, engineers browse portfolios. They must tell the same story — same project names, same outcomes, same dates — because discrepancies read as embellishment. The practical move is to maintain both in one place. Forge's [Portfolio & CV Builder](/portfolio-builder) generates a live portfolio page and a polished PDF CV from the same content, so updating a project once updates both.",
      },
      { type: "h2", text: "Ship it this weekend: a concrete plan" },
      {
        type: "ol",
        items: [
          "**Saturday morning**: choose your 2-3 projects. Kill the rest without guilt.",
          "**Saturday afternoon**: write the five-part case study for each, plus a two-sentence bio. Writing first prevents design from eating the weekend.",
          "**Sunday morning**: build the page — a [portfolio builder](/portfolio-builder) gets you a live, presentable site in an hour; hand-coding is only worth it if the site *is* your frontend showcase.",
          "**Sunday afternoon**: export the matching CV, ask one blunt friend to review both, fix what they trip on, publish, and put the link in your GitHub profile, LinkedIn, and email signature.",
        ],
      },
      { type: "h2", text: "Keeping it alive without maintaining it" },
      {
        type: "p",
        text: "A portfolio dated 2023 is worse than none. Calendar a 30-minute review every quarter: swap in a stronger project if you shipped one, update outcomes with fresh numbers, prune anything you'd no longer defend in an interview. If you freelance, your portfolio doubles as a sales page — the same case-study format converts clients, and pairs naturally with the rest of a [freelancer toolkit](/guides/freelancer-toolkit).",
      },
    ],
    faqs: [
      {
        question: "Do developers still need a portfolio website if they have GitHub?",
        answer:
          "Yes. GitHub shows code; a portfolio shows judgment — why you built things, the trade-offs, and the outcomes. Reviewers rarely read source files, but they always read a good case study. Link the two together.",
      },
      {
        question: "Should I code my portfolio from scratch or use a builder?",
        answer:
          "Use a builder unless the site itself demonstrates skills you're selling (e.g., creative frontend work). For backend, data, and full-stack roles, content quality decides outcomes — a [portfolio builder](/portfolio-builder) gets you live in an hour so you can spend your time on the case studies.",
      },
      {
        question: "How many projects should a junior developer show?",
        answer:
          "Two or three, each deployed and documented with a case study. One substantial finished project outweighs six tutorial clones — depth is the signal juniors most commonly lack.",
      },
      {
        question: "What should I put in a portfolio if my best work is proprietary?",
        answer:
          "Describe it at the level your NDA allows — problem shape, scale, your role, the outcome — without code or client names. Then add one small public project so there's something clickable. \"Can't show the code\" plus a sharp write-up is still convincing.",
      },
      {
        question: "Does a portfolio need a blog?",
        answer:
          "No, but even 2-3 technical posts noticeably increase interview conversion because they prove communication skills. Write about a real problem you solved; skip the \"what is React\" explainers.",
      },
    ],
    cta: {
      title: "Build your portfolio and CV in one afternoon",
      body: "Forge's Portfolio & CV Builder turns your project write-ups into a live portfolio page and a polished PDF CV — from one set of content.",
      primaryLabel: "Try the portfolio builder",
      primaryHref: "/portfolio-builder",
    },
    related: ["freelancer-toolkit", "how-to-repurpose-content-with-ai", "free-invoice-generator-for-freelancers"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "csv-to-dashboard",
    title: "CSV to Dashboard: Turn Spreadsheets Into Live Charts",
    description:
      "Convert CSV exports into KPI dashboards without code: cleaning data, picking the right chart per metric, and building client-ready reports in minutes.",
    heading: "From CSV to Dashboard: Stop Reporting in Spreadsheets",
    intro:
      "Every business system exports CSV — Stripe, your bank, ad platforms, e-commerce backends, time trackers. And in most small businesses those exports die in a downloads folder, or worse, get pasted into a slide as a screenshot of a spreadsheet. This guide shows how to go from a raw CSV export to a dashboard a client or stakeholder can actually read: cleaning the data, choosing the right chart for each metric, and building a repeatable monthly reporting habit.",
    category: "Data & Reporting",
    readingTime: "8 min read",
    datePublished: "2026-07-06",
    primaryKeyword: "csv to dashboard",
    blocks: [
      { type: "h2", text: "Why dashboards beat spreadsheets for reporting" },
      {
        type: "p",
        text: "A spreadsheet answers questions for the person who built it. A dashboard answers questions for everyone else. The difference is pre-computation: a dashboard has already decided what matters (the KPIs), what the trend is (the charts), and what changed (comparisons) — the reader just looks. When you send a client a raw sheet, you're outsourcing analysis to the person paying you. When you send a dashboard, you're delivering the analysis. That distinction is billable.",
      },
      { type: "h2", text: "Step 1: Get your CSV into shape" },
      {
        type: "p",
        text: "Ninety percent of dashboard problems are data problems. Before uploading anything, run this checklist on the file:",
      },
      {
        type: "ul",
        items: [
          "**One header row, no merged cells, no title rows.** The first row should be column names and nothing else.",
          "**One row per record, one column per attribute.** If months run across columns (Jan, Feb, Mar…), reshape so there's a single `month` column — \"long\" format charts cleanly, \"wide\" format doesn't.",
          "**Consistent dates** in one format, ideally ISO (2026-07-06). Mixed formats silently break time-series charts.",
          "**Numbers as numbers**: strip currency symbols and thousands separators into a plain numeric column; keep currency in the column name (`revenue_usd`).",
          "**No trailing summary rows.** A \"TOTAL\" row at the bottom will chart as a giant fake data point.",
        ],
      },
      { type: "h2", text: "Step 2: Decide the 3-5 KPIs before making any chart" },
      {
        type: "p",
        text: "A dashboard is an argument about what matters. For a freelancer or small business, the durable set is: **revenue** (this period vs. last), **top revenue sources** (clients, products, or channels), **pipeline or orders** (what's coming), and **one cost or efficiency number** (expenses, hours, refund rate). Resist adding more — every extra KPI dilutes the ones that drive decisions. Everything on the dashboard should let someone say \"so we should do X\" within thirty seconds.",
      },
      { type: "h2", text: "Step 3: Match each metric to the right chart" },
      {
        type: "ul",
        items: [
          "**A single current number** (MRR, cash on hand) → a KPI card with a comparison to the previous period.",
          "**Change over time** (monthly revenue, weekly signups) → a line chart. One line if possible; more than four lines is a table in disguise.",
          "**Comparison across categories** (revenue by client, sales by product) → a horizontal bar chart, sorted descending. Sorting is the analysis.",
          "**Parts of a whole** → a bar chart still beats a pie chart in almost every case; use a pie only for 2-3 segments where the point is \"one slice dominates\".",
          "**A full record list** (every invoice, every order) → a table with sorting, placed *below* the charts, not instead of them.",
        ],
      },
      { type: "h2", text: "Step 4: Build it without writing code" },
      {
        type: "p",
        text: "The classic options each have a tax: Excel/Sheets charts are manual and fragile, BI platforms like Looker or Power BI are overkill (and priced) for a freelancer's monthly report, and coding a chart library into a web page is a project, not a report. The middle path is a purpose-built upload tool: Forge's [CSV dashboard builder](/csv-dashboard) takes the cleaned file, detects columns and types, and produces KPI cards, charts, and an exportable report you can send as-is — no formulas, no SQL.",
      },
      { type: "h2", text: "Step 5: Make it a monthly ritual, not a heroic one-off" },
      {
        type: "ol",
        items: [
          "Fix your export sources: the same 2-3 CSVs (e.g., Stripe payouts, expenses, time tracking) on the 1st of each month.",
          "Keep column names identical between months — consistency is what makes the process a 10-minute task instead of an hour.",
          "Rebuild or refresh the dashboard from the new files, then write **three sentences** of commentary: what went up, what went down, what you'll change.",
          "Send the dashboard plus commentary. If you freelance, attach it to your [monthly invoice](/invoice-generator) — clients who see the value they bought dispute fewer bills and churn less.",
        ],
      },
      { type: "h2", text: "Common CSV-to-dashboard mistakes" },
      {
        type: "p",
        text: "The failures are predictable: charting cumulative numbers when the question is about the period (a cumulative line always goes up — it hides bad months); mixing currencies or units in one series; truncating the y-axis to dramatize a trend (stakeholders eventually notice, and it costs credibility permanently); and shipping a dashboard with no comparison baseline. A number without \"versus what?\" is decoration. Always anchor to the previous period, the plan, or both.",
      },
    ],
    faqs: [
      {
        question: "Can I turn a CSV into a dashboard without knowing Excel formulas or SQL?",
        answer:
          "Yes. Upload-based tools like Forge's [CSV dashboard builder](/csv-dashboard) infer columns and types from the file and generate KPI cards and charts automatically — the only skill required is exporting a clean CSV.",
      },
      {
        question: "What's the best chart for showing revenue over time?",
        answer:
          "A line chart of revenue per period (per month for most small businesses), with the previous period or previous year as a comparison. Avoid cumulative lines — they always slope up and hide weak months.",
      },
      {
        question: "How should I prepare a CSV export before building a dashboard?",
        answer:
          "One header row, one row per record, ISO-formatted dates, plain numeric columns without currency symbols, and no total/summary rows at the bottom. Consistent column names month to month make refreshes trivial.",
      },
      {
        question: "How many KPIs should a small-business dashboard have?",
        answer:
          "Three to five. Revenue vs. last period, top revenue sources, something forward-looking (pipeline or orders), and one cost or efficiency metric cover most decisions. More than that and the important numbers stop standing out.",
      },
      {
        question: "Can I share the dashboard with clients?",
        answer:
          "Yes — export it as a report and attach it to your monthly update or invoice. Freelancers who send a visual monthly report alongside billing consistently report faster approvals and longer client retention.",
      },
    ],
    cta: {
      title: "Upload a CSV, get a dashboard",
      body: "Forge's Business Dashboards tool turns your CSV exports into KPI cards, live charts, and exportable reports — no formulas, no BI platform, no code.",
      primaryLabel: "Try the dashboard builder",
      primaryHref: "/csv-dashboard",
    },
    related: ["freelancer-toolkit", "free-invoice-generator-for-freelancers", "form-builder-for-quizzes"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "form-builder-for-quizzes",
    title: "Form Builder for Quizzes: Design Quizzes People Finish",
    description:
      "How to build online quizzes with a form builder: question design, scoring, conditional logic, lead-gen quizzes, and completion-rate tactics that work.",
    heading: "Building Quizzes People Actually Finish (and Learn From)",
    intro:
      "Quizzes are the highest-engagement format on the internet — completion rates for well-built quizzes routinely exceed those of every other lead magnet — yet most quizzes are abandoned by question three. The difference isn't the topic; it's construction. This guide covers question design, scoring, conditional logic, and the structural choices that separate a quiz people finish from a form people close.",
    category: "Forms & Engagement",
    readingTime: "9 min read",
    datePublished: "2026-07-06",
    primaryKeyword: "form builder for quizzes",
    blocks: [
      { type: "h2", text: "The three kinds of quizzes (and why it matters)" },
      {
        type: "p",
        text: "Every quiz is one of three machines, and mixing them up is the root cause of most bad quizzes. A **knowledge quiz** tests understanding and needs right answers, explanations, and a score. An **assessment quiz** (\"Which pricing strategy fits your business?\") maps answers to outcomes and needs a result page worth reaching. A **lead-gen quiz** trades a personalized result for an email address and needs the value exchange to feel fair. Decide which machine you're building before writing a single question — it determines scoring, length, and where the email gate goes.",
      },
      { type: "h2", text: "Question design: the craft is in the wrong answers" },
      {
        type: "p",
        text: "For knowledge quizzes, the correct answer is the easy part. Quality lives in the **distractors** — the wrong options. Good distractors are plausible misconceptions, not jokes or obvious throwaways: if you're testing invoice know-how, \"Net 30 means the invoice expires after 30 days\" is a distractor that teaches when revealed. Rules of thumb that hold up:",
      },
      {
        type: "ul",
        items: [
          "One idea per question. Compound questions (\"Which is true about X and Y?\") test parsing, not knowledge.",
          "3-4 options. Two invites guessing; five adds reading time without discrimination.",
          "Keep all options roughly the same length — test-savvy people know the longest answer is usually right.",
          "Randomize option order so position doesn't leak the answer across a quiz.",
          "Write an explanation for every question. The explanation is where learning happens; a score alone teaches nothing.",
        ],
      },
      { type: "h2", text: "Length and structure: the completion-rate math" },
      {
        type: "p",
        text: "Every additional question costs completions. The working ranges: **5-7 questions** for lead-gen and assessment quizzes, **8-12** for knowledge checks inside a course, and 15+ only for formal certification where the taker is committed. Structure matters as much as count: open with your second-easiest question (momentum), put the hardest ones at 60-80% depth (commitment is highest there), show a progress indicator, and ask exactly one question per screen on mobile.",
      },
      { type: "h2", text: "Conditional logic: quizzes that adapt" },
      {
        type: "p",
        text: "Conditional logic — showing question 4a only if question 3 was answered a certain way — is what separates a form builder from a quiz platform. Three high-value patterns: **branching by audience** (\"Are you a freelancer or an agency?\" then diverge), **skip logic** to avoid asking questions the previous answer made irrelevant, and **outcome routing** that assembles a personalized result page from the answer path. Forge's [Form & Quiz Builder](/form-quiz-builder) supports conditional logic natively, so the branching lives in the builder rather than in your head.",
      },
      { type: "h2", text: "Scoring and results pages" },
      {
        type: "p",
        text: "The results page is the quiz's actual product — it's the screen people screenshot and the reason lead-gen quizzes convert. A strong results page has four parts: the outcome stated plainly (\"You scored 8/10 — Invoicing Pro\"), what that outcome *means* in two sentences, the one thing to do next, and a share or sign-up CTA tied to the result (\"Get the freelancer toolkit that fixes your two missed questions\"). For assessments, write result copy for every outcome bucket with the same care as the questions — a generic result page retroactively cheapens a good quiz.",
      },
      { type: "h2", text: "Lead-gen quizzes: where to put the email gate" },
      {
        type: "p",
        text: "The standard placement — answer everything, then \"enter your email to see results\" — converts best but annoys most; it works when the promised result is genuinely personalized. The gentler variant, showing partial results and gating the detailed breakdown, sacrifices a little conversion for goodwill and better-qualified emails. Never gate *before* the quiz: at that point you've offered nothing. And say what happens after signup (\"one email with your full results, plus a weekly tip — unsubscribe anytime\") — vagueness costs more signups than the newsletter mention does.",
      },
      { type: "h2", text: "Reading the data after launch" },
      {
        type: "p",
        text: "A quiz is also an instrument pointed at your audience. Watch per-question drop-off (a spike marks a confusing or invasive question), the distribution of wrong answers (a popular distractor is a widespread misconception — that's your next article or [repurposed content series](/guides/how-to-repurpose-content-with-ai)), and outcome distribution (if 80% of takers land in one bucket, the quiz isn't discriminating). Export responses and review them monthly in a [dashboard](/csv-dashboard) alongside your other numbers.",
      },
    ],
    faqs: [
      {
        question: "How many questions should an online quiz have?",
        answer:
          "5-7 for lead-generation and personality/assessment quizzes, 8-12 for knowledge checks, 15+ only for formal certification. Completion rate drops with every added question, so cut anything that doesn't change the score or the outcome.",
      },
      {
        question: "What's the difference between a form builder and a quiz builder?",
        answer:
          "Scoring, correct answers, explanations, conditional logic, and outcome-based result pages. A plain form collects answers; a quiz builder evaluates them. Forge's [Form & Quiz Builder](/form-quiz-builder) does both from one interface.",
      },
      {
        question: "Do quizzes work for lead generation?",
        answer:
          "Yes — interactive quizzes are among the highest-converting lead magnets because the taker invests effort and gets a personalized result. The email gate placement and the quality of the results page determine most of the conversion.",
      },
      {
        question: "Should quiz answers be randomized?",
        answer:
          "Randomize the order of answer options (so position never signals correctness), but keep question order fixed if the quiz builds momentum from easy to hard. Randomize question order only in certification contexts to deter answer-sharing.",
      },
      {
        question: "Can I use quizzes inside a course?",
        answer:
          "Absolutely — short knowledge checks after each module measurably improve retention (the testing effect). Keep them low-stakes, 5-8 questions, with explanations shown immediately after each answer.",
      },
    ],
    cta: {
      title: "Build your first quiz in minutes",
      body: "Forge's Form & Quiz Builder gives you scoring, conditional logic, and real-time response collection — for quizzes, surveys, and lead-gen forms alike.",
      primaryLabel: "Try the form & quiz builder",
      primaryHref: "/form-quiz-builder",
    },
    related: ["csv-to-dashboard", "how-to-repurpose-content-with-ai", "freelancer-toolkit"],
  },

  /* ---------------------------------------------------------------- */
  {
    slug: "freelancer-toolkit",
    title: "The Freelancer Toolkit: 7 Tools to Run Your Business",
    description:
      "The complete freelancer toolkit for 2026: invoicing, portfolio, client forms, reporting dashboards, and content marketing — and how to run it all from one app.",
    heading: "The Complete Freelancer Toolkit: Run the Business Side in 5 Hours a Month",
    intro:
      "Freelancers don't fail at the craft; they drown in the business around it. Invoicing, a portfolio that sells, client intake, monthly reporting, and marketing are five separate jobs — and the default solution, a different subscription for each, costs real money and scatters your data across six logins. This guide maps the complete toolkit a solo freelancer actually needs, what each piece must do, and how to consolidate the stack so the admin fits in five hours a month.",
    category: "Freelancing",
    readingTime: "11 min read",
    datePublished: "2026-07-06",
    primaryKeyword: "freelancer toolkit",
    blocks: [
      { type: "h2", text: "The five jobs every freelance business runs" },
      {
        type: "p",
        text: "Strip away the tool marketing and a one-person business has exactly five recurring back-office jobs: **getting found** (portfolio and content), **getting hired** (intake and proposals), **getting paid** (invoicing), **proving value** (reporting), and **staying visible** (marketing). Each job needs a tool; none needs an enterprise platform. The trap is subscribing to a best-in-class app for each job — $15 here, $29 there — until the toolkit costs more than your health insurance and none of the pieces talk to each other.",
      },
      { type: "h2", text: "Job 1: A portfolio that sells while you sleep" },
      {
        type: "p",
        text: "Your portfolio is the only salesperson that works while you're delivering. It needs three things: proof (2-3 case studies with outcomes, not a wall of thumbnails), clarity (what you do, for whom, at what engagement size), and a next step (a contact form or booking link). The full treatment is in our [developer portfolio guide](/guides/portfolio-website-for-developers) — the case-study format there converts client work just as well as job interviews. Build it with the [Portfolio & CV Builder](/portfolio-builder) and you get the matching PDF CV for free.",
      },
      { type: "h2", text: "Job 2: Client intake that qualifies before the call" },
      {
        type: "p",
        text: "A \"email me!\" link produces conversations with people who have no budget. A short intake form produces qualified leads: project type, timeline, budget range, and how they found you — four questions, under a minute to complete. Add conditional logic so an enterprise inquiry sees different follow-ups than a quick-fix request. The same [form builder](/form-quiz-builder) handles testimonial collection and project feedback surveys at delivery, which feed directly back into the portfolio's case studies.",
      },
      { type: "h2", text: "Job 3: Invoicing that takes a minute, not an evening" },
      {
        type: "p",
        text: "Invoicing is the job with the highest cost of sloppiness: every malformed invoice delays cash and every chase email burns goodwill. The system is simple — saved client records, automatic numbering, itemized line items, Net 14 terms, and a follow-up on the due date. Our [freelancer invoicing guide](/guides/free-invoice-generator-for-freelancers) covers the exact fields and late-fee wording; the [invoice generator](/invoice-generator) automates it. Target: under 60 seconds per invoice, zero invoices created in a word processor.",
      },
      { type: "h2", text: "Job 4: Monthly reporting that renews contracts" },
      {
        type: "p",
        text: "Clients don't remember value; they remember the last invoice. A one-page monthly dashboard — work delivered, results moved, what's next — reframes the invoice from cost to receipt. Export your data (time tracking, campaign metrics, sales) as CSV and follow the [CSV-to-dashboard workflow](/guides/csv-to-dashboard) to turn it into KPI cards and charts with the [dashboard builder](/csv-dashboard). Freelancers who attach a report to every invoice renegotiate from evidence, not hope.",
      },
      { type: "h2", text: "Job 5: Marketing on a delivery schedule" },
      {
        type: "p",
        text: "The freelancer marketing paradox: you market least when busy, so the pipeline is empty exactly when projects end. The fix is repurposing, not more writing — one article or case study a month, multiplied into threads, LinkedIn posts, and a newsletter with the [AI Content Repurposer](/ai-content-repurposer). The complete workflow is in our [AI repurposing playbook](/guides/how-to-repurpose-content-with-ai); it runs in about 30 minutes a week, which is sustainable even mid-project.",
      },
      { type: "h2", text: "The consolidated stack vs. the à-la-carte stack" },
      {
        type: "p",
        text: "Price out the five jobs separately — an invoicing app, a portfolio site builder, a form tool, a BI-lite reporting tool, a social content tool — and a realistic à-la-carte stack lands between $60 and $120 per month, with five logins, five data silos, and five \"we've updated our pricing\" emails a year. A consolidated suite like [Forge](/) covers all five jobs in one subscription (from $9/month, all tools at $49 — see [pricing](/pricing)), with your clients, content, and numbers in one place. Consolidation isn't just cheaper; it's the reason the five-hour month is achievable at all.",
      },
      { type: "h2", text: "The 5-hour monthly operating rhythm" },
      {
        type: "ol",
        items: [
          "**1st of the month (90 min)**: export CSVs, refresh the client dashboard(s), send invoices with reports attached.",
          "**Weekly (30 min × 4)**: one repurposing session — derive and schedule the week's content from your latest article or case study.",
          "**Mid-month (60 min)**: pipeline pass — follow up on intake-form leads, nudge any overdue invoices.",
          "**Quarter-end (extra 60 min)**: portfolio review — add the strongest new project, refresh outcomes, prune the weakest piece.",
        ],
      },
      {
        type: "p",
        text: "That's the whole machine: five jobs, one toolkit, five hours a month. Everything else is craft — which is the part you actually wanted to spend your time on.",
      },
    ],
    faqs: [
      {
        question: "What tools does a freelancer actually need to start?",
        answer:
          "Five capabilities: a portfolio, a client intake form, an invoice generator, basic reporting, and a content/marketing workflow. You can cover all five with one suite like [Forge](/) instead of five separate subscriptions.",
      },
      {
        question: "How much should a freelancer spend on software?",
        answer:
          "As a rule of thumb, under 2-3% of revenue. An à-la-carte stack easily runs $60-120/month; a consolidated toolkit covers the same jobs from $9-49/month — see [Forge pricing](/pricing).",
      },
      {
        question: "Do I need accounting software as well as an invoice generator?",
        answer:
          "Eventually, for taxes — but not on day one. A generator with a complete, numbered invoice history covers the operational side and hands your accountant clean records. Add dedicated accounting software when revenue or VAT registration demands it.",
      },
      {
        question: "How do freelancers keep marketing consistent while busy with client work?",
        answer:
          "Repurposing. Write one substantial piece per month, then use an [AI repurposer](/ai-content-repurposer) to derive weekly social content from it. Thirty minutes a week keeps the pipeline warm through busy stretches.",
      },
      {
        question: "What's the fastest win from this toolkit for an existing freelancer?",
        answer:
          "Attach a one-page results dashboard to your next invoice. It takes about 30 minutes with the [CSV dashboard workflow](/guides/csv-to-dashboard) and immediately changes the renewal conversation from price to value.",
      },
    ],
    cta: {
      title: "One subscription. The whole toolkit.",
      body: "Forge bundles invoicing, portfolio, forms, dashboards, and AI content tools behind one login — from $9/month. Stop paying for five apps that don't talk to each other.",
      primaryLabel: "Get started free",
      primaryHref: "/sign-up",
    },
    related: [
      "free-invoice-generator-for-freelancers",
      "portfolio-website-for-developers",
      "csv-to-dashboard",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
