import type { Metadata } from "next";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const title = "Forge Pricing — All 7 Tools From $9/month";
const description =
  "Simple pricing for Forge's productivity suite: Starter at $9/mo, Pro with AI tools at $19/mo, or all seven tools with the Empire plan at $49/mo.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/pricing") },
  openGraph: {
    title,
    description,
    url: absoluteUrl("/pricing"),
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
