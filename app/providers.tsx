"use client";

import { ClerkProvider } from "@clerk/nextjs";

const clerkKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
const isValidKey = clerkKey && clerkKey.startsWith("pk_");

export default function Providers({ children }: { children: React.ReactNode }) {
  if (!isValidKey) return <>{children}</>;
  return (
    <ClerkProvider
      publishableKey={clerkKey}
      appearance={{
        variables: { colorPrimary: "#6366f1" },
        elements: {
          card: "bg-zinc-900 border-zinc-800",
          formButtonPrimary: "bg-indigo-600 hover:bg-indigo-500",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
