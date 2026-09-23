import Link from "next/link";
import { RoomLabel } from "@/components/blueprint";
import { MediaPhoto } from "@/components/media-photo";
import { PartnerStrip } from "@/components/partner-strip";
import { TypeNode } from "@/components/type-node";
import { situationAsk, situationExplain } from "@/content/explain";
import { photoAlt, situationStill, situations } from "@/content/site";
import { cn } from "@/lib/utils";

export function SituationHero() {
  return (
    <section id="situasjon">
      <div className="plan-titleblock bg-[#120e0d] px-4 sm:px-6">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 py-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="room-number text-flo-red">FLO BRANNSIKRING</p>
            <p className="mt-2 text-sm font-normal tracking-[0.08em] uppercase text-[#fbf8f2]">
              Markedskart, hovedplan
            </p>
          </div>
          <p className="room-number text-[#fbf8f2]">Ark 01 · NTS · Rev A · Hva har skjedd hos kunden?</p>
        </div>
      </div>
      <div className="grid lg:grid-cols-3">
        {situations.map((sit, i) => {
          const expl = situationExplain[sit.slug];
          return (
            <Link
              key={sit.slug}
              href={`/situasjon/${sit.slug}`}
              className={cn(
                "group relative isolate flex min-h-[88svh] flex-col overflow-hidden lg:min-h-[100svh]",
                i < situations.length - 1 && "lg:red-cut",
              )}
            >
              <div className="still-crop absolute inset-0">
                <MediaPhoto
                  src={situationStill[sit.slug]}
                  alt={photoAlt[situationStill[sit.slug]] ?? `${sit.label}, foto fra FLO sitt materiale`}
                  priority={sit.slug === "papekt"}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="plan-frame" />
              </div>
              <div className="relative z-[3] mt-auto w-full p-5 pb-10 pt-28 sm:p-8 sm:pb-12 lg:p-10 lg:pb-14">
                <TypeNode>
                  <RoomLabel number={sit.room} title={sit.short} onDark />
                  <h2 className="mt-5 max-w-md text-3xl font-medium leading-[1.16] text-[#fbf8f2] group-hover:text-white sm:text-4xl lg:text-[2.65rem]">
                    {sit.label}
                  </h2>
                  <p className="mt-5 max-w-md text-base font-normal leading-relaxed text-[#fbf8f2] sm:text-lg">
                    {situationAsk[sit.slug]}
                  </p>
                  <p className="mt-4 max-w-md text-[15px] font-normal leading-relaxed text-[#fbf8f2]">
                    {expl.meaning}
                  </p>
                  <span className="mt-8 inline-flex text-sm font-normal tracking-[0.06em] text-flo-red">
                    {expl.cta}
                  </span>
                </TypeNode>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="glow-chamber">
        <PartnerStrip />
      </div>
    </section>
  );
}
