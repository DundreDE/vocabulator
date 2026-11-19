import type { Mode } from "@/lib/mode";
import type { QueueItem } from "@/lib/types";
import { motion } from "motion/react";

type CardProps = {
  flipped: boolean;
  current: QueueItem;
  effectiveMode: Mode;
};

export default function Card({ flipped, current, effectiveMode }: CardProps) {
  return (
    <>
      <h1 className="absolute bottom-full mb-2.5 w-full text-center text-2xl font-bold">
        Learn your deck
      </h1>
      <div className="flex items-center gap-4">
        <motion.div
          drag="x"
          dragSnapToOrigin
          className="flex h-40 w-64 cursor-grab touch-pan-y select-none items-center justify-center rounded border p-4 text-center active:cursor-grabbing"
        >
          <p className="text-4xl font-semibold">
            {effectiveMode === "click" && flipped
              ? current.answer
              : current.prompt}
          </p>
        </motion.div>
      </div>
    </>
  );
}
