"use server";

import { editDeck } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type CardInput = { id: string | null; front: string; back: string };

export type EditDeckState = {
  error: string | null;
};

const MAX_CARDS = 200;

export async function editDeckAction(
  _prev: EditDeckState,
  formData: FormData,
): Promise<EditDeckState> {
  console.log([...formData.entries()]);
  const deckId = String(formData.get("deckId") ?? "").trim();
  const name = String(formData.get("deckName") ?? "").trim();
  const ids = formData.getAll("cardId").map((v) => String(v).trim());

  const fronts = formData.getAll("front").map((v) => String(v).trim());
  const backs = formData.getAll("back").map((v) => String(v).trim());
  const rows: CardInput[] = fronts.map((front, i) => ({
    id: null,
    front,
    back: backs[i] ?? "",
  }));

  const cards: CardInput[] = fronts
    .map((front, i) => ({ id: ids[i] || null, front, back: backs[i] ?? "" }))
    .filter((c) => c.front || c.back);

  if (!deckId) return { error: "Deck ID is required" };
  if (!name) {
    return { error: "Deck name is required" };
  }
  if (name.length > 100) {
    return {
      error: "Deck name must be less than 100 characters",
    };
  }
  if (cards.length === 0) {
    return { error: "At least one card is required" };
  }
  if (cards.length > MAX_CARDS) {
    return {
      error: `You can only create up to ${MAX_CARDS} cards at a time`,
    };
  }
  if (cards.some((c) => !c.front || !c.back)) {
    return {
      error: "All cards must have both front and back text",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  try {
    await editDeck(deckId, name, user.id, cards);
  } catch (error) {
    console.error("Error editing deck:", error);
    return {
      error: "Failed to edit the deck. Please try again.",
    };
  }
  redirect(`/dashboard`);
}
