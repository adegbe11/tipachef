"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

const CHEF = {
  name:       "Marcus Thompson",
  handle:     "marcus",
  role:       "Head Chef",
  restaurant: "The Meridian, London",
  hook:       "Teaching you to master bold British flavours from the professional kitchen — one technique at a time.",
  avatar:     "/tipchef-welcome.png",
  cover:      "/tipchef-welcome.png",
  socials:    { instagram: "#", tiktok: "#", youtube: "#" },
  goal:       { label: "New pizza oven for the kitchen", current: 340, target: 450 },
};

const TIP_AMOUNTS = [
  { emoji: "🧂", label: "A pinch of sea salt",    amount: 3  },
  { emoji: "🌿", label: "A bunch of fresh herbs",  amount: 5  },
  { emoji: "🍷", label: "A glass of good wine",    amount: 10 },
  { emoji: "🥩", label: "Tonight's wagyu cut",     amount: 25 },
];

const EXTRAS = [
  { emoji: "📄", title: "7-Day Pasta Challenge PDF",          price: 5,  tag: "Digital download" },
  { emoji: "🎥", title: "30-Min Thai Meals — Video Series",   price: 12, tag: "Exclusive video"   },
  { emoji: "📞", title: "Personal chef shoutout video",        price: 25, tag: "Personalised"      },
];

const SUPPORTERS = [
  { name: "Sarah M.",  amount: 10, message: "That lamb was the best thing I've ever eaten. You're a legend.", time: "2h ago" },
  { name: "James K.",  amount: 5,  message: "The herb crust on the cod tonight — absolutely stunning.",        time: "5h ago" },
  { name: "Priya R.",  amount: 25, message: "Three years coming to The Meridian. Worth every penny.",           time: "1d ago" },
  { name: "Tom B.",    amount: 3,  message: "Keep doing what you do, chef. The kitchen smells amazing.",        time: "2d ago" },
];

