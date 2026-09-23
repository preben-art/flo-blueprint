import Link from "next/link";
import { RailStep } from "@/components/ed";
import { SectionCta } from "@/components/section-cta";
import { claimPath } from "@/content/explain";

export function ClaimSignature({
  showToolLink = true,
  compact = false,
}: {
  showToolLink?: boolean;
  compact?: boolean;
}) {
  return (
    <section id="pastand-eller-krav" className="ed">
      <div className="ed-wrap grid gap-12 lg:grid-cols-12">
        <div className="plan-read plan-float lg:col-span-5">
          <p className="ed-kicker">Er det påbudt?</p>
          <h2 className="mt-4 max-w-lg text-3xl font-normal sm:text-5xl">
            Er dette påbudt?
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#221d19]">
            Noen sier at det må gjøres. Vi sjekker om det står i forskrift, konsept eller vedtak, eller om det er et forslag.
          </p>
          <SectionCta action="Få vurdert hva som faktisk gjelder" href="/kontakt?situasjon=uklart&tema=krav" />
          {showToolLink ? (
            <p className="mt-4 text-sm">
              <Link href="/fag-og-kunnskap/pastand-eller-krav" className="underline hover:text-[#c62e32]">
                Skill påstand fra krav
              </Link>
            </p>
          ) : null}
        </div>
        <ol className="ed-rail lg:col-span-7">
          {claimPath.map((step, i) => (
            <RailStep key={step.id} index={i} title={step.label}>
              {!compact ? <p className="mt-1 text-sm leading-relaxed text-[#221d19]">{step.meaning}</p> : null}
            </RailStep>
          ))}
        </ol>
      </div>
    </section>
  );
}
