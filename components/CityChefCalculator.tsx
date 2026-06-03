"use client";

import { useState } from "react";

// Interactive private-chef cost + tip calculator. "Tool as content" SEO play:
// drives dwell time, return visits, and links, the way a currency converter
// ranks for cost queries. All figures are clearly labelled estimates.

interface Props {
  cityName: string;
  currencySymbol: string;
  perGuest: number; // base per-guest rate (from the city's starting price)
}

const CUISINES = [
  { label: "House menu",   mult: 1 },
  { label: "Italian",      mult: 1.15 },
  { label: "Plant-based",  mult: 1.2 },
  { label: "Fine dining",  mult: 1.35 },
  { label: "Hibachi",      mult: 1.4 },
];
const SERVICES = [
  { label: "Dinner event",   base: 1 },
  { label: "Meal prep / day", base: 0.55 },
  { label: "Special occasion", base: 1.3 },
];
const TIPS = [0, 10, 15, 20];
const COURSE_BASE = 0.78;

function priceOf(perGuest: number, guests: number, courses: number, cm: number, sb: number) {
  const courseFactor = COURSE_BASE + courses * 0.073;
  let p = perGuest * guests * courseFactor * cm * sb;
  if (guests > 10) p *= 0.92; // mild economy of scale
  return Math.round(p / 5) * 5;
}

