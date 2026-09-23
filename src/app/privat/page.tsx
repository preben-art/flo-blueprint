import Link from "next/link";
import { FaqBlock } from "@/components/faq-block";
import { JsonLd } from "@/components/json-ld";
import { PageStill } from "@/components/page-still";
import { PlanSplit } from "@/components/plan-field";
import { SectionCta } from "@/components/section-cta";
import { Button } from "@/components/ui/button";
import { customerExplain } from "@/content/explain";
import { company, faqs, photoAlt, stills } from "@/content/site";
import { faqPageJsonLd, pageMeta } from "@/lib/seo";

const privatFaqs = [
  faqs.find((item) => item.id === "faq.utleiedel")!,
  {
    question: "Må jeg ha brannrådgiver for å leie ut kjeller eller loft?",
    answer:
      "Ikke automatisk. At «alle utleiedeler krever RIBr» er en påstand. Bruksendring og ny boenhet kan treffe TEK og SAK. Søknadsplikt avgjøres i saken, ikke av et stikkord. FLO leser tegninger og bilder først.",
  },
  {
    question: "Holder det med bilder, eller må noen komme på befaring?",
    answer:
      "Tegninger og bilder leses digitalt først, hele landet. Befaring trengs når rømning, brannskille eller det som er bygget ikke kan avgjøres fra underlaget. Fysisk del er Nordvestlandet.",
  },
  {
    question: "Er bolig det samme som næringseiendom hos FLO?",
    answer:
      "Nei. Privat / bolig er et eget spor. Det er ikke eiendom/forvaltning og ikke portefølje. Vi blander ikke boligtekst inn i næring.",
  },
  {
    question: "Hva sender jeg inn for en bolig eller utleiedel?",
    answer:
      "Beskriv hva som skal endres. Send tegninger hvis de finnes, og bilder av rommet, rømning og det som allerede er bygget. FLO konkluderer ikke «lovlig utleie» uten sak.",
  },
];

export const metadata = pageMeta(
  "Brannsikkerhet i bolig og utleiedel",
  "Kan kjeller, loft eller del av boligen leies ut? FLO leser tegninger og bilder digitalt og sier hva som må avklares før rommet tas i bruk. Bolig er et eget spor.",
  "/privat",
);

export default function PrivatPage() {
  const expl = customerExplain.privat;
  return (
    <>
      <JsonLd data={faqPageJsonLd(privatFaqs)} />
      <PageStill
        src={stills.detektor}
        alt={photoAlt[stills.detektor]}
        room="03P"
        kicker="Privat / bolig"
        title="Kan kjelleren leies ut, og holder rømningen?"
        lead="Før kjeller, loft eller del av boligen brukes som egen boenhet, må bruk, rømning og brannskille vurderes. Det er ikke et interiørvalg. Send tegninger og bilder. FLO starter digitalt."
      />
      <PlanSplit still={stills.slokkerHaand} stillAlt={photoAlt[stills.slokkerHaand]} caption="Varsling, slokking og rømning i bolig. Bruksendring vurderes før rommet tas i bruk.">
        <p className="ed-kicker">Direkte svar</p>
        <h2 className="mt-4 max-w-xl text-3xl font-normal sm:text-4xl">{expl.realQuestion}</h2>
        <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-[#221d19]">{expl.meaning}</p>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#221d19]">
          FLO konkluderer ikke «lovlig utleie» uten sak. Første steg er å lese det du har: tegning, foto og hva som skal
          endres. {company.coverage.digital}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/kontakt?situasjon=endres&hvem=privat">Send tegninger og bilder</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={`tel:${company.switchboard.replace(/\s/g, "")}`}>{company.switchboard}</a>
          </Button>
        </div>
      </PlanSplit>
      <section className="ed-navy">
        <div className="ed-wrap grid gap-8 lg:grid-cols-12">
          <div className="plan-read plan-read-ink plan-float lg:col-span-7">
            <p className="ed-kicker">Hva avklares</p>
            <h2 className="mt-4 text-3xl font-normal text-[#fbf8f2] sm:text-4xl">
              Bruk, rømning og skille, før rommet tas i bruk.
            </h2>
            <ul className="mt-8 space-y-3 text-[15px] leading-relaxed text-[#fbf8f2]/90">
              {expl.typical.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="plan-read plan-read-ink plan-float lg:col-span-5">
            <p className="ed-kicker">Hva FLO gjør</p>
            <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-[#fbf8f2]/90">
              {expl.floHelps.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <SectionCta action="Send inn tegninger eller bilder" href="/kontakt?situasjon=endres&hvem=privat" tone="dark" />
          </div>
        </div>
      </section>
      <section className="ed-paper">
        <div className="ed-wrap">
          <div className="plan-read plan-float max-w-3xl">
            <p className="ed-kicker">Ofte stilt om bolig</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-normal sm:text-4xl">
              Hva må avklares før utleiedel, kjeller eller loft?
            </h2>
            <div className="mt-10">
              <FaqBlock items={privatFaqs} />
            </div>
            <p className="mt-8 text-sm text-[#221d19]">
              Privat er ikke dokumentert som FLO-hovedmarked. Sporet vises uten oppdiktet boligsak.
            </p>
            <SectionCta action="Send tegninger og bilder" href="/kontakt?situasjon=endres&hvem=privat" />
          </div>
        </div>
      </section>
    </>
  );
}