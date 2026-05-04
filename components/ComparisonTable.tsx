const ROWS = [
  { feature: "100% tip goes to chef",             us: true,  bmac: false, patreon: false },
  { feature: "Restaurant QR integration",          us: true,  bmac: false, patreon: false },
  { feature: "Back-of-house kitchen tipping",      us: true,  bmac: false, patreon: false },
  { feature: "Instant payouts",                    us: true,  bmac: false, patreon: false },
  { feature: "Chef-specific profiles",             us: true,  bmac: false, patreon: false },
  { feature: "Monthly memberships",                us: true,  bmac: true,  patreon: true  },
  { feature: "Free to sign up",                    us: true,  bmac: true,  patreon: true  },
  { feature: "We never email your supporters",     us: true,  bmac: false, patreon: false },
  { feature: "Human customer support",             us: true,  bmac: false, patreon: false },
];

function Tick({ yes }: { yes: boolean }) {
  return yes ? (
    <div className="mx-auto w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(201,168,76,0.15)" }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  ) : (
    <div className="mx-auto w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.04)" }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </div>
  );
}

export default function ComparisonTable() {
  return (
    <section className="py-24 md:py-32">
      <div className="content-container">

        <p className="eyebrow mb-4">Why us</p>
        <h2
          className="font-display text-ivory leading-tight mb-4 max-w-lg"
          style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
        >
          Built for chefs.{" "}
          <span className="text-ember-gradient italic">Not content creators.</span>
        </h2>
        <p className="font-sans text-ivory/40 text-base mb-14 max-w-md">
          Patreon and Buy Me a Coffee were built for YouTubers. We were built for the pass.
        </p>

        <div className="rounded-3xl overflow-hidden border border-white/[0.06]">
          {/* Header */}
          <div className="grid grid-cols-4 border-b border-white/[0.06]" style={{ background: "#15100A" }}>
            <div className="px-6 py-4 col-span-1" />
            {["Tip a Chef", "Buy Me a Coffee", "Patreon"].map((name, i) => (
              <div key={name} className="px-4 py-4 text-center border-l border-white/[0.06]">
                <p
                  className="font-sans text-sm font-semibold"
                  style={{ color: i === 0 ? "#C9A84C" : "rgba(255,255,255,0.35)" }}
                >
                  {name}
                </p>
              </div>
            ))}
          </div>

          {/* Rows */}
          {ROWS.map((row, idx) => (
            <div
              key={row.feature}
              className="grid grid-cols-4 border-b border-white/[0.04] last:border-0"
              style={{ background: idx % 2 === 0 ? "#0D0A06" : "#0f0c07" }}
            >
              <div className="px-6 py-4 flex items-center">
                <p className="font-sans text-ivory/60 text-sm">{row.feature}</p>
              </div>
              {[row.us, row.bmac, row.patreon].map((val, i) => (
                <div key={i} className="px-4 py-4 flex items-center justify-center border-l border-white/[0.04]">
                  <Tick yes={val} />
                </div>
              ))}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
