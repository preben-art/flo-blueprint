import Link from "next/link";
import { searchAsks } from "@/content/explain";

export function SearchAsks() {
  return (
    <section className="ed">
      <div className="ed-wrap">
        <div className="plan-read plan-float">
        <p className="ed-kicker">Hva gjelder hos dere?</p>
        <h2 className="mt-4 max-w-2xl text-2xl font-normal sm:text-4xl">
          Har dere fått avvik, skal dere bygge om, eller er det uklart hva som kreves?
        </h2>
        <ul className="mt-10 divide-y divide-[#161210]/12 border-y border-[#161210]/12">
          {searchAsks.map((item) => (
            <li key={item.ask}>
              <Link href={item.href} className="grid gap-2 py-5 hover:text-[#c62e32] sm:grid-cols-12 sm:items-baseline">
                <p className="ed-kicker sm:col-span-3">{item.who}</p>
                <p className="text-[16px] font-medium sm:col-span-9">{item.ask}</p>
              </Link>
            </li>
          ))}
        </ul>
        </div>
      </div>
    </section>
  );
}
