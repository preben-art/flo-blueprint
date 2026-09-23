export const processSteps = [
  {
    id: "bygg",
    label: "Hva slags bygg?",
    meaning: "Næring, overnatting, skole, industri. Hva ble det tegnet som, og hva er det i dag?",
  },
  {
    id: "bruk",
    label: "Hvordan brukes det?",
    meaning: "Faktisk bruk, ikke bare slik det sto i konseptet da bygget var nytt.",
  },
  {
    id: "dokumentasjon",
    label: "Hva er dokumentert?",
    meaning: "Hva finnes, hva mangler, og stemmer papirene med virkeligheten?",
  },
  {
    id: "ansvar",
    label: "Hvem har ansvaret?",
    meaning: "Eier, bruker, byggherre, prosjekterende og utførende. Hvem gjør hva i praksis?",
  },
  {
    id: "risiko",
    label: "Hva er risikoen?",
    meaning: "Hva kan gå galt i akkurat dette bygget, og hvor alvorlig er det?",
  },
  {
    id: "regelverk",
    label: "Hvilket regelverk?",
    meaning: "Hvilke krav treffer denne saken? TEK, forskrift om brannforebygging, internkontroll, tilsyn.",
  },
  {
    id: "krav",
    label: "Hva er kravet?",
    meaning: "Hva må oppfylles, skilt fra det som bare er sagt i et møte?",
  },
  {
    id: "alternativer",
    label: "Finnes andre løsninger?",
    meaning: "Kan kravet oppfylles på flere faglig forsvarlige måter?",
  },
  {
    id: "prioritering",
    label: "Hva gjør vi først?",
    meaning: "Hva haster, hva kan vente, og hva må dokumenteres når det er gjort?",
  },
] as const;

