import { profile } from "@/data/profile";
import { buildCorpus } from "@/lib/ask/corpus";
import {
  Limiter,
  looksLikeInjection,
  originAllowed,
  parseMessages,
} from "@/lib/ask/guard";
import { REFUSAL_OFF_TOPIC, buildSystemPrompt } from "@/lib/ask/prompt";
import { retrieve } from "@/lib/ask/retrieve";

export const runtime = "nodejs";
export const maxDuration = 30;

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const corpus = buildCorpus();
const limiter = new Limiter(
  8,
  40,
  Number(process.env.ASK_DAILY_CAP) || 800,
);

const text = (body: string, status = 200) =>
  new Response(body, {
    status,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
const json = (body: unknown, status: number) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(req: Request) {
  const key = process.env.GROQ_API_KEY;
  if (!key) return json({ fallback: true, error: "Assistant is not configured." }, 503);

  // Test-only escape hatch (never honored in production builds).
  const relaxed =
    process.env.NODE_ENV !== "production" && process.env.ASK_RELAXED === "1";

  if (!relaxed) {
    const hosts = [
      new URL(profile.url).hostname,
      process.env.VERCEL_URL ?? "",
      process.env.VERCEL_BRANCH_URL ?? "",
    ];
    if (
      !originAllowed(
        { origin: req.headers.get("origin"), referer: req.headers.get("referer") },
        hosts,
      )
    ) {
      return json({ error: "Forbidden" }, 403);
    }
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }
  const parsed = parseMessages(body);
  if (!parsed.ok) return json({ error: parsed.error }, parsed.status);
  const { messages } = parsed;
  const question = messages[messages.length - 1]!.content;

  // Obvious prompt-injection phrasing never reaches the model.
  if (looksLikeInjection(question)) return text(REFUSAL_OFF_TOPIC);

  if (!relaxed) {
    const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]!.trim();
    const verdict = limiter.check(ip);
    if (verdict !== "ok") {
      return json(
        {
          error:
            verdict === "global"
              ? "The assistant has reached its daily limit. Please email me instead."
              : "You're asking too fast. Try again in a minute.",
        },
        429,
      );
    }
  }

  const query = messages
    .filter((m) => m.role === "user")
    .slice(-2)
    .map((m) => m.content)
    .join(" ");
  const system = buildSystemPrompt(retrieve(corpus, query));

  let upstream: Response;
  try {
    upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
        temperature: 0.2,
        max_tokens: 350,
        stream: true,
        messages: [{ role: "system", content: system }, ...messages],
      }),
      signal: AbortSignal.timeout(20_000),
    });
  } catch (err) {
    console.error("ask: groq request failed", err instanceof Error ? err.message : err);
    return json({ fallback: true, error: "The assistant is unavailable right now." }, 502);
  }

  if (upstream.status === 429) {
    return json({ error: "The assistant is busy. Try again in a minute." }, 429);
  }
  if (!upstream.ok || !upstream.body) {
    console.error("ask: groq error", upstream.status, (await upstream.text().catch(() => "")).slice(0, 300));
    return json({ fallback: true, error: "The assistant is unavailable right now." }, 502);
  }

  // Groq streams OpenAI-style SSE; forward only the text deltas.
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buf = "";
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = upstream.body!.getReader();
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buf += decoder.decode(value, { stream: true });
          const lines = buf.split("\n");
          buf = lines.pop() ?? "";
          for (const line of lines) {
            const l = line.trim();
            if (!l.startsWith("data:")) continue;
            const data = l.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const delta = JSON.parse(data).choices?.[0]?.delta?.content;
              if (delta) controller.enqueue(encoder.encode(delta));
            } catch {
              /* ignore keep-alives and partial frames */
            }
          }
        }
      } catch {
        /* upstream dropped; end the stream with what we have */
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
