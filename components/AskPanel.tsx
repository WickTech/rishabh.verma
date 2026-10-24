"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "What has Rishabh shipped?",
  "Tell me about Kalakaarian",
  "What AI work have you done?",
];

const MAX = 500;

/** Turn /projects/<slug> paths and URLs in an answer into links. */
function Linkified({ text }: { text: string }) {
  const parts = text.split(/(\/projects\/[a-z0-9-]+|https?:\/\/[^\s)]+)/g);
  return (
    <>
      {parts.map((p, i) =>
        /^(\/projects\/|https?:\/\/)/.test(p) ? (
          <a key={i} href={p} target={p.startsWith("http") ? "_blank" : undefined} rel="noopener">
            {p}
          </a>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export function AskPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);

  // Focus the field when the panel opens and again once a reply finishes
  // (it is disabled while busy, so this must run after the re-render).
  useEffect(() => {
    if (open && !busy) field.current?.focus();
  }, [open, busy]);

  useEffect(() => {
    log.current?.scrollTo({ top: log.current.scrollHeight });
  }, [msgs]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== "Tab" || !root.current) return;
    const items = root.current.querySelectorAll<HTMLElement>(
      "a[href], button:not([disabled]), textarea:not([disabled])",
    );
    if (!items.length) return;
    const first = items[0]!;
    const last = items[items.length - 1]!;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    setError("");
    setInput("");
    const history: Msg[] = [...msgs, { role: "user", content: q }];
    setMsgs([...history, { role: "assistant", content: "" }]);
    setBusy(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history.slice(-6) }),
      });
      if (!res.ok || !res.body) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || "The assistant is unavailable right now.");
      }
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += dec.decode(value, { stream: true });
        setMsgs([...history, { role: "assistant", content: acc }]);
      }
      if (!acc.trim()) throw new Error("No answer came back. Please try again.");
    } catch (e) {
      setMsgs(history);
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (!open) return null;

  return (
    <div
      ref={root}
      className="ask-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-title"
      onKeyDown={onKeyDown}
    >
      <div className="ask-head">
        <h2 id="ask-title" className="display">
          Ask my portfolio
        </h2>
        <button type="button" className="ask-x" onClick={onClose} aria-label="Close">
          ×
        </button>
      </div>

      <div ref={log} className="ask-log" role="log" aria-live="polite" aria-busy={busy}>
        {msgs.length === 0 && (
          <div className="ask-empty">
            <p>
              Ask about my projects, experience or services. Answers are generated from
              this site&apos;s content.
            </p>
            <div className="ask-suggest">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => ask(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {msgs.map((m, i) => (
          <p key={i} className={`ask-msg ${m.role}`}>
            {m.role === "assistant" ? (
              m.content ? <Linkified text={m.content} /> : <span className="ask-dots">Thinking</span>
            ) : (
              m.content
            )}
          </p>
        ))}
        {error && (
          <p className="ask-error" role="alert">
            {error}{" "}
            <a href={`mailto:${profile.email}`}>Email me instead</a>
          </p>
        )}
      </div>

      <form
        className="ask-form"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor="ask-input" className="sr-only">
          Your question
        </label>
        <textarea
          id="ask-input"
          ref={field}
          value={input}
          maxLength={MAX}
          rows={2}
          placeholder="Type a question"
          disabled={busy}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              ask(input);
            }
          }}
        />
        <button type="submit" className="btn-grad" disabled={busy || !input.trim()}>
          Send
        </button>
      </form>
    </div>
  );
}
