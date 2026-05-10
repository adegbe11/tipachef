import { NextRequest, NextResponse } from "next/server";
import { createServiceClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// GET /embed/[slug] — returns a JS snippet that injects a floating "Tip [Chef]" button
// Usage: <script src="https://tipachef.com/embed/marco-rossi" async></script>
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = await createServiceClient();
  const { data: chef } = await supabase
    .from("chefs")
    .select("name, slug")
    .eq("slug", params.slug.toLowerCase())
    .single();

  if (!chef) {
    return new NextResponse("// Chef not found", {
      headers: { "Content-Type": "application/javascript" },
    });
  }

  const name    = chef.name || chef.slug;
  const first   = name.split(" ")[0];
  const url     = `https://tipachef.com/${chef.slug}`;

  const js = `
(function() {
  if (document.getElementById('tac-widget')) return;
  var btn = document.createElement('a');
  btn.id = 'tac-widget';
  btn.href = '${url}';
  btn.target = '_blank';
  btn.rel = 'noopener noreferrer';
  btn.innerHTML = '🍴 Tip ${first}';
  btn.style.cssText = [
    'position:fixed',
    'bottom:24px',
    'right:24px',
    'z-index:99999',
    'display:inline-flex',
    'align-items:center',
    'gap:8px',
    'padding:12px 20px',
    'background:#C9A96E',
    'color:#111',
    'font-family:-apple-system,BlinkMacSystemFont,system-ui,sans-serif',
    'font-size:14px',
    'font-weight:700',
    'letter-spacing:0.01em',
    'text-decoration:none',
    'border-radius:100px',
    'box-shadow:0 8px 30px rgba(201,169,110,0.45)',
    'transition:transform 0.15s,box-shadow 0.15s',
    'cursor:pointer',
  ].join(';');
  btn.onmouseenter = function() {
    btn.style.transform = 'translateY(-2px)';
    btn.style.boxShadow = '0 12px 40px rgba(201,169,110,0.55)';
  };
  btn.onmouseleave = function() {
    btn.style.transform = '';
    btn.style.boxShadow = '0 8px 30px rgba(201,169,110,0.45)';
  };
  document.body.appendChild(btn);
})();
`;

  return new NextResponse(js, {
    headers: {
      "Content-Type": "application/javascript",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
