export type Mode = "click" | "type";

export const MODES: Mode[] = ["click", "type"];

export function parseMode(value: unknown): Mode {
  return MODES.includes(value as Mode) ? (value as Mode) : "click";
}
