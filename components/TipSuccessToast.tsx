"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function TipSuccessToast() {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const [visible, setVisible] = useState(false);
  const [amount,  setAmount]  = useState<number | null>(null);

  useEffect(() => {
    const tip    = searchParams.get("tip");
    const cents  = searchParams.get("amount");
    if (tip === "success") {
      setAmount(cents ? Math.round(parseInt(cents, 10) / 100) : null);
      setVisible(true);
      // Clear the query params from the URL without reload
      const url = new URL(window.location.href);
      url.searchParams.delete("tip");
      url.searchParams.delete("amount");
      window.history.replaceState({}, "", url.toString());
      // Auto-dismiss after 5 s
      setTimeout(() => setVisible(false), 5000);
    }
  }, [searchParams]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce-once">
      <div className="flex items-center gap-3 bg-gray-900 text-white px-5 py-4 rounded-2xl shadow-2xl shadow-black/30">
        <div className="w-8 h-8 rounded-full bg-amber-400/20 flex items-center justify-center flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">
            {amount ? `$${amount} tip sent!` : "Tip sent!"}
          </p>
          <p className="text-white/50 text-xs mt-0.5">Thank you so much 🙏</p>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-white/30 hover:text-white/70 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
