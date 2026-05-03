"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  { value: 2400,  suffix: "+", label: "Chefs earning",        isDecimal: false },
  { value: 380,   suffix: "+", label: "Partner restaurants",  isDecimal: false },
  { value: 47,    suffix: "",  label: "Avg. tip earned ($)",   isDecimal: false },
  { value: 4.9,   suffix: "",  label: "App store rating",      isDecimal: true  },
];

function useCountUp(target: number, isDecimal: boolean, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 1800;
    const steps    = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(isDecimal ? parseFloat((eased * target).toFixed(1)) : Math.floor(eased * target));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [active, target, isDecimal]);
  return count;
}

function StatItem({ value, suffix, label, isDecimal, active, index }: {
  value: number; suffix: string; label: string; isDecimal?: boolean; active: boolean; index: number;
}) {
  const count = useCountUp(value, !!isDecimal, active);
  // On mobile (2-col grid): add bottom border to top row (indices 0,1) and right border to left col (indices 0,2)
  // On md+: revert to divide-x handled by parent
  const borderClasses = [
    index === 0 ? "border-b border-r border-white/5 md:border-b-0 md:border-r-0" : "",
    index === 1 ? "border-b border-white/5 md:border-b-0" : "",
    index === 2 ? "border-r border-white/5 md:border-r-0" : "",
    index === 3 ? "" : "",
  ][index] ?? "";
  return (
    <div className={`flex flex-col items-center text-center px-8 py-6 ${borderClasses}`}>
      <span className="font-display text-ember leading-none mb-1" style={{ fontSize: "clamp(2.2rem, 4vw, 3.2rem)", fontWeight: 300 }}>
        {isDecimal ? count.toFixed(1) : count.toLocaleString()}{suffix}
      </span>
      <span className="eyebrow text-ivory/40 mt-1">{label}</span>
    </div>
  );
}

export default function StatsBar() {
  const ref    = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative border-y border-white/5 bg-charcoal/40">
      <div className="gold-line absolute top-0 left-0 right-0" />
      <div className="max-w-7xl wide:max-w-[1400px] mx-auto px-4 xs:px-5 md:px-6 wide:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/5">
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} active={active} index={i} />
          ))}
        </div>
      </div>
      <div className="gold-line absolute bottom-0 left-0 right-0" />
    </div>
  );
}
