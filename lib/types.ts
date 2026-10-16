export type Deck = {
    id: string;
    user_id: string;
    name: string;
    created_at: string;
}

export type Card = {
    id: string;
    deck_id: string;
    front: string;
    back: string;
    learned: boolean;
    next_review: string;
    interval: number;
    created_at: string;
}