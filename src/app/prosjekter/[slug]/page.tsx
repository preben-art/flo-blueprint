import Link from "next/link";
import { notFound } from "next/navigation";
import { PageStill } from "@/components/page-still";
import { PageSemantics } from "@/components/page-semantics";
import { photoAlt, projectBySlug, projects, projectStill, stills } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() { return projects.map((p) => ({ slug: p.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return pageMeta(p.name, p.summary, `/prosjekter/${p.slug}`, { image: projectStill[p.slug] ?? stills.bygg });
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const src = projectStill[project.slug] ?? stills.bygg;
  return <>
    <PageSemantics path={`/prosjekter/${project.slug}`} title={project.name} description={project.summary} image={src} />
    <PageStill src={src} alt={photoAlt[src] ?? project.name} room={project.room} kicker={project.status} title={project.name} lead={project.summary} />
    <section className="portfolio-paper">
      <div className="portfolio-wrap">
        <Link href="/prosjekter" className="story-back">← Alle oppdrag</Link>
        <div className="project-detail">
          <div>
            <p className="story-eyebrow">Fagområder i referansen</p>
            <h2 className="story-heading">Brannfaglig kompetanse.<br /><span>For bygg i bruk.</span></h2>
            <ul className="project-services">{project.services.map(s => <li key={s}>{s}<span aria-hidden="true">↗</span></li>)}</ul>
            <div className="reference-note"><h3>Om referansen</h3><p>{project.whatWeCanSay}</p></div>
          </div>
          <aside className="story-contact">
            <p className="story-eyebrow">Ditt bygg · Neste steg</p>
            <h2>Hva trenger<br />dere å avklare?</h2>
            <p>Send oss avviket, tegningene eller en kort beskrivelse. Vi hjelper dere å finne ut hva som bør gjøres videre.</p>
            <Link href="/kontakt" className="story-link">Få vurdert saken <span aria-hidden="true">↗</span></Link>
          </aside>
        </div>
        <nav className="project-more" aria-label="Flere referanser"><p className="story-eyebrow">Flere referanser</p>{projects.filter(p => p.slug !== project.slug).map(p => <Link key={p.slug} href={`/prosjekter/${p.slug}`}>{p.name}<span aria-hidden="true">↗</span></Link>)}</nav>
      </div>
    </section>
  </>;
}
