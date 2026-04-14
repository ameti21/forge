"use client";

import { useEffect, useState } from "react";

export default function ConditionalUserButton() {
  const [UserBtn, setUserBtn] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (key && key.startsWith("pk_")) {
      import("@clerk/nextjs").then((mod) => setUserBtn(() => mod.UserButton));
    }
  }, []);

  if (!UserBtn) return <div className="h-8 w-8 rounded-full bg-zinc-700" />;
  return <UserBtn />;
}
