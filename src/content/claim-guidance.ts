export const documentOptions = [
  { id: "vedtak", label: "Vedtak eller pålegg fra en myndighet" },
  { id: "tilsyn", label: "Tilsynsrapport" },
  { id: "fagrapport", label: "Rapport eller råd fra en fagperson" },
  { id: "tilbud", label: "Tilbud fra en leverandør" },
  { id: "muntlig", label: "Muntlig beskjed eller e-post uten dokumentasjon" },
  { id: "ukjent", label: "Jeg er usikker / har ikke dokumentet" },
] as const;

export type DocumentType = typeof documentOptions[number]["id"];
type Guidance = { title: string; description: string; checks: readonly string[] };
const guidance: Record<DocumentType, Guidance> = {
  vedtak: {
    title: "Start med vedtaket og fristen.",
    description: "Du har oppgitt at beskjeden er et vedtak eller pålegg. Ordlyden og hjemmelen må leses for å avklare hva dere er pålagt å gjøre.",
    checks: ["Finn vedtaket i sin helhet, med avsender, dato og eventuelle vedlegg.", "Se hvilket bygg og hvilke forhold vedtaket gjelder, hva som kreves rettet, og hvilken frist som er satt.", "Kontakt myndigheten hvis ordlyden eller fristen er uklar. En henvendelse til FLO endrer ikke en fastsatt frist."],
  },
  tilsyn: {
    title: "Skill avvikene fra anbefalingene.",
    description: "En tilsynsrapport kan inneholde både avvik og merknader. Det er innholdet og henvisningene i rapporten som må undersøkes.",
    checks: ["Finn hvert avvik og regelen rapporten viser til.", "Se etter frist for tilbakemelding og om det følger et eget varsel eller vedtak.", "Samle brannkonsept, tegninger og tidligere dokumentasjon som belyser forholdene i rapporten."],
  },
  fagrapport: {
    title: "Be om grunnlaget for anbefalingen.",
    description: "Et faglig råd kan være viktig for brannsikkerheten. Avklar hvilke krav, forutsetninger og observasjoner vurderingen bygger på.",
    checks: ["Be om henvisningen til regelverk, brannkonsept eller dokumentert mangel.", "Kontroller at vurderingen tar utgangspunkt i byggets faktiske bruk og tilstand.", "Be fagpersonen skille mellom nødvendige tiltak, anbefalte forbedringer og mulige løsninger."],
  },
  tilbud: {
    title: "Avklar behovet før dere bestiller.",
    description: "Et tilbud beskriver en leveranse. Tilbudet alene avgjør ikke om akkurat denne løsningen er et krav for bygget.",
    checks: ["Be leverandøren vise hvilket dokumentert behov tilbudet skal løse.", "Finn rapporten, brannkonseptet eller vedtaket det eventuelt henvises til.", "Avklar om andre løsninger kan ivareta samme behov, og hva som inngår i dokumentasjonen etter utført arbeid."],
  },
  muntlig: {
    title: "Få beskjeden og begrunnelsen skriftlig.",
    description: "En kort beskjed gir ofte for lite grunnlag til å avgjøre hva som gjelder. Be om dokumentasjonen bak tiltaket.",
    checks: ["Noter hvem som ga beskjeden, når og hvilket bygg eller forhold den gjelder.", "Be om en skriftlig forklaring med henvisning til kravet eller vurderingen.", "Opplys om eventuelle frister eller konkrete sikkerhetsproblemer når dere tar kontakt."],
  },
  ukjent: {
    title: "Finn grunnlaget – vi hjelper dere videre.",
    description: "Dere trenger ikke ha alt klart for å ta kontakt. Start med beskjeden dere har fått og det dere vet om bygget.",
    checks: ["Finn e-posten, rapporten eller navnet på den som ga beskjeden, hvis dere har det.", "Noter byggets adresse, hvordan det brukes og hva dere er usikre på.", "Ta med eventuelle frister. FLO kan hjelpe dere med å avklare hvilket underlag som trengs."],
  },
};

// Only an explicit choice selects guidance. Free text never proves a legal requirement.
export function getClaimGuidance(documentType: string): Guidance {
  return Object.prototype.hasOwnProperty.call(guidance, documentType)
    ? guidance[documentType as DocumentType]
    : guidance.ukjent;
}
