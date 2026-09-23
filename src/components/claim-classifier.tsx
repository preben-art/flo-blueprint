"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import { classifyClaim, defaultTool, type ToolConfig } from "@/content/tool";

export function ClaimClassifier() {
  const [tool, setTool] = useState<ToolConfig>({
    intro: defaultTool.intro,
    disclaimer: defaultTool.disclaimer,
    classes: defaultTool.classes.map((klass) => ({ ...klass, keywords: [...klass.keywords] })),
  });
  const [claim, setClaim] = useState("");
  const [source, setSource] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let live = true;
    fetch("/api/desk/tool")
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { tool?: ToolConfig } | null) => {
        if (live && data?.tool?.classes?.length) setTool(data.tool);
      })
      .catch(() => undefined);
    return () => { live = false; };
  }, []);
  const result = useMemo(() => classifyClaim(source, tool.classes), [source, tool.classes]);
  const klass = tool.classes.find((item) => item.id === result) ?? tool.classes.at(-1);

  return (
    <div className="claim-workspace">
      <form className="claim-form" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
        <p className="story-eyebrow">Start med det dere har</p>
        <h3>Hva har dere fått beskjed om?</h3>
        <p className="claim-help">Skriv inn beskjeden og hvor den kommer fra. Du får en første sortering av kilden og hjelp til neste steg.</p>
        <div>
          <Label htmlFor="claim">Beskjeden eller tiltaket</Label>
          <Textarea id="claim" value={claim} onChange={(e) => { setClaim(e.target.value); setDone(false); }} placeholder="For eksempel: Vi har fått beskjed om å oppgradere brannalarmanlegget." required maxLength={4000} />
        </div>
        <div>
          <Label htmlFor="source">Hvem sier det – og hvilket dokument viser de til?</Label>
          <Input id="source" value={source} onChange={(e) => { setSource(e.target.value); setDone(false); }} placeholder="For eksempel: rådgiver, tilsynsrapport eller tilbud" required maxLength={1000} />
          <p className="claim-field-hint">Mangler du kilden? Skriv «vet ikke».</p>
        </div>
        <Button type="submit">Se hva dere bør avklare <span aria-hidden="true">↗</span></Button>
        <p className="claim-field-hint">Teksten sendes ikke til FLO når du bruker verktøyet.</p>
      </form>
      <aside className="claim-guidance" aria-live="polite" aria-atomic="true">
        {done && klass ? <>
          <p className="story-eyebrow">Din første sortering</p>
          <h3>{klass.id === "uklart" ? "Vi trenger kilden for å komme videre." : `Kilden peker mot: ${klass.label.toLowerCase()}.`}</h3>
          <p>{klass.meaning}</p>
          <p className="claim-result-note">Dette er et treff på ord i kildefeltet. Verktøyet har ikke vurdert dokumentet eller om tiltaket gjelder deres bygg.</p>
          <blockquote>{claim}</blockquote>
          <h4>La FLO se på grunnlaget.</h4>
          <p>Ta med beskjeden og dokumentet til en faglig gjennomgang. Da kan vi avklare hva som gjelder, og hva dere bør gjøre videre.</p>
          <Link href="/kontakt?situasjon=uklart" className="story-link">Få saken vurdert av FLO <span aria-hidden="true">↗</span></Link>
        </> : <>
          <p className="story-eyebrow">Før dere bestiller tiltak</p>
          <h3>Et tydelig grunnlag.<br /><span>Et tryggere neste steg.</span></h3>
          <p>Et krav, en anbefaling og et prosjektvalg kan høres like ut. Start med å finne ut hva beskjeden bygger på.</p>
          <ol className="claim-steps">
            <li><span>01</span><div><h4>Finn beskjeden</h4><p>Rapporten, e-posten eller tilbudet dere har fått.</p></div></li>
            <li><span>02</span><div><h4>Se på kilden</h4><p>Hvem står bak, og hva viser de til?</p></div></li>
            <li><span>03</span><div><h4>Avklar veien videre</h4><p>FLO kan lese underlaget opp mot deres bygg.</p></div></li>
          </ol>
          <Link href="/kontakt?situasjon=uklart" className="story-link">Vil du heller snakke med oss? <span aria-hidden="true">↗</span></Link>
        </>}
      </aside>
      <details className="claim-explainer"><summary>Hva betyr kategoriene, og hvordan fungerer verktøyet?</summary><p>{tool.intro}</p><ul>{tool.classes.map(item => <li key={item.id}><strong>{item.label}.</strong> {item.meaning}</li>)}</ul><p>{tool.disclaimer}</p></details>
    </div>
  );
}