export const situationExplain = {
  papekt: {
    meaning:
      "Et tilsyn, et kontrollfunn eller et krav fra rådgiver betyr ikke automatisk at første foreslåtte tiltak er den eneste riktige løsningen.",
    problem:
      "Noen har pekt. Da er det lett å sette i gang det som ble sagt, uten å vite om det er krav, anbefaling eller et prosjektvalg.",
    clarify: [
      "Hva er faktisk observert?",
      "Hvilket bygg og hvilken bruk gjelder det?",
      "Hvilket regelverk eller grunnlag ligger bak?",
      "Er dette et absolutt krav, en anbefaling eller en faglig vurdering?",
      "Hvem har ansvaret?",
      "Finnes det alternative måter å oppfylle kravet på?",
      "Hva må dokumenteres når saken er løst?",
    ],
    afterAvvik: [
      "Hva betyr et avvik, for dette bygget, ikke generelt?",
      "Hvem har ansvaret for å lukke det?",
      "Er påstanden et krav eller en anbefaling?",
      "Hva må dokumenteres før, under og etter?",
      "Finnes det alternative tiltak?",
      "Når trenger vi RIBr?",
      "Når holder rådgivning?",
      "Når må det gjøres fysisk kontroll?",
      "Hva bør gjøres først, og hva kan vente?",
      "Hva må dokumenteres når avviket lukkes?",
    ],
    role: "FLO går gjennom situasjonen, dokumentasjonen og faggrunnlaget før tiltak bestemmes. Målet er ikke å gjøre mest mulig. Målet er å gjøre det som faktisk er nødvendig og riktig.",
    cta: "Få avklart avviket",
    href: "/kontakt?situasjon=papekt",
    nextNeed: [
      { from: "Avviket er lest digitalt", to: "Vurdere om fysisk kontroll trengs" },
      { from: "Tiltak er identifisert", to: "Prosjektering der det kreves" },
      { from: "Løsning er valgt", to: "Kontroll, utførelse og dokumentasjon" },
    ],
  },
  endres: {
    meaning:
      "Når et bygg skal bygges om, få ny bruk, ny leietaker, nytt utstyr eller endre drift, kan også forutsetningene for brannsikkerheten endres. Det som var riktig før endringen er ikke nødvendigvis tilstrekkelig etterpå.",
    problem:
      "Planløsning, tekniske valg og anbud går ofte ut før noen har spurt om konseptet, rømning og installasjoner fortsatt stemmer.",
    clarify: [
      "Endres bruken av bygget?",
      "Endres personbelastning eller rømningsforhold?",
      "Påvirkes brannceller eller seksjonering?",
      "Påvirkes tekniske installasjoner?",
      "Må eksisterende brannkonsept oppdateres?",
      "Kreves ny prosjektering eller dokumentasjon?",
      "Hvilke fag må involveres?",
    ],
    afterAvvik: [
      "Er dette nybygg, ombygging, tilbygg eller bruksendring?",
      "Matcher gjeldende konsept den planlagte bruken?",
      "Hva sier TEK17 kapittel 11 for dette tiltaket, og hva gjør det ikke?",
      "Når er brannkonsept og detaljprosjektering to ulike jobber?",
      "Hva må være avklart før anbud?",
      "Hvem eier premissene: byggherre, arkitekt, RIBr eller utførende?",
    ],
    role: "FLO kan komme inn før planløsning, tekniske løsninger og utførelse er tegnet ferdig, og avklare hvilke premisser prosjektet faktisk må bygge på.",
    cta: "Avklar før endring",
    href: "/kontakt?situasjon=endres",
    nextNeed: [
      { from: "Premissene er avklart", to: "Oppdatert brannkonsept der det trengs" },
      { from: "Konsept er valgt", to: "Detaljprosjektering og kontroll" },
      { from: "Prosjektet er ferdig", to: "Dokumentasjon til drift" },
    ],
  },
  uklart: {
    meaning:
      "Mange brannsikkerhetssaker starter ikke med et konkret avvik. De starter med usikkerhet om ansvar, krav, dokumentasjon og om noen i det hele tatt må komme på befaring.",
    problem:
      "Uten en tydelig situasjon er første trekk ofte å kjøpe et tiltak. Da betaler man for aktivitet, ikke for avklaring.",
    clarify: [
      "Hvem har egentlig ansvaret?",
      "Er dette et krav?",
      "Holder dokumentasjonen vi har?",
      "Må vi gjennomføre tiltaket?",
      "Kan vi velge en annen løsning?",
      "Må det komme en rådgiver på befaring?",
      "Kan noe av dette avklares digitalt?",
    ],
    afterAvvik: [
      "Hva er sagt, og av hvem?",
      "Finnes en kilde, lov, forskrift, konsept, tilsyn eller bare praksis?",
      "Hva vet vi om bygg, bruk og dokumentasjon i dag?",
      "Hva er minste steg som gjør saken tydelig?",
    ],
    role: "FLOs første jobb er da ikke å selge et tiltak. Den er å gjøre situasjonen tydelig.",
    cta: "Få en faglig avklaring",
    href: "/kontakt?situasjon=uklart",
    nextNeed: [
      { from: "Situasjonen er tydelig", to: "Klassifisere påstand mot krav" },
      { from: "Kravet er avklart", to: "Velge spor: digitalt, hybrid eller fysisk" },
      { from: "Spor er valgt", to: "Tiltak, dokumentasjon eller oppfølging" },
    ],
  },
} as const;

