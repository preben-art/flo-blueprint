import Link from "next/link";
import { StillFrame } from "@/components/still-frame";
import { PageStill } from "@/components/page-still";
import { photoAlt, projects, projectStill, stills } from "@/content/site";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";
const description = "Bli kjent med navngitte kunder og relasjoner fra FLOs referansemateriale innen handel, hotell og eiendom.";
export const metadata = pageMeta("Kunder og referanser", description, "/prosjekter", { image: stills.utgang });
export default function ProsjekterPage() {
  return <>
    <PageSemantics path="/prosjekter" title="Kunder og referanser" description={description} image={stills.utgang} kind="CollectionPage" />
    <PageStill src={stills.utgang} alt={photoAlt[stills.utgang]} room="06" kicker="Oppdrag og referanser" title="Byggene er ulike. Ansvaret er viktig." lead="Fra handel og eiendom til hotell og overnatting. Her møter du noen av kundene og relasjonene i FLOs referansemateriale." />
    <section className="portfolio-paper"><div className="portfolio-wrap">
      <div className="story-section-heading"><div><p className="story-eyebrow">Kunder og relasjoner</p><h2 className="story-heading">Et innblikk i <span>FLO.</span></h2></div><p>Les om referansene og hvilke fagområder de er knyttet til.</p></div>
      <ul className="portfolio-grid">{projects.map(p => {
        const src = projectStill[p.slug] ?? stills.bygg;
        return <li key={p.slug}><Link className="portfolio-card" href={`/prosjekter/${p.slug}`}>
          <StillFrame src={src} alt={photoAlt[src] ?? p.name} sizes="(max-width: 760px) 100vw, 50vw" className="portfolio-image aspect-[16/10]" />
          <div className="portfolio-card-copy"><p className="story-eyebrow">{p.status}</p><h2>{p.name}</h2><p>{p.summary}</p><span className="story-link">Se referansen <span aria-hidden="true">↗</span></span></div>
        </Link></li>;
      })}</ul>
    </div></section>
  </>;
}
