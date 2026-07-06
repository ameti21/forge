import type { Faq } from "@/components/marketing";

/**
 * Static content for the public tool marketing pages (e.g. /invoice-generator).
 * These pages describe the tools; the tools themselves live behind auth
 * under /tools/* and are deliberately NOT linked directly from here —
 * every CTA goes to /sign-up or /pricing.
 */

export interface ToolPage {
  /** URL segment, e.g. "invoice-generator" → /invoice-generator */
  slug: string;
  /** <title> — keep under 60 characters. */
  title: string;
  /** Meta description — 140-160 characters. */
  description: string;
  heading: string;
  subheading: string;
  icon: string;
  gradient: string;
  primaryKeyword: string;
  features: { title: string; body: string }[];
  steps: { title: string; body: string }[];
  faqs: Faq[];
  relatedGuides: { label: string; href: string }[];
  otherTools: { label: string; href: string }[];
}

export const toolPages: ToolPage[] = [
  {
    slug: "invoice-generator",
    title: "Free Invoice Generator for Freelancers | Forge",
    description:
      "Create professional PDF invoices in under a minute. Saved clients, automatic numbering, tax math, and branded templates — built for freelancers.",
    heading: "Professional invoices in under a minute",
    subheading:
      "InvoiceForge handles numbering, tax calculation, client records, and branded PDF export — so invoicing stops eating your evenings and your invoices start getting paid on time.",
    icon: "📄",
    gradient: "from-violet-600 to-indigo-600",
    primaryKeyword: "invoice generator for freelancers",
    features: [
      {
        title: "Branded PDF export",
        body: "Clean, professional invoice PDFs with your logo and details — the kind accounts-payable teams approve without a clarification email.",
      },
      {
        title: "Saved clients and line items",
        body: "Enter a client's legal name, address, and terms once. Every future invoice starts pre-filled, so repeat billing takes seconds.",
      },
      {
        title: "Automatic numbering",
        body: "Sequential, audit-friendly invoice numbers with no duplicates and no gaps — exactly what your accountant (and the tax office) wants to see.",
      },
      {
        title: "Totals and tax done for you",
        body: "Subtotals, tax rates, and totals are computed automatically. No more spreadsheet formulas, no more typos in your own bank details.",
      },
      {
        title: "Invoice history in one place",
        body: "Every invoice you've ever sent, searchable by client and date. Tax season becomes an export, not an archaeology project.",
      },
      {
        title: "Payment-terms best practice built in",
        body: "Net-14 defaults, due-date display, and late-fee wording follow the practices that measurably shorten time-to-payment.",
      },
    ],
    steps: [
      { title: "Add your client", body: "Legal name, billing address, currency, and default terms — saved for next time." },
      { title: "Itemize the work", body: "Line items with quantity and rate; totals and tax calculate themselves." },
      { title: "Export and send", body: "Download the branded PDF and send it. The invoice is stored in your history automatically." },
    ],
    faqs: [
      {
        question: "Is the Forge invoice generator free?",
        answer:
          "You can sign up free and start invoicing right away. The Starter plan ($9/mo) unlocks unlimited invoices and PDF export — see [pricing](/pricing) for details.",
      },
      {
        question: "Can I add my own logo and branding?",
        answer:
          "Yes. Invoices carry your business name and details, and paid tiers include custom branding so the PDF looks like it came from your studio, not a template.",
      },
      {
        question: "Does it handle VAT / sales tax?",
        answer:
          "Yes — set a tax rate per invoice and the subtotal, tax amount, and total are calculated and displayed separately, as most jurisdictions require.",
      },
      {
        question: "What should a freelance invoice include?",
        answer:
          "A unique number, both parties' legal details, issue and due dates, itemized line items, tax, totals, and payment instructions. Our [freelancer invoicing guide](/guides/free-invoice-generator-for-freelancers) walks through all nine required fields.",
      },
    ],
    relatedGuides: [
      { label: "The freelancer's guide to invoicing", href: "/guides/free-invoice-generator-for-freelancers" },
      { label: "The complete freelancer toolkit", href: "/guides/freelancer-toolkit" },
    ],
    otherTools: [
      { label: "CSV Dashboards", href: "/csv-dashboard" },
      { label: "Portfolio Builder", href: "/portfolio-builder" },
    ],
  },

  {
    slug: "ai-content-repurposer",
    title: "AI Content Repurposer — One Post, a Week of Content",
    description:
      "Paste a blog post and get Twitter threads, LinkedIn posts, and newsletter copy in seconds. Groq-powered AI repurposing with platform-native formatting.",
    heading: "Turn one blog post into a week of content",
    subheading:
      "Paste your article, pick the formats, and get platform-native drafts — Twitter/X threads, LinkedIn posts, newsletter sections — in seconds, powered by Groq's ultra-fast inference.",
    icon: "🤖",
    gradient: "from-emerald-600 to-teal-600",
    primaryKeyword: "AI content repurposer",
    features: [
      {
        title: "Platform-native output",
        body: "Not generic summaries: threads with hook tweets, LinkedIn posts with personal framing, newsletter sections with context — each format follows its platform's rules.",
      },
      {
        title: "Groq-powered speed",
        body: "Full drafts in seconds, not minutes. Iterate on tone and angle as fast as you can read.",
      },
      {
        title: "Constrained prompting built in",
        body: "The per-platform prompt engineering — hooks first, one idea per tweet, no invented facts — is baked in, so output starts publishable instead of generic.",
      },
      {
        title: "Multiple formats per run",
        body: "One paste produces a thread, LinkedIn posts, and email copy together. A 1,500-word article typically yields 10+ assets.",
      },
      {
        title: "Your voice, preserved",
        body: "Output derives strictly from your source text — designed for a quick human edit pass, not a rewrite from scratch.",
      },
      {
        title: "Fits a 30-minute weekly cadence",
        body: "Built for the repurposing workflow: one strong article a month, one short session a week, a full content calendar as the result.",
      },
    ],
    steps: [
      { title: "Paste your content", body: "Drop in a blog post, case study, or newsletter — your strongest long-form material." },
      { title: "Pick target formats", body: "Twitter/X thread, LinkedIn post, newsletter section — select any or all." },
      { title: "Edit and publish", body: "Give the drafts a 10-minute voice pass, then schedule them across the week." },
    ],
    faqs: [
      {
        question: "What AI does the Content Repurposer use?",
        answer:
          "It runs on Groq's inference platform, chosen for speed — repurposing is reformatting work where fast iteration beats slow deliberation. Drafts return in seconds.",
      },
      {
        question: "Will the output sound like AI wrote it?",
        answer:
          "The prompts are constrained to your source material and platform conventions, so drafts start strong — but we recommend the 10-minute edit pass from our [repurposing playbook](/guides/how-to-repurpose-content-with-ai): rewrite the hook, cut hedge words, add one personal detail.",
      },
      {
        question: "How much content can I get from one article?",
        answer:
          "A typical 1,500-word post yields a full thread, 2-3 LinkedIn posts, a newsletter section, and a handful of standalone hooks — roughly 10-15 assets per article.",
      },
      {
        question: "Which plan includes the AI Content Repurposer?",
        answer:
          "The Pro plan ($19/mo) includes the AI Content Repurposer with Groq AI, alongside three other tools. See [pricing](/pricing) for the full comparison.",
      },
    ],
    relatedGuides: [
      { label: "How to repurpose content with AI", href: "/guides/how-to-repurpose-content-with-ai" },
      { label: "The complete freelancer toolkit", href: "/guides/freelancer-toolkit" },
    ],
    otherTools: [
      { label: "Portfolio Builder", href: "/portfolio-builder" },
      { label: "Form & Quiz Builder", href: "/form-quiz-builder" },
    ],
  },

  {
    slug: "portfolio-builder",
    title: "Portfolio & CV Builder for Developers and Freelancers",
    description:
      "Build a live portfolio site and a matching PDF CV from one set of content. Case-study layouts, drag-and-drop editing, publish in an afternoon.",
    heading: "One set of content. A live portfolio and a polished CV.",
    subheading:
      "Write your case studies once — Forge turns them into a published portfolio page and a matching PDF CV, so recruiters and hiring managers see the same story everywhere.",
    icon: "💼",
    gradient: "from-pink-600 to-rose-600",
    primaryKeyword: "portfolio builder for developers",
    features: [
      {
        title: "Portfolio + CV from one source",
        body: "Update a project once and both your live page and your PDF CV reflect it. No more diverging versions that read as embellishment.",
      },
      {
        title: "Case-study-first layouts",
        body: "Sections structured around what reviewers actually read: problem, decisions, outcome — not a wall of technology logos.",
      },
      {
        title: "Drag-and-drop editing",
        body: "Arrange sections visually. Ship a presentable site in an hour instead of starting a portfolio-site side project you'll never finish.",
      },
      {
        title: "PDF export for applications",
        body: "A clean, ATS-friendly CV export that matches the portfolio's content — ready to attach to any application.",
      },
      {
        title: "Publish as a live page",
        body: "Your portfolio goes live with a shareable URL — put it in your GitHub profile, LinkedIn, and email signature.",
      },
      {
        title: "Fast and readable by default",
        body: "Static, lightweight pages with real HTML. No 4-second hero animations undermining a developer's own site.",
      },
    ],
    steps: [
      { title: "Write 2-3 case studies", body: "Problem, constraints, decisions, outcome — about 150 words each. Content first." },
      { title: "Arrange your page", body: "Drag sections into place, add your bio and links, pick the layout." },
      { title: "Publish and export", body: "Go live with a shareable URL and download the matching PDF CV." },
    ],
    faqs: [
      {
        question: "Do I need a portfolio if I already have GitHub?",
        answer:
          "Yes — GitHub shows code, a portfolio shows judgment and outcomes. Reviewers read case studies far more often than source files. Our [developer portfolio guide](/guides/portfolio-website-for-developers) covers exactly what to include.",
      },
      {
        question: "Is the CV export ATS-friendly?",
        answer:
          "The PDF export uses clean, parseable formatting — standard headings, real text, no tables-inside-tables — so applicant tracking systems can read it.",
      },
      {
        question: "How many projects should I show?",
        answer:
          "Two or three, each with a short case study and a live link. One substantial finished project outweighs six tutorial clones.",
      },
      {
        question: "Can I use it as a freelancer rather than a job-seeker?",
        answer:
          "Absolutely — the same case-study format converts clients. Pair it with an intake form and invoicing and you've covered the core [freelancer toolkit](/guides/freelancer-toolkit).",
      },
    ],
    relatedGuides: [
      { label: "The developer portfolio that gets interviews", href: "/guides/portfolio-website-for-developers" },
      { label: "The complete freelancer toolkit", href: "/guides/freelancer-toolkit" },
    ],
    otherTools: [
      { label: "Invoice Generator", href: "/invoice-generator" },
      { label: "AI Content Repurposer", href: "/ai-content-repurposer" },
    ],
  },

  {
    slug: "csv-dashboard",
    title: "CSV to Dashboard — Charts From Your Spreadsheets",
    description:
      "Upload a CSV and get KPI cards, live charts, and exportable reports. No formulas, no SQL, no BI platform — dashboards for freelancers and small teams.",
    heading: "Upload a CSV. Get a dashboard.",
    subheading:
      "Forge's Business Dashboards tool turns raw CSV exports — Stripe payouts, sales data, time tracking — into KPI cards, charts, and client-ready reports in minutes.",
    icon: "📊",
    gradient: "from-amber-600 to-orange-600",
    primaryKeyword: "csv to dashboard",
    features: [
      {
        title: "Automatic column detection",
        body: "Upload the file and Forge infers dates, numbers, and categories — no schema setup, no formulas.",
      },
      {
        title: "KPI cards with comparisons",
        body: "Headline numbers with previous-period context, because a metric without \"versus what?\" is decoration.",
      },
      {
        title: "The right chart per metric",
        body: "Line charts for trends, sorted bars for comparisons, tables for detail — chart-choice best practice is the default.",
      },
      {
        title: "Exportable reports",
        body: "Turn the dashboard into a report you can attach to a monthly update or an invoice. Clients see the value they bought.",
      },
      {
        title: "Repeatable monthly refresh",
        body: "Keep your export format consistent and next month's report is a 10-minute task, not an afternoon.",
      },
      {
        title: "No BI platform overhead",
        body: "All the reporting a freelancer or small team needs, without Looker-scale pricing, setup, or training.",
      },
    ],
    steps: [
      { title: "Export your CSV", body: "From Stripe, your bank, ad platforms, or any system — one header row, one row per record." },
      { title: "Upload to Forge", body: "Columns and types are detected automatically; pick your KPIs and charts." },
      { title: "Share the report", body: "Export and attach it to your monthly client update or invoice." },
    ],
    faqs: [
      {
        question: "Do I need to know Excel formulas or SQL?",
        answer:
          "No. The workflow is upload → pick KPIs → share. The only skill required is exporting a clean CSV, and our [CSV-to-dashboard guide](/guides/csv-to-dashboard) has a 5-point checklist for that.",
      },
      {
        question: "What CSV files work best?",
        answer:
          "One header row, one row per record, ISO dates, plain numeric columns, and no summary rows at the bottom. Most system exports (Stripe, Shopify, banks) are close to this out of the box.",
      },
      {
        question: "Can I send dashboards to clients?",
        answer:
          "Yes — export the dashboard as a report and attach it to your monthly update or invoice. A one-page results report alongside billing measurably improves renewals.",
      },
      {
        question: "How is this different from Excel charts?",
        answer:
          "No manual chart building, no fragile formulas, and KPI comparisons out of the box. Refreshing next month means uploading a new file, not rebuilding a workbook.",
      },
    ],
    relatedGuides: [
      { label: "CSV to dashboard: the full workflow", href: "/guides/csv-to-dashboard" },
      { label: "The complete freelancer toolkit", href: "/guides/freelancer-toolkit" },
    ],
    otherTools: [
      { label: "Invoice Generator", href: "/invoice-generator" },
      { label: "Form & Quiz Builder", href: "/form-quiz-builder" },
    ],
  },

  {
    slug: "form-quiz-builder",
    title: "Form & Quiz Builder With Conditional Logic | Forge",
    description:
      "Build forms, surveys, and scored quizzes with conditional logic and real-time responses. Client intake, lead-gen quizzes, and feedback — one builder.",
    heading: "Forms, surveys, and quizzes — with logic",
    subheading:
      "Build client intake forms, lead-gen quizzes with scoring, and feedback surveys with conditional logic. Responses arrive in real time, ready to analyze.",
    icon: "📝",
    gradient: "from-fuchsia-600 to-purple-600",
    primaryKeyword: "form builder with quiz scoring",
    features: [
      {
        title: "Conditional logic",
        body: "Branch by audience, skip irrelevant questions, and route takers to different outcomes based on their answers.",
      },
      {
        title: "Quiz scoring and results",
        body: "Correct answers, per-question explanations, and outcome-based result pages — the parts that separate a quiz builder from a plain form tool.",
      },
      {
        title: "Real-time responses",
        body: "Watch submissions arrive live. Spot the drop-off question while the campaign is still running, not after.",
      },
      {
        title: "Lead-gen ready",
        body: "Gate detailed results behind an email field with a fair value exchange — the highest-converting lead magnet format on the internet.",
      },
      {
        title: "Client intake templates",
        body: "Four-question intake forms that qualify budget and timeline before the call — no more coffee chats with no-budget leads.",
      },
      {
        title: "Export for analysis",
        body: "Download responses as CSV and review them in a dashboard alongside the rest of your numbers.",
      },
    ],
    steps: [
      { title: "Pick the type", body: "Form, survey, or scored quiz — the builder adapts scoring and results accordingly." },
      { title: "Add questions and logic", body: "One idea per question, 3-4 options, branching where answers should change the path." },
      { title: "Share and collect", body: "Publish the link and watch responses arrive in real time." },
    ],
    faqs: [
      {
        question: "Can it score quizzes automatically?",
        answer:
          "Yes — mark correct answers, add explanations, and takers get a score and a results page. Our [quiz-building guide](/guides/form-builder-for-quizzes) covers question design and completion-rate tactics.",
      },
      {
        question: "Does it support conditional logic?",
        answer:
          "Yes — show or skip questions based on earlier answers, and route takers to different result pages. Branching is configured visually in the builder.",
      },
      {
        question: "How many questions should my quiz have?",
        answer:
          "5-7 for lead-gen and assessments, 8-12 for knowledge checks. Completion rate drops with every added question, so cut anything that doesn't change the outcome.",
      },
      {
        question: "Can I export the responses?",
        answer:
          "Yes — download responses as CSV and analyze them with the [CSV dashboard tool](/csv-dashboard) alongside your other business metrics.",
      },
    ],
    relatedGuides: [
      { label: "Building quizzes people finish", href: "/guides/form-builder-for-quizzes" },
      { label: "The complete freelancer toolkit", href: "/guides/freelancer-toolkit" },
    ],
    otherTools: [
      { label: "CSV Dashboards", href: "/csv-dashboard" },
      { label: "AI Content Repurposer", href: "/ai-content-repurposer" },
    ],
  },
];

export function getToolPage(slug: string): ToolPage | undefined {
  return toolPages.find((t) => t.slug === slug);
}
