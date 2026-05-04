"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
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
  cover_url: string | null;
  stripe_account_id: string | null;
  tip_reward: string | null;
  goal_label: string | null;
  goal_target: number | null;
  goal_current: number;
  instagram_url: string | null;
  tiktok_url: string | null;
  youtube_url: string | null;
}

interface Tip {
  id: string;
  amount_cents: number;
  message: string | null;
  tipper_name: string;
  created_at: string;
}

const NAV = [
  { id: "overview",    label: "Overview",        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
  { id: "earnings",    label: "Earnings",         icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: "messages",    label: "Tips & messages",  icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { id: "memberships", label: "Memberships",      icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "profile",     label: "My profile",       icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { id: "qr",          label: "QR code",          icon: "M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" },
  { id: "settings",    label: "Settings",         icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
];

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1)  return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

function tipEmoji(cents: number) {
  if (cents >= 2500) return "🥩";
  if (cents >= 1000) return "🍷";
  if (cents >= 500)  return "🌿";
  return "🧂";
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function DashboardInner() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const supabase     = createClient();

  const [chef,    setChef]    = useState<Chef | null>(null);
  const [tips,    setTips]    = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [copied,    setCopied]    = useState(false);

  // Settings / profile form
  const [sName,       setSName]       = useState("");
  const [sHook,       setSHook]       = useState("");
  const [sRestaurant, setSRestaurant] = useState("");
  const [sRole,       setSRole]       = useState("");
  const [sInstagram,  setSInstagram]  = useState("");
  const [sTiktok,     setSTiktok]     = useState("");
  const [sYoutube,    setSYoutube]    = useState("");
  const [sReward,     setSReward]     = useState("");
  const [saving,      setSaving]      = useState(false);
  const [saved,       setSaved]       = useState(false);
  const [saveError,   setSaveError]   = useState("");
  const [avatarUploading, setAvatarUploading] = useState(false);
  const [coverUploading,  setCoverUploading]  = useState(false);

  // Stripe
  const [connectingStripe, setConnectingStripe] = useState(false);
  const [stripeMessage,    setStripeMessage]    = useState("");

  const loadData = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.replace("/login"); return; }

    const [chefRes, tipsRes] = await Promise.all([
      supabase.from("chefs").select("*").eq("id", user.id).single(),
      supabase.from("tips").select("*").eq("chef_id", user.id).order("created_at", { ascending: false }).limit(200),
    ]);

    if (chefRes.data) {
      // Map DB column names: image_url → avatar_url, bio → restaurant
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const raw = chefRes.data as any;
      const mapped: Chef = { ...raw, avatar_url: raw.image_url ?? null, restaurant: raw.bio ?? null };
      setChef(mapped);
      setSName(mapped.name ?? "");
      setSHook(mapped.hook ?? "");
      setSRestaurant(mapped.restaurant ?? "");
      setSRole(mapped.role ?? "");
      setSInstagram(mapped.instagram_url ?? "");
      setSTiktok(mapped.tiktok_url ?? "");
      setSYoutube(mapped.youtube_url ?? "");
      setSReward(mapped.tip_reward ?? "");
    }
    setTips(tipsRes.data ?? []);
    setLoading(false);
  }, [supabase, router]);

  useEffect(() => {
    loadData();
    const s = searchParams.get("stripe");
    if (s === "connected") setStripeMessage("Stripe connected! You can now receive payouts.");
    if (s === "refresh")   setStripeMessage("Stripe onboarding needs to be completed.");
  }, [loadData, searchParams]);

  const profileUrl = chef ? `https://tipachef.com/${chef.slug}` : "";

  function copyLink() {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadQR() {
    const canvas = document.querySelector("#qr-dl-canvas canvas") as HTMLCanvasElement;
    if (!canvas || !chef) return;
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `tipachef-${chef.slug}-qr.png`;
    a.click();
  }

  async function saveProfile() {
    if (!chef) return;
    setSaving(true); setSaveError("");
    const { error } = await supabase.from("chefs").update({
      name:          sName.trim(),
      hook:          sHook.trim(),
      bio:           sRestaurant.trim(),
      role:          sRole.trim(),
      instagram_url: sInstagram.trim() || null,
      tiktok_url:    sTiktok.trim()    || null,
      youtube_url:   sYoutube.trim()   || null,
      tip_reward:    sReward.trim()    || null,
    }).eq("id", chef.id);
    setSaving(false);
    if (error) { setSaveError(error.message); }
    else {
      setChef({ ...chef, name: sName.trim(), hook: sHook.trim(), restaurant: sRestaurant.trim(), role: sRole.trim(), instagram_url: sInstagram.trim() || null, tiktok_url: sTiktok.trim() || null, youtube_url: sYoutube.trim() || null, tip_reward: sReward.trim() || null });
      setSaved(true); setTimeout(() => setSaved(false), 2500);
    }
  }

  async function uploadPhoto(file: File, type: "avatar" | "cover") {
    if (!chef) return;
    const setUploading = type === "avatar" ? setAvatarUploading : setCoverUploading;
    setUploading(true); setSaveError("");
    const localUrl = URL.createObjectURL(file);
    const stateCol = type === "avatar" ? "avatar_url" : "cover_url"; // Chef interface key
    const dbCol    = type === "avatar" ? "image_url"  : "cover_url"; // actual DB column
    setChef({ ...chef, [stateCol]: localUrl });
    const ext = file.name.split(".").pop() ?? "jpg";
    const bucket = type === "avatar" ? "avatars" : "covers";
    const path   = `${chef.id}/${type}.${ext}`;
    const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (upErr) { setSaveError(`Upload failed: ${upErr.message}. Make sure the "${bucket}" storage bucket exists in Supabase.`); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
    await supabase.from("chefs").update({ [dbCol]: publicUrl }).eq("id", chef.id);
    setChef({ ...chef, [stateCol]: publicUrl });
    setUploading(false);
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

  // Stats
  const totalCents  = tips.reduce((s, t) => s + t.amount_cents, 0);
  const totalEarned = (totalCents / 100).toFixed(0);
  const tipCount    = tips.length;
  const avgTip      = tipCount > 0 ? (totalCents / tipCount / 100).toFixed(2) : "0.00";

  const now        = Date.now();
  const midnight   = new Date(); midnight.setHours(0, 0, 0, 0);
  const tonightTips  = tips.filter(t => new Date(t.created_at) >= midnight);
  const weekTips     = tips.filter(t => now - new Date(t.created_at).getTime() < 7  * 86400000);
  const monthTips    = tips.filter(t => now - new Date(t.created_at).getTime() < 30 * 86400000);
  const tonightTotal = (tonightTips.reduce((s, t) => s + t.amount_cents, 0) / 100).toFixed(0);
  const weekTotal    = (weekTips.reduce((s, t)   => s + t.amount_cents, 0) / 100).toFixed(0);
  const monthTotal   = (monthTips.reduce((s, t)  => s + t.amount_cents, 0) / 100).toFixed(0);

  const OVERVIEW_STATS = [
    { label: "Tonight's service", value: `$${tonightTotal}`, sub: `${tonightTips.length} tip${tonightTips.length !== 1 ? "s" : ""}` },
    { label: "This week",         value: `$${weekTotal}`,    sub: `${weekTips.length} tips`    },
    { label: "This month",        value: `$${monthTotal}`,   sub: `${monthTips.length} tips`   },
    { label: "Total earned",      value: `$${totalEarned}`,  sub: `${tipCount} all time`       },
  ];

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
        <p className="text-gray-400 text-sm">Loading your dashboard...</p>
      </div>
    </div>
  );

  if (!chef) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-400 text-sm">Could not load your profile. <button onClick={() => router.replace("/login")} className="text-amber-600 underline">Sign in again</button></p>
    </div>
  );

  const firstName = (chef.name || chef.slug).split(" ")[0];

  /* ── Shared input style ──────────────────────────────────────────── */
  const inputCls = "w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/10 transition-all placeholder:text-gray-300";

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar ──────────────────────────────────────────────── */}
      <aside className="hidden md:flex flex-col w-60 bg-white border-r border-gray-100 min-h-screen fixed top-0 left-0 bottom-0 z-20">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/tipchef-logo.png" alt="Tip a Chef" width={28} height={28} className="rounded-lg" />
            <span className="font-display text-gray-900 italic text-lg">Tip a Chef</span>
          </Link>
        </div>

        {/* Chef avatar */}
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

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setActiveTab(n.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left"
              style={{ background: activeTab === n.id ? "#FEF3E2" : "transparent", color: activeTab === n.id ? "#C9A96E" : "#6B7280" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={n.icon} />
              </svg>
              {n.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-4 py-4 border-t border-gray-100 space-y-3">
          <Link href={`/${chef.slug}`} target="_blank" className="flex items-center gap-2 text-xs text-gray-400 hover:text-amber-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
            View my page
          </Link>
          <button onClick={() => {}} className="flex items-center gap-2 text-xs text-gray-400 hover:text-gray-600 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3M12 17h.01"/></svg>
            Help
          </button>
          <button onClick={signOut} className="flex items-center gap-2 text-xs text-gray-300 hover:text-gray-500 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main (offset for sidebar) ──────────────────────────── */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-60">

        {/* Header */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div>
            <h1 className="text-gray-900 font-semibold text-lg">
              {activeTab === "overview"
                ? <>{greeting()}, {firstName} <span style={{ color: "#C9A96E" }}>✦</span></>
                : NAV.find(n => n.id === activeTab)?.label}
            </h1>
            {activeTab === "overview" && (
              <p className="text-gray-400 text-xs mt-0.5">Here&apos;s how your kitchen is doing.</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-amber-300 hover:text-amber-700 transition-all">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
              {copied ? "Copied!" : "Copy link"}
            </button>
            <Link href={`/${chef.slug}`} target="_blank" className="px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all" style={{ background: "#C9A96E" }}>
              View page
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">

          {/* ══ OVERVIEW ════════════════════════════════════════ */}
          {activeTab === "overview" && (
            <div className="space-y-5">

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {OVERVIEW_STATS.map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-gray-400 text-xs mb-2">{s.label}</p>
                    <p className="text-gray-900 font-bold text-2xl mb-1" style={{ letterSpacing: "-0.03em" }}>{s.value}</p>
                    <p className="text-xs" style={{ color: "#C9A96E" }}>{s.sub}</p>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Download QR",    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4", action: () => setActiveTab("qr") },
                  { label: "Share profile",  icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", action: copyLink },
                  { label: "Edit profile",   icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", action: () => setActiveTab("profile") },
                ].map(a => (
                  <button key={a.label} onClick={a.action}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:border-amber-300 hover:text-amber-700 bg-white transition-all"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d={a.icon} />
                    </svg>
                    {a.label}
                  </button>
                ))}
              </div>

              {/* Recent tips + QR */}
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <p className="text-gray-900 font-semibold text-sm">Recent tips</p>
                    <button onClick={() => setActiveTab("messages")} className="text-xs text-amber-600 hover:underline">View all</button>
                  </div>
                  {tips.length === 0 ? (
                    <div className="px-5 py-10 text-center text-gray-400 text-sm">No tips yet. Share your QR code to start earning!</div>
                  ) : (
                    <div className="divide-y divide-gray-50">
                      {tips.slice(0, 5).map(t => (
                        <div key={t.id} className="px-5 py-4 flex items-start gap-3">
                          <span className="text-lg flex-shrink-0 mt-0.5">{tipEmoji(t.amount_cents)}</span>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="text-gray-900 text-sm font-medium">{t.tipper_name}</p>
                              <span className="text-xs text-gray-300">{timeAgo(t.created_at)}</span>
                            </div>
                            {t.message && <p className="text-gray-400 text-xs italic truncate">&ldquo;{t.message}&rdquo;</p>}
                          </div>
                          <span className="flex-shrink-0 text-sm font-semibold" style={{ color: "#C9A96E" }}>${(t.amount_cents / 100).toFixed(0)}</span>
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
                  <button onClick={() => setActiveTab("qr")} className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all" style={{ background: "#FEF3E2", color: "#C9A96E" }}>
                    Download &amp; print
                  </button>
                </div>
              </div>

              {/* Stripe connect prompt if not connected */}
              {!chef.stripe_account_id && (
                <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#635BFF20" }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#635BFF">
                      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm font-semibold">Connect Stripe to get paid</p>
                    <p className="text-gray-400 text-xs mt-0.5">Tips are held until you connect. Takes 2 minutes.</p>
                  </div>
                  <button onClick={connectStripe} disabled={connectingStripe}
                    className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60 flex-shrink-0"
                    style={{ background: "#635BFF" }}
                  >
                    {connectingStripe ? "Redirecting..." : "Connect"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ EARNINGS ════════════════════════════════════════ */}
          {activeTab === "earnings" && (
            <div className="space-y-5 max-w-3xl">
              {stripeMessage && (
                <div className={`px-4 py-3 rounded-xl text-sm border ${stripeMessage.includes("connected") ? "bg-green-50 border-green-100 text-green-700" : "bg-amber-50 border-amber-100 text-amber-700"}`}>
                  {stripeMessage}
                </div>
              )}

              {/* Payout balance card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <p className="text-gray-400 text-xs mb-2">Payout balance</p>
                <p className="text-gray-900 font-bold mb-4" style={{ fontSize: "2.5rem", letterSpacing: "-0.04em" }}>${totalEarned}</p>
                <div className="flex items-center gap-3">
                  {chef.stripe_account_id ? (
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
                      <span className="text-sm text-gray-600">Stripe connected · Instant payouts</span>
                    </div>
                  ) : (
                    <button onClick={connectStripe} disabled={connectingStripe}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                      style={{ background: "#635BFF" }}
                    >
                      {connectingStripe ? "Redirecting..." : "Connect Stripe to cash out"}
                    </button>
                  )}
                </div>
              </div>

              {/* Tips table */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <p className="text-gray-900 font-semibold text-sm">All earnings</p>
                  <p className="text-xs text-gray-400">{tipCount} tips · ${avgTip} avg</p>
                </div>
                {tips.length === 0 ? (
                  <div className="px-5 py-12 text-center text-gray-400 text-sm">No tips yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-50">
                          {["Date", "Tipper", "Amount", "Tier", "Message"].map(h => (
                            <th key={h} className="px-5 py-3 text-left text-xs font-medium text-gray-400">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {tips.map(t => (
                          <tr key={t.id}>
                            <td className="px-5 py-3 text-xs text-gray-400 whitespace-nowrap">{new Date(t.created_at).toLocaleDateString()}</td>
                            <td className="px-5 py-3 text-sm text-gray-700">{t.tipper_name}</td>
                            <td className="px-5 py-3 text-sm font-semibold" style={{ color: "#C9A96E" }}>${(t.amount_cents / 100).toFixed(0)}</td>
                            <td className="px-5 py-3 text-base">{tipEmoji(t.amount_cents)}</td>
                            <td className="px-5 py-3 text-xs text-gray-400 max-w-xs truncate italic">{t.message || "—"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ══ TIPS & MESSAGES ═════════════════════════════════ */}
          {activeTab === "messages" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden max-w-3xl">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <p className="text-gray-900 font-semibold text-sm">All tips &amp; messages ({tipCount})</p>
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
                  {tips.map(t => (
                    <div key={t.id} className="px-5 py-5 flex items-start gap-4">
                      <div className="w-9 h-9 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-sm font-bold text-amber-700 flex-shrink-0">
                        {t.tipper_name[0]?.toUpperCase() ?? "?"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <p className="text-gray-900 text-sm font-medium">{t.tipper_name}</p>
                          <span className="text-xs text-gray-300">{timeAgo(t.created_at)}</span>
                        </div>
                        {t.message
                          ? <p className="text-gray-600 text-sm italic leading-relaxed">&ldquo;{t.message}&rdquo;</p>
                          : <p className="text-gray-300 text-xs italic">No message left.</p>
                        }
                      </div>
                      <div className="flex-shrink-0 text-right">
                        <p className="text-sm font-semibold" style={{ color: "#C9A96E" }}>${(t.amount_cents / 100).toFixed(0)}</p>
                        <p className="text-base">{tipEmoji(t.amount_cents)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ══ MEMBERSHIPS ════════════════════════════════════ */}
          {activeTab === "memberships" && (
            <div className="max-w-xl">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl" style={{ background: "#FEF3E2" }}>
                  🌿
                </div>
                <h2 className="text-gray-900 font-semibold text-lg mb-2">Memberships coming soon</h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto mb-6">
                  Let your biggest fans support you every month. Fan, Foodie, and Patron plans will launch here.
                </p>
                <div className="space-y-3">
                  {[
                    { plan: "Fan", price: "$5/mo", perks: "Recipe of the month + supporter wall" },
                    { plan: "Foodie", price: "$15/mo", perks: "Everything + cook-along video + early access" },
                    { plan: "Patron", price: "$25/mo", perks: "Everything + monthly 1-on-1 Q&A + shoutout" },
                  ].map(p => (
                    <div key={p.plan} className="flex items-center gap-4 px-4 py-3.5 rounded-xl border border-gray-100 bg-gray-50 text-left opacity-60">
                      <div className="flex-1">
                        <p className="text-gray-900 text-sm font-semibold">{p.plan} <span className="text-amber-600 font-bold ml-1">{p.price}</span></p>
                        <p className="text-gray-400 text-xs mt-0.5">{p.perks}</p>
                      </div>
                      <span className="text-xs text-gray-300 flex-shrink-0">Soon</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ MY PROFILE ════════════════════════════════════ */}
          {activeTab === "profile" && (
            <div className="max-w-lg space-y-4">

              {/* Photos */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-4">Photos</p>
                <div className="space-y-5">
                  {/* Avatar */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-amber-50 border border-amber-100 flex-shrink-0 flex items-center justify-center">
                      {chef.avatar_url
                        ? <Image src={chef.avatar_url} alt="" width={64} height={64} className="object-cover w-full h-full" />
                        : <span className="text-amber-700 font-bold text-xl">{(chef.name ?? chef.slug)[0]?.toUpperCase()}</span>}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 text-sm font-medium mb-0.5">Profile photo</p>
                      <p className="text-gray-400 text-xs mb-2">Shown on your public tip page. Profiles with photos get 3x more tips.</p>
                      <label className="inline-flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-amber-300 transition-all">
                        {avatarUploading ? "Uploading..." : "Choose photo"}
                        <input type="file" accept="image/*" className="hidden" disabled={avatarUploading} onChange={e => { const f = e.target.files?.[0]; if (f) uploadPhoto(f, "avatar"); }} />
                      </label>
                    </div>
                  </div>
                  {/* Cover */}
                  <div>
                    <p className="text-gray-900 text-sm font-medium mb-0.5">Cover photo</p>
                    <p className="text-gray-400 text-xs mb-2">Banner at the top of your profile. Best at 1200x400px.</p>
                    {chef.cover_url && (
                      <div className="w-full h-20 rounded-xl overflow-hidden mb-2 bg-gray-100">
                        <Image src={chef.cover_url} alt="Cover" width={480} height={80} className="object-cover w-full h-full" />
                      </div>
                    )}
                    <label className="inline-flex items-center gap-1.5 cursor-pointer px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:border-amber-300 transition-all">
                      {coverUploading ? "Uploading..." : chef.cover_url ? "Change cover" : "Upload cover"}
                      <input type="file" accept="image/*" className="hidden" disabled={coverUploading} onChange={e => { const f = e.target.files?.[0]; if (f) uploadPhoto(f, "cover"); }} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Profile info */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-4">Profile info</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Chef name</label>
                    <input value={sName} onChange={e => setSName(e.target.value)} className={inputCls} placeholder="Marco Rossi" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Role</label>
                    <input value={sRole} onChange={e => setSRole(e.target.value)} className={inputCls} placeholder="Head Chef, Sous Chef..." />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Restaurant / Venue</label>
                    <input value={sRestaurant} onChange={e => setSRestaurant(e.target.value)} className={inputCls} placeholder="Noma, Copenhagen" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Your story (bio)</label>
                    <textarea value={sHook} onChange={e => setSHook(e.target.value)} rows={3} className={`${inputCls} resize-none`} placeholder="e.g. I've been cooking Neapolitan pizza for 15 years, trained in Naples, now bringing it to London..." />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Your page URL</label>
                    <div className="flex items-center gap-0 rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
                      <span className="px-3 py-3 text-gray-400 text-sm bg-gray-100 border-r border-gray-200 whitespace-nowrap">tipachef.com/</span>
                      <span className="px-3 py-3 text-gray-700 text-sm font-mono">{chef.slug}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-1">Social links</p>
                <p className="text-gray-400 text-xs mb-4">Icon links shown on your public profile.</p>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">Instagram</label>
                    <input value={sInstagram} onChange={e => setSInstagram(e.target.value)} className={inputCls} placeholder="https://instagram.com/yourhandle" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">TikTok</label>
                    <input value={sTiktok} onChange={e => setSTiktok(e.target.value)} className={inputCls} placeholder="https://tiktok.com/@yourhandle" />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1 block">YouTube</label>
                    <input value={sYoutube} onChange={e => setSYoutube(e.target.value)} className={inputCls} placeholder="https://youtube.com/@yourchannel" />
                  </div>
                </div>
              </div>

              {saveError && <p className="text-red-500 text-xs">{saveError}</p>}
              <button onClick={saveProfile} disabled={saving}
                className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all disabled:opacity-60"
                style={{ background: "#C9A96E" }}
              >
                {saving ? "Saving..." : saved ? "Saved!" : "Save profile"}
              </button>

              <Link href={`/${chef.slug}`} target="_blank" className="block text-center text-sm text-amber-600 hover:underline">
                Preview my public page →
              </Link>
            </div>
          )}

          {/* ══ QR CODE ════════════════════════════════════════ */}
          {activeTab === "qr" && (
            <div className="max-w-lg mx-auto space-y-4">
              <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col items-center text-center">
                <p className="text-gray-900 font-semibold text-base mb-1">Your QR code</p>
                <p className="text-gray-400 text-sm mb-8">Every scan goes straight to your tip page.</p>

                <div className="bg-gray-900 rounded-3xl p-6 mb-6 w-full max-w-xs">
                  <div className="flex items-center gap-3 mb-5">
                    <Image src="/tipchef-logo.png" alt="" width={24} height={24} className="rounded-lg" />
                    <span className="font-display text-white italic text-sm">Tip a Chef</span>
                  </div>
                  <div className="bg-white rounded-2xl p-4 flex flex-col items-center mb-4">
                    <div id="qr-dl-canvas">
                      <QRCodeCanvas value={profileUrl} size={160} fgColor="#111111" bgColor="#FFFFFF" level="H" />
                    </div>
                  </div>
                  <p className="text-white font-semibold text-sm text-center">{chef.name || chef.slug}</p>
                  <p className="text-white/50 text-xs text-center mt-0.5">tipachef.com/{chef.slug}</p>
                </div>

                <div className="w-full space-y-2.5">
                  <button onClick={downloadQR} className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all" style={{ background: "#C9A96E", color: "#111" }}>
                    Download QR card (PNG)
                  </button>
                  <button onClick={copyLink} className="w-full py-3.5 rounded-2xl font-semibold text-sm border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all">
                    {copied ? "Link copied!" : "Copy profile link"}
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-4">Where to use your QR</p>
                <div className="space-y-3">
                  {[
                    { e: "🍽️", t: "Table tents — print and fold for every table" },
                    { e: "🧑‍🍳", t: "Pin to your chef whites or station" },
                    { e: "🧾", t: "Ask the restaurant to add it to receipts" },
                    { e: "📱", t: "Screenshot and add to your Instagram bio" },
                    { e: "🚪", t: "Frame it at the restaurant entrance" },
                  ].map(w => (
                    <div key={w.t} className="flex items-center gap-3">
                      <span className="text-lg">{w.e}</span>
                      <p className="text-gray-600 text-sm">{w.t}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ SETTINGS ═══════════════════════════════════════ */}
          {activeTab === "settings" && (
            <div className="max-w-lg space-y-4">
              {/* Kitchen secret */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-1">
                  <span>🔒</span>
                  <p className="text-gray-900 font-semibold text-sm">Kitchen secret</p>
                </div>
                <p className="text-gray-400 text-xs mb-4">Tippers see this the moment their payment completes. A recipe, technique, or personal message.</p>
                <textarea value={sReward} onChange={e => setSReward(e.target.value)} rows={4} className={`${inputCls} resize-none`} placeholder="My carbonara secret: use 70% pecorino, 30% parmesan, and add the pasta water off the heat..." />
                <button onClick={saveProfile} disabled={saving} className="mt-3 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all disabled:opacity-60" style={{ background: "#C9A96E" }}>
                  {saving ? "Saving..." : saved ? "Saved!" : "Save"}
                </button>
              </div>

              {/* Stripe */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-1">Payouts</p>
                <p className="text-gray-400 text-xs mb-4">Connect Stripe to receive tips directly to your bank account.</p>
                {chef.stripe_account_id ? (
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                    <div>
                      <p className="text-sm text-gray-900 font-medium">Stripe connected</p>
                      <p className="text-xs text-gray-400">Tips route directly to your account</p>
                    </div>
                    <span className="ml-auto text-xs bg-green-50 text-green-600 font-medium px-2 py-0.5 rounded-full">Active</span>
                  </div>
                ) : (
                  <button onClick={connectStripe} disabled={connectingStripe}
                    className="w-full py-3.5 rounded-2xl text-sm font-semibold text-white transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                    style={{ background: "#635BFF" }}
                  >
                    {connectingStripe ? "Redirecting to Stripe..." : "Connect Stripe"}
                  </button>
                )}
              </div>

              {/* Profile URL */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <p className="text-gray-900 font-semibold text-sm mb-1">Your profile URL</p>
                <p className="text-gray-400 text-xs mb-3">Share this link with diners so they can tip you anytime.</p>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="flex-1 text-sm text-gray-700 font-mono truncate">tipachef.com/{chef.slug}</p>
                  <button onClick={copyLink} className="text-xs text-amber-600 font-medium hover:underline flex-shrink-0">{copied ? "Copied!" : "Copy"}</button>
                </div>
              </div>

              {saveError && <p className="text-red-500 text-xs">{saveError}</p>}
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
          <p className="text-gray-400 text-sm">Loading your dashboard...</p>
        </div>
      </div>
    }>
      <DashboardInner />
    </Suspense>
  );
}
