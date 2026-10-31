export type Deck = {
  id: string;
  user_id: string;
  name: string;
  created_at: string | null;
};

export type Card = {
  id: string;
  deck_id: string;
  front: string;
  back: string;
  learned: boolean;
  next_review: string | null;
  interval: number;
  created_at: string;
};

export type QueueItem = {
  cardId: string;
  direction: "front-back" | "back-front";
  prompt: string;
  answer: string;
};

export type DeckWithCards = Deck & { cards: Card[] };
export type NewCard = Pick<Card, "deck_id" | "front" | "back">;
export type NewDeck = Pick<Deck, "name">;
export type CardUpdate = Partial<
  Pick<Card, "front" | "back" | "learned" | "next_review" | "interval">
>;
export type DeckWithCount = Deck & { card_count: number };