export const claimPath = [
  {
    id: "pastand",
    label: "Hva blir sagt?",
    meaning: "Hva blir hevdet?",
    examples: [
      "«Dette må bygges om.»",
      "«Dere må skifte hele løsningen.»",
      "«Dette er ikke lov.»",
      "«Brannvesenet krever dette.»",
    ],
  },
  {
    id: "fakta",
    label: "Hva vet vi?",
    meaning: "Hva vet vi faktisk om bygget, bruken, eksisterende løsning, dokumentasjonen, tiltaket og avviket?",
    examples: [
      "Bygg og bruk",
      "Eksisterende løsning",
      "Dokumentasjon som finnes",
      "Hva som er observert",
    ],
  },
  {
    id: "kilde",
    label: "Hva bygger det på?",
    meaning: "Hva bygger påstanden på?",
    examples: [
      "Lov og forskrift",
      "TEK og SAK",
      "Veiledning eller standard",
      "Brannkonsept, tilsyn eller annen faglig vurdering",
    ],
  },
  {
    id: "klasse",
    label: "Krav eller forslag?",
    meaning: "Skill krav, anbefaling og faglig vurdering før noe settes i gang.",
    examples: [
      "Krav, dette må oppfylles",
      "Anbefaling, god løsning, ikke nødvendigvis eneste måte",
      "Faglig vurdering, avhenger av bygg, risiko, bruk og situasjon",
    ],
  },
  {
    id: "alternativer",
    label: "Finnes andre løsninger?",
    meaning: "Hvis målet eller kravet kan oppfylles på flere måter, skal kunden forstå alternativene før tiltak settes i gang.",
    examples: ["Flere faglig forsvarlige veier", "Kostnad og fremdrift er ikke automatisk minstekrav"],
  },
  {
    id: "beslutning",
    label: "Hva gjør vi nå?",
    meaning: "Dere skal vite hva som gjelder, hvorfor, hva som haster, og hva som må dokumenteres.",
    examples: [
      "Hva som gjelder",
      "Hvilke alternativer som finnes",
      "Hva som må dokumenteres",
      "Hva kunden gjør nå",
    ],
  },
] as const;

export const deliveryTracks = [
  {
    id: "digitalt",
    label: "Digitalt",
    area: "Hele Norge",
    still: "/media/team.jpg",
    lead: "Når saken kan avklares med dokumentasjon, tegninger, bilder eller beskrivelse, starter vi der, uansett hvor i landet bygget ligger. Kurs og gjennomgang kan også tas digitalt.",
    value: "Kan dokumentene svare?",
    when: [
      "Gjennomgang av dokumentasjon",
      "Vurdering av brannkonsept eller tegninger",
      "Spørsmål om ansvar",
      "Krav versus anbefaling",
      "Second opinion",
      "Tilsyn og avvik som kan leses",
      "Innledende prosjektavklaring",
      "Teoretisk opplæring",
    ],
    cta: "Send rapporten eller tegningene",
    href: "/kontakt?spor=digitalt",
  },
  {
    id: "hybrid",
    label: "Hybrid",
    area: "Digitalt først, befaring der det trengs",
    still: "/media/tavle-laptop.jpg",
    lead: "Dokumentene gir oss mye av svaret, men ikke alt. Vi starter digitalt, også på tvers av landet, og avklarer nøyaktig hva som må ses i Nordvestlandet.",
    value: "Noe kan leses. Noe må ses.",
    when: [
      "Digital gjennomgang",
      "Identifisere usikkerhet",
      "Avklare fysisk behov",
      "Målrettet befaring",
      "Konkret løsning",
    ],
    cta: "Start digitalt, avklar fysisk behov",
    href: "/kontakt?spor=hybrid",
  },
  {
    id: "fysisk",
    label: "Fysisk",
    area: "Stryn · Nordfjordeid · Nordvestlandet",
    still: "/media/anlegg-gjennomgang.jpg",
    lead: "Befaring, kontroll og utførelse når dokumentasjonen ikke kan svare alene. Fysisk tilstedeværelse ut fra Stryn og Nordfjordeid, i Nordvestlandet.",
    value: "Når bygget må ses",
    when: [
      "Bygg må kontrolleres",
      "Dokumentasjon stemmer ikke med virkeligheten",
      "Risiko må vurderes på stedet",
      "Installasjoner må inspiseres",
      "Kartlegging, inkludert 3D-skanning der det er avtalt",
      "Utførelse og utbedring",
      "Praktisk opplæring og øvelse",
    ],
    cta: "Bestill befaring",
    href: "/kontakt?spor=fysisk",
  },
] as const;

