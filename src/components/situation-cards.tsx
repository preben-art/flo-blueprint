import Link from "next/link";
import { StillFrame } from "@/components/still-frame";
import { Button } from "@/components/ui/button";
import { situationAsk, situationExplain } from "@/content/explain";
import { photoAlt, situationStill, situations } from "@/content/site";

export function SituationCards({
  showExamples = false,
  heading: Heading = "h2",
}: {
  showExamples?: boolean;
  heading?: "h2" | "h3";
}) {
  return (
    <div className="ed-across mt-10 sm:mt-12">
      {situations.map((sit) => {
        const expl = situationExplain[sit.slug];
        const src = situationStill[sit.slug];
        return (
          <article key={sit.slug} className="plan-float flex min-w-0 flex-col bg-[#fbf8f2]">
            <StillFrame src={src} alt={photoAlt[src] ?? sit.label} sizes="(max-width: 1024px) 100vw, 33vw" className="aspect-[16/10]" />
            <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-8">
              <p className="ed-kicker">{sit.room}</p>
              <Heading className="mt-3 text-[1.45rem] font-normal leading-snug tracking-tight sm:text-[1.7rem]">
                {sit.label}
              </Heading>
              <p className="mt-3 text-[15px] leading-relaxed text-pretty text-[#2a2520]">
                {showExamples ? expl.meaning : situationAsk[sit.slug]}
              </p>
              {showExamples ? (
                <ul className="mt-5 space-y-2">
                  {sit.examples.slice(0, 4).map((ex) => (
                    <li key={ex} className="border-b border-[#161210]/12 pb-2 text-sm leading-snug">
                      {ex}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-[15px] leading-relaxed text-pretty text-[#2a2520]">{expl.meaning}</p>
              )}
              <div className="mt-auto pt-7">
                <Button asChild>
                  <Link href={`/situasjon/${sit.slug}`}>{expl.cta}</Link>
                </Button>
                {showExamples ? (
                  <p className="mt-3 text-sm leading-snug text-[#2a2520]">{situationAsk[sit.slug]}</p>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
