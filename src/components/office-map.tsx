import { company } from "@/content/site";

export function OfficeMap() {
  return (
      <section className="portfolio-paper" aria-labelledby="office-map-title">
        <div className="portfolio-wrap">
          <div className="story-section-heading"><div><p className="story-eyebrow">Her finner du oss</p><h2 id="office-map-title" className="story-heading">Stryn og <span>Nordfjordeid.</span></h2></div><a className="story-link" href={company.googleBusinessUrl} target="_blank" rel="noopener noreferrer">Se FLOs Google-profil <span aria-hidden="true">↗</span></a></div>
          <iframe className="office-map" src={company.googleMapsEmbedUrl} title="FLO Brannsikring på Google Maps" width="400" height="300" style={{ border: 0 }} allowFullScreen loading="eager" referrerPolicy="strict-origin-when-cross-origin" />
          <div className="office-map-links">{company.locations.map(loc => <a key={loc.id} href={loc.mapsUrl} target="_blank" rel="noopener noreferrer"><strong>{loc.name}</strong><span>{loc.address}, {loc.postal} · Åpne i Google Maps ↗</span></a>)}</div>
        </div>
      </section>
  );
}
