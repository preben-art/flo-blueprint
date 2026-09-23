import Link from "next/link";
import { Button } from "@/components/ui/button";
import { RoomLabel } from "@/components/blueprint";
import { MediaPhoto } from "@/components/media-photo";
import { company } from "@/content/site";

export function SiteHero() {
  return (
    <section className="relative isolate min-h-[78svh] overflow-hidden">
      <MediaPhoto
        src="/media/nodutgang-korridor.jpg"
        alt="Illustrasjonsfoto: nødutgangslys over rømningsvei i mørk korridor"
        priority
        sizes="100vw"
      />
      <div className="photo-veil" />
      <div className="relative z-[1] mx-auto flex min-h-[78svh] max-w-6xl flex-col justify-end px-4 pb-12 pt-24 sm:px-6 sm:pb-16">
        <RoomLabel number="01" title="Stryn · Nordfjordeid · TK3" onDark />
        <p className="mt-5 text-sm tracking-wide text-[#f4f1ea]/80">{company.tagline}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-normal leading-[1.08] tracking-tight text-[#fbf8f2] sm:text-5xl lg:text-[3.6rem]">
          Hva gjelder for bygget deres?
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#f4f1ea]/90 sm:text-lg">
          {company.promise}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="#situasjon">Har dere fått avvik?</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-[#fbf8f2] text-[#fbf8f2] hover:bg-[#fbf8f2] hover:text-flo-ink"
          >
            <Link href="/kontakt?spor=digitalt">Start digitalt</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-4 border-t border-[#fbf8f2]/25 pt-6 sm:grid-cols-3">
          {company.approvals.map((a) => (
            <div key={a.area}>
              <p className="room-number text-flo-red">{a.class}</p>
              <p className="mt-1 text-sm font-medium text-[#fbf8f2]">
                {a.function}
                <span className="block font-normal text-[#d9d2c6]">{a.area}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
