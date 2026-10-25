import "server-only";

const BASE = process.env.HACKCLUB_AI_URL ?? "https://ai.hackclub.com/proxy/v1";

type OcrResponse = { pages: { index: number; markdown: string }[] };

export async function ocrImage(imageUrl: string): Promise<string> {
  const res = await fetch(`${BASE}/ocr`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HACKCLUB_AI_KEY}`,
    },
    body: JSON.stringify({
      model: "mistral-ocr-latest",
      document: { type: "image_url", image_url: imageUrl },
    }),
  });
  if (!res.ok) throw new Error(`OCR ${res.status}: ${await res.text()}`);

  const json = (await res.json()) as OcrResponse;
  const text = json.pages.map((p) => p.markdown).join("\n\n");
  if (!text.trim()) throw new Error("OCR returned no text");
  return text;
}
