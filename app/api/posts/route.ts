import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// GET /api/posts?chef_id=xxx — public posts for a chef
export async function GET(req: NextRequest) {
  const chefId = req.nextUrl.searchParams.get("chef_id");
  if (!chefId) return NextResponse.json({ posts: [] });

  const supabase = await createServiceClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("chef_id", chefId)
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .limit(20);

  return NextResponse.json({ posts: data ?? [] });
}

// POST /api/posts — create a post (authenticated)
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { title, body: postBody, post_type, ingredients, prep_time, cook_time, servings } = body;

    if (!title?.trim()) return NextResponse.json({ error: "Title required" }, { status: 400 });

    const service = await createServiceClient();
    const { data, error } = await service
      .from("posts")
      .insert({
        chef_id:     user.id,
        title:       title.trim(),
        body:        postBody?.trim() || null,
        post_type:   post_type || "update",
        ingredients: ingredients?.trim() || null,
        prep_time:   prep_time?.trim()   || null,
        cook_time:   cook_time?.trim()   || null,
        servings:    servings?.trim()    || null,
        is_public:   true,
      })
      .select("*")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ post: data });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
