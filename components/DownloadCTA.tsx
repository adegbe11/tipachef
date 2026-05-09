import Link from "next/link";

export default function DownloadCTA() {
  return (
    <section className="py-14 md:py-20" style={{ background:"linear-gradient(180deg,#0f0e0b 0%,#0a0908 100%)" }}>
      <div className="content-container">

        <p className="eyebrow text-center mb-14">Get started</p>

        <div className="grid md:grid-cols-2 gap-5">

          {/* Tile 1 — Supporters */}
          <div
            className="neo-glass flex flex-col justify-between rounded-2xl p-10 min-h-[300px]"
          >
            <div>
              <p className="font-sans text-ivory/35 text-xs font-semibold tracking-widest uppercase mb-5">For supporters</p>
              <h3
                className="font-display text-ivory leading-tight mb-4"
                style={{ fontSize:"clamp(1.7rem, 2.5vw, 2.3rem)", fontWeight:400 }}
              >
                Start supporting<br />
                <span className="text-ember-gradient italic">chefs today.</span>
              </h3>
              <p className="font-sans text-ivory/40 text-sm leading-relaxed font-light max-w-xs">
                Find a chef, scan a QR, send a tip. No account needed on your side.
              </p>
            </div>
            <Link
              href="/search"
              className="brutal-btn press mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-graphite font-sans font-bold text-sm tracking-wide hover:bg-ember-light transition-colors duration-200 self-start"
            >
              Find a chef
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Tile 2 — Chefs (stronger ember treatment) */}
          <div
            className="brutal-card flex flex-col justify-between rounded-2xl p-10 min-h-[300px]"
            style={{
              background:"linear-gradient(145deg,rgba(201,169,110,0.08) 0%,rgba(201,169,110,0.03) 100%)",
              backdropFilter:"blur(24px)",
              WebkitBackdropFilter:"blur(24px)",
            }}
          >
            {/* Ember glow top-right */}
            <div style={{ position:"absolute", top:"-20px", right:"-20px", width:"140px", height:"140px", background:"radial-gradient(circle,rgba(201,169,110,0.15) 0%,transparent 70%)", filter:"blur(30px)", pointerEvents:"none" }} />
            <div>
              <p className="font-sans text-ember/70 text-xs font-semibold tracking-widest uppercase mb-5">For chefs</p>
              <h3
                className="font-display text-ivory leading-tight mb-4"
                style={{ fontSize:"clamp(1.7rem, 2.5vw, 2.3rem)", fontWeight:400 }}
              >
                Create your chef<br />
                <span className="text-ember-gradient italic">profile in minutes.</span>
              </h3>
              <p className="font-sans text-ivory/40 text-sm leading-relaxed font-light max-w-xs">
                Set up your page, get your QR code, and start receiving tips today.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 items-start">
              <Link
                href="/signup"
                className="brutal-btn press inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-graphite font-sans font-bold text-sm tracking-wide hover:bg-ember-light transition-colors duration-200"
              >
                Create your profile
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <p className="font-sans text-ivory/25 text-xs">
                Already have a profile?{" "}
                <Link href="/login" className="text-ivory/40 hover:text-ember transition-colors underline underline-offset-2">
                  Sign in
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
