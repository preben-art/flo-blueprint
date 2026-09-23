import Link from "next/link";
import { RailStep } from "@/components/ed";
import { PageSemantics } from "@/components/page-semantics";
import { PageStill } from "@/components/page-still";
import { PlanSplit } from "@/components/plan-field";
import { PlanPlate } from "@/components/plan-plate";
import { SectionCta } from "@/components/section-cta";
import { type KnowledgeNode } from "@/content/knowledge/nodes";
import { sourcesByIds } from "@/content/knowledge/sources";
import { photoAlt, stills } from "@/content/site";
import { knowledgeContractFaq } from "@/lib/knowledge";

const evidenceLabel = {
  SOURCE_CONFIRMED: "Kildebekreftet",
  INFERRED: "Faglig sluttet, ikke oppdiktet som FLO-bevis",
  EVIDENCE_REQUIRED: "Bevis mangler, sies ikke som faktum",
} as const;

/* A second, different photo for the split block so a page never repeats its hero still. */
const pairing: Record<string, string> = {
  [stills.bygg]: stills.internkontroll,
  [stills.skanner]: stills.romningOvenfra,
  [stills.digitalt]: stills.befaring,
  [stills.digitaltTo]: stills.anleggNar,
  [stills.romning]: stills.drawings,
  [stills.detektor]: stills.slokkerHaand,
  [stills.internkontroll]: stills.tavle,
  [stills.offentlig]: stills.slokker,
  [stills.befaring]: stills.skjermPeker,
};

function secondStill(still: string) {
  return pairing[still] ?? stills.bygg;
}

export function KnowledgeAnswer({ node }: { node: KnowledgeNode }) {
  const cited = sourcesByIds(node.sourceIds);
  const c = node.contract;
  const splitStill = secondStill(node.still);
  const thirdStill = secondStill(splitStill) === node.still ? stills.utgang : secondStill(splitStill);

  return (
    <>
      <PageSemantics
        path={`/fag-og-kunnskap/${node.slug}`}
        title={node.question}
        description={c.direct}
        topic={node.kicker}
        audience={c.appliesTo}
        area="Digitalt i hele Norge. Befaring fra Stryn og Nordfjordeid når bygget må ses."
        faqs={knowledgeContractFaq(node)}
      />
      <PageStill
        src={node.still}
        alt={photoAlt[node.still] ?? node.question}
        room={node.room}
        kicker={node.kicker}
        title={node.question}
        lead={c.direct}
        caption={evidenceLabel[node.evidence]}
      />

      <PlanSplit still={splitStill} stillAlt={photoAlt[splitStill] ?? node.question}>
        <p className="ed-kicker">Hvem gjelder det for?</p>
        <h2 className="mt-4 text-2xl font-normal sm:text-3xl">{c.appliesTo}</h2>
        <p className="ed-kicker mt-12">Hva avhenger det av?</p>
        <ul className="mt-4 space-y-0">
          {c.dependsOn.map((item) => (
            <li key={item} className="border-b border-flo-ink/12 py-3 text-[15px] leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </PlanSplit>

      <section className="ed-navy">
        <div className="ed-wrap grid gap-8 lg:grid-cols-12">
          <div className="plan-read plan-read-ink plan-float lg:col-span-6">
            <p className="ed-kicker">Faktisk krav</p>
            <p className="mt-4 text-[16px] leading-relaxed text-[#fbf8f2]">{c.requirement}</p>
          </div>
          <div className="plan-read plan-read-ink plan-float lg:col-span-6">
            <p className="ed-kicker">Faglig vurdering</p>
            <p className="mt-4 text-[16px] leading-relaxed text-[#fbf8f2]">{c.assessment}</p>
          </div>
        </div>
      </section>

      <section className="ed-paper">
        <div className="ed-wrap grid gap-8 lg:grid-cols-12">
          <div className="plan-read plan-float lg:col-span-6">
            <p className="ed-kicker">Alternativer</p>
            <ol className="ed-rail mt-6">
              {c.alternatives.map((item, i) => (
                <RailStep key={item} index={i}>
                  <p className="text-[15px] leading-relaxed text-flo-muted">{item}</p>
                </RailStep>
              ))}
            </ol>
          </div>
          <div className="plan-read plan-float lg:col-span-6">
            <p className="ed-kicker">Hva kan vi ikke avgjøre her?</p>
            <p className="mt-4 text-[15px] leading-relaxed text-flo-muted">{c.limitation}</p>
            <PlanPlate
              className="mt-8"
              src={thirdStill}
              alt={photoAlt[thirdStill] ?? node.question}
              caption="Foto fra FLO sitt materiale."
              sizes="(max-width: 1024px) 100vw, 50vw"
              ratio="wide"
            />
          </div>
        </div>
      </section>

      <section className="ed">
        <div className="ed-wrap">
          <div className="plan-read plan-float">
            <p className="ed-kicker">Hva må vi se?</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {c.documents.map((item) => (
                <li key={item} className="border-b border-flo-ink/12 pb-3 text-[15px] text-flo-muted">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-flo-muted">
              Spor: {c.next.mode === "digitalt" ? "digitalt først" : c.next.mode === "hybrid" ? "hybrid" : "fysisk når det trengs"}.
            </p>
          </div>
        </div>
      </section>

      <section className="ed-ink join-footer">
        <div className="ed-wrap">
          <div className="plan-read plan-read-ink plan-float max-w-3xl">
            <p className="ed-kicker">Hva gjør vi nå?</p>
            <h2 className="mt-4 max-w-3xl text-3xl font-normal text-[#fbf8f2] sm:text-5xl">{c.next.action}</h2>
            <SectionCta action={c.next.action} href={c.next.href} tone="dark" />
            {node.related.length ? (
              <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {node.related.map((rel) => (
                  <li key={rel.href}>
                    <Link href={rel.href} className="text-[#fbf8f2] underline decoration-flo-red/60 hover:text-flo-red">
                      {rel.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-12">
            <div className="plan-read plan-read-ink plan-float lg:col-span-7">
              <p className="ed-kicker mb-4">Kilder</p>
              <ul className="space-y-4">
                {cited.map((s) => (
                  <li key={s.id}>
                    <p className="ed-kicker">Nivå {s.level} · {s.label}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-[#fbf8f2]/90">{s.note}</p>
                    <a
                      href={s.href}
                      className="mt-1 inline-block text-sm text-flo-red hover:underline"
                      {...(s.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      Åpne kilde
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="plan-read plan-read-ink plan-float lg:col-span-5">
              <p className="ed-kicker mb-4">På én setning</p>
              <p className="text-[15px] leading-relaxed text-[#fbf8f2]/90">{node.distribution.gmb}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-[#fbf8f2]/90">{node.distribution.linkedin}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
