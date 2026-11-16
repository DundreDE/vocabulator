import type { Grade } from "@/lib/srs";
import { del, get, set, update } from "idb-keyval";

type QueuedReview = { id: string; cardId: string; grade: Grade; at: number };

export async function cacheDueCards(userId: string, cards: unknown[]) {
  await set(`due-cards:${userId}`, cards);
}

export async function queueReview(r: Omit<QueuedReview, "id" | "at">) {
  const item: QueuedReview = { ...r, id: crypto.randomUUID(), at: Date.now() };
  await update<QueuedReview[]>("review-queue", (q) => [...(q ?? []), item]);
}

let flushing = false;

export async function flushQueue(send: (r: QueuedReview) => Promise<void>) {
  if (flushing) return;
  flushing = true;
  try {
    const q = (await get<QueuedReview[]>("review-queue")) ?? [];
    const sent = new Set<string>();

    for (const r of q) {
      try {
        await send(r);
        sent.add(r.id);
      } catch {
        break;
      }
    }

    await update<QueuedReview[]>("review-queue", (cur) =>
      (cur ?? []).filter((r) => !sent.has(r.id)),
    );
  } finally {
    flushing = false;
  }
}

export async function clearOfflineData(userId: string) {
  await del(`due-cards:${userId}`);
  await del("review-queue");
}
