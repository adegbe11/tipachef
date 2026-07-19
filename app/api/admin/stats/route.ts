import { NextResponse } from "next/server";
import { createClient, createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!user || !adminEmail || user.email?.toLowerCase() !== adminEmail) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const service = await createServiceClient();
  const [tipsResult, chefsResult] = await Promise.all([
    service
      .from("tips")
      .select("id, amount_cents, tipper_name, created_at, chef_id, chefs(name, slug)")
      .order("created_at", { ascending: false })
      .limit(200),
    service.from("chefs").select("id", { count: "exact", head: true }),
  ]);

  if (tipsResult.error || chefsResult.error) {
    console.error("Admin stats query failed", tipsResult.error ?? chefsResult.error);
    return NextResponse.json({ error: "Unable to load admin statistics" }, { status: 500 });
  }

  return NextResponse.json({ tips: tipsResult.data ?? [], chefCount: chefsResult.count ?? 0 });
}
