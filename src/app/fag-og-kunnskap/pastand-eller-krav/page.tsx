import { AnswerStack } from "@/components/answer-stack";
import { ClaimClassifier } from "@/components/claim-classifier";
import { claimAnswers, firstSentence } from "@/content/answers";
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
      afterHero={
        <section className="portfolio-paper claim-section" id="avklar-beskjeden" aria-labelledby="claim-heading">
          <div className="portfolio-wrap">
            <div className="claim-intro"><p className="story-eyebrow">Fra usikkerhet til neste steg</p><h2 id="claim-heading" className="story-heading">Må dere gjøre det?<br /><span>Avklar før dere bestiller.</span></h2><p>Har dere fått beskjed om et branntiltak? Få oversikt over kilden først – og ta saken videre med FLO når dokumentene må vurderes.</p></div>
            <ClaimClassifier />
          </div>
        </section>
      }
    />
  );
}
