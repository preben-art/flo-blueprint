import { JsonLd } from "@/components/json-ld";
import { PageStill } from "@/components/page-still";
import { SectionCta } from "@/components/section-cta";
import { photoAlt, stills } from "@/content/site";
import type { DeskPost } from "@/lib/desk-types";
import { pageMeta } from "@/lib/seo";

export function editorialMeta(post: DeskPost) {
  const path = post.kind === "nyhet" ? `/nyheter/${post.slug}` : `/artikler/${post.slug}`;
  return pageMeta(post.title, post.excerpt, path);
}

export function EditorialArticle({ post }: { post: DeskPost }) {
  const src = post.still ?? stills.skjerm;
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": post.kind === "nyhet" ? "NewsArticle" : "Article",
          headline: post.title,
          datePublished: post.createdAt,
          dateModified: post.updatedAt,
          description: post.excerpt,
          author: { "@type": "Organization", name: "FLO Brannsikring" },
        }}
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