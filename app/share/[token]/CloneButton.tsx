"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CloneButton({ token }: { token: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function clone() {
    setLoading(true);
    setError(null);
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/auth?next=${encodeURIComponent(`/share/${token}`)}`);
      return;
    }

    const { data: newId, error } = await supabase.rpc("clone_shared_deck", {
      p_token: token,
    });

    if (error || !newId) {
      setError(error?.message || "Failed to clone deck");
      setLoading(false);
      return;
    }

    router.push(`/deck/${newId}`);
  }
  return (
    <div>
      <button
        onClick={clone}
        disabled={loading}
        className="rounded-lg bg-amber-800 px-4 py-2 font-medium text-white hover:bg-amber-900 disabled:opacity-50"
      >
        {loading ? "Cloning..." : "Clone Deck"}
      </button>
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
}
