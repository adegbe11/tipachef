"use client";

import { useState } from "react";
import Link from "next/link";
import LightNavbar from "@/components/LightNavbar";
import Footer from "@/components/Footer";

const TOPICS = [
  "I'm a chef and want to join",
  "Question about my tips / payout",
  "Technical issue",
  "Partnership or press enquiry",
  "Something else",
];

export default function ContactPage() {
  const [topic,   setTopic]   = useState("");
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const subject = encodeURIComponent(`[Tip a Chef] ${topic || "Contact form"}`);
    const body    = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`
    );
    window.open(`mailto:hello@tipachef.com?subject=${subject}&body=${body}`);
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="bg-white min-h-screen">
      <LightNavbar />

      <main>

        {/* ── Hero ── */}
        <section className="pt-36 pb-16 md:pt-48 md:pb-20">
          <div className="content-container max-w-3xl">
            <p
              className="font-sans text-xs font-medium uppercase tracking-widest mb-8"
              style={{ color: "#C9A96E" }}
            >
              Contact
            </p>
            <h1
              className="font-display text-graphite leading-tight mb-5"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300 }}
            >
              We actually{" "}
              <span style={{ color: "#C9A96E", fontStyle: "italic" }}>
                read every message.
              </span>
            </h1>
            <p
              className="font-sans font-light leading-relaxed max-w-md"
              style={{ color: "#666666", fontSize: "0.95rem" }}
            >
              Chef question, payout issue, press enquiry, or just want to say hello. A real person replies within one business day.
            </p>
          </div>
        </section>

        {/* ── Divider ── */}
        <div className="content-container max-w-3xl">
          <div style={{ height: "1px", background: "#f0f0f0" }} />
        </div>

        {/* ── Body ── */}
        <section className="py-16 md:py-24">
          <div className="content-container">
            <div className="grid md:grid-cols-[1fr_320px] gap-10 items-start max-w-4xl">

              {/* Form */}
              <div
                className="rounded-2xl p-8 md:p-10"
                style={{ background: "#fafafa", border: "1px solid #f0f0f0" }}
              >
                {sent ? (
                  <div className="text-center py-10">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.2)" }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h2
                      className="font-display text-graphite mb-2"
                      style={{ fontSize: "1.6rem", fontWeight: 300 }}
                    >
                      Message sent
                    </h2>
                    <p
                      className="font-sans font-light leading-relaxed mb-8"
                      style={{ color: "#888888", fontSize: "0.9rem" }}
                    >
                      We'll get back to you within one business day.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="font-sans text-xs transition-colors"
                      style={{ color: "#999999", textDecoration: "underline", textUnderlineOffset: "3px" }}
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h2
                      className="font-sans font-semibold text-sm text-graphite mb-6"
                    >
                      Send us a message
                    </h2>

                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block font-sans text-xs mb-2 uppercase tracking-widest"
                          style={{ color: "#999999" }}
                        >
                          Your name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Chen"
                          className="w-full rounded-xl px-4 py-3 font-sans text-graphite text-sm outline-none transition-colors"
                          style={{
                            background: "#ffffff",
                            border: "1px solid #e8e8e8",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#C9A96E")}
                          onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")}
                        />
                      </div>
                      <div>
                        <label
                          className="block font-sans text-xs mb-2 uppercase tracking-widest"
                          style={{ color: "#999999" }}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full rounded-xl px-4 py-3 font-sans text-graphite text-sm outline-none transition-colors"
                          style={{
                            background: "#ffffff",
                            border: "1px solid #e8e8e8",
                          }}
                          onFocus={(e) => (e.target.style.borderColor = "#C9A96E")}
                          onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")}
                        />
                      </div>
                    </div>

                    {/* Topic */}
                    <div>
                      <label
                        className="block font-sans text-xs mb-2 uppercase tracking-widest"
                        style={{ color: "#999999" }}
                      >
                        Topic
                      </label>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        className="w-full rounded-xl px-4 py-3 font-sans text-sm outline-none appearance-none transition-colors"
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e8e8e8",
                          color: topic ? "#111111" : "#aaaaaa",
                        }}
                      >
                        <option value="" disabled>Select a topic…</option>
                        {TOPICS.map((t) => (
                          <option key={t} value={t} style={{ color: "#111111" }}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        className="block font-sans text-xs mb-2 uppercase tracking-widest"
                        style={{ color: "#999999" }}
                      >
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell us what's on your mind…"
                        className="w-full rounded-xl px-4 py-3 font-sans text-graphite text-sm outline-none resize-none transition-colors"
                        style={{
                          background: "#ffffff",
                          border: "1px solid #e8e8e8",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "#C9A96E")}
                        onBlur={(e) => (e.target.style.borderColor = "#e8e8e8")}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="press w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-sans font-semibold text-sm tracking-wide transition-all duration-200 disabled:opacity-60"
                      style={{ background: "#C9A96E", color: "#ffffff", boxShadow: "0 4px 16px rgba(201,169,110,0.25)" }}
                    >
                      {loading ? "Sending…" : "Send message"}
                      {!loading && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Side info */}
              <div className="space-y-4">

                {[
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                        <polyline points="22,6 12,13 2,6"/>
                      </svg>
                    ),
                    label: "Email",
                    value: "hello@tipachef.com",
                    href: "mailto:hello@tipachef.com",
                    sub: "Mon–Fri, replies within 1 business day",
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                      </svg>
                    ),
                    label: "X (Twitter)",
                    value: "@tipachef",
                    href: "https://twitter.com/tipachef",
                    sub: "DMs open for quick questions",
                  },
                  {
                    icon: (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                      </svg>
                    ),
                    label: "Instagram",
                    value: "@tipachef",
                    href: "https://instagram.com/tipachef",
                    sub: "Behind the scenes from real kitchens",
                  },
                ].map((c) => (
                  <div
                    key={c.label}
                    className="rounded-2xl p-6"
                    style={{ border: "1px solid #f0f0f0", background: "#fafafa" }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(201,169,110,0.08)", border: "1px solid rgba(201,169,110,0.15)" }}
                    >
                      {c.icon}
                    </div>
                    <p className="font-sans font-semibold text-sm text-graphite mb-1">{c.label}</p>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="font-sans text-sm transition-colors"
                      style={{ color: "#C9A96E" }}
                    >
                      {c.value}
                    </a>
                    <p
                      className="font-sans font-light mt-1.5 leading-relaxed"
                      style={{ fontSize: "0.78rem", color: "#aaaaaa" }}
                    >
                      {c.sub}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
