import Navbar from "@/app/components/navbar";
import StatsSection from "@/app/components/StatsSection";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function StatsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth");

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen mx-auto max-w-4xl flex-col items-center justify-center p-6">
        <h1 className="mb-4 text-2xl font-bold">Your Stats</h1>
        <StatsSection />
      </main>
    </>
  );
}
