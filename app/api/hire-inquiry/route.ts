import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { chef_id, name, email, event_type, event_date, guest_count, message } = await request.json();

    const cleanName = typeof name === "string" ? name.trim().slice(0, 100) : "";
    const cleanEmail = typeof email === "string" ? email.trim().toLowerCase().slice(0, 254) : "";
    const cleanMessage = typeof message === "string" ? message.trim().slice(0, 2_000) : "";
    const cleanGuestCount = guest_count == null ? null : Number(guest_count);

    if (
      !/^[0-9a-f-]{36}$/i.test(String(chef_id ?? "")) ||
      !cleanName ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) ||
      (cleanGuestCount !== null && (!Number.isInteger(cleanGuestCount) || cleanGuestCount < 1 || cleanGuestCount > 1_000))
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const supabase = await createServiceClient();

    const { error } = await supabase.from("hire_inquiries").insert({
      chef_id,
      name: cleanName,
      email: cleanEmail,
      event_type: typeof event_type === "string" ? event_type.trim().slice(0, 80) || null : null,
      event_date: event_date || null,
      guest_count: cleanGuestCount,
      message: cleanMessage || null,
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
