import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/social-links";
import { company, nav } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="site-footer footer-premium mt-auto">
      <div className="footer-radiance" aria-hidden="true" />
      <div className="footer-shell">
        <div className="footer-invitation">
          <div>
            <p className="footer-eyebrow">Fra spørsmål til avklaring</p>
            <h2>La oss gjøre<br /><span>neste steg klart.</span></h2>
          </div>
          <div className="footer-invitation-aside">
            <p>Et avvik, en tegning eller et spørsmål.<br />Vi starter med det dere har.</p>
            <Link href="/kontakt" className="footer-action">Få vurdert saken <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="footer-premium-grid">
          <div className="footer-brand">
            <Image src="/brand/flo-wordmark-red-white-dot.png" alt="Flo Brannsikring" width={280} height={72} className="h-auto w-48" />
            <p>{company.promise}</p>
            <p className="footer-eyebrow">Følg FLO</p>
            <SocialLinks tone="dark" showLabels />
          </div>
          <nav aria-label="Bunnmeny">
            <h3 className="footer-eyebrow">Finn riktig vei</h3>
            <ul className="footer-link-list">
              {nav.map(item => <li key={item.href}><Link href={item.href}>{item.label}</Link></li>)}
              <li><Link href="/kontakt">Kontakt</Link></li>
              <li><Link href="/film">Leveransefilm</Link></li>
            </ul>
          </nav>
          <div>
            <h3 className="footer-eyebrow">Snakk med oss</h3>
            <a className="footer-phone" href={`tel:${company.switchboard.replace(/\s/g, "")}`}>{company.switchboard}</a>
            <a className="footer-email" href={`mailto:${company.email}`}>{company.email}</a>
            <a className="footer-google-link" href={company.googleBusinessUrl} target="_blank" rel="noopener noreferrer">FLO på Google <span aria-hidden="true">↗</span></a>
            <div className="footer-offices">
              {company.locations.map(loc => <address key={loc.id}><strong>{loc.name}</strong><br /><a href={loc.mapsUrl} target="_blank" rel="noopener noreferrer" aria-label={`Se ${loc.address}, ${loc.postal} i Google Maps`}>{loc.address}<br />{loc.postal} <span aria-hidden="true">↗</span></a></address>)}
            </div>
          </div>
        </div>
        <div className="footer-credentials">
          <a href={company.approvalUrl} target="_blank" rel="noopener noreferrer">
            <Image src="/brand/dibk-sentralt-godkjent-invers.png" alt="Sentral godkjenning, DiBK" width={160} height={64} className="h-10 w-auto" />
          </a>
          <p>Digitalt i hele Norge.<br />Befaring fra Stryn og Nordfjordeid.</p>
          <label className="footer-motion-control"><input type="checkbox" /> Pause lyseffekt</label>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.legalName} · Org.nr {company.orgnr}</span>
          <span>Teknisk løsning og kunnskapsstruktur levert av <a href="https://www.vctra.no" className="footer-credit-link">VCTRA</a></span>
          <Link href="/redaksjon">Redaksjon</Link>
        </div>
      </div>
    </footer>
  );
}
