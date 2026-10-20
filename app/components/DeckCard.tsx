import DeckCardActionDeleteDeck from "@/app/components/DeckCardaction";
import { DeckWithCount } from "@/lib/types";
import Link from "next/link";

function deleteButton({ label, visible }: { label: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <button className="rounded bg-amber-800 hover:bg-amber:900 px-4 py-2 text-red-800">
      Delete
    </button>
  );
}

export default function DeckCard({
  deck,
  editMode,
}: {
  deck: DeckWithCount;
  editMode: boolean;
}) {
  return (
    <div className="block rounded-xl border flex flex-col gap-2 p-4 shadow-sm transition hover:shadow-md">
      <h2 className="mb-4 text-2xl font-bold">{deck.name}</h2>
      <p className="mb-4 text-lg">Cards: {deck.card_count}</p>
      <Link href={`/decks/${deck.id}`}>
        <button className="rounded bg-amber-800 hover:bg-amber:900 px-4 py-2 text-white">
          Learn
        </button>
      </Link>
      {editMode && (
        <button
          onClick={async () => {
            if (confirm(`Delete deck and all cards in ${deck.name}?`))
              DeckCardActionDeleteDeck(deck.id);
          }}
          className="rounded  bg-red-600 hover:bg-amber:900 px-4 py-2 text-white"
        >
          Delete
        </button>
      )}
    </div>
  );
}
