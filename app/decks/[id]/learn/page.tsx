import LearningCards from "@/app/components/LearningCards";
import { getDeckWithCards } from "@/lib/db/decks";
import { getSettings } from "@/lib/db/settings";
import { parseDirection } from "@/lib/direction";
import { dayString } from "@/lib/srs";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Dir = "front-back" | "back-front";

export default async function LearnPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ direction?: string }>;
}) {
  const { id } = await params;
  const direction = parseDirection((await searchParams).direction);
  const dirs: Dir[] =
    direction === "both" ? ["front-back", "back-front"] : [direction];

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const settings = await getSettings(user.id);

  const deck = await getDeckWithCards(id);
  if (!deck) notFound();

  const { data: progress, error } = await supabase
    .from("card_progress")
    .select("card_id, direction, due_on")
    .eq("user_id", user.id)
    .in(
      "card_id",
      deck.cards.map((c) => c.id),
    )
    .in("direction", dirs);
  if (error) throw new Error(error.message);

  const today = dayString(new Date());
  const dueOn = new Map<string, string>(
    (progress ?? []).map((p) => [`${p.card_id}:${p.direction}`, p.due_on]),
  );

  const items = deck.cards.flatMap((card) =>
    dirs.map((d) => ({ card, direction: d, key: `${card.id}:${d}` })),
  );

  const dueItems = items
    .filter((i) => {
      const d = dueOn.get(i.key);
      return d !== undefined && d <= today;
    })
    .sort((a, b) => dueOn.get(a.key)!.localeCompare(dueOn.get(b.key)!));

  const newItems = items
    .filter((i) => !dueOn.has(i.key))
    .slice(0, settings.maxNewCardsPerSession);

  const queue = [...dueItems, ...newItems].map((i) => ({
    cardId: i.card.id,
    direction: i.direction,
    prompt: i.direction === "front-back" ? i.card.front : i.card.back,
    answer: i.direction === "front-back" ? i.card.back : i.card.front,
  }));

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative">
        <h1 className="mb-4 text-2xl text-center font-bold">{deck.name}</h1>
        <LearningCards
          key={`${deck.id}:${direction}`}
          deckName={deck.name}
          queue={queue}
        />
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
