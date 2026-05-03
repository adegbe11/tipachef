"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";
import { createClient } from "@/lib/supabase/client";

interface Chef {
  id: string;
  name: string;
  slug: string;
  role: string | null;
  restaurant: string | null;
  hook: string | null;
  avatar_url: string | null;
  stripe_account_id: string | null;
  goal_label: string | null;
  goal_target: number | null;
  goal_current: number;
}

interface Tip {
  id: string;
  amount_cents: number;
  message: string | null;
  tipper_name: string;
  created_at: string;
}

interface Extra {
  id: string;
  title: string;
  description: string | null;
  price_cents: number;
  emoji: string | null;
  tag: string | null;
  active: boolean;
}

const NAV = [
  { id: "overview", label: "Overview",  icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "tips",     label: "Tips",      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "qr",       label: "QR Code",   icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
  { id: "extras",   label: "Extras",    icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" },
  { id: "settings", label: "Settings",  icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

function tipEmoji(amountCents: number) {
  if (amountCents >= 2500) return "🥩";
  if (amountCents >= 1000) return "🍷";
  if (amountCents >= 500)  return "🌿";
  return "🧂";
}

export default function Dashboard() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const supabase     = createClient();

  const [chef,    setChef]    = useState<Chef | null>(null);
  const [tips,    setTips]    = useState<Tip[]>([]);
  const [extras,  setExtras]  = useState<Extra[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("overview");
  const [copied,    setCopied]    = useState(false);

  // Settings form
  const [sName,       setSName]       = useState("");
  const [sHook,       setSHook]       = useState("");
  const [sRestaurant, setSRestaurant] = useState("");
  const [sRole,       setSRole]       = useState("");
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);

  // Add extra form
  const [showAddExtra,  setShowAddExtra]  = useState(false);
  const [newExtraTitle, setNewExtraTitle] = useState("");
  const [newExtraPrice, setNewExtraPrice] = useState("");
  const [newExtraEmoji, setNewExtraEmoji] = useState("📄");
  const [addingExtra,   setAddingExtra]   = useState(false);

  // Stripe Connect
  const [connectingStripe, setConnectingStripe] = useState(false);
  const [stripeMessage,    setStripeMessage]    = useState("");

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace("/login"); return; }

    const [chefRes, tipsRes, extrasRes] = await Promise.all([
      supabase.from("chefs").select("*").eq("id", user.id).single(),
      supabase.from("tips").select("*").eq("chef_id", user.id).order("created_at", { ascending: false }).limit(100),
      supabase.from("extras").select("*").eq("chef_id", user.id).order("created_at", { ascending: false }),
    ]);

    if (chefRes.data) {
      setChef(chefRes.data);
      setSName(chefRes.data.name ?? "");
      setSHook(chefRes.data.hook ?? "");
      setSRestaurant(chefRes.data.restaurant ?? "");
      setSRole(chefRes.data.role ?? "");
    }
    setTips(tipsRes.data ?? []);
    setExtras(extrasRes.data ?? []);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    loadData();
    const stripeStatus = searchParams.get("stripe");
    if (stripeStatus === "connected") setStripeMessage("Stripe connected! You can now receive payouts.");
    if (stripeStatus === "refresh")   setStripeMessage("Stripe onboarding needs to be completed.");
  }, [loadData, searchParams]);

  const profileUrl = chef ? `https://tipachef.com/${chef.slug}` : "";

  function copyLink() {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadQR() {
    const canvas = document.querySelector("#qr-download-canvas canvas") as HTMLCanvasElement;
    if (!canvas || !chef) return;
    const url = canvas.toDataURL("image/png");
    const a   = document.createElement("a");
    a.href     = url;
    a.download = `tipachef-${chef.slug}-qr.png`;
    a.click();
  }

  async function saveSettings() {
    if (!chef) return;
    setSaving(true);
    await supabase.from("chefs").update({
      name:       sName,
      hook:       sHook,
      restaurant: sRestaurant,
      role:       sRole,
    }).eq("id", chef.id);
    setChef({ ...chef, name: sName, hook: sHook, restaurant: sRestaurant, role: sRole });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  async function toggleExtra(id: string, current: boolean) {
    await supabase.from("extras").update({ active: !current }).eq("id", id);
    setExtras(extras.map(e => e.id === id ? { ...e, active: !current } : e));
  }

  async function addExtra() {
    if (!chef || !newExtraTitle || !newExtraPrice) return;
    setAddingExtra(true);
    const { data } = await supabase.from("extras").insert({
      chef_id:     chef.id,
      title:       newExtraTitle,
      price_cents: Math.round(parseFloat(newExtraPrice) * 100),
      emoji:       newExtraEmoji,
      active:      true,
    }).select().single();
    if (data) setExtras([data, ...extras]);
    setNewExtraTitle("");
    setNewExtraPrice("");
    setNewExtraEmoji("📄");
    setAddingExtra(false);
    setShowAddExtra(false);
  }

  async function deleteExtra(id: string) {
    await supabase.from("extras").delete().eq("id", id);
    setExtras(extras.filter(e => e.id !== id));
  }

  async function connectStripe() {
    setConnectingStripe(true);
    const res = await fetch("/api/stripe/connect", { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else { setConnectingStripe(false); setStripeMessage("Failed to connect Stripe. Try again."); }
  }

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  // Computed stats
  const totalCents   = tips.reduce((s, t) => s + t.amount_cents, 0);
  const totalEarned  = `$${(totalCents / 100).toFixed(0)}`;
  const tipCount     = tips.length;
  const avgTip       = tipCount > 0 ? `$${(totalCents / tipCount / 100).toFixed(2)}` : "$0";
  const supporters   = new Set(tips.map(t => t.tipper_name)).size;

  const thisMonth  = tips.filter(t => new Date(t.created_at) > new Date(Date.now() - 30 * 86400000));
  const thisWeek   = tips.filter(t => new Date(t.created_at) > new Date(Date.now() -  7 * 86400000));
  const monthTotal = `$${(thisMonth.reduce((s, t) => s + t.amount_cents, 0) / 100).toFixed(0)}`;

  const STATS = [
    { label: "Total earned",  value: totalEarned, delta: `+${monthTotal} this month` },
    { label: "Tips received", value: String(tipCount), delta: `+${thisWeek.length} this week` },
    { label: "Avg tip",       value: avgTip,      delta: "all time" },
    { label: "Supporters",    value: String(supporters), delta: "unique tippers" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!chef) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Could not load your profile.</p>
          <button onClick={() => router.replace("/login")} className="text-amber-600 underline text-sm">Sign in again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 min-h-screen">
        <div className="px-5 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/tipchef-logo.png" alt="Tip a Chef" width={28} height={28} className="rounded-lg" />
            <span className="font-display text-gray-900 italic text-lg">Tip a Chef</span>
          </Link>
        </div>

        <div className="px-4 py-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl overflow-hidden flex-shrink-0 bg-amber-100 flex items-center justify-center">
              {chef.avatar_url
                ? <Image src={chef.avatar_url} alt={chef.name ?? ""} width={36} height={36} className="object-cover w-full h-full" />
                : <span className="text-amber-700 font-bold text-sm">{(chef.name ?? chef.slug)[0]?.toUpperCase()}</span>
              }
            </div>
            <div className="min-w-0">
              <p className="text-gray-900 text-sm font-semibold truncate">{chef.name || chef.slug}</p>
              <p className="text-gray-400 text-xs truncate">{chef.role || "Chef"}{chef.restaurant ? ` · ${chef.restaurant}` : ""}</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => setActiveTab(n.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                background: activeTab === n.id ? "#FEF3E2" : "transparent",
                color:      activeTab === n.id ? "#C9A96E" : "#6B7280",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={n.icon} />
              </svg>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="px-4 py-4 border-t border-gray-100 space-y-3">
          <Link
            href={`/${chef.slug}`}
            target="_blank"
            className="flex items-center gap-2 text-xs text-gray-400 hover:text-amber-600 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
            tipachef.com/{chef.slug}
          </Link>
          <button onClick={signOut} className="flex items-center gap-2 text-xs text-gray-300 hover:text-gray-500 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen">

        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 font-semibold text-lg">
              {activeTab === "overview"
                ? `Good ${new Date().getHours() < 12 ? "morning" : new Date().getHours() < 17 ? "afternoon" : "evening"}, ${(chef.name || chef.slug).split(" ")[0]} 👋`
                : NAV.find(n => n.id === activeTab)?.label}
            </h1>
            {activeTab === "overview" && (
              <p className="text-gray-400 text-xs mt-0.5">Here&apos;s how your kitchen is doing.</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-amber-300 hover:text-amber-700 transition-all"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              {copied ? "Copied!" : "Copy link"}
            </button>
            <Link
              href={`/${chef.slug}`}
              target="_blank"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
              style={{ background: "#C9A96E" }}
            >
              View page
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">

          {/* ── Overview ─────────────────────────────────────── */}
          {activeTab === "overview" && (
            <div className="space-y-6">

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-gray-400 text-xs mb-1">{s.label}</p>
                    <p className="text-gray-900 font-semibold text-2xl mb-0.5">{s.value}</p>
                    <p className="text-xs" style={{ color: "#C9A96E" }}>{s.delta}</p>
                  </div>
                ))}
              </div>

              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-gray-900 font-semibold text-sm">Recent tips</p>
                    <button onClick={() => setActiveTab("tips")} className="text-xs text-amber-600 hover:underline">View all</button>
                  </div>
                  {tips.length === 0 ? (
                    <div className="px-5 py-10 text-center text-gray-400 text-sm">
                      No tips yet. Share your QR code to start earning!
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {tips.slice(0, 4).map((t) => (
                        <div key={t.id} className="px-5 py-4 flex items-start gap-3">
                          <span className="text-lg flex-shrink-0 mt-0.5">{tipEmoji(t.amount_cents)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-gray-900 text-sm font-medium">{t.tipper_name}</p>
                              <span className="text-xs text-gray-300">{timeAgo(t.created_at)}</span>
                            </div>
                            {t.message && <p className="text-gray-400 text-xs italic truncate">&ldquo;{t.message}&rdquo;</p>}
                          </div>
                          <span className="flex-shrink-0 text-sm font-semibold" style={{ color: "#C9A96E" }}>
                            ${(t.amount_cents / 100).toFixed(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center">
                  <p className="text-gray-900 font-semibold text-sm mb-1">Your QR code</p>
                  <p className="text-gray-400 text-xs mb-5">Print it and start earning</p>
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 mb-5">
                    <QRCodeSVG value={profileUrl} size={120} fgColor="#111111" bgColor="#FFFFFF" level="M" />
                  </div>
                  <p className="text-xs text-gray-400 mb-4">tipachef.com/{chef.slug}</p>
                  <button
                    onClick={() => setActiveTab("qr")}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
                    style={{ background: "#FEF3E2", color: "#C9A96E" }}
                  >
                    Download &amp; print
                  </button>
                </div>
              </div>

              {extras.length > 0 && (
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-gray-900 font-semibold text-sm">Your extras</p>
                    <button onClick={() => setActiveTab("extras")} className="text-xs text-amber-600 hover:underline">Manage</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {extras.slice(0, 3).map((e) => (
                      <div key={e.id} className="px-5 py-4 flex items-center gap-4">
                        <span className="text-lg">{e.emoji ?? "📄"}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 text-sm font-medium truncate">{e.title}</p>
                          <p className="text-gray-400 text-xs">{e.active ? "Active" : "Hidden"}</p>
                        </div>
                        <p className="text-sm font-semibold flex-shrink-0" style={{ color: "#C9A96E" }}>
                          ${(e.price_cents / 100).toFixed(0)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Tips tab ─────────────────────────────────────── */}
          {activeTab === "tips" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="text-gray-900 font-semibold text-sm">All tips ({tipCount})</p>
                <p className="text-xs text-gray-400">{totalEarned} total</p>
              </div>
              {tips.length === 0 ? (
                <div className="px-5 py-16 text-center">
                  <p className="text-4xl mb-3">🍽️</p>
                  <p className="text-gray-500 text-sm font-medium mb-1">No tips yet</p>
                  <p className="text-gray-400 text-xs">Share your QR code or profile link to start receiving tips.</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {tips.map((t) => (
                    <div key={t.id} className="px-5 py-4 flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-sm font-bold text-amber-700 flex-shrink-0">
                        {t.tipper_name[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-gray-900 text-sm font-medium">{t.tipper_name}</p>
                          <span className="text-xs text-gray-300">{timeAgo(t.created_at)}</span>
                        </div>
                        {t.message && <p className="text-gray-500 text-sm italic leading-relaxed">&ldquo;{t.message}&rdquo;</p>}
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-semibold" style={{ color: "#C9A96E" }}>
                          ${(t.amount_cents / 100).toFixed(0)}
                        </p>
                        <p className="text-xs text-gray-300">{tipEmoji(t.amount_cents)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── QR tab ───────────────────────────────────────── */}
          {activeTab === "qr" && (
            <div className="max-w-lg mx-auto space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
                <p className="text-gray-900 font-semibold text-base mb-1">Your personal QR code</p>
                <p className="text-gray-400 text-sm mb-8">Every scan goes straight to your tip page.</p>

                <div className="bg-gray-900 rounded-3xl p-6 mb-6 w-full max-w-xs">
                  <div className="flex items-center gap-3 mb-5">
                    <Image src="/tipchef-logo.png" alt="" width={24} height={24} className="rounded-lg" />
                    <span className="font-display text-white italic text-sm">Tip a Chef</span>
                  </div>
                  <div className="bg-white rounded-2xl p-4 flex flex-col items-center mb-4">
                    <div id="qr-download-canvas">
                      <QRCodeCanvas value={profileUrl} size={160} fgColor="#111111" bgColor="#FFFFFF" level="H" />
                    </div>
                  </div>
                  <p className="text-white font-semibold text-sm text-center">{chef.name || chef.slug}</p>
                  <p className="text-white/50 text-xs text-center mt-0.5">tipachef.com/{chef.slug}</p>
                </div>

                <div className="w-full space-y-2.5">
                  <button
                    onClick={downloadQR}
                    className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all"
                    style={{ background: "#C9A96E", color: "#111" }}
                  >
                    Download QR card (PNG)
                  </button>
                  <button
                    onClick={copyLink}
                    className="w-full py-3.5 rounded-2xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    {copied ? "Link copied!" : "Copy profile link"}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-4">Where to use your QR</p>
                <div className="space-y-3">
                  {[
                    { emoji: "🍽️", tip: "Table tents — print and fold for every table" },
                    { emoji: "🧑‍🍳", tip: "Pin to your chef's whites or station" },
                    { emoji: "🧾", tip: "Ask the restaurant to add it to receipts" },
                    { emoji: "📱", tip: "Screenshot and add to your Instagram bio" },
                    { emoji: "🚪", tip: "Frame at the restaurant entrance" },
                  ].map((w) => (
                    <div key={w.tip} className="flex items-center gap-3">
                      <span className="text-lg">{w.emoji}</span>
                      <p className="text-gray-600 text-sm">{w.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Extras tab ───────────────────────────────────── */}
          {activeTab === "extras" && (
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <p className="text-gray-900 font-semibold text-sm">Your extras</p>
                  <button
                    onClick={() => setShowAddExtra(!showAddExtra)}
                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
                    style={{ background: "#C9A96E" }}
                  >
                    + Add extra
                  </button>
                </div>

                {showAddExtra && (
                  <div className="px-5 py-4 bg-amber-50/50 border-b border-amber-100">
                    <p className="text-gray-900 text-sm font-medium mb-3">New extra</p>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          value={newExtraEmoji}
                          onChange={(e) => setNewExtraEmoji(e.target.value)}
                          placeholder="📄"
                          className="w-16 py-2.5 px-3 rounded-xl border border-gray-200 bg-white text-sm text-center outline-none focus:border-amber-400 transition-all"
                        />
                        <input
                          value={newExtraTitle}
                          onChange={(e) => setNewExtraTitle(e.target.value)}
                          placeholder="Title (e.g. 7-Day Pasta PDF)"
                          className="flex-1 py-2.5 px-3 rounded-xl border border-gray-200 bg-white text-sm outline-none focus:border-amber-400 transition-all text-gray-900 placeholder:text-gray-300"
                        />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex items-center flex-1 rounded-xl border border-gray-200 bg-white overflow-hidden focus-within:border-amber-400 transition-all">
                          <span className="pl-3 text-gray-400 text-sm">$</span>
                          <input
                            value={newExtraPrice}
                            onChange={(e) => setNewExtraPrice(e.target.value)}
                            placeholder="4.99"
                            type="number"
                            step="0.01"
                            min="0"
                            className="flex-1 py-2.5 px-2 bg-transparent text-sm outline-none text-gray-900 placeholder:text-gray-300"
                          />
                        </div>
                        <button
                          onClick={addExtra}
                          disabled={addingExtra || !newExtraTitle || !newExtraPrice}
                          className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white disabled:opacity-40 transition-all"
                          style={{ background: "#C9A96E" }}
                        >
                          {addingExtra ? "Adding..." : "Add"}
                        </button>
                        <button
                          onClick={() => setShowAddExtra(false)}
                          className="px-4 py-2.5 rounded-xl text-sm text-gray-500 border border-gray-200 hover:bg-gray-50 transition-all"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {extras.length === 0 && !showAddExtra ? (
                  <div className="px-5 py-12 text-center">
                    <p className="text-3xl mb-3">🛒</p>
                    <p className="text-gray-500 text-sm font-medium mb-1">No extras yet</p>
                    <p className="text-gray-400 text-xs">Add PDFs, videos, or shoutouts for your supporters to buy.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-50">
                    {extras.map((e) => (
                      <div key={e.id} className="px-5 py-4 flex items-center gap-4">
                        <span className="text-xl">{e.emoji ?? "📄"}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-gray-900 text-sm font-medium truncate">{e.title}</p>
                          <p className="text-gray-400 text-xs mt-0.5">${(e.price_cents / 100).toFixed(2)}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => deleteExtra(e.id)}
                            className="text-gray-300 hover:text-red-400 transition-colors"
                          >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
                            </svg>
                          </button>
                          <button
                            onClick={() => toggleExtra(e.id, e.active)}
                            className="relative w-9 h-5 rounded-full flex items-center px-0.5 transition-all duration-200"
                            style={{ background: e.active ? "#C9A96E" : "#E5E7EB" }}
                          >
                            <div
                              className="w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200"
                              style={{ transform: e.active ? "translateX(16px)" : "translateX(0)" }}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Settings tab ─────────────────────────────────── */}
          {activeTab === "settings" && (
            <div className="max-w-lg space-y-4">
              {stripeMessage && (
                <div className={`px-4 py-3 rounded-xl text-sm border ${
                  stripeMessage.includes("connected")
                    ? "bg-green-50 border-green-100 text-green-700"
                    : "bg-amber-50 border-amber-100 text-amber-700"
                }`}>
                  {stripeMessage}
                </div>
              )}

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-4">Profile</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Display name</label>
                    <input
                      value={sName}
                      onChange={(e) => setSName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-amber-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Role</label>
                    <input
                      value={sRole}
                      onChange={(e) => setSRole(e.target.value)}
                      placeholder="Head Chef, Sous Chef..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-amber-400 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Restaurant / Venue</label>
                    <input
                      value={sRestaurant}
                      onChange={(e) => setSRestaurant(e.target.value)}
                      placeholder="The Meridian, London"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-amber-400 transition-all placeholder:text-gray-300"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Kitchen hook (bio)</label>
                    <textarea
                      value={sHook}
                      onChange={(e) => setSHook(e.target.value)}
                      placeholder="One line that tells diners who you are..."
                      rows={2}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-amber-400 transition-all resize-none placeholder:text-gray-300"
                    />
                  </div>
                  <button
                    onClick={saveSettings}
                    disabled={saving}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                    style={{ background: "#C9A96E" }}
                  >
                    {saving ? "Saving..." : saved ? "Saved!" : "Save changes"}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-1">Payouts</p>
                <p className="text-gray-400 text-xs mb-4">Connect Stripe to receive tips directly to your bank account.</p>
                {chef.stripe_account_id ? (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
                    </svg>
                    <div>
                      <p className="text-sm text-gray-900 font-medium">Stripe connected</p>
                      <p className="text-xs text-gray-400">Tips route directly to your account</p>
                    </div>
                    <span className="ml-auto text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full">Active</span>
                  </div>
                ) : (
                  <button
                    onClick={connectStripe}
                    disabled={connectingStripe}
                    className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: "#635BFF" }}
                  >
                    {connectingStripe ? "Redirecting to Stripe..." : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="white" opacity="0.9">
                          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
                        </svg>
                        Connect Stripe
                      </>
                    )}
                  </button>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-1">Your profile URL</p>
                <p className="text-gray-400 text-xs mb-3">Share this link with diners so they can tip you anytime.</p>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="flex-1 text-sm text-gray-700 font-mono truncate">tipachef.com/{chef.slug}</p>
                  <button onClick={copyLink} className="text-xs text-amber-600 font-medium hover:underline flex-shrink-0">
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
