import { OfficeMap } from "@/components/office-map";
import { BlueprintLayout, BlueprintRoom, TechnicalNote } from "@/components/blueprint";
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
        <BlueprintRoom number="08A" kicker="Selskap" title="Det registeret bekrefter">
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
        title="Tre årstall. Vi slår dem ikke sammen."
        className="my-3"
      >
        <ul className="space-y-3 text-[15px] leading-relaxed">
          <li className="border-b border-flo-ink/15 pb-3">
            Nettstedet forteller om familiebedrift fra 1993 i Stryn, med Gunvor Flo.
          </li>
          <li className="border-b border-flo-ink/15 pb-3">
            Brønnøysund: underenhet med oppstart 1994-01-01, historisk navn FLO BRANNSIKRING fra 1995.
          </li>
          <li className="border-b border-flo-ink/15 pb-3">
            AS stiftet 1998-01-21. Alle tre kan være sanne på ulike juridiske lag. Vi velger ikke ett år uten
            bekreftelse.
          </li>
          <li>
            Eierskap mot Byggforvaltning Norge er beskrevet på gammelt nettsted. Offentlig Brreg-payload sier ikke
            konsern. Det merkes som uløst, ikke som ferdig historie.
          </li>
        </ul>
        <TechnicalNote>
          Morselskapets eiertabell (Coop-andeler) skal ikke vises som FLO-eierskap. Den hørte hjemme på et annet
          nettsted.
        </TechnicalNote>
      </BlueprintRoom>

      <h2 className="mb-4 mt-10 text-2xl font-normal">Folkene</h2>
      <p className="mb-6 max-w-2xl text-sm text-[#3d3832]">
        14 navn på kilden. Brreg oppgir 15 ansatte. Avviket er uløst. Titler som manglet på kilden, er ikke funnet på
        her.
      </p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {people.map((person, i) => (
          <PersonCard
            key={person.name}
            index={i}
            person={{
              name: person.name,
              role: person.role,
              location: person.location,
              email: person.email,
              phone: "phone" in person ? person.phone : undefined,
              photo: "photo" in person ? person.photo : undefined,
            }}
          />
        ))}
      </div>

    </BlueprintLayout>
      <OfficeMap />
    <CtaZone title="Snakk med oss direkte." body="Sentralbord, post eller skjema. Vi svarer innen én til to virkedager." />
    </>
  );
}
