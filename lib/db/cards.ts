import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Card, NewCard, CardUpdate } from "@/lib/types";

export async function getCardsByDeckId(deckId: string): Promise<Card[]> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("deck_id", deckId)
        .order("created_at", { ascending: true });
        
    if (error) {
        throw new Error(`Error fetching cards for deck ${deckId}: ${error.message}`);
    }
    return data;
}

export async function createCard(card: NewCard): Promise<Card> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("cards")
        .insert(card)
        .select("*")
        .single();

    if (error) {
        throw new Error(`Error creating card: ${error.message}`);
    }
    return data;
}

export async function updateCard(cardId: string, updates: CardUpdate): Promise<Card> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("cards")
        .update(updates)
        .eq("id", cardId)
        .select("*")
        .single();


    if (error) {
        throw new Error(`Error updating card ${cardId}: ${error.message}`);
    }
    return data;
}

export async function deleteCard(cardId: string): Promise<void> {
    const supabase = await createClient();
    const { data,error } = await supabase
        .from("cards")
        .delete()
        .select("id")
        .eq("id", cardId);
        

    if (error) {
        throw new Error(`Error deleting card ${cardId}: ${error.message}`);
    }
    if (data.length === 0) {
        throw new Error(`Card ${cardId} not found for deletion.`);
    } 
}

export async function getCard (cardId: string): Promise<Card> {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("id", cardId)
        .single();

    if (error) {
        throw new Error(`Error fetching card ${cardId}: ${error.message}`);
    }
    return data;
}