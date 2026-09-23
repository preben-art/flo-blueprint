import { EditorialList } from "@/components/editorial-list";
import { PageStill } from "@/components/page-still";
import { photoAlt, stills } from "@/content/site";
import { listDeskPosts } from "@/lib/desk";
import { PageSemantics } from "@/components/page-semantics";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Artikler",
  "Fagartikler om brannkonsept, bruksendring, tilsyn og det som kan avklares digitalt.",
  "/artikler",
);

export default async function ArtiklerPage() {
  const posts = await listDeskPosts({ kind: "artikkel" });
  return (
    <>
      <PageSemantics
        path="/artikler"
        title="Artikler"
        description="Fagartikler om brannkonsept, bruksendring, tilsyn og det som kan avklares digitalt."
        kind="CollectionPage"
      />
      <PageStill
        src={stills.utgang}
        alt={photoAlt[stills.utgang]}
        room="09"
        kicker="Artikler"
        title="Fagtekster som kan leses."
        lead="Artikler fra FLO og innlegg kunder har lagt inn. Det som er tatt ned, vises ikke her."
      />
      <section className="ed">
        <div className="ed-wrap">
          <EditorialList
            posts={posts}
            kind="artikkel"
            empty="Ingen artikler ligger ute nå. Redaksjonen kan legge inn innhold når det skal stå noe."
          />
        </div>
      </section>
    </>
  );
}