export default function CityChefCalculator({ cityName, currencySymbol, perGuest }: Props) {
  const [guests, setGuests] = useState(6);
  const [courses, setCourses] = useState(3);
  const [cm, setCm] = useState(1);
  const [sb, setSb] = useState(1);
  const [tipPct, setTipPct] = useState(10);

  const fmt = (n: number) => `${currencySymbol}${n.toLocaleString("en-US")}`;
  const fee = priceOf(perGuest, guests, courses, cm, sb);
  const lo = Math.round((fee * 0.78) / 5) * 5;
  const hi = Math.round((fee * 1.35) / 5) * 5;
  const tip = Math.round((fee * tipPct) / 100);
  const total = fee + tip;
  const convRows = [2, 4, 6, 8, 10, 12, 16, 20];

  const chip = (active: boolean): React.CSSProperties => ({
    fontFamily: "-apple-system, system-ui",
    fontSize: "13px",
    fontWeight: 500,
    padding: "8px 15px",
    borderRadius: "100px",
    border: active ? "1.5px solid #C9A96E" : "1.5px solid #e6e6e6",
    background: active ? "linear-gradient(135deg,#D4B878,#C9A96E)" : "#ffffff",
    color: active ? "#1a1208" : "#666666",
    cursor: "pointer",
    transition: "all .15s",
    userSelect: "none",
  });
  const labelRow: React.CSSProperties = {
    display: "flex", justifyContent: "space-between",
    fontFamily: "-apple-system, system-ui", fontSize: "12px", fontWeight: 700,
    color: "#888888", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.04em",
  };

  return (
    <div style={{ background: "#ffffff", border: "1px solid #ececec", borderRadius: "24px", overflow: "hidden", boxShadow: "0 18px 50px rgba(168,130,58,0.14)" }}>
      <style>{`
        .cc-range { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:100px; background:#efe7d4; outline:none; }
        .cc-range::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:linear-gradient(135deg,#D4B878,#B8934A); cursor:pointer; border:3px solid #fff; box-shadow:0 2px 8px rgba(168,130,58,0.4); }
        .cc-range::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:#C9A96E; cursor:pointer; border:3px solid #fff; }
      `}</style>

      {/* Live estimate header */}
      <div style={{ position: "relative", overflow: "hidden", background: "linear-gradient(135deg,#1a1208 0%,#2a1d0c 100%)", color: "#F4E3C1", padding: "22px 26px" }}>
        <div aria-hidden style={{ position: "absolute", right: "-40px", top: "-40px", width: "150px", height: "150px", borderRadius: "50%", background: "radial-gradient(circle,rgba(201,169,110,0.35),transparent 70%)" }} />
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C9A96E", margin: "0 0 4px" }}>
          Estimated cost · {cityName}
        </p>
        <p style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "2.6rem", fontWeight: 600, lineHeight: 1.05, margin: 0 }}>
          {fmt(fee)}<span style={{ fontFamily: "-apple-system, system-ui", fontSize: "0.95rem", color: "#bda985", fontWeight: 400 }}> est.</span>
        </p>
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "12.5px", color: "#bda985", margin: "4px 0 0" }}>
          Typical range {fmt(lo)}–{fmt(hi)}
        </p>
      </div>

      {/* Controls */}
      <div style={{ padding: "22px 26px" }}>
        <div style={{ marginBottom: "18px" }}>
          <div style={labelRow}><span>Guests</span><span style={{ color: "#B8934A", fontWeight: 700 }}>{guests}</span></div>
          <input className="cc-range" type="range" min={2} max={20} value={guests} onChange={(e) => setGuests(+e.target.value)} />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <div style={labelRow}><span>Courses</span><span style={{ color: "#B8934A", fontWeight: 700 }}>{courses}</span></div>
          <input className="cc-range" type="range" min={1} max={7} value={courses} onChange={(e) => setCourses(+e.target.value)} />
        </div>
        <div style={{ marginBottom: "18px" }}>
          <div style={labelRow}><span>Cuisine</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {CUISINES.map((c) => (
              <span key={c.label} style={chip(cm === c.mult)} onClick={() => setCm(c.mult)}>{c.label}</span>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "4px" }}>
          <div style={labelRow}><span>Service type</span></div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {SERVICES.map((s) => (
              <span key={s.label} style={chip(sb === s.base)} onClick={() => setSb(s.base)}>{s.label}</span>
            ))}
          </div>
        </div>

        <div style={{ height: "1px", background: "#efe7d4", margin: "20px 0" }} />

        {/* Tip sub-calculator */}
        <div style={{ background: "#FBF7EE", borderRadius: "14px", padding: "16px 18px" }}>
          <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", margin: "0 0 10px" }}>
            Tip calculator
          </p>
          <div style={{ display: "flex", gap: "6px", marginBottom: "12px" }}>
            {TIPS.map((t) => (
              <span key={t} style={{ ...chip(tipPct === t), flex: 1, textAlign: "center", padding: "7px 0", fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "0.95rem" }} onClick={() => setTipPct(t)}>{t}%</span>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "-apple-system, system-ui", fontSize: "13.5px", color: "#555", marginBottom: "6px" }}>
            <span>Chef fee</span><span style={{ fontWeight: 600 }}>{fmt(fee)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "-apple-system, system-ui", fontSize: "13.5px", color: "#555", marginBottom: "6px" }}>
            <span>Tip ({tipPct}%)</span><span style={{ fontWeight: 600 }}>{fmt(tip)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderTop: "1px dashed #e0d4ba", paddingTop: "10px", marginTop: "4px", fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "1.25rem" }}>
            <span>Total</span><span style={{ color: "#B8934A", fontWeight: 600 }}>{fmt(total)}</span>
          </div>
        </div>

        <a href="#chefs" style={{ display: "block", textAlign: "center", marginTop: "16px", background: "linear-gradient(135deg,#D4B878 0%,#C9A96E 55%,#B8934A 100%)", color: "#1a1208", borderRadius: "100px", padding: "13px", textDecoration: "none", fontFamily: "-apple-system, system-ui", fontSize: "14px", fontWeight: 700, boxShadow: "0 8px 24px rgba(201,169,110,0.3)" }}>
          Browse chefs in {cityName} at this price →
        </a>
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11.5px", color: "#aaa", textAlign: "center", margin: "10px 0 0" }}>
          Estimate only, based on local market rates. Your chef sets the final price.
        </p>
      </div>

      {/* Cost by party size */}
      <div style={{ borderTop: "1px solid #f0ead9", padding: "18px 26px 22px", background: "#FCFBF8" }}>
        <p style={{ fontFamily: "-apple-system, system-ui", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#999", margin: "0 0 12px" }}>
          {cityName} cost by party size ({courses}-course)
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 24px" }}>
          {convRows.map((g) => (
            <div key={g} style={{ display: "flex", justifyContent: "space-between", fontFamily: "-apple-system, system-ui", fontSize: "13px", padding: "5px 0", borderBottom: "1px solid #f3eeDF" }}>
              <span style={{ color: "#888" }}>{g} guests</span>
              <span style={{ fontWeight: 600, color: "#B8934A" }}>{fmt(priceOf(perGuest, g, courses, cm, sb))}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
