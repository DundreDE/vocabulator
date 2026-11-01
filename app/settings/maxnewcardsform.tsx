"use client";

import { useActionState } from "react";
import { updateMaxNewCardsPerSession, type FormState } from "./actions";

const initialState: FormState = { status: "idle", message: "" };

export default function MaxNewCardsForm({ initial }: { initial: number }) {
  const [state, formAction, pending] = useActionState(
    updateMaxNewCardsPerSession,
    initialState,
  );

  return (
    <form action={formAction} className="flex flex-col gap-4 items-start">
      <p className="text-lg">Max new cards per session:</p>
      <input
        type="number"
        name="maxNewCardsPerSession"
        min={1}
        max={100}
        defaultValue={state.value ?? initial}
        className="rounded-lg bg-amber-800 px-4 py-2 text-white"
      />
      <button
        type="submit"
        disabled={pending}
        className="rounded-lg bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
      >
        Save
      </button>
      {state.message && (
        <p
          className={
            state.status === "success"
              ? "text-green-500"
              : state.status === "error"
                ? "text-red-500"
                : state.status === "info"
                  ? "text-yellow-500"
                  : ""
          }
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
