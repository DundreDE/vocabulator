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
    <>
      <Link
        href={`/decks/${deck.id}`}
        className="block rounded-xl border p-4 shadow-sm transition hover:shadow-md"
      >
        <h2 className="mb-4 text-2xl font-bold">{deck.name}</h2>
        <p className="mb-4 text-lg">Cards: {deck.card_count}</p>
      </Link>
      {editMode && (
        <button
          onClick={async () => {
            if (confirm(`Delete deck and all cards in ${deck.name}?`))
              DeckCardActionDeleteDeck(deck.id);
          }}
          className="rounded  bg-amber-800 hover:bg-amber:900 px-4 py-2 text-red-800"
        >
          Delete
        </button>
      )}
    </>
  );
}
