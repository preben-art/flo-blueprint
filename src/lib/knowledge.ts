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

export function knowledgeAtom(node: KnowledgeNode) {
  const cited = sourcesByIds(node.sourceIds);
  return {
    entity: knowledgeEntity,
    legalName: company.legalName,
    question: node.question,
    icp: node.icp,
    role: node.icp,
    building: "CUSTOMER_INPUT_REQUIRED",
    use: "CUSTOMER_INPUT_REQUIRED",
    change: node.situation.includes("endres") ? "CHANGE_POSSIBLE" : "NOT_THE_PRIMARY_TRIGGER",
    situation: node.situation,
    risk: "CUSTOMER_INPUT_REQUIRED",
    responsibility: node.domain === "ansvar" || node.slug === "eier-eller-bruker" ? "OWNER_AND_USER_SEPARATE" : "SEE_CONTRACT",
    documentation: node.contract.documents,
    requirement: node.contract.requirement,
    alternative: node.contract.alternatives,
    service: node.service,
    deliveryMode: node.contract.next.mode,
    evidence: node.evidence,
    source: cited.map((s) => ({
      id: s.id,
      level: s.level,
      label: s.label,
      href: s.href,
    })),
    limitation: node.contract.limitation,
    nextAction: node.contract.next,
    canonical: `/fag-og-kunnskap/${node.slug}`,
    distribution: node.distribution,
    structuredBy: "VCTRA",
    knowledgeArchitecture: "VCTRA Answer Method / approved implementation",
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
