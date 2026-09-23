export const icpQuestions = {
  "eier-forvalter": [
    { q: "Har vi kontroll på brannsikkerheten i bygget?", href: "/fag-og-kunnskap/stemmer-dokumentasjonen" },
    { q: "Stemmer dokumentasjonen med faktisk bygg?", href: "/fag-og-kunnskap/stemmer-dokumentasjonen" },
    { q: "Hva må vi kontrollere når vi overtar et bygg?", href: "/fag-og-kunnskap/overtakelse" },
    { q: "Hva gjør vi når ny leietaker kommer inn?", href: "/fag-og-kunnskap/hva-har-endret-seg" },
    { q: "Hvem har ansvar, eier eller leietaker?", href: "/fag-og-kunnskap/eier-eller-bruker" },
    { q: "Vi har fått avvik. Hva gjør vi først?", href: "/fag-og-kunnskap/vi-har-fatt-avvik" },
    { q: "Må gammelt bygg oppgraderes?", href: "/fag-og-kunnskap/gammel-dokumentasjon" },
    { q: "Hvordan prioriterer vi brannrisiko i mange bygg?", href: "/hvem-er-du/eier-forvalter" },
  ],
  kommune: [
    { q: "Kan vi vise, bygg for bygg, hva som gjelder?", href: "/hvem-er-du/kommune" },
    { q: "Hvordan prioriterer vi avvik på tvers av mange bygg?", href: "/fag-og-kunnskap/vi-har-fatt-avvik" },
    { q: "Hvem har ansvaret i formålsbygg?", href: "/fag-og-kunnskap/eier-eller-bruker" },
    { q: "Hvilken opplæring trenger ansatte?", href: "/losninger/brannvernradgivning" },
  ],
  "arkitekt-byggherre": [
    { q: "Når bør RIBr inn?", href: "/fag-og-kunnskap/nar-ma-ribr-inn" },
    { q: "Hva må avklares før planlåsen?", href: "/situasjon/endres" },
    { q: "Brannkonsept eller detaljprosjektering?", href: "/fag-og-kunnskap/brannkonsept-eller-prosjektering" },
    { q: "Hva skal følge bygget ved overtakelse?", href: "/fag-og-kunnskap/overtakelse" },
  ],
  entreprenor: [
    { q: "Er dette et krav eller et prosjektvalg?", href: "/fag-og-kunnskap/pastand-eller-krav" },
    { q: "Hva gjør vi dersom bygg og tegning ikke stemmer?", href: "/fag-og-kunnskap/stemmer-dokumentasjonen" },
    { q: "Må RIBr godkjenne løsningen?", href: "/fag-og-kunnskap/nar-ma-ribr-inn" },
    { q: "Hva må dokumenteres når arbeidet er gjort?", href: "/losninger/brannteknisk-utforelse" },
  ],
  "industri-kraft": [
    { q: "Endrer nytt utstyr brannrisikoen?", href: "/fag-og-kunnskap/hva-har-endret-seg" },
    { q: "Matcher dokumentert nivå driften vi har nå?", href: "/fag-og-kunnskap/stemmer-dokumentasjonen" },
    { q: "Må beredskapen endres når produksjonen endres?", href: "/fag-og-kunnskap/hva-har-endret-seg" },
  ],
  "virksomhet-bruker": [
    { q: "Har vi kontroll, eller bare papirer?", href: "/hvem-er-du/virksomhet-bruker" },
    { q: "Hvem har ansvaret, eier eller vi?", href: "/fag-og-kunnskap/eier-eller-bruker" },
    { q: "Hva skal vi dokumentere som bruker?", href: "/fag-og-kunnskap/eier-eller-bruker" },
  ],
  privat: [
    { q: "Kan jeg bruke kjelleren som soverom eller utleie?", href: "/fag-og-kunnskap/utleiedel" },
    { q: "Når blir en endring søknadspliktig?", href: "/fag-og-kunnskap/hva-har-endret-seg" },
    { q: "Kan dette vurderes digitalt først?", href: "/fag-og-kunnskap/hva-kan-avklares-digitalt" },
    { q: "Hvem har ansvar i en utleiebolig?", href: "/fag-og-kunnskap/eier-eller-bruker" },
    { q: "Må FLO komme på befaring?", href: "/fag-og-kunnskap/hva-kan-avklares-digitalt" },
  ],
} as const;

