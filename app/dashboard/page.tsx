import ConditionalUserButton from "../conditional-user-button";
import Link from "next/link";

const tools = [
  { name: "InvoiceForge", icon: "📄", href: "/tools/invoice", desc: "Generate professional PDF invoices" },
  { name: "AI Content Repurposer", icon: "🤖", href: "/tools/ai-content", desc: "Repurpose content with Groq AI" },
  { name: "Portfolio & CV Builder", icon: "💼", href: "/tools/portfolio", desc: "Build portfolios and CVs" },
  { name: "Business Dashboards", icon: "📊", href: "/tools/dashboard-builder", desc: "Upload CSV → live charts" },
  { name: "Template Marketplace", icon: "🎨", href: "/tools/templates", desc: "100+ responsive templates" },
  { name: "Form & Quiz Builder", icon: "📝", href: "/tools/forms", desc: "Build forms with logic" },
  { name: "Learning Platform", icon: "🎓", href: "/tools/learn", desc: "Personalized learning paths" },
];

async function getUser() {
  try {
    const { currentUser } = await import("@clerk/nextjs/server");
    return await currentUser();
  } catch {
    return null;
  }
}

export default async function Dashboard() {
  const user = await getUser();

  return (
    <div className="min-h-screen bg-zinc-950">
      <nav className="border-b border-zinc-800 px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            <span className="bg-gradient-to-r from-forge-400 to-indigo-400 bg-clip-text text-transparent">Forge</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="text-sm text-zinc-400 hover:text-white transition">Upgrade</Link>
            <ConditionalUserButton />
          </div>
        </div>
      </nav>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}
          </h1>
          <p className="mt-2 text-lg text-zinc-400">Your tools • Your revenue • Your empire</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <Link
              key={tool.name}
              href={tool.href}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 transition hover:border-forge-500/50 hover:bg-zinc-900"
            >
              <span className="text-3xl">{tool.icon}</span>
              <h3 className="mt-3 text-lg font-semibold group-hover:text-forge-300 transition">{tool.name}</h3>
              <p className="mt-1 text-sm text-zinc-500">{tool.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          <h2 className="text-2xl font-bold mb-2">Your Subscription</h2>
          <p className="text-zinc-400 mb-4">Manage billing and unlock all 7 tools.</p>
          <Link
            href="/pricing"
            className="inline-flex rounded-lg bg-gradient-to-r from-forge-500 to-indigo-500 px-6 py-3 font-semibold text-white hover:shadow-lg hover:shadow-forge-500/25 transition"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  );
}
