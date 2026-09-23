import { notFound } from "next/navigation";
import { AnswerStack } from "@/components/answer-stack";
import { firstSentence, serviceAnswers } from "@/content/answers";
import { serviceBySlug, services } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  const doc = serviceAnswers[slug];
  if (!s || !doc) return {};
  return pageMeta(s.label, firstSentence(doc.answers.a1.answer), `/losninger/${s.slug}`);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = serviceAnswers[slug];
  if (!doc || !serviceBySlug(slug)) notFound();
  return <AnswerStack page={doc} />;
}
