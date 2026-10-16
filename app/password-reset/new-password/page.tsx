import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import NewPasswordForm from "@/app/password-reset/new-password/NewPasswordForm";

export default async function NewPasswordPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect("/password-reset?error=no_session")
    return <NewPasswordForm></NewPasswordForm>

}