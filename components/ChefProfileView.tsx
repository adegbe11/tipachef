"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const TIP_AMOUNTS = [
  { emoji: "🧂", label: "Sea salt",    amount: 3  },
  { emoji: "🌿", label: "Fresh herbs", amount: 5  },
  { emoji: "🍷", label: "Good wine",   amount: 10 },
  { emoji: "🥩", label: "Wagyu cut",   amount: 25 },
];

export interface WallTip {
  name: string;
  amount: number;
  message: string;
  time: string;
}

export interface ChefViewData {
  name: string;
  slug: string;
  role: string;
  restaurant: string;
  location: string;
  flag: string;
  hook: string;
  photo: string;
  cover: string;
  tips: number;
  supporters: number;
  years: number;
  specialties: string[];
  wall: WallTip[];
  isDemo: boolean;
  goalLabel?: string | null;
  goalTarget?: number;
  goalCurrent?: number;
  tipReward?: string | null;
}

function CopyButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    navigator.clipboard.writeText(`https://tipachef.com/${slug}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }
  return (
    <button
      onClick={copy}
      style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        background: copied ? "rgba(201,169,110,0.12)" : "rgba(255,255,255,0.05)",
        border: `1px solid ${copied ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.1)"}`,
        borderRadius: "100px",
        padding: "6px 12px",
        cursor: "pointer",
        fontFamily: "-apple-system, system-ui",
        fontSize: "11px",
        fontWeight: 500,
        color: copied ? "#C9A96E" : "rgba(250,248,244,0.45)",
        transition: "all 0.2s",
      }}
    >
      {copied ? (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
          </svg>
          Copy link
        </>
      )}
    </button>
  );
}

