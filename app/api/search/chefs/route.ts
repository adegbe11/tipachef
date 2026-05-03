import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export async function GET(req: NextRequest) {
  const q       = req.nextUrl.searchParams.get("q")       ?? "";
  const venue   = req.nextUrl.searchParams.get("venue")   ?? "";
  const placeId = req.nextUrl.searchParams.get("placeId") ?? "";

  const supabase = createServerClient();

  let query = supabase
    .from("chefs")
    .select("id, name, slug, role, venue, cuisine, avatar_url, rating")
    .eq("is_active", true);

  if (q.trim())       query = query.ilike("name",  `%${q.trim()}%`);
  if (venue.trim())   query = query.ilike("venue", `%${venue.trim()}%`);
  if (placeId.trim()) query = query.eq("google_place_id", placeId.trim());

  const { data, error } = await query.limit(24);

  if (error) {
    console.error("Chef search error:", error.message);
    return NextResponse.json({ chefs: [] });
  }

  return NextResponse.json({ chefs: data ?? [] });
}
