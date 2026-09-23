import { company } from "@/content/site";

/** Public canonical host. Preview and localhost keep this as the canonical URL. */
export const canonicalOrigin = "https://flo-brannsikring.no";

export const canonicalHost = new URL(canonicalOrigin).host;

const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

/** Origin used for absolute metadata on this deployment. Canonical links stay on canonicalOrigin. */
export const siteUrl = configuredOrigin || canonicalOrigin;

export function isIndexableDeployment() {
  if (!configuredOrigin) return false;
  try {
    return new URL(configuredOrigin).host === canonicalHost;
  } catch {
    return false;
  }
}

export function canonicalUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return canonicalOrigin;
  return `${canonicalOrigin}${normalized.split("?")[0]}`;
}

export const ids = {
  organization: `${canonicalOrigin}/#organization`,
  website: `${canonicalOrigin}/#website`,
  logo: `${canonicalOrigin}/#logo`,
  place: (id: string) => `${canonicalOrigin}/#place-${id}`,
  service: (slug: string) => `${canonicalOrigin}/losninger/${slug}#service`,
  webpage: (path: string) => `${canonicalUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${canonicalUrl(path)}#breadcrumb`,
  person: (email: string) => `${canonicalOrigin}/#person-${email.split("@")[0]}`,
};

const orgnrDigits = company.orgnr.replace(/\s/g, "");

export function postalAddress(loc: (typeof company.locations)[number]) {
  return {
    "@type": "PostalAddress",
    streetAddress: loc.address,
    postalCode: loc.postalCode,
    addressLocality: loc.locality,
    addressRegion: "Vestland",
    addressCountry: "NO",
  };
}

export function organizationNode() {
  const offices = company.locations.map((loc) => ({
    "@type": "Place",
    "@id": ids.place(loc.id),
    name: loc.name,
    address: postalAddress(loc),
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
  }));

  return {
    "@type": "ProfessionalService",
    "@id": ids.organization,
    name: company.brandName,
    legalName: company.legalName,
    url: canonicalOrigin,
    logo: {
      "@type": "ImageObject",
      "@id": ids.logo,
      url: `${canonicalOrigin}/icon.svg`,
    },
    image: `${canonicalOrigin}/og.jpg`,
    telephone: company.switchboard,
    email: company.email,
    vatID: orgnrDigits,
    taxID: orgnrDigits,
    identifier: {
      "@type": "PropertyValue",
      propertyID: "NO:Orgnr",
      value: orgnrDigits,
    },
    address: offices[0].address,
    geo: offices[0].geo,
    location: offices.map((office) => ({ "@id": office["@id"] })),
    areaServed: [
      { "@type": "Country", name: "Norge", identifier: "NO" },
      { "@type": "AdministrativeArea", name: "Nordvestlandet" },
      ...company.coverage.physicalRegions.map((name) => ({ "@type": "AdministrativeArea", name })),
    ],
    knowsAbout: [
      "brannsikring",
      "brannkonsept",
      "RIBr",
      "brannvernrådgivning",
      "uavhengig kontroll av brannsikkerhet",
      "3D-skanning av eksisterende bygg",
      "internkontroll brann",
      "bruksendring og rømning",
    ],
    hasCredential: company.approvals.map((approval) => ({
      "@type": "EducationalOccupationalCredential",
      name: `${approval.function}, ${approval.area}, ${approval.class}`,
      description: `Sentral godkjenning hos DiBK, ${company.approvalPeriod}.`,
      recognizedBy: {
        "@type": "GovernmentOrganization",
        name: "Direktoratet for byggkvalitet",
        url: company.approvalUrl,
      },
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: company.switchboard,
        email: company.email,
        availableLanguage: ["Norwegian", "nb"],
        areaServed: "NO",
        url: `${canonicalOrigin}/kontakt`,
      },
    ],
    sameAs: company.social.map((profile) => profile.url),
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": ids.website,
    name: company.brandName,
    url: canonicalOrigin,
    inLanguage: "nb-NO",
    publisher: { "@id": ids.organization },
    description: company.promise,
  };
}

export function placeNodes() {
  return company.locations.map((loc) => ({
    "@type": "Place",
    "@id": ids.place(loc.id),
    name: loc.name,
    address: postalAddress(loc),
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.lat,
      longitude: loc.geo.lng,
    },
    containedInPlace: { "@type": "AdministrativeArea", name: "Vestland" },
  }));
}
