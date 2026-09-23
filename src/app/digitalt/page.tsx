import Link from "next/link";
import { PageSemantics } from "@/components/page-semantics";
import { PageStill } from "@/components/page-still";
import { PlanSplit } from "@/components/plan-field";
import { SectionCta } from "@/components/section-cta";
import { Button } from "@/components/ui/button";
import { deliveryTracks } from "@/content/explain";
import { company, photoAlt, stills } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Dette kan gjøres digitalt",
  "Dokumentgjennomgang, brannkonsept, ansvar og kurs kan leses først, uansett hvor i landet bygget ligger. Befaring kommer når papirene ikke kan svare.",
  "/digitalt",
);

const digital = deliveryTracks.find((track) => track.id === "digitalt")!;
const faqs = [
  {
    question: "Hva kan FLO avklare digitalt?",
    answer:
      "Dokumentasjon, tegninger, tilsynsrapporter, konsept og spørsmål om ansvar kan ofte leses først. Kurs og gjennomgang kan også tas digitalt. Det gjelder uavhengig av hvor bygget ligger.",
  },
  {
    question: "Når trengs befaring likevel?",
    answer:
      "Når dokumentasjonen ikke stemmer med virkeligheten, når installasjoner eller rømning må ses, eller når risikoen ikke kan vurderes fra papir. Fysisk del skjer fra Stryn og Nordfjordeid, i Nordvestlandet.",
  },
  {
    question: "Hva sender jeg inn?",
    answer:
      "Rapporten, tegningene, bildene eller det som ble sagt. FLO sier om saken kan leses herfra, eller om bygget må ses. Dette er første lesning, ikke et vedtak.",
  },
];

export default function DigitaltPage() {
  return (
    <>
      <PageSemantics
        path="/digitalt"
        title="Dette kan gjøres digitalt"
        description="Dokumentgjennomgang, brannkonsept, ansvar og kurs kan leses først, uansett hvor i landet bygget ligger. Befaring kommer når papirene ikke kan svare."
        topic="Digital brannvurdering"
        area="Hele Norge"
        audience="Eiere, brukere og byggherrer som kan sende dokumentasjon"
        faqs={faqs}
      />
      <PageStill
        src={stills.skjerm}
        alt={photoAlt[stills.skjerm]}
        room="03"
        kicker="Digitalt"
        title="Dette kan gjøres digitalt."
        lead={company.coverage.digital}
      />
      <PlanSplit still={stills.drawings} stillAlt={photoAlt[stills.drawings]} caption="Tegninger og dokumenter leses først, før noen reiser.">
        <p className="ed-kicker">Før noen reiser</p>
        <h2 className="mt-4 max-w-xl text-3xl font-normal sm:text-4xl">{digital.value}</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-flo-muted">{digital.lead}</p>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {digital.when.map((item) => (
            <li key={item} className="border-t border-flo-ink/12 pt-3 text-[15px] leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/kontakt?spor=digitalt">Send rapporten eller tegningene</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/kontakt?spor=hybrid">Avklar om bygget må ses</Link>
          </Button>
        </div>
      </PlanSplit>
      <section className="ed-navy">
        <div className="ed-wrap">
          <div className="plan-read plan-read-ink plan-float max-w-2xl">
            <p className="ed-kicker">Hele landet, deretter Nordvestlandet</p>
            <h2 className="mt-4 text-3xl font-normal text-[#fbf8f2] sm:text-4xl">
              Digital lesning først. Befaring når papirene ikke kan svare.
            </h2>
            <p className="mt-5 text-[16px] leading-relaxed text-[#fbf8f2]/90">{company.coverage.physical}</p>
            <SectionCta action="Start digitalt" href="/kontakt?spor=digitalt" tone="dark" />
          </div>
        </div>
      </section>
      <section className="ed-paper">
        <div className="ed-wrap">
          <div className="plan-read plan-float max-w-2xl">
            <p className="ed-kicker">Ofte stilt</p>
            <ul className="mt-8 divide-y divide-flo-ink/12 border-y border-flo-ink/12">
              {faqs.map((item) => (
                <li key={item.question} className="py-6">
                  <h2 className="text-xl font-normal">{item.question}</h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-flo-muted">{item.answer}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}