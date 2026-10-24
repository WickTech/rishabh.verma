import type { Chunk } from "./corpus";

const STOP = new Set(
  "a an and are as at be by can did do does for from has have how i in is it its me my of on or the to was what when where which who why with you your about tell".split(
    " ",
  ),
);

export function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .split(/[^a-z0-9+#.]+/)
    .map((t) => t.replace(/^[.]+|[.]+$/g, ""))
    .filter((t) => t.length > 1 && !STOP.has(t));
}

/**
 * Small BM25 scorer: the corpus is ~20 chunks, so no vector store is needed.
 * Always-on chunks are returned first, then the top-scoring others.
 */
export function retrieve(
  chunks: Chunk[],
  query: string,
  k = 4,
  maxChars = 7000,
): Chunk[] {
  const q = tokenize(query);
  const docs = chunks.map((c) => tokenize(`${c.title} ${c.title} ${c.text}`));
  const N = docs.length;
  const avg = docs.reduce((n, d) => n + d.length, 0) / Math.max(N, 1);
  const df = new Map<string, number>();
  for (const d of docs) for (const t of new Set(d)) df.set(t, (df.get(t) ?? 0) + 1);

  const k1 = 1.4;
  const b = 0.75;
  const scored = chunks.map((c, i) => {
    const d = docs[i]!;
    const tf = new Map<string, number>();
    for (const t of d) tf.set(t, (tf.get(t) ?? 0) + 1);
    let score = 0;
    for (const t of q) {
      const f = tf.get(t);
      if (!f) continue;
      const n = df.get(t) ?? 0;
      const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5));
      score += (idf * f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.length) / avg));
    }
    return { c, score };
  });

  const always = chunks.filter((c) => c.always);
  const rest = scored
    .filter((s) => !s.c.always && s.score > 0)
    .sort((a, b2) => b2.score - a.score)
    .slice(0, k)
    .map((s) => s.c);

  const out: Chunk[] = [];
  let used = 0;
  for (const c of [...always, ...rest]) {
    if (used + c.text.length > maxChars && out.length > 0) break;
    out.push(c);
    used += c.text.length;
  }
  return out;
}
