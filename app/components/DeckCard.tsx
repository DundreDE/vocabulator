import Link from "next/link";
import { DeckWithCount } from "@/lib/types";

export default function DeckCard({ deck }: { deck: DeckWithCount }) {
    return (
        <Link 
        href={`/dashboard/decks/${deck.id}`}
        className="block rounded-xl border p-4 shadow-sm transition hover:shadow-md">
            <div className="">
                
            </div>
        </Link>    

    )
}