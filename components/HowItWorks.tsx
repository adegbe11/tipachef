const STEPS = [
  {
    n:    "01",
    head: "Create your free profile",
    body: "Build your chef page in 2 minutes. Your story, your dishes, your QR. No card required.",
  },
  {
    n:    "02",
    head: "Display your QR code",
    body: "Put it on the table, share it on social, hand it out at events. Diners scan — no app on their end.",
  },
  {
    n:    "03",
    head: "Get paid. Instantly.",
    body: "Tips land in your account within minutes. 100% to you. No 30-day hold, no management cut.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="content-container">

        <p className="eyebrow mb-4">How it works</p>
        <h2
          className="font-display text-ivory leading-tight mb-16 max-w-xl"
          style={{ fontSize: "clamp(1.9rem, 3.5vw, 2.8rem)", fontWeight: 300 }}
        >
          Simple for every chef.{" "}
          <span className="text-ember-gradient italic">Instant for every tipper.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/5">
          {STEPS.map((s) => (
            <div key={s.n} className="flex flex-col gap-5 p-8 md:p-10" style={{ background: "#0D0A06" }}>
              <span
                className="font-display text-ember/30 leading-none"
                style={{ fontSize: "3.5rem", fontWeight: 300 }}
              >
                {s.n}
              </span>
              <div>
                <p className="font-sans text-ivory font-semibold text-base mb-2">{s.head}</p>
                <p className="font-sans text-ivory/45 text-sm leading-relaxed">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