export const icpBuying = {
  "eier-forvalter": {
    problems: ["Dokumentasjon og bruk treffer ikke", "Avvik vandrer mellom eier og bruker", "Ny leietaker uten avklart forutsetning"],
    moment: "Tilsyn, overtakelse, leietakerskifte, porteføljegap",
    evidence: "Konsept, tegninger, avvik, kontrakt",
    service: "brannvernradgivning",
    mode: "digitalt",
    cta: "Få oversikt over porteføljen",
  },
  kommune: {
    problems: ["Mange bygg, tynn sporbarhet", "Tilsyn uten samlet program"],
    moment: "Tilsyn, årshjul, personskifte",
    evidence: "Per bygg: dokumentasjon og tilsyn",
    service: "brannvernradgivning",
    mode: "digitalt",
    cta: "Få oversikt over bygningsmassen",
  },
  "arkitekt-byggherre": {
    problems: ["Brann kommer etter planlås", "Anbud uten ytelse"],
    moment: "Før plan og anbud",
    evidence: "Plan, bruk, persontall, eksisterende konsept",
    service: "ribr",
    mode: "digitalt",
    cta: "Avklar før anbudet går ut",
  },
  entreprenor: {
    problems: ["«Må» uten kilde", "Bygg og tegning matcher ikke"],
    moment: "Anleggsmøte, endring, avvik i utførelse",
    evidence: "Det som er sagt, tegning, observert",
    service: "ribr",
    mode: "hybrid",
    cta: "Få vurdert hva som faktisk gjelder",
  },
  "industri-kraft": {
    problems: ["Ny drift mot gammelt konsept"],
    moment: "Nytt utstyr, endret produksjon",
    evidence: "Prosess, konsept, tegninger",
    service: "ribr",
    mode: "hybrid",
    cta: "Avklar før driften endres",
  },
  "virksomhet-bruker": {
    problems: ["Perm uten spor", "Uklart eier/bruker-skille"],
    moment: "Tilsyn mot virksomheten, ny drift",
    evidence: "Internkontroll, øvelse, kontrakt",
    service: "brannvernradgivning",
    mode: "digitalt",
    cta: "Kartlegg roller og kompetanse",
  },
  privat: {
    problems: ["Utleiedel, kjeller, loft uten avklart rømning og skille"],
    moment: "Før ombygging, etter tilsyn, før utleie",
    evidence: "Tegning, bilder, planlagt bruk",
    service: "ribr",
    mode: "digitalt",
    cta: "Send inn tegninger eller bilder",
  },
} as const;

export const gaps = [
  {
    id: "answered",
    label: "Svart i fagkilden",
    items: [
      "Påstand eller krav",
      "Eier eller bruker",
      "Endring",
      "Dokumentasjon mot bygg",
      "Avvik, hva nå",
      "Gammel dokumentasjon",
      "Konsept vs detalj",
      "Når RIBr inn",
      "Digitalt eller befaring",
      "Overtakelse",
      "Utleiedel (eget spor)",
    ],
  },
  {
    id: "weak",
    label: "Tynt, ikke oppdiktet",
    items: ["Prosjekteffekt", "3D-skanning som eget produkt", "Privat som bekreftet marked", "Kommune-case", "Øvelse per rolle i dybden"],
  },
  {
    id: "missing",
    label: "Ikke bygd som egne noder ennå",
    items: ["Porteføljeprioritering i dybden", "GMB-feed som automatisk kanal", "Opplæring per rolle som egen node"],
  },
  {
    id: "evidence",
    label: "EVIDENCE_REQUIRED",
    items: ["Privat som FLO-hovedmarked", "Bremanger som branncase", "Passiv brannsikring «alle områder»", "3D som FLO-hovedytelse"],
  },
] as const;

