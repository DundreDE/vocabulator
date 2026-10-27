import LearningCards from "@/app/components/LearningCards";
import { getDeckWithCards } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { dayString } from "@/lib/srs";

const NEW_CARD_PER_SESSION = 10;

export default async function DeckPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const deck = await getDeckWithCards(id);
  if (!deck) notFound();
  

  const { data: progress, error } = await supabase
    .from("card_progress")
    .select("card_id, due_on")
    .eq("user_id", user.id)
    .in(
      "card_id",
      deck.cards.map((c) => c.id),
    );
  if (error) throw new Error(error.message);

  const today = dayString(new Date());
  const dueOn = new Map<string, string>(
    (progress ?? []).map((p) => [p.card_id, p.due_on]),
  );

  const dueCards = deck.cards
    .filter((c) => {

      const d = dueOn.get(c.id))
      return d !== undefined && d <= today;
    })
    .sort((a, b) => dueOn.get


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
