import Link from "next/link";
import { notFound } from "next/navigation";
import { BlueprintLayout, BlueprintRoom, TechnicalNote } from "@/components/blueprint";
import { CtaZone } from "@/components/cta-zone";
import { PageStill } from "@/components/page-still";
import { PartnerMark } from "@/components/partner-mark";
import { photoAlt, projectBySlug, projects, projectStill, stills } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projectBySlug(slug);
  if (!p) return {};
  return pageMeta(p.name, p.summary, `/prosjekter/${p.slug}`);
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();
  const src = projectStill[project.slug] ?? stills.bygg;

  return (
    <>
      <PageStill
        src={src}
        alt={photoAlt[src] ?? project.name}
        room={project.room}
        kicker="Oppdrag"
        title={project.name}
        lead={project.summary}
        caption="Foto fra FLO sitt materiale. Ikke et dokumentert brannresultat."
      />
      <BlueprintLayout flow>
        <BlueprintRoom number={project.room} kicker="Hva vi kan si" title={project.status}>
          <div className="mb-8">
            <PartnerMark src={project.logo} name={project.name} mark={project.mark} />
          </div>
          <TechnicalNote>{project.whatWeCanSay}</TechnicalNote>
          <div className="mt-8">
            <p className="room-number mb-3 text-[#c62e32]">Hva oppdraget gjaldt</p>
            <ul className="flex flex-wrap gap-2">
              {project.services.map((s) => (
                <li key={s} className="border border-[#161210] px-3 py-1 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 text-sm">
            <Link href="/prosjekter" className="hover:text-[#c62e32]">
              Alle oppdrag
            </Link>
          </p>
        </BlueprintRoom>
      </BlueprintLayout>
      <CtaZone title="Har du et dokumentert oppdrag vi kan beskrive?" />
    </>
  );
}
