import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

// POST /api/tips — create Stripe Checkout session for a tip
export async function POST(request: NextRequest) {
  try {
    const { chefSlug, amountCents, message, tipperName } = await request.json();

    const normalizedSlug = typeof chefSlug === "string" ? chefSlug.trim().toLowerCase() : "";
    const normalizedAmount = Number(amountCents);
    const normalizedMessage = typeof message === "string" ? message.trim().slice(0, 500) : "";
    const normalizedTipperName = typeof tipperName === "string"
      ? tipperName.trim().slice(0, 80)
      : "Anonymous";

    if (
      !/^[a-z0-9](?:[a-z0-9-]{0,48}[a-z0-9])?$/.test(normalizedSlug) ||
      !Number.isInteger(normalizedAmount) ||
      normalizedAmount < 100 ||
      normalizedAmount > 100_000
    ) {
      return NextResponse.json({ error: "Invalid tip data" }, { status: 400 });
    }

    const supabase = await createServiceClient();
    const { data: chef } = await supabase
      .from("chefs")
      .select("id, name, slug, stripe_account_id")
      .eq("slug", normalizedSlug)
      .single();

    if (!chef) {
      return NextResponse.json({ error: "Chef not found" }, { status: 404 });
    }

    if (!chef.stripe_account_id) {
      return NextResponse.json(
        { error: "This chef is not ready to receive tips yet" },
        { status: 409 }
      );
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
              description: normalizedMessage
                ? `"${normalizedMessage}"`
                : `A tip for ${chef.name ?? "this chef"} via Tip a Chef`,
            },
            unit_amount: normalizedAmount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${appUrl}/${normalizedSlug}?tip=success&amount=${normalizedAmount}`,
      cancel_url:  `${appUrl}/${normalizedSlug}`,
      metadata: {
        chef_id:     chef.id,
        chef_slug:   normalizedSlug,
        message:     normalizedMessage,
        tipper_name: normalizedTipperName || "Anonymous",
      },
    };

    // The chef receives 95% before Stripe's processing fees. This is disclosed
    // throughout the product and in the checkout copy.
    const platformFeeCents = Math.round(normalizedAmount * 0.05);
    sessionParams.payment_intent_data = {
      application_fee_amount: platformFeeCents,
      transfer_data: { destination: chef.stripe_account_id },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);
    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
