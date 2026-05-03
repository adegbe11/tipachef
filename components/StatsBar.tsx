const PILLARS = [
  { value: "Free to join",  sub: null         },
  { value: "100%",         sub: "Goes to the chef" },
  { value: "2 min",        sub: "To set up"        },
  { value: "Any phone",    sub: "No app needed"    },
];

export default function StatsBar() {
  return (
    <div className="relative border-y border-white/5 bg-charcoal/40">
      <div className="gold-line absolute top-0 left-0 right-0" />
      <div className="content-container">
        <div className="grid grid-cols-2 md:grid-cols-4 md:divide-x md:divide-white/5">
          {PILLARS.map((p, i) => {
            const borderClasses = [
              "border-b border-r border-white/5 md:border-b-0 md:border-r-0",
              "border-b border-white/5 md:border-b-0",
              "border-r border-white/5 md:border-r-0",
              "",
            ][i];
            return (
              <div key={p.value} className={`flex flex-col items-center text-center px-8 py-6 ${borderClasses}`}>
                <span
                  className="font-display text-ember leading-none mb-1"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", fontWeight: 300 }}
                >
                  {p.value}
                </span>
                {p.sub && (
                  <span className="eyebrow text-ivory/40 mt-1">{p.sub}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="gold-line absolute bottom-0 left-0 right-0" />
    </div>
  );
}
