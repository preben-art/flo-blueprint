import { HomeBoard } from "@/components/home-board";
import { HomeHero } from "@/components/home-hero";
import { PageSemantics } from "@/components/page-semantics";
import { defaultDescription, pageMeta } from "@/lib/seo";

const title = "Brannsikring ved avvik, ombygging og brannkrav | Flo Brannsikring";

export const metadata = pageMeta(title, defaultDescription, "/");

export default function HomePage() {
  return (
    <>
      <PageSemantics
        path="/"
        title={title}
        description={defaultDescription}
        topic="Brannsikring ved avvik, ombygging og uklare krav"
        audience="Eiere, brukere, byggherrer og privatbolig"
        area="Digitalt i hele Norge. Befaring fra Stryn og Nordfjordeid."
      />
      <HomeHero />
      <HomeBoard />
    </>
  );
}
