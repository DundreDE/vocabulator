"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function NewPasswordForm() {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function onSubmit (e: React.FormEvent) {
        e.preventDefault();
        setError("");
        const supabase = createClient();
        const { error } = await supabase.auth.updateUser({ password });
        if (error) return setError(error.message);
        router.push("/");

        
    }
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
                minLength={8}
                required
            />
            <button type="submit" className="bg-amber-800 hove: bg-amber-900 text-white px-4 py-2 rounded">
                Set New Password
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
        </div>
    );
}