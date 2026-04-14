"use client";

import { useState } from "react";

export default function PortfolioPage() {
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    bio: "",
    skills: "",
    experience: [{ company: "", role: "", years: "" }],
    projects: [{ name: "", description: "", link: "" }],
  });
  const [preview, setPreview] = useState(false);

  const addExperience = () =>
    setProfile((p) => ({ ...p, experience: [...p.experience, { company: "", role: "", years: "" }] }));
  const addProject = () =>
    setProfile((p) => ({ ...p, projects: [...p.projects, { name: "", description: "", link: "" }] }));

  const updateExperience = (i: number, field: string, value: string) =>
    setProfile((p) => ({ ...p, experience: p.experience.map((e, idx) => (idx === i ? { ...e, [field]: value } : e)) }));
  const updateProject = (i: number, field: string, value: string) =>
    setProfile((p) => ({ ...p, projects: p.projects.map((proj, idx) => (idx === i ? { ...proj, [field]: value } : proj)) }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <span className="text-3xl">💼</span> Portfolio & CV Builder
        </h1>
        <p className="mt-2 text-zinc-400">Build a polished portfolio and CV. Preview live and print to PDF.</p>
      </div>

      <div className="mb-4 flex gap-3">
        <button
          onClick={() => setPreview(false)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${!preview ? "bg-forge-500 text-white" : "border border-zinc-700 text-zinc-300 hover:text-white"}`}
        >
          Edit
        </button>
        <button
          onClick={() => setPreview(true)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${preview ? "bg-forge-500 text-white" : "border border-zinc-700 text-zinc-300 hover:text-white"}`}
        >
          Preview
        </button>
        {preview && (
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition"
          >
            Print / Save PDF
          </button>
        )}
      </div>

      {!preview ? (
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Personal Info</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} placeholder="Full Name" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
              <input value={profile.title} onChange={(e) => setProfile((p) => ({ ...p, title: e.target.value }))} placeholder="Job Title" className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
            </div>
            <textarea value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} placeholder="Short bio..." rows={3} className="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none resize-none" />
            <input value={profile.skills} onChange={(e) => setProfile((p) => ({ ...p, skills: e.target.value }))} placeholder="Skills (comma separated)" className="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Experience</h2>
            {profile.experience.map((exp, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 mb-3">
                <input value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} placeholder="Company" className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
                <input value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} placeholder="Role" className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
                <input value={exp.years} onChange={(e) => updateExperience(i, "years", e.target.value)} placeholder="2020 - 2024" className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
              </div>
            ))}
            <button onClick={addExperience} className="text-sm text-forge-400 hover:text-forge-300">+ Add experience</button>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="text-lg font-semibold mb-4">Projects</h2>
            {profile.projects.map((proj, i) => (
              <div key={i} className="grid grid-cols-3 gap-3 mb-3">
                <input value={proj.name} onChange={(e) => updateProject(i, "name", e.target.value)} placeholder="Project name" className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
                <input value={proj.description} onChange={(e) => updateProject(i, "description", e.target.value)} placeholder="Description" className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
                <input value={proj.link} onChange={(e) => updateProject(i, "link", e.target.value)} placeholder="https://..." className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none" />
              </div>
            ))}
            <button onClick={addProject} className="text-sm text-forge-400 hover:text-forge-300">+ Add project</button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-white p-10 text-zinc-900 print:border-none">
          <h1 className="text-4xl font-bold">{profile.name || "Your Name"}</h1>
          <p className="text-xl text-indigo-600 mt-1">{profile.title || "Your Title"}</p>
          {profile.bio && <p className="mt-4 text-zinc-600 leading-relaxed">{profile.bio}</p>}

          {profile.skills && (
            <div className="mt-6">
              <h2 className="text-lg font-bold border-b border-zinc-200 pb-1 mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.split(",").map((s, i) => (
                  <span key={i} className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700">{s.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {profile.experience.some((e) => e.company) && (
            <div className="mt-6">
              <h2 className="text-lg font-bold border-b border-zinc-200 pb-1 mb-3">Experience</h2>
              {profile.experience.filter((e) => e.company).map((exp, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold">{exp.role} at {exp.company}</p>
                  <p className="text-sm text-zinc-500">{exp.years}</p>
                </div>
              ))}
            </div>
          )}

          {profile.projects.some((p) => p.name) && (
            <div className="mt-6">
              <h2 className="text-lg font-bold border-b border-zinc-200 pb-1 mb-3">Projects</h2>
              {profile.projects.filter((p) => p.name).map((proj, i) => (
                <div key={i} className="mb-3">
                  <p className="font-semibold">{proj.name}</p>
                  <p className="text-sm text-zinc-600">{proj.description}</p>
                  {proj.link && <a href={proj.link} className="text-sm text-indigo-600 hover:underline">{proj.link}</a>}
                </div>
              ))}
            </div>
          )}

          <p className="mt-10 text-center text-xs text-zinc-400">Built with Forge — forge.ameti.one</p>
        </div>
      )}
    </div>
  );
}
