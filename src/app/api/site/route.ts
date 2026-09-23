import { siteDocument } from "@/lib/semantic/public-docs";

export const dynamic = "force-static";

export function GET() {
  return Response.json(siteDocument(), {
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
