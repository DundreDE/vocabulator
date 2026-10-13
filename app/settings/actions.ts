'use server'

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUsername(formData: FormData) {
    const username = String(formData.get('username') ?? '');
    if (username.length > 50) return
    
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const current = (user.user_metadata?.username as string | undefined) ?? ''
    if  (username == current) return

    const { error } = await supabase.auth.updateUser({ data: { username } })
    if (error) return { status: 'error', message: error.message, username }
 
    revalidatePath('/', 'layout')
}