export default function ChefProfile({ params }: { params: { slug: string } }) {
  const [selectedTip,  setSelectedTip]  = useState<number | null>(1);
  const [customAmount, setCustomAmount] = useState("");
  const [message,      setMessage]      = useState("");
  const [tipperName,   setTipperName]   = useState("");
  const [loading,      setLoading]      = useState(false);
  const [linkCopied,   setLinkCopied]   = useState(false);

  const tipAmount = customAmount
    ? parseFloat(customAmount)
    : selectedTip !== null
    ? TIP_AMOUNTS[selectedTip].amount
    : 0;

  const goalPct = Math.min(100, Math.round((CHEF.goal.current / CHEF.goal.target) * 100));

  async function sendTip() {
    if (tipAmount <= 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/tips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chefSlug:    params.slug,
          amountCents: Math.round(tipAmount * 100),
          message,
          tipperName: tipperName || "Anonymous",
        }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(`https://tipachef.com/${params.slug}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  function downloadQR() {
    const canvas = document.querySelector("#profile-qr-canvas canvas") as HTMLCanvasElement;
    if (!canvas) return;
    const a   = document.createElement("a");
    a.href     = canvas.toDataURL("image/png");
    a.download = `tipachef-${params.slug}-qr.png`;
    a.click();
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Cover + Avatar ─────────────────────────────────── */}
      <div className="relative h-52 md:h-64 w-full overflow-hidden bg-graphite">
        <Image src={CHEF.cover} alt="" fill className="object-cover object-top opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50" />
        <Link href="/" className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Tip a Chef
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20 -mt-16 relative z-10">

        {/* Identity */}
        <div className="flex items-end gap-4 mb-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
            <Image src={CHEF.avatar} alt={CHEF.name} width={96} height={96} className="object-cover object-top w-full h-full" />
          </div>
          <div className="mb-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-gray-900 font-semibold text-xl leading-tight">{CHEF.name}</h1>
              <span className="text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full flex-shrink-0">● Live</span>
            </div>
            <p className="text-gray-500 text-sm">{CHEF.role} · {CHEF.restaurant}</p>
          </div>
          <div className="flex items-center gap-2 mb-1 flex-shrink-0">
            {[
              { href: CHEF.socials.instagram, icon: <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></> },
              { href: CHEF.socials.tiktok,    icon: <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z" fill="#111" stroke="none"/> },
              { href: CHEF.socials.youtube,   icon: <><path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z" fill="#FF0000"/><path d="M9.8 15.5V8.5l6.4 3.5-6.4 3.5z" fill="white"/></> },
            ].map((s, i) => (
              <a key={i} href={s.href} className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:border-amber-300 transition-colors">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              </a>
            ))}
          </div>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6">{CHEF.hook}</p>

        {/* Goal bar */}
        <div className="bg-white rounded-2xl p-4 mb-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-900 text-sm font-medium">🎯 {CHEF.goal.label}</p>
            <p className="text-xs text-gray-400">${CHEF.goal.current} of ${CHEF.goal.target}</p>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${goalPct}%`, background: "#C9A96E" }} />
          </div>
          <p className="text-xs text-gray-400 mt-1.5">{goalPct}% funded · ${CHEF.goal.target - CHEF.goal.current} to go</p>
        </div>

        {/* ── Tip card ─────────────────────────────────────── */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-5">
          <p className="text-gray-900 font-semibold text-base mb-4">Send Marcus a tip</p>

          <div className="grid grid-cols-2 gap-2.5 mb-4">
            {TIP_AMOUNTS.map((t, i) => (
              <button
                key={i}
                onClick={() => { setSelectedTip(i); setCustomAmount(""); }}
                className="flex items-center gap-3 p-3 rounded-2xl border text-left transition-all"
                style={{
                  borderColor: selectedTip === i && !customAmount ? "#C9A96E" : "#E5E7EB",
                  background:  selectedTip === i && !customAmount ? "#FFFBF5" : "white",
                }}
              >
                <span className="text-xl">{t.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-xs font-semibold">${t.amount}</p>
                  <p className="text-gray-400 text-xs truncate">{t.label}</p>
                </div>
              </button>
            ))}
          </div>

          <div className={`flex items-center gap-2 px-4 py-3 rounded-2xl border mb-4 transition-all ${customAmount ? "border-amber-400 bg-amber-50/30" : "border-gray-200 bg-gray-50"}`}>
            <span className="text-gray-400 text-sm">$</span>
            <input
              type="number"
              value={customAmount}
              onChange={(e) => { setCustomAmount(e.target.value); setSelectedTip(null); }}
              placeholder="Custom amount"
              className="flex-1 bg-transparent text-gray-900 text-sm outline-none placeholder:text-gray-300"
            />
          </div>

          <input
            type="text"
            value={tipperName}
            onChange={(e) => setTipperName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-gray-300 mb-3"
          />

          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell Marcus what you loved... (optional)"
            rows={2}
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-gray-300 resize-none mb-4"
          />

          <button
            onClick={sendTip}
            disabled={tipAmount <= 0 || loading}
            className="w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200 disabled:opacity-50"
            style={{
              background: tipAmount > 0 ? "#C9A96E" : "#E5E7EB",
              color:      tipAmount > 0 ? "#111111" : "#9CA3AF",
              boxShadow:  tipAmount > 0 ? "0 4px 20px rgba(201,169,110,0.3)" : "none",
            }}
          >
            {loading ? "Redirecting to payment..." : tipAmount > 0 ? `Send $${tipAmount} tip →` : "Choose an amount"}
          </button>

          <p className="text-center text-xs text-gray-300 mt-3">Powered by Stripe · 100% goes to Marcus</p>
        </div>

        {/* ── Extras ───────────────────────────────────────── */}
        <div className="mb-5">
          <p className="text-gray-900 font-semibold text-base mb-3">From Marcus&apos;s kitchen</p>
          <div className="space-y-2.5">
            {EXTRAS.map((e) => (
              <div key={e.title} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center gap-4">
                <span className="text-2xl flex-shrink-0">{e.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-900 text-sm font-medium truncate">{e.title}</p>
                  <p className="text-gray-400 text-xs">{e.tag}</p>
                </div>
                <button className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition-all" style={{ background: "#FEF3E2", color: "#C9A96E" }}>
                  ${e.price}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── QR Share ─────────────────────────────────────── */}
        <div className="mb-5">
          <p className="text-gray-900 font-semibold text-base mb-3">Share this page</p>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-5">
            <div id="profile-qr-canvas" className="flex-shrink-0 p-2 bg-gray-50 rounded-xl border border-gray-100">
              <QRCodeCanvas value={`https://tipachef.com/${params.slug}`} size={72} fgColor="#111111" bgColor="#FFFFFF" level="M" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-900 font-semibold text-sm mb-0.5">tipachef.com/{params.slug}</p>
              <p className="text-gray-400 text-xs mb-3">Scan to tip Marcus from anywhere</p>
              <div className="flex gap-2 flex-wrap">
                <a href="https://instagram.com" className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-amber-300 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
                  Share
                </a>
                <button onClick={copyLink} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-amber-300 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                  {linkCopied ? "Copied!" : "Copy link"}
                </button>
                <button onClick={downloadQR} className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-amber-300 transition-all">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Supporter wall ───────────────────────────────── */}
        <div>
          <p className="text-gray-900 font-semibold text-base mb-3">Wall of love</p>
          <div className="space-y-2.5">
            {SUPPORTERS.map((s) => (
              <div key={s.name} className="bg-white rounded-2xl px-4 py-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-700">{s.name[0]}</div>
                  <p className="text-gray-900 text-sm font-medium">{s.name}</p>
                  <span className="text-xs font-semibold text-amber-600 ml-auto">${s.amount}</span>
                  <span className="text-xs text-gray-300">{s.time}</span>
                </div>
                <p className="text-gray-500 text-sm italic leading-relaxed">&ldquo;{s.message}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
