import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data: chef } = await supabase
      .from("chefs")
      .select("slug, name, stripe_account_id")
      .eq("id", user.id)
      .single();

    if (!chef) return NextResponse.json({ error: "Chef not found" }, { status: 404 });

    let accountId = chef.stripe_account_id;

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email: user.email,
        capabilities: { card_payments: { requested: true }, transfers: { requested: true } },
        business_profile: { mcc: "5812", url: `https://tipachef.com/${chef.slug}` },
      });
      accountId = account.id;

      await supabase.from("chefs").update({ stripe_account_id: accountId }).eq("id", user.id);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${appUrl}/dashboard?stripe=refresh`,
      return_url:  `${appUrl}/dashboard?stripe=connected`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
