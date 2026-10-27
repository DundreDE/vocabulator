"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FormState = {
  status: "success" | "error" | "idle" | "info";
  message: string;
  username?: string;
};

export async function updateUsername(
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const username = String(formData.get("username") ?? "");
  if (username.length > 50)
    return { status: "error", message: "Username is too long!", username };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "User not found", username };

  const current = (user.user_metadata?.username as string | undefined) ?? "";
  if (username == current)
    return { status: "info", message: "Nothing changed!", username };

  const { error } = await supabase.auth.updateUser({ data: { username } });
  if (error) return { status: "error", message: error.message, username };

  revalidatePath("/", "layout");
  return {
    status: "success",
    message: "Username updated successfully!",
    username,
  };
}

export async function updateMaxNewCardsPerSession(
  formData: FormData,
  maxNewCardsPerSession: number,
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  if (
    !Number.isInteger(maxNewCardsPerSession) ||
    maxNewCardsPerSession < 1 ||
    maxNewCardsPerSession > 100
  ) {
    throw new Error("Value muste be a whole number between 1 and 100");
  }

  const { error } = await supabase.from("settings").upsert({
    user_id: user.id,
    max_new_cards_per_session: maxNewCardsPerSession,
  });
  if (error) throw new Error(error.message);
}
