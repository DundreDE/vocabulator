import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import CreateDeckForm from "./createdeckform";

export default async function CreateDeckPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/auth");

    return (
        <main className="relative flex min-h-screen items-center justify-center p-6">
            <div className="relative flex flex-col items-center justify-center gap-4 rounded-lg bg-stone-800 p-6 shadow-md ">
                <h1 className="mb-4 text-2xl text-center font-bold">Create a New Deck</h1>
                <CreateDeckForm />
            </div>
        </main>
    )
}