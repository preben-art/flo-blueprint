import { peopleGroups } from "@/content/people-groups";
import { OfficeMap } from "@/components/office-map";
import { BlueprintLayout, BlueprintRoom } from "@/components/blueprint";
import { CtaZone } from "@/components/cta-zone";
import { PageStill } from "@/components/page-still";
import { PersonCard } from "@/components/person-card";
import { PlanSplit } from "@/components/plan-field";
import { company, people, photoAlt, stills } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Om FLO",
  "FLO Brannsikring AS, org.nr 979 582 064. Stryn og Nordfjordeid. Sentral godkjenning TK3.",
  "/om-flo",
);

export default function OmFloPage() {
  return (
    <>
      <PageSemantics
        path="/om-flo"
        title="Om FLO"
        description="FLO Brannsikring AS, org.nr 979 582 064. Stryn og Nordfjordeid. Sentral godkjenning TK3."
        kind="AboutPage"
        people
        area="Stryn og Nordfjordeid"
      />
      <PageStill
        src={stills.team}
        alt={photoAlt[stills.team]}
        room="08"
        kicker="Om FLO"
        title={company.legalName}
        lead={company.promise}
      />
      <PlanSplit tone="paper" still={stills.drawings} stillAlt={photoAlt[stills.drawings]} caption="Fagmiljøet i Stryn leser underlaget før tiltak settes i gang.">
        <p className="ed-kicker">Fagmiljø</p>
        <h2 className="mt-4 text-2xl font-normal sm:text-3xl">To adresser. Ett fagmiljø.</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-flo-muted">{company.coverage.digital}</p>
        <p className="ed-kicker mt-12">Nordvestlandet</p>
        <h2 className="mt-4 text-2xl font-normal sm:text-3xl">Stryn og Nordfjordeid.</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-flo-muted">{company.coverage.physical}</p>
      </PlanSplit>
      <BlueprintLayout flow>

      <div className="mb-3 grid gap-3 lg:grid-cols-2">
        <BlueprintRoom number="08A" kicker="Selskap" title="FLO Brannsikring AS">
          <dl className="space-y-3 text-[15px]">
            <div className="flex justify-between gap-4 border-b border-flo-ink/15 pb-2">
              <dt className="text-[#6b645c]">Org.nr</dt>
              <dd>{company.orgnr}</dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-flo-ink/15 pb-2">
              <dt className="text-[#6b645c]">Godkjenning</dt>
              <dd>{company.approvalPeriod}</dd>
            </div>
            {company.flags.map((f) => (
              <div key={f} className="flex justify-between gap-4 border-b border-flo-ink/15 pb-2">
                <dt className="text-[#6b645c]">Merknad</dt>
                <dd>{f}</dd>
              </div>
            ))}
          </dl>
          <a
            href={company.approvalUrl}
            className="mt-4 inline-block text-sm underline hover:text-flo-red"
            target="_blank"
            rel="noreferrer"
          >
            Åpne DiBK-registeret
          </a>
        </BlueprintRoom>
        <BlueprintRoom number="08B" kicker="Kontor" title="To adresser, ett fagmiljø">
          <ul className="space-y-6">
            {company.locations.map((loc) => (
              <li key={loc.id}>
                <p className="font-medium">{loc.name}</p>
                <p className="text-[15px] text-[#3d3832]">{loc.address}</p>
                <p className="text-[15px] text-[#3d3832]">{loc.postal}</p>
                {"poBox" in loc && loc.poBox ? (
                  <p className="text-sm text-[#6b645c]">{loc.poBox}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </BlueprintRoom>
      </div>

      <BlueprintRoom number="08C" kicker="Godkjenning" title="Tiltaksklasser" className="my-3">
        <div className="grid gap-4 sm:grid-cols-3">
          {company.approvals.map((a) => (
            <div key={a.area} className="border border-flo-ink p-4">
              <p className="room-number text-flo-red">{a.class}</p>
              <p className="mt-2 font-medium">{a.function}</p>
              <p className="text-sm text-[#3d3832]">{a.area}</p>
            </div>
          ))}
        </div>
      </BlueprintRoom>

      <BlueprintRoom
        number="08D"
        kicker="Historikk"
        title="Lokale røtter. Bred brannfaglig kompetanse."
        className="my-3"
      >
        <div className="grid gap-8 text-[16px] leading-relaxed md:grid-cols-2">
          <div><p className="story-eyebrow">Fra Stryn, siden 1993</p><p className="mt-4">FLO startet som en familiebedrift i Stryn i 1993, med kontroll og vedlikehold av brannslukkere og brannslanger. Nærheten til kundene og arbeidet ute i byggene er en del av historien vår.</p></div>
          <div><p className="story-eyebrow">Fra utstyr til helhet</p><p className="mt-4">I dag hjelper vi med brannteknisk prosjektering, rådgivning, kontroll, dokumentasjon og montering av brannsikringsutstyr. Fra kontorene i Stryn og Nordfjordeid følger vi opp både nye og eksisterende bygg.</p></div>
        </div>
      </BlueprintRoom>

      <div className="mb-8 mt-16 grid gap-6 md:grid-cols-2 md:items-end">
        <div><p className="story-eyebrow">Menneskene i FLO</p><h2 className="mt-4 text-3xl font-normal sm:text-4xl">Fagfolk du kan <span className="text-flo-red">snakke med.</span></h2></div>
        <p className="max-w-2xl text-[16px] leading-relaxed text-[#3d3832]">Bak tegningene, rådene og kontrollene står mennesker som jobber med brannsikkerhet hver dag. Finn din kontakt nedenfor, eller ta kontakt med oss, så hjelper vi deg videre til riktig fagperson.</p>
      </div>
      <nav aria-label="Finn ansatte etter fagområde" className="mb-10 flex flex-wrap gap-3">
        {peopleGroups.map(group => <a key={group.id} href={`#${group.id}`} className="rounded-full border border-flo-ink/20 px-4 py-2 text-sm hover:border-flo-red hover:text-flo-red">{group.title}</a>)}
      </nav>
      {peopleGroups.map(group => (
        <section key={group.id} id={group.id} aria-labelledby={`${group.id}-title`} className="mb-14 scroll-mt-32 border-t border-flo-ink/20 pt-8">
          <h2 id={`${group.id}-title`} className="text-2xl font-normal sm:text-3xl">{group.title}</h2>
          <p className="mb-6 mt-3 text-base text-flo-muted">{group.intro}</p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {group.members.map(person => <PersonCard key={person.email} index={people.indexOf(person)} person={person} />)}
          </div>
        </section>
      ))}

    </BlueprintLayout>
      <OfficeMap />
    <CtaZone title="Snakk med oss direkte." body="Sentralbord, post eller skjema. Vi svarer innen én til to virkedager." />
    </>
  );
}
