import Link from "next/link";
import { StillFrame } from "@/components/still-frame";
import { photoAlt } from "@/content/site";
import type { DeskPost, PostKind } from "@/lib/desk-types";

export function EditorialList({
  posts,
  kind,
  empty,
}: {
  posts: DeskPost[];
  kind: PostKind;
  empty: string;
}) {
  if (!posts.length) {
    return <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-[#221d19]">{empty}</p>;
  }
  return (
    <ul className="mt-10 grid gap-8 lg:grid-cols-2">
      {posts.map((post) => (
        <li key={post.id} className="plan-read plan-float overflow-hidden">
          {post.still ? (
            <StillFrame
              src={post.still}
              alt={photoAlt[post.still] ?? post.title}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[16/10]"
            />
          ) : null}
          <div className="px-5 py-6 sm:px-6">
            <p className="ed-kicker">{post.kicker}</p>
            <h2 className="mt-2 text-2xl font-normal">
              <Link href={kind === "nyhet" ? `/nyheter/${post.slug}` : `/artikler/${post.slug}`} className="hover:text-[#c62e32]">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[#221d19]">{post.excerpt}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}