export default function ChefProfileView({ chef }: { chef: ChefViewData }) {
  const [selectedTip, setSelectedTip] = useState<number | null>(2);
  const [customAmount, setCustomAmount] = useState("");
  const [message, setMessage] = useState("");
  const [tipperName, setTipperName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [tipSent, setTipSent] = useState(false);
  const coverRef = useRef<HTMLDivElement>(null);

  const tipAmount = customAmount
    ? parseFloat(customAmount) || 0
    : selectedTip !== null
    ? TIP_AMOUNTS[selectedTip].amount
    : 0;

  const firstName = chef.name.split(" ")[0];

  const goalPct =
    chef.goalTarget && chef.goalTarget > 0
      ? Math.min(100, Math.round(((chef.goalCurrent ?? 0) / chef.goalTarget) * 100))
      : 0;

  // Subtle parallax on cover
  useEffect(() => {
    const el = coverRef.current;
    if (!el) return;
    const onScroll = () => {
      el.style.transform = `scale(1.08) translateY(${window.scrollY * 0.12}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  async function sendTip() {
    if (tipAmount <= 0) return;
    if (chef.isDemo) {
      setShowNudge(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chefSlug: chef.slug,
          amountCents: Math.round(tipAmount * 100),
          message,
          tipperName: tipperName || "Anonymous",
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0a0908", color: "#FAF8F4" }}>

      {/* ── Cover photo ─────────────────────────────── */}
      <div style={{ position: "relative", height: "360px", overflow: "hidden" }}>
        <div
          ref={coverRef}
          style={{ position: "absolute", inset: "-8%", transform: "scale(1.08)", willChange: "transform" }}
        >
          <Image
            src={chef.cover}
            alt={chef.name}
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            unoptimized
            priority
          />
        </div>

        {/* Gradient overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,9,8,0.25) 0%, rgba(10,9,8,0.5) 55%, #0a0908 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(10,9,8,0.45) 0%, transparent 60%)" }} />

        {/* Film grain */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          opacity: 0.035, mixBlendMode: "overlay",
        }} />

        {/* Top bar: back + live badge */}
        <div style={{ position: "absolute", top: "18px", left: "18px", right: "18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              background: "rgba(10,9,8,0.65)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "100px",
              padding: "8px 14px 8px 10px",
              textDecoration: "none",
              color: "rgba(250,248,244,0.65)",
              fontFamily: "-apple-system, system-ui",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.01em",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            tipachef.com
          </Link>

          <div style={{
            display: "inline-flex", alignItems: "center", gap: "5px",
            background: "rgba(10,9,8,0.65)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(74,222,128,0.22)",
            borderRadius: "100px",
            padding: "6px 12px",
          }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 7px rgba(74,222,128,0.9)", animation: "profilePulse 2s infinite" }} />
            <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "10px", color: "rgba(74,222,128,0.85)", fontWeight: 700, letterSpacing: "0.07em" }}>LIVE</span>
          </div>
        </div>

        {/* Chef name large overlay on cover bottom */}
        <div style={{ position: "absolute", bottom: "70px", left: "22px", right: "22px" }}>
          <p style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.4rem, 8vw, 3.2rem)",
            fontWeight: 400,
            color: "#FAF8F4",
            margin: 0,
            lineHeight: 1,
            letterSpacing: "-0.02em",
            textShadow: "0 4px 24px rgba(0,0,0,0.6)",
          }}>
            {chef.name}
          </p>
          <p style={{
            fontFamily: "-apple-system, system-ui",
            fontSize: "13px",
            color: "rgba(250,248,244,0.45)",
            margin: "5px 0 0",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}>
            {chef.role} · {chef.restaurant}
          </p>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────── */}
      <div style={{ maxWidth: "600px", margin: "0 auto", padding: "0 18px 80px" }}>

        {/* Identity row: avatar + location + socials */}
        <div style={{ display: "flex", alignItems: "center", gap: "14px", marginTop: "-30px", marginBottom: "22px", position: "relative", zIndex: 10 }}>
          {/* Avatar */}
          <div style={{
            width: "80px", height: "80px", borderRadius: "50%", flexShrink: 0,
            border: "2.5px solid rgba(201,169,110,0.55)",
            boxShadow: "0 0 0 5px rgba(201,169,110,0.07), 0 10px 36px rgba(0,0,0,0.65)",
            position: "relative", overflow: "hidden",
          }}>
            <Image
              src={chef.photo}
              alt={chef.name}
              fill
              style={{ objectFit: "cover", objectPosition: "center top" }}
              unoptimized
            />
            {/* Verified checkmark */}
            <div style={{
              position: "absolute", bottom: "1px", right: "1px",
              width: "20px", height: "20px", borderRadius: "50%",
              background: "linear-gradient(135deg,#C9A96E,#D4B878)",
              border: "2px solid #0a0908",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#1a1208" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Location */}
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "20px",
              padding: "4px 10px 4px 6px",
              marginBottom: "8px",
            }}>
              <span style={{ fontSize: "13px" }}>{chef.flag}</span>
              <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "10.5px", color: "rgba(250,248,244,0.45)", fontWeight: 600, letterSpacing: "0.02em" }}>
                {chef.location}
              </span>
            </div>

            {/* Rating row */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ display: "flex", gap: "1px" }}>
                {[1,2,3,4,5].map(s => (
                  <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#C9A96E" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                  </svg>
                ))}
              </div>
              <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "10.5px", color: "rgba(250,248,244,0.3)", fontWeight: 500 }}>
                {chef.supporters}+ supporters
              </span>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", marginBottom: "22px" }}>
          {[
            { value: `$${chef.tips.toLocaleString()}+`, label: "Tips received" },
            { value: `${chef.supporters}+`,              label: "Supporters"     },
            { value: `${chef.years} yrs`,                label: "On the line"    },
          ].map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              border: "1.5px solid rgba(201,169,110,0.1)",
              borderRadius: "16px",
              padding: "13px 10px",
              textAlign: "center",
              boxShadow: "3px 3px 0 rgba(201,169,110,0.04)",
            }}>
              <p style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.35rem",
                fontWeight: 500,
                color: "#C9A96E",
                margin: "0 0 3px",
                letterSpacing: "-0.02em",
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: "-apple-system, system-ui",
                fontSize: "9.5px",
                color: "rgba(250,248,244,0.28)",
                margin: 0,
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>

        {/* Bio */}
        {chef.hook && (
          <div style={{
            borderLeft: "2px solid rgba(201,169,110,0.28)",
            paddingLeft: "16px",
            marginBottom: "22px",
          }}>
            <p style={{
              fontFamily: "Georgia, 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
              color: "rgba(250,248,244,0.48)",
              lineHeight: 1.7,
              margin: 0,
            }}>
              &ldquo;{chef.hook}&rdquo;
            </p>
          </div>
        )}

        {/* Specialties */}
        <div style={{ display: "flex", gap: "7px", flexWrap: "wrap", marginBottom: "26px" }}>
          {chef.specialties.map((sp) => (
            <span key={sp} style={{
              fontFamily: "-apple-system, system-ui",
              fontSize: "11px",
              fontWeight: 500,
              color: "rgba(250,248,244,0.45)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: "100px",
              padding: "5px 12px",
              letterSpacing: "0.01em",
            }}>
              {sp}
            </span>
          ))}
        </div>

        {/* Goal bar (real chefs only) */}
        {chef.goalLabel && chef.goalTarget && chef.goalTarget > 0 && (
          <div style={{
            background: "rgba(201,169,110,0.05)",
            border: "1.5px solid rgba(201,169,110,0.14)",
            borderRadius: "16px",
            padding: "14px 16px",
            marginBottom: "20px",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "9px" }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", fontWeight: 600, color: "rgba(250,248,244,0.7)", margin: 0 }}>
                🎯 {chef.goalLabel}
              </p>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", color: "rgba(250,248,244,0.3)", margin: 0 }}>
                ${chef.goalCurrent} / ${chef.goalTarget}
              </p>
            </div>
            <div style={{ height: "5px", background: "rgba(255,255,255,0.06)", borderRadius: "100px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${goalPct}%`, background: "linear-gradient(90deg,#C9A96E,#D4B878)", borderRadius: "100px", transition: "width 1s cubic-bezier(0.25,0.46,0.45,0.94)" }} />
            </div>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "10px", color: "rgba(250,248,244,0.25)", margin: "6px 0 0" }}>
              {goalPct}% funded · ${(chef.goalTarget - (chef.goalCurrent ?? 0)).toLocaleString()} to go
            </p>
          </div>
        )}

        {/* ── Tip card ─────────────────────────────── */}
        {!tipSent ? (
          <div style={{
            background: "rgba(16,14,10,0.85)",
            backdropFilter: "blur(28px)",
            WebkitBackdropFilter: "blur(28px)",
            border: "2px solid rgba(201,169,110,0.2)",
            borderRadius: "24px",
            padding: "22px 20px 20px",
            boxShadow: "6px 6px 0 rgba(201,169,110,0.07), 0 24px 64px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)",
            marginBottom: "14px",
          }}>
            {/* Card header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <p style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.35rem",
                fontWeight: 400,
                color: "#FAF8F4",
                margin: 0,
                letterSpacing: "-0.01em",
              }}>
                Send {firstName} a tip
              </p>
              <div style={{
                fontFamily: "-apple-system, system-ui", fontSize: "9.5px", fontWeight: 700,
                color: "rgba(201,169,110,0.55)", letterSpacing: "0.08em", textTransform: "uppercase",
              }}>
                Via Stripe
              </div>
            </div>

            {/* Amount grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
              {TIP_AMOUNTS.map((t, i) => {
                const active = selectedTip === i && !customAmount;
                return (
                  <button
                    key={i}
                    onClick={() => { setSelectedTip(i); setCustomAmount(""); }}
                    style={{
                      display: "flex", alignItems: "center", gap: "10px",
                      padding: "12px 13px",
                      borderRadius: "14px",
                      border: `1.5px solid ${active ? "rgba(201,169,110,0.5)" : "rgba(255,255,255,0.07)"}`,
                      background: active ? "rgba(201,169,110,0.09)" : "rgba(255,255,255,0.025)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ fontSize: "19px", lineHeight: 1 }}>{t.emoji}</span>
                    <div>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 700, color: active ? "#C9A96E" : "rgba(250,248,244,0.75)", margin: 0, letterSpacing: "-0.01em" }}>
                        ${t.amount}
                      </p>
                      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "10px", color: "rgba(250,248,244,0.25)", margin: 0 }}>
                        {t.label}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Custom amount */}
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.025)",
              border: `1.5px solid ${customAmount ? "rgba(201,169,110,0.4)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: "14px",
              padding: "11px 14px",
              marginBottom: "10px",
              transition: "border-color 0.15s",
            }}>
              <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "14px", color: "rgba(250,248,244,0.28)", fontWeight: 600 }}>$</span>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setSelectedTip(null); }}
                placeholder="Custom amount"
                style={{
                  flex: 1, background: "transparent", border: "none", outline: "none",
                  fontFamily: "-apple-system, system-ui", fontSize: "13px",
                  color: "#FAF8F4", caretColor: "#C9A96E",
                }}
              />
            </div>

            {/* Name */}
            <input
              type="text"
              value={tipperName}
              onChange={(e) => setTipperName(e.target.value)}
              placeholder="Your name (optional)"
              style={{
                width: "100%", boxSizing: "border-box",
                background: "rgba(255,255,255,0.025)",
                border: "1.5px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "11px 14px",
                fontFamily: "-apple-system, system-ui", fontSize: "13px",
                color: "#FAF8F4", caretColor: "#C9A96E",
                outline: "none", marginBottom: "10px",
                transition: "border-color 0.15s",
              }}
            />

            {/* Message */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`Tell ${firstName} what you loved... (optional)`}
              rows={2}
              style={{
                width: "100%", boxSizing: "border-box",
                background: "rgba(255,255,255,0.025)",
                border: "1.5px solid rgba(255,255,255,0.07)",
                borderRadius: "14px",
                padding: "11px 14px",
                fontFamily: "Georgia, serif", fontStyle: "italic",
                fontSize: "13px", lineHeight: 1.55,
                color: "rgba(250,248,244,0.75)", caretColor: "#C9A96E",
                outline: "none", resize: "none", marginBottom: "16px",
                transition: "border-color 0.15s",
              }}
            />

            {/* Submit */}
            <button
              onClick={sendTip}
              disabled={tipAmount <= 0 || loading}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "14px",
                border: "none",
                cursor: tipAmount > 0 && !loading ? "pointer" : "default",
                fontFamily: "-apple-system, system-ui",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.01em",
                background: tipAmount > 0
                  ? "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)"
                  : "rgba(255,255,255,0.05)",
                color: tipAmount > 0 ? "#1a1208" : "rgba(250,248,244,0.18)",
                boxShadow: tipAmount > 0
                  ? "inset 0 1px 0 rgba(255,255,255,0.22), 0 6px 24px rgba(201,169,110,0.32)"
                  : "none",
                transition: "all 0.2s",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Redirecting to payment..."
                : tipAmount > 0
                ? `Send $${tipAmount} tip to ${firstName} →`
                : "Choose an amount above"}
            </button>

            <p style={{
              textAlign: "center",
              fontFamily: "-apple-system, system-ui",
              fontSize: "10px",
              color: "rgba(250,248,244,0.16)",
              margin: "10px 0 0",
            }}>
              🔒 Powered by Stripe · 100% goes directly to {firstName}
            </p>
          </div>
        ) : (
          /* Tip sent confirmation */
          <div style={{
            background: "rgba(74,222,128,0.06)",
            border: "2px solid rgba(74,222,128,0.2)",
            borderRadius: "24px",
            padding: "32px 24px",
            textAlign: "center",
            marginBottom: "14px",
          }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎉</div>
            <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.5rem", fontWeight: 400, color: "#FAF8F4", margin: "0 0 6px" }}>
              Tip sent!
            </p>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", color: "rgba(250,248,244,0.4)", margin: 0 }}>
              {firstName} will love hearing from you.
            </p>
          </div>
        )}

        {/* Demo nudge */}
        {showNudge && (
          <div style={{
            background: "rgba(201,169,110,0.07)",
            border: "1.5px solid rgba(201,169,110,0.28)",
            borderRadius: "18px",
            padding: "16px 16px 16px 18px",
            marginBottom: "14px",
            display: "flex", alignItems: "flex-start", gap: "12px",
          }}>
            <span style={{ fontSize: "22px", lineHeight: 1, marginTop: "2px" }}>👨‍🍳</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 700, color: "#C9A96E", margin: "0 0 4px" }}>
                This is a showcase chef
              </p>
              <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", color: "rgba(250,248,244,0.4)", margin: "0 0 12px", lineHeight: 1.5 }}>
                Create a free account to tip real chefs in seconds. No app. No waiting.
              </p>
              <Link href="/signup" style={{
                display: "inline-flex", alignItems: "center", gap: "5px",
                background: "linear-gradient(135deg,#D4B878,#C9A96E)",
                color: "#1a1208",
                borderRadius: "100px",
                padding: "8px 16px",
                textDecoration: "none",
                fontFamily: "-apple-system, system-ui",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.01em",
                boxShadow: "0 4px 16px rgba(201,169,110,0.3)",
              }}>
                Get started free →
              </Link>
            </div>
            <button
              onClick={() => setShowNudge(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(250,248,244,0.25)", padding: "2px", flexShrink: 0, marginTop: "1px" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}

        {/* ── Share row ────────────────────────────── */}
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1.5px solid rgba(255,255,255,0.06)",
          borderRadius: "20px",
          padding: "16px 18px",
          marginBottom: "28px",
          display: "flex", alignItems: "center", gap: "14px",
        }}>
          {/* QR code */}
          <div style={{
            width: "68px", height: "68px", flexShrink: 0,
            background: "#ffffff",
            borderRadius: "12px",
            padding: "6px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://tipachef.com/${chef.slug}&color=111111&bgcolor=FFFFFF`}
              alt="QR"
              width={56}
              height={56}
              style={{ display: "block", width: "100%", height: "100%" }}
            />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12px", fontWeight: 600, color: "rgba(250,248,244,0.65)", margin: "0 0 2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              tipachef.com/{chef.slug}
            </p>
            <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "10.5px", color: "rgba(250,248,244,0.22)", margin: "0 0 10px" }}>
              Share this page · scan to tip anywhere
            </p>
            <CopyButton slug={chef.slug} />
          </div>
        </div>

        {/* ── Wall of love ─────────────────────────── */}
        {chef.wall.length > 0 && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
              <p style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.25rem",
                fontWeight: 400,
                color: "rgba(250,248,244,0.55)",
                margin: 0,
                letterSpacing: "-0.01em",
              }}>
                Wall of love
              </p>
              <div style={{
                fontFamily: "-apple-system, system-ui",
                fontSize: "10px",
                color: "rgba(250,248,244,0.25)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "100px",
                padding: "2px 8px",
              }}>
                {chef.wall.length} messages
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {chef.wall.map((t, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: "18px",
                    padding: "14px 16px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.04)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.025)")}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: t.message ? "9px" : 0 }}>
                    <div style={{
                      width: "28px", height: "28px", borderRadius: "50%", flexShrink: 0,
                      background: "linear-gradient(135deg,rgba(201,169,110,0.22),rgba(201,169,110,0.08))",
                      border: "1px solid rgba(201,169,110,0.22)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, color: "#C9A96E",
                    }}>
                      {t.name[0].toUpperCase()}
                    </div>
                    <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12.5px", fontWeight: 600, color: "rgba(250,248,244,0.75)", margin: 0, flex: 1 }}>
                      {t.name}
                    </p>
                    <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "13px", fontWeight: 700, color: "#C9A96E", flexShrink: 0 }}>
                      ${t.amount}
                    </span>
                    <span style={{ fontFamily: "-apple-system, system-ui", fontSize: "10px", color: "rgba(250,248,244,0.18)", flexShrink: 0 }}>
                      {t.time}
                    </span>
                  </div>
                  {t.message && (
                    <p style={{
                      fontFamily: "Georgia, 'Times New Roman', serif",
                      fontStyle: "italic",
                      fontSize: "13px",
                      color: "rgba(250,248,244,0.38)",
                      margin: 0,
                      lineHeight: 1.6,
                    }}>
                      &ldquo;{t.message}&rdquo;
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      <style>{`
        @keyframes profilePulse {
          0%,100% { opacity:1; transform:scale(1);   }
          50%      { opacity:0.45; transform:scale(1.45); }
        }
        input::placeholder, textarea::placeholder {
          color: rgba(250,248,244,0.2) !important;
        }
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance:none; margin:0; }
        input[type=number] { -moz-appearance:textfield; }
      `}</style>
    </div>
  );
}
