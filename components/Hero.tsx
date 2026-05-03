"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CYCLING_WORDS = ["cooking", "craft", "passion", "art"];

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setWordIdx((i) => (i + 1) % CYCLING_WORDS.length);
        setWordVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-screen bg-ivory text-graphite relative flex flex-col items-center px-6 pt-20 md:pt-24 pb-10">
      {/* ── Top: brand lockup ─────────────────────────────────── */}
      <div className="flex flex-col items-center gap-3 z-10 opacity-0 animate-fade-in"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        <div className="flex items-center gap-4">
          <Image
            src="/tipchef-logo.png"
            alt="Tip a Chef"
            width={44}
            height={44}
            className="rounded-xl"
            priority
          />
          <div className="w-px h-9 bg-graphite/15" />
          <span
            className="font-display text-graphite leading-none"
            style={{ fontSize: "1.35rem", fontWeight: 500, fontStyle: "italic", letterSpacing: "0.01em" }}
          >
            Tip a Chef
          </span>
        </div>
        <p className="font-sans text-graphite/55 text-[0.7rem] tracking-[0.18em] uppercase mt-1">
          The direct-to-kitchen tipping platform
        </p>
      </div>

      {/* ── Middle: massive headline + CTA ────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto py-16">
        <h1
          className="font-sans uppercase text-graphite mb-8 opacity-0 animate-fade-up"
          style={{
            fontSize: "clamp(2.4rem, 9vw, 6.6rem)",
            fontWeight: 800,
            letterSpacing: "-0.025em",
            lineHeight: 0.92,
            animationDelay: "0.35s",
            animationFillMode: "forwards",
          }}
        >
          Earn what your{" "}
          <span
            className="inline-block text-ember-dark"
            style={{
              opacity: wordVisible ? 1 : 0,
              transform: wordVisible ? "translateY(0)" : "translateY(-12px)",
              transition: "opacity 0.35s ease, transform 0.38s ease",
              minWidth: "5ch",
            }}
          >
            {CYCLING_WORDS[wordIdx]}
          </span>
          <br />
          deserves.
        </h1>

        <p
          className="font-sans text-graphite/70 max-w-xl mx-auto mb-10 opacity-0 animate-fade-up leading-relaxed"
          style={{
            fontSize: "clamp(1.05rem, 1.5vw, 1.25rem)",
            animationDelay: "0.55s",
            animationFillMode: "forwards",
          }}
        >
          Diners scan a QR, tip you directly, and send a thank-you message.
          100% goes to the kitchen — no app required on their side.
        </p>

        <a
          href="/signup"
          className="press inline-flex items-center bg-ember text-graphite font-sans font-semibold px-10 py-3.5 rounded-full text-sm tracking-wide hover:bg-ember-dark hover:text-ivory transition-all duration-200 opacity-0 animate-fade-up shadow-md shadow-ember/20"
          style={{ animationDelay: "0.75s", animationFillMode: "forwards" }}
        >
          Get started
        </a>
      </div>

      {/* ── Bottom: fine print ────────────────────────────────── */}
      <p
        className="font-sans text-graphite/50 text-xs text-center max-w-md opacity-0 animate-fade-in"
        style={{ animationDelay: "1s", animationFillMode: "forwards" }}
      >
        Free for chefs and restaurants. Instant payouts. No app required for diners.
      </p>
    </section>
  );
}
