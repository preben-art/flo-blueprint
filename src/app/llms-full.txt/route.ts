import { llmsFullText } from "@/lib/semantic/public-docs";
export const dynamic = "force-dynamic";
export async function GET() {
  return new Response(await llmsFullText(), { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=300" } });
}
