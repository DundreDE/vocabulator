'use server';

import { createClient } from "@/lib/supabase/server";

export type FormState = {
    status: 'success' | 'error' | "idle" | "info"
    message: string;
    username?: string;
}
export async function sendPasswordResetEmail(
    _prev: FormState,
    formData: FormData
): Promise<FormState> {
    const email = String(formData.get('formEmail') ?? '').trim();
    if (!email) 
        { return { status: 'error', message: 'Email is required!' };
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/password-reset/update`,
    });
    if (error) throw error;

    return { status: 'success', message: 'Password reset email sent!' };
}