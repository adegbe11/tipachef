import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body      = await request.text();
  const signature = request.headers.get("stripe-signature") ?? "";

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session  = event.data.object;
    const metadata = session.metadata ?? {};
    const supabase = await createServiceClient();

    await supabase.from("tips").insert({
      chef_id:          metadata.chef_id,
      amount_cents:     session.amount_total ?? 0,
      message:          metadata.message     || null,
      tipper_name:      metadata.tipper_name || "Anonymous",
      stripe_payment_id: session.payment_intent as string,
    });
  }

  return NextResponse.json({ received: true });
}
