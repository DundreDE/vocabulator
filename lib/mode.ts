export type Mode = "click" | "type" | "choice";

export const MODES: Mode[] = ["click", "type", "choice"];

export function parseMode(value: unknown): Mode {
  return MODES.includes(value as Mode) ? (value as Mode) : "click";
}
