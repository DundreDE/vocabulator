"use client";

import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

type Props = { deckId: string; initialShared: boolean; token: string };

export default function ShareButton({ deckId, initialShared, token }: Props) {
  const supabase = createClient();
  const [open, setOpen] = useState(false);
  const [shared, setShared] = useState(initialShared);
  const [currentToken, setToken] = useState(token);
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);

  const link = `${origin}/share/${currentToken}`;

  function stop(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  async function toggle() {
    const next = !shared;
    const { error } = await supabase
      .from("decks")
      .update({ is_shared: next })
      .eq("id", deckId);
    if (!error) setShared(next);
  }

  async function regenerate() {
    const newToken = crypto.randomUUID();
    const { error } = await supabase
      .from("decks")
      .update({ share_token: newToken })
      .eq("id", deckId);
    if (!error) setToken(newToken);
  }

  async function copy() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <>
      <button
        onClick={(e) => {
          stop(e);
          setOpen(true);
        }}
        className="rounded bg-amber-800 px-3 py-1 text-sm text-white hover:bg-amber-900"
      >
        {shared ? "Shared" : "Share"}
      </button>
      {open && (
        <div
          onClick={(e) => {
            stop(e);
            setOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div
            onClick={stop}
            className="w-full max-w-md space-y-3 rounded-lg bg-stone-800 p-5 text-white"
          >
            <h2 className="text-lg font-bold">Share Deck </h2>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={shared} onChange={toggle} />
              <span>Share this deck per Link</span>
            </label>

            {shared && (
              <>
                <div className="flex gap-2">
                  <input
                    readOnly
                    value={link}
                    className="flex-1 rounded border border-amber-800 bg-transparent px-2 py-1 text-sm"
                  />
                  <button
                    onClick={copy}
                    className="rounded bg-amber-800 px-3 py-1 text-sm"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <button
                  onClick={regenerate}
                  className="rounded bg-amber-800 px-3 py-1 text-sm"
                >
                  Regenerate Link (old link will stop working)
                </button>
              </>
            )}

            <p className="text-xs text-stone-400">
              Note: If you share this deck, anyone with the link can view it.
              They will not be able to edit or delete it.
            </p>

            <button
              onClick={() => setOpen(false)}
              className="w-full rounded border border-stone-600 py-1 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
