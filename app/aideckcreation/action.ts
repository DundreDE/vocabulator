"use server";

import { createDeckWithCards } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";

import { z } from "zod";

const Input = z.object({
  name: z.string().trim().min(1).max(100),
  cards: z
    .array(
      z.object({
        front: z.string().trim().min(1).max(500),
        back: z.string().trim().min(1).max(500),
      }),
    )
    .min(1)
    .max(200),
});

export async function saveImportedDeck(
  input: z.infer<typeof Input>,
): Promise<{ id: string } | { error: string }> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Nicht eingeloggt" };

    const { name, cards } = Input.parse(input);
    const deck = await createDeckWithCards(user.id, name, cards);
    return { id: deck.id };
  } catch (e) {
    console.error("saveImportedDeck fehlgeschlagen:", e);
    return { error: e instanceof Error ? e.message : "Unbekannter Fehler" };
  }
}
