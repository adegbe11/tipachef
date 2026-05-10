"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const PLATFORM_FEE = 0.05; // 5%
const ADMIN_EMAIL  = "adegbe11@gmail.com"; // change to your email

interface Stat {
  label: string;
  value: string;
  sub?: string;
}

interface TipRow {
  id: string;
  amount_cents: number;
  tipper_name: string | null;
  created_at: string;
  chef_id: string;
  chefs?: { name: string | null; slug: string };
}

export default function AdminPage() {
  const router  = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [tips,    setTips]    = useState<TipRow[]>([]);
  const [chefCount, setChefCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || user.email !== ADMIN_EMAIL) {
        router.replace("/dashboard");
        return;
      }
      setAllowed(true);

      // Fetch all tips with chef info
      const { data: tipData } = await supabase
        .from("tips")
        .select("*, chefs(name, slug)")
        .order("created_at", { ascending: false })
        .limit(200);

      // Fetch chef count
      const { count } = await supabase
        .from("chefs")
        .select("id", { count: "exact", head: true });

      setTips((tipData ?? []) as TipRow[]);
      setChefCount(count ?? 0);
      setLoading(false);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalVolumePence  = tips.reduce((s, t) => s + t.amount_cents, 0);
  const platformEarned    = Math.round(totalVolumePence * PLATFORM_FEE);
  const today             = new Date().toISOString().slice(0, 10);
  const todayTips         = tips.filter(t => t.created_at.slice(0, 10) === today);
  const todayVolume       = todayTips.reduce((s, t) => s + t.amount_cents, 0);

  const stats: Stat[] = [
    { label: "Total tip volume",   value: `£${(totalVolumePence / 100).toFixed(2)}`,  sub: `${tips.length} tips` },
    { label: "Platform earned (5%)", value: `£${(platformEarned / 100).toFixed(2)}`, sub: "in your Stripe balance" },
    { label: "Registered chefs",   value: String(chefCount),                          sub: "profiles created" },
    { label: "Today volume",       value: `£${(todayVolume / 100).toFixed(2)}`,       sub: `${todayTips.length} tips today` },
  ];

  if (loading || !allowed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-7 h-7 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: "#C9A96E" }}>
              Platform Admin
            </p>
            <h1 className="text-gray-900 font-semibold text-2xl" style={{ letterSpacing: "-0.02em" }}>
              Tip a Chef · Earnings
            </h1>
          </div>
          <a
            href="https://dashboard.stripe.com/balance"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background: "#635BFF" }}
          >
            Open Stripe dashboard →
          </a>
        </div>

        {/* How platform pay works */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-6">
          <p className="font-semibold text-amber-900 text-sm mb-2">💡 How your 5% gets paid to you</p>
          <div className="text-amber-800 text-xs leading-relaxed space-y-1">
            <p>Every tip sent to a connected chef automatically splits: <strong>95% → chef&apos;s Stripe account</strong>, <strong>5% → your Stripe account</strong> (the account whose API key is in your env vars).</p>
            <p>This is handled by Stripe Connect <code className="bg-amber-100 px-1 rounded">application_fee_amount</code>. You do not need to do anything — Stripe transfers your cut automatically on each payment.</p>
            <p>To withdraw your balance: go to your Stripe dashboard → Balance → Payouts → Add your bank account → funds arrive in 2 business days.</p>
            <p className="text-amber-600 font-medium">⚠️ Tips to chefs who have NOT connected Stripe bypass the split — full amount goes through your platform account. You need to manually transfer those when the chef eventually connects.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-gray-400 text-xs mb-2">{s.label}</p>
              <p className="text-gray-900 font-semibold text-xl" style={{ letterSpacing: "-0.02em" }}>{s.value}</p>
              {s.sub && <p className="text-gray-400 text-xs mt-1">{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* Tips table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
            <p className="text-gray-900 font-semibold text-sm">All tips</p>
            <p className="text-gray-400 text-xs">Most recent first</p>
          </div>
          {tips.length === 0 ? (
            <div className="px-5 py-12 text-center text-gray-400 text-sm">No tips yet.</div>
          ) : (
            <div className="divide-y divide-gray-50">
              {tips.map(t => {
                const fee = Math.round(t.amount_cents * PLATFORM_FEE);
                return (
                  <div key={t.id} className="px-5 py-3.5 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm font-medium truncate">
                        {t.tipper_name || "Anonymous"} → {(t.chefs as { name: string | null; slug: string } | undefined)?.name || "Chef"}
                      </p>
                      <p className="text-gray-400 text-xs mt-0.5">
                        {new Date(t.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-900 font-semibold text-sm">£{(t.amount_cents / 100).toFixed(2)}</p>
                      <p className="text-xs" style={{ color: "#C9A96E" }}>+£{(fee / 100).toFixed(2)} yours</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Embed setup guide */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mt-6">
          <p className="text-gray-900 font-semibold text-sm mb-2">🔌 Embed widget</p>
          <p className="text-gray-400 text-xs mb-3">Any chef can add this one line to their restaurant website to show a floating &ldquo;Tip [Chef]&rdquo; button:</p>
          <div className="bg-gray-900 rounded-xl p-4 font-mono text-xs text-green-400 overflow-x-auto">
            {`<script src="https://tipachef.com/embed/[chef-slug]" async></script>`}
          </div>
          <p className="text-gray-400 text-xs mt-2">Replace <code className="bg-gray-100 px-1 rounded">[chef-slug]</code> with the chef&apos;s Tip a Chef username.</p>
        </div>

      </div>
    </div>
  );
}
