import { del, get, set } from "idb-keyval";
import type { Grade } from "@/lib/srs";

type QueuedReview = { id: string; cardId: string; rating: number; at: number };

export async function cacheDueCards(userId: string, cards: unknown[]) {
  await set(`due-cards:${userId}`, cards);
}

export async function queueReview(r: Omit<QueuedReview, "id" | "at">) {
  const q: QueuedReview[] = (await get("review-queue")) ?? [];
  q.push({ ...r, id: crypto.randomUUID(), at: Date.now() });
  await set("review-queue", q);
}

export async function flushQueue(send: (r: QueuedReview) => Promise<void>) {
  const q: QueuedReview[] = (await get("review-queue")) ?? [];
  const failed: QueuedReview[] = [];
  for (const r of q) {
    try {
      await send(r);
    } catch {
      failed.push(r);
    }
  }
  await set("review-queue", failed);
}

export async function clearOfflineData(userId: string) {
  await del(`due-cards:${userId}`);
  await del("review-queue");
}
