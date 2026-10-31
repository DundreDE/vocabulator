export function shuffle<T>(items: T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function separateSiblings<T extends { cardId: string }>(
  items: T[] = [],
  gap = 4,
): T[] {
  const rest = [...items];
  const result: T[] = [];
  while (rest.length > 0) {
    const recent = new Set(result.slice(-gap).map((r) => r.cardId));
    const idx = rest.findIndex((r) => !recent.has(r.cardId));
    result.push(...rest.splice(idx === -1 ? 0 : idx, 1));
  }
  return result;
}
