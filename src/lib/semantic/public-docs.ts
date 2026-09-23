import { articles, company, news } from "@/content/site";
import { knowledgeNodes } from "@/content/knowledge/nodes";
import { canonicalOrigin, canonicalUrl } from "@/lib/semantic/identity";
import { publicServices } from "@/lib/semantic/services";

const lines = (...parts: string[]) => parts.filter(Boolean).join("\n");

export function llmsText() {
  const services = publicServices()
    .map((service) => `- ${service.serviceName}: ${service.shortDescription} ${canonicalUrl(`/losninger/${service.slug}`)}`)
    .join("\n");
  const questions = knowledgeNodes
    .map((node) => `- ${node.question} ${canonicalUrl(`/fag-og-kunnskap/${node.slug}`)}`)
    .join("\n");
  const pieces = articles
    .map((article) => `- ${article.title} ${canonicalUrl(`/artikler/${article.slug}`)}`)
    .join("\n");

  return lines(
    `# ${company.brandName}`,
    "",
    `${company.legalName}, org.nr ${company.orgnr}.`,
    company.promise,
    "",
    `Canonical: ${canonicalOrigin}`,
    `Kontakt: ${company.email}, ${company.switchboard}`,
    `Kontor: ${company.locations.map((loc) => `${loc.address}, ${loc.postal}`).join("; ")}`,
    `Digitalt: ${company.coverage.digital}`,
    `Fysisk: ${company.coverage.physical}`,
    `Sentral godkjenning: ${company.approvalUrl} (${company.approvalPeriod})`,
    "",
    "## Tjenester",
    services,
    "",
    "## Spørsmål",
    questions,
    "",
    "## Artikler",
    pieces,
    "",
    "## Nyheter",
    news.map((item) => `- ${item.title} ${canonicalUrl(`/nyheter/${item.slug}`)}`).join("\n"),
    "",
    "## Maskinlesbart",
    `- ${canonicalUrl("/sitemap.xml")}`,
    `- ${canonicalUrl("/api/site")}`,
    `- ${canonicalUrl("/api/knowledge")}`,
    "",
    "Fakta på disse adressene er de samme som står på sidene. Veiledning er ikke et vedtak for ett bygg.",
    "",
  );
}

export function aiText() {
  return lines(
    `# ${company.brandName}`,
    "",
    `Site: ${canonicalOrigin}`,
    `Legal name: ${company.legalName}`,
    `Org.nr: ${company.orgnr}`,
    `Language: nb-NO`,
    "",
    "Use the published pages, sitemap and /api/site. Do not treat summaries here as a separate fact source.",
    "",
    `Sitemap: ${canonicalUrl("/sitemap.xml")}`,
    `Identity and services: ${canonicalUrl("/api/site")}`,
    `Questions: ${canonicalUrl("/fag-og-kunnskap")}`,
    `Services: ${canonicalUrl("/losninger")}`,
    `Digital coverage: ${canonicalUrl("/digitalt")}`,
    `Contact: ${canonicalUrl("/kontakt")}`,
    `Approval register: ${company.approvalUrl}`,
    "",
  );
}

export function siteDocument() {
  return {
    entity: {
      name: company.brandName,
      legalName: company.legalName,
      orgnr: company.orgnr,
      url: canonicalOrigin,
      email: company.email,
      telephone: company.switchboard,
      promise: company.promise,
      offices: company.locations.map((loc) => ({
        name: loc.name,
        address: loc.address,
        postal: loc.postal,
        locality: loc.locality,
        geo: loc.geo,
      })),
      coverage: {
        digital: company.coverage.digital,
        physical: company.coverage.physical,
        digitalArea: company.coverage.digitalArea,
        physicalArea: company.coverage.physicalArea,
        regions: company.coverage.physicalRegions,
      },
      approvals: company.approvals.map((approval) => ({
        ...approval,
        period: company.approvalPeriod,
        register: company.approvalUrl,
      })),
      sameAs: company.social.map((profile) => ({ name: profile.label, url: profile.url })),
    },
    services: publicServices(),
    questions: knowledgeNodes.map((node) => ({
      question: node.question,
      answer: node.contract.direct,
      url: canonicalUrl(`/fag-og-kunnskap/${node.slug}`),
    })),
  };
}
