"use client";
import { cardsToCsv, downloadCsv } from "@/lib/export-csv";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

export function ExportDeckButton({
  deckId,
  deckName,
}: {
  deckId: string;
  deckName: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { data, error } = await supabase
      .from("cards")
      .select("front, back")
      .eq("deck_id", deckId)
      .limit(10000);

    setLoading(false);

    if (error || !data) {
      setError("Export failed.");
      return;
    }
    if (data.length === 0) {
      setError("This deck has no cards.");
      return;
    }

    const safeName =
      deckName.replace(/[^\p{L}\p{N}\-]+/gu, "_").slice(0, 60) || "deck";
    downloadCsv(`${safeName}.csv`, cardsToCsv(data));
  };
}
