import Link from "next/link";
import { CtaZone } from "@/components/cta-zone";
import { ClarifyPath } from "@/components/clarify-path";
import { PhotoStation } from "@/components/photo-station";
import { deliveryTracks } from "@/content/explain";
import { hovedplan } from "@/content/hovedplan";
import {
  articleStill,
  articles,
  commercialCustomers,
  customerStill,
  photoAlt,
  planStill,
  stills,
} from "@/content/site";

const caseStill = {
  tilsyn: planStill.tilsyn,
  prosjekt: planStill.prosjekt,
  drift: planStill.drift,
} as const;

const trackStill = {
  digitalt: planStill.digitalt,
  hybrid: planStill.hybrid,
  fysisk: planStill.fysisk,
} as const;

const solveStill = {
  fag: stills.digitalt,
  leveranse: stills.anlegg,
  oppfolging: stills.internkontrollRom,
} as const;

export function PlanArk() {
  return (
    <>
    <section id="hovedplan" className="plan-ark">
      <PhotoStation
        src={planStill.rule}
        alt={photoAlt[planStill.rule]}
        href="/kontakt"
        minClass="min-h-[72vh] lg:min-h-[88vh]"
      >
        <p className="room-number text-flo-red">{hovedplan.rule.stamp}</p>
        <p className="mt-5 text-sm font-normal tracking-[0.08em] uppercase text-[#fbf8f2]">
          {hovedplan.rule.when}
        </p>
        <p className="mt-4 max-w-xl text-3xl font-medium leading-[1.14] text-[#fbf8f2] sm:text-5xl">
          {hovedplan.rule.action}
        </p>
        <p className="mt-4 max-w-md text-[15px] font-normal leading-relaxed text-[#fbf8f2]">
          {hovedplan.rule.before}
        </p>
        <span className="mt-8 inline-flex text-sm font-normal tracking-[0.06em] text-flo-red">
          Send det dere har
        </span>
      </PhotoStation>

      <p className="room-number bg-[#120e0d] px-4 py-4 text-flo-red sm:px-6">{hovedplan.caseAsk}</p>
      <div className="grid lg:grid-cols-3">
        {hovedplan.cases.map((cell, i) => (
          <PhotoStation
            key={cell.id}
            src={caseStill[cell.id as keyof typeof caseStill]}
            alt={photoAlt[caseStill[cell.id as keyof typeof caseStill]] ?? cell.label}
            href={cell.href}
            minClass="min-h-[68vh] lg:min-h-[82vh]"
            sizes="(max-width: 1024px) 100vw, 33vw"
            cut={i < hovedplan.cases.length - 1}
          >
            <p className="room-number text-flo-red">{cell.label}</p>
            <ul className="mt-5 space-y-2">
              {cell.notes.map((n) => (
                <li key={n} className="border-b border-[#fbf8f2]/18 pb-2 text-sm font-normal text-[#fbf8f2]">
                  {n}
                </li>
              ))}
            </ul>
          </PhotoStation>
        ))}
      </div>

      <div className="grid lg:grid-cols-2">
        <PhotoStation
          src={planStill.avklaring}
          alt={photoAlt[planStill.avklaring]}
          minClass="min-h-[78vh] lg:min-h-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
          cut
        >
          <p className="room-number text-flo-red">Før dere handler</p>
          <h2 className="mt-4 max-w-md text-3xl font-medium leading-[1.14] text-[#fbf8f2] sm:text-4xl">
            Hva slags bygg, og hvordan brukes det?
          </h2>
          <p className="mt-4 max-w-md text-[15px] font-normal leading-relaxed text-[#fbf8f2]">
            Vi leser papirene mot det som står i bygget. Anbefalingen kommer etter det, ikke før.
          </p>
        </PhotoStation>
        <div className="glow-chamber flex items-center px-5 py-12 sm:px-10 sm:py-16">
          <ClarifyPath tone="glow" />
        </div>
      </div>

      <p className="room-number bg-[#120e0d] px-4 py-4 text-flo-red sm:px-6">{hovedplan.solveAsk}</p>
      <div className="grid lg:grid-cols-3">
        {deliveryTracks.map((track, i) => (
          <PhotoStation
            key={track.id}
            src={trackStill[track.id as keyof typeof trackStill]}
            alt={photoAlt[trackStill[track.id as keyof typeof trackStill]] ?? track.label}
            href={track.href}
            minClass="min-h-[64vh] lg:min-h-[78vh]"
            sizes="(max-width: 1024px) 100vw, 33vw"
            cut={i < deliveryTracks.length - 1}
          >
            <p className="room-number text-flo-red">{track.label}</p>
            <h3 className="mt-4 text-2xl font-medium tracking-tight text-[#fbf8f2]">{track.value}</h3>
            <p className="mt-3 max-w-sm text-sm font-normal leading-relaxed text-[#fbf8f2]">{track.lead}</p>
            <span className="mt-6 inline-flex text-sm font-normal tracking-[0.06em] text-flo-red">
              {track.cta}
            </span>
          </PhotoStation>
        ))}
      </div>

      <div className="grid lg:grid-cols-3">
        {hovedplan.solve.map((step, i) => (
          <PhotoStation
            key={step.id}
            src={solveStill[step.id as keyof typeof solveStill]}
            alt={photoAlt[solveStill[step.id as keyof typeof solveStill]] ?? step.label}
            href={step.href}
            minClass="min-h-[52vh] lg:min-h-[64vh]"
            sizes="(max-width: 1024px) 100vw, 33vw"
            cut={i < hovedplan.solve.length - 1}
          >
            <p className="room-number text-flo-red">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-2xl font-medium tracking-tight text-[#fbf8f2]">{step.label}</h3>
            <span className="mt-6 inline-flex text-sm font-normal tracking-[0.06em] text-flo-red">Åpne</span>
          </PhotoStation>
        ))}
      </div>

      <p className="room-number bg-[#120e0d] px-4 py-4 text-flo-red sm:px-6">{hovedplan.whoAsk}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {commercialCustomers.map((c, i) => (
          <PhotoStation
            key={c.slug}
            src={customerStill[c.slug]}
            alt={photoAlt[customerStill[c.slug]] ?? c.label}
            href={`/hvem-er-du/${c.slug}`}
            minClass="min-h-[62vh] lg:min-h-[74vh]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            cut={i % 3 !== 2}
          >
            <p className="room-number text-flo-red">{c.room}</p>
            <p className="mt-3 text-xl font-medium text-[#fbf8f2] group-hover:text-white">{c.label}</p>
            <p className="mt-3 text-sm font-normal text-[#fbf8f2]">
              {c.confirmed ? "Navngitt oppdrag" : "Ingen navngitt sak ennå"}
            </p>
          </PhotoStation>
        ))}
      </div>

      <div className="grid lg:grid-cols-2">
        <PhotoStation
          src={planStill.claim}
          alt={photoAlt[planStill.claim]}
          href="/fag-og-kunnskap/pastand-eller-krav"
          minClass="min-h-[72vh] lg:min-h-full"
          sizes="(max-width: 1024px) 100vw, 50vw"
          cut
        >
          <p className="room-number text-flo-red">{hovedplan.claimAsk}</p>
          <h2 className="mt-4 max-w-md text-3xl font-medium leading-[1.14] text-[#fbf8f2] sm:text-4xl">
            Er det påbudt, eller bare sagt?
          </h2>
          <p className="mt-4 max-w-md text-[15px] font-normal leading-relaxed text-[#fbf8f2]">
            FLO leser påstand mot kilde før noe kalles krav. Det er ikke et vedtak.
          </p>
          <span className="mt-8 inline-flex text-sm font-normal tracking-[0.06em] text-flo-red">
            Åpne påstand eller krav
          </span>
        </PhotoStation>
        <ol className="glow-chamber flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-16">
          {hovedplan.claimFlow.map((step, i) => (
            <li key={step} className="flex gap-4 border-b border-[#fbf8f2]/14 py-3 last:border-0">
              <span className="room-number shrink-0 text-flo-red">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15px] font-normal text-[#fbf8f2]">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      <PhotoStation
        src={planStill.goals}
        alt={photoAlt[planStill.goals]}
        minClass="min-h-[78vh] lg:min-h-[92vh]"
      >
        <p className="room-number text-flo-red">{hovedplan.goalAsk}</p>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {hovedplan.goals.map((g) => (
            <li key={g.label}>
              <Link
                href={g.href}
                className="block border-b border-[#fbf8f2]/18 py-2.5 text-[15px] font-normal text-[#fbf8f2] hover:text-flo-red"
              >
                «{g.label}»
              </Link>
            </li>
          ))}
        </ul>
      </PhotoStation>

      <p className="room-number bg-[#120e0d] px-4 py-4 text-flo-red sm:px-6">Spørsmål vi får</p>
      <div className="grid lg:grid-cols-3">
        {articles.slice(0, 3).map((a, i) => (
          <PhotoStation
            key={a.slug}
            src={articleStill[a.slug] ?? stills.digitalt}
            alt={photoAlt[articleStill[a.slug] ?? stills.digitalt] ?? a.title}
            href={`/fag-og-kunnskap/${a.slug}`}
            minClass="min-h-[58vh] lg:min-h-[70vh]"
            sizes="(max-width: 1024px) 100vw, 33vw"
            cut={i < 2}
          >
            <p className="room-number text-flo-red">{a.kicker}</p>
            <h3 className="mt-4 text-xl font-medium tracking-tight text-[#fbf8f2]">{a.title}</h3>
            <p className="mt-3 text-sm font-normal leading-relaxed text-[#fbf8f2]">{a.excerpt}</p>
            <span className="mt-6 inline-flex text-sm font-normal tracking-[0.06em] text-flo-red">Les</span>
          </PhotoStation>
        ))}
      </div>

    </section>
    <CtaZone
      title="Send det dere har."
      body="Rapport, avvik, tegning eller det som ble sagt i møtet. Vi svarer innen én til to virkedager."
      action="Send rapporten eller tegningene"
      href="/kontakt?spor=digitalt"
    />
    </>
  );
}
