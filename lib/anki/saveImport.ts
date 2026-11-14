"use server";

import { createClient } from "@/lib/supabase/server";
import type { ImportedCard } from "./parseApkg";

const MAX_CARDS = 5000;
const MAX_LEN = 2000;

export async function saveImport(deckName: string, cards: ImportedCard[]) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in");

  if (!Array.isArray(cards) || cards.length === 0 || cards.length > MAX_CARDS) {
    throw new Error("Invalid card count");
  }
  const name = String(deckName).trim().slice(0, 100) || "import";

  const { data: deck, error: deckErr } = await supabase
    .from("decks")
    .insert({ name, user_id: user.id })
    .select("id")
    .single();
  if (deckErr) throw deckErr;

  const CHUNK = 500;
  for (let i = 0; i < cards.length; i += CHUNK) {
    const rows = cards.slice(i, i + CHUNK).map((c) => ({
      deck_id: deck.id,
      user_id: user.id,
      front: String(c.front).slice(0, MAX_LEN),
      back: String(c.back).slice(0, MAX_LEN),
    }));
    const { error } = await supabase.from("cards").insert(rows);
    if (error) {
      await supabase.from("decks").delete().eq("id", deck.id);
      throw error;
    }
  }
  return deck.id as string;
}
