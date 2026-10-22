"use server";

import { editDeck } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type CardInput = { front: string; back: string };

export type EditDeckState = {
  error: string | null;
  name: string;
  cards: CardInput[];
};

const MAX_CARDS = 200;

export async function editDeckAction(
  _prev: EditDeckState,
  formData: FormData
): Promise<EditDeckState> {
  console.log([...formData.entries()]);
  const deckId = String(formData.get("deckId") ?? "").trim();
  const name = String(formData.get("deckName") ?? "").trim();

  const fronts = formData.getAll("front").map((v) => String(v).trim());
  const backs = formData.getAll("back").map((v) => String(v).trim());
  const rows: CardInput[] = fronts.map((front, i) => ({
    front,
    back: backs[i] ?? "",
  }));

  const cards = rows.filter((c) => c.front || c.back);

  const fail = (error: string): EditDeckState => ({ error, name, cards: rows});


  if (!name) {
    return { error: "Deck name is required", name, cards: rows };
  }
  if (name.length > 100) {
    return { error: "Deck name must be less than 100 characters", name, cards: rows };
  }
  if (cards.length === 0) {
    return { error: "At least one card is required", name, cards: rows };
  }
  if (cards.length > MAX_CARDS) {
    return { error: `You can only create up to ${MAX_CARDS} cards at a time`, name, cards: rows };
  }
  if (cards.some((c) => !c.front || !c.back)) {
    return { error: "All cards must have both front and back text", name, cards: rows };
  }

  const supabase = await createClient();
  const { data: { user} } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  try {
    await editDeck({ deckid: deckId, name, userId: user.id }, user.id);
  } catch (error) {
    console.error("Error editing deck:", error);
    return { error: "Failed to edit the dekc. Please try again.", name, cards: rows };
  }
  }

}
