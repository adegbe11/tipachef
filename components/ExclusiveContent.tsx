"use client";

import { useEffect, useRef, useState } from "react";

const POSTS = [
  {
    chef:     "Marco Esposito",
    emoji:    "🇮🇹",
    title:    "My 48-hour lamb shoulder — the recipe I've never written down",
    type:     "Recipe PDF",
    locked:   true,
    tier:     "Recipe Lover",
    preview:  "The secret is in the bark. After two days in the smoke, you fold in a compound butter that...",
    likes:    284,
    time:     "2h ago",
  },
  {
    chef:     "Nikos Stavridis",
    emoji:    "🇬🇷",
    title:    "Greek milk bread — the loaf that took me 3 years to perfect",
    type:     "Cook-along video",
    locked:   true,
    tier:     "Foodie",
    preview:  "The tangzhong method changes everything. Here's exactly how I temper the temperature...",
    likes:    431,
    time:     "Yesterday",
  },
  {
    chef:     "Mehmet Yilmaz",
    emoji:    "🇹🇷",
    title:    "Behind the menu — how we design a seasonal tasting course",
    type:     "Behind the scenes",
    locked:   false,
    tier:     null,
    preview:  "Every dish on the new menu started with a walk through the market at 5am. I photograph everything I see and...",
    likes:    192,
    time:     "3 days ago",
  },
  {
    chef:     "Sofia Ricci",
    emoji:    "🇮🇹",
    title:    "Cacio e pepe — why yours is wrong and how to fix it",
    type:     "Recipe PDF",
    locked:   true,
    tier:     "Recipe Lover",
    preview:  "The pasta water is not a seasoning. It's a sauce. You have to build the emulsion before...",
    likes:    619,
    time:     "4 days ago",
  },
  {
    chef:     "Alessandro Ferri",
    emoji:    "🇮🇹",
    title:    "Mediterranean spice sourcing — my personal supplier list",
    type:     "Resource",
    locked:   true,
    tier:     "Chef's Patron",
    preview:  "I spent six months building relationships with three importers who grow and dry everything themselves...",
    likes:    347,
    time:     "1 week ago",
  },
  {
    chef:     "Eleni Papadaki",
    emoji:    "🇬🇷",
    title:    "Fermentation diary — 30 days building our house kimchi",
    type:     "Video series",
    locked:   false,
    tier:     null,
    preview:  "Day 1. The napa cabbage is prepped, the gochugaru has arrived. This is the beginning of something...",
    likes:    208,
    time:     "2 weeks ago",
  },
];

const TYPE_COLORS: Record<string, string> = {
  "Recipe PDF":        "text-ember bg-ember/10 border-ember/20",
  "Cook-along video":  "text-blue-400 bg-blue-400/10 border-blue-400/20",
  "Behind the scenes": "text-purple-400 bg-purple-400/10 border-purple-400/20",
  "Resource":          "text-green-400 bg-green-400/10 border-green-400/20",
  "Video series":      "text-pink-400 bg-pink-400/10 border-pink-400/20",
};

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("visible"),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function ExclusiveContent() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);
  const [filter, setFilter] = useState<"all" | "free" | "members">("all");

  const visible = filter === "all" ? POSTS
    : filter === "free" ? POSTS.filter((p) => !p.locked)
    : POSTS.filter((p) => p.locked);

  return (
    <section className="py-28 md:py-36 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4">Exclusive content</p>
            <h2 ref={headRef} className="reveal font-display text-ivory leading-tight"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 300 }}>
              Unlock the recipes{" "}
              <span className="text-ember-gradient italic">behind the magic.</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {(["all", "free", "members"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`press text-xs font-sans font-medium px-4 py-2 rounded-full transition-all duration-200 capitalize tracking-wide ${
                  filter === f ? "bg-ember text-graphite" : "glass text-ivory/50 hover:text-ivory"
                }`}>
                {f === "members" ? "Members only" : f === "free" ? "Free" : "All posts"}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((post, i) => (
            <div key={post.title}
              className={`reveal glass rounded-2xl overflow-hidden hover:border-ember/20 transition-all duration-300 group ${
                post.locked ? "opacity-90 hover:opacity-100" : ""
              }`}
              style={{ transitionDelay: `${i * 0.07}s` }}>

              {/* Header */}
              <div className="p-5 pb-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{post.emoji}</span>
                    <div>
                      <p className="font-sans text-ivory text-xs font-medium">{post.chef}</p>
                      <p className="font-sans text-ivory/30 text-xs">{post.time}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-sans font-medium px-2.5 py-1 rounded-full border ${TYPE_COLORS[post.type] || "text-ivory/40 bg-white/5 border-white/10"}`}>
                    {post.type}
                  </span>
                </div>

                <h4 className="font-display text-ivory leading-snug mb-3 group-hover:text-ember-light transition-colors duration-300"
                  style={{ fontSize: "1.05rem", fontWeight: 400 }}>
                  {post.title}
                </h4>
              </div>

              {/* Preview with lock overlay */}
              <div className="relative px-5 pb-5">
                <p className={`font-sans text-ivory/45 text-xs leading-relaxed ${post.locked ? "line-clamp-2" : "line-clamp-3"}`}>
                  {post.preview}
                </p>

                {post.locked && (
                  <div className="mt-4 glass rounded-xl p-3.5 flex items-center gap-3 border border-ember/15">
                    <div className="w-8 h-8 rounded-full bg-ember/15 border border-ember/25 flex items-center justify-center flex-shrink-0">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-ivory/70 text-xs font-medium">Members only</p>
                      <p className="font-sans text-ivory/35 text-xs">Tip {post.tier} to unlock</p>
                    </div>
                    <button className="press text-xs font-sans font-semibold text-ember hover:text-ember-light transition-colors whitespace-nowrap">
                      Unlock →
                    </button>
                  </div>
                )}

                {!post.locked && (
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-ivory/30">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                      <span className="text-xs font-sans">{post.likes}</span>
                    </div>
                    <button className="press text-xs font-sans font-medium text-ember/70 hover:text-ember transition-colors">
                      Read more →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
