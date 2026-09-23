import Link from "next/link";
import { EdKicker, EdLead, EdSection, EdTitle } from "@/components/ed";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
import { canonicalOrigin, pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Leveransefilm",
  "FLO Brannsikring, leveransefilm. Nettstedet filmet slik det faktisk er, med originalmusikk.",
  "/film",
);

const FILM = "/film/flo-leveransefilm-1080p.mp4";
const POSTER = "/film/plakat.jpg";

const chapters = [
  { t: "00:00", label: "Åpning" },
  { t: "00:07", label: "Forsiden. Avvik, ombygging og uklare krav" },
  { t: "00:22", label: "Hva slags bygg, og hvordan brukes det?" },
  { t: "00:31", label: "Påstand eller krav. Arbeidsverktøyet" },
  { t: "00:49", label: "Digitalt, hele landet" },
  { t: "00:56", label: "3D-skanning og kartlegging" },
  { t: "01:07", label: "Artikler og nyheter" },
  { t: "01:18", label: "Mobil" },
  { t: "01:30", label: "Oppdrag og kontakt" },
];

export default function FilmPage() {
  return (
    <>
      <PageSemantics
        path="/film"
        title="Leveransefilm"
        description="FLO Brannsikring, leveransefilm. Nettstedet filmet slik det faktisk er, med originalmusikk."
        topic="Leveransefilm"
        video={{
          name: "FLO Brannsikring, leveransefilm",
          description: "Nettstedet filmet slik det er, med originalmusikk.",
          contentUrl: `${canonicalOrigin}${FILM}`,
          thumbnailUrl: `${canonicalOrigin}${POSTER}`,
          uploadDate: "2026-09-19",
        }}
      />
      <EdSection id="film" tone="ink" className="film-intro pt-20 sm:pt-28">
        <div className="plan-read-ink plan-float max-w-3xl">
          <EdKicker>Leveransefilm</EdKicker>
          <EdTitle>Nettstedet, filmet slik det er.</EdTitle>
          <EdLead>
            Alt av grensesnitt i filmen er det ekte nettstedet, tatt opp bilde for bilde. Kamerabevegelsene mellom
            sidene er laget fra FLO sine egne fotografier. Musikken er original. 1 min 49 s.
          </EdLead>
        </div>
        <figure className="film-frame plan-float mt-10">
          <video
            className="film-video"
            controls
            playsInline
            preload="metadata"
            poster={POSTER}
            src={FILM}
            aria-label="FLO Brannsikring, leveransefilm"
          >
            Nettleseren kan ikke spille filmen.{" "}
            <a href={FILM} download>
              Last ned filmen (MP4).
            </a>
          </video>
          <figcaption className="film-caption">
            <span>FLO Brannsikring · leveransefilm · 1080p · 25 fps · stereo</span>
            <a href={FILM} download className="text-flo-red-accent hover:underline">
              Last ned (MP4, 33 MB)
            </a>
          </figcaption>
        </figure>
      </EdSection>

      <EdSection id="kapitler" tone="paper">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="plan-read plan-float lg:col-span-5">
            <EdKicker>Kapitler</EdKicker>
            <EdTitle>Hva filmen viser</EdTitle>
            <EdLead>Rekkefølgen følger nettstedet: fra spørsmålet kunden kommer med, til hvordan FLO svarer digitalt og på befaring.</EdLead>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">Til forsiden</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/kontakt">Send saken</Link>
              </Button>
            </div>
          </div>
          <ol className="plan-read plan-float aktuelt-list lg:col-span-7">
            {chapters.map((c) => (
              <li key={c.t} className="aktuelt-row grid-cols-[4.5rem_1fr] items-baseline gap-4 sm:grid">
                <span className="aktuelt-meta">{c.t}</span>
                <span className="aktuelt-title">{c.label}</span>
              </li>
            ))}
          </ol>
        </div>
      </EdSection>

      <EdSection id="opphav" tone="sheet">
        <div className="plan-read plan-float max-w-3xl">
          <EdKicker>Opphav</EdKicker>
          <h2 className="mt-4 text-2xl font-normal sm:text-3xl">Ingenting i grensesnittet er tegnet om.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-flo-muted">
            Nettstedet er rendret fra produksjonsbygget, bilde for bilde, med kontrollert klokke slik at scroll og
            bevegelser er nøyaktige. Broene mellom sidene er kamerabevegelser på FLO sine egne fotografier og
            8K-stillbilder av sidene. Tekst, logo, knapper og layout er aldri generert. Musikken er komponert for
            filmen og er rettighetsfri. Kontakt: {company.email}.
          </p>
        </div>
      </EdSection>
    </>
  );
}
