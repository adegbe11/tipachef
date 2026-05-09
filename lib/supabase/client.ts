import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  // NEXT_PUBLIC_* vars are baked into the bundle at Vercel/CI build time.
  // Fall back to a placeholder during local `next build` when .env.production.local
  // has empty values — this prevents a build-time throw from @supabase/ssr.
  // The placeholder values are never used in production.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";
  return createBrowserClient(url, key);
}
