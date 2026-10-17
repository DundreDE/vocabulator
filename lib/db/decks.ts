import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Deck, NewDeck } from "@/lib/types";
import type { DeckWithCount } from "@/lib/types";

export async function getDecksByUserId(userId: string): Promise<Deck[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("decks")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: true });

    if (error) {
        throw new Error ('Error fetching decks for user ${userId}: ${error.message}');
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
        
            throw new Error('Error creating deck for user ${userId}: ${error.message}');
        }
    
    return data;
}

export async function getDeckWithCards(deckId: string): Promise<Deck & { cards: any[] }> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("decks")
        .select("*, cards(*)")
        .eq("id", deckId)
        .single();

    if (error) {
        throw new Error(`Error fetching deck with cards for deck ${deckId}: ${error.message}`);
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

