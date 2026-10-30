import { dayString } from "@/lib/srs";
import { createClient } from "@/lib/supabase/client";

export async function recordReview(correct: boolean) {
  const supabase = createClient();
  const { error } = await supabase.rpc("record_review", { p_correct: correct });
  if (error) console.error("Error recording review:", error);
}

export type UserStats = {
  current_streak: number;
  longest_streak: number;
  last_study_date: string | null;
  total_reviews: number;
  total_correct: number;
};

const dayKey = (offsetDays = 0) =>
  dayString(new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000));
export async function getStats() {
  const supabase = createClient();
  const { data } = await supabase
    .from("user_stats")
    .select("*")
    .maybeSingle<UserStats>();
  const s = data ?? {
    current_streak: 0,
    longest_streak: 0,
    last_study_date: null,
    total_reviews: 0,
    total_correct: 0,
  };

  const today = dayKey(new Date());
  const yesterday = dayKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
  const alive = s.last_study_date === today || s.last_study_date === yesterday;

  return {
    streak: alive ? s.current_streak : 0,
    longest: s.longest_streak,
    studiedToday: s.last_study_date === today,
    total: s.total_reviews,
    accuracy: s.total_reviews
      ? Math.round((s.total_correct / s.total_reviews) * 100)
      : 0,
  };
}

export async function getDueForecast() {
  const supabase = createClient();
  const dayStart = (offset: number) => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return d.toISOString();
  };
  const count = async (until: string) => {
    const { count } = await supabase
      .from("cards")
      .select("id", { count: "exact", head: true })
      .lt("due_at", until);
    return count ?? 0;
  };
  const [today, tomorrow, week] = await Promise.all([
    count(dayStart(1)),
    count(dayStart(2)),
    count(dayStart(8)),
  ]);
  return { today, tomorrow, week };
}
