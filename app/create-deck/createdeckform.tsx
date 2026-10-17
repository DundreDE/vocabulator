"use client";

import { useActionState } from "react";
import { createDeckAction, type CreateDeckState } from "./action";

const initialState: CreateDeckState = { error: null, name: "" };

export default function CreateDeckForm() {
    const [state, formAction, pending] = useActionState(createDeckAction, initialState);

    return (
        <form action={formAction} className="flex w-full flex-col gap-2">
            <input 
                type="text"
                name="name"
                placeholder="Deck Name"
                defaultValue={state.name}
                required
                maxLength={100}
                className="rounded-md border border-amber-800 p-2"
            />
            {state.error && (
                <p role="alert" className="text-sm text-red-400">
                    {state.error}
                </p>
            )}
            <button
                type="submit"
                disabled={pending}
                className="rounded-md bg-amber-800 px-4 py-2 text-white hover:bg-amber-900 disabled:opacity-50"
            >
                {pending ? "Creating..." : "Create Deck"}
            </button>
        </form>
    );
}