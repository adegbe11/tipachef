const DINERS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    label: "Discover chefs",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    label: "View their story & dishes",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
    ),
    label: "Send a tip instantly",
  },
];

const CHEFS = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    label: "Create a profile",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    label: "Share your story & dishes",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/>
        <line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    label: "Receive tips directly",
  },
];

function StepColumn({ n, icon, label }: { n: string; icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-ember/10 border border-ember/20 flex items-center justify-center text-ember">
        {icon}
      </div>
      <p className="font-sans text-ivory text-sm font-medium text-center leading-snug max-w-[130px]">
        {label}
      </p>
      <span className="font-display text-ember/25 text-xs tracking-widest">{n}</span>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-36">
      <div className="content-container text-center">

        <p className="eyebrow mb-4">How it works</p>
        <h2
          className="font-display text-ivory leading-tight mb-16"
          style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
        >
          Simple for every chef.{" "}
          <span className="text-ember-gradient italic">Instant for every tipper.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-0 max-w-2xl mx-auto">

          {/* Diners */}
          <div className="flex flex-col items-center pb-12 md:pb-0 md:pr-12 border-b border-white/5 md:border-b-0 md:border-r md:border-white/5">
            <p className="eyebrow text-ivory/30 mb-10" style={{ fontSize: "0.65rem" }}>For diners</p>
            <div className="flex flex-col gap-10 w-full items-center">
              {DINERS.map((s, i) => (
                <StepColumn key={s.label} n={`0${i + 1}`} icon={s.icon} label={s.label} />
              ))}
            </div>
          </div>

          {/* Chefs */}
          <div className="flex flex-col items-center pt-12 md:pt-0 md:pl-12">
            <p className="eyebrow text-ivory/30 mb-10" style={{ fontSize: "0.65rem" }}>For chefs</p>
            <div className="flex flex-col gap-10 w-full items-center">
              {CHEFS.map((s, i) => (
                <StepColumn key={s.label} n={`0${i + 1}`} icon={s.icon} label={s.label} />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
