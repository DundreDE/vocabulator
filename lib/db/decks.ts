import { createClient } from "@/lib/supabase/server";
import type { Card, Deck, DeckWithCount, NewDeck } from "@/lib/types";
import "server-only";

export async function getDecksByUserId(userId: string): Promise<Deck[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("decks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(
      "Error fetching decks for user ${userId}: ${error.message}",
    );
  }
  return data;
}

export async function createDeck(deck: NewDeck, userId: string): Promise<Deck> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("decks")
    .insert({ ...deck, user_id: userId })
    .select("*")
    .single();

  if (error) {
    throw new Error("Error creating deck for user ${userId}: ${error.message}");
  }

  return data;
}

export async function getDeckWithCards(
  deckId: string,
): Promise<(Deck & { cards: Card[] }) | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("decks")
    .select("*, cards(*)")
    .eq("id", deckId)
    .maybeSingle();

  if (error) {
    throw new Error(
      `Error fetching deck with cards for deck ${deckId}: ${error.message}`,
    );
  }
  return data;
}

export async function getDecks(): Promise<DeckWithCount[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("decks")
    .select("*, cards(count)")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Error fetching decks: ${error.message}`);
  }
  return data.map(({ cards, ...deck }) => ({
    ...deck,
    card_count: cards[0]?.count ?? 0,
  }));
}

export async function deleteDeck(deckId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("decks").delete().eq("id", deckId);

  if (error) {
    throw new Error("Error deleting deck ${deckId}: ${error.message}");
  }
}

export async function editDeck(
  deckId: string,
  name: string,
  userId: string,
  cards: { id: string | null; front: string; back: string }[],
): Promise<Deck> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("decks")
    .update({ name })
    .eq("id", deckId)
    .eq("user_id", userId)
    .select("*")
    .single();

  if (error) {
    throw new Error(`Error editing deck: ${error.message}`);
  }

  const keepIds = cards.filter((c) => c.id).map((c) => c.id as string);
  const deleteQuery = supabase.from("cards").delete().eq("deck_id", deckId);
  const { data: deleted, error: delError } =
    keepIds.length > 0
      ? await deleteQuery.not("id", "in", `(${keepIds.join(",")})`).select("id")
      : await deleteQuery.select("id");
  console.log("deleted cards:", deleted);
  if (delError) {
    throw new Error(`Error deleting cards: ${delError.message}`);
  }

  const existing = cards
    .filter((c) => c.id)
    .map((c) => ({
      id: c.id as string,

      deck_id: deckId,
      front: c.front,
      back: c.back,
    }));
  if (existing.length > 0) {
    const { error: upError } = await supabase.from("cards").upsert(existing);
    if (upError) {
      throw new Error(`Error updating cards: ${upError.message}`);
    }
  }

  const created = cards
    .filter((c) => !c.id)
    .map((c) => ({ deck_id: deckId, front: c.front, back: c.back }));
  if (created.length > 0) {
    const { error: insError } = await supabase.from("cards").insert(created);
    if (insError) {
      throw new Error(`Error creating cards: ${insError.message}`);
    }
  }

  return data;
}

export async function createDeckWithCards(
  userId: string,
  name: string,
  cards: { front: string; back: string }[],
): Promise<Deck> {
  const supabase = await createClient();
  const { data: deck, error } = await supabase
    .from("decks")
    .insert({ name, user_id: userId })
    .select("*")
    .single();

  if (error) {
    throw new Error(`Error creating deck for user ${userId}: ${error.message}`);
  }

  const { error: cardError } = await supabase
    .from("cards")
    .insert(
      cards.map((c) => ({ deck_id: deck.id, front: c.front, back: c.back })),
    );

  if (cardError) {
    await supabase.from("decks").delete().eq("id", deck.id);
    throw new Error(`Error creating cards: ${cardError.message}`);
  }
  return deck;
}
