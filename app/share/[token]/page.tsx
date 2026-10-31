import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import CloneButton from "./CloneButton";

type SharedDeck = { name: string; cards: { front: string; back: string }[] };

export default async function SharedDeckPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const uuidRe =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRe.test(token)) notFound();

  const supabase = await createClient();
  const { data: deck } = await supabase.rpc("get_shared_decl", {
    p_token: token,
  });
  if (!deck) notFound();

  const { name, cards } = deck as SharedDeck;
  const preview = cards.slice(0, 10);

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="mb-4 text-sm text-white">{cards.length} cards</p>
      <CloneButton token={token} />
      <ul className="mt-4 space-y-2">
        {preview.map((c, i) => (
          <li key={i} className="flex justify-between gap-4 p-3">
            <span>{c.front}</span>
            <span className="text-sm text-stone-500">{c.back}</span>
          </li>
        ))}
      </ul>
      {cards.length > preview.length && (
        <p className="mt-2 text-sm text-stone-500">
          ...and {cards.length - preview.length} more cards
        </p>
      )}
    </main>
  );
}
