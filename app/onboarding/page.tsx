"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const ROLES = [
  "Head Chef", "Executive Chef", "Sous Chef", "Chef de Partie",
  "Pastry Chef", "Private Chef", "Personal Chef", "Line Cook",
  "Catering Chef", "Pop-up Chef", "Restaurant Owner",
];

const SECRET_TYPES = [
  {
    id:          "recipe",
    emoji:       "🍝",
    label:       "Secret recipe",
    placeholder: "My carbonara secret: use 70% pecorino, 30% parmesan, and add the pasta water off the heat. The residual starch is what makes it silky — never cream. And always use guanciale, never bacon...",
  },
  {
    id:          "technique",
    emoji:       "🔪",
    label:       "Kitchen technique",
    placeholder: "The single most important thing I've learned in 15 years: season in layers, not at the end. Every component should taste perfect on its own before it hits the plate...",
  },
  {
    id:          "note",
    emoji:       "💌",
    label:       "Personal thank-you",
    placeholder: "Thank you so much for the tip — it honestly means the world to me. If you're ever back, ask for me at the pass and I'll make sure your table gets something special from the kitchen...",
  },
  {
    id:          "link",
    emoji:       "🔗",
    label:       "Recipe or video link",
    placeholder: "https://youtube.com/... or https://...",
  },
];

type Step = 1 | 2 | 3 | 4 | 5;

interface Chef {
  id: string;
  slug: string;
  name: string | null;
  role: string | null;
  restaurant: string | null;
  hook: string | null;
  avatar_url: string | null;
  cover_url: string | null;
  tip_reward: string | null;
}

/* ── Flame icon that grows with progress ─────────────────────────── */
function Flame({ pct }: { pct: number }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C10 6 6 9 6 14a6 6 0 0012 0c0-3.5-2-6-3-8 0 0 0 3-2 4-1-2-1-5 1-8z"
        fill={`rgba(201,169,110,${0.3 + pct * 0.7})`}
      />
      <path
        d="M12 13c0 0-2-1.2-2-3 0-1.4.9-2.3 2-2.5 1.1.2 2 1.1 2 2.5 0 1.8-2 3-2 3z"
        fill="#F59E0B"
        opacity={0.5 + pct * 0.5}
      />
    </svg>
  );
}