export const customerExplain = {
  "eier-forvalter": {
    meaning:
      "Hvis du har ansvar for flere bygg, oppstår ofte problemet når dokumentasjonen, bruken og den faktiske tilstanden ikke lenger stemmer overens.",
    typical: [
      "Bygg er overtatt",
      "Ny leietaker kommer inn",
      "Lokalene bygges om",
      "Tilsyn avdekker mangler",
      "Dokumentasjonen er gammel",
      "Ulike bygg har ulik standard",
      "Tiltak er gjort over mange år",
    ],
    realQuestion:
      "Spørsmålet er ikke bare om bygget har slokkeutstyr. Spørsmålet er om vi vet hva som faktisk gjelder for dette bygget, og om vi kan dokumentere at det er ivaretatt.",
    floHelps: ["Status", "Dokumentasjon", "Risikovurdering", "Prioritering", "Kontroll", "Oppfølging"],
    nextNeed: [
      { from: "Porteføljen har gap", to: "Årlig program eller rammeavtale" },
      { from: "Dokumentasjon mangler", to: "Kartlegging, eventuelt fysisk når papirene ikke holder" },
    ],
    cta: "Få oversikt over porteføljen",
    href: "/kontakt?situasjon=uklart&hvem=eier-forvalter",
    applies: "Du skal vite, per bygg, hva som gjelder og om det kan dokumenteres.",
  },
  "virksomhet-bruker": {
    meaning:
      "Du har ansvar for mennesker i bygget hver dag. Da holder det ikke å arve en perm. Internkontrollen må treffe faktisk bruk.",
    typical: [
      "Usikkert skille mellom eiers og brukers plikter",
      "Øvelse som ikke matcher risikoen",
      "Ny drift i gamle lokaler",
      "Tilsyn mot virksomheten",
    ],
    realQuestion: "Har vi kontroll, og kan vi vise det, eller har vi bare papirer?",
    floHelps: ["Internkontroll", "Rutiner", "Opplæring", "Øvelse", "Oppfølging"],
    nextNeed: [
      { from: "Kompetansegap er synlig", to: "Opplæring tilpasset roller" },
      { from: "Opplæring er gjennomført", to: "Øvelse og spor i internkontrollen" },
    ],
    cta: "Kartlegg roller og kompetanse",
    href: "/kontakt?situasjon=uklart&hvem=virksomhet-bruker",
    applies: "Du skal kunne vise internkontroll mot faktisk bruk, ikke bare en perm.",
  },
  "arkitekt-byggherre": {
    meaning:
      "Brannkrav som kommer etter at planløsning og anbud er ferdige, blir dyre. FLO bør inn før premissene er støpt inn.",
    typical: ["Ombygging uten oppdatert konsept", "Anbud uten brannteknisk underlag", "Bruksendring behandlet som interiør"],
    realQuestion: "Hvilke premisser må prosjektet bygge på, før vi tegner ferdig?",
    floHelps: ["Tidlig avklaring", "Brannkonsept", "Grensesnitt mot øvrige fag"],
    nextNeed: [{ from: "Konsept er avklart", to: "Detaljprosjektering og uavhengig kontroll der det kreves" }],
    cta: "Avklar før anbudet går ut",
    href: "/kontakt?situasjon=endres&hvem=arkitekt-byggherre",
    applies: "Du skal kjenne brannpremissene før planløsning og anbud er ferdige.",
  },
  entreprenor: {
    meaning:
      "Når andre fag sier at «dette må gjøres», trenger utførende et avklart krav, ikke en ny påstand i anleggsmøtet.",
    typical: ["Påstand fra rådgiver", "Endring i eksisterende bygg", "Uklart om tiltaket er nødvendig"],
    realQuestion: "Er tiltaket et krav, eller et prosjektvalg vi kan dokumentere annerledes?",
    floHelps: ["Second opinion", "Avklart ytelse", "Dokumentasjon av utført arbeid"],
    nextNeed: [{ from: "Kravet er avklart", to: "Utførelse og sporbar dokumentasjon" }],
    cta: "Få vurdert hva som faktisk gjelder",
    href: "/kontakt?situasjon=papekt&hvem=entreprenor",
    applies: "Du skal ha et avklart krav, ikke en ny påstand i anleggsmøtet.",
  },
  "industri-kraft": {
    meaning:
      "Endret drift og nytt utstyr endrer ofte risiko. Da er det gamle konseptet en hypotese, ikke et svar.",
    typical: ["Nytt utstyr", "Endret produksjon", "Gamle tegninger mot ny virkelighet"],
    realQuestion: "Matcher dokumentert nivå den driften vi faktisk har nå?",
    floHelps: ["Vurdering av endret risiko", "Oppdatert underlag", "Prioritert tiltak"],
    nextNeed: [{ from: "Risiko er endret", to: "Oppdatert konsept eller internkontroll" }],
    cta: "Avklar før driften endres",
    href: "/kontakt?situasjon=endres&hvem=industri-kraft",
    applies: "Du skal vite om dokumentert nivå matcher driften dere har nå.",
  },
  kommune: {
    meaning:
      "Offentlige bygg har tilsyn, mange brukere og internkontroll som skal tåle utskifting av folk. Kapasitet og sporbarhet er ofte flaskehalsen.",
    typical: ["Tilsyn", "Mange formålsbygg", "Behov for årlig program"],
    realQuestion: "Kan vi vise, bygg for bygg, hva som gjelder og hva som er gjort?",
    floHelps: ["Status per bygg", "Årlig program", "Dokumentasjon som overlever personskifte"],
    nextNeed: [{ from: "Flere bygg har gap", to: "Program og oppfølging, ikke enkeltstående brannøvelser" }],
    cta: "Få oversikt over bygningsmassen",
    href: "/kontakt?situasjon=uklart&hvem=kommune",
    applies: "Du skal kunne vise, bygg for bygg, hva som gjelder og hva som er gjort.",
  },
  privat: {
    meaning:
      "Du eier eller skal leie ut del av boligen. Da er spørsmålet hva som faktisk skal endres, ikke hvilket produkt FLO selger. Privat er et eget spor.",
    typical: [
      "Kjeller som soverom eller utleie",
      "Loft som egen boenhet",
      "Bruksendring uten at noen har sagt at det er søknad",
      "Tilsyn eller usikkerhet etter kontroll",
      "Manglende tegninger",
    ],
    realQuestion: "Hva må avklares før kjeller, loft eller utleiedel tas i bruk?",
    floHelps: ["Digital førstegangsvurdering", "Avklare om befaring trengs", "RIBr når tiltaket krever det"],
    nextNeed: [
      { from: "Tegninger og bilder er sendt", to: "Første lesning av bruk, rømning og skille" },
      { from: "Usikkerheten krever syn", to: "Befaring, ikke automatisk første steg" },
    ],
    cta: "Send inn tegninger eller bilder",
    href: "/kontakt?situasjon=endres&hvem=privat",
    applies: "Du skal vite hva som må avklares før rommet tas i bruk som egen boenhet.",
  },
} as const;

