import { notFound } from "next/navigation";
import { AnswerStack } from "@/components/answer-stack";
import { customerAnswers, firstSentence } from "@/content/answers";
import { customerBySlug, customers } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return customers.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = customerBySlug(slug);
  const doc = customerAnswers[slug];
  if (!c || !doc) return {};
  if (slug === "privat") {
    return pageMeta(
      "Brannsikkerhet i bolig og utleiedel",
      "Kan kjeller, loft eller del av boligen leies ut? FLO leser tegninger og bilder digitalt. Bolig er et eget spor.",
      "/privat",
    );
  }
  return pageMeta(c.label, firstSentence(doc.answers.a1.answer), `/hvem-er-du/${c.slug}`);
}

export default async function CustomerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const doc = customerAnswers[slug];
  if (!doc || !customerBySlug(slug)) notFound();
  return <AnswerStack page={doc} />;
}
