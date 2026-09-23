import Link from "next/link";
import { EdKicker, EdLead, EdSection, EdTitle, RailStep } from "@/components/ed";
import { StillFrame } from "@/components/still-frame";
import { PartnerMark } from "@/components/partner-mark";
import { PartnerStrip } from "@/components/partner-strip";
import { PlanBand } from "@/components/plan-field";
import { SectionCta } from "@/components/section-cta";
import { SituationCards } from "@/components/situation-cards";
import { Button } from "@/components/ui/button";
import { ClarifyPath } from "@/components/clarify-path";
import { claimPath, customerExplain, deliveryTracks } from "@/content/explain";
import { knowledgeNodes } from "@/content/knowledge/nodes";
import {
  articleBySlug,
  articles,
  commercialCustomers,
  company,
  customerStill,
  customers,
  news,
  photoAlt,
  projects,
} from "@/content/site";

const featureArticle = articles[0];
const featureStill = "/media/nodutgang-korridor.jpg";
const newsStill = "/media/brannskilt.jpg";

function shortDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

const projectImage: Record<string, string> = {
  coop: "/media/coop-extra.jpg",
  "classic-norway": "/media/classic-norway.jpg",
  weenaas: "/partners/weenaas.jpg",
};
const stillBygg = "/media/utgang.jpg";
const stillSkanner = "/media/skanner.jpg";
const stillModell = "/media/fagmiljo-to.jpg";

const featuredIcps = ["eier-forvalter", "virksomhet-bruker", "arkitekt-byggherre"] as const;
const insight = knowledgeNodes.find((n) => n.slug === "eier-eller-bruker");

function Figure({
  src,
  alt,
  caption,
  className = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className="plan-float">
      <StillFrame src={src} alt={alt} sizes="(max-width: 1024px) 100vw, 50vw" className={className} />
      {caption ? <figcaption className="plan-note">{caption}</figcaption> : null}
    </figure>
  );
}