/* ── Live profile card preview ───────────────────────────────────── */
function ProfilePreview({
  name, role, restaurant, avatarUrl, slug,
}: {
  name: string; role: string; restaurant: string; avatarUrl: string | null; slug: string;
}) {
  const display = name.trim() || slug;
  return (
    <div className="w-60 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-gray-50">
      <div className="h-20 relative" style={{ background: "linear-gradient(135deg,#4a2c0a 0%,#1a1a1a 100%)" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-50/70" />
      </div>
      <div className="px-4 pb-4 -mt-8">
        <div className="w-14 h-14 rounded-2xl border-4 border-white shadow-md bg-amber-50 flex items-center justify-center overflow-hidden mb-2">
          {avatarUrl
            ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            : <span className="text-amber-700 font-bold text-xl">{display[0]?.toUpperCase()}</span>
          }
        </div>
        <p className="text-gray-900 font-semibold text-sm leading-snug">
          {display}
          <span className="ml-1.5 text-xs bg-green-50 text-green-600 font-medium px-1.5 py-0.5 rounded-full">● Live</span>
        </p>
        {(role || restaurant) && (
          <p className="text-gray-400 text-xs mt-0.5 truncate">{[role, restaurant].filter(Boolean).join(" · ")}</p>
        )}
        <div className="mt-3 bg-white rounded-xl border border-gray-100 px-3 py-2 flex items-center justify-between">
          <span className="text-gray-400 text-xs">tipachef.com/{slug}</span>
          <span className="text-amber-400 text-xs">→</span>
        </div>
      </div>
    </div>
  );
}

/* ── Secret preview card ─────────────────────────────────────────── */
function SecretPreview({
  secretType, secretContent, firstName,
}: {
  secretType: string; secretContent: string; firstName: string;
}) {
  const type = SECRET_TYPES.find(t => t.id === secretType);
  return (
    <div className="w-64">
      <p className="text-white/25 text-xs tracking-widest uppercase mb-4 font-medium text-center">What tippers receive</p>
      <div
        className="rounded-3xl p-5 border"
        style={{ background: "rgba(201,169,110,0.06)", borderColor: "rgba(201,169,110,0.2)" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: "rgba(201,169,110,0.15)" }}
          >
            {type?.emoji}
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Unlocked for you</p>
            <p className="text-white/40 text-xs">After tipping {firstName}</p>
          </div>
        </div>
        <div className="rounded-2xl p-4 min-h-[72px]" style={{ background: "rgba(255,255,255,0.04)" }}>
          {secretContent.trim() ? (
            <p className="text-white/70 text-xs leading-relaxed">
              {secretContent.slice(0, 160)}{secretContent.length > 160 ? "..." : ""}
            </p>
          ) : (
            <p className="text-white/20 text-xs italic">Your secret appears here as they type...</p>
          )}
        </div>
        <div className="flex items-center justify-center gap-1.5 mt-3">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round">
            <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          <p className="text-white/20 text-xs">Revealed after payment</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════ */
export default function Onboarding() {
  const router   = useRouter();
  const supabase = createClient();

  const [chef,    setChef]    = useState<Chef | null>(null);
  const [loading, setLoading] = useState(true);
  const [step,    setStep]    = useState<Step>(1);

  /* Step 1 */
  const [name,       setName]       = useState("");
  const [role,       setRole]       = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [showRoles,  setShowRoles]  = useState(false);

  /* Step 2 */
  const [avatarUrl,       setAvatarUrl]       = useState<string | null>(null);
  const [avatarUploading, setAvatarUploading] = useState(false);

  /* Step 3 */
  const [secretType,    setSecretType]    = useState("recipe");
  const [secretContent, setSecretContent] = useState("");

  /* Step 4 */
  const [notifVisible, setNotifVisible] = useState(false);
  const [linkCopied,   setLinkCopied]   = useState(false);

  const [saving, setSaving] = useState(false);

  /* Load chef on mount */
  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login"); return; }
      const { data } = await supabase.from("chefs").select("*").eq("id", user.id).single();
      if (!data) { router.replace("/dashboard"); return; }
      // Already fully onboarded? Go to dashboard
      if (data.role && data.restaurant && data.avatar_url) {
        router.replace("/dashboard");
        return;
      }
      setChef(data);
      setName(data.name ?? "");
      setAvatarUrl(data.avatar_url ?? null);
      setLoading(false);
    }
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Step 1 save ─────────────────────────────────────────────── */
  async function saveStep1() {
    if (!chef || !name.trim()) return;
    // Advance immediately, save in background
    const updated = { ...chef, name: name.trim(), role: role.trim(), restaurant: restaurant.trim() };
    setChef(updated);
    setStep(2);
    supabase.from("chefs").update({
      name:       name.trim(),
      role:       role.trim(),
      restaurant: restaurant.trim(),
    }).eq("id", chef.id).then(({ error }) => {
      if (error) console.error("Step 1 save error:", error.message);
    });
  }

  /* ── Step 2 upload ───────────────────────────────────────────── */
  async function uploadAvatar(file: File) {
    if (!chef) return;
    // Show local preview instantly — never disappears regardless of upload result
    const localUrl = URL.createObjectURL(file);
    setAvatarUrl(localUrl);
    setAvatarUploading(true);

    const ext  = file.name.split(".").pop() ?? "jpg";
    const path = `${chef.id}/avatar.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, { upsert: true });

    if (!upErr) {
      const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
      await supabase.from("chefs").update({ avatar_url: publicUrl }).eq("id", chef.id);
      setAvatarUrl(publicUrl);
      setChef({ ...chef, avatar_url: publicUrl });
    } else {
      // Upload failed (bucket may not exist) but local preview stays visible
      // Store the file so we can retry saving when they continue
      console.error("Avatar upload error:", upErr.message);
      setChef({ ...chef, avatar_url: localUrl });
    }
    setAvatarUploading(false);
  }

  /* ── Step 3 save ─────────────────────────────────────────────── */
  async function saveSecret() {
    if (!chef) return;
    // Advance immediately, save in background
    goToStep4();
    if (secretContent.trim()) {
      supabase.from("chefs").update({ tip_reward: secretContent.trim() }).eq("id", chef.id)
        .then(({ error }) => {
          if (error) console.error("Secret save error:", error.message);
        });
    }
  }

  function goToStep4() {
    setStep(4);
    setTimeout(() => setNotifVisible(true), 600);
  }

  function copyLink() {
    if (!chef) return;
    navigator.clipboard.writeText(`https://tipachef.com/${chef.slug}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  }

  /* ── Loading ─────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!chef) return null;

  const firstName   = (name.trim() || chef.slug).split(" ")[0];
  const profileUrl  = `https://tipachef.com/${chef.slug}`;
  const stepPct     = (step - 1) / 4; // 0 to 1

  /* ══ STEP 4: The Moment (full screen dark) ══════════════════════ */
  if (step === 4) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "#080808" }}
      >
        {/* Phone notification drop */}
        <div
          className="mb-12 transition-all duration-700 ease-out"
          style={{
            opacity:   notifVisible ? 1 : 0,
            transform: notifVisible ? "translateY(0)" : "translateY(-50px)",
          }}
        >
          <div
            className="flex items-center gap-4 px-5 py-4 rounded-2xl border w-80 shadow-2xl"
            style={{
              background:   "rgba(255,255,255,0.08)",
              borderColor:  "rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg"
              style={{ background: "#C9A96E" }}
            >
              🍷
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-0.5">
                <p className="text-white/50 text-xs font-medium">Tip a Chef · just now</p>
              </div>
              <p className="text-white text-sm font-semibold">Sarah sent you $25</p>
              <p className="text-white/45 text-xs truncate">
                &ldquo;The tasting menu was life-changing. Thank you, Chef {firstName}.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Text reveal */}
        <div
          className="text-center transition-all duration-700"
          style={{
            opacity:          notifVisible ? 1 : 0,
            transform:        notifVisible ? "translateY(0)" : "translateY(24px)",
            transitionDelay:  "250ms",
          }}
        >
          <p className="text-white/30 text-xs tracking-widest uppercase mb-4">
            This is what it feels like.
          </p>
          <h1
            className="text-white mb-10 leading-tight"
            style={{
              fontFamily:   "Georgia, serif",
              fontSize:     "clamp(2rem, 5vw, 3.2rem)",
              fontWeight:   300,
              fontStyle:    "italic",
            }}
          >
            Now make it real.
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={() => router.push("/dashboard?tab=settings&stripe=connect")}
              className="px-8 py-4 rounded-2xl font-semibold text-sm transition-all shadow-lg flex items-center gap-2"
              style={{ background: "#C9A96E", color: "#111", boxShadow: "0 8px 30px rgba(201,169,110,0.35)" }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#111" opacity="0.8">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.594-7.305h.003z"/>
              </svg>
              Connect Stripe · get paid
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-8 py-4 rounded-2xl font-semibold text-sm border transition-all"
              style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}
            >
              Share my page first →
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ══ STEP 5: Kitchen Is Open ════════════════════════════════════ */
  if (step === 5) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl"
          style={{ background: "#FEF3E2" }}
        >
          🔥
        </div>

        <h1
          className="text-gray-900 font-semibold mb-3 leading-tight"
          style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", letterSpacing: "-0.03em" }}
        >
          Your kitchen is open.
        </h1>
        <p className="text-gray-400 text-sm max-w-xs mx-auto mb-10 leading-relaxed">
          Your tip page is live. Share the link or drop the QR code at your restaurant.
        </p>

        <div className="w-full max-w-sm bg-gray-50 rounded-3xl border border-gray-100 p-6 mb-6">
          <p className="text-gray-400 text-xs font-medium mb-1">Your tip page</p>
          <p className="text-gray-900 font-mono text-sm mb-5">tipachef.com/{chef.slug}</p>

          <div className="flex gap-2.5">
            <button
              onClick={copyLink}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all"
            >
              {linkCopied ? "Copied!" : "Copy link"}
            </button>
            <a
              href={`/${chef.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 rounded-2xl text-sm font-semibold text-center transition-all"
              style={{ background: "#C9A96E", color: "#111" }}
            >
              View page →
            </a>
          </div>
        </div>

        {/* Checklist */}
        <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-5 mb-6 text-left">
          <p className="text-gray-900 font-semibold text-sm mb-4">Mise en place</p>
          {[
            { done: true,              label: "Profile created" },
            { done: !!chef.avatar_url, label: "Add your photo" },
            { done: !!chef.tip_reward || !!secretContent, label: "Add your kitchen secret" },
            { done: false,             label: "Print your table QR card" },
            { done: false,             label: "Receive your first tip" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                style={{
                  background: item.done ? "#FEF3E2" : "#F3F4F6",
                  color:      item.done ? "#C9A96E" : "#D1D5DB",
                }}
              >
                {item.done ? "✓" : "·"}
              </div>
              <p className={`text-sm ${item.done ? "text-gray-700" : "text-gray-400"}`}>{item.label}</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="text-gray-400 text-sm hover:text-gray-700 transition-colors"
        >
          Go to dashboard →
        </button>
      </div>
    );
  }

  /* ══ STEPS 1-3: Split-screen wizard ════════════════════════════ */
  const filteredRoles = ROLES.filter(r =>
    r.toLowerCase().includes(role.toLowerCase())
  );

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT: Form panel ────────────────────────────────────── */}
      <div className="flex-1 bg-white flex flex-col min-h-screen">

        {/* Top bar: flame + progress */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <Flame pct={stepPct} />
            <div className="flex gap-1.5 ml-1">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="h-1.5 rounded-full transition-all duration-400"
                  style={{
                    width:      step >= s ? "20px" : "6px",
                    background: step >= s ? "#C9A96E" : "#E5E7EB",
                  }}
                />
              ))}
            </div>
          </div>
          {step > 1 && (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="text-gray-400 text-sm hover:text-gray-600 transition-colors flex items-center gap-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 5l-7 7 7 7"/>
              </svg>
              Back
            </button>
          )}
        </div>

        {/* Form body */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-14 py-12">

          {/* ── STEP 1: Identity ─────────────────────────────── */}
          {step === 1 && (
            <div className="w-full max-w-sm">
              <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-3">Step 1 of 3</p>
              <h1
                className="text-gray-900 font-semibold leading-tight mb-2"
                style={{ fontSize: "clamp(1.7rem,3vw,2.2rem)", letterSpacing: "-0.03em" }}
              >
                Tell us who you are,<br />Chef.
              </h1>
              <p className="text-gray-400 text-sm mb-8">This appears on your public tip page. You can edit it any time.</p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Your name *</label>
                  <input
                    autoFocus
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveStep1()}
                    placeholder="Marco Rossi"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-gray-300"
                  />
                </div>

                <div className="relative">
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Your role</label>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    onFocus={() => setShowRoles(true)}
                    onBlur={() => setTimeout(() => setShowRoles(false), 160)}
                    placeholder="Head Chef, Sous Chef..."
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-gray-300"
                  />
                  {showRoles && filteredRoles.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-2xl border border-gray-100 shadow-xl z-20 py-1.5 overflow-hidden">
                      {filteredRoles.map((r) => (
                        <button
                          key={r}
                          onMouseDown={() => { setRole(r); setShowRoles(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-gray-400 font-medium mb-1.5 block">Restaurant / venue</label>
                  <input
                    value={restaurant}
                    onChange={(e) => setRestaurant(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveStep1()}
                    placeholder="Noma, Copenhagen"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>

              <button
                onClick={saveStep1}
                disabled={!name.trim()}
                className="w-full mt-6 py-4 rounded-2xl font-semibold text-sm transition-all duration-200 disabled:cursor-not-allowed"
                style={{
                  background: name.trim() ? "#C9A96E" : "#E5E7EB",
                  color:      name.trim() ? "#111"    : "#9CA3AF",
                  boxShadow:  name.trim() ? "0 6px 24px rgba(201,169,110,0.3)" : "none",
                }}
              >
                Next: Add your photo →
              </button>
            </div>
          )}

          {/* ── STEP 2: Photo ────────────────────────────────── */}
          {step === 2 && (
            <div className="w-full max-w-sm">
              <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-3">Step 2 of 3</p>
              <h1
                className="text-gray-900 font-semibold leading-tight mb-2"
                style={{ fontSize: "clamp(1.7rem,3vw,2.2rem)", letterSpacing: "-0.03em" }}
              >
                Put a face<br />to the food.
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Profiles with a photo get{" "}
                <span className="font-semibold text-gray-600">3x more tips</span>.
                You can skip this and add later.
              </p>

              {/* Upload zone */}
              <label className="block cursor-pointer group">
                <div
                  className="w-full h-52 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300"
                  style={{
                    borderColor: avatarUrl ? "#C9A96E" : "#E5E7EB",
                    background:  avatarUrl ? "transparent" : "#F9FAFB",
                  }}
                >
                  {avatarUrl ? (
                    <>
                      <img src={avatarUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
                          <circle cx="12" cy="13" r="4"/>
                        </svg>
                        <p className="text-white text-sm font-medium">Change photo</p>
                      </div>
                    </>
                  ) : avatarUploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
                      <p className="text-gray-400 text-sm">Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                        style={{ background: "#FEF3E2" }}
                      >
                        📸
                      </div>
                      <p className="text-gray-700 text-sm font-medium">Drop your chef photo here</p>
                      <p className="text-gray-300 text-xs">or click to browse · JPG, PNG, HEIC</p>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={avatarUploading}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) uploadAvatar(f);
                  }}
                />
              </label>

              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition-all"
                >
                  Skip for now
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!avatarUrl || avatarUploading}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-semibold transition-all disabled:opacity-40"
                  style={{
                    background: avatarUrl ? "#C9A96E" : "#E5E7EB",
                    color:      avatarUrl ? "#111"    : "#9CA3AF",
                    boxShadow:  avatarUrl ? "0 6px 24px rgba(201,169,110,0.3)" : "none",
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Secret ───────────────────────────────── */}
          {step === 3 && (
            <div className="w-full max-w-sm">
              <p className="text-amber-500 text-xs font-medium tracking-widest uppercase mb-3">Step 3 of 3</p>
              <h1
                className="text-gray-900 font-semibold leading-tight mb-2"
                style={{ fontSize: "clamp(1.7rem,3vw,2.2rem)", letterSpacing: "-0.03em" }}
              >
                Every great chef<br />has a secret.
              </h1>
              <p className="text-gray-400 text-sm mb-6">
                Share something exclusive with supporters who tip you. A recipe, a technique, a personal note.
                They see it the moment their payment goes through.
              </p>

              {/* Type picker */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {SECRET_TYPES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSecretType(t.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all"
                    style={{
                      borderColor: secretType === t.id ? "#C9A96E" : "#E5E7EB",
                      background:  secretType === t.id ? "#FFFBF5" : "white",
                      color:       secretType === t.id ? "#92663A" : "#6B7280",
                    }}
                  >
                    <span className="text-base leading-none">{t.emoji}</span>
                    <span className="font-medium text-xs leading-tight">{t.label}</span>
                  </button>
                ))}
              </div>

              <textarea
                value={secretContent}
                onChange={(e) => setSecretContent(e.target.value)}
                placeholder={SECRET_TYPES.find(t => t.id === secretType)?.placeholder ?? ""}
                rows={5}
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all resize-none placeholder:text-gray-300 leading-relaxed"
              />

              <p className="text-gray-300 text-xs mt-2 mb-5">
                Tippers see this after their tip completes. You can update it any time in Settings.
              </p>

              <div className="flex gap-3">
                <button
                  onClick={goToStep4}
                  className="flex-[0.6] py-3.5 rounded-2xl text-sm font-medium border border-gray-200 text-gray-400 hover:bg-gray-50 transition-all"
                >
                  Skip
                </button>
                <button
                  onClick={saveSecret}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-semibold transition-all flex items-center justify-center gap-2"
                  style={{ background: "#C9A96E", color: "#111", boxShadow: "0 6px 24px rgba(201,169,110,0.3)" }}
                >
                  Fire it up 🔥
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── RIGHT: live preview (desktop only) ──────────────────── */}
      <div
        className="hidden lg:flex lg:w-[42%] xl:w-[38%] flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#0f0f0f 0%,#1a1208 100%)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center">
          <p className="text-white/20 text-xs tracking-widest uppercase mb-8 font-medium">
            {step === 3 ? "What tippers receive" : "Live preview"}
          </p>

          {step <= 2 && (
            <ProfilePreview
              name={name}
              role={role}
              restaurant={restaurant}
              avatarUrl={avatarUrl}
              slug={chef.slug}
            />
          )}

          {step === 3 && (
            <SecretPreview
              secretType={secretType}
              secretContent={secretContent}
              firstName={firstName}
            />
          )}

          <p className="text-white/10 text-xs mt-8">tipachef.com/{chef.slug}</p>
        </div>
      </div>
    </div>
  );
}
