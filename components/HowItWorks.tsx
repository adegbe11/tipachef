"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    n: "01",
    title: "Create your free profile",
    body:  "Build your chef page in 2 minutes. Your story, your dishes, your QR. No card required.",
  },
  {
    n: "02",
    title: "Display your QR code",
    body:  "Put it on the table, share it on social, hand it out at events. Diners scan — no app on their end.",
  },
  {
    n: "03",
    title: "Get paid. Instantly.",
    body:  "Tips land in your account within minutes. 100% to you. No 30-day hold, no management cut.",
  },
];

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && el.classList.add("visible"),
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
}

export default function HowItWorks() {
  const headRef = useRef<HTMLHeadingElement>(null);
  useReveal(headRef as React.RefObject<HTMLElement>);

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: "radial-gradient(circle, #C9A96E 0%, transparent 70%)" }}
      />

      <div className="max-w-4xl mx-auto px-4 xs:px-5 md:px-6">
        <p className="eyebrow mb-4">Get set up in minutes</p>
        <h2
          ref={headRef}
          className="reveal fluid-heading font-display text-ivory leading-tight mb-12"
          style={{ fontWeight: 300 }}
        >
          Three steps to start{" "}
          <span className="text-ember-gradient italic">earning directly.</span>
        </h2>

        <div className="space-y-0">
          {STEPS.map((step, i) => (
            <div
              key={step.n}
              className={`flex items-start gap-6 py-7 ${i < STEPS.length - 1 ? "border-b border-white/5" : ""}`}
            >
              <span className="font-display text-ember/30 text-4xl font-light leading-none flex-shrink-0 w-14 text-right">
                {step.n}
              </span>
              <div>
                <h3 className="font-sans text-ivory font-medium text-base mb-1">{step.title}</h3>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed font-light">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
