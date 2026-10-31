export const DIRECTIONS = ["front-back", "back-front", "both"] as const;

export type Direction = (typeof DIRECTIONS)[number];

export function parseDirection(v: string | string[] | undefined): Direction {
  const s = Array.isArray(v) ? v[0] : v;
  return DIRECTIONS.includes(s as Direction) ? (s as Direction) : "front-back";
}
