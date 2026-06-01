// Local initials avatar — no third-party image dependency. Deterministic gold
// tint per name so each editor has a stable, recognizable disc. Avoids the
// CLS, latency, and blocked-host risk of external avatar services.

function initials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function hash(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) & 0xffffffff;
  return Math.abs(h);
}

const TINTS = [
  ["#D4B878", "#1a1208"],
  ["#C9A96E", "#1a1208"],
  ["#E0C896", "#241a0c"],
  ["#B8934A", "#FAF8F4"],
  ["#A8823C", "#FAF8F4"],
] as const;

export default function Avatar({ name, size = 44 }: { name: string; size?: number }) {
  const [bg, fg] = TINTS[hash(name) % TINTS.length];
  return (
    <span
      aria-hidden
      style={{
        width: size,
        height: size,
        flex: "0 0 auto",
        borderRadius: "50%",
        background: `linear-gradient(135deg, ${bg} 0%, ${bg}cc 100%)`,
        color: fg,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-cormorant), Georgia, serif",
        fontWeight: 600,
        fontSize: Math.round(size * 0.4),
        letterSpacing: "0.02em",
        userSelect: "none",
      }}
    >
      {initials(name)}
    </span>
  );
}
