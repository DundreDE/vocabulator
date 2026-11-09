"use client";

import SegmentedControl from "@/app/components/SegmentedControl";
import type { Direction } from "@/lib/direction";
import type { Mode } from "@/lib/mode";
import Link from "next/link";
import { useState } from "react";

const directionOptions: { value: Direction; label: string }[] = [
  { value: "front-back", label: "Front to Back" },
  { value: "back-front", label: "Back to Front" },
  { value: "both", label: "Both" },
];

const modeOptions: { value: Mode; label: string }[] = [
  { value: "click", label: "Flip cards" },
  { value: "type", label: "Type answer" },
];

export default function StartLearning({ deckId }: { deckId: string }) {
  const [direction, setDirection] = useState<Direction>("front-back");
  const [mode, setMode] = useState<Mode>("click");

  return (
    <div className="flex flex-col items-center text-center gap-3">
      <SegmentedControl
        options={directionOptions}
        value={direction}
        onChange={setDirection}
      />
      <SegmentedControl options={modeOptions} value={mode} onChange={setMode} />

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
