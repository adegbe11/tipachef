"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [resetSent, setResetSent] = useState(false);
  const supabase = createClient();

  async function sendPasswordReset() {
    if (!email) { setError("Enter your email address above first."); return; }
    setLoading(true); setError("");
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard`,
    });
    setLoading(false);
    if (resetError) { setError(resetError.message); return; }
    setResetSent(true);
  }

  async function signInWithGoogle() {
    setLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard` },
    });
    if (oauthError) { setError(oauthError.message); setLoading(false); }
  }

  async function signInWithApple() {
    setLoading(true);
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: "apple",
      options: { redirectTo: `${window.location.origin}/api/auth/callback?next=/dashboard` },
    });
    if (oauthError) { setError(oauthError.message); setLoading(false); }
  }

  async function signInWithEmail() {
    if (!email || !password) return;
    setLoading(true);
    setError("");
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      const msg = signInError.message.toLowerCase();
      if (msg.includes("invalid") || msg.includes("credentials") || msg.includes("wrong")) {
        setError("Incorrect email or password. Please try again.");
      } else if (msg.includes("not confirmed") || msg.includes("email not confirmed")) {
        setError("Please confirm your email first. Check your inbox for a verification link.");
      } else if (msg.includes("too many")) {
        setError("Too many attempts. Please wait a moment and try again.");
      } else {
        setError(signInError.message);
      }
      setLoading(false);
      return;
    }
    window.location.href = "/dashboard";
  }

  return (
    <div className="min-h-screen flex">

      {/* ── Left: brand panel ─────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] relative flex-col justify-between p-12 overflow-hidden bg-graphite">
        <Image src="/tipchef-welcome.png" alt="Chef" fill priority className="object-cover object-top opacity-30" sizes="45vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-graphite/60 via-graphite/40 to-graphite/90" />

        <div className="relative z-10 flex items-center gap-3">
          <Image src="/tipchef-logo.png" alt="Tip a Chef" width={36} height={36} className="rounded-xl" />
          <span className="font-display text-ivory italic" style={{ fontSize: "1.3rem", fontWeight: 400 }}>Tip a Chef</span>
        </div>

        <div className="relative z-10">
          <p className="eyebrow text-ember mb-4">Welcome back</p>
          <h2 className="font-display text-ivory leading-tight mb-6" style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 300 }}>
            Good to see you<br />
            <span className="text-ember-gradient italic">back in the kitchen.</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { value: "$47",    label: "Avg. tip earned"  },
              { value: "2,400+", label: "Chefs earning"    },
              { value: "380+",   label: "Partner venues"   },
              { value: "4.9 ★",  label: "App store rating" },
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

      {/* ── Right: white form panel ───────────────────────── */}
      <div className="flex-1 bg-white flex flex-col">

        <div className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2.5 lg:hidden">
            <Image src="/tipchef-logo.png" alt="Tip a Chef" width={28} height={28} className="rounded-lg" />
            <span className="font-display text-gray-900 italic text-lg">Tip a Chef</span>
          </Link>
          <div className="hidden lg:block" />
          <p className="text-sm text-gray-500">
            New here?{" "}
            <Link href="/signup" className="font-semibold text-gray-900 underline underline-offset-4 hover:text-amber-700 transition-colors">Create an account</Link>
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-md">
            <h1 className="text-gray-900 font-semibold mb-1.5" style={{ fontSize: "1.75rem", letterSpacing: "-0.02em" }}>Sign in</h1>
            <p className="text-gray-400 text-sm mb-8">Enter your details to continue.</p>

            {error && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">{error}</div>
            )}

            <div className="space-y-3 mb-6">
              <button onClick={signInWithGoogle} disabled={loading} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-medium text-gray-700 disabled:opacity-50">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <button onClick={signInWithApple} disabled={loading} className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl bg-gray-900 hover:bg-black transition-all text-sm font-medium text-white disabled:opacity-50">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-300 font-sans">or continue with email</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            <div className="space-y-3 mb-5">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" autoFocus className="w-full py-4 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all placeholder:text-gray-300" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" onKeyDown={(e) => e.key === "Enter" && signInWithEmail()} className="w-full py-4 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all placeholder:text-gray-300" />
            </div>

            <div className="flex justify-end mb-6">
              <button onClick={sendPasswordReset} disabled={loading} className="text-xs text-gray-400 hover:text-gray-700 underline underline-offset-2 transition-colors disabled:opacity-50">
                {resetSent ? "Reset email sent!" : "Forgot password?"}
              </button>
            </div>

            <button onClick={signInWithEmail} disabled={loading || !email || !password} className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 mb-8 disabled:opacity-50" style={{ background: email && password ? "#C9A96E" : "#E5E7EB", color: email && password ? "#111111" : "#9CA3AF" }}>
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <p className="text-xs text-gray-300 text-center leading-relaxed">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-gray-500 transition-colors">Terms of Service</Link>
              {" "}and{" "}
              <Link href="/privacy" className="underline underline-offset-2 hover:text-gray-500 transition-colors">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
