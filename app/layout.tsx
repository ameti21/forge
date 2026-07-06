import type { Metadata } from "next";
import Providers from "./providers";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Forge — 7 AI-Powered Micro-SaaS Tools in One Dashboard",
  description:
    "InvoiceForge, AI Content Repurposer, Portfolio Builder, Dashboards, Templates, Forms, Learning Platform. One login. Zero setup.",
  applicationName: SITE_NAME,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    url: SITE_URL,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
