import Link from "next/link";
import { StillFrame } from "@/components/still-frame";
import { Button } from "@/components/ui/button";
import { company, photoAlt, stills } from "@/content/site";

export function HomeHero() {
  return (
    <section className="plan-hero">
      <div className="plan-hero-layout">
        <div className="plan-hero-copy plan-float">
          <p className="ed-kicker">FLO Brannsikring</p>
          <h1 className="mt-7 max-w-none text-[2.35rem] font-light leading-[1.08] tracking-[0.016em] text-[#161210] sm:text-[2.85rem] lg:text-[3.35rem]">
            Brannsikring ved avvik, ombygging og uklare krav
          </h1>
          <p className="mt-6 max-w-md text-[16px] font-normal leading-[1.65] tracking-[0.01em] text-[#221d19] sm:text-[17px]">
            {company.promise}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/kontakt">Send saken</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="#situasjon">Har dere fått avvik?</Link>
            </Button>
          </div>
        </div>
        <figure className="plan-hero-still plan-float">
          <StillFrame
            src={stills.hero}
            alt={photoAlt[stills.hero]}
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="aspect-[16/10] lg:min-h-[38rem] lg:aspect-auto"
          />
        </figure>
      </div>
    </section>
  );
}
