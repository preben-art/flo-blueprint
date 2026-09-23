import { cookies } from "next/headers";
import { DeskBoard } from "@/components/desk-board";
import { PageStill } from "@/components/page-still";
import { photoAlt, stills } from "@/content/site";
import { decodeSession, sessionCookieName } from "@/lib/desk";
import { pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = pageMeta(
  "Redaksjon",
  "Mini-redaksjon for nyheter og artikler. Kunder kan legge inn innhold og ta det ned. FLO styrer arbeidsverktøyet.",
  "/redaksjon",
);

const errors: Record<string, string> = {
  nokkel: "Ugyldig nøkkel.",
  skjema: "Kontroller feltene. Tittel: maks 250 tegn. Stikkord: 150. Ingress: 1500. Tekst: 50 000. Tittel og tekst må fylles inn.",
  bilde: "Bildet må være JPG, PNG eller WebP under 4 MB.",
  tilgang: "Du kan bare ta ned eget innhold.",
};

export default async function RedaksjonPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;
  const feil = Array.isArray(q.feil) ? q.feil[0] : q.feil;
  const jar = await cookies();
  const session = decodeSession(jar.get(sessionCookieName())?.value);

  return (
    <>
      <PageStill
        src={stills.skjerm}
        alt={photoAlt[stills.skjerm]}
        room="10"
        kicker="Redaksjon"
        title="Legg inn innhold, eller ta det ned."
        lead="Kunder laster opp nyheter og artikler. FLO styrer arbeidsverktøyet Påstand eller krav, og kan ta ned det som ikke skal stå."
      />
      <section className="ed">
        <div className="ed-wrap">
          <DeskBoard initialSession={session} loginError={feil ? errors[feil] ?? "Noe gikk galt." : undefined} />
        </div>
      </section>
    </>
  );
}
