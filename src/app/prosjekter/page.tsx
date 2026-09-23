import Link from "next/link";
import { CtaZone } from "@/components/cta-zone";
import { StillFrame } from "@/components/still-frame";
import { PageStill } from "@/components/page-still";
import { PartnerMark } from "@/components/partner-mark";
import { PlanSplit } from "@/components/plan-field";
import { photoAlt, projects, stills } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";

const projectImage: Record<string, string> = {
  coop: "/media/coop-extra.jpg",
  "classic-norway": "/media/classic-norway.jpg",
  weenaas: "/partners/weenaas.jpg",
};

export const metadata = pageMeta(
  "Hvem har dere jobbet for?",
  "Coop, Classic Norway Hotels og Wenaas er navngitt. Der brannresultatet mangler, står det.",
  "/prosjekter",
);

export default function ProsjekterPage() {
  return (
    <>
      <PageSemantics
        path="/prosjekter"
        title="Hvem har dere jobbet for?"
        description="Coop, Classic Norway Hotels og Wenaas er navngitt. Der brannresultatet mangler, står det."
        kind="CollectionPage"
        topic="Navngitte oppdrag"
      />
      <PageStill
        src={stills.utgang}
        alt={photoAlt[stills.utgang]}
        room="06"
        kicker="Oppdrag"
        title="Hvem har dere jobbet for?"
        lead="Coop, Classic Norway Hotels og Wenaas er navngitt. Brannspesifikk effekt som mangler, står her, ikke som et oppdiktet resultat."
      />
      <PlanSplit still={stills.bygg} stillAlt={photoAlt[stills.bygg]} caption="Oppdragene leses mot bygget, ikke som et oppdiktet før/etter.">
        <p className="ed-kicker">Navngitt</p>
        <h2 className="mt-4 max-w-md text-3xl font-normal sm:text-4xl">
          Oppdragene vi kan navngi.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#221d19]">
          Der resultatet mangler, står det. Tegningen viser premissene vi leser mot, ikke et oppdiktet før/etter.
        </p>
        <div className="mt-10 space-y-8">
          {projects.map((p) => {
            const src = projectImage[p.slug] ?? stills.bygg;
            return (
              <article key={p.slug} className="border-t border-[#161210]/12 pt-8">
                <StillFrame src={src} alt={photoAlt[src] ?? p.name} sizes="(max-width: 1024px) 100vw, 50vw" className="aspect-[16/10]" />
                <div className="pt-6">
                  <PartnerMark src={p.logo} name={p.name} mark={p.mark} />
                  {p.mark === "logo" ? (
                    <h3 className="mt-4 text-[1.45rem] font-normal leading-snug tracking-tight">
                      <Link href={`/prosjekter/${p.slug}`} className="hover:text-[#c62e32]">
                        {p.name}
                      </Link>
                    </h3>
                  ) : (
                    <h3 className="sr-only">{p.name}</h3>
                  )}
                  <p className="mt-3 text-[15px] leading-relaxed text-[#221d19]">{p.status}</p>
                  <p className="mt-3 text-[15px] leading-relaxed">{p.whatWeCanSay}</p>
                  <Link href={`/prosjekter/${p.slug}`} className="mt-4 inline-block text-sm text-[#c62e32] hover:underline">
                    Les oppdraget
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </PlanSplit>
      <CtaZone />
    </>
  );
}
