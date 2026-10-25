import "server-only";

const BASE = process.env.HACKCLUB_AI_URL ?? "https://ai.hackclub.com/proxy/v1";

export async function chat(model: string, content: unknown): Promise<string> {
  const res = await fetch(`${BASE}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HACKCLUB_AI_KEY}`,
    },
    body: JSON.stringify({ model, messages: [{ role: "user", content }] }),
  });
  if (!res.ok)
    throw new Error(`Hack Club Ai ${res.status}: ${await res.text()}`);
  const json = await res.json();
  return json.choices[0].message.content as string;
}
