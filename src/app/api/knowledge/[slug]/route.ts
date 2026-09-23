import { knowledgeNodes } from "@/content/knowledge/nodes";
import { knowledgeAtom } from "@/lib/knowledge";

export const dynamic = "force-static";

export function generateStaticParams() {
  return knowledgeNodes.map((n) => ({ slug: n.slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = knowledgeNodes.find((n) => n.slug === slug);
  if (!node) return new Response("Not found", { status: 404 });
  return Response.json(knowledgeAtom(node));
}
