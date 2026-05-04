"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@/lib/supabase/client";

export default function SignUp() {
  const [slug,      setSlug]      = useState("");
  const [showAuth,  setShowAuth]  = useState(false);
  const [email,     setEmail]     = useState("");
  const [password,  setPassword]  = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [slugStatus, setSlugStatus] = useState<"idle"|"checking"|"taken"|"available">("idle");

  const slugValue  = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
  const profileUrl = `tipachef.com/${slugValue || "yourname"}`;
  const fullUrl    = `https://tipachef.com/${slugValue}`;
  const supabase   = createClient();

  // Debounce slug availability check
  useEffect(() => {
    if (!slugValue || slugValue.length < 2) { setSlugStatus("idle"); return; }
    setSlugStatus("checking");
    const timer = setTimeout(async () => {
      const res  = await fetch(`/api/chefs?slug=${slugValue}`);
      const data = await res.json();
      setSlugStatus(data.available ? "available" : "taken");
    }, 500);
    return () => clearTimeout(timer);
  }, [slugValue]);

  async function signUpWithGoogle() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?slug=${slugValue}&next=/onboarding`,
      },
    });
  }

  async function signUpWithApple() {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback?slug=${slugValue}&next=/onboarding`,
      },
    });
  }

  async function signUpWithEmail() {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback?slug=${slugValue}&next=/onboarding`,
        data: { slug: slugValue },
      },
    });
    if (signUpError) { setError(signUpError.message); setLoading(false); return; }

    // Create chef profile immediately
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("chefs").upsert({
        id:   user.id,
        slug: slugValue,
        name: email.split("@")[0],
      }, { onConflict: "id" });
    }
    window.location.href = "/onboarding";
  }

  const canProceed = slugValue.length >= 2 && slugStatus === "available";

  return (
    <div className="min-h-screen flex">

      {/* ── Left: brand photo panel ───────────────────────── */}
      <div className="hidden lg:flex lg:w-[46%] xl:w-[44%] relative flex-col justify-between p-12 overflow-hidden bg-graphite">
        <Image src="/tipchef-welcome.png" alt="Chef" fill priority className="object-cover object-top opacity-30" sizes="46vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-graphite/40 to-graphite/90" />

        <div className="relative z-10 flex items-center gap-3">
          <Image src="/tipchef-logo.png" alt="Tip a Chef" width={36} height={36} className="rounded-xl" />
          <span className="font-display text-ivory italic" style={{ fontSize: "1.3rem", fontWeight: 400 }}>Tip a Chef</span>
        </div>

        <div className="relative z-10">
          <p className="eyebrow text-ember mb-4">Join the kitchen</p>
          <h2 className="font-display text-ivory leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300 }}>
            Start earning what<br />
            <span className="text-ember-gradient italic">your cooking deserves.</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { value: "$47",    label: "Avg. tip earned" },
              { value: "2,400+", label: "Chefs earning"   },
              { value: "380+",   label: "Partner venues"  },
              { value: "Free",   label: "Forever to join" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl px-4 py-3">
                <p className="font-display text-ember text-xl font-light mb-0.5">{s.value}</p>
                <p className="font-sans text-ivory/40 text-xs">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <p className="font-sans text-ivory/25 text-xs">© 2026 Tip a Chef Ltd.</p>
        </div>
      </div>

      {/* ── Right: Apple-white form panel ────────────────────── */}
      <div className="flex-1 bg-white flex flex-col relative">

        <div className="flex items-center justify-between px-8 lg:px-12 py-5">
          <Link href="/" className="flex items-center gap-2 lg:hidden">
            <Image src="/tipchef-logo.png" alt="" width={26} height={26} className="rounded-lg" />
            <span className="font-display text-gray-900 italic">Tip a Chef</span>
          </Link>
          <div className="hidden lg:block" />
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="text-gray-900 font-semibold underline underline-offset-4 hover:text-amber-700 transition-colors">Sign in</Link>
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 lg:px-16">

          {/* ── Step 1: claim slug ── */}
          {!showAuth && (
            <div className="w-full max-w-sm">
              <h1 className="text-gray-900 font-semibold mb-2" style={{ fontSize: "2rem", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                Create your account
              </h1>
              <p className="text-gray-400 text-sm mb-8">Choose a username for your chef page.</p>

              <div className={`rounded-2xl border flex items-center overflow-hidden transition-all ${
                slugStatus === "taken"     ? "border-red-400 ring-2 ring-red-400/20 bg-red-50/30" :
                slugStatus === "available" ? "border-green-400 ring-2 ring-green-400/20 bg-green-50/20" :
                "border-gray-200 bg-gray-50 focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-400/20"
              }`}>
                <span className="pl-5 pr-1 py-4 text-gray-400 text-sm font-sans whitespace-nowrap select-none">tipachef.com/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="yourname"
                  autoFocus
                  className="flex-1 bg-transparent py-4 pr-5 text-gray-900 text-sm outline-none placeholder:text-gray-300"
                />
                {slugStatus === "checking"  && <span className="pr-4 text-gray-300 text-xs">checking...</span>}
                {slugStatus === "taken"     && <span className="pr-4 text-red-400 text-xs">taken</span>}
                {slugStatus === "available" && (
                  <span className="pr-4">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </span>
                )}
              </div>

              {slugStatus === "taken" && (
                <p className="mt-2 text-xs text-red-500">This username is taken. Try another.</p>
              )}

              {/* QR reveal */}
              <div className="transition-all duration-500 overflow-hidden" style={{ maxHeight: canProceed ? "220px" : "0px", opacity: canProceed ? 1 : 0, marginTop: canProceed ? "20px" : "0px" }}>
                <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 flex items-center gap-5">
                  <div className="flex-shrink-0 p-2 bg-white rounded-xl shadow-sm border border-gray-100">
                    {canProceed && <QRCodeSVG value={fullUrl} size={80} fgColor="#111111" bgColor="#FFFFFF" level="M" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 font-semibold text-sm mb-0.5 truncate">{profileUrl}</p>
                    <p className="text-gray-400 text-xs mb-3 leading-relaxed">Your personal QR code, ready to print and earn.</p>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{ background: "#FEF3E2", color: "#C9A96E" }}>
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
                      Yours the moment you sign up
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Step 2: auth ── */}
          {showAuth && (
            <div className="w-full max-w-sm">
              <h1 className="text-gray-900 font-semibold mb-2" style={{ fontSize: "2rem", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                Welcome, {slugValue}
              </h1>
              <p className="text-gray-400 text-sm mb-8">Choose how you want to sign up.</p>

              {error && (
                <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
              )}

              <div className="space-y-3 mb-6">
                <button onClick={signUpWithGoogle} disabled={loading} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 disabled:opacity-50">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Continue with Google
                </button>

                <button onClick={signUpWithApple} disabled={loading} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 disabled:opacity-50">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="black">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400">or</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="space-y-3">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full py-3.5 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-gray-400" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full py-3.5 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all placeholder:text-gray-400" />
                <button onClick={signUpWithEmail} disabled={loading || !email || !password} className="w-full py-3.5 rounded-2xl text-sm font-semibold transition-all disabled:opacity-50" style={{ background: email && password ? "#C9A96E" : "#E5E7EB", color: email && password ? "#111" : "#9CA3AF" }}>
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-8 lg:px-12 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 leading-none">
            By continuing, you agree to the{" "}
            <Link href="/terms" className="underline underline-offset-2 text-gray-500 hover:text-gray-800 transition-colors">terms of service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="underline underline-offset-2 text-gray-500 hover:text-gray-800 transition-colors">privacy policy</Link>.
          </p>
          <button
            onClick={() => canProceed && setShowAuth(true)}
            disabled={!canProceed}
            className="px-7 py-3 rounded-full font-semibold text-sm transition-all duration-300 flex-shrink-0 ml-6 leading-none disabled:cursor-not-allowed"
            style={{
              background: canProceed ? "#C9A96E" : "#E5E7EB",
              color:      canProceed ? "#111111" : "#9CA3AF",
              boxShadow:  canProceed ? "0 4px 20px rgba(201,169,110,0.35)" : "none",
              display:    showAuth   ? "none" : undefined,
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
