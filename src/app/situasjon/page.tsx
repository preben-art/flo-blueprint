import { PageStill } from "@/components/page-still";
import { PlanSplit } from "@/components/plan-field";
import { SearchAsks } from "@/components/search-asks";
import { SituationCards } from "@/components/situation-cards";
import { photoAlt, stills } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Avvik og ombygging",
  "Har dere fått tilsyn, skal dere bygge om, eller er det uklart hva som kreves? Send avviket eller tegningene.",
  "/situasjon",
);

export default function SituasjonIndexPage() {
  return (
    <>
      <PageSemantics
        path="/situasjon"
        title="Avvik og ombygging"
        description="Har dere fått tilsyn, skal dere bygge om, eller er det uklart hva som kreves? Send avviket eller tegningene."
        kind="CollectionPage"
        topic="Avvik, ombygging og uklare krav"
      />
      <PageStill
        src={stills.internkontroll}
        alt={photoAlt[stills.internkontroll]}
        room="02"
        kicker="Avvik og ombygging"
        title="Hva har skjedd hos dere?"
        lead="Send avviket, tegningene eller det som ble sagt. Vi leser det mot hvordan bygget brukes."
      />
      <PlanSplit still={stills.romningOvenfra} stillAlt={photoAlt[stills.romningOvenfra]} caption="Når bruk eller planløsning endres, endres ofte rømningen.">
        <p className="ed-kicker">Lesingen</p>
        <h2 className="mt-4 max-w-md text-3xl font-normal sm:text-4xl">
          Tilsyn, ombygging eller uklart krav.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#221d19]">
          Tre innganger. Samme tegning: hva som er brannskille, hvor rømningen går, og hva som faktisk er kontrollert.
        </p>
      </PlanSplit>
      <section className="ed">
        <div className="ed-wrap">
          <SituationCards />
        </div>
      </section>
      <SearchAsks />
    </>
  );
}
