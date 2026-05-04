import { NextResponse } from "next/server";

const PROJECT_REF = "vjziznorybvvschdkcbu";

const MIGRATION_SQL = `
  alter table chefs add column if not exists avatar_url text;
  alter table chefs add column if not exists restaurant  text;
`;

export async function GET() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseUrl    = process.env.NEXT_PUBLIC_SUPABASE_URL;

  if (!serviceRoleKey || !supabaseUrl) {
    return NextResponse.json({ ok: false, error: "Missing env vars" }, { status: 500 });
  }

  const results: Record<string, unknown> = {
    service_role_key_set: true,
    supabase_url: supabaseUrl?.slice(0, 30),
  };

  // Try Supabase Management API with service role key
  try {
    const mgmtRes = await fetch(
      `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: MIGRATION_SQL }),
      }
    );
    const mgmtBody = await mgmtRes.text();
    results.mgmt_api = { status: mgmtRes.status, body: mgmtBody.slice(0, 500) };
  } catch (e: unknown) {
    results.mgmt_api_error = e instanceof Error ? e.message : String(e);
  }

  // Also try via PostgREST RPC if a function exists
  try {
    const rpcRes = await fetch(
      `${supabaseUrl}/rest/v1/rpc/exec_sql`,
      {
        method: "POST",
        headers: {
          "apikey": serviceRoleKey,
          "Authorization": `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: MIGRATION_SQL }),
      }
    );
    const rpcBody = await rpcRes.text();
    results.rpc_exec = { status: rpcRes.status, body: rpcBody.slice(0, 500) };
  } catch (e: unknown) {
    results.rpc_error = e instanceof Error ? e.message : String(e);
  }

  return NextResponse.json(results);
}
