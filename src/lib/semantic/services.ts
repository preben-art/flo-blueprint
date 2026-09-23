import { company, services } from "@/content/site";
import { canonicalUrl, ids } from "@/lib/semantic/identity";

export type PublicService = {
  slug: string;
  serviceName: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  provider: string;
  targetAudience: readonly string[];
  problemsSolved: readonly string[];
  areaServed: string;
  process: string;
  requirements: readonly string[];
  limitations: string;
  evidence?: string;
  relatedServices: readonly string[];
  contactAction: string;
  url: string;
};

const area =
  "Digital gjennomgang i hele Norge. Befaring, kontroll og utførelse fra Stryn og Nordfjordeid, i Nordvestlandet.";

const categoryBySlug: Record<string, string> = {
  brannvernradgivning: "Brannvernrådgivning",
  ribr: "Brannteknisk prosjektering",
  "brannteknisk-utforelse": "Brannteknisk utførelse",
};

/** Same service facts the service pages already show, in one shape. */
export function publicServices(): PublicService[] {
  return services.map((service) => ({
    slug: service.slug,
    serviceName: service.label,
    shortDescription: service.summary,
    fullDescription: [service.summary, service.problem, service.process].join(" "),
    category: categoryBySlug[service.slug] ?? service.label,
    provider: company.legalName,
    targetAudience: service.forWhom,
    problemsSolved: [service.problem, ...service.when],
    areaServed: area,
    process: service.process,
    requirements: service.needsFromCustomer,
    limitations: service.timePrice,
    evidence: "evidence" in service ? service.evidence : undefined,
    relatedServices: service.related,
    contactAction: canonicalUrl("/kontakt"),
    url: canonicalUrl(`/losninger/${service.slug}`),
  }));
}

export function publicService(slug: string) {
  return publicServices().find((service) => service.slug === slug);
}

export function serviceNode(service: PublicService) {
  return {
    "@type": "Service",
    "@id": ids.service(service.slug),
    name: service.serviceName,
    serviceType: service.category,
    description: service.shortDescription,
    url: service.url,
    provider: { "@id": ids.organization },
    areaServed: service.areaServed,
    audience: service.targetAudience.map((name) => ({ "@type": "Audience", audienceType: name })),
    isRelatedTo: service.relatedServices.map((slug) => ({ "@id": ids.service(slug) })),
  };
}
