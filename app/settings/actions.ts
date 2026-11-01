"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type FormState = {
  status: "success" | "error" | "idle" | "info";
  message: string;
  username?: string;
  value?: number;
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
  _prev: FormState,
  formData: FormData,
): Promise<FormState> {
  const value = Number(formData.get("maxNewCardsPerSession"));

  if (!Number.isInteger(value) || value < 1 || value > 100) {
    return {
      status: "error",
      message: "Value must be a whole number between 1 and 100",
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "error", message: "User not authenticated" };

  const { error } = await supabase.from("settings").upsert({
    user_id: user.id,
    max_new_cards_per_session: value,
  });
  if (error) return { status: "error", message: error.message };

  revalidatePath("/settings");

  return {
    status: "success",
    message: "Max new cards per session updated successfully!",
    value,
  };
}
