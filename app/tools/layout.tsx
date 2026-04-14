import Link from "next/link";
import ConditionalUserButton from "../conditional-user-button";

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold">
              <span className="bg-gradient-to-r from-forge-400 to-indigo-400 bg-clip-text text-transparent">Forge</span>
            </Link>
            <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition">← Dashboard</Link>
          </div>
          <ConditionalUserButton />
        </div>
      </nav>
      {children}
    </div>
  );
}
