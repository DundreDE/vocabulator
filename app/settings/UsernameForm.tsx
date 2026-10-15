"use client";

import { useActionState } from 'react';
import { updateUsername, type FormState } from './actions';

const initialState: FormState = { status: 'idle', message: '' };

export default function UsernameForm({ username }: { username: string}) {
    const [state, formAction, ispending] = useActionState(updateUsername, initialState);
    const shown = state.username ?? username;

    const color =
        state.status === 'error' ? 'text-red-500'
        : state.status === 'success' ? 'text-green-500'
        : 'text-stone-500';

        return (
            <form action={formAction} className="flex flex-col gap-2">
                <p className="text-lg">Username: </p>
                <input
                    key={shown}
                    className="rounded-lg bg-amber-800 hover:bg-amber-900 px-4 py-2 text-white"
                    defaultValue={shown}
                    name="username"
                    type="text"
                    max-length="50"    
                /> 
                <button
                    type="submit"
                    disabled={ispending}
                    className="rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900 disabled:opacity-50"
                >
                {ispending ? 'Saving...' : 'Save'}
                </button>
                {state.message && (
                    <p role="status" className={color}>{state.message}</p>
                )}

            </form>

        );
}
