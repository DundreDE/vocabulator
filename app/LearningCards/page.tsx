
import Link from "next/dist/client/link";
import LearningCards from "../components/LearningCards";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface card { 
    front: string;
    back: string;
    learned: boolean;

}

interface deck {
    name: string;
    cards: card[];
    completed: boolean; 

}

export default async function LearningCardspage() {
    const supabase = await createClient();
    const { data: { user } }  = await supabase.auth.getUser();
    if (!user)  redirect("/auth"); 
    return (
      
       <main className="relative flex min-h-screen items-center justify-center p-6">

            <div className="relative">
               
                <LearningCards />
            </div>
                <Link
                        href="/dashboard"
                        className="fixed bottom-4 left-4 inline-block rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900">
                        Back to the Dashboard
                </Link>
        </main>
        
    );
}
