"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function ResetPassword() {
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [ready,     setReady]     = useState(false);
  const [done,      setDone]      = useState(false);
  const router  = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when user clicks the reset link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => subscription.unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleUpdate() {
    if (!password) return;
    if (password !== confirm) { setError("Passwords don't match"); return; }
    if (password.length < 6)  { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    const { error: updateErr } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (updateErr) { setError(updateErr.message); return; }
    setDone(true);
    setTimeout(() => router.replace("/dashboard"), 2000);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-8 py-5 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-2 w-fit">
          <Image src="/tipchef-logo.png" alt="Tip a Chef" width={28} height={28} className="rounded-lg" />
          <span className="font-display text-gray-900 italic text-lg">Tip a Chef</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-sm">

          {done ? (
            <div className="text-center">
              <div className="w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-6 text-3xl" style={{ background: "#FEF3E2" }}>
                ✅
              </div>
              <h1 className="text-gray-900 font-semibold mb-2" style={{ fontSize: "1.6rem", letterSpacing: "-0.02em" }}>
                Password updated!
              </h1>
              <p className="text-gray-400 text-sm">Redirecting you to your dashboard...</p>
            </div>
          ) : !ready ? (
            <div className="text-center">
              <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Verifying your reset link...</p>
              <p className="text-gray-300 text-xs mt-3">
                If nothing happens, go back and{" "}
                <Link href="/forgot-password" className="text-amber-600 underline">request a new link</Link>.
              </p>
            </div>
          ) : (
            <>
              <h1 className="text-gray-900 font-semibold mb-1.5" style={{ fontSize: "1.75rem", letterSpacing: "-0.02em" }}>
                Set new password
              </h1>
              <p className="text-gray-400 text-sm mb-8">Choose a strong password for your account.</p>

              {error && (
                <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-3 mb-5">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password (min. 6 characters)"
                  autoFocus
                  className="w-full py-4 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all placeholder:text-gray-300"
                />
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                  placeholder="Confirm new password"
                  className="w-full py-4 px-4 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all placeholder:text-gray-300"
                />
              </div>

              <button
                onClick={handleUpdate}
                disabled={loading || !password || !confirm}
                className="w-full py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 disabled:opacity-50"
                style={{
                  background: password && confirm ? "#C9A96E" : "#E5E7EB",
                  color:      password && confirm ? "#111111" : "#9CA3AF",
                }}
              >
                {loading ? "Updating..." : "Update password"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
