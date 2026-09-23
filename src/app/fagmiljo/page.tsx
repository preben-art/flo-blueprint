import Link from "next/link";
import { PageStill } from "@/components/page-still";
import { PlanSplit } from "@/components/plan-field";
import { SectionCta } from "@/components/section-cta";
import { StillFrame } from "@/components/still-frame";
import { Button } from "@/components/ui/button";
import { people, photoAlt, stills } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Fagmiljø",
  "Rådgivning, RIBr og utførelse i ett fagmiljø i Stryn og Nordfjordeid. Nyheter og artikler ligger her.",
  "/fagmiljo",
);

const visible = people.filter((p) => p.role);

export default function FagmiljoPage() {
  return (
    <>
      <PageSemantics
        path="/fagmiljo"
        title="Fagmiljø"
        description="Rådgivning, RIBr og utførelse i ett fagmiljø i Stryn og Nordfjordeid. Nyheter og artikler ligger her."
        area="Stryn og Nordfjordeid"
        people
      />
      <PageStill
        src={stills.drawings}
        alt={photoAlt[stills.drawings]}
        room="04"
        kicker="Fagmiljø"
        title="Ett fagmiljø. Tre spor i samme sak."
        lead="Rådgivning, branningeniører og utførelse leser samme bygg. Nyheter og artikler styres fra redaksjonen."
      />
      <PlanSplit still={stills.skjerm} stillAlt={photoAlt[stills.skjerm]} caption="Nyheter og artikler leses her. Det som publiseres, kan tas ned.">
        <p className="ed-kicker">Les det som står</p>
        <h2 className="mt-4 max-w-xl text-3xl font-normal sm:text-4xl">Nyheter, artikler og spørsmål.</h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-flo-muted">
          Det som publiseres, kan tas ned igjen. FLO styrer arbeidsverktøyet. Kunder kan legge inn eget innhold.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/nyheter">Nyheter</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/artikler">Artikler</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/fag-og-kunnskap">Spørsmål</Link>
          </Button>
        </div>
      </PlanSplit>
      <section className="ed-paper">
        <div className="ed-wrap grid items-start gap-10 lg:grid-cols-12">
          <div className="plan-read plan-float lg:col-span-6">
            <p className="ed-kicker">Stryn og Nordfjordeid</p>
            <h2 className="mt-4 text-3xl font-normal sm:text-4xl">Hvem leser saken?</h2>
            <ul className="mt-8 divide-y divide-flo-ink/12 border-y border-flo-ink/12">
              {visible.slice(0, 8).map((person) => (
                <li key={person.email} className="py-4">
                  <p className="font-normal">{person.name}</p>
                  <p className="mt-1 text-sm text-flo-muted">
                    {person.role}
                    {person.location ? `, ${person.location}` : ""}
                  </p>
                </li>
              ))}
            </ul>
            <SectionCta action="Send saken" href="/kontakt" />
          </div>
          <figure className="plan-float lg:col-span-6">
            <StillFrame
              src={stills.slokkerHaand}
              alt={photoAlt[stills.slokkerHaand]}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[16/11]"
            />
            <figcaption className="plan-note">Fagmiljøet leser underlaget før tiltak settes i gang.</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}