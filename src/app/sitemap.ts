import { listDeskPosts } from "@/lib/desk";
import { editorialPath } from "@/lib/editorial-path";
import type { MetadataRoute } from "next";
import { knowledgeNodes } from "@/content/knowledge/nodes";
import { articles, customers, projects, services, situations } from "@/content/site";
import { canonicalOrigin, isIndexableDeployment } from "@/lib/seo";

export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!isIndexableDeployment()) return [];
  const posts = await listDeskPosts();
  const paths = [
    "/",
    "/situasjon",
    "/losninger",
    "/hvem-er-du",
    "/privat",
    "/digitalt",
    "/fagmiljo",
    "/nyheter",
    "/artikler",
    "/prosjekter",
    "/fag-og-kunnskap",
    "/fag-og-kunnskap/pastand-eller-krav",
    "/om-flo",
    "/film",
    "/kontakt",
    ...situations.map((s) => `/situasjon/${s.slug}`),
    ...services.map((s) => `/losninger/${s.slug}`),
    ...customers.filter((c) => c.slug !== "privat").map((c) => `/hvem-er-du/${c.slug}`),
    ...projects.map((p) => `/prosjekter/${p.slug}`),
    ...articles.map((a) => `/fag-og-kunnskap/${a.slug}`),
    ...posts.map(editorialPath),
    ...knowledgeNodes.map((n) => `/fag-og-kunnskap/${n.slug}`),
  ];

  return [...new Set(paths)].map((path) => ({
    url: `${canonicalOrigin}${path}`,
    ...(posts.find((post) => editorialPath(post) === path && post.source === "desk")
      ? { lastModified: posts.find((post) => editorialPath(post) === path)!.updatedAt } : {}),
  }));
}