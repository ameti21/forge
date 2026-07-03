# Forge

A Next.js dashboard that bundles several small productivity tools behind a single login: an invoice generator, an AI content repurposer (Groq), a portfolio/CV builder, CSV dashboards, a template gallery, a form/quiz builder, and a learning-path page. Authentication is handled by Clerk and subscription billing by Stripe Checkout.

Most tools are currently UI prototypes; the AI Content Repurposer (Groq-backed) and Stripe checkout flow have working backends.

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript
- Tailwind CSS
- [Clerk](https://clerk.com/) for authentication
- [Stripe](https://stripe.com/) for subscription checkout
- [Groq](https://groq.com/) for AI content generation

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in real values
npm run dev
```

The app runs at http://localhost:3000.

In development, the app runs without Clerk keys (auth is skipped so you can work on the UI locally). In production the middleware fails closed: if `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is missing, protected routes (`/dashboard`, `/tools`, `/api/ai`, `/api/stripe`) return 401 or redirect to sign-in.

## Environment variables

See [.env.example](.env.example) for the full list.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key (required in production) |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` / `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Clerk routing (defaults: `/sign-in`, `/sign-up`) |
| `STRIPE_SECRET_KEY` | Stripe API secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `STRIPE_PRICE_STARTER` / `STRIPE_PRICE_PRO` / `STRIPE_PRICE_EMPIRE` | Stripe price IDs for the three subscription tiers (server-side allowlist for checkout) |
| `GROQ_API_KEY` | Groq API key for the AI Content Repurposer |
| `NEXT_PUBLIC_BASE_URL` | Public base URL, used for Stripe redirect URLs |

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — run ESLint
- `npx tsc --noEmit` — type-check

## Deploying

The repo is set up for Vercel (see `vercel.json`), but any Node host that can run `next build` / `next start` works. Set all environment variables above in your hosting provider. Create the three subscription prices in the Stripe dashboard and copy their IDs into `STRIPE_PRICE_*`. Configure Clerk's allowed origins/redirects for your production domain.

## API endpoints

- `POST /api/ai/repurpose` — body `{ "text": string }` (max 10,000 chars). Requires a signed-in user; rate limited to 10 requests/hour per user (in-memory, per instance).
- `POST /api/stripe/checkout` — body `{ "tier": "starter" | "pro" | "empire" }`. Requires a signed-in user; returns a Stripe Checkout URL.
