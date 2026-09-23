import { knowledgeNodes, type KnowledgeNode } from "@/content/knowledge/nodes";
import { sourcesByIds } from "@/content/knowledge/sources";
import { company } from "@/content/site";

export const knowledgeEntity = "FLO BRANNSIKRING";

export function knowledgeContractFaq(node: KnowledgeNode) {
  const c = node.contract;
  return [
    { question: node.question, answer: c.direct },
    { question: "Hvem gjelder det for?", answer: c.appliesTo },
    { question: "Hva avhenger svaret av?", answer: c.dependsOn.join(" ") },
    { question: "Hva er faktisk krav?", answer: c.requirement },
    { question: "Hva krever faglig vurdering?", answer: c.assessment },
    { question: "Hvilke alternativer finnes?", answer: c.alternatives.join(" ") },
    { question: "Hva kan ikke avgjøres her?", answer: c.limitation },
    { question: "Hvilken dokumentasjon bør frem?", answer: c.documents.join(". ") },
    { question: "Hva gjør vi nå?", answer: `${c.next.action} Spor: ${c.next.mode}.` },
  ];
}

const evidenceLabel = {
  SOURCE_CONFIRMED: "Knyttet til kildene under.",
  INFERRED: "Faglig vurdering. Ikke et registerfunn for ett bygg.",
  EVIDENCE_REQUIRED: "Krever dokumentasjon fra det aktuelle bygget.",
} as const;

export function knowledgeAtom(node: KnowledgeNode) {
  const cited = sourcesByIds(node.sourceIds);
  return {
    entity: company.legalName,
    brand: company.brandName,
    question: node.question,
    audience: node.icp,
    situation: node.situation,
    services: node.service,
    answer: node.contract.direct,
    appliesTo: node.contract.appliesTo,
    dependsOn: node.contract.dependsOn,
    requirement: node.contract.requirement,
    assessment: node.contract.assessment,
    alternatives: node.contract.alternatives,
    documents: node.contract.documents,
    evidence: evidenceLabel[node.evidence],
    sources: cited.map((source) => ({
      label: source.label,
      href: source.href,
    })),
    limitation: node.contract.limitation,
    next: node.contract.next,
    canonical: `/fag-og-kunnskap/${node.slug}`,
  };
}

export function knowledgeGraph() {
  return {
    entity: knowledgeEntity,
    nodes: knowledgeNodes.map((n) => knowledgeAtom(n)),
  };
}

export function knowledgeFaqJsonLd(node: KnowledgeNode) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: knowledgeContractFaq(node).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
