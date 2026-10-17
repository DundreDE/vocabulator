"use server";

import { createDeck } from "@/lib/db/decks";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type CreateDeckState = {
    error: string | null;
    name: string;
};

export async function createDeckAction(
    _prev: CreateDeckState,
    formData: FormData
): Promise<CreateDeckState> {
    const name = String(formData.get("deckName") ?? "").trim();

    if (!name) {
        return { error: "Deck name is required", name };
    }
    if (name.length > 100) {
        return { error: "Deck name must be less than 100 characters", name };
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth");

    let deckId: string;
    try {
        const deck = await createDeck({ name }, user.id);
        deckId = deck.id;
    }   catch {
        return { error: "Error creating deck", name };
    }
    redirect(`/dashboard`);
}