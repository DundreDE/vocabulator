"use server";

import { getDeckWithCards } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import EditDeckForm from "./editdeckform";

export default async function EditDeckPage({
  params,
}: {
  params: Promise<{ deckId: string }>;
}) {
  const { deckId } = await params;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const deck = await getDeckWithCards(deckId);
  if (!deck) redirect("/dashboard");

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-stone-800 p-6 shadow-md ">
        <h1 className="mb-4 text-2xl text-center font-bold">Edit this Deck</h1>
        <EditDeckForm deck={deck} />
      </div>
    </main>
  );
}
