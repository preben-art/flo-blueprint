/**
 * FLO customer-facing knowledge projection.
 * Framework / Answer Method structure: VCTRA-owned.
 * Do not treat this folder as a second source of truth or a generic customer clone.
 */
export { sourceAuthority, sources, sourceById, sourcesByIds, type SourceId } from "./sources";
export {
  roles,
  buildingStates,
  changeTypes,
  documents,
  lifecycle,
  domains,
  algorithm,
  decisionGraphs,
} from "./ontology";
export { knowledgeNodes, knowledgeBySlug, type KnowledgeNode, type DeliveryMode } from "./nodes";
export { icpQuestions, icpBuying, gaps, articleMap, clusters } from "./maps";
