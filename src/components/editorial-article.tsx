import { PageSemantics } from "@/components/page-semantics";
import { PageStill } from "@/components/page-still";
import { SectionCta } from "@/components/section-cta";
import { photoAlt, stills } from "@/content/site";
import type { DeskPost } from "@/lib/desk-types";
import { articleBySlug } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function editorialPath(post: DeskPost) {
  if (post.kind === "nyhet") return `/nyheter/${post.slug}`;
  if (articleBySlug(post.slug)) return `/fag-og-kunnskap/${post.slug}`;
  return `/artikler/${post.slug}`;
}

export function editorialMeta(post: DeskPost) {
  return pageMeta(post.title, post.excerpt, editorialPath(post), { article: true });
}

export function EditorialArticle({ post }: { post: DeskPost }) {
  const src = post.still ?? stills.skjerm;
  return (
    <>
      <PageSemantics
        path={editorialPath(post)}
        title={post.title}
        description={post.excerpt}
        article={post.kind !== "nyhet"}
        news={post.kind === "nyhet"}
        datePublished={post.createdAt}
        dateModified={post.updatedAt}
      />
      <PageStill
        src={src}
        alt={photoAlt[src] ?? post.title}
        room={post.kind === "nyhet" ? "08" : "09"}
        kicker={post.kicker}
        title={post.title}
        lead={post.excerpt}
      />
      <section className="ed">
        <div className="ed-wrap">
          <article className="plan-read plan-float max-w-2xl">
            {post.body.map((para) => (
              <p key={para.slice(0, 24)} className="mt-5 text-[16px] leading-relaxed text-[#221d19]">
                {para}
              </p>
            ))}
            <SectionCta action="Send saken" href="/kontakt" />
          </article>
        </div>
      </section>
    </>
  );
}