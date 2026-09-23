import Link from "next/link";
import { kravCluster } from "@/content/explain";

export function KravCluster() {
  return (
    <section className="ed-paper">
      <div className="ed-wrap grid gap-10 lg:grid-cols-12">
        <div className="plan-read plan-float lg:col-span-5">
          <p className="ed-kicker">Samme bygg</p>
          <h2 className="mt-4 max-w-md text-3xl font-normal sm:text-4xl">Tilsyn, internkontroll og TEK i samme bygg?</h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#221d19]">
            Tilsyn, internkontroll og TEK er ikke tre separate jobber. De treffer ofte samme dokumentasjon og samme bruk.
          </p>
        </div>
        <ol className="plan-read plan-float lg:col-span-7">
          {kravCluster.map((item, i) => (
            <li key={item.id} className="border-b border-[#161210]/12 py-4">
              <Link href={item.href} className="group block hover:text-[#c62e32]">
                <p className="ed-kicker">
                  {String(i + 1).padStart(2, "0")} · {item.label}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed">{item.meaning}</p>
              </Link>
            </li>
          ))}
        </ol>
        <p className="plan-read plan-float lg:col-span-12">
          <Link href="/fag-og-kunnskap/flere-krav-samme-bygg" className="text-sm text-[#c62e32] hover:underline">
            Les hvordan de henger sammen
          </Link>
        </p>
      </div>
    </section>
  );
}
