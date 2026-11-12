export type Verdict = "correct" | "typo" | "wrong";

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFC")
    .replace(/\(.*?\)/g, "")
    .replace(/^(to|the|a|an|der|die|das|ein|eine)\s+/i, "")
    .replace(/[.,!?;:"']/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function levenshtein(a: string, b: string): number {
  const dp: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
  }
  return dp[a.length][b.length];
}

export function checkAnswer(input: string, solution: string): Verdict {
  const candidates = solution.split(/[;,/]/).map(normalize).filter(Boolean);

  const guess = normalize(input);
  if (!guess || candidates.length === 0) return "wrong";

  let best = Infinity;
  for (const c of candidates) {
    const d = levenshtein(guess, c);
    if (d === 0) return "correct";
    if (d < best) best = d;
  }

  const ref = Math.min(...candidates.map((c) => c.length));
  const allowed = ref <= 4 ? 0 : ref <= 8 ? 1 : 2;
  return best <= allowed ? "typo" : "wrong";
}
