import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// GET /api/chefs?slug=marcus — check slug availability
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) return NextResponse.json({ available: false });

  const supabase = await createClient();
  const { data } = await supabase
    .from("chefs")
    .select("slug")
    .eq("slug", slug)
    .maybeSingle();

  return NextResponse.json({ available: !data });
}
