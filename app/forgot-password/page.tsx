"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPassword() {
  const [email,   setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent,    setSent]    = useState(false);
  const [error,   setError]   = useState("");
  const supabase = createClient();

  async function handleReset() {
    if (!email) return;
    setLoading(true);
    setError("");
    const { error: resetErr } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetErr) { setError(resetErr.message); return; }
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-8 py-5 border-b border-gray-100">
        <Link href="/login" className="flex items-center gap-2 w-fit">
          <Image src="/tipchef-logo.png" alt="Tip a Chef" width={28} height={28} className="rounded-lg" />
          <span className="font-display text-gray-900 italic text-lg">Tip a Chef</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">

          {sent ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background: "#FEF3E2" }}>
                📬
              </div>
              <h1 className="text-gray-900 font-semibold mb-2" style={{ fontSize: "1.6rem", letterSpacing: "-0.02em" }}>
                Check your inbox
              </h1>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                We sent a password reset link to <strong className="text-gray-700">{email}</strong>.
                Click the link in that email to choose a new password.
              </p>
              <p className="text-xs text-gray-400">
                Back to{" "}
                <Link href="/login" className="text-amber-600 font-medium underline underline-offset-2">
                  Sign in
                </Link>
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-gray-900 font-semibold mb-1.5" style={{ fontSize: "1.75rem", letterSpacing: "-0.02em" }}>
                Forgot password?
              </h1>
              <p className="text-gray-400 text-sm mb-8">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-3 mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleReset()}
                  placeholder="Your email address"
                  autoFocus
                  className="w-full py-4 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all placeholder:text-gray-300"
                />
              </div>

              <button
                onClick={handleReset}
                disabled={loading || !email}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 mb-6 disabled:opacity-50"
                style={{ background: email ? "#C9A96E" : "#E5E7EB", color: email ? "#111111" : "#9CA3AF" }}
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>

              <p className="text-center text-sm text-gray-400">
                Remember your password?{" "}
                <Link href="/login" className="text-gray-900 font-semibold underline underline-offset-4 hover:text-amber-700 transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
