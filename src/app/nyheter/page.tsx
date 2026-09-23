import { EditorialList } from "@/components/editorial-list";
import { PageStill } from "@/components/page-still";
import { photoAlt, stills } from "@/content/site";
import { listDeskPosts } from "@/lib/desk";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Nyheter",
  "Nyheter og faglige oppdateringer fra FLO Brannsikring.",
  "/nyheter",
);

export default async function NyheterPage() {
  const posts = await listDeskPosts({ kind: "nyhet" });
  return (
    <>
      <PageSemantics
        path="/nyheter"
        title="Nyheter"
        description="Nyheter og faglige oppdateringer fra FLO Brannsikring."
        kind="CollectionPage"
      />
      <PageStill
        src={stills.befaring}
        alt={photoAlt[stills.befaring]}
        room="08"
        kicker="Nyheter"
        title="Nytt fra FLO."
        lead="Menneskene, faget og hverdagen bak brannsikringen. Følg oppdateringene fra FLO."
      />
      <section className="portfolio-paper">
        <div className="portfolio-wrap">
          <EditorialList
            posts={posts}
            kind="nyhet"
            empty="Nye oppdateringer kommer her. Har du et spørsmål i mellomtiden, ta gjerne kontakt."
          />
        </div>
      </section>
    </>
  );
}