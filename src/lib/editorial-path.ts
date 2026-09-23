import { articleBySlug } from "@/content/site";
import type { DeskPost } from "@/lib/desk-types";

export function editorialPath(post: DeskPost) {
  if (post.kind === "nyhet") return `/nyheter/${post.slug}`;
  if (articleBySlug(post.slug)) return `/fag-og-kunnskap/${post.slug}`;
  return `/artikler/${post.slug}`;
}

