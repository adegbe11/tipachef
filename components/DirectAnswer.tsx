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
        background: "#ffffff",
        borderTop: "1px solid #ececec",
        borderRight: "1px solid #ececec",
        borderBottom: "1px solid #ececec",
        borderLeft: "4px solid #C9A96E",
        borderRadius: 16,
        padding: "22px 24px",
        marginBottom: 8,
      }}
    >
      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#C9A96E", margin: "0 0 8px" }}>
        Quick answer
      </p>
      <h2 style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(20px, 2.6vw, 28px)", fontWeight: 500, letterSpacing: "-0.01em", color: "#111111", margin: "0 0 10px", lineHeight: 1.2 }}>
        {question}
      </h2>
      <p style={{ fontFamily: "-apple-system, system-ui", fontSize: 15.5, lineHeight: 1.65, color: "#555555", fontWeight: 400, margin: 0 }}>
        {answer}
      </p>
    </section>
  );
}
