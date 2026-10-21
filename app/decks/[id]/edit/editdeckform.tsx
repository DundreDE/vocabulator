"use client";

import { useActionState, useState, useRef } from "react";
import { editDeckAction, type EditDeckState } from "./action";

export default function EditDeckForm() {
  return (
    <form action={formAction} className="flex w-full flex-col gap-2">
      <input
        type="text"
        name="deckName"
        placeholder="Deck Name"
        defaultValue={state.name}
        required
        maxLength={100}
        className="rounded-md border border-amber-800 p-2"
      />
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Cards</h2>
        {rowIds.map((id) => (
          <div key={id} className="flex gap-2">
            <input
              type="text"
              name="front"
              placeholder="Front"
              defaultValue={state.cards[id]?.front ?? ""}
              className="min-w-0 flex-1 rounded-md border border-amber-800 p-2"
            />
            <input
              type="text"
              name="back"
              placeholder="Back"
              defaultValue={state.cards[id]?.back ?? ""}
              className="min-w-0 flex-1 rounded-md border border-amber-800 p-2"
            />
            <button
              type="button"
              onClick={() => removeRow(id)}
              className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addRow}
          className="rounded-md bg-amber-800 px-4 py-2 text-white hover:bg-amber-900"
        >
          Add Card
        </button>
      </div>

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
        {pending ? "Updating..." : "Update Deck"}
      </button>
    </form>
  );
}