export const articleMap = [
  { pillar: true, title: "Påstand eller krav", href: "/fag-og-kunnskap/pastand-eller-krav" },
  { pillar: true, title: "Eier eller leietaker", href: "/fag-og-kunnskap/eier-eller-bruker" },
  { pillar: true, title: "Hva har endret seg", href: "/fag-og-kunnskap/hva-har-endret-seg" },
  { pillar: true, title: "Stemmer dokumentasjonen", href: "/fag-og-kunnskap/stemmer-dokumentasjonen" },
  { pillar: true, title: "Vi har fått avvik", href: "/fag-og-kunnskap/vi-har-fatt-avvik" },
  { pillar: false, title: "Når bruken endres", href: "/fag-og-kunnskap/nar-bruken-endres" },
  { pillar: false, title: "Konsept eller detalj", href: "/fag-og-kunnskap/brannkonsept-eller-prosjektering" },
  { pillar: false, title: "Når må RIBr inn", href: "/fag-og-kunnskap/nar-ma-ribr-inn" },
  { pillar: false, title: "Gammel dokumentasjon", href: "/fag-og-kunnskap/gammel-dokumentasjon" },
  { pillar: false, title: "3D-skanning i eksisterende bygg", href: "/fag-og-kunnskap/3d-skanning" },
  { pillar: false, title: "Overtakelse", href: "/fag-og-kunnskap/overtakelse" },
  { pillar: false, title: "Digitalt eller befaring", href: "/fag-og-kunnskap/hva-kan-avklares-digitalt" },
  { pillar: false, title: "NS 3924", href: "/fag-og-kunnskap/ns-3924" },
  { pillar: false, title: "Flere krav, samme bygg", href: "/fag-og-kunnskap/flere-krav-samme-bygg" },
  { pillar: true, title: "Utleiedel, privat spor", href: "/fag-og-kunnskap/utleiedel" },
] as const;

export const clusters = [
  {
    id: "avvik",
    pillar: "/fag-og-kunnskap/vi-har-fatt-avvik",
    questions: [
      "Hva er et brannavvik?",
      "Vi har fått avvik, hva gjør vi?",
      "Hvem har ansvar for å lukke avvik?",
      "Er tiltaket påkrevd?",
      "Finnes alternativ løsning?",
      "Hvor raskt må det lukkes?",
      "Hva må dokumenteres?",
      "Når trenger vi RIBr?",
      "Må det gjøres fysisk kontroll?",
    ],
  },
  {
    id: "ansvar",
    pillar: "/fag-og-kunnskap/eier-eller-bruker",
    questions: [
      "Hvem har ansvar, eier eller leietaker?",
      "Hva skal eier dokumentere?",
      "Hva skal bruker dokumentere?",
      "Kan kontrakten flytte plikten?",
    ],
  },
  {
    id: "endring",
    pillar: "/fag-og-kunnskap/hva-har-endret-seg",
    questions: [
      "Ny leietaker, hva må vurderes?",
      "Når er det bruksendring?",
      "Endrer persontall kravet?",
      "Må konseptet oppdateres?",
    ],
  },
  {
    id: "privat",
    pillar: "/fag-og-kunnskap/utleiedel",
    questions: [
      "Kan jeg bruke kjelleren som soverom?",
      "Hva kreves for utleiedel?",
      "Når blir endringen søknadspliktig?",
      "Må jeg ha brannskille mellom boenheter?",
      "Hva gjelder for rømning?",
      "Kan dette vurderes digitalt først?",
    ],
  },
] as const;
