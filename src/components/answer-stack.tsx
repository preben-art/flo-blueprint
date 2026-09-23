import Link from "next/link";
import type { ReactNode } from "react";
import { AnswerBlock } from "@/components/answer-block";
import { AnswerNav } from "@/components/answer-nav";
import { ClarifyPath } from "@/components/clarify-path";
import { JsonLd } from "@/components/json-ld";
import { PageStill } from "@/components/page-still";
import { PlanSplit } from "@/components/plan-field";
import { PlanPlate } from "@/components/plan-plate";
import { SectionCta } from "@/components/section-cta";
import { answersAsFaq, type AnswerId, type AnswerPage } from "@/content/answers";
import { photoAlt, stills } from "@/content/site";
import { faqPageJsonLd } from "@/lib/seo";

export function AnswerStack({
  page,
  insertAfter,
  afterKrav,
}: {
  page: AnswerPage;
  insertAfter?: Partial<Record<AnswerId, ReactNode>>;
  afterKrav?: ReactNode;
}) {
  const practice = page.answers.a3.photo;
  const splitStill =
    practice?.src && practice.src !== page.hero.src
      ? practice.src
      : page.kind === "claim"
        ? stills.internkontroll
        : stills.bygg;
  const splitAlt = photoAlt[splitStill] ?? page.hero.alt;

  return (
    <>
      <JsonLd data={faqPageJsonLd(answersAsFaq(page))} />
      <PageStill
        src={page.hero.src}
        alt={page.hero.alt}
        room={page.room}
        kicker={page.kicker}
        title={page.title}
        lead={page.lead}
        caption={page.hero.caption}
      />

      <AnswerNav />

      <PlanSplit
        id="situasjonen"
        className="scroll-mt-28 sm:scroll-mt-32"
        still={splitStill}
        stillAlt={splitAlt}
        caption={practice?.caption ?? page.hero.caption}
      >
        <p className="ed-kicker">Hva gjelder?</p>
        <div className="mt-4 space-y-12">
          <AnswerBlock id="a1" item={page.answers.a1} tone="paper" />
          {insertAfter?.a1}
          <AnswerBlock id="a2" item={page.answers.a2} tone="paper" />
          {insertAfter?.a2}
        </div>
      </PlanSplit>

      <section id="praksis" className="ed-paper scroll-mt-28 sm:scroll-mt-32">
        <div className="ed-wrap grid items-start gap-10 lg:grid-cols-12">
          <div className="plan-read plan-float lg:col-span-6">
            <p className="ed-kicker">I bygget</p>
            <div className="mt-4">
              <AnswerBlock id="a3" item={{ ...page.answers.a3, photo: undefined }} tone="paper" />
            </div>
            {insertAfter?.a3}
          </div>
          <div className="lg:col-span-6">
            <PlanPlate
              src={practice?.src ?? stills.romningOvenfra}
              alt={practice?.alt ?? page.hero.alt}
              caption={practice?.caption ?? page.hero.caption}
              sizes="(max-width: 1024px) 100vw, 50vw"
              ratio="wide"
            />
          </div>
        </div>
      </section>

      <section id="krav-og-kilde" className="ed-paper scroll-mt-28 sm:scroll-mt-32">
        <div className="ed-wrap grid gap-8 lg:grid-cols-12">
          <div className="plan-read plan-float lg:col-span-6">
            <p className="ed-kicker">Ansvar</p>
            <div className="mt-4">
              <AnswerBlock id="a4" item={page.answers.a4} tone="paper" />
            </div>
            {insertAfter?.a4}
          </div>
          <div className="plan-read plan-float lg:col-span-6">
            <p className="ed-kicker">Krav, anbefaling eller påstand</p>
            <div className="mt-4">
              <AnswerBlock id="a5" item={page.answers.a5} tone="paper" />
            </div>
            {insertAfter?.a5}
          </div>
        </div>
      </section>

      {afterKrav}

      <section id="avklaring" className="ed-navy scroll-mt-28 sm:scroll-mt-32">
        <div className="ed-wrap grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="plan-read plan-read-ink plan-float lg:col-span-4">
            <p className="ed-kicker">Hva må vi vite?</p>
            <div className="mt-4 text-[#fbf8f2]">
              <AnswerBlock id="a6" item={page.answers.a6} tone="glow" />
            </div>
            {insertAfter?.a6}
          </div>
          <div className="lg:col-span-8">
            <p className="ed-kicker mb-5">Hva slags bygg, og hvordan brukes det?</p>
            <ClarifyPath tone="glow" />
          </div>
        </div>
      </section>

      <section id="spor" className="ed-paper scroll-mt-28 sm:scroll-mt-32">
        <div className="ed-wrap grid gap-8 lg:grid-cols-12">
          <div className="plan-read plan-float lg:col-span-6">
            <p className="ed-kicker">Kan dokumentene svare?</p>
            <div className="mt-4">
              <AnswerBlock id="a7" item={{ ...page.answers.a7, photo: undefined }} tone="paper" />
            </div>
            {insertAfter?.a7}
          </div>
          <div className="plan-read plan-float lg:col-span-6">
            <p className="ed-kicker">Når må noen komme hit?</p>
            <div className="mt-4">
              <AnswerBlock id="a8" item={{ ...page.answers.a8, photo: undefined }} tone="paper" />
            </div>
            {insertAfter?.a8}
            <PlanPlate
              className="mt-8"
              src={page.answers.a8.photo?.src ?? stills.anlegg}
              alt={page.answers.a8.photo?.alt ?? "Befaring når bygget må ses"}
              caption="Fysisk når dokumentene ikke kan svare alene."
              sizes="(max-width: 1024px) 100vw, 50vw"
              ratio="wide"
            />
          </div>
        </div>
      </section>

      <section id="neste" className="ed-ink join-footer scroll-mt-28 sm:scroll-mt-32">
        <div className="ed-wrap">
          <p className="ed-kicker mb-8">Hva gjør vi nå?</p>
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="plan-read plan-read-ink plan-float lg:col-span-6">
              <AnswerBlock id="a9" item={page.answers.a9} tone="glow" />
              {insertAfter?.a9}
            </div>
            <div className="plan-read plan-read-ink plan-float lg:col-span-6">
              <AnswerBlock id="a10" item={page.answers.a10} tone="glow" />
              {insertAfter?.a10}
            </div>
          </div>
          <article id="a11" className="plan-read plan-read-ink plan-float mt-8">
            <h2 className="max-w-3xl text-3xl font-normal text-[#fbf8f2] sm:text-5xl">
              Hva gjør vi nå?
            </h2>
            <p className="mt-6 max-w-2xl text-lg font-normal leading-relaxed text-[#fbf8f2]">
              {page.answers.a11.answer}
            </p>
            {page.answers.a11.detail ? (
              <p className="mt-4 max-w-2xl text-[15px] font-normal leading-relaxed text-[#fbf8f2]/80">
                {page.answers.a11.detail}
              </p>
            ) : null}
            {insertAfter?.a11}
            <SectionCta action={page.cta.action} href={page.cta.href} tone="dark" />
            {page.related?.length ? (
              <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {page.related.map((rel) => (
                  <li key={rel.href}>
                    <Link href={rel.href} className="text-[#fbf8f2] underline decoration-[#c62e32]/60 hover:text-[#c62e32]">
                      {rel.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
            <p className="mt-12 max-w-xl text-sm font-normal leading-relaxed text-[#fbf8f2]/75">{page.disclaimer}</p>
          </article>
        </div>
      </section>
    </>
  );
}