export const serviceExplain = {
  brannvernradgivning: {
    directAnswer:
      "Først avklarer vi hva som faktisk gjelder i bygget. Deretter bygger vi dokumentasjon, rutiner og oppfølging slik at eier og bruker kan styre selv.",
    questions: [
      "Holder internkontrollen mot faktisk bruk?",
      "Hvem har ansvaret, eier, bruker, eller begge i praksis?",
      "Hvilken dokumentasjon mangler, og hva er utdatert?",
      "Når holder rådgivning, og når trenger vi RIBr?",
      "Når er opplæring og øvelse det som trengs, ikke mer papir?",
    ],
    role: "Du beholder styringen. FLO kartlegger, foreslår og følger opp. Vi starter ikke utførelse uten at du velger det.",
    nextNeed: [
      { from: "Dokumentasjon mangler", to: "Kartlegging, tegninger, eventuelt fysisk når papirene ikke stemmer" },
      { from: "Kompetansegap", to: "Opplæring og øvelse" },
      { from: "Portefølje med gap", to: "Årlig program" },
    ],
    cta: "Send rapporten eller tegningene",
    href: "/kontakt?spor=digitalt&fag=brannvernradgivning",
  },
  ribr: {
    directAnswer:
      "Brannkonseptet sier hva som skal til. Detaljprosjekteringen sier hvordan. Uavhengig kontroll sjekker grunnlaget. FLO skiller de tre før tiltak settes i gang.",
    questions: [
      "Trenger vi oppdatert brannkonsept, eller holder det eksisterende?",
      "Er påstanden i prosjektet et krav eller et prosjektvalg?",
      "Hva gjør TEK17 for dette tiltaket, og hva gjør den ikke?",
      "Når kreves uavhengig kontroll?",
      "Hvilke ytelser må være avklart før anbud?",
    ],
    role: "Sentral godkjenning som prosjekterende brannkonsept i tiltaksklasse 3, og som uavhengig kontrollerende brannsikkerhet i tiltaksklasse 3, er dokumentert hos DiBK. Det er ikke det samme som at hvert råd i et møte er et pålegg.",
    nextNeed: [
      { from: "Premissene er avklart", to: "Konsept og tegninger" },
      { from: "Konsept er valgt", to: "Detaljprosjektering, kontroll, deretter utførelse" },
    ],
    cta: "Avklar før anbudet går ut",
    href: "/kontakt?situasjon=endres&fag=ribr",
  },
  "brannteknisk-utforelse": {
    directAnswer:
      "Kontroll uten utførelse lukker sjelden avviket. Utførelse uten sporbar dokumentasjon lukker det heller ikke. Vi tar kontroll først, deretter det du velger å utbedre.",
    questions: [
      "Hva viser kontrollen faktisk, mot dokumentert nivå, ikke mot «slik vi pleier»?",
      "Må installasjonen ses på stedet, eller holder underlaget?",
      "Hva er avvik, og hva er vedlikehold?",
      "Hva må dokumenteres når arbeidet er gjort?",
    ],
    role: "Fysisk arbeid kommer etter avklart behov. Passiv brannsikring spesifiseres per oppdrag. Vi lover ikke «alle områder» uten å navngi ytelser.",
    nextNeed: [
      { from: "Kontroll har funnet avvik", to: "Utbedring" },
      { from: "Utbedring er ferdig", to: "Dokumentasjon tilbake i drift" },
    ],
    cta: "Få vurdert om befaring trengs",
    href: "/kontakt?spor=hybrid&fag=brannteknisk-utforelse",
  },
} as const;

