"use client";

import { useState } from "react";

const TIP_AMOUNTS = [
  { emoji: "🧂", label: "A pinch of sea salt",   amount: 3  },
  { emoji: "🌿", label: "A bunch of fresh herbs", amount: 5  },
  { emoji: "🍷", label: "A glass of good wine",   amount: 10 },
  { emoji: "🥩", label: "Tonight's wagyu cut",    amount: 25 },
];

interface TipCardProps {
  chefSlug: string;
  chefName: string;
}

export default function TipCard({ chefSlug, chefName }: TipCardProps) {
  const [selectedTip,  setSelectedTip]  = useState<number | null>(1);
  const [customAmount, setCustomAmount] = useState("");
  const [message,      setMessage]      = useState("");
  const [tipperName,   setTipperName]   = useState("");
  const [loading,      setLoading]      = useState(false);

  const tipAmount = customAmount
    ? parseFloat(customAmount)
    : selectedTip !== null
    ? TIP_AMOUNTS[selectedTip].amount
    : 0;

  const firstName = chefName.split(" ")[0];

  async function sendTip() {
    if (tipAmount <= 0) return;
    setLoading(true);
    try {
      const res  = await fetch("/api/tips", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({
          chefSlug,
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

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 mb-5">
      <p className="text-gray-900 font-semibold text-base mb-4">Send {firstName} a tip</p>

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
        placeholder={`Tell ${firstName} what you loved... (optional)`}
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

      <p className="text-center text-xs text-gray-300 mt-3">Powered by Stripe · 100% goes to {firstName}</p>
    </div>
  );
}
