"use client";

import type { Grade } from "@/lib/srs";
import type { Card } from "@/lib/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gradeCard } from "../decks/[id]/action";

// interface card {
//   id: number;
//   front: string;
//   back: string;
//   learned: boolean;
// }

// interface deck {
//   name: string;
//   cards: card[];
//   completed: boolean;
// }

function formatMmSs(ms: number): string {
  const total = Math.floor(ms / 1000);
  const mm = String(Math.floor(total / 60)).padStart(2, "0");
  const ss = String(total % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

export default function LearningCards({
  deckName,
  cards,
}: {
  deckName: string;
  cards: Card[];
}) {
  const [queue, setQueue] = useState<Card[]>(cards);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [saveError, setSaveError] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const startRef = useRef(performance.now());

  const total = cards.length;
  const finished = queue.length === 0;
  const current = queue[0];

  useEffect(() => {
    const update = () => setElapsedMs(performance.now() - startRef.current);

    if (finished) {
      update();
      return;
    }

    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, [finished]);

  const answer = (grade: Grade) => {
    gradeCard(current.id, grade).catch(() => setSaveError(true));

    setQueue((q) => {
      const [first, ...rest] = q;
      if (grade === "good") return rest;
      const pos = Math.min(3, rest.length);
      return [...rest.slice(0, pos), first, ...rest.slice(pos)];
    });

    if (grade === "again") {
      setFailedIds((s) => new Set(s).add(current.id));
    }
    setFlipped(false);
  };

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">Nothing to learn right now.</h2>
        <p className="mt-2">No cards are due. Come back later.</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-block rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
        >
          Back to the Dashboard
        </Link>
      </div>
    );
  }

  if (finished) {
    const correctFirstTry = total - failedIds.size;
    const timepercard = elapsedMs / cards.length;
    return (
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">
          Congratulations! You completed the deck.
        </h2>
        <p className="mt-2">
          You answered {correctFirstTry} out of {total} correctly. In{" "}
          {formatMmSs(elapsedMs)} min. Thats {formatMmSs(timepercard)} min per
          card.
        </p>
        {saveError && (
          <p className="mt-2 text-red-600">
            There was an error saving your progress. Please try again.
          </p>
        )}
        <div className="mt-4 gap-4 flex flex-col items-center justify-center">
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
          >
            Back to the Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="absolute bottom-full mb-2.5 w-full text-center text-2xl font-bold">
        Learn your deck
      </h1>
      <div className="flex items-center gap-4">
        <div className="flex h-40 w-64 items-center justify-center rounded border p-4 text-center">
          <p className="text-4xl font-semibold">
            {flipped ? current.back : current.front}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-8">
        <button
          onClick={() => answer("again")}
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
          onClick={() => answer("good")}
          disabled={!flipped}
          className="mt-4 rounded bg-green-800 px-4 py-2 text-white hover:bg-green-900 disabled:opacity-30 disabled:hover:bg-green-900"
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
