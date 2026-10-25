"use server";

import { createCards } from "@/lib/db/cards";
import { createDeck, deleteDeck } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type CardInput = { front: string; back: string };

export type CreateDeckState = {
  error: string | null;
  name: string;
  cards: CardInput[];
};

const MAX_CARDS = 200;

export async function createDeckAction(
  _prev: CreateDeckState,
  formData: FormData,
): Promise<CreateDeckState> {
  console.log([...formData.entries()]);
  const name = String(formData.get("deckName") ?? "").trim();

  const fronts = formData.getAll("front").map((v) => String(v).trim());
  const backs = formData.getAll("back").map((v) => String(v).trim());
  const rows: CardInput[] = fronts.map((front, i) => ({
    front,
    back: backs[i] ?? "",
  }));

  const cards = rows.filter((c) => c.front || c.back);

  const fail = (error: string): CreateDeckState => ({
    error,
    name,
    cards: rows,
  });

  if (!name) {
    return { error: "Deck name is required", name, cards: rows };
  }
  if (name.length > 100) {
    return {
      error: "Deck name must be less than 100 characters",
      name,
      cards: rows,
    };
  }
  if (cards.length === 0) {
    return { error: "At least one card is required", name, cards: rows };
  }
  if (cards.length > MAX_CARDS) {
    return {
      error: `You can only create up to ${MAX_CARDS} cards at a time`,
      name,
      cards: rows,
    };
  }
  if (cards.some((c) => !c.front || !c.back)) {
    return {
      error: "All cards must have both front and back text",
      name,
      cards: rows,
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  let deckId: string;
  try {
    const deck = await createDeck({ name }, user.id);
    deckId = deck.id;

    if (cards.length > 0) {
      try {
        await createCards(cards.map((c) => ({ ...c, deck_id: deckId })));
      } catch (error) {
        await deleteDeck(deckId);
        return { error: "Error creating cards", name, cards: rows };
      }
    }
  } catch (error) {
    return { error: "Error creating deck", name, cards: rows };
  }
  redirect(`/dashboard`);
}
