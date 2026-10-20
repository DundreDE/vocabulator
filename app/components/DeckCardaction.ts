"use server";

import { deleteDeck } from "@/lib/db/decks";
import { revalidatePath } from "next/cache";

export default async function DeckCardActionDeleteDeck(deckId: string) {
  deleteDeck(deckId);
  revalidatePath("/dashboard");
}
