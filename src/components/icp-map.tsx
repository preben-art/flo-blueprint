import Link from "next/link";
import { MediaPhoto } from "@/components/media-photo";
import { icpLinks } from "@/content/explain";
import { commercialCustomers, customerStill, photoAlt } from "@/content/site";

export function IcpMap({ showGrid = true }: { showGrid?: boolean }) {
  return (
    <section id="hvem">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="room-number mb-4 text-[#c62e32]">Hva som faktisk gjelder for deg</p>
        <h2 className="max-w-2xl text-2xl font-normal sm:text-4xl">
          Samme bygg. Ulike plikter. Du skal vite din.
        </h2>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-[#161210]">
          Eier eier. Bruker drifter. Arkitekt setter premissene. Entreprenør utfører. FLO leser det som ett system, og
          sier hva som gjelder for deg.
        </p>

        {showGrid ? (
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {commercialCustomers.map((c) => (
              <Link
                key={c.slug}
                href={`/hvem-er-du/${c.slug}`}
                className="group panel overflow-hidden hover:border-[#c62e32]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <MediaPhoto
                    src={customerStill[c.slug]}
                    alt={photoAlt[customerStill[c.slug]] ?? c.label}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="plan-frame" />
                </div>
                <div className="p-4">
                  <p className="room-number text-[#c62e32]">{c.confirmed ? "Navngitt oppdrag" : "Ingen navngitt sak ennå"}</p>
                  <p className="mt-1 text-lg font-normal text-[#161210]">{c.label}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : null}

        <ul className="mt-8 space-y-0 border-t border-[#161210]/18">
          {icpLinks.map((edge) => {
            const from = commercialCustomers.find((c) => c.slug === edge.from);
            const to = commercialCustomers.find((c) => c.slug === edge.to);
            return (
              <li
                key={edge.from + edge.to}
                className="grid gap-2 border-b border-[#161210]/18 py-5 sm:grid-cols-12 sm:items-baseline"
              >
                <p className="room-number text-[#c62e32] sm:col-span-3">{edge.label}</p>
                <p className="text-sm font-medium sm:col-span-3">
                  {from?.label} og {to?.label}
                </p>
                <p className="text-[15px] leading-relaxed text-[#161210] sm:col-span-6">{edge.meaning}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
