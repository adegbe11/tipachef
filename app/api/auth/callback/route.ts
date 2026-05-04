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
        // Signup flow: only create chef profile if one doesn't already exist
        // (never overwrite name/slug that the user already set up)
        const { data: existing } = await supabase
          .from("chefs")
          .select("id")
          .eq("id", data.user.id)
          .maybeSingle();

        if (!existing) {
          const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "");
          const name = (data.user.user_metadata?.full_name as string | undefined)
            ?? data.user.email?.split("@")[0]
            ?? cleanSlug;
          await supabase.from("chefs").insert({ id: data.user.id, slug: cleanSlug, name });
        }

        return NextResponse.redirect(`${origin}/onboarding`);
      }

      // Login / password-reset flow: go to intended destination
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
