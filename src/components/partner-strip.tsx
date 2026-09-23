import Image from "next/image";
import { PartnerLink } from "@/components/partner-link";
import { PartnerMark } from "@/components/partner-mark";
import { partners } from "@/content/site";
import { cn } from "@/lib/utils";

export function PartnerStrip({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const light = tone === "light";
  return (
    <section
      className={cn(
        light
          ? "border-y border-[#161210]/10 bg-[#f4f1ea]/62"
          : "relative border-t border-[#c62e32]/40",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className={cn("ed-kicker mb-6", !light && "text-[#c62e32]")}>
          Hvem har vi jobbet for?
        </p>
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-6 sm:grid-cols-4 lg:grid-cols-8">
          {partners.map((p) => (
            <li
              key={p.name}
              className="flex min-h-12 items-center justify-center"
            >
              <PartnerLink
                url={p.url}
                name={p.name}
                className="partner-link flex items-center justify-center"
              >
                {p.mark === "type" ? (
                  <PartnerMark
                    name={p.name}
                    mark="type"
                    size="strip"
                    className={cn("text-center", !light && "text-[#fbf8f2]")}
                  />
                ) : (
                  <Image
                    src={p.file}
                    alt={p.name}
                    width={180}
                    height={72}
                    unoptimized={p.file.endsWith(".svg")}
                    className={cn(
                      "max-h-9 w-auto max-w-full object-contain opacity-80",
                      light
                        ? "grayscale contrast-125"
                        : p.invert
                          ? "brightness-0 invert opacity-90"
                          : "grayscale contrast-125 brightness-[1.35] opacity-90",
                    )}
                  />
                )}
              </PartnerLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
