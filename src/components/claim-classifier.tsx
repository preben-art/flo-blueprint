"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/form-fields";
import { documentOptions, getClaimGuidance } from "@/content/claim-guidance";

export function ClaimClassifier() {
  const [documentType, setDocumentType] = useState("");
  const [claim, setClaim] = useState("");
  const [source, setSource] = useState("");
  const [done, setDone] = useState(false);

  const result = getClaimGuidance(documentType);

  return (
    <div className="claim-workspace">
      <form className="claim-form" onSubmit={(e) => { e.preventDefault(); if (claim.trim() && documentType) setDone(true); }}>
        <p className="story-eyebrow">Start med det dere har</p>
        <h3>Hva har dere fått beskjed om?</h3>
        <p className="claim-help">Velg hva slags dokument dere har fått. Da får dere en sjekkliste for hva dere bør undersøke før saken tas videre.</p>
        <div>
          <Label htmlFor="claim">Beskjeden eller tiltaket</Label>
          <Textarea id="claim" value={claim} onChange={(e) => { setClaim(e.target.value); setDone(false); }} placeholder="For eksempel: Vi har fått beskjed om å oppgradere brannalarmanlegget." required maxLength={4000} />
        </div>
        <div>
          <Label htmlFor="document-type">Hva slags beskjed har dere fått?</Label>
          <select id="document-type" required value={documentType} onChange={(e) => { setDocumentType(e.target.value); setDone(false); }} className="min-h-11 w-full rounded-md border border-flo-ink bg-[#fbf8f2] px-3 py-3 text-base text-flo-ink focus-visible:outline-2 focus-visible:outline-flo-red">
            <option value="" disabled>Velg dokumenttype</option>
            {documentOptions.map(option => <option key={option.id} value={option.id}>{option.label}</option>)}
          </select>
        </div>
        <div>
          <Label htmlFor="source">Avsender eller dokumentnavn (valgfritt)</Label>
          <Input id="source" value={source} onChange={(e) => { setSource(e.target.value); setDone(false); }} placeholder="For eksempel: rådgiver, tilsynsrapport eller tilbud" maxLength={1000} />
          <p className="claim-field-hint">Skriv det dere vet. La feltet stå tomt hvis dere er usikre.</p>
        </div>
        <Button type="submit">Se hva dere bør avklare <span aria-hidden="true">↗</span></Button>
        <p className="claim-field-hint">Svarene følger dokumenttypen du velger. Friteksten analyseres ikke og sendes ikke til FLO.</p>
      </form>
      <aside className="claim-guidance" aria-live="polite" aria-atomic="true">
        {done ? <>
          <p className="story-eyebrow">Dette bør dere undersøke</p>
          <h3>{result.title}</h3>
          <p>{result.description}</p>
          <ol className="claim-steps">{result.checks.map((check, index) => <li key={check}><span>{String(index + 1).padStart(2, "0")}</span><p>{check}</p></li>)}</ol>
          <blockquote>{claim}{source.trim() && <footer className="mt-2 text-sm">Oppgitt kilde: {source}</footer>}</blockquote>
          <p className="claim-result-note">Dette er en sjekkliste, ikke en vurdering av dokumentet eller en konklusjon om hva som gjelder deres bygg.</p>
          <h4 className="mt-6">Vil dere ha en faglig avklaring?</h4>
          <p>Ta med beskjeden og underlaget til FLO. Vi kan vurdere dokumentasjonen opp mot bygget og hjelpe dere med neste steg.</p>
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
      <details className="claim-explainer"><summary>Hvordan fungerer veiviseren?</summary><p>Du får en sjekkliste basert på dokumenttypen du selv velger. Verktøyet leser ikke dokumenter og avgjør ikke om et tiltak er lovpålagt. For en konkret vurdering trenger FLO underlaget og opplysninger om bygget.</p><p>Bakgrunn: <a className="underline" href="https://www.dsb.no/brannsikkerhet/ofte-stilte-sporsmal-til-forskrift-om-brannforebygging/" target="_blank" rel="noreferrer">DSBs spørsmål og svar om brannforebygging</a>.</p></details>
    </div>
  );
}
