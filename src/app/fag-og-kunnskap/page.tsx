import Link from "next/link";
import { ClaimSignature } from "@/components/claim-signature";
import { RailStep } from "@/components/ed";
import { FaqBlock } from "@/components/faq-block";
import { JsonLd } from "@/components/json-ld";
import { KravCluster } from "@/components/krav-cluster";
import { PageStill } from "@/components/page-still";
import { PlanSplit } from "@/components/plan-field";
import { SectionCta } from "@/components/section-cta";
import { algorithm, decisionGraphs, domains } from "@/content/knowledge/ontology";
import { knowledgeNodes } from "@/content/knowledge/nodes";
import { articles, faqs, photoAlt, stills } from "@/content/site";
import { sourceAuthority, sources } from "@/content/knowledge/sources";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Spørsmål om brannsikkerhet",
  "Hvem har ansvaret? Er dette påbudt? Må vi oppdatere brannkonseptet? Svar med kilde, ikke bare praksis.",
  "/fag-og-kunnskap",
);

const commercialNodes = knowledgeNodes.filter((n) => n.domain !== "privat");
const privateNodes = knowledgeNodes.filter((n) => n.domain === "privat");

export default function KnowledgePage() {
  return (
    <>
      <PageStill
        src={stills.slokke}
        alt={photoAlt[stills.slokke]}
        room="06"
        kicker="Spørsmål"
        title="Hvem har ansvaret, og er dette et krav?"
        lead="Eier eller leietaker, avvik, ombygging og internkontroll. Vi skiller det som står i forskriften fra det som bare blir sagt."
      />

      <section className="ed-navy">
        <div className="ed-wrap">
          <div className="plan-read plan-read-ink plan-float">
            <p className="ed-kicker">Hva må vi vite?</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-normal text-[#fbf8f2] sm:text-4xl">
              Hva slags bygg er det, og hvordan brukes det?
            </h2>
            <ol className="mt-10 grid gap-0 sm:grid-cols-2 lg:grid-cols-3">
              {algorithm.map((step, i) => (
                <li key={step.id} className="border-t border-[#fbf8f2]/14 py-5 pr-6">
                  <p className="ed-kicker">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-[15px] text-[#fbf8f2]">{step.ask}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="ed">
        <div className="ed-wrap">
          <div className="plan-read plan-float">
            <p className="ed-kicker">Ofte stilt</p>
            <h2 className="mt-4 text-3xl font-normal sm:text-4xl">Hvem har ansvaret, og er dette et krav?</h2>
            <ul className="mt-10 divide-y divide-[#161210]/12 border-y border-[#161210]/12">
              {commercialNodes.map((n) => (
                <li key={n.slug}>
                  <Link href={`/fag-og-kunnskap/${n.slug}`} className="block py-6 hover:text-[#c62e32]">
                    <p className="ed-kicker">{n.kicker}</p>
                    <h3 className="mt-2 text-xl font-normal">{n.question}</h3>
                    <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[#221d19]">{n.contract.direct}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ed-paper">
        <div className="ed-wrap grid gap-10 lg:grid-cols-3">
          {decisionGraphs
            .filter((g) => g.id !== "utleiedel")
            .map((graph) => (
              <article key={graph.id} className="plan-read plan-float">
                <p className="ed-kicker">Vanlig sak</p>
                <h2 className="mt-3 text-2xl font-normal">
                  <Link href={graph.href} className="hover:text-[#c62e32]">
                    {graph.label}
                  </Link>
                </h2>
                <ol className="ed-rail mt-6">
                  {graph.steps.map((step, j) => (
                    <RailStep key={step} index={j}>
                      <p className="text-[15px] leading-relaxed text-[#221d19]">{step}</p>
                    </RailStep>
                  ))}
                </ol>
              </article>
            ))}
        </div>
      </section>

      <ClaimSignature />
      <KravCluster />

      <section className="ed">
        <div className="ed-wrap">
          <div className="plan-read plan-float">
            <p className="ed-kicker">Artikler</p>
            <ul className="mt-8 grid gap-8 lg:grid-cols-2">
              {articles.map((a) => (
                <li key={a.slug} className="border-t border-[#161210]/12 pt-5">
                  <p className="ed-kicker">{a.kicker}</p>
                  <h2 className="mt-2 text-2xl font-normal">
                    <Link href={`/fag-og-kunnskap/${a.slug}`} className="hover:text-[#c62e32]">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-[#221d19]">{a.excerpt}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {privateNodes.map((n) => (
        <section key={n.slug} className="ed-mist">
          <div className="ed-wrap">
            <div className="plan-read plan-float max-w-2xl">
              <p className="ed-kicker">Bolig</p>
              <h2 className="mt-4 max-w-xl text-3xl font-normal sm:text-4xl">{n.question}</h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#221d19]">{n.contract.direct}</p>
              <p className="mt-4 max-w-xl text-sm text-[#221d19]">Send inn tegninger eller bilder</p>
              <p className="mt-6">
                <Link href={`/fag-og-kunnskap/${n.slug}`} className="text-sm text-[#c62e32] hover:underline">
                  Få vurdert boligen
                </Link>
              </p>
            </div>
          </div>
        </section>
      ))}

      <section className="ed-paper">
        <div className="ed-wrap">
          <div className="plan-read plan-float">
            <p className="ed-kicker">Kilder</p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#221d19]">
              Hva som gjelder, avhenger av bygg, bruk og når bygget ble oppført. Vi siterer kilden. Vi dikter ikke opp FLO-bevis.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {sources.map((r) => (
                <li key={r.id} className="border-b border-[#161210]/12 pb-3">
                  <p className="ed-kicker">Nivå {r.level}</p>
                  <p className="mt-1 font-normal">{r.label}</p>
                  <p className="mt-1 text-sm text-[#221d19]">{r.note}</p>
                </li>
              ))}
            </ul>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#221d19]">
              {sourceAuthority.map((a) => (
                <li key={a.level}>
                  {a.level} {a.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <PlanSplit still={stills.internkontroll} stillAlt={photoAlt[stills.internkontroll]} caption="Spørsmålet treffer bygg, bruk og det som faktisk er kontrollert.">
        <p className="ed-kicker">Emner</p>
        <h2 className="mt-4 max-w-md text-3xl font-normal sm:text-4xl">
          Hvor i bygget treffer spørsmålet?
        </h2>
        <ul className="mt-8">
          {domains.map((d) => (
            <li key={d.id}>
              <Link href={d.href} className="block border-b border-[#161210]/12 py-3 hover:text-[#c62e32]">
                {d.label}
              </Link>
            </li>
          ))}
        </ul>
      </PlanSplit>

      <section className="ed-paper">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }}
        />
        <div className="ed-wrap">
          <div className="plan-read plan-float max-w-3xl">
            <p className="ed-kicker">Ofte stilte spørsmål</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-normal sm:text-4xl">
              Hvem har ansvaret, og hva sier regelverket?
            </h2>
            <div className="mt-10">
              <FaqBlock />
            </div>
            <SectionCta action="Få vurdert hva som faktisk gjelder" href="/kontakt?situasjon=uklart&tema=krav" />
          </div>
        </div>
      </section>
    </>
  );
}
