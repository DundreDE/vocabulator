import "server-only";
import { z } from "zod";
import { chat } from "./hackclub-ai";

const DraftDeckSchema = z.object({
  name: z.string().min(1),
  cards: z
    .array(
      z.object({
        en: z.string().min(1),
        de: z.string().min(1),
      }),
    )
    .min(1),
});
export type DraftDeck = z.infer<typeof DraftDeckSchema>;

const PROMPT = `Below is the OCR output of a vocabulary page from a textbook, as Markdown. The vocabulary is usually in a table or in two columns (English / German).
Extract vocabulary pairs from it. Rules:
- Match each English entry with its German translation, preferably row by row from the table.
- Ignore headings, page numbers, and example sentences.
- Do not invent anything. If a pairing is unclear, leave the entry out.
- Keep annotations such as "(to)" or plural forms as part of the entry.
- Copy the text exactly as it appears; do not translate, correct, or reformat it.
Reply ONLY with JSON in this format, without any explanation:
{"name": "<short deck name>", "cards": [{"en": "...", "de": "..."}]}

OCR text:
`;

function extractJson(text: string): unknown {
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error("No JSON found in text");
  return JSON.parse(match[0]);
}

export async function buildDeck(rawText: string): Promise<DraftDeck> {
  let lastError: unknown;
  let lastAnswer = "";
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const answer = await chat(
        process.env.HACKCLUB_AI_MODEL!,
        PROMPT + rawText,
      );
      lastAnswer = answer;
      return DraftDeckSchema.parse(extractJson(answer));
    } catch (e) {
      lastError = e;
    }
  }
  throw new Error(
    `${String(lastError)}\n\nModell-Antwort:\n${lastAnswer.slice(0, 2000)}`,
  );
}
