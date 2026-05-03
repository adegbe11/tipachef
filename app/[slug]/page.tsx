import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import TipCard from "@/components/TipCard";
import ChefShare from "@/components/ChefShare";

interface Chef {
  id: string;
  slug: string;
  name: string | null;
  role: string | null;
  restaurant: string | null;
  hook: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  goal_label: string | null;
  goal_target: number;
  goal_current: number;
  instagram_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
}

interface Tip {
  id: string;
  amount_cents: number;
  message: string | null;
  tipper_name: string | null;
  created_at: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)   return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)    return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default async function ChefProfile({ params }: { params: { slug: string } }) {
  const supabase = await createClient();

  // Fetch chef by slug
  const { data: chef, error } = await supabase
    .from("chefs")
    .select("*")
    .eq("slug", params.slug.toLowerCase())
    .single();

  if (error || !chef) notFound();

  const chefData = chef as Chef;

  // Fetch recent tips (public messages only)
  const { data: tips } = await supabase
    .from("tips")
    .select("id, amount_cents, message, tipper_name, created_at")
    .eq("chef_id", chefData.id)
    .not("message", "is", null)
    .order("created_at", { ascending: false })
    .limit(10);

  const recentTips = (tips ?? []) as Tip[];
  const goalPct    = chefData.goal_target > 0
    ? Math.min(100, Math.round((chefData.goal_current / chefData.goal_target) * 100))
    : 0;

  const displayName = chefData.name || chefData.slug;
  const firstName   = displayName.split(" ")[0];

  const socials = [
    chefData.instagram_url && {
      href: chefData.instagram_url,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
        </svg>
      ),
    },
    chefData.tiktok_url && {
      href: chefData.tiktok_url,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#111" stroke="none">
          <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.75a4.85 4.85 0 01-1-.06z"/>
        </svg>
      ),
    },
    chefData.youtube_url && {
      href: chefData.youtube_url,
      icon: (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="none">
          <path d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 002.1 2.1C4.5 20.5 12 20.5 12 20.5s7.5 0 9.4-.6a3 3 0 002.1-2.1C24 15.9 24 12 24 12s0-3.9-.5-5.8z" fill="#FF0000"/>
          <path d="M9.8 15.5V8.5l6.4 3.5-6.4 3.5z" fill="white"/>
        </svg>
      ),
    },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Cover + Avatar */}
      <div className="relative h-52 md:h-64 w-full overflow-hidden bg-graphite">
        {chefData.cover_url ? (
          <Image src={chefData.cover_url} alt="" fill className="object-cover object-top opacity-40" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/60 to-gray-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50" />
        <Link href="/" className="absolute top-4 left-4 flex items-center gap-2 text-white/70 hover:text-white text-sm transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Tip a Chef
        </Link>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-20 -mt-16 relative z-10">

        {/* Identity */}
        <div className="flex items-end gap-4 mb-6">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0 bg-amber-50">
            {chefData.avatar_url ? (
              <Image src={chefData.avatar_url} alt={displayName} width={96} height={96} className="object-cover object-top w-full h-full" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-amber-700">
                {displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="mb-1 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-gray-900 font-semibold text-xl leading-tight">{displayName}</h1>
              <span className="text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full flex-shrink-0">● Live</span>
            </div>
            {(chefData.role || chefData.restaurant) && (
              <p className="text-gray-500 text-sm">
                {[chefData.role, chefData.restaurant].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
          {socials.length > 0 && (
            <div className="flex items-center gap-2 mb-1 flex-shrink-0">
              {socials.map((s, i) => s && (
                <a key={i} href={s.href} className="w-8 h-8 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:border-amber-300 transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        {chefData.hook && (
          <p className="text-gray-600 text-sm leading-relaxed mb-6">{chefData.hook}</p>
        )}

        {/* Goal bar */}
        {chefData.goal_label && chefData.goal_target > 0 && (
          <div className="bg-white rounded-2xl p-4 mb-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-900 text-sm font-medium">🎯 {chefData.goal_label}</p>
              <p className="text-xs text-gray-400">${chefData.goal_current} of ${chefData.goal_target}</p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${goalPct}%`, background: "#C9A96E" }} />
            </div>
            <p className="text-xs text-gray-400 mt-1.5">{goalPct}% funded · ${chefData.goal_target - chefData.goal_current} to go</p>
          </div>
        )}

        {/* Tip card (client component) */}
        <TipCard chefSlug={params.slug} chefName={displayName} />

        {/* Share + QR (client component) */}
        <ChefShare slug={params.slug} chefName={displayName} />

        {/* Wall of love */}
        {recentTips.length > 0 && (
          <div>
            <p className="text-gray-900 font-semibold text-base mb-3">Wall of love</p>
            <div className="space-y-2.5">
              {recentTips.map((t) => (
                <div key={t.id} className="bg-white rounded-2xl px-4 py-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-xs font-bold text-amber-700">
                      {(t.tipper_name ?? "A")[0].toUpperCase()}
                    </div>
                    <p className="text-gray-900 text-sm font-medium">{t.tipper_name ?? "Anonymous"}</p>
                    <span className="text-xs font-semibold text-amber-600 ml-auto">${(t.amount_cents / 100).toFixed(0)}</span>
                    <span className="text-xs text-gray-300">{timeAgo(t.created_at)}</span>
                  </div>
                  {t.message && (
                    <p className="text-gray-500 text-sm italic leading-relaxed">&ldquo;{t.message}&rdquo;</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state for new chefs */}
        {recentTips.length === 0 && (
          <div className="text-center py-8">
            <p className="text-2xl mb-2">👨‍🍳</p>
            <p className="text-gray-400 text-sm">Be the first to show {firstName} some love.</p>
          </div>
        )}
      </div>
    </div>
  );
}
