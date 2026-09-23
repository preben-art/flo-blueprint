import { JsonLd } from "@/components/json-ld";
import { pageGraph, type PageFacts } from "@/lib/semantic/graph";

/** One schema.org @graph for this page, built from the same facts as the head. */
export function PageSemantics(facts: PageFacts) {
  return <JsonLd data={pageGraph(facts)} />;
}
