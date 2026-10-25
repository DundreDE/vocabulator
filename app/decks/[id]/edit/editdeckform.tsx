"use client";

import { useActionState, useRef, useState } from "react";
import { editDeckAction, type EditDeckState } from "./action";

type Row = { key: number; id: string; front: string; back: string };

const initialState: EditDeckState = { error: null };
type Props = {
  deck: {
    id: string;
    name: string;
    cards: { id: string; front: string; back: string }[];
  };
};

export default function EditDeckForm({ deck }: Props) {
  const [state, formAction, pending] = useActionState(
    editDeckAction,
    initialState,
  );

  const [name, setName] = useState(deck.name);
  const nextKey = useRef(deck.cards.length);
  const [rows, setRows] = useState<Row[]>(
    deck.cards.map((c, i) => ({
      key: i,
      id: c.id,
      front: c.front,
      back: c.back,
    })),
  );

  const addRow = () =>
    setRows((r) => [
      ...r,
      { key: nextKey.current++, id: "", front: "", back: "" },
    ]);
  const removeRow = (key: number) =>
    setRows((r) => r.filter((x) => x.key !== key));
  const updateRow = (key: number, field: "front" | "back", value: string) =>
    setRows((r) =>
      r.map((x) => (x.key === key ? { ...x, [field]: value } : x)),
    );

  return (
    <>
      <form action={formAction} className="flex w-full flex-col gap-2">
        <input type="hidden" name="deckId" value={deck.id} />
        <input
          type="text"
          name="deckName"
          placeholder="Deck Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={100}
          className="rounded-md border border-amber-800 p-2"
        />
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Cards</h2>
          {rows.map((row) => (
            <div key={row.key} className="flex gap-2">
              <input type="hidden" name="cardId" value={row.id} />
              <input
                type="text"
                name="front"
                placeholder="Front"
                value={row.front}
                onChange={(e) => updateRow(row.key, "front", e.target.value)}
                className="min-w-0 flex-1 rounded-md border border-amber-800 p-2"
              />
              <input
                type="text"
                name="back"
                placeholder="Back"
                value={row.back}
                onChange={(e) => updateRow(row.key, "back", e.target.value)}
                className="min-w-0 flex-1 rounded-md border border-amber-800 p-2"
              />
              <button
                type="button"
                onClick={() => removeRow(row.key)}
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
    </>
  );
}
