"use client";

import { useState, useEffect } from "react";
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
    placeholder: "My carbonara secret: use 70% pecorino, 30% parmesan, add the pasta water off the heat. The residual starch makes it silky — never cream...",
  },
  {
    id:          "technique",
    emoji:       "🔪",
    label:       "Kitchen technique",
    placeholder: "The most important thing I learned: season in layers, not just at the end. Every component should taste right on its own before it hits the plate...",
  },
  {
    id:          "note",
    emoji:       "💌",
    label:       "Personal thank-you",
    placeholder: "Thank you so much for tipping — it honestly means the world. If you're ever back, ask for me at the pass and I'll make sure you get something special...",
  },
  {
    id:          "link",
    emoji:       "🔗",
    label:       "Recipe or video link",
    placeholder: "https://youtube.com/... or https://...",
  },
];

type Step = 0 | 1 | 2 | 3 | 4 | 5;

interface Chef {
  id: string;
  slug: string;
  name: string | null;
  role: string | null;
  restaurant: string | null;
  avatar_url: string | null;
}

/* ── Flame progress dots ──────────────────────────────────────────── */
function ProgressBar({ step }: { step: Step }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-base">🔥</span>
      <div className="flex gap-1.5">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{
              width:      step >= s ? "22px" : "6px",
              background: step >= s ? "#C9A96E" : "rgba(255,255,255,0.15)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Live profile preview ─────────────────────────────────────────── */
function ProfilePreview({ name, role, restaurant, avatarUrl, slug }: {
  name: string; role: string; restaurant: string;
  avatarUrl: string | null; slug: string;
}) {
  const display = name.trim() || slug;
  return (
    <div className="w-60 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/10 bg-gray-50">
      <div className="h-20" style={{ background: "linear-gradient(135deg,#4a2c0a,#1a1a1a)" }} />
      <div className="px-4 pb-4 -mt-8">
        <div className="w-14 h-14 rounded-2xl border-4 border-white shadow-md bg-amber-50 flex items-center justify-center overflow-hidden mb-2">
          {avatarUrl
            ? <img src={avatarUrl} alt="" className="w-full h-full object-cover" />
            : <span className="text-amber-700 font-bold text-xl">{display[0]?.toUpperCase()}</span>
          }
        </div>
        <p className="text-gray-900 font-semibold text-sm">
          {display}
          <span className="ml-1.5 text-xs bg-green-50 text-green-600 px-1.5 py-0.5 rounded-full">● Live</span>
        </p>
        {(role || restaurant) && (
          <p className="text-gray-400 text-xs mt-0.5 truncate">{[role, restaurant].filter(Boolean).join(" · ")}</p>
        )}
        <div className="mt-3 bg-white rounded-xl border border-gray-100 px-3 py-2">
          <span className="text-gray-400 text-xs">tipachef.com/{slug}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Secret preview ───────────────────────────────────────────────── */
function SecretPreview({ secretType, secretContent, firstName }: {
  secretType: string; secretContent: string; firstName: string;
}) {
  const type = SECRET_TYPES.find(t => t.id === secretType);
  return (
    <div className="w-64">
      <p className="text-white/25 text-xs tracking-widest uppercase mb-4 text-center">What tippers unlock</p>
      <div className="rounded-3xl p-5 border" style={{ background: "rgba(201,169,110,0.06)", borderColor: "rgba(201,169,110,0.2)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{ background: "rgba(201,169,110,0.15)" }}>
            {type?.emoji}
          </div>
          <div>
            <p className="text-white text-xs font-semibold">Unlocked for you</p>
            <p className="text-white/40 text-xs">After tipping {firstName}</p>
          </div>
        </div>
        <div className="rounded-2xl p-4 min-h-[64px]" style={{ background: "rgba(255,255,255,0.04)" }}>
          {secretContent.trim()
            ? <p className="text-white/70 text-xs leading-relaxed">{secretContent.slice(0, 140)}{secretContent.length > 140 ? "..." : ""}</p>
            : <p className="text-white/20 text-xs italic">Your secret appears here...</p>
          }
        </div>
        <p className="text-white/20 text-xs text-center mt-3">🔒 Revealed after payment</p>
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
  const [step,    setStep]    = useState<Step>(0);

  /* Step 0 */
  const [userType, setUserType] = useState<"chef" | "diner" | null>(null);

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

  /* ── Load chef ────────────────────────────────────────────────── */
  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.replace("/login"); return; }

        const { data, error } = await supabase
          .from("chefs")
          .select("id, slug, name, role, restaurant, avatar_url")
          .eq("id", user.id)
          .single();

        if (error || !data) {
          router.replace("/dashboard");
          return;
        }

        setChef(data);
        setName(data.name ?? "");
        setRole(data.role ?? "");
        setRestaurant(data.restaurant ?? "");
        setAvatarUrl(data.avatar_url ?? null);
      } catch (e) {
        console.error("Onboarding load error:", e);
      } finally {
        setLoading(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Step 0: role gate ────────────────────────────────────────── */
  function goStep0() {
    if (!userType) return;
    if (userType === "diner") {
      router.replace("/search");
      return;
    }
    setStep(1);
  }

  /* ── Step 1: always advance, save in background ───────────────── */
  function goStep1() {
    if (!chef || !name.trim()) return;
    const updated = { ...chef, name: name.trim(), role: role.trim(), restaurant: restaurant.trim() };
    setChef(updated);
    setStep(2);
    supabase.from("chefs").update({
      name:       name.trim(),
      role:       role.trim() || null,
      restaurant: restaurant.trim() || null,
    }).eq("id", chef.id).then(({ error }) => {
      if (error) console.error("Step1 save:", error.message);
    });
  }

  /* ── Step 2: avatar upload with instant local preview ─────────── */
  async function uploadAvatar(file: File) {
    if (!chef) return;
    const local = URL.createObjectURL(file);
    setAvatarUrl(local);
    setAvatarUploading(true);
    try {
      const ext  = file.name.split(".").pop() ?? "jpg";
      const path = `${chef.id}/avatar.${ext}`;
      const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
      if (!upErr) {
        const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
        await supabase.from("chefs").update({ avatar_url: publicUrl }).eq("id", chef.id);
        setAvatarUrl(publicUrl);
        setChef(c => c ? { ...c, avatar_url: publicUrl } : c);
      } else {
        console.error("Avatar upload:", upErr.message);
      }
    } catch (e) {
      console.error("Avatar upload exception:", e);
    } finally {
      setAvatarUploading(false);
    }
  }

  /* ── Step 3: save secret, always advance ─────────────────────── */
  function goStep3Done() {
    setStep(4);
    setTimeout(() => setNotifVisible(true), 400);
    if (secretContent.trim() && chef) {
      supabase.from("chefs")
        .update({ tip_reward: secretContent.trim() } as never)
        .eq("id", chef.id)
        .then(({ error }) => { if (error) console.error("Secret save:", error.message); });
    }
  }

  /* ── Loading ──────────────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <div className="w-7 h-7 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!chef) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0a0a0a" }}>
        <div className="text-center">
          <p className="text-white/40 text-sm mb-4">Could not load your profile.</p>
          <button onClick={() => router.replace("/dashboard")} className="text-amber-500 underline text-sm">Go to dashboard</button>
        </div>
      </div>
    );
  }

  const firstName  = (name.trim() || chef.slug).split(" ")[0];
  const profileUrl = `https://tipachef.com/${chef.slug}`;

  /* ══ STEP 0: Role Gate ══════════════════════════════════════════ */
  if (step === 0) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(160deg,#0d0d0d,#111008)" }}
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(201,169,110,0.07), transparent 65%)" }} />

        <div className="relative z-10 w-full max-w-sm">
          {/* Badge */}
          <div className="mb-8 flex justify-center">
            <span
              className="text-xs font-medium px-4 py-1.5 rounded-full border"
              style={{ borderColor: "rgba(201,169,110,0.3)", color: "#C9A96E", background: "rgba(201,169,110,0.08)" }}
            >
              Honour the craft.
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white text-center mb-2" style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Welcome to
          </h1>
          <h1
            className="text-center mb-5"
            style={{ fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.03em", fontStyle: "italic", lineHeight: 1.1, color: "#C9A96E" }}
          >
            Tip a Chef.
          </h1>
          <p className="text-white/40 text-center text-sm leading-relaxed mb-10">
            The platform where great cooking finally gets rewarded.<br />Who are you joining as?
          </p>

          {/* Cards */}
          <div className="space-y-3 mb-8">
            {/* Chef card */}
            <button
              onClick={() => setUserType("chef")}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200"
              style={{
                borderColor: userType === "chef" ? "#C9A96E" : "rgba(255,255,255,0.08)",
                background:  userType === "chef" ? "rgba(201,169,110,0.10)" : "rgba(255,255,255,0.03)",
                boxShadow:   userType === "chef" ? "0 0 0 1px #C9A96E" : "none",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: userType === "chef" ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.06)" }}
              >
                👨‍🍳
              </div>
              <div>
                <p className="text-white font-semibold text-sm">I&apos;m a chef / food creator</p>
                <p className="text-white/40 text-xs mt-0.5">I want to receive tips and build my supporter base</p>
              </div>
              {userType === "chef" && (
                <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#C9A96E" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
              )}
            </button>

            {/* Diner card */}
            <button
              onClick={() => setUserType("diner")}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-200"
              style={{
                borderColor: userType === "diner" ? "#C9A96E" : "rgba(255,255,255,0.08)",
                background:  userType === "diner" ? "rgba(201,169,110,0.10)" : "rgba(255,255,255,0.03)",
                boxShadow:   userType === "diner" ? "0 0 0 1px #C9A96E" : "none",
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                style={{ background: userType === "diner" ? "rgba(201,169,110,0.2)" : "rgba(255,255,255,0.06)" }}
              >
                🍽️
              </div>
              <div>
                <p className="text-white font-semibold text-sm">I&apos;m a diner / food lover</p>
                <p className="text-white/40 text-xs mt-0.5">I want to discover and support chefs I love</p>
              </div>
              {userType === "diner" && (
                <div className="ml-auto w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "#C9A96E" }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>
              )}
            </button>
          </div>

          {/* Continue */}
          <button
            onClick={goStep0}
            disabled={!userType}
            className="w-full py-4 rounded-2xl font-semibold text-sm transition-all duration-200"
            style={{
              background: userType ? "#C9A96E"      : "rgba(255,255,255,0.06)",
              color:      userType ? "#111"          : "rgba(255,255,255,0.2)",
              boxShadow:  userType ? "0 8px 30px rgba(201,169,110,0.35)" : "none",
              cursor:     userType ? "pointer"       : "not-allowed",
            }}
          >
            Continue
          </button>
        </div>
      </div>
    );
  }

  /* ══ STEP 4: The Moment ════════════════════════════════════════ */
  if (step === 4) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#080808" }}>
        {/* Notification */}
        <div
          className="mb-12 transition-all duration-700 ease-out"
          style={{ opacity: notifVisible ? 1 : 0, transform: notifVisible ? "translateY(0)" : "translateY(-48px)" }}
        >
          <div className="flex items-center gap-4 px-5 py-4 rounded-2xl border w-80 shadow-2xl"
            style={{ background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.08)", backdropFilter: "blur(24px)" }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-lg" style={{ background: "#C9A96E" }}>
              🍷
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white/50 text-xs mb-0.5">Tip a Chef · just now</p>
              <p className="text-white text-sm font-semibold">Sarah sent you $25</p>
              <p className="text-white/45 text-xs truncate">&ldquo;The tasting menu was life-changing. Thank you, Chef {firstName}.&rdquo;</p>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          className="text-center transition-all duration-700"
          style={{ opacity: notifVisible ? 1 : 0, transform: notifVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: "200ms" }}
        >
          <p className="text-white/30 text-xs tracking-widest uppercase mb-4">This is what it feels like.</p>
          <h1 className="text-white mb-10 leading-tight" style={{ fontFamily: "Georgia,serif", fontSize: "clamp(2rem,5vw,3.2rem)", fontWeight: 300, fontStyle: "italic" }}>
            Now make it real.
          </h1>
          <div className="flex flex-col sm:flex-row items-center gap-3 justify-center">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-8 py-4 rounded-2xl font-semibold text-sm flex items-center gap-2"
              style={{ background: "#C9A96E", color: "#111", boxShadow: "0 8px 30px rgba(201,169,110,0.35)" }}
            >
              Connect Stripe · get paid
            </button>
            <button
              onClick={() => setStep(5)}
              className="px-8 py-4 rounded-2xl font-semibold text-sm border"
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
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 text-4xl" style={{ background: "#FEF3E2" }}>
          🔥
        </div>
        <h1 className="text-gray-900 font-semibold mb-3" style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", letterSpacing: "-0.03em" }}>
          Your kitchen is open.
        </h1>
        <p className="text-gray-400 text-sm max-w-xs mx-auto mb-10 leading-relaxed">
          Your tip page is live. Share the link or drop the QR at your restaurant.
        </p>

        <div className="w-full max-w-sm bg-gray-50 rounded-3xl border border-gray-100 p-6 mb-6">
          <p className="text-gray-400 text-xs mb-1">Your tip page</p>
          <p className="text-gray-900 font-mono text-sm mb-5">tipachef.com/{chef.slug}</p>
          <div className="flex gap-2.5">
            <button
              onClick={() => { navigator.clipboard.writeText(profileUrl); setLinkCopied(true); setTimeout(() => setLinkCopied(false), 2000); }}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold border border-gray-200 text-gray-700 hover:bg-gray-100 transition-all"
            >
              {linkCopied ? "Copied!" : "Copy link"}
            </button>
            <a href={`/${chef.slug}`} target="_blank" rel="noopener noreferrer"
              className="flex-1 py-3 rounded-2xl text-sm font-semibold text-center"
              style={{ background: "#C9A96E", color: "#111" }}
            >
              View page →
            </a>
          </div>
        </div>

        {/* Mise en place checklist */}
        <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 p-5 mb-6 text-left">
          <p className="text-gray-900 font-semibold text-sm mb-4">Mise en place</p>
          {[
            { done: true,               label: "Profile created" },
            { done: !!avatarUrl,        label: "Profile photo added" },
            { done: !!secretContent,    label: "Kitchen secret added" },
            { done: false,              label: "Print your QR table card" },
            { done: false,              label: "Receive your first tip" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs"
                style={{ background: item.done ? "#FEF3E2" : "#F3F4F6", color: item.done ? "#C9A96E" : "#D1D5DB" }}
              >
                {item.done ? "✓" : "·"}
              </div>
              <p className={`text-sm ${item.done ? "text-gray-700" : "text-gray-400"}`}>{item.label}</p>
            </div>
          ))}
        </div>

        <button onClick={() => router.push("/dashboard")} className="text-gray-400 text-sm hover:text-gray-700 transition-colors">
          Go to dashboard →
        </button>
      </div>
    );
  }

  /* ══ STEPS 1-3: Split wizard ════════════════════════════════════ */
  const filteredRoles = ROLES.filter(r => r.toLowerCase().includes(role.toLowerCase()));

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT: form ─────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col" style={{ background: "#0d0d0d" }}>

        {/* Topbar */}
        <div className="flex items-center justify-between px-8 py-5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
          <ProgressBar step={step} />
          <button
            onClick={() => setStep(s => (s - 1) as Step)}
            className="text-sm flex items-center gap-1 transition-colors"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
            Back
          </button>
        </div>

        {/* Form */}
        <div className="flex-1 flex items-center justify-center px-8 lg:px-14 py-12">

          {/* ── STEP 1 ─────────────────────────────────────────── */}
          {step === 1 && (
            <div className="w-full max-w-sm">
              <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "#C9A96E" }}>Step 1 of 3</p>
              <h1 className="text-white font-semibold leading-tight mb-2" style={{ fontSize: "clamp(1.7rem,3vw,2.2rem)", letterSpacing: "-0.03em" }}>
                Tell us who you are,<br />Chef.
              </h1>
              <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>This appears on your public tip page. Edit any time.</p>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)" }}>Your name *</label>
                  <input
                    autoFocus
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && goStep1()}
                    placeholder="Marco Rossi"
                    className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all placeholder:text-white/15"
                    style={{
                      background:   "rgba(255,255,255,0.05)",
                      border:       "1.5px solid rgba(255,255,255,0.1)",
                      color:        "white",
                    }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,169,110,0.12)"; }}
                    onBlur={e  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>

                <div className="relative">
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)" }}>Your role</label>
                  <input
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    onFocus={e => { setShowRoles(true); e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,169,110,0.12)"; }}
                    onBlur={e => { setTimeout(() => setShowRoles(false), 160); e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                    placeholder="Head Chef, Sous Chef..."
                    className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all placeholder:text-white/15"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "white" }}
                  />
                  {showRoles && filteredRoles.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 rounded-2xl border shadow-2xl z-20 py-1.5 max-h-44 overflow-y-auto" style={{ background: "#1a1a1a", borderColor: "rgba(255,255,255,0.08)" }}>
                      {filteredRoles.map(r => (
                        <button key={r} onMouseDown={() => { setRole(r); setShowRoles(false); }}
                          className="w-full text-left px-4 py-2.5 text-sm transition-colors"
                          style={{ color: "rgba(255,255,255,0.65)" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,169,110,0.08)"; e.currentTarget.style.color = "#C9A96E"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.65)"; }}
                        >{r}</button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs font-medium mb-1.5 block" style={{ color: "rgba(255,255,255,0.4)" }}>Restaurant / venue</label>
                  <input
                    value={restaurant}
                    onChange={e => setRestaurant(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && goStep1()}
                    placeholder="Noma, Copenhagen"
                    className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all placeholder:text-white/15"
                    style={{ background: "rgba(255,255,255,0.05)", border: "1.5px solid rgba(255,255,255,0.1)", color: "white" }}
                    onFocus={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,169,110,0.12)"; }}
                    onBlur={e  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              <button
                onClick={goStep1}
                disabled={!name.trim()}
                className="w-full mt-6 py-4 rounded-2xl font-semibold text-sm transition-all disabled:cursor-not-allowed"
                style={{
                  background: name.trim() ? "#C9A96E" : "rgba(255,255,255,0.07)",
                  color:      name.trim() ? "#111"    : "rgba(255,255,255,0.2)",
                  boxShadow:  name.trim() ? "0 6px 24px rgba(201,169,110,0.3)" : "none",
                }}
              >
                Next: Add your photo →
              </button>
            </div>
          )}

          {/* ── STEP 2 ─────────────────────────────────────────── */}
          {step === 2 && (
            <div className="w-full max-w-sm">
              <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "#C9A96E" }}>Step 2 of 3</p>
              <h1 className="text-white font-semibold leading-tight mb-2" style={{ fontSize: "clamp(1.7rem,3vw,2.2rem)", letterSpacing: "-0.03em" }}>
                Put a face<br />to the food.
              </h1>
              <p className="text-sm mb-8" style={{ color: "rgba(255,255,255,0.35)" }}>
                Profiles with a photo get <span className="font-semibold text-white/70">3x more tips</span>. You can skip and add later.
              </p>

              <label className="block cursor-pointer group">
                <div
                  className="w-full h-52 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center relative overflow-hidden transition-all duration-300"
                  style={{ borderColor: avatarUrl ? "#C9A96E" : "rgba(255,255,255,0.1)", background: avatarUrl ? "transparent" : "rgba(255,255,255,0.03)" }}
                >
                  {avatarUrl ? (
                    <>
                      <img src={avatarUrl} alt="" className="absolute inset-0 w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
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
                      <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>Uploading...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 group-hover:scale-105 transition-transform">
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl" style={{ background: "rgba(201,169,110,0.12)" }}>📸</div>
                      <p className="text-white text-sm font-medium">Drop your chef photo here</p>
                      <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>or click to browse · JPG, PNG, HEIC</p>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" className="hidden" disabled={avatarUploading}
                  onChange={e => { const f = e.target.files?.[0]; if (f) uploadAvatar(f); }}
                />
              </label>

              <div className="flex gap-3 mt-5">
                <button onClick={() => setStep(3)}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-medium border transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)" }}
                >
                  Skip for now
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-semibold transition-all"
                  style={{
                    background: avatarUrl ? "#C9A96E" : "rgba(255,255,255,0.07)",
                    color:      avatarUrl ? "#111"    : "rgba(255,255,255,0.2)",
                    opacity:    avatarUploading ? 0.5 : 1,
                    boxShadow:  avatarUrl ? "0 6px 24px rgba(201,169,110,0.3)" : "none",
                  }}
                  disabled={avatarUploading}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3 ─────────────────────────────────────────── */}
          {step === 3 && (
            <div className="w-full max-w-sm">
              <p className="text-xs font-medium tracking-widest uppercase mb-3" style={{ color: "#C9A96E" }}>Step 3 of 3</p>
              <h1 className="text-white font-semibold leading-tight mb-2" style={{ fontSize: "clamp(1.7rem,3vw,2.2rem)", letterSpacing: "-0.03em" }}>
                Every great chef<br />has a secret.
              </h1>
              <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.35)" }}>
                Share something exclusive with supporters who tip you. They see it the moment their payment goes through.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {SECRET_TYPES.map(t => (
                  <button key={t.id} onClick={() => setSecretType(t.id)}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all"
                    style={{
                      borderColor: secretType === t.id ? "#C9A96E" : "rgba(255,255,255,0.08)",
                      background:  secretType === t.id ? "rgba(201,169,110,0.1)" : "rgba(255,255,255,0.03)",
                      color:       secretType === t.id ? "#C9A96E" : "rgba(255,255,255,0.45)",
                    }}
                  >
                    <span className="text-base">{t.emoji}</span>
                    <span className="font-medium text-xs">{t.label}</span>
                  </button>
                ))}
              </div>

              <textarea
                value={secretContent}
                onChange={e => setSecretContent(e.target.value)}
                placeholder={SECRET_TYPES.find(t => t.id === secretType)?.placeholder ?? ""}
                rows={5}
                className="w-full px-4 py-3.5 rounded-2xl text-sm outline-none transition-all resize-none leading-relaxed placeholder:text-white/15"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border:     "1.5px solid rgba(255,255,255,0.1)",
                  color:      "white",
                }}
                onFocus={e => { e.currentTarget.style.borderColor = "#C9A96E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(201,169,110,0.12)"; }}
                onBlur={e  => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
              />

              <p className="text-xs mt-2 mb-5" style={{ color: "rgba(255,255,255,0.2)" }}>Tippers see this after their tip completes. Edit any time in Settings.</p>

              <div className="flex gap-3">
                <button onClick={goStep3Done}
                  className="flex-[0.55] py-3.5 rounded-2xl text-sm font-medium border transition-all"
                  style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}
                >
                  Skip
                </button>
                <button onClick={goStep3Done}
                  className="flex-1 py-3.5 rounded-2xl text-sm font-semibold flex items-center justify-center gap-2"
                  style={{ background: "#C9A96E", color: "#111", boxShadow: "0 6px 24px rgba(201,169,110,0.3)" }}
                >
                  Fire it up 🔥
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── RIGHT: live preview ─────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-[42%] xl:w-[38%] flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(160deg,#0a0a0a,#100e04)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 60%, rgba(201,169,110,0.08), transparent 70%)" }} />
        <div className="relative z-10 flex flex-col items-center">
          <p className="text-xs tracking-widest uppercase mb-8" style={{ color: "rgba(255,255,255,0.2)" }}>
            {step === 3 ? "What tippers unlock" : "Live preview"}
          </p>
          {step <= 2 && (
            <ProfilePreview name={name} role={role} restaurant={restaurant} avatarUrl={avatarUrl} slug={chef.slug} />
          )}
          {step === 3 && (
            <SecretPreview secretType={secretType} secretContent={secretContent} firstName={firstName} />
          )}
          <p className="text-xs mt-8" style={{ color: "rgba(255,255,255,0.1)" }}>tipachef.com/{chef.slug}</p>
        </div>
      </div>
    </div>
  );
}
