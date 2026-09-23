import { knowledgeGraph } from "@/lib/knowledge";

export const dynamic = "force-static";

export function GET() {
  return Response.json(knowledgeGraph(), {
    headers: {
      "Cache-Control": "public, max-age=300",
    },
  });
}
