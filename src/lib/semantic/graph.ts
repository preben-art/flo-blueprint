import { company, people } from "@/content/site";
import { canonicalOrigin, canonicalUrl, ids, organizationNode, placeNodes, websiteNode } from "@/lib/semantic/identity";
import { publicService, serviceNode } from "@/lib/semantic/services";

export type FaqItem = { question: string; answer: string };

export type PageFacts = {
  path: string;
  title: string;
  description: string;
  kind?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";
  topic?: string;
  audience?: string;
  area?: string;
  serviceSlug?: string;
  faqs?: readonly FaqItem[];
  breadcrumbs?: readonly { name: string; path: string }[];
  datePublished?: string;
  dateModified?: string;
  article?: boolean;
  news?: boolean;
  video?: { name: string; description: string; contentUrl: string; thumbnailUrl: string; uploadDate: string };
  people?: boolean;
};

const segmentLabel: Record<string, string> = {
  situasjon: "Situasjon",
  losninger: "Løsninger",
  "hvem-er-du": "Hvem er du",
  privat: "Bolig",
  digitalt: "Digitalt",
  fagmiljo: "Fagmiljø",
  nyheter: "Nyheter",
  artikler: "Artikler",
  prosjekter: "Oppdrag",
  "fag-og-kunnskap": "Spørsmål",
  "om-flo": "Om FLO",
  kontakt: "Kontakt",
  film: "Leveransefilm",
};

export function breadcrumbsFor(path: string, current: string) {
  const crumbs: { name: string; path: string }[] = [{ name: company.brandName, path: "/" }];
  if (path === "/") return crumbs;
  const parts = path.split("/").filter(Boolean);
  let acc = "";
  parts.forEach((part, index) => {
    acc += `/${part}`;
    const isLast = index === parts.length - 1;
    crumbs.push({
      name: isLast ? current : (segmentLabel[part] ?? part),
      path: acc,
    });
  });
  return crumbs;
}

export function pageGraph(facts: PageFacts) {
  const pageId = ids.webpage(facts.path);
  const crumbs = facts.breadcrumbs ?? breadcrumbsFor(facts.path, facts.title);
  const service = facts.serviceSlug ? publicService(facts.serviceSlug) : undefined;
  const pageType = facts.news ? "NewsArticle" : facts.article ? "Article" : (facts.kind ?? "WebPage");

  const webpage: Record<string, unknown> = {
    "@type": pageType,
    "@id": pageId,
    url: canonicalUrl(facts.path),
    name: facts.title,
    description: facts.description,
    inLanguage: "nb-NO",
    isPartOf: { "@id": ids.website },
    about: { "@id": service ? ids.service(service.slug) : ids.organization },
    publisher: { "@id": ids.organization },
    breadcrumb: { "@id": ids.breadcrumb(facts.path) },
    primaryImageOfPage: `${canonicalOrigin}/og.jpg`,
  };

  if (facts.topic) webpage.about = [{ "@id": ids.organization }, { "@type": "Thing", name: facts.topic }];
  if (facts.audience) webpage.audience = { "@type": "Audience", audienceType: facts.audience };
  if (facts.area) webpage.spatialCoverage = facts.area;
  if (facts.datePublished) webpage.datePublished = facts.datePublished;
  if (facts.dateModified) webpage.dateModified = facts.dateModified;
  if (facts.article || facts.news) {
    webpage.author = { "@id": ids.organization };
    webpage.headline = facts.title;
  }
  if (service) webpage.mainEntity = { "@id": ids.service(service.slug) };

  const graph: Record<string, unknown>[] = [organizationNode(), ...placeNodes(), websiteNode(), webpage];

  if (service) graph.push(serviceNode(service));

  graph.push({
    "@type": "BreadcrumbList",
    "@id": ids.breadcrumb(facts.path),
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: canonicalUrl(crumb.path),
    })),
  });

  if (facts.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl(facts.path)}#faq`,
      isPartOf: { "@id": pageId },
      mainEntity: facts.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    });
  }

  if (facts.video) {
    graph.push({
      "@type": "VideoObject",
      name: facts.video.name,
      description: facts.video.description,
      contentUrl: facts.video.contentUrl,
      thumbnailUrl: facts.video.thumbnailUrl,
      uploadDate: facts.video.uploadDate,
      publisher: { "@id": ids.organization },
      inLanguage: "nb-NO",
    });
  }

  if (facts.people) {
    for (const person of people) {
      if (!person.role) continue;
      graph.push({
        "@type": "Person",
        "@id": ids.person(person.email),
        name: person.name,
        jobTitle: person.role,
        email: person.email,
        telephone: "phone" in person ? person.phone : undefined,
        workLocation: { "@type": "Place", name: person.location },
        worksFor: { "@id": ids.organization },
      });
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function machineSummary(facts: PageFacts) {
  return {
    entity: company.legalName,
    brand: company.brandName,
    url: canonicalUrl(facts.path),
    purpose: facts.description,
    topic: facts.topic ?? facts.title,
    geography: facts.area ?? `${company.coverage.digitalArea}; fysisk ${company.coverage.physicalArea}`,
    audience: facts.audience ?? null,
    summary: facts.description,
    sources: [company.approvalUrl, ...company.social.map((profile) => profile.url)],
  };
}
