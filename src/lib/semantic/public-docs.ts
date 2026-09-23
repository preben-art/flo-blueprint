import { situationAnswers, serviceAnswers, customerAnswers, articleAnswers, claimAnswers, answerOrder, answerQuestion } from "@/content/answers";
import { listDeskPosts } from "@/lib/desk";
import { editorialPath } from "@/lib/editorial-path";
import { publicRoutes } from "@/lib/public-routes";
import { peopleGroups } from "@/content/people-groups";
import { company } from "@/content/site";
import { knowledgeNodes } from "@/content/knowledge/nodes";
import { canonicalOrigin, canonicalUrl } from "@/lib/semantic/identity";
import { publicServices } from "@/lib/semantic/services";

const lines = (...parts: string[]) => parts.filter(Boolean).join("\n");

export async function llmsText() {
  const posts = await listDeskPosts();
  const services = publicServices()
    .map((service) => `- ${service.serviceName}: ${service.shortDescription} ${canonicalUrl(`/losninger/${service.slug}`)}`)
    .join("\n");
  const questions = knowledgeNodes
    .map((node) => `- ${node.question} ${canonicalUrl(`/fag-og-kunnskap/${node.slug}`)}`)
    .join("\n");
  const pieces = posts.filter((post) => post.kind === "artikkel")
    .map((article) => `- ${article.title} ${canonicalUrl(editorialPath(article))}`)
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
    posts.filter((post) => post.kind === "nyhet").map((item) => `- ${item.title} ${canonicalUrl(`/nyheter/${item.slug}`)}`).join("\n"),
    "",
    "## Alle offentlige sider",
    (await publicRoutes()).map(page => `- ${canonicalUrl(page.path)}`).join("\n"),
    "",
    "## Maskinlesbart",
    `- ${canonicalUrl("/sitemap.xml")}`,
    `- ${canonicalUrl("/api/site")}`,
    `- ${canonicalUrl("/llms-full.txt")}`,
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
    `Page directory: ${canonicalUrl("/llms.txt")}`,
    `Manifest: ${canonicalUrl("/manifest.webmanifest")}`,
    `People and offices: ${canonicalUrl("/om-flo")}`,
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
    people: peopleGroups.map(group => ({ name: group.title, url: canonicalUrl(`/om-flo#${group.id}`), members: group.members.map(person => ({ name: person.name, role: person.role, office: person.location, email: person.email })) })),
    services: publicServices(),
    questions: knowledgeNodes.map((node) => ({
      question: node.question,
      answer: node.contract.direct,
      url: canonicalUrl(`/fag-og-kunnskap/${node.slug}`),
    })),
  };
}

/** Public copy only; never serialize internal models or editorial account fields. */
export async function llmsFullText() {
  const groups = [
    { prefix: "/situasjon/", pages: Object.values(situationAnswers) },
    { prefix: "/losninger/", pages: Object.values(serviceAnswers) },
    { prefix: "/hvem-er-du/", pages: Object.values(customerAnswers) },
    { prefix: "/fag-og-kunnskap/", pages: [...Object.values(articleAnswers), claimAnswers] },
  ];
  const answers = groups.flatMap(group => group.pages.map(page => lines(
    `## ${page.title}`,
    `URL: ${canonicalUrl(page.slug === "privat" ? "/privat" : group.prefix + page.slug)}`,
    page.lead,
    ...answerOrder.map(id => lines(`### ${answerQuestion[id]}`, page.answers[id].answer, page.answers[id].detail ?? "", ...(page.answers[id].points ?? []).map(point => `- ${point}`))),
  )));
  const knowledge = knowledgeNodes.map(node => lines(`## ${node.question}`, `URL: ${canonicalUrl(`/fag-og-kunnskap/${node.slug}`)}`, node.contract.direct, node.contract.appliesTo, node.contract.requirement, node.contract.assessment, node.contract.limitation, ...node.contract.documents.map(doc => `- ${doc}`)));
  const people = peopleGroups.map(group => lines(`## ${group.title}`, ...group.members.map(person => `${person.name} — ${person.role}. ${person.location}. ${person.email}`)));
  return [await llmsText(), ...answers, ...knowledge, ...people].join("\n\n");
}
