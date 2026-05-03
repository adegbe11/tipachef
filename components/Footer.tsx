import Link from "next/link";

const BOTTOM_LINKS = [
  { label: "Help",            href: "/help"                          },
  { label: "Contact",         href: "/contact"                       },
  { label: "Instagram",       href: "https://instagram.com/tipachef" },
  { label: "X (Twitter)",     href: "https://twitter.com/tipachef"   },
  { label: "Privacy & Terms", href: "/privacy"                       },
  { label: "About",           href: "/about"                         },
];

export default function Footer() {
  return (
    <footer className="bg-graphite border-t border-white/[0.06] overflow-hidden">

      <div className="pt-8 pb-0 leading-none select-none overflow-hidden">
        <p
          className="font-sans font-black text-ember text-center whitespace-nowrap"
          style={{ fontSize: "18.5vw", lineHeight: 0.85, letterSpacing: "-0.02em" }}
        >
          TIP A CHEF
        </p>
      </div>

      <div className="px-2 py-6 flex items-center justify-center gap-8">
        {BOTTOM_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="font-sans text-ivory/35 text-xs hover:text-ivory transition-colors duration-200 whitespace-nowrap"
          >
            {l.label}
          </Link>
        ))}
      </div>

    </footer>
  );
}
