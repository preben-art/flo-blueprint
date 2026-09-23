import { SocialLinks } from "@/components/social-links";
import { BlueprintRoom } from "@/components/blueprint";
import { ContactForm } from "@/components/contact-form";
import { CoverageBand } from "@/components/coverage-band";
import { PageStill } from "@/components/page-still";
import { PlanSplit } from "@/components/plan-field";
import { company, photoAlt, stills } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Kontakt",
  "Send avviket, tegningene eller det som ble sagt. Vi svarer innen én til to virkedager.",
  "/kontakt",
);

export default async function KontaktPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;
  const pick = (key: string) => {
    const v = q[key];
    return Array.isArray(v) ? v[0] : v;
  };

  const hvem = pick("hvem");
  const isPrivate = hvem === "privat";

  return (
    <>
      <PageStill
        src={isPrivate ? stills.detektor : stills.avklaring}
        alt={photoAlt[isPrivate ? stills.detektor : stills.avklaring]}
        room="07"
        kicker={isPrivate ? "Privat / bolig" : "Kontakt"}
        title={isPrivate ? "Send inn tegninger eller bilder." : "Send det dere har. Rapporten holder for å starte."}
        lead={
          isPrivate
            ? "Kjeller, loft eller utleiedel: beskriv hva som skal endres. FLO starter digitalt. Befaring bare når underlaget ikke kan svare."
            : "Har dere fått avvik, skal dere bygge om, eller er det uklart hva som kreves? Rapporten eller tegningene holder for å starte."
        }
      />
      <CoverageBand />
      <PlanSplit tone="paper" caption="Send underlaget. Vi leser det mot brannskille, rømning og det som står i bygget." still={isPrivate ? stills.utgang : stills.bygg} stillAlt={photoAlt[isPrivate ? stills.utgang : stills.bygg]}>
        <p className="mb-8 max-w-xl text-[15px] leading-relaxed text-[#221d19]">
          Skjemaet her er lokal visning. Det sender ikke til et eksternt system ennå. Rapporten, tegningene eller det
          som ble sagt, holder for å starte.
        </p>
        <BlueprintRoom number="07A" kicker="Skjema" title="Hva gjelder?">
          <ContactForm situasjon={pick("situasjon")} spor={pick("spor")} hvem={pick("hvem")} />
        </BlueprintRoom>
        <BlueprintRoom number="07B" kicker="Direkte" title="Uten skjema" className="mt-3">
          <p className="text-[15px] leading-relaxed">
            Sentralbord{" "}
            <a className="underline hover:text-[#c62e32]" href={`tel:${company.switchboard.replace(/\s/g, "")}`}>
              {company.switchboard}
            </a>
          </p>
          <p className="mt-2 text-[15px]">
            <a className="underline hover:text-[#c62e32]" href={`mailto:${company.email}`}>
              {company.email}
            </a>
          </p>
          <p className="mt-2 text-[15px] text-[#3d3832]">Faktura: {company.invoice}</p>
          <ul className="mt-8 space-y-5">
            {company.locations.map((loc) => (
              <li key={loc.id}>
                <p className="room-number text-[#c62e32]">{loc.name}</p>
                <p className="mt-1 text-[15px]">{loc.address}</p>
                <p className="text-[15px]">{loc.postal}</p>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <p className="ed-kicker">Følg FLO</p>
            <SocialLinks tone="light" showLabels />
          </div>
        </BlueprintRoom>
      </PlanSplit>
    </>
  );
}
