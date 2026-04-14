import type { Metadata } from "next";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge — 7 AI-Powered Micro-SaaS Tools in One Dashboard",
  description:
    "InvoiceForge, AI Content Repurposer, Portfolio Builder, Dashboards, Templates, Forms, Learning Platform. One login. Zero setup.",
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
