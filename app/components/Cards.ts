'use server';

import { createClient } from "@/lib/supabase/server";

export async function getcards() {
    const supabase = await createClient();
    const { data: { user } }  = await supabase.auth.getUser();
    if (!user)  throw new Error("User not authenticated");
    const { data, error } = await supabase.from("cards").select("*").eq("user_id", user.id);
    if (error) throw error;
    return data;
}