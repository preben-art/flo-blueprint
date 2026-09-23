import type { MetadataRoute } from "next";
import { knowledgeNodes } from "@/content/knowledge/nodes";
import { articles, customers, news, projects, services, situations } from "@/content/site";
import { siteUrl } from "@/lib/seo";

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
    "/api/knowledge",
    ...situations.map((s) => `/situasjon/${s.slug}`),
    ...services.map((s) => `/losninger/${s.slug}`),
    ...customers.map((c) => `/hvem-er-du/${c.slug}`),
    ...projects.map((p) => `/prosjekter/${p.slug}`),
    ...articles.map((a) => `/fag-og-kunnskap/${a.slug}`),
    ...articles.map((a) => `/artikler/${a.slug}`),
    ...news.map((item) => `/nyheter/${item.slug}`),
    ...knowledgeNodes.map((n) => `/fag-og-kunnskap/${n.slug}`),
  ];

  return [...new Set(paths)].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
  }));
}