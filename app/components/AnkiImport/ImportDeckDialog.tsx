"use client";

import type { ParseResult } from "@/lib/anki/parseApkg";
import { saveImport } from "@/lib/anki/saveImport";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MAX_BYTES = 20 * 1024 * 1024;

export default function ImportDeckDialog() {
  const [result, setResult] = useState<ParseResult | null>(null);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const timer = setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
    return () => clearTimeout(timer);
  }, [done, router]);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setResult(null);
    setDone(false);
    if (file.size > MAX_BYTES) return setError("File is bigger than 20mb.");

    try {
      const { parseApkg } = await import("@/lib/anki/parseApkg");
      const parsed = await parseApkg(file);
      setResult(parsed);
      setName(file.name.replace(/\.apkg$/i, ""));
    } catch (err) {
      const msg = (err as Error).message;
      setError(
        msg === "NEW_FORMAT"
          ? 'New Anki Format. Please choose "Support older Anki versions" at the Anki Export.'
          : "The file could not be parsed.",
      );
    }
    e.target.value = "";
  }

  async function onImport() {
    if (!result) return;
    setBusy(true);
    setError(null);
    try {
      const res = await saveImport(name.trim() || "Import", result.cards);
      if (!res.ok) {
        setError(res.message);
        return;
      }
      setResult(null);
      setDone(true);
      router.refresh();
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : "Request failed");
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="space-y-4 rounded-xl border p-4">
      <input type="file" accept=".apkg" onChange={onFile} className="text-sm" />
      {error && <p className="text-sm text-red-600">{error}</p>}
      {done && (
        <p className="text-sm text-green-600">
          Imported succesful. You now get transfered to the Dashboard.
        </p>
      )}

      {result && (
        <div className="space-y-3">
          <p className="text-sm">
            {result.cards.length} Cards found, {result.skipped} skipped.
          </p>
          <ul className="max-h-40 overflow-auto text-sm">
            {result.cards.slice(0, 5).map((c, i) => (
              <li key={i} className="border-b py-1">
                {c.front} : {c.back}
              </li>
            ))}
          </ul>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded border px-2 py-1"
          />

          <button
            onClick={onImport}
            disabled={busy || result.cards.length === 0}
            className="rounded bg-amber-800 hover:bg-amber-900 px-4 py-2 text-white disabled:opacity-50"
          >
            {busy ? "Importing..." : "Import"}
          </button>
        </div>
      )}
    </div>
  );
}
