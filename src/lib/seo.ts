import type { Metadata } from "next";
import { company } from "@/content/site";
import { pageGraph, type FaqItem, type PageFacts } from "@/lib/semantic/graph";
import { canonicalOrigin, canonicalUrl, isIndexableDeployment, siteUrl } from "@/lib/semantic/identity";

export { canonicalOrigin, canonicalUrl, siteUrl, isIndexableDeployment };
export { pageGraph, machineSummary } from "@/lib/semantic/graph";
export type { PageFacts, FaqItem };

export const organizationUrl = canonicalOrigin;

export const defaultDescription =
  "FLO Brannsikring leser avvik, ombygging og uklare brannkrav mot bygget. Brannkonsept, RIBr og digital brannvurdering fra Stryn og Nordfjordeid.";

const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${company.brandName}. Nødutgang i en korridor.`,
};

export function pageMeta(
  title: string,
  description: string,
  path = "/",
  options?: { index?: boolean; article?: boolean; image?: string },
): Metadata {
  const index = options?.index ?? (isIndexableDeployment() && !path.startsWith("/redaksjon"));
  const canonical = canonicalUrl(path);
  const image = options?.image ?? ogImage.url;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    authors: [{ name: company.legalName, url: canonicalOrigin }],
    creator: company.legalName,
    publisher: company.legalName,
    openGraph: {
      title,
      description,
      url: canonical,
      locale: "nb_NO",
      type: options?.article ? "article" : "website",
      siteName: company.brandName,
      images: [options?.image ? { url: image, alt: `${company.brandName}: ${title}` } : ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** @deprecated Prefer pageGraph(), which keeps FAQ inside the page @graph. */
export function faqPageJsonLd(items: readonly { question: string; answer: string }[]) {
  return pageGraph({
    path: "/",
    title: company.brandName,
    description: defaultDescription,
    faqs: items,
  });
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": pageGraph({
      path: "/",
      title: company.brandName,
      description: defaultDescription,
    })["@graph"],
  };
}
