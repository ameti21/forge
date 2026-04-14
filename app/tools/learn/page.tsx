"use client";

import { useState } from "react";

const tracks = [
  {
    name: "HTML & CSS Fundamentals",
    icon: "🌐",
    lessons: 24,
    level: "Beginner",
    color: "from-orange-500 to-red-500",
    topics: ["HTML elements", "CSS selectors", "Flexbox", "Grid", "Responsive design", "Forms"],
  },
  {
    name: "JavaScript Mastery",
    icon: "⚡",
    lessons: 32,
    level: "Intermediate",
    color: "from-yellow-500 to-amber-500",
    topics: ["Variables & types", "Functions", "DOM manipulation", "Async/await", "ES6+", "Error handling"],
  },
  {
    name: "Python for Beginners",
    icon: "🐍",
    lessons: 28,
    level: "Beginner",
    color: "from-green-500 to-emerald-500",
    topics: ["Syntax basics", "Data structures", "Functions", "OOP", "File I/O", "APIs"],
  },
  {
    name: "SQL & Databases",
    icon: "🗄️",
    lessons: 20,
    level: "Beginner",
    color: "from-blue-500 to-indigo-500",
    topics: ["SELECT queries", "JOINs", "Aggregation", "Subqueries", "Indexing", "Normalization"],
  },
  {
    name: "React & Next.js",
    icon: "⚛️",
    lessons: 36,
    level: "Advanced",
    color: "from-cyan-500 to-blue-500",
    topics: ["Components", "State & props", "Hooks", "Routing", "Server components", "Deployment"],
  },
  {
    name: "Full-Stack Projects",
    icon: "🚀",
    lessons: 12,
    level: "Advanced",
    color: "from-purple-500 to-fuchsia-500",
    topics: ["Auth systems", "Payment integration", "REST APIs", "Database design", "Deployment", "Monitoring"],
  },
];

export default function LearnPage() {
  const [selectedTrack, setSelectedTrack] = useState<typeof tracks[0] | null>(null);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const toggleLesson = (lessonId: string) => {
    setCompletedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) {
        next.delete(lessonId);
      } else {
        next.add(lessonId);
      }
      return next;
    });
  };

  const totalCompleted = completedLessons.size;
  const totalLessons = tracks.reduce((sum, t) => sum + t.lessons, 0);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <span className="text-3xl">🎓</span> Learning Platform
        </h1>
        <p className="mt-2 text-zinc-400">Personalized learning paths for web development. Track progress and master skills.</p>
      </div>

      {/* Progress overview */}
      <div className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">Your Progress</h2>
          <span className="text-sm text-zinc-400">{totalCompleted} / {totalLessons} lessons</span>
        </div>
        <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-forge-500 to-indigo-500 transition-all duration-500"
            style={{ width: `${totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0}%` }}
          />
        </div>
        <div className="mt-4 flex gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-forge-400">{tracks.length}</p>
            <p className="text-xs text-zinc-500">Tracks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-emerald-400">{totalCompleted}</p>
            <p className="text-xs text-zinc-500">Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-amber-400">{totalLessons - totalCompleted}</p>
            <p className="text-xs text-zinc-500">Remaining</p>
          </div>
        </div>
      </div>

      {!selectedTrack ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <button
              key={track.name}
              onClick={() => setSelectedTrack(track)}
              className="group rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-left transition hover:border-zinc-600"
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${track.color} text-2xl`}>
                {track.icon}
              </div>
              <h3 className="text-lg font-semibold group-hover:text-forge-300 transition">{track.name}</h3>
              <div className="mt-2 flex items-center gap-3 text-sm text-zinc-400">
                <span>{track.lessons} lessons</span>
                <span className="h-1 w-1 rounded-full bg-zinc-600" />
                <span>{track.level}</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {track.topics.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{t}</span>
                ))}
                {track.topics.length > 3 && (
                  <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-500">+{track.topics.length - 3}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedTrack(null)}
            className="mb-6 rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 hover:text-white transition"
          >
            ← All tracks
          </button>

          <div className={`rounded-xl bg-gradient-to-r ${selectedTrack.color} p-8 mb-8`}>
            <span className="text-4xl">{selectedTrack.icon}</span>
            <h2 className="mt-3 text-3xl font-bold text-white">{selectedTrack.name}</h2>
            <p className="mt-1 text-white/70">{selectedTrack.lessons} lessons · {selectedTrack.level}</p>
          </div>

          <div className="space-y-2">
            {selectedTrack.topics.map((topic, i) => {
              const lessonId = `${selectedTrack.name}-${i}`;
              const isCompleted = completedLessons.has(lessonId);
              return (
                <button
                  key={i}
                  onClick={() => toggleLesson(lessonId)}
                  className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                    isCompleted ? "border-emerald-500/30 bg-emerald-500/5" : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600"
                  }`}
                >
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${isCompleted ? "border-emerald-500 bg-emerald-500 text-white" : "border-zinc-600"}`}>
                    {isCompleted && <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <div>
                    <p className={`font-medium ${isCompleted ? "text-emerald-300" : "text-zinc-200"}`}>
                      Lesson {i + 1}: {topic}
                    </p>
                    <p className="text-xs text-zinc-500">Click to mark {isCompleted ? "incomplete" : "complete"}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
