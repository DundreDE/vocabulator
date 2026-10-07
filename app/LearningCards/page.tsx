"use client";
import Link from "next/dist/client/link";
import LearningCards from "../components/LearningCards";
import Navbar from "../components/navbar";

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

export default function LearningCardspage() {
    return (
      
       <main className="relative flex min-h-screen items-center justify-center p-6">
            <div className="relative">
                <h1 className="absolute bottom-full mb-[10px] w-full text-center text-2xl font-bold">
                    Learn your deck
                </h1>
                <LearningCards />
            </div>
                <Link
                        href="/dashboard"
                        className="fixed bottom-4 left-4 inline-block rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                        Back to the Dashboard
                </Link>
        </main>
        
    );
}
