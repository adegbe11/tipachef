import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { chef_id, name, email, event_type, event_date, guest_count, message } = await request.json();

    if (!chef_id || !name || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    const { error } = await supabase.from("hire_inquiries").insert({
      chef_id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      event_type: event_type || null,
      event_date: event_date || null,
      guest_count: guest_count || null,
      message: message?.trim() || null,
      status: "new",
    });

    if (error) {
      console.error("Hire inquiry insert:", error.message);
      return NextResponse.json({ error: "Failed to save inquiry" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
