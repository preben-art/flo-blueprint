import Link from "next/link";
import { company } from "@/content/site";

export function CoverageBand() {
  return (
    <section className="ed-paper">
      <div className="ed-wrap grid gap-8 lg:grid-cols-2">
        <Link href="/kontakt?spor=digitalt" className="block border border-flo-ink/12 bg-[#fbf8f2] p-6 hover:border-flo-red sm:p-8">
          <p className="ed-kicker">Dokumenter, hele landet</p>
          <h2 className="mt-4 text-2xl font-normal">Kan dere se på rapporten uten å reise?</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-flo-muted">{company.coverage.digital}</p>
          <span className="mt-6 inline-block text-sm text-flo-red">Send rapporten eller tegningene</span>
        </Link>
        <Link href="/kontakt?spor=fysisk" className="block border border-flo-ink/12 bg-[#fbf8f2] p-6 hover:border-flo-red sm:p-8">
          <p className="ed-kicker">Befaring, Nordvestlandet</p>
          <h2 className="mt-4 text-2xl font-normal">Når bygget må ses, kommer vi fra Stryn og Nordfjordeid.</h2>
          <p className="mt-4 text-[15px] leading-relaxed text-flo-muted">{company.coverage.physical}</p>
          <span className="mt-6 inline-block text-sm text-flo-red">Bestill befaring</span>
        </Link>
      </div>
    </section>
  );
}
