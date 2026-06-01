// Direct Answer box. Sits right under the hero/byline, before sub-sections.
// Optimized for Google AI Overviews: a short, self-contained answer (50-70
// words) to the single most likely search intent, under a question heading
// that mirrors a real "People Also Ask" query. AI Overviews extract answers
// from question+answer adjacency pairs, so this shape raises citation odds.

interface Props {
  question: string;
  answer: string;
}

export default function DirectAnswer({ question, answer }: Props) {
  return (
    <section
      aria-label="Quick answer"
      style={{
        background: "rgba(201,169,110,0.05)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderLeft: "4px solid #C9A96E",
        borderRadius: 16,
        padding: "22px 24px",
        marginBottom: 32,
      }}
    >
      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A96E", margin: "0 0 8px" }}>
        Quick answer
      </p>
      <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 400, letterSpacing: "-0.01em", color: "#FAF8F4", margin: "0 0 10px", lineHeight: 1.2 }}>
        {question}
      </h2>
      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: 15.5, lineHeight: 1.65, color: "rgba(250,248,244,0.6)", fontWeight: 400, margin: 0 }}>
        {answer}
      </p>
    </section>
  );
}
