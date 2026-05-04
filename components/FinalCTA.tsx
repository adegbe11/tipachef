export default function FinalCTA() {
  return (
    <section className="py-28 md:py-40 relative overflow-hidden" style={{ background: "#0D0A06" }}>
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.07), transparent 70%)" }}
      />
      <div className="gold-line absolute top-0 left-0 right-0" />

      <div className="content-container text-center relative z-10">
        <p className="eyebrow mb-6">Join the kitchen</p>

        <h2
          className="font-display text-ivory leading-tight mb-6"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 300 }}
        >
          Your craft.{" "}
          <span className="text-ember-gradient italic">Finally rewarded.</span>
        </h2>

        <p className="font-sans text-ivory/45 text-lg mb-12 max-w-sm mx-auto">
          Join free. Get tipped. Keep cooking.
        </p>

        <a
          href="/signup"
          className="inline-flex items-center gap-2.5 px-10 py-5 rounded-full font-sans font-semibold text-base transition-all duration-300"
          style={{
            background:  "#C9A84C",
            color:       "#0D0A06",
            boxShadow:   "0 12px 40px rgba(201,168,76,0.35)",
          }}
        >
          Get started free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

        <p className="font-sans text-ivory/20 text-xs mt-6">
          No credit card required · Free forever · Takes 2 minutes
        </p>
      </div>
    </section>
  );
}
