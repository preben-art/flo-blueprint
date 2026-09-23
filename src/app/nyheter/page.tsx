import { EditorialList } from "@/components/editorial-list";
import { PageStill } from "@/components/page-still";
import { photoAlt, stills } from "@/content/site";
import { listDeskPosts } from "@/lib/desk";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Nyheter",
  "Faglige oppdateringer fra FLO. Kunder kan legge inn innhold og ta det ned igjen i redaksjonen.",
  "/nyheter",
);

export default async function NyheterPage() {
  const posts = await listDeskPosts({ kind: "nyhet" });
  return (
    <>
      <PageStill
        src={stills.befaring}
        alt={photoAlt[stills.befaring]}
        room="08"
        kicker="Nyheter"
        title="Det som gjelder nå."
        lead="Nyheter fra fagmiljøet. Innhold kan legges inn og tas ned i redaksjonen, uten at det blir et oppdiktet nyhetsrom."
      />
      <section className="ed">
        <div className="ed-wrap">
          <EditorialList
            posts={posts}
            kind="nyhet"
            empty="Ingen nyheter ligger ute nå. Redaksjonen kan legge inn innhold når det finnes noe å si."
          />
        </div>
      </section>
    </>
  );
}