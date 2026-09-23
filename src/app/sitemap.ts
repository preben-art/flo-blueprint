import type { MetadataRoute } from "next";
import { knowledgeNodes } from "@/content/knowledge/nodes";
import { articles, customers, news, projects, services, situations } from "@/content/site";
import { canonicalOrigin } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
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
    ...news.map((item) => `/nyheter/${item.slug}`),
    ...knowledgeNodes.map((n) => `/fag-og-kunnskap/${n.slug}`),
  ];

  return [...new Set(paths)].map((path) => ({
    url: `${canonicalOrigin}${path}`,
    lastModified: now,
  }));
}