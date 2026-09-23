import { articles, customers, projects, services, situations } from "@/content/site";
import { knowledgeNodes } from "@/content/knowledge/nodes";
import { listDeskPosts } from "@/lib/desk";
import { editorialPath } from "@/lib/editorial-path";

/** Canonical public pages shared by sitemap and machine discovery. */
export async function publicRoutes() {
  const posts = await listDeskPosts();
  const paths = ["/", "/situasjon", "/losninger", "/hvem-er-du", "/privat", "/digitalt", "/fagmiljo", "/nyheter", "/artikler", "/prosjekter", "/fag-og-kunnskap", "/fag-og-kunnskap/pastand-eller-krav", "/om-flo", "/film", "/kontakt",
    ...situations.map(s => `/situasjon/${s.slug}`),
    ...services.map(s => `/losninger/${s.slug}`),
    ...customers.filter(c => c.slug !== "privat").map(c => `/hvem-er-du/${c.slug}`),
    ...projects.map(p => `/prosjekter/${p.slug}`),
    ...articles.map(a => `/fag-og-kunnskap/${a.slug}`),
    ...knowledgeNodes.map(n => `/fag-og-kunnskap/${n.slug}`),
    ...posts.map(editorialPath),
  ];
  return [...new Set(paths)].map(path => {
    const post = posts.find(p => p.source === "desk" && editorialPath(p) === path);
    return { path, ...(post ? { lastModified: post.updatedAt } : {}) };
  });
}
