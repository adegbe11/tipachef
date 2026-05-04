import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  const results: Record<string, unknown> = {
    env: {
      SUPABASE_URL_set:     !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SERVICE_ROLE_KEY_set: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_URL_prefix:  process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30),
      APP_URL:              process.env.NEXT_PUBLIC_APP_URL,
    },
  };

  const supabase = createServerClient();

  // Chefs schema
  try {
    const { data, error } = await supabase.from("chefs").select("*").limit(1);
    results.chefs = {
      columns: data?.[0] ? Object.keys(data[0]) : [],
      error:   error?.message ?? null,
      has_avatar_url:  data?.[0] ? "avatar_url"  in data[0] : false,
      has_restaurant:  data?.[0] ? "restaurant"  in data[0] : false,
      has_image_url:   data?.[0] ? "image_url"   in data[0] : false,
    };
  } catch (e: unknown) {
    results.chefs_error = e instanceof Error ? e.message : String(e);
  }

  // Tips schema
  try {
    const { data, error } = await supabase.from("tips").select("*").limit(1);
    results.tips = {
      count: data?.length ?? 0,
      columns: data?.[0] ? Object.keys(data[0]) : "no rows - try inserting to check schema",
      error: error?.message ?? null,
    };
    // Try a dummy insert to see what columns exist
    if (!data || data.length === 0) {
      const { error: insErr } = await supabase.from("tips").insert({
        chef_id: "00000000-0000-0000-0000-000000000000",
        amount_cents: 1,
        tipper_name: "test",
        message: "test",
        stripe_payment_id: "test",
      });
      results.tips_insert_test = insErr?.message ?? "insert succeeded (unexpected)";
    }
  } catch (e: unknown) {
    results.tips_error = e instanceof Error ? e.message : String(e);
  }

  // Storage
  try {
    const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
    results.storage = { buckets: buckets?.map(b => b.name), error: bErr?.message ?? null };
  } catch (e: unknown) {
    results.storage_error = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(results);
}
