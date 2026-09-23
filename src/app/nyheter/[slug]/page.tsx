import { notFound } from "next/navigation";
import { EditorialArticle, editorialMeta } from "@/components/editorial-article";
import { getDeskPost } from "@/lib/desk";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getDeskPost("nyhet", slug);
  if (!post) return {};
  return editorialMeta(post);
}

export default async function NyhetPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getDeskPost("nyhet", slug);
  if (!post) notFound();
  return <EditorialArticle post={post} />;
}