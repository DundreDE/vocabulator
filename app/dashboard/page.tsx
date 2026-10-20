import DeckSection from "@/app/components/DeckSection";
import { getDecks } from "@/lib/db/decks";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Navbar from "../components/navbar";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  const decks = await getDecks();

  return (
    <>
      <Navbar />
      <main className="">
        <div className="flex flex-col min-h-screen items-center  p-6 gap-3">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-lg">Welcome to your dashboard!</p>
          </div>
          <DeckSection decks={decks} />
        </div>
      </main>
    </>
  );
}
