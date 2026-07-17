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
    setProfile((p) => ({
      ...p,
      experience: [...p.experience, { company: "", role: "", years: "" }],
    }));
  const addProject = () =>
    setProfile((p) => ({
      ...p,
      projects: [...p.projects, { name: "", description: "", link: "" }],
    }));

  const updateExperience = (i: number, field: string, value: string) =>
    setProfile((p) => ({
      ...p,
      experience: p.experience.map((e, idx) =>
        idx === i ? { ...e, [field]: value } : e,
      ),
    }));
  const updateProject = (i: number, field: string, value: string) =>
    setProfile((p) => ({
      ...p,
      projects: p.projects.map((project, idx) =>
        idx === i ? { ...project, [field]: value } : project,
      ),
    }));

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="flex items-center gap-3 text-4xl font-bold">
          <span className="text-3xl">💼</span> Portfolio & CV Builder
        </h1>
        <p className="mt-2 text-zinc-400">
          Build a polished portfolio and CV. Preview live and print to PDF.
        </p>
      </div>

      <div className="mb-4 flex gap-3">
        <button
          onClick={() => setPreview(false)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            !preview
              ? "bg-forge-500 text-white"
              : "border border-zinc-700 text-zinc-300 hover:text-white"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setPreview(true)}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
            preview
              ? "bg-forge-500 text-white"
              : "border border-zinc-700 text-zinc-300 hover:text-white"
          }`}
        >
          Preview
        </button>
        {preview && (
          <button
            onClick={() => window.print()}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            Print / Save PDF
          </button>
        )}
      </div>

      {!preview ? (
        <div className="space-y-6">
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold">Personal Info</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={profile.name}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Full Name"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
              />
              <input
                value={profile.title}
                onChange={(e) =>
                  setProfile((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Job Title"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
              />
            </div>
            <textarea
              value={profile.bio}
              onChange={(e) =>
                setProfile((p) => ({ ...p, bio: e.target.value }))
              }
              placeholder="Short bio..."
              rows={3}
              className="mt-4 w-full resize-none rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
            />
            <input
              value={profile.skills}
              onChange={(e) =>
                setProfile((p) => ({ ...p, skills: e.target.value }))
              }
              placeholder="Skills (comma separated)"
              className="mt-4 w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
            />
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold">Experience</h2>
            {profile.experience.map((experience, i) => (
              <div key={i} className="mb-3 grid grid-cols-3 gap-3">
                <input
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(i, "company", e.target.value)
                  }
                  placeholder="Company"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                />
                <input
                  value={experience.role}
                  onChange={(e) =>
                    updateExperience(i, "role", e.target.value)
                  }
                  placeholder="Role"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                />
                <input
                  value={experience.years}
                  onChange={(e) =>
                    updateExperience(i, "years", e.target.value)
                  }
                  placeholder="2020 - 2024"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                />
              </div>
            ))}
            <button
              onClick={addExperience}
              className="text-sm text-forge-400 hover:text-forge-300"
            >
              + Add experience
            </button>
          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <h2 className="mb-4 text-lg font-semibold">Projects</h2>
            {profile.projects.map((project, i) => (
              <div key={i} className="mb-3 grid grid-cols-3 gap-3">
                <input
                  value={project.name}
                  onChange={(e) => updateProject(i, "name", e.target.value)}
                  placeholder="Project name"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                />
                <input
                  value={project.description}
                  onChange={(e) =>
                    updateProject(i, "description", e.target.value)
                  }
                  placeholder="Description"
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                />
                <input
                  value={project.link}
                  onChange={(e) => updateProject(i, "link", e.target.value)}
                  placeholder="https://..."
                  className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                />
              </div>
            ))}
            <button
              onClick={addProject}
              className="text-sm text-forge-400 hover:text-forge-300"
            >
              + Add project
            </button>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-zinc-800 bg-white p-10 text-zinc-900 print:border-none">
          <h1 className="text-4xl font-bold">{profile.name || "Your Name"}</h1>
          <p className="mt-1 text-xl text-indigo-600">
            {profile.title || "Your Title"}
          </p>
          {profile.bio && (
            <p className="mt-4 leading-relaxed text-zinc-600">{profile.bio}</p>
          )}

          {profile.skills && (
            <div className="mt-6">
              <h2 className="mb-3 border-b border-zinc-200 pb-1 text-lg font-bold">
                Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {profile.skills.split(",").map((skill, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {profile.experience.some((experience) => experience.company) && (
            <div className="mt-6">
              <h2 className="mb-3 border-b border-zinc-200 pb-1 text-lg font-bold">
                Experience
              </h2>
              {profile.experience
                .filter((experience) => experience.company)
                .map((experience, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold">
                      {experience.role} at {experience.company}
                    </p>
                    <p className="text-sm text-zinc-500">{experience.years}</p>
                  </div>
                ))}
            </div>
          )}

          {profile.projects.some((project) => project.name) && (
            <div className="mt-6">
              <h2 className="mb-3 border-b border-zinc-200 pb-1 text-lg font-bold">
                Projects
              </h2>
              {profile.projects
                .filter((project) => project.name)
                .map((project, i) => (
                  <div key={i} className="mb-3">
                    <p className="font-semibold">{project.name}</p>
                    <p className="text-sm text-zinc-600">
                      {project.description}
                    </p>
                    {project.link && (
                      <a
                        href={project.link}
                        className="text-sm text-indigo-600 hover:underline"
                      >
                        {project.link}
                      </a>
                    )}
                  </div>
                ))}
            </div>
          )}

          <p className="mt-10 text-center text-xs text-zinc-400">
            Built with Forge — forge.masterengine.ai
          </p>
        </div>
      )}
    </div>
  );
}
