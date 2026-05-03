import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q") ?? "";
  if (!q.trim()) return NextResponse.json({ suggestions: [] });

  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ suggestions: [], error: "Places API key not configured" });
  }

  try {
    const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": apiKey,
      },
      body: JSON.stringify({
        input: q,
        includedPrimaryTypes: ["restaurant", "food", "cafe"],
      }),
    });

    const data = await res.json();

    const suggestions = (data.suggestions ?? []).map((s: any) => ({
      placeId:     s.placePrediction?.placeId ?? "",
      name:        s.placePrediction?.text?.text ?? "",
      description: s.placePrediction?.structuredFormat?.secondaryText?.text ?? "",
    }));

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [], error: "Places request failed" });
  }
}
