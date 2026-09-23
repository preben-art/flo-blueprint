import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SocialLinks } from "@/components/social-links";
import { company, nav } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer mt-auto text-[#fbf8f2]">
      <div className="footer-body mx-auto grid max-w-6xl gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <Image
            src="/brand/flo-wordmark-red-white-dot.png"
            alt="Flo Brannsikring"
            width={280}
            height={84}
            className="mb-8 h-12 w-auto sm:h-14"
          />
          <p className="max-w-md text-[16px] font-normal leading-relaxed text-[#fbf8f2]/88">
            {company.promise}
          </p>
          <p className="mt-10">
            <a
              href={`tel:${company.switchboard.replace(/\s/g, "")}`}
              className="text-3xl font-medium tracking-tight text-[#fbf8f2] hover:text-[#c62e32] sm:text-4xl"
            >
              {company.switchboard}
            </a>
          </p>
          <p className="mt-3">
            <a href={`mailto:${company.email}`} className="text-sm text-[#fbf8f2]/80 hover:text-[#c62e32]">
              {company.email}
            </a>
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild>
              <Link href="/kontakt">Send saken</Link>
            </Button>
            <Button asChild variant="sheet">
              <Link href="/kontakt">Kontakt</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <p className="ed-kicker">Følg FLO</p>
            <SocialLinks tone="dark" showLabels />
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5">
          <div>
            <p className="ed-kicker mb-5">Hva gjelder?</p>
            <ul className="space-y-3 text-[15px]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[#fbf8f2]/88 hover:text-[#c62e32]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kontakt" className="text-[#fbf8f2]/88 hover:text-[#c62e32]">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/film" className="text-[#fbf8f2]/88 hover:text-[#c62e32]">
                  Leveransefilm
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="ed-kicker mb-5">Stryn og Nordfjordeid</p>
            <ul className="space-y-5 text-[15px] leading-relaxed">
              {company.locations.map((loc) => (
                <li key={loc.id}>
                  <p className="font-medium text-[#fbf8f2]">{loc.name}</p>
                  <p className="text-[#fbf8f2]/75">
                    {loc.address}
                    <br />
                    {loc.postal}
                  </p>
                </li>
              ))}
            </ul>
            <a
              href={company.approvalUrl}
              className="mt-8 inline-block opacity-90 hover:opacity-100"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/brand/dibk-sentralt-godkjent-invers.png"
                alt="Sentral godkjenning, DiBK"
                width={160}
                height={64}
                className="h-11 w-auto"
              />
            </a>
            <p className="mt-4 font-mono text-[11px] tracking-[0.14em] text-[#fbf8f2]/55 uppercase">
              Org.nr {company.orgnr}
            </p>
          </div>
        </div>
      </div>
      <div className="footer-legal">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-[11px] tracking-wide text-[#fbf8f2]/55 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>
            © {new Date().getFullYear()} {company.legalName}
          </span>
          <span>Teknisk løsning og kunnskapsstruktur levert av VCTRA</span>
          <Link href="/redaksjon" className="hover:text-[#fbf8f2]">
            Redaksjon
          </Link>
        </div>
      </div>
    </footer>
  );
}