export function HomeBoard() {
  return (
    <>
      <PartnerStrip tone="light" />

      <PlanBand id="situasjon" density="whisper">
        <div className="plan-read plan-float max-w-3xl">
          <EdKicker>Avvik og ombygging</EdKicker>
          <EdTitle>Hva har skjedd hos dere?</EdTitle>
          <EdLead>
            Har dere fått tilsyn, skal dere bygge om, eller er det uklart hva som kreves?
          </EdLead>
        </div>
        <SituationCards showExamples heading="h3" />
      </PlanBand>

      <EdSection id="avklaring" tone="navy">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="plan-read plan-read-ink plan-float lg:col-span-4">
            <EdKicker>Før dere handler</EdKicker>
            <h2 className="mt-4 max-w-md text-3xl font-normal text-[#fbf8f2] sm:text-4xl">
              Hva slags bygg, og hvordan brukes det?
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-pretty text-[#fbf8f2]/90">
              Ni spørsmål i planen. Åpne det som treffer saken. Anbefalingen kommer etter det, ikke før.
            </p>
          </div>
          <div className="lg:col-span-8">
            <ClarifyPath tone="glow" />
          </div>
        </div>
      </EdSection>

      <EdSection id="pastand-eller-krav" tone="sheet">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="plan-read plan-float lg:col-span-5">
            <EdKicker>Påbud</EdKicker>
            <EdTitle>Er dette påbudt?</EdTitle>
            <EdLead>
              Noen sier at det må gjøres. Vi sjekker om det står i forskrift, konsept eller vedtak, eller om det er et forslag.
            </EdLead>
            <SectionCta action="Få vurdert hva som faktisk gjelder" href="/fag-og-kunnskap/pastand-eller-krav" />
          </div>
          <ol className="ed-rail lg:col-span-7">
            {claimPath.map((step, i) => (
              <RailStep key={step.id} index={i} title={step.label}>
                <p className="mt-1 text-[15px] leading-relaxed text-[#221d19]">{step.meaning}</p>
              </RailStep>
            ))}
          </ol>
        </div>
      </EdSection>

      <EdSection id="hvem" tone="paper">
        <div className="plan-read plan-float max-w-3xl">
          <EdKicker>Ansvar</EdKicker>
          <EdTitle>Eier, bruker eller byggherre?</EdTitle>
          <EdLead>Dere kan dele bygg og likevel ha ulike plikter. Finn rollen som treffer ansvaret ditt.</EdLead>
        </div>
        <div className="mt-14 space-y-16">
          {featuredIcps.map((slug, i) => {
            const pool = commercialCustomers ?? customers.filter((item) => item.track !== "privat");
            const c = pool.find((x) => x.slug === slug);
            if (!c) return null;
            const expl = customerExplain[slug];
            const imageLeft = i % 2 === 1;
            return (
              <article key={slug} className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
                <div className={imageLeft ? "lg:col-span-5 lg:order-1" : "lg:col-span-5 lg:order-2"}>
                  <Figure
                    src={customerStill[slug]}
                    alt={photoAlt[customerStill[slug]] ?? c.label}
                    caption={c.confirmed ? "Navngitt oppdrag" : "Ingen navngitt sak ennå"}
                    className="aspect-[16/11]"
                  />
                </div>
                <div className={imageLeft ? "plan-read plan-float lg:col-span-7 lg:order-2" : "plan-read plan-float lg:col-span-7 lg:order-1"}>
                  <p className="ed-kicker">{c.label}</p>
                  <h3 className="mt-3 text-2xl font-normal sm:text-3xl">{expl.realQuestion}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-pretty text-[#221d19]">{expl.meaning}</p>
                  <ul className="mt-6 space-y-2">
                    {expl.typical.slice(0, 4).map((t) => (
                      <li key={t} className="border-b border-[#161210]/12 pb-2 text-sm text-[#221d19]">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[15px] leading-relaxed">Hva FLO gjør: {expl.floHelps.join(", ")}.</p>
                  <div className="mt-6">
                    <Button asChild>
                      <Link href={`/hvem-er-du/${slug}`}>{expl.cta}</Link>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <ul className="mt-16 grid gap-px border border-[#161210]/12 bg-[#161210]/12 sm:grid-cols-3">
          {(commercialCustomers ?? customers.filter((item) => item.track !== "privat"))
            .filter((c) => !featuredIcps.includes(c.slug as (typeof featuredIcps)[number]))
            .map((c) => (
              <li key={c.slug} className="bg-[#fbf8f2] p-5">
                <Link href={`/hvem-er-du/${c.slug}`} className="block hover:text-[#c62e32]">
                  <p className="ed-kicker">{c.confirmed ? "Navngitt oppdrag" : "Ingen navngitt sak ennå"}</p>
                  <p className="mt-2 text-lg font-normal">{c.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#221d19]">{customerExplain[c.slug].realQuestion}</p>
                </Link>
              </li>
            ))}
        </ul>
        <div className="mt-8 border border-[#161210]/12 bg-[#fbf8f2] p-6 sm:p-8">
          <p className="ed-kicker">Bolig</p>
          <h3 className="mt-3 text-2xl font-normal">Kan jeg leie ut kjelleren?</h3>
          <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#221d19]">
            Utleiedel, kjeller, loft og bruksendring i bolig. Det er et annet spor enn næringseiendom.
          </p>
          <div className="mt-6">
            <Button asChild>
              <Link href="/hvem-er-du/privat">Få vurdert boligen</Link>
            </Button>
          </div>
        </div>
      </EdSection>

      <EdSection id="kartlegging" tone="mist" className="scan-section">
        <div className="grid items-stretch gap-6 lg:grid-cols-12 lg:gap-8">
          <figure className="plan-float scan-lead lg:col-span-5">
            <StillFrame
              src={stillSkanner}
              alt={photoAlt[stillSkanner] ?? "FLO-medarbeider med 3D-laserskanner"}
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="aspect-[4/5] h-full lg:aspect-auto lg:min-h-[36rem]"
            />
            <figcaption className="plan-note">3D-laserskanning. Bygget måles slik det faktisk står.</figcaption>
          </figure>
          <div className="grid gap-6 lg:col-span-7">
            <div className="plan-read plan-float">
              <EdKicker>3D-skanning</EdKicker>
              <EdTitle>Stemmer tegningene med bygget?</EdTitle>
              <EdLead>
                Når papirene og virkeligheten ikke treffer hverandre, skanner vi bygget og bygger et oppdatert underlag: punktsky,
                modell og tegning. Skanning er et verktøy i saken, ikke et produkt dere kjøper i tillegg.
              </EdLead>
              <ol className="scan-steps mt-8">
                {[
                  { n: "01", t: "Bygget som det står", d: "Skanneren måler rom, åpninger og installasjoner på stedet." },
                  { n: "02", t: "Punktsky og modell", d: "Målingene blir en modell som tegninger og brannkonsept kan leses mot." },
                  { n: "03", t: "Oppdatert tegning", d: "Avvik mellom tegning og bygg blir synlige før tiltak settes i gang." },
                ].map((step) => (
                  <li key={step.n}>
                    <span className="scan-step-n">{step.n}</span>
                    <div>
                      <p className="scan-step-t">{step.t}</p>
                      <p className="scan-step-d">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <SectionCta action="Når er 3D-skanning nyttig?" href="/fag-og-kunnskap/3d-skanning" />
            </div>
            <ol className="grid gap-4 sm:grid-cols-2">
              {[
                { src: stillBygg, label: "Bygget", cap: "Det som står" },
                { src: stillModell, label: "Modell / tegning", cap: "Oppdatert spor" },
              ].map((item) => (
                <li key={item.label}>
                  <Figure src={item.src} alt={photoAlt[item.src] ?? item.label} caption={`${item.label}, ${item.cap}`} className="aspect-[16/10]" />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </EdSection>

      <EdSection id="ribr" tone="sheet">
        <div className="plan-read plan-float max-w-3xl">
          <EdKicker>Brannkonsept</EdKicker>
          <EdTitle>Trenger vi brannkonsept?</EdTitle>
          <EdLead>Konseptet sier hva som skal til. Detaljprosjekteringen sier hvordan det skal bygges. Kontroll sjekker grunnlaget.</EdLead>
        </div>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Brannpremiss", q: "Hva må avklares før planen tegnes ferdig?", href: "/fag-og-kunnskap/nar-ma-ribr-inn" },
            { n: "02", t: "Brannkonsept", q: "Hvordan skal bygget sikres?", href: "/fag-og-kunnskap/brannkonsept-eller-prosjektering" },
            { n: "03", t: "Detaljprosjektering", q: "Hvordan skal det bygges?", href: "/losninger/ribr" },
            { n: "04", t: "Dokumentasjon", q: "Hva skal følge bygget videre?", href: "/fag-og-kunnskap/overtakelse" },
          ].map((step) => (
            <li key={step.n} className="plan-read p-5 sm:p-6">
              <p className="ed-kicker">{step.n}</p>
              <h3 className="mt-3 text-xl font-normal">{step.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[#221d19]">{step.q}</p>
              <Link href={step.href} className="mt-4 inline-block text-sm text-[#c62e32] hover:underline">
                Les mer
              </Link>
            </li>
          ))}
        </ol>
      </EdSection>

      <EdSection id="aktuelt" tone="sheet">
        <div className="grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="plan-read plan-float lg:col-span-12">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <EdKicker>Artikler og nyheter</EdKicker>
                <EdTitle>Det vi skriver, kan leses før noen reiser.</EdTitle>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button asChild variant="outline">
                  <Link href="/artikler">Alle artikler</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/nyheter">Nyheter</Link>
                </Button>
              </div>
            </div>
          </div>

          <article className="plan-float group flex min-w-0 flex-col bg-[#fbf8f2] lg:col-span-7">
            <Link href={`/artikler/${featureArticle.slug}`} className="block">
              <StillFrame
                src={featureStill}
                alt={photoAlt[featureStill] ?? featureArticle.title}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="aspect-[16/9]"
              />
            </Link>
            <div className="flex flex-1 flex-col p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline gap-3">
                <p className="ed-kicker">{featureArticle.kicker}</p>
                <time dateTime={featureArticle.date} className="geo-tag">
                  {shortDate(featureArticle.date)}
                </time>
              </div>
              <h3 className="mt-4 text-2xl font-normal leading-tight sm:text-3xl">
                <Link href={`/artikler/${featureArticle.slug}`} className="hover:text-[#c62e32]">
                  {featureArticle.title}
                </Link>
              </h3>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-[#221d19]">{featureArticle.excerpt}</p>
              <Link href={`/artikler/${featureArticle.slug}`} className="mt-auto inline-block pt-6 text-sm text-[#c62e32] hover:underline">
                Les artikkelen
              </Link>
            </div>
          </article>

          <div className="grid gap-6 lg:col-span-5">
            <ol className="plan-read plan-float aktuelt-list">
              <li className="aktuelt-head">
                <p className="ed-kicker">Flere artikler</p>
              </li>
              {articles.slice(1, 5).map((a) => (
                <li key={a.slug}>
                  <Link href={`/artikler/${a.slug}`} className="aktuelt-row">
                    <span className="aktuelt-meta">
                      {a.kicker} · {shortDate(a.date)}
                    </span>
                    <span className="aktuelt-title">{a.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <article className="plan-float group flex min-w-0 flex-col bg-[#fbf8f2] sm:flex-row lg:flex-col">
              <Link href={`/nyheter/${news[0].slug}`} className="block sm:w-2/5 lg:w-full">
                <StillFrame
                  src={newsStill}
                  alt={photoAlt[newsStill] ?? news[0].title}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-[16/10] h-full"
                />
              </Link>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <p className="ed-kicker">Nyhet · {news[0].kicker}</p>
                  <time dateTime={news[0].date} className="geo-tag">
                    {shortDate(news[0].date)}
                  </time>
                </div>
                <h3 className="mt-3 text-xl font-normal leading-tight">
                  <Link href={`/nyheter/${news[0].slug}`} className="hover:text-[#c62e32]">
                    {news[0].title}
                  </Link>
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#221d19]">{news[0].excerpt}</p>
                {news[1] ? (
                  <Link href={`/nyheter/${news[1].slug}`} className="aktuelt-row mt-5 border-t border-[#161210]/12 pt-4">
                    <span className="aktuelt-meta">Nyhet · {shortDate(news[1].date)}</span>
                    <span className="aktuelt-title">{news[1].title}</span>
                  </Link>
                ) : null}
              </div>
            </article>
          </div>
        </div>
      </EdSection>

      <EdSection id="spor" tone="paper">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="plan-read plan-float max-w-3xl lg:col-span-7">
            <EdKicker>Digitalt eller befaring</EdKicker>
            <EdTitle>Må dere komme på befaring?</EdTitle>
            <EdLead>
              Ofte kan vi lese rapporten og tegningene først, uansett hvor i landet bygget ligger. Vi kommer til bygget når
              papirene ikke kan svare, fra Stryn og Nordfjordeid.
            </EdLead>
          </div>
          <dl className="geo-band plan-float lg:col-span-5">
            <div>
              <dt>Digitalt</dt>
              <dd>{company.coverage.digitalArea}</dd>
              <p>Dokumenter, tegninger, kurs og second opinion. Ingen reise før det trengs.</p>
            </div>
            <div>
              <dt>Fysisk</dt>
              <dd>{company.coverage.physicalArea}</dd>
              <p>{company.coverage.physicalRegions.join(", ")}.</p>
            </div>
          </dl>
        </div>
        <ol className="ed-flow mt-12 border border-[#161210]/12">
          {deliveryTracks.map((track) => (
            <li key={track.id} className="flex min-w-0 flex-col bg-[#fbf8f2]">
              <StillFrame
                src={track.still}
                alt={photoAlt[track.still] ?? track.label}
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="aspect-[16/10]"
              />
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="ed-kicker">{track.label}</p>
                  <p className="geo-tag">{track.area}</p>
                </div>
                <h3 className="mt-3 text-xl font-normal">{track.value}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#221d19]">{track.lead}</p>
                <p className="ed-kicker mt-6">Når</p>
                <ul className="mt-3 space-y-2">
                  {track.when.slice(0, 4).map((w) => (
                    <li key={w} className="text-sm leading-relaxed">
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/kontakt?spor=digitalt">Start digitalt</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/digitalt">Dette kan gjøres digitalt</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/kontakt?spor=fysisk">Bestill befaring</Link>
          </Button>
        </div>
      </EdSection>

      <EdSection id="bevis" tone="mist">
        <div className="plan-read plan-float max-w-3xl">
          <EdKicker>Godkjenning og oppdrag</EdKicker>
          <EdTitle>Hvem har dere jobbet for?</EdTitle>
          <EdLead>Sentral godkjenning hos DiBK er dokumentert. Oppdragene vi kan navngi, vises her. Der resultatet mangler, står det.</EdLead>
        </div>
        <article className="mt-12 border border-[#161210]/12 bg-[#fbf8f2] p-6 sm:p-8">
          <p className="ed-kicker">Godkjenning</p>
          <h3 className="mt-3 text-xl font-normal">DiBK sentral godkjenning</h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#221d19]">
            {company.approvals.map((a) => `${a.function}, ${a.area} ${a.class}`).join(". ")}.
          </p>
          <a href={company.approvalUrl} className="mt-4 inline-block text-sm text-[#c62e32] hover:underline" target="_blank" rel="noreferrer">
            Åpne registeret
          </a>
        </article>
        <div className="ed-across mt-4">
          {projects.map((p) => {
            const src = projectImage[p.slug] ?? stillBygg;
            return (
              <article key={p.slug} className="plan-float flex min-w-0 flex-col bg-[#fbf8f2]">
                <StillFrame src={src} alt={photoAlt[src] ?? p.name} sizes="(max-width: 1024px) 100vw, 33vw" className="aspect-[16/10]" />
                <div className="flex flex-1 flex-col px-5 py-6 sm:px-6 sm:py-8">
                  <PartnerMark src={p.logo} name={p.name} mark={p.mark} />
                  {p.mark === "logo" ? <h3 className="mt-4 text-xl font-normal">{p.name}</h3> : <h3 className="sr-only">{p.name}</h3>}
                  <p className="mt-3 text-[15px] leading-relaxed text-[#221d19]">{p.whatWeCanSay}</p>
                  <Link
                    href={`/prosjekter/${p.slug}`}
                    className="mt-auto inline-block pt-5 text-sm text-[#c62e32] hover:underline"
                  >
                    Les oppdraget
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
        <article className="mt-4 border border-[#161210]/12 bg-[#fbf8f2] p-6 sm:p-8">
          <p className="ed-kicker">Kompetanse</p>
          <h3 className="mt-3 text-xl font-normal">Hva kan vi avklare før noen reiser?</h3>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-[#221d19]">
            Bygg, bruk og dokumentasjon. Om det som er sagt er krav eller forslag. Om saken kan leses herfra, eller om bygget må ses.
          </p>
          <Link href="/om-flo" className="mt-4 inline-block text-sm text-[#c62e32] hover:underline">
            Om FLO
          </Link>
        </article>
      </EdSection>

      <EdSection id="faginnsikt" tone="sheet">
        <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="plan-read plan-float lg:col-span-6">
            <EdKicker>Spørsmål</EdKicker>
            <EdTitle>Er dette et krav?</EdTitle>
            <EdLead>
              {insight?.contract.direct ?? "FLO skiller påstand fra kilde før noe kalles krav."}
            </EdLead>
            <ul className="mt-8 space-y-0 border-t border-[#161210]/12">
              {[
                { href: "/fagmiljo", q: "Fagmiljøet" },
                { href: "/nyheter", q: "Nyheter" },
                { href: "/artikler", q: "Artikler" },
                { href: "/fag-og-kunnskap/pastand-eller-krav", q: "Er dette et krav?" },
              ].map((item) => (
                <li key={item.href} className="border-b border-[#161210]/12">
                  <Link href={item.href} className="block py-3 text-[15px] hover:text-[#c62e32]">
                    {item.q}
                  </Link>
                </li>
              ))}
            </ul>
            {articleBySlug("brannkonsept-eller-prosjektering") ? (
              <p className="mt-8 text-[15px] leading-relaxed">
                Les mer:{" "}
                <Link href="/fag-og-kunnskap/brannkonsept-eller-prosjektering" className="text-[#c62e32] hover:underline">
                  {articleBySlug("brannkonsept-eller-prosjektering")!.title}
                </Link>
              </p>
            ) : null}
            <SectionCta action="Se fagmiljøet" href="/fagmiljo" />
          </div>
          <figure className="plan-float lg:col-span-6">
            <StillFrame
              src="/media/skjerm-peker.jpg"
              alt={photoAlt["/media/skjerm-peker.jpg"] ?? "To peker på dokumentasjon på skjerm"}
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="aspect-[16/11] lg:aspect-[4/3]"
            />
            <figcaption className="plan-note">Fagmiljøet leser tegningene før tiltak settes i gang.</figcaption>
          </figure>
        </div>
      </EdSection>

      <EdSection id="neste" tone="ink" className="join-footer">
        <div className="plan-read plan-read-ink plan-float max-w-3xl">
          <EdKicker>Kontakt</EdKicker>
          <h2 className="mt-4 max-w-2xl text-3xl font-normal text-[#fbf8f2] sm:text-5xl">
            Send det dere har.
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-[#fbf8f2]/90">
            Rapport, avvik, tegning eller det som ble sagt i møtet. Vi svarer innen én til to virkedager.
          </p>
          <SectionCta action="Send rapporten eller tegningene" href="/kontakt?spor=digitalt" tone="dark" />
        </div>
      </EdSection>
    </>
  );
}
