"use client";

import { useState } from "react";
import { profile } from "@/data/profile";

// Web3Forms access key. This is a PUBLIC client-side key by design (it ships
// in the page HTML) — it only permits sending a submission to the configured
// inbox, so it is safe to commit. Override via NEXT_PUBLIC_WEB3FORMS_KEY.
const ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_KEY ??
  "a74e187f-bcd6-4482-aec5-ee47a8c21919";

type Status = "idle" | "sending" | "ok" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio contact from ${data.name || "someone"}`,
          from_name: "Portfolio Contact Form",
          ...data,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setError(json.message || "Something went wrong. Try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error — please email me directly.");
    }
  }

  if (status === "ok") {
    return (
      <div className="form-ok" role="status">
        <p className="display">Message sent ✓</p>
        <p>Thanks — I&apos;ll get back to you soon.</p>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setStatus("idle")}
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={onSubmit} noValidate>
      {/* honeypot — bots fill this; humans never see it */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        style={{ display: "none" }}
        aria-hidden
      />
      <div className="cform-row">
        <label className="field">
          <span>Name</span>
          <input name="name" type="text" required placeholder="Your name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="field">
        <span>Message</span>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="What would you like to build or talk about?"
        />
      </label>
      {status === "error" && (
        <p className="form-err" role="alert">
          {error}{" "}
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </p>
      )}
      <button type="submit" className="btn-grad" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
