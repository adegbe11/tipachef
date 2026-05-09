import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = createServerClient();
  const results: Record<string, string> = {};

  for (const bucket of ["avatars", "covers"]) {
    // Check if bucket already exists
    const { data: existing } = await admin.storage.getBucket(bucket);
    if (existing) {
      results[bucket] = "already exists";
      continue;
    }

    const { error } = await admin.storage.createBucket(bucket, {
      public: true,
      fileSizeLimit: 5 * 1024 * 1024, // 5 MB
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"],
    });

    results[bucket] = error ? `error: ${error.message}` : "created";
  }

  return NextResponse.json({ ok: true, buckets: results });
}
