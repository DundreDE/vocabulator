import type { Mode } from "@/lib/mode";
import type { QueueItem } from "@/lib/types";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";
import { useRef } from "react";

type CardProps = {
  flipped: boolean;
  current: QueueItem;
  effectiveMode: Mode;
  onFlip: () => void;
  canSwipe: boolean;
  onSwipe: (direction: "left" | "right") => void;
};

const TAP_MAX_MS = 250;
const FLY_DISTANCE = 500;

export default function Card({
  flipped,
  current,
  effectiveMode,
  onFlip,
  canSwipe,
  onSwipe,
}: CardProps) {
  const SWIPE_OFFSET = 200;
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const greenOpacity = useTransform(x, [0, SWIPE_OFFSET], [0, 0.6]);
  const redOpacity = useTransform(x, [-SWIPE_OFFSET, 0], [0.6, 0]);
  const SWIPE_VELOCITY = 300;
  const MAX_DRAG = 250;
  const tapStart = useRef(0);
  const busy = useRef(false);

  const handleDragEnd = async (_: unknown, info: PanInfo) => {
    if (busy.current) return;
    const swiped =
      Math.abs(info.offset.x) > SWIPE_OFFSET ||
      Math.abs(info.velocity.x) > SWIPE_VELOCITY;
    if (!swiped || !canSwipe) {
      animate(x, 0, { type: "spring", stiffness: 500, damping: 35 });
      return;
    }

    busy.current = true;
    const direction = info.offset.x > 0 ? "right" : "left";
    await animate(x, direction === "right" ? FLY_DISTANCE : -FLY_DISTANCE, {
      duration: 0.2,
    });
    onSwipe(direction);
    x.set(0);
    busy.current = false;
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <motion.div
          drag={canSwipe ? "x" : false}
          style={{ x, rotate }}
          onTapStart={() => {
            tapStart.current = performance.now();
          }}
          onTap={() => {
            const duration = performance.now() - tapStart.current;
            if (duration <= TAP_MAX_MS && effectiveMode === "click") onFlip();
          }}
          onDragEnd={handleDragEnd}
          dragMomentum={false}
          dragElastic={0}
          dragConstraints={{ left: -MAX_DRAG, right: MAX_DRAG }}
          className="relative overflow-hidden flex h-40 w-64 cursor-grab touch-none select-none items-center justify-center rounded border p-4 text-center active:cursor-grabbing"
        >
          <motion.div
            style={{ opacity: greenOpacity }}
            className="pointer-events-none absolute inset-0 bg-green-600"
          />
          <motion.div
            style={{ opacity: redOpacity }}
            className="pointer-events-none absolute inset-0 bg-red-600"
          />
          <p className="relative text-4xl font-semibold">
            {effectiveMode === "click" && flipped
              ? current.answer
              : current.prompt}
          </p>
        </motion.div>
      </div>
    </>
  );
}
