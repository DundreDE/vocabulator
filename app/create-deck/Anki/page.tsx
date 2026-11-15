import ImportDeckDialog from "@/app/components/AnkiImport/ImportDeckDialog";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreateDeckPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-stone-800 p-6 shadow-md ">
        <h1 className="mb-4 text-2xl text-center font-bold">
          Import a Deck from an Anki File.
        </h1>
        <ImportDeckDialog />
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
