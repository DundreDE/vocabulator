export type Grade = "good" | "again";

export interface CardState {
  ease: number;
  intervalDays: number;
  repetition: number;
}

export interface ReviewResult extends CardState {
  dueOn: string;
}

export const DEFAULT_CARD_STATE: CardState = {
  ease: 2.5,
  intervalDays: 0,
  repetition: 0,
};

const EASE_MIN = 1.3;
const DAY_MS = 24 * 60 * 60 * 1000;
const TIMEZONE = "Europe/Berlin";

export function dayString(date: Date): string {
  return date.toLocaleDateString("sv-SE", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export function review(
  cardState: CardState,
  grade: Grade,
  now = new Date(),
): ReviewResult {
  let { ease, intervalDays, repetition } = cardState;

  if (grade === "again") {
    repetition = 0;
    intervalDays = 0;
    ease = Math.max(EASE_MIN, ease - 0.2);
  } else {
    repetition += 1;
    if (repetition === 1) {
      intervalDays = 1;
    } else if (repetition === 2) {
      intervalDays = 6;
    } else {
      intervalDays = Math.round(intervalDays * ease);
    }
  }

  const dueDate = new Date(now.getTime() + intervalDays * DAY_MS);
  return {
    ease,
    intervalDays,
    repetition,
    dueOn: dayString(dueDate),
  };
}