export const commercialChain = [
  { n: "01", label: "Les saken digitalt", meaning: "Avvik, påstand eller spørsmål, først det som allerede finnes." },
  { n: "02", label: "Avklar hva det gjelder", meaning: "Bygg, bruk, hvem som sa hva, og hvilket grunnlag som er oppgitt." },
  { n: "03", label: "Vurder dokumentasjon", meaning: "Hva stemmer, hva mangler, hva kan ikke avgjøres fra papir." },
  { n: "04", label: "Velg spor", meaning: "Digitalt, hybrid eller fysisk, etter behov, ikke etter vane." },
  { n: "05", label: "Målrettet befaring", meaning: "Bare når usikkerheten krever det." },
  { n: "06", label: "Foreslå tiltak", meaning: "Krav, anbefaling og alternativer synlig for kunden." },
  { n: "07", label: "Prosjekter ved behov", meaning: "Når løsningen må tegnes og spesifikeres." },
  { n: "08", label: "Dokumenter", meaning: "Slik at avviket faktisk kan lukkes." },
  { n: "09", label: "Følg opp", meaning: "Kontroll, drift, opplæring eller portefølje, der saken krever det." },
] as const;

export const ctaIntents = [
  { id: "uklart", label: "Uklart?", action: "Få en faglig avklaring", href: "/kontakt?situasjon=uklart" },
  { id: "underlag", label: "Har dokumentasjon?", action: "Send inn underlag", href: "/kontakt?spor=digitalt" },
  { id: "avvik", label: "Avvik?", action: "Få vurdert avviket", href: "/kontakt?situasjon=papekt" },
  { id: "endring", label: "Ombygging?", action: "Avklar før anbudet går ut", href: "/kontakt?situasjon=endres" },
  { id: "digitalt", label: "Usikker på befaring?", action: "Start digitalt", href: "/kontakt?spor=digitalt" },
  { id: "fysisk", label: "Fysisk kontroll nødvendig?", action: "Bestill befaring", href: "/kontakt?spor=fysisk" },
  { id: "portefolje", label: "Flere bygg?", action: "Få oversikt over porteføljen", href: "/kontakt?hvem=eier-forvalter" },
  { id: "opplaring", label: "Opplæringsbehov?", action: "Kartlegg roller og kompetanse", href: "/kontakt?fag=brannvernradgivning" },
] as const;

