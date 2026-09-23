import Link from "next/link";
import { BlueprintLayout, BlueprintRoom } from "@/components/blueprint";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <BlueprintLayout>
      <BlueprintRoom number="00" kicker="Fant ikke siden" title="Denne siden finnes ikke.">
        <p className="mb-6 max-w-xl text-[15px] leading-relaxed text-[#221d19]">
          Gå til forsiden, eller start med avviket, ombyggingen eller spørsmålet om hva som kreves.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Til forsiden</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/situasjon">Avvik og ombygging</Link>
          </Button>
        </div>
      </BlueprintRoom>
    </BlueprintLayout>
  );
}
