import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ImportForm from "./import-form";

export default async function ImportDeckPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  return (
    <main className="relative flex min-h-screen items-center justify-center p-6">
      <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-stone-800 p-6 shadow-md ">
        <h1 className="mb-4 text-2xl text-center font-bold">Import a Deck</h1>
        <ImportForm />
      </div>
    </main>
  );
}
