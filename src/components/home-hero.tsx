import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { homeHero, photoAlt, stills } from "@/content/site";

export function HomeHero() {
  return (
    <section className="cinema-hero" aria-labelledby="hero-title">
      <Image src={stills.hero} alt={photoAlt[stills.hero]} fill priority sizes="100vw" quality={95} className="cinema-hero-image" />
      <div className="cinema-hero-shade" aria-hidden="true" />
      <div className="cinema-hero-content">
        <p className="ed-kicker cinema-hero-kicker">Brannrådgivning · Prosjektering · Utførelse</p>
        <h1 id="hero-title">{homeHero.title}</h1>
        <p className="cinema-hero-lead">{homeHero.lead}</p>
        <div className="cinema-hero-actions">
          <Button asChild size="lg"><Link href="/kontakt">{homeHero.action}</Link></Button>
          <Link className="cinema-hero-link" href="#situasjon">Har dere fått avvik? <span aria-hidden="true">↘</span></Link>
        </div>
        <p className="cinema-hero-foot">Digital gjennomgang i hele Norge. Befaring fra Stryn og Nordfjordeid.</p>
      </div>
    </section>
  );
}
