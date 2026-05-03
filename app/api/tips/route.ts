import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

// POST /api/tips — create Stripe Checkout session for a tip
export async function POST(request: NextRequest) {
  try {
    const { chefSlug, amountCents, message, tipperName } = await request.json();

    if (!chefSlug || !amountCents || amountCents < 100) {
      return NextResponse.json({ error: "Invalid tip data" }, { status: 400 });
    }

    const supabase = await createServiceClient();
    const { data: chef } = await supabase
      .from("chefs")
      .select("id, name, slug, stripe_account_id")
      .eq("slug", chefSlug)
      .single();

    if (!chef) {
      return NextResponse.json({ error: "Chef not found" }, { status: 404 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const sessionParams: Parameters<typeof stripe.checkout.sessions.create>[0] = {
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `Tip for ${chef.name}`,
              description: message ? `"${message}"` : `A tip for ${chef.name} via Tip a Chef`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/${chefSlug}?tip=success&amount=${amountCents}`,
      cancel_url:  `${appUrl}/${chefSlug}`,
      metadata: {
        chef_id:     chef.id,
        chef_slug:   chefSlug,
        message:     message    ?? "",
        tipper_name: tipperName ?? "Anonymous",
      },
    };

    // Route payment to chef's Stripe Connect account if they have one
    if (chef.stripe_account_id) {
      const platformFeeCents = Math.round(amountCents * 0.05); // 5% platform fee
      sessionParams.payment_intent_data = {
        application_fee_amount: platformFeeCents,
        transfer_data: { destination: chef.stripe_account_id },
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
