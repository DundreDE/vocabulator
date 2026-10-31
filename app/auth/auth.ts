"use server";

import { safeNext } from "@/lib/safe-next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

function authUrl(params: Record<string, string>, next: string) {
  const q = new URLSearchParams(params);
  if (next !== "/dashboard") q.set("next", next);
  return `/auth?${q.toString()}`;
}

export async function login(formData: FormData) {
  const next = safeNext(String(formData.get("next")));
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (error) redirect(authUrl({ error: error.message }, next));
  redirect(next);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  const next = safeNext(String(formData.get("next")));
  if (error) redirect(authUrl({ error: error.message }, next));

  if (data.session) redirect(next);

  redirect(
    authUrl({ message: "Registration successful! You can now log in." }, next),
  );
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth");
}
