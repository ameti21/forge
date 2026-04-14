"use client";

import { useState } from "react";

export default function AiContentPage() {
  const [input, setInput] = useState("");
  const [outputs, setOutputs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setOutputs([]);
    try {
      const res = await fetch("/api/ai/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to generate content");
        return;
      }
      setOutputs(data.outputs || []);
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <span className="text-3xl">🤖</span> AI Content Repurposer
        </h1>
        <p className="mt-2 text-zinc-400">
          Paste a blog post, script, or idea → get a Twitter thread, LinkedIn post, and email newsletter. Powered by Groq.
        </p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <label className="block text-sm text-zinc-400 mb-2">Your content</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none resize-none"
          placeholder="Paste your blog post, script, or idea here..."
        />
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-zinc-500">{input.length} characters</span>
          <button
            onClick={generate}
            disabled={loading || !input.trim()}
            className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3 font-semibold text-white hover:shadow-lg hover:shadow-emerald-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Thinking at 500+ tokens/sec..." : "Repurpose with Groq AI"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-red-400">
          {error}
        </div>
      )}

      {outputs.length > 0 && (
        <div className="mt-8 space-y-6">
          {outputs.map((output, i) => (
            <div key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-zinc-400">Output {i + 1}</span>
                <button
                  onClick={() => copyToClipboard(output)}
                  className="rounded-lg border border-zinc-700 px-3 py-1 text-xs text-zinc-400 hover:text-white hover:border-zinc-500 transition"
                >
                  Copy
                </button>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
                {output}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
