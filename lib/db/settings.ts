import { createClient } from "@/lib/supabase/server";

export const DEFAULT_SETTINGS = { maxNewCardsPerSession: 10 };

export async function getSettings(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("settings")
    .select("max_new_cards_per_session")
    .eq("user_id", userId)
    .maybeSingle();
  if (error) throw new Error(error.message);

  return {
    maxNewCardsPerSession:
      data?.max_new_cards_per_session ?? DEFAULT_SETTINGS.maxNewCardsPerSession,
  };
}
