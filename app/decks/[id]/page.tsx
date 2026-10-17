import { getDeckWithCards } from "@/lib/db/decks";

export default async function DeckPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const deck = await getDeckWithCards(id);
    return (<h1>{deck.name}</h1>);
}