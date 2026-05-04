import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET() {
  const results: Record<string, unknown> = {
    env: {
      SUPABASE_URL_set:          !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SERVICE_ROLE_KEY_set:      !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      SUPABASE_URL_prefix:       process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(0, 30),
    },
  };

  try {
    const supabase = createServerClient();
    const { data, error, count } = await supabase
      .from("chefs")
      .select("id, name, slug", { count: "exact" })
      .limit(5);
    results.chefs_query = { data, error: error?.message ?? null, count };
  } catch (e: unknown) {
    results.chefs_exception = e instanceof Error ? e.message : String(e);
  }

  try {
    const supabase = createServerClient();
    const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
    results.storage = { buckets: buckets?.map(b => b.name), error: bErr?.message ?? null };
  } catch (e: unknown) {
    results.storage_exception = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(results);
}
