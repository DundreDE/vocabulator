import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Deck, NewDeck } from "@/lib/types";

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