import Link from "next/link";
import { RoomLabel } from "@/components/blueprint";
import { MediaPhoto } from "@/components/media-photo";
import { NextNeed } from "@/components/next-need";
import { SectionCta } from "@/components/section-cta";
import { TypeNode } from "@/components/type-node";
import { situationExplain } from "@/content/explain";
import { situationStill, situations } from "@/content/site";
import { cn } from "@/lib/utils";

export function SituationExplain({
  slug,
  number,
  compact,
}: {
  slug: keyof typeof situationExplain;
  number: string;
  compact?: boolean;
}) {
  const sit = situations.find((s) => s.slug === slug);
  const expl = situationExplain[slug];
  if (!sit) return null;

  return (
    <article id={slug} className={cn("border-y border-[#161210]/15", compact && "border-0")}>
      {!compact ? (
        <div className="relative isolate min-h-[32vh] overflow-hidden sm:min-h-[40vh]">
          <MediaPhoto
            src={situationStill[slug]}
            alt={`${sit.label}, foto fra FLO sitt materiale`}
            sizes="100vw"
          />
          <div className="relative z-[3] mx-auto flex min-h-[32vh] max-w-6xl flex-col justify-end px-4 py-8 sm:min-h-[40vh] sm:px-6">
            <TypeNode className="max-w-3xl">
            <RoomLabel number={number} title="Situasjon" onDark />
            <h2 className="mt-4 max-w-3xl text-3xl font-normal text-[#fbf8f2] sm:text-5xl">
              {sit.label}
            </h2>
            </TypeNode>
          </div>
        </div>
      ) : null}

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        {compact ? (
          <>
            <RoomLabel number={number} title="Situasjon" className="mb-3" />
            <h2 className="text-2xl font-normal sm:text-3xl">{sit.label}</h2>
          </>
        ) : null}
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-[#161210]">{expl.meaning}</p>
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#3d3832]">{expl.problem}</p>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div>
            <p className="room-number mb-4 text-[#c62e32]">Før tiltak bestemmes</p>
            <ol className="space-y-3">
              {expl.clarify.map((q, i) => (
                <li key={q} className="flex gap-3 border-b border-[#161210]/10 pb-3 text-[15px] leading-relaxed">
                  <span className="room-number shrink-0 text-[#c62e32]">{String(i + 1).padStart(2, "0")}</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>
          <div>
            <p className="room-number mb-4 text-[#c62e32]">FLOs rolle</p>
            <p className="max-w-xl text-[15px] leading-relaxed text-[#3d3832]">{expl.role}</p>
            <div className="mt-8">
              <NextNeed items={expl.nextNeed} />
            </div>
          </div>
        </div>

        <SectionCta action={expl.cta} href={expl.href} />
        {compact ? (
          <p className="mt-4 text-sm">
            <Link href={`/situasjon/${slug}`} className="underline hover:text-[#c62e32]">
              Les hele avklaringen
            </Link>
          </p>
        ) : null}
      </div>
    </article>
  );
}
