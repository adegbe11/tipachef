"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface TipSuccessToastProps {
  reward?: string | null;
}

export default function TipSuccessToast({ reward }: TipSuccessToastProps) {
  const searchParams = useSearchParams();
  const [visible,       setVisible]       = useState(false);
  const [amount,        setAmount]        = useState<number | null>(null);
  const [showSecret,    setShowSecret]    = useState(false);

  useEffect(() => {
    const tip   = searchParams.get("tip");
    const cents = searchParams.get("amount");
    if (tip === "success") {
      setAmount(cents ? Math.round(parseInt(cents, 10) / 100) : null);
      setVisible(true);
      // Clear the params without reload
      const url = new URL(window.location.href);
      url.searchParams.delete("tip");
      url.searchParams.delete("amount");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop for secret reveal */}
      {showSecret && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSecret(false)}
        />
      )}

      {/* Toast / expanded card */}
      <div
        className="fixed z-50 transition-all duration-500"
        style={{
          bottom:    showSecret ? "50%" : "24px",
          left:      showSecret ? "50%" : "50%",
          transform: showSecret
            ? "translate(-50%, 50%)"
            : "translateX(-50%)",
          width:     showSecret ? "min(92vw, 420px)" : "auto",
        }}
      >
        {showSecret && reward ? (
          /* ── Secret reveal card ── */
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div
              className="px-6 py-5"
              style={{ background: "linear-gradient(135deg,#1a0f00 0%,#2d1a00 100%)" }}
            >
              <div className="flex items-center gap-3 mb-1">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                  style={{ background: "rgba(201,169,110,0.2)" }}
                >
                  🔓
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Unlocked for you</p>
                  <p className="text-white/40 text-xs">A thank-you from the chef</p>
                </div>
                <button
                  onClick={() => { setShowSecret(false); setVisible(false); }}
                  className="ml-auto text-white/30 hover:text-white/70 transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="px-6 py-5">
              <p className="text-gray-800 text-sm leading-relaxed">{reward}</p>
            </div>
          </div>
        ) : (
          /* ── Compact success toast ── */
          <div
            className="flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl whitespace-nowrap"
            style={{ background: "#111", minWidth: "240px" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(201,169,110,0.2)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-white font-semibold text-sm">
                {amount ? `£${amount} tip sent!` : "Tip sent!"} 🙏
              </p>
              {reward && (
                <button
                  onClick={() => setShowSecret(true)}
                  className="text-xs mt-0.5 font-medium"
                  style={{ color: "#C9A96E" }}
                >
                  The chef left you something →
                </button>
              )}
              {!reward && (
                <p className="text-white/40 text-xs">The chef will be thrilled.</p>
              )}
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-white/25 hover:text-white/60 transition-colors ml-1"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
