import { llmsText } from "@/lib/semantic/public-docs";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsText(), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
