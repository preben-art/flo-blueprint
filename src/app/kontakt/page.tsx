import { OfficeMap } from "@/components/office-map";
import { SocialLinks } from "@/components/social-links";
import { ContactForm } from "@/components/contact-form";
import { CoverageBand } from "@/components/coverage-band";
import { PageStill } from "@/components/page-still";
import { company, photoAlt, stills } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
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
      <PageSemantics
        path="/kontakt"
        title="Kontakt"
        description="Send avviket, tegningene eller det som ble sagt. Vi svarer innen én til to virkedager."
        kind="ContactPage"
        area="Digitalt i hele Norge. Befaring fra Stryn og Nordfjordeid."
      />
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
      <section className="portfolio-paper" id="send-saken" aria-labelledby="contact-title">
        <div className="portfolio-wrap">
          <div className="contact-intro"><p className="story-eyebrow">La oss se på saken</p><h2 id="contact-title" className="story-heading">Fortell oss litt.<br /><span>Vi hjelper dere videre.</span></h2><p>Et avvik, en tegning eller et spørsmål. Start med det dere har – dere trenger ikke ha alle svarene.</p></div>
          <div className="contact-layout">
            <div className="contact-form-panel"><ContactForm situasjon={pick("situasjon")} spor={pick("spor")} hvem={pick("hvem")} /></div>
            <aside className="contact-direct">
              <p className="story-eyebrow">Direkte til FLO</p><h3>Vil du heller<br />snakke med oss?</h3>
              <a className="contact-phone" href={`tel:${company.switchboard.replace(/\s/g, "")}`}>{company.switchboard}</a>
              <a className="contact-email" href={`mailto:${company.email}`}>{company.email}</a>
              <div className="contact-next"><h4>Hva skjer videre?</h4><p>Vi leser henvendelsen og tar kontakt for å avklare behovet. Dokumentene vurderes først; befaring avtales når bygget må ses.</p></div>
              <p className="contact-attachments">Rapporter, tegninger og bilder kan sendes direkte på e-post.</p>
              <div className="contact-offices">{company.locations.map(loc => <address key={loc.id}><strong>{loc.name}</strong><a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer">{loc.address}<br />{loc.postal} ↗</a></address>)}</div>
              <SocialLinks showLabels />
              <p className="contact-invoice">Faktura: <a href={`mailto:${company.invoice}`}>{company.invoice}</a></p>
            </aside>
          </div>
        </div>
      </section>
      <section className="portfolio-paper border-t border-flo-ink/15">
        <div className="portfolio-wrap max-w-4xl text-base leading-relaxed">
          <details id="personvern" className="scroll-mt-28">
          <summary className="cursor-pointer text-lg font-medium text-flo-ink">Personvern – slik brukes henvendelsen din</summary>
          <div className="mt-6">
          <p>{company.legalName}, org.nr. {company.orgnr}, er ansvarlig for oppfølgingen av henvendelsen. Navn, kontaktopplysninger, eventuell bedrift og beskrivelsen av saken brukes til å besvare forespørselen og avklare behovet ditt.</p>
          <p className="mt-4">Når skjemaet er aktivert, sendes opplysningene til FLO via EmailJS og den tilknyttede e-posttjenesten. Avhukingen, tekstversjonen og tidspunktene for bekreftelse og sending følger meldingen. Avhukingen gjelder denne informasjonen, ikke markedsføring.</p>
          <p className="mt-4">EmailJS opplyser at behandlingen kan innebære overføring til USA. Les <a className="underline text-flo-red" href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noreferrer">EmailJS sin personvernerklæring</a>. Ikke send sensitive personopplysninger i skjemaet.</p>
          <p className="mt-4">For spørsmål om lagring, innsyn, retting eller sletting av opplysninger hos FLO, kontakt <a className="underline text-flo-red" href={`mailto:${company.email}`}>{company.email}</a>. Du kan også bruke e-post eller telefon direkte.</p>
          </div>
          </details>
        </div>
      </section>
      <CoverageBand />
      <OfficeMap />
    </>
  );
}
