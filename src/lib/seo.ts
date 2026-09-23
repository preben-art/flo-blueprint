import type { Metadata } from "next";
import { company } from "@/content/site";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:4731";
export const organizationUrl = "https://flo-brannsikring.no";

export const defaultDescription =
  "FLO Brannsikring leser avvik, ombygging og uklare brannkrav mot bygget. Brannkonsept, RIBr og digital brannvurdering fra Stryn og Nordfjordeid.";

export function pageMeta(title: string, description: string, path = "/"): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      locale: "nb_NO",
      type: "website",
      siteName: company.brandName,
    },
  };
}

export function faqPageJsonLd(items: readonly { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function organizationJsonLd() {
  const offices = company.locations.map((loc) => ({
    "@type": "Place",
    name: loc.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address,
      postalCode: loc.postalCode,
      addressLocality: loc.locality,
      addressRegion: "Vestland",
      addressCountry: "NO",
    },
    geo: { "@type": "GeoCoordinates", latitude: loc.geo.lat, longitude: loc.geo.lng },
  }));

  const norway = { "@type": "Country", name: "Norge", identifier: "NO" };
  const nordvestlandet = [
    { "@type": "AdministrativeArea", name: "Nordvestlandet" },
    { "@type": "AdministrativeArea", name: "Vestland" },
    { "@type": "AdministrativeArea", name: "Møre og Romsdal" },
    ...company.coverage.physicalPlaces.map((name) => ({ "@type": "City", name })),
  ];

  const digitalServices = [
    "Digital gjennomgang av brannteknisk dokumentasjon",
    "Vurdering av brannkonsept og tegninger",
    "Påstand eller krav: avklaring av hva som faktisk gjelder",
    "Second opinion på tilsyn og avvik",
    "Digital brannvernopplæring og kurs",
  ];
  const physicalServices = [
    "Brannteknisk befaring og kontroll",
    "Brannteknisk utførelse og utbedring",
    "Kartlegging og 3D-skanning av eksisterende bygg",
    "Uavhengig kontroll brannsikkerhet",
  ];

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${organizationUrl}#flo`,
    name: company.brandName,
    legalName: company.legalName,
    url: organizationUrl,
    telephone: company.switchboard,
    email: company.email,
    vatID: company.orgnr.replace(/\s/g, ""),
    address: offices[0].address,
    geo: offices[0].geo,
    location: offices,
    areaServed: [norway, ...nordvestlandet],
    knowsAbout: [
      "brannsikring",
      "brannkonsept",
      "RIBr",
      "brannvernrådgivning",
      "uavhengig kontroll brannsikkerhet",
      "3D-skanning av bygg",
      "internkontroll brann",
      "bruksendring og rømning",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "FLO Brannsikring, tjenester",
      itemListElement: [
        ...digitalServices.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            serviceType: "Digital brannteknisk vurdering",
            areaServed: norway,
            availableChannel: { "@type": "ServiceChannel", serviceUrl: `${organizationUrl}/digitalt`, name: "Digitalt" },
          },
        })),
        ...physicalServices.map((name) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            serviceType: "Befaring, kontroll og utførelse",
            areaServed: nordvestlandet,
            availableChannel: { "@type": "ServiceChannel", serviceUrl: `${organizationUrl}/kontakt?spor=fysisk`, name: "Fysisk" },
          },
        })),
      ],
    },
    hasCredential: company.approvals.map((a) => `${a.function}, ${a.area} ${a.class}`),
    sameAs: company.social.map((s) => s.url),
  };
}
