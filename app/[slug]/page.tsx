import { notFound } from "next/navigation";
import { Suspense } from "react";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { createServerClient } from "@/lib/supabase-server";
import ChefProfileView, { type ChefViewData } from "@/components/ChefProfileView";
import TipSuccessToast from "@/components/TipSuccessToast";

/* ─── Static demo chef data ─────────────────────────────────────────────── */
const DEMO_CHEFS: Record<string, ChefViewData> = {
  "marco-esposito": {
    name:        "Marco Esposito",
    slug:        "marco-esposito",
    role:        "Head Chef",
    restaurant:  "Osteria del Fuoco",
    location:    "Rome, Italy",
    flag:        "🇮🇹",
    hook:        "I grew up watching my nonna fold pasta by hand every Sunday. Thirty years later I am still trying to make something as honest as that.",
    photo:       "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&auto=format&q=85",
    cover:       "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1400&auto=format&q=80",
    tips:        8_240,
    supporters:  312,
    years:       14,
    specialties: ["Pasta fresca", "Risotto nero", "Bistecca fiorentina", "Tiramisu"],
    wall: [
      { name: "Sofia R.",  amount: 25, message: "That carbonara made me cry. Nothing will ever compare.",      time: "2h ago", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&q=80" },
      { name: "Table 12",  amount: 15, message: "Every single bite was a memory I will carry forever.",       time: "5h ago" },
      { name: "Anonymous", amount: 50, message: "Best meal of my life. Thank you Marco.",                     time: "1d ago" },
      { name: "James W.",  amount: 20, message: "Flew to Rome for this. Worth every euro.",                   time: "2d ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&q=80" },
      { name: "Chiara M.", amount: 10, message: "My kids asked to come back before we left the restaurant.",  time: "3d ago", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&q=80" },
    ],
    isDemo: true,
  },
  "dimitri-kostas": {
    name:        "Dimitri Kostas",
    slug:        "dimitri-kostas",
    role:        "Head Chef",
    restaurant:  "Kuzina",
    location:    "Athens, Greece",
    flag:        "🇬🇷",
    hook:        "Greek food is not just ingredients. It is light, salt air, and the sound of someone you love laughing at the table.",
    photo:       "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=600&auto=format&q=85",
    cover:       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&auto=format&q=80",
    tips:        6_180,
    supporters:  247,
    years:       11,
    specialties: ["Grilled octopus", "Moussaka", "Fresh mezze", "Loukoumades"],
    wall: [
      { name: "Andreas K.", amount: 20, message: "Took me straight back to Santorini. Unreal.",                time: "1h ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&q=80" },
      { name: "Maria T.",   amount: 10, message: "The lamb was extraordinary. I dream about it still.",         time: "4h ago", avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&auto=format&q=80" },
      { name: "Table 8",    amount: 35, message: "We already booked next week before the dessert arrived.",     time: "1d ago" },
      { name: "Nikos P.",   amount: 15, message: "Best mezze I have had outside of my yiayia's kitchen.",      time: "2d ago", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100&auto=format&q=80" },
    ],
    isDemo: true,
  },
  "pierre-laurent": {
    name:        "Pierre Laurent",
    slug:        "pierre-laurent",
    role:        "Executive Chef",
    restaurant:  "Le Comptoir",
    location:    "Paris, France",
    flag:        "🇫🇷",
    hook:        "Cooking is the only art form where you must destroy the work to truly appreciate it. I find that beautiful.",
    photo:       "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=600&auto=format&q=85",
    cover:       "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&auto=format&q=80",
    tips:        4_970,
    supporters:  189,
    years:       18,
    specialties: ["Duck confit", "Soufflé au chocolat", "Bouillabaisse", "Crème brûlée"],
    wall: [
      { name: "Amélie D.",  amount: 30, message: "Pierre, vous êtes un génie. This soufflé is immortal.",       time: "3h ago", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=100&auto=format&q=80" },
      { name: "Table 3",    amount: 20, message: "That soufflé was worth the three-hour flight from London.",   time: "6h ago" },
      { name: "Anonymous",  amount: 15, message: "Paris will always taste like your food to me.",               time: "1d ago" },
      { name: "Laurent B.", amount: 40, message: "Michelin stars are not enough. You deserve a constellation.", time: "3d ago", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=100&auto=format&q=80" },
    ],
    isDemo: true,
  },
};

/* ─── Metadata ───────────────────────────────────────────────────────────── */
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const demo = DEMO_CHEFS[params.slug];
  if (demo) {
    const title = `Tip ${demo.name} — ${demo.role} at ${demo.restaurant} | Tip a Chef`;
    const description = `Support ${demo.name}'s craft. Send a direct tip to ${demo.role} at ${demo.restaurant} in ${demo.location} — no app, just genuine appreciation.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://tipachef.com/${demo.slug}`,
        images: [{ url: demo.photo, width: 600, height: 800, alt: demo.name }],
        type: "profile",
      },
      twitter: {
        card: "summary",
        title,
        description,
        images: [demo.photo],
      },
      alternates: { canonical: `https://tipachef.com/${demo.slug}` },
    };
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("chefs")
    .select("name, bio, role, image_url")
    .eq("slug", params.slug.toLowerCase())
    .single();

  if (!data) return { title: "Chef Not Found — Tip a Chef" };

  const name       = data.name || params.slug;
  const role       = data.role || "Chef";
  const restaurant = data.bio  || "";
  const venue      = restaurant ? ` at ${restaurant}` : "";
  const title      = `Tip ${name} — ${role}${venue} | Tip a Chef`;
  const description = `Send a direct tip to ${name}, ${role}${venue}. No app needed — tip in seconds and leave a personal note on Tip a Chef.`;
  const image      = data.image_url || "/og";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://tipachef.com/${params.slug}`,
      images: [{ url: image, width: 400, height: 400, alt: `${name} — Tip a Chef` }],
      type: "profile",
    },
    twitter: { card: "summary", title, description, images: [image] },
    alternates: { canonical: `https://tipachef.com/${params.slug}` },
  };
}

/* ─── DB interfaces ──────────────────────────────────────────────────────── */
interface ChefRow {
  id: string;
  slug: string;
  name: string | null;
  role: string | null;
  hook: string | null;
  image_url: string | null;
  cover_url: string | null;
  bio: string | null;          // mapped to restaurant
  goal_label: string | null;
  goal_target: number;
  goal_current: number;
  tip_reward: string | null;
}

interface TipRow {
  id: string;
  amount_cents: number;
  message: string | null;
  tipper_name: string | null;
  created_at: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60)  return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24)   return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default async function ChefProfile({ params }: { params: { slug: string } }) {

  /* ── Demo chef shortcut ── */
  const demo = DEMO_CHEFS[params.slug];
  if (demo) {
    return (
      <>
        <Suspense fallback={null}><TipSuccessToast reward={null} /></Suspense>
        <ChefProfileView chef={demo} />
      </>
    );
  }

  /* ── Real chef from Supabase ── */
  const supabase    = await createClient();
  const adminClient = createServerClient();

  const { data: raw, error } = await supabase
    .from("chefs")
    .select("*")
    .eq("slug", params.slug.toLowerCase())
    .single();

  if (error || !raw) notFound();

  const row = raw as unknown as ChefRow;

  const { data: tips } = await adminClient
    .from("tips")
    .select("*")
    .eq("chef_id", row.id)
    .not("message", "is", null)
    .order("created_at", { ascending: false })
    .limit(10);

  const wall: ChefViewData["wall"] = ((tips ?? []) as TipRow[]).map((t) => ({
    name:    t.tipper_name ?? "Anonymous",
    amount:  Math.round(t.amount_cents / 100),
    message: t.message ?? "",
    time:    timeAgo(t.created_at),
  }));

  const viewData: ChefViewData = {
    name:        row.name       ?? row.slug,
    slug:        row.slug,
    role:        row.role       ?? "Chef",
    restaurant:  row.bio        ?? "",
    location:    "",
    flag:        "🍴",
    hook:        row.hook       ?? "",
    photo:       row.image_url  ?? "",
    cover:       row.cover_url  ?? "",
    tips:        row.goal_current ?? 0,
    supporters:  0,
    years:       0,
    specialties: [],
    wall,
    isDemo:      false,
    goalLabel:   row.goal_label,
    goalTarget:  row.goal_target,
    goalCurrent: row.goal_current,
    tipReward:   row.tip_reward,
  };

  return (
    <>
      <Suspense fallback={null}><TipSuccessToast reward={row.tip_reward ?? null} /></Suspense>
      <ChefProfileView chef={viewData} />
    </>
  );
}
