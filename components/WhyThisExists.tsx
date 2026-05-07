export default function WhyThisExists() {
  return (
    <section className="py-28 md:py-44 bg-graphite relative overflow-hidden">

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(201,169,110,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="content-container max-w-4xl text-center relative">

        {/* Main statement */}
        <div className="space-y-2 mb-10">
          <p
            className="font-display text-ivory leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 300 }}
          >
            The waiter got the tip.
          </p>
          <p
            className="font-display text-ivory leading-tight"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4.2rem)", fontWeight: 300 }}
          >
            You made the meal.
          </p>
          <p
            className="font-display leading-tight italic"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4.2rem)",
              fontWeight: 300,
              background: "linear-gradient(135deg, #C9A96E 0%, #E8C97A 50%, #C9A96E 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            That changes{" "}
            <span style={{ fontWeight: 600, fontStyle: "normal" }}>NOW.</span>
          </p>
        </div>

        {/* Thin rule */}
        <div className="flex items-center gap-4 justify-center mb-10">
          <div className="h-px flex-1 max-w-[60px] bg-ember/20" />
          <div className="w-1.5 h-1.5 rounded-full bg-ember/50" />
          <div className="h-px flex-1 max-w-[60px] bg-ember/20" />
        </div>

        <p
          className="font-sans text-ivory/40 leading-relaxed font-light max-w-sm mx-auto"
          style={{ fontSize: "clamp(0.9rem, 1.2vw, 1rem)" }}
        >
          Direct tips. No middleman. The chef who cooked your meal
          finally gets to hear thank you.
        </p>

      </div>
    </section>
  );
}
