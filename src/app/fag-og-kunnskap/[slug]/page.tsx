import { notFound } from "next/navigation";
import { AnswerStack } from "@/components/answer-stack";
import { KnowledgeAnswer } from "@/components/knowledge-answer";
import { articleAnswers, firstSentence } from "@/content/answers";
import { knowledgeBySlug, knowledgeNodes } from "@/content/knowledge/nodes";
import { articleBySlug, articles } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  const slugs = new Set([...articles.map((a) => a.slug), ...knowledgeNodes.map((n) => n.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = knowledgeBySlug(slug);
  if (node) return pageMeta(node.question, node.contract.direct, `/fag-og-kunnskap/${node.slug}`);
  const a = articleBySlug(slug);
  const doc = articleAnswers[slug];
  if (!a || !doc) return {};
  return pageMeta(a.title, firstSentence(doc.answers.a1.answer), `/fag-og-kunnskap/${a.slug}`);
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const node = knowledgeBySlug(slug);
  if (node) return <KnowledgeAnswer node={node} />;
  const article = articleBySlug(slug);
  const doc = articleAnswers[slug];
  if (!article || !doc) notFound();
  return <AnswerStack page={doc} />;
}
