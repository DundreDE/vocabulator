"use server";

import { createCards } from "@/lib/db/cards";
import { createDeck, deleteDeck } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";
import type { ImportedCard } from "./parseApkg";

const MAX_CARDS = 5000;
const MAX_LEN = 2000;
const CHUNK = 500;

type SaveResult = { ok: true; deckId: string } | { ok: false; message: string };

function errMsg(e: unknown): string {
  if (e instanceof Error) return e.message;
  if (typeof e === "object" && e && "message" in e)
    return String((e as { message: unknown }).message);
  return "Unknown error";
}

export async function saveImport(
  deckName: string,
  cards: ImportedCard[],
): Promise<SaveResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, message: "Not logged in" };

  if (!Array.isArray(cards) || cards.length === 0 || cards.length > MAX_CARDS) {
    return { ok: false, message: "Invalid card count" };
  }
  const name = String(deckName).trim().slice(0, 100) || "import";

  const clean = cards
    .map((c) => ({
      front: String(c.front).trim().slice(0, MAX_LEN),
      back: String(c.back).trim().slice(0, MAX_LEN),
    }))
    .filter((c) => c.front && c.back);
  if (clean.length === 0) return { ok: false, message: "No valid cards" };

  let deckId: string;
  try {
    const deck = await createDeck({ name }, user.id);
    deckId = deck.id;
  } catch (e) {
    return { ok: false, message: `Deck: ${errMsg(e)}` };
  }

  try {
    for (let i = 0; i < clean.length; i += CHUNK) {
      await createCards(
        clean.slice(i, i + CHUNK).map((c) => ({ ...c, deck_id: deckId })),
      );
    }
  } catch (e) {
    await deleteDeck(deckId);
    return { ok: false, message: `Cards: ${errMsg(e)}` };
  }
  return { ok: true, deckId };
}
