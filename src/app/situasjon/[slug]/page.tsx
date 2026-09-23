import { notFound } from "next/navigation";
import { AnswerStack } from "@/components/answer-stack";
import { firstSentence, situationAnswers } from "@/content/answers";
import { situationBySlug, situations } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return situations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = situationBySlug(slug);
  const doc = situationAnswers[slug];
  if (!s || !doc) return {};
  return pageMeta(s.label, firstSentence(doc.answers.a1.answer), `/situasjon/${s.slug}`);
}

export default async function SituasjonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = situationAnswers[slug];
  if (!doc || !situationBySlug(slug)) notFound();
  return <AnswerStack page={doc} />;
}
