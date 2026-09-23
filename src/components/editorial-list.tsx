import Link from "next/link";
import { StillFrame } from "@/components/still-frame";
import { photoAlt, stills } from "@/content/site";
import type { DeskPost, PostKind } from "@/lib/desk-types";
import { editorialDate } from "@/lib/editorial-date";
export function EditorialList({ posts, kind, empty }: { posts: DeskPost[]; kind: PostKind; empty: string }) {
  if (!posts.length) return <p className="story-empty">{empty}</p>;
  return <ul className="portfolio-grid editorial-grid">{posts.map(post => {
    const src = post.still ?? stills.skjerm;
    const date = editorialDate(post.createdAt);
    return <li key={post.id}><Link className="portfolio-card" href={kind === "nyhet" ? `/nyheter/${post.slug}` : `/artikler/${post.slug}`}>
      <StillFrame src={src} alt={photoAlt[src] ?? post.title} sizes="(max-width: 760px) 100vw, 50vw" className="portfolio-image aspect-[16/10]" />
      <div className="portfolio-card-copy"><div className="story-meta"><p className="story-eyebrow">{post.kicker}</p>{date && <time dateTime={post.createdAt}>{date}</time>}</div>
        <h2>{post.title}</h2><p>{post.excerpt}</p><span className="story-link">Les {kind === "nyhet" ? "nyheten" : "artikkelen"}<span aria-hidden="true">↗</span></span>
      </div>
    </Link></li>;
  })}</ul>;
}
