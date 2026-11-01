import StartLearning from "@/app/components/StartLearning";
import { getDeckWithCards } from "@/lib/db/decks";
import { notFound } from "next/navigation";

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const deck = await getDeckWithCards(id);
  if (!deck) notFound();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-2xl font-bold">{deck.name}</h1>
      <StartLearning deckId={deck.id} />
    </main>
  );
}
