"use client";
import LearningCards from "../components/LearningCards";

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
        </main>
    );
}
    
