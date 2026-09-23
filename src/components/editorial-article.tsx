import { PageSemantics } from "@/components/page-semantics";
import { PageStill } from "@/components/page-still";
import Link from "next/link";
import { editorialDate } from "@/lib/editorial-date";
import { photoAlt, stills } from "@/content/site";
import type { DeskPost } from "@/lib/desk-types";
import { editorialPath } from "@/lib/editorial-path";
export { editorialPath } from "@/lib/editorial-path";
import { pageMeta } from "@/lib/seo";

export function editorialMeta(post: DeskPost) {
  return pageMeta(post.title, post.excerpt, editorialPath(post), { article: true, image: post.still ?? stills.skjerm });
}

export function EditorialArticle({ post }: { post: DeskPost }) {
  const src = post.still ?? stills.skjerm;
  const date = editorialDate(post.createdAt);
  const news = post.kind === "nyhet";
  return (
    <>
      <PageSemantics
        path={editorialPath(post)}
        image={src}
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
      <section className="portfolio-paper">
        <div className="portfolio-wrap">
          <Link href={news ? "/nyheter" : "/artikler"} className="story-back">← {news ? "Alle nyheter" : "Alle artikler"}</Link>
          <div className="editorial-reading">
            <aside className="editorial-byline"><p className="story-eyebrow">{post.kicker}</p><p>{post.authorName}</p>{date && <p><span>Publisert</span><time dateTime={post.createdAt}>{date}</time></p>}</aside>
            <article className="editorial-prose" aria-label={post.title}>
              {post.body.map((para, index) => <p key={index}>{para}</p>)}
              <div className="editorial-question"><h2>Gjelder dette deres bygg?</h2><p>Send oss en kort beskrivelse, så hjelper vi dere å avklare neste steg.</p><Link href="/kontakt" className="story-link">Få vurdert saken <span aria-hidden="true">↗</span></Link></div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}