// import { getDecks } from "@/lib/db/decks";
// import DeckCard from "@/app/components/DeckCard";
import LearningCards from "@/app/components/LearningCards";
import { getDeckWithCards } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const deck = await getDeckWithCards(id);
  if (!deck) notFound();
  console.log("Deck with cards:", deck);

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative">
        <h1 className="mb-4 text-2xl text-center font-bold">{deck.name}</h1>
        <LearningCards key={deck.id} deckName={deck.name} cards={deck.cards} />
      </div>
      <Link
        href="/dashboard"
        className="fixed bottom-4 left-4 inline-block rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
      >
        Back to the Dashboard
      </Link>
    </main>
  );
}
