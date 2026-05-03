"use client";

const ITEMS = [
  { emoji: "🌿", name: "Sarah M.",  amount: "£10", chef: "Marcus T.",  venue: "The Meridian",    city: "London"     },
  { emoji: "🥩", name: "Priya R.",  amount: "£25", chef: "Yuki N.",    venue: "Sora",            city: "Tokyo"      },
  { emoji: "🧂", name: "James K.",  amount: "£5",  chef: "Dom A.",     venue: "Firefly Kitchen", city: "Dublin"     },
  { emoji: "🍷", name: "Mei L.",    amount: "£10", chef: "Carlos R.",  venue: "Carta",           city: "New York"   },
  { emoji: "🌿", name: "Tom B.",    amount: "£3",  chef: "Sophie L.",  venue: "Bistro Velour",   city: "Melbourne"  },
  { emoji: "🥩", name: "David H.",  amount: "£25", chef: "Kwame A.",   venue: "The Larder",      city: "Edinburgh"  },
  { emoji: "🧂", name: "Ananya S.", amount: "£5",  chef: "Lena K.",    venue: "Studio Kitchen",  city: "Amsterdam"  },
  { emoji: "🍷", name: "Marco V.",  amount: "£15", chef: "Nina P.",    venue: "Ember & Salt",    city: "Rome"       },
];

function TickerItem({ item }: { item: typeof ITEMS[0] }) {
  return (
    <div className="flex items-center gap-3 px-6 flex-shrink-0">
      <span className="text-base leading-none">{item.emoji}</span>
      <span className="font-sans text-sm text-ivory/50">
        <span className="text-ivory/75 font-medium">{item.name}</span>
        {" "}tipped{" "}
        <span className="text-ember font-medium">{item.chef}</span>
        {" · "}
        <span className="text-ivory/40">{item.venue}</span>
        {" · "}
        <span className="font-display text-ember font-light" style={{ fontSize: "1rem" }}>{item.amount}</span>
      </span>
      <span className="text-ivory/15 text-xs select-none mx-2">·</span>
    </div>
  );
}

export default function Ticker() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="relative border-y border-white/5 overflow-hidden bg-charcoal/30 py-3.5">
      {/* Edge fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #1E1E1E, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #1E1E1E, transparent)" }} />

      {/* Row 1 — left */}
      <div className="flex w-max" style={{ animation: "tickerLeft 35s linear infinite" }}>
        {doubled.map((item, i) => (
          <TickerItem key={`a-${i}`} item={item} />
        ))}
      </div>

      {/* Row 2 — right */}
      <div className="flex w-max mt-2.5" style={{ animation: "tickerRight 40s linear infinite" }}>
        {[...doubled].reverse().map((item, i) => (
          <TickerItem key={`b-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
