"use server";

import {
  DEFAULT_CARD_STATE,
  review,
  type CardState,
  type Grade,
} from "@/lib/srs";
import { createClient } from "@/lib/supabase/server";

type Dir = "front-back" | "back-front";

function isCorrect(grade: Grade) {
  return grade !== "again";
}

export async function gradeCard(cardId: string, grade: Grade, direction: Dir) {
  if (direction !== "front-back" && direction !== "back-front") {
    throw new Error(`Invalid direction: ${direction}`);
  }
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("User not authenticated");

  const { data: row, error: loadError } = await supabase
    .from("card_progress")
    .select("ease, interval_days, repetition")
    .eq("card_id", cardId)
    .eq("user_id", user.id)
    .eq("direction", direction)
    .maybeSingle();
  if (loadError) throw loadError;

  const state: CardState = row
    ? {
        ease: row.ease,
        intervalDays: row.interval_days,
        repetition: row.repetition,
      }
    : DEFAULT_CARD_STATE;

  const result = review(state, grade);

  const { error: saveError } = await supabase.from("card_progress").upsert(
    {
      user_id: user.id,
      card_id: cardId,
      direction,
      ease: result.ease,
      interval_days: result.intervalDays,
      repetition: result.repetition,
      due_on: result.dueOn,
      last_reviewed_at: new Date().toISOString(),
    },
    { onConflict: "user_id,card_id,direction" },
  );
  if (saveError) throw saveError;

  const { error: statsError } = await supabase.rpc("record_review", {
    p_card_id: cardId,
    p_direction: direction,
    p_correct: isCorrect(grade),
  });
  if (statsError) console.error("Failed to update stats:", statsError.message);
}
