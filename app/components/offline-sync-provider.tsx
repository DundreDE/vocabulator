"use client";

import { flushQueue, type QueuedReview } from "@/lib/offline";
import { DEFAULT_CARD_STATE, review, type CardState } from "@/lib/srs";
import { createClient } from "@/lib/supabase/client";
import { useEffect } from "react";

async function sendReviewToSupabase(r: QueuedReview) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not logged in.");

  const { data: current, error: readError } = await supabase
    .from("card_progress")
    .select("ease, interval_days, repetition, last_reviewed_at")
    .eq("card_id", r.cardId)
    .maybeSingle();
  if (readError) throw readError;

  if (
    current?.last_reviewed_at &&
    new Date(current.last_reviewed_at).getTime() >= r.at
  ) {
    return;
  }

  const state: CardState = current
    ? {
        ease: current.ease,
        intervalDays: current.interval_days,
        repetition: current.repetition,
      }
    : DEFAULT_CARD_STATE;

  const next = review(state, r.grade, new Date(r.at));

  const { error } = await supabase.from("card_progress").upsert(
    {
      user_id: user.id,
      card_id: r.cardId,
      ease: next.ease,
      interval_days: next.intervalDays,
      repetition: next.repetition,
      due_on: next.dueOn,
      last_reviewed_at: new Date(r.at).toISOString(),
    },
    { onConflict: "user_id,card_id" },
  );
  if (error) throw error;
}

export function OfflineSyncProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const run = () => {
      if (navigator.onLine && document.visibilityState === "visible") {
        flushQueue(sendReviewToSupabase);
      }
    };
    window.addEventListener("online", run);
    document.addEventListener("visibilitychange", run);
    run();
    return () => {
      window.removeEventListener("online", run);
      document.removeEventListener("visibilitychange", run);
    };
  }, []);

  return <>{children}</>;
}
