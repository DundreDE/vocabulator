import { deleteDeck } from "@/lib/db/decks";

export default function DeckCardActionDeleteDeck(deckId: string) {
  deleteDeck(deckId);
}
