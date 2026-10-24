export const MAX_CHARS = 500;
export const MAX_TURNS = 6;

export interface Msg {
  role: "user" | "assistant";
  content: string;
}

export type Parsed =
  | { ok: true; messages: Msg[] }
  | { ok: false; status: number; error: string };

/** Validate and trim the request body. Only the last MAX_TURNS messages are kept. */
export function parseMessages(body: unknown): Parsed {
  const raw = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return { ok: false, status: 400, error: "messages required" };
  }
  const msgs: Msg[] = [];
  for (const m of raw.slice(-MAX_TURNS)) {
    const role = (m as Msg)?.role;
    const content = (m as Msg)?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return { ok: false, status: 400, error: "invalid message" };
    }
    if (content.length > MAX_CHARS) {
      return { ok: false, status: 413, error: `Keep questions under ${MAX_CHARS} characters.` };
    }
    msgs.push({ role, content: content.trim() });
  }
  if (msgs[msgs.length - 1]!.role !== "user" || !msgs[msgs.length - 1]!.content) {
    return { ok: false, status: 400, error: "last message must be a question" };
  }
  return { ok: true, messages: msgs };
}

const INJECTION =
  /(ignore|disregard|forget)\s+(all\s+|any\s+|the\s+|your\s+|previous\s+|prior\s+|above\s+)+(instructions|rules|prompt)|system\s+prompt|reveal\s+(your\s+)?(prompt|instructions)|you\s+are\s+now\b|developer\s+mode|jailbreak|\bDAN\b/i;

export function looksLikeInjection(text: string): boolean {
  return INJECTION.test(text);
}

/** Origin/Referer must be this site, a Vercel deployment of it, or localhost. */
export function originAllowed(
  headers: { origin?: string | null; referer?: string | null },
  allowedHosts: string[],
): boolean {
  const src = headers.origin || headers.referer;
  if (!src) return false;
  try {
    const host = new URL(src).hostname;
    return (
      host === "localhost" ||
      host === "127.0.0.1" ||
      allowedHosts.some((h) => h && host === h)
    );
  } catch {
    return false;
  }
}

/**
 * Best-effort in-memory limiter. Each serverless instance keeps its own
 * counters, so this slows abuse but is not a hard cap; the model provider's
 * own quota is the backstop.
 */
export class Limiter {
  private minute = new Map<string, { n: number; t: number }>();
  private day = new Map<string, { n: number; t: number }>();
  private globalDay = { n: 0, t: 0 };
  constructor(
    private perMinute = 8,
    private perDay = 40,
    private globalPerDay = 800,
  ) {}

  private bump(
    map: Map<string, { n: number; t: number }>,
    key: string,
    windowMs: number,
    max: number,
    now: number,
  ) {
    const e = map.get(key);
    if (!e || now - e.t >= windowMs) {
      map.set(key, { n: 1, t: now });
      return true;
    }
    e.n += 1;
    return e.n <= max;
  }

  check(ip: string, now = Date.now()): "ok" | "ip" | "global" {
    if (now - this.globalDay.t >= 86_400_000) this.globalDay = { n: 0, t: now };
    if (this.globalDay.n >= this.globalPerDay) return "global";
    if (!this.bump(this.minute, ip, 60_000, this.perMinute, now)) return "ip";
    if (!this.bump(this.day, ip, 86_400_000, this.perDay, now)) return "ip";
    this.globalDay.n += 1;
    return "ok";
  }
}
