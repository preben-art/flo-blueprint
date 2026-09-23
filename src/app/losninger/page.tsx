import Link from "next/link";
import { CoverageBand } from "@/components/coverage-band";
import { PageStill } from "@/components/page-still";
import { PlanPlate } from "@/components/plan-plate";
import { SectionCta } from "@/components/section-cta";
import { serviceExplain } from "@/content/explain";
import { photoAlt, serviceStill, services, stills } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const metadata = pageMeta(
  "Rådgivning og RIBr",
  "Brannvernrådgivning, brannkonsept eller utførelse. Hva dere trenger, avhenger av om det er avvik, ombygging eller usikkerhet om krav.",
  "/losninger",
);

export default function LosningerPage() {
  return (
    <>
      <PageSemantics
        path="/losninger"
        title="Rådgivning og RIBr"
        description="Brannvernrådgivning, brannkonsept eller utførelse. Hva dere trenger, avhenger av om det er avvik, ombygging eller usikkerhet om krav."
        kind="CollectionPage"
        topic="Brannvernrådgivning, RIBr og utførelse"
      />
      <PageStill
        src={stills.anlegg}
        alt={photoAlt[stills.anlegg]}
        room="05"
        kicker="Rådgivning og RIBr"
        title="Trenger vi rådgiver, brannkonsept eller utførelse?"
        lead="Det avhenger av om dere har fått avvik, skal bygge om, eller er usikre på hva som kreves. Mye kan leses fra dokumentene først."
      />
      <section className="ed">
        <div className="ed-wrap">
          <div className="plan-read plan-float max-w-3xl">
            <p className="ed-kicker">Fagspor</p>
            <h2 className="mt-4 max-w-md text-3xl font-normal sm:text-4xl">Hva skal tegnes, og hva skal bygges?</h2>
          </div>
          <div className="ed-across mt-10">
            {services.map((s) => {
              const src = serviceStill[s.slug];
              return (
                <article key={s.slug} className="plan-float flex min-w-0 flex-col bg-[#fbf8f2]">
                  <PlanPlate src={src} alt={photoAlt[src] ?? s.label} sizes="(max-width: 1024px) 100vw, 33vw" ratio="photo" />
                  <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-8">
                    <p className="ed-kicker">{s.room}</p>
                    <h3 className="mt-3 text-xl font-normal sm:text-2xl">{s.label}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-flo-muted">{serviceExplain[s.slug].directAnswer}</p>
                    <div className="mt-auto pt-6">
                      <Button asChild>
                        <Link href={`/losninger/${s.slug}`}>{serviceExplain[s.slug].cta}</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CoverageBand />
      <section className="ed-paper">
        <div className="ed-wrap">
          <div className="plan-read plan-float max-w-xl">
            <SectionCta action="Send rapporten eller tegningene" href="/kontakt?spor=digitalt" />
          </div>
        </div>
      </section>
    </>
  );
}
