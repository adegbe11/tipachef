import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const q     = req.nextUrl.searchParams.get("q")     ?? "";
  const venue = req.nextUrl.searchParams.get("venue") ?? "";

  const supabase = createServerClient();

  let query = supabase
    .from("chefs")
    .select("id, name, slug, role, image_url, bio");

  if (q.trim())     query = query.ilike("name", `%${q.trim()}%`);
  if (venue.trim()) query = query.ilike("bio",  `%${venue.trim()}%`);

  const { data, error } = await query.limit(24);

  if (error) {
    console.error("Chef search error:", error.message);
    return NextResponse.json({ chefs: [] });
  }

  // Remap DB columns to match client-side expectations
  const chefs = (data ?? []).map(c => ({
    ...c,
    avatar_url: (c as Record<string,unknown>).image_url ?? null,
    restaurant: (c as Record<string,unknown>).bio ?? null,
  }));
  return NextResponse.json({ chefs });
}
