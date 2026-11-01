"use client";

import type { Direction } from "@/lib/direction";
import Link from "next/link";
import { useState } from "react";

const options: { value: Direction; label: string }[] = [
  { value: "front-back", label: "Front to Back" },
  { value: "back-front", label: "Back to Front" },
  { value: "both", label: "Both" },
];

export default function StartLearning({ deckId }: { deckId: string }) {
  const [direction, setDirection] = useState<Direction>("front-back");

  return (
    <div className="flex flex-col text-center gap-3">
      <div
        role="radiogroup"
        className="inline-flex gap-1 rounded-lg border p-1"
      >
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            role="radio"
            aria-checked={direction === o.value}
            onClick={() => setDirection(o.value)}
            className={`rounded-md px-3 py-1.5 text-sm transition ${direction === o.value ? "bg-amber-800 text-white" : "hover:bg-gray-100 dark:hover:bg-amber-900"}`}
          >
            {o.label}
          </button>
        ))}
      </div>
      <Link
        href={`/decks/${deckId}/learn?direction=${direction}`}
        className="rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
      >
        Start Learning
      </Link>
      <Link
        href={`/dashboard`}
        className="rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
      >
        Back to the Dashboard
      </Link>
    </div>
  );
}
