"use client";

import Link from "next/dist/client/link";

// import { getcards} from "";
import { useState, useEffect } from "react";

interface card { 
    id: number;
    front: string;
    back: string;
    learned: boolean;

}

interface deck {

    name: string;
    cards: card[];
    completed: boolean; 

}

export const cards: card[] = [
    { id: 1, front: "Hello", back: "Hallo", learned: false },
    { id: 2, front: "Goodbye", back: "Auf Wiedersehen", learned: false },
    { id: 3, front: "Thank you", back: "Danke", learned: false },
    { id: 4, front: "Please", back: "Bitte", learned: false },
    { id: 5, front: "Yes", back: "Ja", learned: false },
    { id: 6, front: "No", back: "Nein", learned: false },
]

export default function LearningCards() {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);

    const finished = index >= cards.length;

    const next = () => {
        setIndex((i) => i + 1);
        setFlipped(false);
    };
    const answer = (correct: boolean) => {
        if (correct) setCorrectCount((c) => c + 1);
        setIndex((i) => i + 1);
        setFlipped(false);
    };

    const restart = () => {
        setIndex(0);
        setFlipped(false);
        setCorrectCount(0);
    }

    if (finished) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">Congratulations! You've completed the deck.</h2>
                <p className="mt-2">You answered {correctCount} out of {cards.length} correctly.</p>
            <div className="mt-4 gap-2 flex flex-col items-center justify-center">   
                <button
                    onClick={restart}
                    className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                >
                    Restart
                </button>
                <Link
                        href="/dashboard"
                        className="inline-block rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">
                        Back to the Dashboard
                </Link>
            </div>
            </div>
        );
    }

    const current = cards[index];

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex items-center gap-4">
                <div className="flex h-40 w-64 items-center justify-center rounded border p-4 text-center">
                    <p className="text-4xl font-semibold">
                        {flipped ? current.back : current.front}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <button
                    onClick={() => answer(false)}
                    disabled={!flipped}
                    className="mt-4 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600 disabled:opacity-30 disabled:hover:bg-red-500"
                >
                    Wrong!
                </button>
            
                <button
                    onClick={() => setFlipped((f) => !f)}
                    disabled={finished}
                    className="mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600 disabled:opacity-30"
                >
                    Flip it!
                </button>

                <button
                    onClick={() => answer(true)}
                    disabled={!flipped}
                    className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:opacity-30 disabled:hover:bg-green-500"
                >
                    Correct!
                </button>
            </div>
        </div>
    );
}