"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { type FormState, sendPasswordResetEmail } from "./action";

const initialState: FormState = { status: 'idle', message: '' };

export default function PasswordResetPage() {
    const router = useRouter();
    const [state, formAction, ispending] = useActionState(sendPasswordResetEmail, initialState);


    const color =
        state.status === 'error' ? 'text-red-500'
        : state.status === 'success' ? 'text-green-500'
        : 'text-stone-500';

    useEffect(() => {
        if (state.status !== 'success') return;
        
        const timer = setTimeout(() => {
            router.push('/auth');
        }, 3000);

        return () => clearTimeout(timer);
    }, [state, router]);


    return (
        <>
            <main> 
                <div className="mt-4 min-h-screen flex flex-col items-center justify-center gap-4">
                    <h1 className="text-2xl font-bold">Password Reset</h1>
                    <p className="text-center text-lg"> Please enter your email to receive a password reset link.</p>
                    <div className="flex flex-col gap-2 bg-stone-800 p-4 rounded-lg">
                        <form action={formAction} className="mx-auto flex max-w-sm flex-col gap-3 p-8">
                            <input name="formEmail" type="email" required placeholder="Email"/> 
                        <button
                                type="submit"
                                disabled={ispending}
                                className="rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900 disabled:opacity-50"
                            >
                            {ispending ? 'Resetting...' : 'Reset'} 
                            </button>
                            {state.message && (
                                <p role="status" className={color}s>{state.message}</p>
                            )} 
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
} 