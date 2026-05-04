import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  const supabase = createServerClient();
  const results: Record<string, unknown> = {};

  // Probe tips columns one by one
  const tipsColTests: Record<string, unknown> = {};
  const candidates = ["chef_id", "amount_cents", "message", "tipper_name", "stripe_payment_id", "created_at", "id", "name", "tipped_by"];
  for (const col of candidates) {
    const { error } = await supabase.from("tips").select(col).limit(0);
    tipsColTests[col] = error ? `MISSING: ${error.message.slice(0, 80)}` : "EXISTS";
  }
  results.tips_columns = tipsColTests;

  // Also check chefs alias
  const { data: chefSample, error: chefErr } = await supabase
    .from("chefs")
    .select("id, name, avatar_url:image_url, restaurant:bio")
    .limit(1);
  results.chefs_alias_test = { data: chefSample, error: chefErr?.message ?? null };

  return NextResponse.json(results);
}
