import Link from "next/link";
import { DeckWithCount } from "@/lib/types";

export default function DeckCard({ deck }: { deck: DeckWithCount }) {
    return (
        <Link 
        href={`/decks/${deck.id}`}
        className="block rounded-xl border p-4 shadow-sm transition hover:shadow-md">
           
                <h2 className="mb-4 text-2xl font-bold">{deck.name}</h2>
                <p className="mb-4 text-lg">Cards: {deck.card_count}</p>
                {/* <p className="mb-4 text-lg">Created At: {deck.created_at}</p> */}
            
        </Link>

    )
}