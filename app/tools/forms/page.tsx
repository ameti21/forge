"use client";

import { useState } from "react";

type Field = { id: string; type: "text" | "email" | "number" | "textarea" | "select" | "radio"; label: string; options?: string; required: boolean };

export default function FormsPage() {
  const [fields, setFields] = useState<Field[]>([]);
  const [formTitle, setFormTitle] = useState("Untitled Form");
  const [preview, setPreview] = useState(false);

  const addField = (type: Field["type"]) => {
    setFields((prev) => [
      ...prev,
      { id: crypto.randomUUID(), type, label: `${type.charAt(0).toUpperCase() + type.slice(1)} field`, options: type === "select" || type === "radio" ? "Option 1, Option 2, Option 3" : undefined, required: false },
    ]);
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields((prev) => prev.map((f) => (f.id === id ? { ...f, ...updates } : f)));
  };

  const removeField = (id: string) => {
    setFields((prev) => prev.filter((f) => f.id !== id));
  };

  const moveField = (index: number, direction: -1 | 1) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= fields.length) return;
    const updated = [...fields];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setFields(updated);
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <span className="text-3xl">📝</span> Form & Quiz Builder
        </h1>
        <p className="mt-2 text-zinc-400">Build forms, surveys, and quizzes with drag-and-drop. Collect responses in real time.</p>
      </div>

      <div className="mb-4 flex gap-3">
        <button onClick={() => setPreview(false)} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${!preview ? "bg-forge-500 text-white" : "border border-zinc-700 text-zinc-300"}`}>
          Build
        </button>
        <button onClick={() => setPreview(true)} className={`rounded-lg px-4 py-2 text-sm font-medium transition ${preview ? "bg-forge-500 text-white" : "border border-zinc-700 text-zinc-300"}`}>
          Preview
        </button>
      </div>

      {!preview ? (
        <div className="grid gap-6 lg:grid-cols-4">
          {/* Field palette */}
          <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
            <h3 className="text-sm font-semibold text-zinc-400 mb-3 uppercase tracking-wider">Add Fields</h3>
            <div className="space-y-2">
              {(["text", "email", "number", "textarea", "select", "radio"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => addField(type)}
                  className="w-full rounded-lg border border-zinc-700 px-3 py-2 text-sm text-left text-zinc-300 hover:border-forge-500 hover:text-white transition"
                >
                  + {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Form builder */}
          <div className="lg:col-span-3 space-y-4">
            <input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-6 py-4 text-2xl font-bold text-white focus:border-forge-500 focus:outline-none"
            />

            {fields.length === 0 && (
              <div className="rounded-xl border-2 border-dashed border-zinc-700 p-12 text-center text-zinc-500">
                Click a field type on the left to start building your form
              </div>
            )}

            {fields.map((field, i) => (
              <div key={field.id} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
                <div className="flex items-center gap-3 mb-3">
                  <button onClick={() => moveField(i, -1)} className="text-xs text-zinc-500 hover:text-white">↑</button>
                  <button onClick={() => moveField(i, 1)} className="text-xs text-zinc-500 hover:text-white">↓</button>
                  <span className="rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{field.type}</span>
                  <input
                    value={field.label}
                    onChange={(e) => updateField(field.id, { label: e.target.value })}
                    className="flex-1 bg-transparent text-white font-medium focus:outline-none"
                  />
                  <label className="flex items-center gap-1 text-xs text-zinc-400">
                    <input type="checkbox" checked={field.required} onChange={(e) => updateField(field.id, { required: e.target.checked })} className="rounded" />
                    Required
                  </label>
                  <button onClick={() => removeField(field.id)} className="text-red-400 hover:text-red-300 text-sm">✕</button>
                </div>
                {(field.type === "select" || field.type === "radio") && (
                  <input
                    value={field.options || ""}
                    onChange={(e) => updateField(field.id, { options: e.target.value })}
                    placeholder="Options (comma separated)"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-forge-500 focus:outline-none"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Preview */
        <div className="mx-auto max-w-xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8">
          <h2 className="text-2xl font-bold mb-6">{formTitle}</h2>
          <div className="space-y-5">
            {fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium text-zinc-300 mb-1.5">
                  {field.label} {field.required && <span className="text-red-400">*</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea rows={3} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white focus:border-forge-500 focus:outline-none resize-none" />
                ) : field.type === "select" ? (
                  <select className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white focus:border-forge-500 focus:outline-none">
                    <option value="">Select...</option>
                    {field.options?.split(",").map((opt, i) => <option key={i} value={opt.trim()}>{opt.trim()}</option>)}
                  </select>
                ) : field.type === "radio" ? (
                  <div className="space-y-2">
                    {field.options?.split(",").map((opt, i) => (
                      <label key={i} className="flex items-center gap-2 text-sm text-zinc-300">
                        <input type="radio" name={field.id} className="text-forge-500" />
                        {opt.trim()}
                      </label>
                    ))}
                  </div>
                ) : (
                  <input type={field.type} className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-white focus:border-forge-500 focus:outline-none" />
                )}
              </div>
            ))}
          </div>
          {fields.length > 0 && (
            <button className="mt-6 w-full rounded-xl bg-forge-500 py-3 font-semibold text-white hover:bg-forge-600 transition">
              Submit
            </button>
          )}
          {fields.length === 0 && (
            <p className="text-zinc-500 text-center">Add some fields in the Build tab first</p>
          )}
        </div>
      )}
    </div>
  );
}
