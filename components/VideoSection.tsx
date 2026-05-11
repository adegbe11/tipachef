export default function VideoSection() {
  return (
    <section
      className="py-14 md:py-20"
      style={{ background: "linear-gradient(180deg,#0d0c0a 0%,#0f0e0b 100%)" }}
    >
      <div className="content-container">

        {/* Header */}
        <div className="text-center mb-10">
          <p className="eyebrow mb-4">See it in action</p>
          <h2
            className="font-display text-ivory leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 300 }}
          >
            Watch how it works
          </h2>
        </div>

        {/* Video embed */}
        <div
          style={{
            position: "relative",
            maxWidth: "820px",
            margin: "0 auto",
            borderRadius: "24px",
            overflow: "hidden",
            border: "2px solid rgba(201,169,110,0.18)",
            boxShadow:
              "6px 6px 0 rgba(201,169,110,0.08), " +
              "0 40px 80px rgba(0,0,0,0.65), " +
              "inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          {/* Aspect ratio wrapper 16:9 */}
          <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
            <iframe
              src="https://www.youtube.com/embed/vQq_v6-lKdM?rel=0&modestbranding=1&color=white"
              title="Tip a Chef | Chefs Are Finally Getting Tipped Directly"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: "none",
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
