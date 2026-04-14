import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "Forge — 7 AI-Powered Micro-SaaS Tools in One Dashboard",
  description:
    "InvoiceForge, AI Content Repurposer, Portfolio Builder, Dashboards, Templates, Forms, Learning Platform. One login. Zero setup.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#6366f1" }, elements: { card: "bg-zinc-900 border-zinc-800", formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500" } }}>
      <html lang="en" className="dark">
        <body className="min-h-screen bg-zinc-950 text-zinc-50 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
