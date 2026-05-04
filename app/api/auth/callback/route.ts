import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code  = searchParams.get("code");
  const slug  = searchParams.get("slug") ?? "";
  const next  = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.user) {
      if (slug) {
        // Signup flow: create chef profile and send to onboarding
        const name = data.user.user_metadata?.full_name ?? data.user.email?.split("@")[0] ?? slug;
        await supabase.from("chefs").upsert({
          id:   data.user.id,
          slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, ""),
          name,
        }, { onConflict: "id" });
        return NextResponse.redirect(`${origin}/onboarding`);
      }
      // Login flow: go to intended destination
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
