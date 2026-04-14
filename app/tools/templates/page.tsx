"use client";

const templates = [
  { name: "Startup Landing Page", category: "Marketing", preview: "bg-gradient-to-br from-violet-600 to-indigo-600" },
  { name: "SaaS Dashboard", category: "App", preview: "bg-gradient-to-br from-emerald-600 to-teal-600" },
  { name: "Portfolio Minimal", category: "Personal", preview: "bg-gradient-to-br from-zinc-600 to-zinc-800" },
  { name: "E-commerce Store", category: "Commerce", preview: "bg-gradient-to-br from-amber-600 to-orange-600" },
  { name: "Blog / Magazine", category: "Content", preview: "bg-gradient-to-br from-pink-600 to-rose-600" },
  { name: "Restaurant Menu", category: "Business", preview: "bg-gradient-to-br from-red-600 to-orange-600" },
  { name: "Agency Site", category: "Marketing", preview: "bg-gradient-to-br from-cyan-600 to-blue-600" },
  { name: "Event Landing Page", category: "Marketing", preview: "bg-gradient-to-br from-fuchsia-600 to-purple-600" },
  { name: "Documentation Site", category: "Developer", preview: "bg-gradient-to-br from-sky-600 to-indigo-600" },
  { name: "Real Estate Listings", category: "Business", preview: "bg-gradient-to-br from-green-600 to-emerald-600" },
  { name: "Fitness Tracker", category: "App", preview: "bg-gradient-to-br from-orange-600 to-red-600" },
  { name: "Newsletter Signup", category: "Marketing", preview: "bg-gradient-to-br from-indigo-600 to-violet-600" },
];

export default function TemplatesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <span className="text-3xl">🎨</span> Template Marketplace
        </h1>
        <p className="mt-2 text-zinc-400">Browse 100+ responsive site templates. Preview, customize, and download.</p>
      </div>

      {/* Categories */}
      <div className="mb-8 flex flex-wrap gap-2">
        {["All", "Marketing", "App", "Personal", "Commerce", "Content", "Business", "Developer"].map((cat) => (
          <button
            key={cat}
            className="rounded-full border border-zinc-700 px-4 py-1.5 text-sm text-zinc-300 hover:border-forge-500 hover:text-white transition"
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((t, i) => (
          <div key={i} className="group rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden hover:border-zinc-600 transition">
            <div className={`h-48 ${t.preview} flex items-center justify-center`}>
              <span className="text-white/60 text-sm font-medium">Preview</span>
            </div>
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold group-hover:text-forge-300 transition">{t.name}</h3>
                  <p className="text-sm text-zinc-500">{t.category}</p>
                </div>
                <button className="rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:border-forge-500 hover:text-white transition">
                  Use Template
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
