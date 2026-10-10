"use client";

import Link from "next/dist/client/link";

// import { getcards} from "";
import { useState, useEffect, useRef } from "react";



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

function formatMmSs(ms: number): string {
    const total = Math.floor(ms / 1000);
    const mm = String(Math.floor(total / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    return `${mm}:${ss}`;
}


export default function LearningCards() {
    const [index, setIndex] = useState(0);
    const [flipped, setFlipped] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const [elapsedMs, setElapsedMs] = useState(0);
    const startRef = useRef(performance.now());

    const finished = index >= cards.length;

    useEffect(() => {
        const update = () => setElapsedMs(performance.now() - startRef.current);
        
        if (finished) {
            update();
            return;
        }
        
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [finished]);

    const restart = () => {
        startRef.current = performance.now();
        setElapsedMs(0);
        setIndex(0);
        setFlipped(false);
        setCorrectCount(0);
    }

    const next = () => {
        setIndex((i) => i + 1);
        setFlipped(false);
    };
    const answer = (correct: boolean) => {
        if (correct) setCorrectCount((c) => c + 1);
        setIndex((i) => i + 1);
        setFlipped(false);
    };


    if (finished) {
        const timepercard = elapsedMs / cards.length;
        return (
            <div className="flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold">Congratulations! You've completed the deck.</h2>
                <p className="mt-2">You answered {correctCount} out of {cards.length} correctly. In {formatMmSs(elapsedMs)} min. Thats {formatMmSs(timepercard)} min per card.</p>
            <div className="mt-4 gap-4 flex flex-col items-center justify-center">   
                <button
                    onClick={restart}
                    className="rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
                >
                    Restart the cards
                </button>
                <Link
                        href="/dashboard"
                        className="inline-block rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900">
                        Back to the Dashboard
                </Link>
            </div>
            </div>
        );
    }

    const current = cards[index];

    return (
        <div className="flex flex-col items-center justify-center">
             <h1 className="absolute bottom-full mb-2.5 w-full text-center text-2xl font-bold">Learn your deck</h1>
            <div className="flex items-center gap-4">
                <div className="flex h-40 w-64 items-center justify-center rounded border p-4 text-center">
                    <p className="text-4xl font-semibold">
                        {flipped ? current.back : current.front}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-8">
                <button
                    onClick={() => answer(false)}
                    disabled={!flipped}
                    className="mt-4 rounded bg-red-800 px-4 py-2 text-white hover:bg-red-900 disabled:opacity-30 disabled:hover:bg-red-800"
                >
                    Wrong!
                </button>
            
                <button
                    onClick={() => setFlipped((f) => !f)}
                    disabled={finished}
                    className="mt-4 rounded bg-amber-800 px-4 py-2 text-white hover:bg-amber-900 disabled:opacity-30"
                >
                    Flip it!
                </button>

                <button
                    onClick={() => answer(true)}
                    disabled={!flipped}
                    className="mt-4 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-800 disabled:opacity-30 disabled:hover:bg-green-900"
                >
                    Correct!
                </button>
            </div>
                <div className="flex items-center gap-4 mt-4">
                    <p className="text-lg">{formatMmSs(elapsedMs)}</p>
                </div>
        </div>
    );
}