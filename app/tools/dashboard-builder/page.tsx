"use client";

import { useState } from "react";

type ChartData = { labels: string[]; values: number[] };

export default function DashboardBuilderPage() {
  const [csvText, setCsvText] = useState("");
  const [data, setData] = useState<ChartData | null>(null);
  const [chartType, setChartType] = useState<"bar" | "line">("bar");

  const parseCSV = () => {
    const lines = csvText.trim().split("\n");
    if (lines.length < 2) return;
    const headers = lines[0].split(",").map((h) => h.trim());
    const labels: string[] = [];
    const values: number[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(",").map((c) => c.trim());
      if (cols.length >= 2) {
        labels.push(cols[0]);
        values.push(parseFloat(cols[1]) || 0);
      }
    }
    setData({ labels, values });
  };

  const maxVal = data ? Math.max(...data.values, 1) : 1;
  const sum = data ? data.values.reduce((a, b) => a + b, 0) : 0;
  const avg = data ? sum / data.values.length : 0;
  const max = data ? Math.max(...data.values) : 0;
  const min = data ? Math.min(...data.values) : 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <span className="text-3xl">📊</span> Business Dashboards
        </h1>
        <p className="mt-2 text-zinc-400">Upload CSV data → get live charts and KPI cards instantly.</p>
      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 mb-8">
        <label className="block text-sm text-zinc-400 mb-2">Paste CSV data (label, value)</label>
        <textarea
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
          rows={6}
          className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none resize-none font-mono text-sm"
          placeholder={"Month,Revenue\nJan,4200\nFeb,5100\nMar,4800\nApr,6300\nMay,7200\nJun,6800"}
        />
        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={parseCSV}
            className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 font-semibold text-white hover:shadow-lg hover:shadow-amber-500/25 transition"
          >
            Generate Dashboard
          </button>
          <button
            onClick={() => setCsvText("Month,Revenue\nJan,4200\nFeb,5100\nMar,4800\nApr,6300\nMay,7200\nJun,6800")}
            className="rounded-lg border border-zinc-700 px-4 py-3 text-sm text-zinc-400 hover:text-white transition"
          >
            Load sample data
          </button>
        </div>
      </div>

      {data && (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total", value: `$${sum.toLocaleString()}` },
              { label: "Average", value: `$${avg.toFixed(0)}` },
              { label: "Highest", value: `$${max.toLocaleString()}` },
              { label: "Lowest", value: `$${min.toLocaleString()}` },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-center">
                <p className="text-sm text-zinc-400">{kpi.label}</p>
                <p className="text-2xl font-bold mt-1">{kpi.value}</p>
              </div>
            ))}
          </div>

          {/* Chart type toggle */}
          <div className="mb-4 flex gap-2">
            <button
              onClick={() => setChartType("bar")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${chartType === "bar" ? "bg-forge-500 text-white" : "border border-zinc-700 text-zinc-300"}`}
            >
              Bar Chart
            </button>
            <button
              onClick={() => setChartType("line")}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${chartType === "line" ? "bg-forge-500 text-white" : "border border-zinc-700 text-zinc-300"}`}
            >
              Line Chart
            </button>
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            {chartType === "bar" ? (
              <div className="flex items-end gap-3 h-64">
                {data.labels.map((label, i) => (
                  <div key={i} className="flex flex-1 flex-col items-center gap-2">
                    <span className="text-xs text-zinc-400">${data.values[i]}</span>
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-forge-600 to-indigo-500 transition-all duration-500"
                      style={{ height: `${(data.values[i] / maxVal) * 100}%` }}
                    />
                    <span className="text-xs text-zinc-500 truncate w-full text-center">{label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <svg viewBox={`0 0 ${data.labels.length * 100} 260`} className="w-full h-64">
                <polyline
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  points={data.values.map((v, i) => `${i * 100 + 50},${240 - (v / maxVal) * 220}`).join(" ")}
                />
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6d5dfc" />
                    <stop offset="100%" stopColor="#818cf8" />
                  </linearGradient>
                </defs>
                {data.values.map((v, i) => (
                  <g key={i}>
                    <circle cx={i * 100 + 50} cy={240 - (v / maxVal) * 220} r="5" fill="#6d5dfc" />
                    <text x={i * 100 + 50} y={255} textAnchor="middle" fill="#71717a" fontSize="12">{data.labels[i]}</text>
                    <text x={i * 100 + 50} y={240 - (v / maxVal) * 220 - 12} textAnchor="middle" fill="#a1a1aa" fontSize="11">${v}</text>
                  </g>
                ))}
              </svg>
            )}
          </div>

          {/* Data table */}
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="px-6 py-3 text-left text-xs text-zinc-400 uppercase tracking-wider">Label</th>
                  <th className="px-6 py-3 text-right text-xs text-zinc-400 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-right text-xs text-zinc-400 uppercase tracking-wider">% of Total</th>
                </tr>
              </thead>
              <tbody>
                {data.labels.map((label, i) => (
                  <tr key={i} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                    <td className="px-6 py-3">{label}</td>
                    <td className="px-6 py-3 text-right font-medium">${data.values[i].toLocaleString()}</td>
                    <td className="px-6 py-3 text-right text-zinc-400">{((data.values[i] / sum) * 100).toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
