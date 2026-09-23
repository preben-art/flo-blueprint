import Link from "next/link";
import { PageStill } from "@/components/page-still";
import { PlanPlate } from "@/components/plan-plate";
import { customerExplain, icpLinks } from "@/content/explain";
import { customers, customerStill, photoAlt, stills } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";
import { Button } from "@/components/ui/button";

const commercial = customers.filter((c) => c.track !== "privat");
const privateTrack = customers.filter((c) => c.track === "privat");

export const metadata = pageMeta(
  "Eier eller bruker?",
  "Eier, forvalter, virksomhet, byggherre eller privat bolig. Pliktene er ulike. Bolig er et eget spor.",
  "/hvem-er-du",
);

export default function HvemErDuPage() {
  return (
    <>
      <PageSemantics
        path="/hvem-er-du"
        title="Eier eller bruker?"
        description="Eier, forvalter, virksomhet, byggherre eller privat bolig. Pliktene er ulike. Bolig er et eget spor."
        kind="CollectionPage"
        audience="Eier, bruker, byggherre og privat bolig"
      />
      <PageStill
        src={stills.slokkerHaand}
        alt={photoAlt[stills.slokkerHaand]}
        room="03"
        kicker="Eier eller bruker?"
        title="Hvem har ansvaret i bygget?"
        lead="Eier og bruker har ulike plikter. Arkitekt og entreprenør deler premissene. Bolig er et eget spor."
      />
      <section className="ed">
        <div className="ed-wrap">
          <div className="plan-read plan-float max-w-3xl">
            <p className="ed-kicker">Ansvar</p>
            <h2 className="mt-4 max-w-md text-3xl font-normal sm:text-4xl">Samme plantegning. Ulike plikter.</h2>
          </div>
          <div className="ed-across mt-10">
            {commercial.map((c) => {
              const expl = customerExplain[c.slug];
              const src = customerStill[c.slug];
              return (
                <article key={c.slug} className="plan-float flex min-w-0 flex-col bg-[#fbf8f2]">
                  <PlanPlate src={src} alt={photoAlt[src] ?? c.label} sizes="(max-width: 1024px) 100vw, 33vw" ratio="photo" />
                  <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-8">
                    <p className="ed-kicker">{c.room}</p>
                    <h3 className="mt-3 text-xl font-normal sm:text-2xl">{c.label}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-flo-muted">{expl.realQuestion}</p>
                    <p className="mt-3 text-[15px] leading-relaxed">{expl.meaning}</p>
                    <div className="mt-auto pt-6">
                      <Button asChild>
                        <Link href={`/hvem-er-du/${c.slug}`}>{expl.cta}</Link>
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <section className="ed-navy">
        <div className="ed-wrap">
          <div className="plan-read plan-read-ink plan-float">
            <p className="ed-kicker">Samme bygg, ulike plikter</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#fbf8f2]/90">
              Bremanger kommune ligger som merke på gammelt nettsted. Det er ikke et dokumentert FLO-brannoppdrag.
            </p>
            <ul className="mt-10 border-t border-[#fbf8f2]/14">
            {icpLinks.map((edge) => {
              const from = commercial.find((c) => c.slug === edge.from);
              const to = commercial.find((c) => c.slug === edge.to);
              return (
                <li key={edge.from + edge.to} className="grid gap-2 border-b border-[#fbf8f2]/14 py-5 sm:grid-cols-12">
                  <p className="ed-kicker sm:col-span-3">{edge.label}</p>
                  <p className="text-sm font-medium text-[#fbf8f2] sm:col-span-3">
                    {from?.label} og {to?.label}
                  </p>
                  <p className="text-[15px] leading-relaxed text-[#fbf8f2]/85 sm:col-span-6">{edge.meaning}</p>
                </li>
              );
            })}
            </ul>
          </div>
        </div>
      </section>
      {privateTrack.map((c) => (
        <section key={c.slug} className="ed-mist">
          <div className="ed-wrap grid gap-8 lg:grid-cols-12">
            <div className="plan-read plan-float lg:col-span-6">
              <p className="ed-kicker">Bolig</p>
              <h2 className="mt-4 text-3xl font-normal sm:text-4xl">{customerExplain[c.slug].realQuestion}</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-flo-muted">
                Utleiedel, kjeller, loft og bruksendring. Det er et annet spor enn næringseiendom.
              </p>
              <div className="mt-6">
                <Button asChild>
                  <Link href="/privat">Send tegninger og bilder</Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-6">
              <PlanPlate
                src={customerStill[c.slug]}
                alt={photoAlt[customerStill[c.slug]] ?? c.label}
                caption="Kontekst for boligsporet, ikke eiendomsfoto."
                sizes="(max-width: 1024px) 100vw, 50vw"
                ratio="wide"
              />
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
