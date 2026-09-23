import Link from "next/link";
import { Button } from "@/components/ui/button";
import { company } from "@/content/site";
import { cn } from "@/lib/utils";

export function SectionCta({
  action,
  href,
  note,
  tone = "light",
  showPhone = true,
}: {
  action: string;
  href: string;
  note?: string;
  tone?: "light" | "dark";
  showPhone?: boolean;
}) {
  return (
    <div className="cta-row mt-8 flex flex-col items-start gap-3">
      <Button asChild>
        <Link href={href}>{action}</Link>
      </Button>
      {showPhone ? (
        <Button asChild variant={tone === "dark" ? "sheet" : "outline"}>
          <a href={`tel:${company.switchboard.replace(/\s/g, "")}`}>{company.switchboard}</a>
        </Button>
      ) : null}
      {note ? (
        <p className={cn("text-sm sm:ml-2", tone === "dark" ? "text-[#fbf8f2]" : "text-flo-ink")}>
          {note}
        </p>
      ) : null}
    </div>
  );
}
