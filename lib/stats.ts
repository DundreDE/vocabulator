import { dayString } from "@/lib/srs";
import { createClient } from "@/lib/supabase/server";

const dayKey = (offsetDays = 0) =>
  dayString(new Date(Date.now() + offsetDays * 24 * 60 * 60 * 1000));

export async function getStats() {
  const supabase = await createClient();
  const { data } = await supabase.from("user_stats").select("*").maybeSingle();

  const s = data ?? {
    current_streak: 0,
    longest_streak: 0,
    last_study_date: null,
    total_reviews: 0,
    total_correct: 0,
  };

  const today = dayKey();
  const alive = s.last_study_date === today || s.last_study_date === dayKey(-1);

  return {
    streak: alive ? s.current_streak : 0,
    longest: s.longest_streak,
    studiedToday: s.last_study_date === today,
    total: s.total_reviews,
    accuracy: s.total_correct
      ? Math.round((s.total_correct / s.total_reviews) * 100)
      : 0,
  };
}

export async function getDueForecast() {
  const supabase = await createClient();
  const count = async (build: (q: any) => any) => {
    const { count } = await build(
      supabase

        .from("card_progress")
        .select("card_id", { count: "exact", head: true }),
    );
    return count ?? 0;
  };

  const [today, tomorrow, week] = await Promise.all([
    count((q) => q.lte("due_on", dayKey())),
    count((q) => q.eq("due_on", dayKey(1))),
    count((q) => q.lte("due_on", dayKey(7))),
  ]);

  return { today, tomorrow, week };
}
