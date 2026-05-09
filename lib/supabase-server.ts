import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client.
 * ONLY for use in Server Components or API Route Handlers (runs on the server).
 * NEVER import this in Client Components ("use client") — the service role key
 * bypasses all RLS policies and would be exposed to the browser.
 */
export function createServerClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}
