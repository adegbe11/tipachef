import Link from "next/link";

export default function DownloadCTA() {
  return (
    <section className="py-24 md:py-36 bg-charcoal/30">
      <div className="content-container">

        {/* Section label */}
        <p className="eyebrow text-center mb-12">Get started</p>

        {/* Two tiles */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* Tile 1 — Supporters */}
          <div className="flex flex-col justify-between rounded-2xl bg-charcoal border border-white/[0.07] p-10 min-h-[280px] hover:border-white/[0.14] transition-colors duration-300">
            <div>
              <p className="font-sans text-ivory/35 text-xs font-medium tracking-widest uppercase mb-5">For supporters</p>
              <h3
                className="font-display text-ivory leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 300 }}
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
              className="press mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-200 shadow-lg shadow-ember/20 self-start"
            >
              Find a chef
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>

          {/* Tile 2 — Chefs */}
          <div className="flex flex-col justify-between rounded-2xl border border-ember/25 bg-ember/[0.04] p-10 min-h-[280px] hover:border-ember/40 hover:bg-ember/[0.07] transition-all duration-300">
            <div>
              <p className="font-sans text-ember/60 text-xs font-medium tracking-widest uppercase mb-5">For chefs</p>
              <h3
                className="font-display text-ivory leading-tight mb-4"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", fontWeight: 300 }}
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
                className="press inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-ember text-graphite font-sans font-semibold text-sm tracking-wide hover:bg-ember-light transition-all duration-200 shadow-lg shadow-ember/25"
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
