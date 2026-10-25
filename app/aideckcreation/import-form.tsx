"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { saveImportedDeck } from "./action";

type Row = {
  front: string;
  back: string;
};

type Phase = "idle" | "uploading" | "processing" | "review" | "saving";

export default function ImportForm() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [name, setName] = useState<string>("");
  const [rows, setRows] = useState<Row[]>([]);

  const router = useRouter();

  async function upload(file: File) {
    setError(null);
    if (file.size > 5_000_000) return setError("File size exceeds 5MB limit.");

    setPhase("uploading");
    const body = new FormData();
    body.append("image", file);
    const res = await fetch("/api/jobs", { method: "POST", body });
    const text = await res.text();

    let json: { jobId?: string; error?: string } = {};
    try {
      json = JSON.parse(text);
    } catch {
      setPhase("idle");
      return setError("An error occurred while uploading the file.");
    }
    if (!res.ok || !json.jobId) {
      setPhase("idle");
      return setError(
        json.error || "An error occurred while uploading the file.",
      );
    }

    setJobId(json.jobId);
    setPhase("processing");
  }

  useEffect(() => {
    if (phase !== "processing" || !jobId) return;
    const started = Date.now();

    const timer = setInterval(async () => {
      if (Date.now() - started > 120_000) {
        clearInterval(timer);
        setPhase("idle");
        return setError("Processing timed out. Please try again.");
      }

      const res = await fetch(`/api/jobs/${jobId}`);
      if (!res.ok) return;
      const job = await res.json();

      if (job.status === "done") {
        clearInterval(timer);

        setName((n) => n || job.result.name);
        setRows(
          job.result.cards.map((c: { en: string; de: string }) => ({
            front: c.en,
            back: c.de,
          })),
        );
        setPhase("review");
      } else if (job.status === "error") {
        clearInterval(timer);
        setPhase("idle");
        setError(job.error || "An error occurred while processing the file.");
      }
    }, 2000);

    return () => clearInterval(timer);
  }, [phase, jobId]);

  function updateRow(i: number, key: keyof Row, value: string) {
    setRows((r) =>
      r.map((row, idx) => (idx === i ? { ...row, [key]: value } : row)),
    );
  }
  async function save() {
    setError(null);
    setPhase("saving");

    const result = await saveImportedDeck({
      name,
      cards: rows.filter((r) => r.front.trim() && r.back.trim()),
    });

    if ("error" in result) {
      setPhase("review");
      return setError(result.error);
    }

    router.push("/dashboard");
  }

  const input =
    "w-full rounded border border-stone-500 px-2 py-1 text-sm dark:border-stone-800 dark:bg-stone-900";

  return (
    <div className="space-y-4">
      {error && (
        <p className="rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>
      )}

      {(phase === "idle" || phase === "uploading") && (
        <label className="flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-stone-300 p-8 text-center text-sm">
          <span>
            {phase === "uploading"
              ? "Wird hochgeladen..."
              : "Foto einer Vokabelseite auswählen"}
          </span>
          <input
            type="file"
            accept="image/*"
            disabled={phase === "uploading"}
            className="hidden"
            onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          />
        </label>
      )}

      {phase === "processing" && (
        <p className="animate-pulse rounded-lg border p-8 text-center text-sm">
          Seite wird gelesen und in Karten umgewandelt...
        </p>
      )}

      {(phase === "review" || phase === "saving") && (
        <>
          <input
            className={input}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Deckname"
          />
          <p className="text-sm text-stone-500">
            Bitte prüfen: {rows.length} Karten erkannt. Fehler kannst du hier
            korrigieren.
          </p>

          <ul className="space-y-2">
            {rows.map((row, i) => (
              <li key={i} className="flex gap-2">
                <input
                  className={input}
                  value={row.front}
                  onChange={(e) => updateRow(i, "front", e.target.value)}
                />
                <input
                  className={input}
                  value={row.back}
                  onChange={(e) => updateRow(i, "back", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() =>
                    setRows((r) => r.filter((_, idx) => idx !== i))
                  }
                  className="px-2 text-stone-400 hover:text-red-600"
                  aria-label="Karte löschen"
                >
                  X
                </button>
              </li>
            ))}
          </ul>

          <button
            onClick={save}
            disabled={phase === "saving" || !name.trim() || rows.length === 0}
            className="w-full rounded bg-amber-800 px-4 py-2 font-medium text-white disabled:opacity-50"
          >
            {phase === "saving" ? "Wird gespeichert..." : "Deck speichern"}
          </button>
        </>
      )}
    </div>
  );
}