export const situationAsk = {
  papekt: "Vi har fått avvik. Hva gjør vi først?",
  endres: "Vi skal bygge om. Må konseptet oppdateres?",
  uklart: "Er dette et krav, og hvem har ansvaret?",
} as const;

export const searchAsks = [
  {
    ask: "Vi har fått tilsyn. Hva gjør vi først?",
    who: "Eiendom / forvaltning",
    href: "/situasjon/papekt",
  },
  {
    ask: "Ny leietaker, må brannkonseptet oppdateres?",
    who: "Eiendom / forvaltning",
    href: "/situasjon/endres",
  },
  {
    ask: "Hvem har ansvaret, eier eller leietaker?",
    who: "Virksomhet / bruker",
    href: "/hvem-er-du/virksomhet-bruker",
  },
  {
    ask: "Er dette et krav eller en anbefaling?",
    who: "Alle",
    href: "/fag-og-kunnskap/pastand-eller-krav",
  },
  {
    ask: "Kan dere se på dokumentene uten befaring?",
    who: "Alle",
    href: "/fag-og-kunnskap/hva-kan-avklares-digitalt",
  },
  {
    ask: "Vi skal bygge om. Når må RIBr inn?",
    who: "Arkitekt / byggherre",
    href: "/losninger/ribr",
  },
  {
    ask: "Rådgiver sier at dette må gjøres. Stemmer det?",
    who: "Entreprenør",
    href: "/hvem-er-du/entreprenor",
  },
  {
    ask: "Flere bygg, gammel dokumentasjon. Hvor starter vi?",
    who: "Eiendom / forvaltning",
    href: "/hvem-er-du/eier-forvalter",
  },
] as const;

export const icpLinks = [
  {
    from: "eier-forvalter",
    to: "virksomhet-bruker",
    label: "Samme bygg",
    meaning: "Eier har overordnet ansvar. Bruker har daglig drift. Tilsyn og internkontroll treffer begge.",
  },
  {
    from: "eier-forvalter",
    to: "arkitekt-byggherre",
    label: "Når noe skal endres",
    meaning: "Ny leietaker eller ombygging endrer premissene eier må kunne dokumentere.",
  },
  {
    from: "arkitekt-byggherre",
    to: "entreprenor",
    label: "Før anbud",
    meaning: "Premiss og konsept før tegningen er ferdig. Avklart krav før utførelse.",
  },
  {
    from: "virksomhet-bruker",
    to: "kommune",
    label: "Drift og tilsyn",
    meaning: "Mange brukere, internkontroll og sporbarhet. Samme spørsmål, ulike byggtyper.",
  },
] as const;

export const kravCluster = [
  {
    id: "tilsyn",
    label: "Tilsyn / påbud",
    meaning: "Noe er pekt på. Lukking krever spor, ikke bare et tiltak.",
    href: "/situasjon/papekt",
  },
  {
    id: "ik",
    label: "Internkontroll",
    meaning: "Eier og bruker skal kunne vise hva som gjelder i drift.",
    href: "/losninger/brannvernradgivning",
  },
  {
    id: "tek",
    label: "TEK / SAK ved endring",
    meaning: "Når bruk eller bygg endres, treffer ofte et annet regelsett.",
    href: "/situasjon/endres",
  },
  {
    id: "konsept",
    label: "Brannkonsept",
    meaning: "Forutsetningene de tre ovenfor leses mot. Konsept og detalj er to jobber.",
    href: "/losninger/ribr",
  },
] as const;
