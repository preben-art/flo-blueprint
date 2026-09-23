import { AnswerStack } from "@/components/answer-stack";
import { ClaimClassifier } from "@/components/claim-classifier";
import { StillFrame } from "@/components/still-frame";
import { claimAnswers, firstSentence } from "@/content/answers";
import { photoAlt, stills } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta(
  "Påstand eller krav?",
  firstSentence(claimAnswers.answers.a1.answer),
  "/fag-og-kunnskap/pastand-eller-krav",
);

export default function ClaimPage() {
  return (
    <AnswerStack
      page={claimAnswers}
      afterKrav={
        <section className="ed-paper">
          <div className="ed-wrap grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="plan-read plan-float min-w-0 lg:col-span-5">
              <p className="ed-kicker">Arbeidsverktøy</p>
              <h2 className="mt-4 max-w-md text-2xl font-normal sm:text-3xl">Lim inn det noen har sagt.</h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#221d19]">
                Klassene og treffordene styres fra redaksjonen, slik at FLO kan legge inn og justere verktøyet. Det er
                et arbeidsrom, ikke et vedtak. Treff på ord er heuristikk. En faktisk avklaring krever dokumentene.
              </p>
            </div>
            <figure className="min-w-0 lg:col-span-7">
              <StillFrame
                src={stills.tavle}
                alt={photoAlt[stills.tavle]}
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="aspect-[16/10]"
              />
              <figcaption className="plan-note">To leser underlaget. Klassen settes her, ikke i anleggsmøtet alene.</figcaption>
            </figure>
            <div className="min-w-0 rounded-[2px] border border-[#161210]/10 bg-[#fbf8f2] p-5 sm:p-8 lg:col-span-12">
              <ClaimClassifier />
              <p className="mt-6 text-sm leading-relaxed text-[#221d19]">
                <a href="/redaksjon" className="text-[#c62e32] hover:underline">
                  Åpne redaksjonen
                </a>
              </p>
            </div>
          </div>
        </section>
      }
    />
  );
}
