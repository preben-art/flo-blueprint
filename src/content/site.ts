export const company = {
  legalName: "FLO BRANNSIKRING AS",
  brandName: "Flo Brannsikring",
  orgnr: "979 582 064",
  tagline: "Brannsikkerhet i hele byggets livsløp",
  promise:
    "Avvik, ombygging eller usikkerhet om ansvar. Vi leser det dere har mot hvordan bygget brukes, og sier hva som faktisk kreves.",
  coverage: {
    digital:
      "Digital vurdering, dokumentgjennomgang og kurs kan gjøres uavhengig av hvor bygget ligger.",
    physical:
      "Befaring, kontroll og utførelse skjer fra Stryn og Nordfjordeid, i Nordvestlandet.",
    digitalArea: "Hele Norge",
    physicalArea: "Nordvestlandet",
    /* Where FLO actually drives out from; used for geo signals and the coverage band. */
    physicalRegions: ["Nordfjord", "Sunnfjord", "Sogn", "Sunnmøre", "Romsdal", "Nordmøre"],
    physicalPlaces: [
      "Stryn",
      "Nordfjordeid",
      "Måløy",
      "Sandane",
      "Førde",
      "Florø",
      "Volda",
      "Ørsta",
      "Ålesund",
      "Molde",
      "Kristiansund",
    ],
  },
  switchboard: "+47 57 87 33 64",
  email: "post@flo-brannsikring.no",
  invoice: "faktura@flo-brannsikring.no",
  locations: [
    {
      id: "stryn",
      name: "Hovedkontor Stryn",
      address: "Perhusvegen 1A",
      postal: "6783 Stryn",
      poBox: "Postboks 207, 6781 Stryn",
      locality: "Stryn",
      postalCode: "6783",
      geo: { lat: 61.9126, lng: 6.7156 },
    },
    {
      id: "nordfjordeid",
      name: "Avdelingskontor Nordfjordeid",
      address: "Øyane 8",
      postal: "6770 Nordfjordeid",
      locality: "Nordfjordeid",
      postalCode: "6770",
      geo: { lat: 61.9087, lng: 5.9885 },
    },
  ],
  approvals: [
    {
      function: "Prosjekterende",
      area: "Brannkonsept",
      class: "Tiltaksklasse 3",
    },
    {
      function: "Uavhengig kontrollerende",
      area: "Brannsikkerhet",
      class: "Tiltaksklasse 3",
    },
    {
      function: "Ansvarlig søker",
      area: "Alle typer tiltak",
      class: "Tiltaksklasse 1",
    },
  ],
  approvalPeriod: "12.09.2024 til 12.09.2027",
  approvalUrl: "https://sgregister.dibk.no/enterprises/979582064",
  flags: ["Yrkesskadeforsikring", "Ansvarsforsikring", "Godkjent opplæringsbedrift"],
  social: [
    { id: "facebook", label: "Facebook", handle: "flobrannsikring", url: "https://www.facebook.com/flobrannsikring" },
    { id: "instagram", label: "Instagram", handle: "flobrannsikring", url: "https://www.instagram.com/flobrannsikring/" },
    { id: "linkedin", label: "LinkedIn", handle: "flo-brannsikring", url: "https://www.linkedin.com/company/flo-brannsikring" },
  ],
} as const;

export const people = [
  {
    name: "Mats Flo",
    role: "Daglig leder / branningeniør",
    location: "Stryn",
    email: "mats@flo-brannsikring.no",
    phone: "+47 411 42 338",
    photo: "/people/mats-flo.jpg",
  },
  {
    name: "Vegard Tonning",
    role: "Avdelingsleder brannvernrådgivning",
    location: "Stryn",
    email: "vegard@flo-brannsikring.no",
    phone: "+47 482 31 616",
    photo: "/people/vegard-tonning.jpg",
  },
  {
    name: "Kåre Gloppestad",
    role: "Avdelingsleder branningeniører",
    location: "Stryn",
    email: "kare@flo-brannsikring.no",
    phone: "+47 482 36 548",
    photo: "/people/kare-gloppestad.jpg",
  },
  {
    name: "Kristoffer Grodås",
    role: "Avdelingsleder utførelse",
    location: "Stryn",
    email: "kristoffer@flo-brannsikring.no",
    phone: "+47 415 07 337",
    photo: "/people/kristoffer-grodas.jpg",
  },
  {
    name: "Kjell Rune Flo",
    role: "Brannvernrådgiver",
    location: "Stryn",
    email: "flo@flo-brannsikring.no",
    phone: "+47 907 98 968",
  },
  {
    name: "Brynjar Flo",
    role: "Brannvernrådgiver",
    location: "Stryn",
    email: "brynjar@flo-brannsikring.no",
    phone: "+47 970 57 321",
  },
  {
    name: "Yngve Håkonsen",
    role: "Brannvernrådgiver",
    location: "Nordfjordeid",
    email: "yngve@flo-brannsikring.no",
    phone: "+47 906 24 255",
  },
  {
    name: "Rune Pedersen",
    role: "Branningeniør",
    location: "Stryn",
    email: "rune@flo-brannsikring.no",
    phone: "+47 402 89 222",
  },
  {
    name: "Inger Langvik",
    role: "Branningeniør",
    location: "Stryn",
    email: "inger@flo-brannsikring.no",
    phone: "+47 970 81 960",
  },
  {
    name: "Gunvor Flo",
    role: "Teknisk tegning",
    location: "Stryn",
    email: "gunvor@flo-brannsikring.no",
    phone: "+47 900 51 257",
  },
  {
    name: "Sigrid Elida Linnerud",
    role: "",
    location: "Stryn",
    email: "sigrid@flo-brannsikring.no",
    phone: "+47 468 62 619",
  },
  {
    name: "Roy Veahmyr",
    role: "",
    location: "Stryn",
    email: "roy@flo-brannsikring.no",
    phone: "+47 911 28 772",
  },
  {
    name: "Jan Risberget",
    role: "",
    location: "Stryn",
    email: "jan@flo-brannsikring.no",
    phone: "+47 452 41 168",
  },
  {
    name: "Thomas Hundvebakke Raudi",
    role: "",
    location: "Stryn",
    email: "thomas@flo-brannsikring.no",
  },
] as const;

export const journey = [
  { n: "01", id: "inngang", label: "Hva gjelder?", ask: "Hva gjelder?" },
  { n: "02", id: "situasjon", label: "Situasjon", ask: "Hva har skjedd?" },
  { n: "03", id: "avklaring", label: "Avklaring", ask: "Hva må forstås?" },
  { n: "04", id: "krav", label: "Ansvar / risiko / krav", ask: "Hva gjelder faktisk?" },
  { n: "05", id: "losning", label: "Løsning", ask: "Hva bør gjøres?" },
  { n: "06", id: "dokumentasjon", label: "Dokumentasjon", ask: "Hvordan vet vi?" },
  { n: "07", id: "neste", label: "Hva gjør vi nå?", ask: "Hva gjør dere nå?" },
] as const;

export const processPath = [
  { id: "bygg", label: "Bygg" },
  { id: "bruk", label: "Bruk" },
  { id: "dokumentasjon", label: "Dokumentasjon" },
  { id: "ansvar", label: "Ansvar" },
  { id: "risiko", label: "Risiko" },
  { id: "regelverk", label: "Regelverk" },
  { id: "krav", label: "Faktisk krav" },
  { id: "alternativer", label: "Alternativer" },
  { id: "prioritering", label: "Prioritering" },
] as const;

export const situations = [
  {
    slug: "papekt",
    room: "02A",
    label: "Vi har fått avvik",
    short: "Tilsyn, avvik, pålegg eller et krav fra andre.",
    examples: [
      "Tilsyn",
      "Avvik",
      "Pålegg",
      "Kontrollfunn",
      "Foreslått tiltak",
      "Kostbart tiltak",
      "Uenighet om løsning",
    ],
    problems: [
      "Noen sier at et tiltak er påkrevd",
      "Dokumentasjonen mangler eller er utdatert",
      "Det er uklart hvem som eier avviket",
    ],
    next: ["brannvernradgivning", "brannteknisk-utforelse"],
    faqs: ["faq.konsekvenser", "faq.dokumentasjon-internkontroll", "faq.ansvar"],
  },
  {
    slug: "endres",
    room: "02B",
    label: "Vi skal bygge om",
    short: "Nybygg, ombygging, bruksendring eller ny leietaker.",
    examples: [
      "Nybygg",
      "Ombygging",
      "Rehabilitering",
      "Bruksendring",
      "Ny leietaker",
      "Endret drift",
      "Nytt utstyr",
      "Nytt prosjekt",
    ],
    problems: [
      "Brannkonseptet matcher ikke faktisk bruk",
      "Tiltak settes i gang før brannfaget har vært inne",
      "Prosjektering og utførelse treffer hverandre for sent",
    ],
    next: ["ribr", "brannvernradgivning"],
    faqs: ["faq.oppdatert-konsept", "faq.konsept-vs-prosjektering", "faq.tek17"],
  },
  {
    slug: "uklart",
    room: "02C",
    label: "Er dette et krav?",
    short: "Hvem har ansvaret, og er dette faktisk et krav?",
    examples: [
      "Hva gjelder?",
      "Er dette et krav?",
      "Hvem har ansvaret?",
      "Holder dokumentasjonen?",
      "Må dette gjøres nå?",
      "Kan vi gjøre det selv?",
      "Finnes annen løsning?",
      "Hva bør prioriteres?",
    ],
    problems: [
      "Påstand og krav er blandet sammen",
      "Eier og bruker er ikke enige om ansvarsfordeling",
      "Regelverket er kjent, men ikke anvendt på dette bygget",
    ],
    next: ["ribr", "brannvernradgivning"],
    faqs: ["faq.ansvar", "faq.loven", "faq.konsept-vs-prosjektering"],
  },
] as const;

export const services = [
  {
    slug: "brannvernradgivning",
    room: "05A",
    label: "Brannvernrådgivning",
    summary:
      "Full oversikt over brannsikkerheten uten at virksomheten må bli eksperter selv. Tegninger, dokumentasjon, rutiner, øvelser og oppfølging.",
    forWhom: [
      "Virksomheter og brukere med internkontrollansvar",
      "Eiere og forvaltere som trenger dokumentert status",
    ],
    when: [
      "Avvik eller tilsyn",
      "Manglende eller utdatert dokumentasjon",
      "Ny leietaker eller endret drift",
      "Behov for øvelser og opplæring",
    ],
    problem: "Mange har papirer, men ikke et system som viser hva som faktisk gjelder i bygget.",
    investigates: [
      "Hva bygget er, og hvordan det brukes",
      "Hvilken dokumentasjon som finnes",
      "Hvem som har ansvaret i praksis",
      "Hvilke avvik som er reelle",
    ],
    delivers: [
      "Brannverndokumentasjon",
      "Risikoanalyser",
      "Branntegninger og orienteringsplaner",
      "Evakuerings- og beredskapsplaner",
      "Kurs og øvelser",
      "Oppfølging og rådgivning",
    ],
    process:
      "Vi kartlegger krav og status. Du får oversikt over tiltak og velger selv hva som skal utføres. Vi følger opp som avtalt, du beholder styringen.",
    needsFromCustomer: [
      "Adresse og bruk av bygget",
      "Eksisterende dokumentasjon, om den finnes",
      "Eventuelt avvik, tilsynsrapport eller pålegg",
      "Kontaktpunkt hos eier og bruker",
    ],
    timePrice:
      "Tid og pris avhenger av bygningskompleksitet, dokumentasjonsstatus og om det er ett bygg eller en portefølje. Avklares individuelt.",
    regulation: [
      "Brann- og eksplosjonsvernloven",
      "Forskrift om brannforebygging",
      "Internkontrollforskriften",
    ],
    misconceptions: [
      "At leiekontrakten kan avtale bort det offentligrettslige ansvaret",
      "At manglende papirer bare er et formalitetsspørsmål",
    ],
    related: ["ribr", "brannteknisk-utforelse"],
  },
  {
    slug: "ribr",
    room: "05B",
    label: "Branningeniører / RIBr",
    summary:
      "Brannkonsept, detaljprosjektering og uavhengig kontroll. Vi viser veien til tilfredsstillende brannsikkerhet, fra tidlig fase til ferdig bygg.",
    forWhom: [
      "Byggherrer og arkitekter i planlegging",
      "Eiere av eksisterende byggverk som trenger dokumentert nivå",
      "Prosjekt der noen har påstått at et tiltak «må» gjøres",
    ],
    when: [
      "Nybygg, ombygging, tilbygg eller bruksendring",
      "Behov for oppdatert brannkonsept",
      "Uavhengig kontroll av brannprosjektering",
      "Ekspertvurdering der preaksepterte ytelser ikke treffer",
    ],
    problem:
      "Kostbare løsninger settes ofte i gang før noen har skilt prosjektvalg fra faktisk krav.",
    investigates: [
      "Bygget, bruken og risikoklasse",
      "Gjeldende konsept og tegninger",
      "Hvilke ytelser som faktisk kreves",
      "Om det finnes dokumenterbare alternativer",
    ],
    delivers: [
      "Brannstrategi og brannkonsept med branntekniske tegninger",
      "Rådgivning i planleggingsfasen",
      "Detaljprosjektering av brannalarm, nødlys/ledesystem og røykventilasjon",
      "Uavhengig kontroll i tiltaksklasse 3",
      "Dokumentasjon for eksisterende byggverk",
      "Beregninger og ekspertvurderinger",
    ],
    process:
      "Tidlig avklaring av bygg og bruk. Konsept som sier hva som skal til. Prosjektering som sier hvordan. Kontroll der det kreves.",
    needsFromCustomer: [
      "Plantegninger og beskrivelse av tiltaket",
      "Planlagt bruk og personantall",
      "Eksisterende brannkonsept, om det finnes",
      "Tidsplan for søknad, anbud eller utførelse",
    ],
    timePrice:
      "Kompleksitet, tiltaksklasse og om det er nybygg eller eksisterende bygg styrer omfang. Avklares individuelt.",
    regulation: ["TEK17 kap. 11", "SAK10", "NS 3924:2025 for branntegninger"],
    misconceptions: [
      "At brannkonsept og detaljprosjektering er det samme",
      "At eksisterende bygg automatisk skal oppgraderes til TEK17",
    ],
    evidence: "DiBK sentral godkjenning: prosjekterende brannkonsept TK3 og uavhengig kontroll brannsikkerhet TK3.",
    related: ["brannvernradgivning", "brannteknisk-utforelse"],
  },
  {
    slug: "brannteknisk-utforelse",
    room: "05C",
    label: "Brannteknisk utførelse",
    summary:
      "Kontroll og dokumentasjon av branntekniske installasjoner, og utførelse når du er klar, montasje, utbedring og slokkeutstyr.",
    forWhom: [
      "Eiere og forvaltere som trenger kontroll av installasjoner",
      "Virksomheter som skal utbedre avvik",
    ],
    when: [
      "Kontroll av branntekniske installasjoner",
      "Avvik som krever fysisk utbedring",
      "Montasje av slokkeutstyr",
      "Behov for å knytte kontroll til dokumentasjon",
    ],
    problem: "Kontroll uten utførelse, eller utførelse uten sporbar dokumentasjon, løser sjelden avviket.",
    investigates: [
      "Hvilke installasjoner som finnes",
      "Hva kontrollen faktisk viser",
      "Hva som er avvik mot dokumentert nivå",
    ],
    delivers: [
      "Kontroll av branntekniske installasjoner",
      "Passiv brannsikring der det er avtalt og dokumentert",
      "Detaljprosjektering av branntekniske installasjoner",
      "Montasje og utbedring",
      "Slokkeutstyr og frityrslokkeanlegg der det er aktuelt",
    ],
    process: "Kontroll og oversikt først. Deretter utførelse av det du velger, med dokumentasjon tilbake i systemet.",
    needsFromCustomer: [
      "Tilgang til bygget",
      "Eksisterende tegninger og FDV om det finnes",
      "Avviksliste eller kontrollrapport",
    ],
    timePrice: "Omfang styres av antall installasjoner, tilkomst og om utbedring inngår. Avklares individuelt.",
    regulation: ["Forskrift om brannforebygging", "Dokumentasjonskrav for utført arbeid"],
    misconceptions: [
      "At kontroll alene er det samme som lukket avvik",
      "At «alle områder innen passiv brannsikring» kan lover uten å navngi ytelser, vi spesifiserer per oppdrag",
    ],
    related: ["brannvernradgivning", "ribr"],
  },
] as const;

export const customers = [
  {
    slug: "eier-forvalter",
    room: "03A",
    label: "Eiendom / forvaltning",
    track: "naering",
    confirmed: true,
    who: "Byggeiere, forvaltere og fagmiljø i byggeprosessen.",
    buildings: "Næringsbygg, porteføljer, kombinerte bygg, butikk og overnatting.",
    situations: ["papekt", "endres", "uklart"],
    problems: [
      "Manglende oversikt per bygg og i porteføljen",
      "Avvik som vandrer mellom eier, bruker og entreprenør",
      "Dokumentasjon som ikke overlever leietakerskifte",
    ],
    signals: ["Vi har fått et avvik", "Vi mangler dokumentasjon", "Ny leietaker skal inn"],
    services: ["brannvernradgivning", "ribr", "brannteknisk-utforelse"],
    proof: "coop",
  },
  {
    slug: "virksomhet-bruker",
    room: "03B",
    label: "Virksomhet / bruker",
    track: "naering",
    confirmed: true,
    who: "Virksomheter som har ansvar for brannsikkerheten til ansatte og brukere.",
    buildings: "Arbeidsbygninger, butikk, overnatting, industri.",
    situations: ["papekt", "uklart"],
    problems: [
      "Internkontroll uten sporbar dokumentasjon",
      "Uklart skille mellom eiers og brukers plikter",
      "Øvelser som ikke er tilpasset risikoen",
    ],
    signals: ["Har vi kontroll?", "Vi trenger opplæring", "Hvem har ansvaret?"],
    services: ["brannvernradgivning", "brannteknisk-utforelse"],
    proof: "classic-norway",
  },
  {
    slug: "arkitekt-byggherre",
    room: "03C",
    label: "Arkitekt / byggherre",
    track: "naering",
    confirmed: false,
    who: "De som tegner ferdig løsningen før brannfaget har vært inne.",
    buildings: "Nybygg, ombygging, bruksendring.",
    situations: ["endres", "uklart"],
    problems: ["Brannkrav kommer for sent", "Anbud uten tilstrekkelig underlag"],
    signals: ["Vi skal bygge om", "Vi mangler brannkonsept"],
    services: ["ribr"],
    proof: null,
  },
  {
    slug: "entreprenor",
    room: "03D",
    label: "Entreprenør",
    track: "naering",
    confirmed: false,
    who: "Utførende som trenger avklart krav og dokumentasjon før endring.",
    buildings: "Tiltak i nye og eksisterende bygg.",
    situations: ["papekt", "endres"],
    problems: ["Påstand fra andre fag om at «dette må gjøres»"],
    signals: ["Krav fra rådgiver", "Er tiltaket nødvendig?"],
    services: ["ribr", "brannteknisk-utforelse"],
    proof: null,
  },
  {
    slug: "industri-kraft",
    room: "03E",
    label: "Industri / kraft",
    track: "naering",
    confirmed: false,
    who: "Virksomheter der endret drift endrer risiko.",
    buildings: "Industribygg og kraftanlegg, nevnt i FLO sitt eget tjenestespekter.",
    situations: ["endres", "uklart"],
    problems: ["Nytt utstyr uten oppdatert vurdering"],
    signals: ["Endret drift", "Nytt utstyr"],
    services: ["ribr", "brannvernradgivning"],
    proof: null,
  },
  {
    slug: "kommune",
    room: "03F",
    label: "Kommune / offentlig",
    track: "naering",
    confirmed: false,
    who: "Offentlige bygg med tilsyn, internkontroll og mange brukere.",
    buildings: "Skoler, helse, formålsbygg.",
    situations: ["papekt", "uklart"],
    problems: ["Kapasitet og sporbarhet i internkontroll"],
    signals: ["Tilsyn", "Vi trenger et årlig program"],
    services: ["brannvernradgivning", "ribr"],
    proof: null,
    note: "Bremanger kommune ligger som navngitt merke på dagens nettsted. Det er ikke et dokumentert FLO-branncase.",
  },
  {
    slug: "privat",
    room: "03P",
    label: "Privat / bolig",
    track: "privat",
    confirmed: false,
    who: "Bolig eier og utleier. Eget spor, ikke eiendom/forvaltning.",
    buildings: "Enebolig, tomannsbolig, utleiedel, kjeller, loft.",
    situations: ["endres", "uklart"],
    problems: [
      "Utleiedel uten avklart rømning og brannskille",
      "Usikkert om endringen er søknadspliktig",
      "Tegninger som ikke treffer det som er bygget",
    ],
    signals: ["Kan jeg leie ut kjelleren?", "Må jeg ha brannrådgiver?", "Holder det med bilder?"],
    services: ["ribr", "brannvernradgivning"],
    proof: null,
    note: "Privat er ikke dokumentert som FLO-hovedmarked. Sporet vises uten oppdiktet case.",
  },
] as const;

export const projects = [
  {
    slug: "coop",
    room: "06A",
    name: "Coop",
    logo: "/partners/coop.svg",
    mark: "logo" as const,
    services: ["Brannteknisk utførelse", "Branningeniører / RIBr", "Brannvernrådgivning"],
    status: "Navngitt kunde. Brannspesifikk effekt er ikke dokumentert i kildematerialet.",
    summary:
      "Coop er en navngitt relasjon i FLO sitt materiale, blant annet Coop Nordvest, Coop Nordland og eldre oppdrag mot Coop-eiendom. Vi publiserer ikke forvaltnings-sitater fra andre merkevarer som om de var FLO-resultat.",
    whatWeCanSay:
      "Kunden er navngitt. Tjenestetaggene på kilden peker mot alle tre FLO-fag. Før/etter, bygg og ansvarlig FLO-person mangler. Det merkes her, ikke skjules.",
  },
  {
    slug: "classic-norway",
    room: "06B",
    name: "Classic Norway Hotels",
    logo: "/partners/classic-norway.jpg",
    mark: "type" as const,
    services: ["Brannvernrådgivning", "Branningeniører / RIBr"],
    status: "Navngitt kunde i overnatting. Proof er svakt.",
    summary:
      "Hotell og overnatting inngår i FLO sitt tjenestespekter. Classic Norway er navngitt. Vi har ikke et FLO-signert resultat å vise ennå.",
    whatWeCanSay: "Kunde og fagtagger er bekreftet. Bygg, omfang og branneffekt er ikke dokumentert.",
  },
  {
    slug: "weenaas",
    room: "06C",
    name: "Wenaas",
    logo: "/partners/weenaas.jpg",
    mark: "type" as const,
    services: ["Brannvernrådgivning", "Branningeniører / RIBr"],
    status: "Navngitt relasjon. Stavemåte Weenaas/Wenaas er uklar i kilden.",
    summary:
      "Navnet finnes i kildematerialet. Innholdet som fulgte med, handlet om eiendomsforvaltning, ikke et dokumentert brannfaglig resultat. Derfor vises relasjonen, ikke et oppdiktet case.",
    whatWeCanSay: "Relasjon er navngitt. FLO-spesifikk dokumentasjon av effekt mangler.",
  },
] as const;

export const faqs = [
  {
    id: "faq.ansvar",
    question: "Hvem har ansvaret for brannsikkerheten i bygget vårt?",
    answer:
      "Eier og bruker har selvstendige plikter etter forskrift om brannforebygging. Eier skal kjenne kravene, informere brukere og holde sikkerhetsinnretninger. Den med formell bruksrett skal bruke bygget innenfor forutsetningene, holde rømning og melde endringer. Leiekontrakten kan fordele oppgaver. Det offentligrettslige ansvaret kan ikke avtales bort. Dette er veiledning, ikke en juridisk konklusjon for ditt bygg.",
  },
  {
    id: "faq.loven",
    question: "Hva sier regelverket om brannsikkerhet i næringsbygg?",
    answer:
      "Hovedbildet er brann- og eksplosjonsvernloven, forskrift om brannforebygging og byggteknisk forskrift (TEK17). For virksomheter gjelder også internkontrollforskriften. Hva som faktisk gjelder, avhenger av bygg, bruk og når bygget ble oppført.",
  },
  {
    id: "faq.konsept-vs-prosjektering",
    question: "Hva er forskjellen på brannkonsept og brannteknisk prosjektering?",
    answer:
      "Brannkonseptet er det overordnede dokumentet som beskriver hvordan bygget skal sikres. Brannteknisk prosjektering omsetter konseptet i detaljerte løsninger. Konseptet sier hva som skal til. Prosjekteringen sier hvordan det skal gjøres.",
  },
  {
    id: "faq.oppdatert-konsept",
    question: "Når må vi ha et oppdatert brannkonsept?",
    answer:
      "Typisk ved nybygg, bruksendring, større ombygging eller tilbygg, endringer i branntekniske installasjoner, og ved vesentlige endringer i virksomheten. Konseptet bør også revideres jevnlig slik at det matcher faktisk bruk.",
  },
  {
    id: "faq.tek17",
    question: "Hva er TEK17, og hvordan påvirker det oss?",
    answer:
      "TEK17 er byggteknisk forskrift. Kapittel 11 omhandler brannsikkerhet. Den gjelder i hovedsak nybygg, ombygging, tilbygg og bruksendring. Eksisterende bygg styres normalt av reglene som gjaldt på byggetidspunktet, med unntak der bruken endres eller sikkerheten er vesentlig mangelfull.",
  },
  {
    id: "faq.dokumentasjon-internkontroll",
    question: "Hvorfor er dokumentasjon viktig i internkontrollen?",
    answer:
      "Internkontrollforskriften § 5 stiller krav til skriftlig dokumentasjon. Uten sporbarhet er det vanskelig å vise at kravene er oppfylt ved tilsyn. At forsikring kan påvirkes ved hendelse, er en kjent risiko, ikke en garanti vi kan gi på vegne av et selskap.",
  },
  {
    id: "faq.dsb",
    question: "Hva er DSB sine krav til virksomheter?",
    answer:
      "DSB forvalter brann- og eksplosjonsvernloven. I praksis: dokumentasjon, risikovurdering, instrukser, opplæring, øvelser og tilrettelegging for tilsyn. Særskilte brannobjekter har strengere krav enn ordinære næringsbygg.",
  },
  {
    id: "faq.konsekvenser",
    question: "Hva kan skje hvis vi ikke oppfyller kravene?",
    answer:
      "Mulige følger er pålegg, tvangsmulkt, bøter, i alvorlige tilfeller stenging, og i ytterste konsekvens straffansvar ved grov uaktsomhet. Hva som treffer et konkret bygg, avgjøres av myndighet og sak, ikke av en nettside.",
  },
  {
    id: "faq.ovelse-frekvens",
    question: "Hvor ofte må vi gjennomføre brannøvelse?",
    answer:
      "For de fleste virksomheter anbefales minst én øvelse i året. For særskilte brannobjekter er årlig øvelse ofte et minstekrav. Her er skillet mellom anbefaling og krav viktig, FLO klassifiserer det før vi kaller det «lovpålagt».",
  },
  {
    id: "faq.ovelse-innhold",
    question: "Hva bør en brannøvelse inneholde?",
    answer:
      "En øvelse bør bygge på oppdatert evakueringsplan: varsling, rømning, oppmøte, ansvar og personer som trenger bistand. Etter øvelsen: evaluering og spor i internkontrollen. Innholdet tilpasses risikoen, ikke et standardshow.",
  },
  {
    id: "faq.utleiedel",
    question: "Kan jeg bruke kjeller eller loft som utleiedel?",
    answer:
      "Før kjeller, loft eller del av boligen brukes som egen boenhet, må bruk, rømning, brannskille og øvrige byggtekniske forutsetninger vurderes. Det er ikke et interiørvalg. FLO kan lese tegninger og bilder digitalt først. Vi konkluderer ikke «lovlig utleie» uten sak. Privat er et eget spor, ikke samme tekst som næringseiendom.",
  },
] as const;

export const news = [
  {
    slug: "dokumentene-kan-leses-forst",
    title: "Dokumentene kan leses først, uansett hvor bygget ligger",
    date: "2026-09-16",
    kicker: "Digitalt",
    excerpt:
      "Tilsyn, tegninger og spørsmål om ansvar kan ofte avklares uten at noen reiser. Befaring kommer når papirene ikke kan svare alene.",
    body: [
      "Digital vurdering, dokumentgjennomgang og kurs kan gjøres uavhengig av hvor bygget ligger. Det er ikke et tillegg. Det er første lesning.",
      "Send rapporten, tegningene eller det som ble sagt. FLO sier om saken kan leses herfra, eller om bygget må ses. Fysisk del skjer fra Stryn og Nordfjordeid, i Nordvestlandet.",
      "Dette er arbeidsmåten, ikke et løfte om at alle saker løses på skjerm. Når rømning, installasjon eller det som er bygget ikke kan avgjøres fra underlaget, kommer vi dit.",
    ],
  },
  {
    slug: "fagmiljoet-i-stryn",
    title: "Fagmiljøet sitter i Stryn og Nordfjordeid",
    date: "2026-09-16",
    kicker: "Fagmiljø",
    excerpt:
      "Rådgivning, RIBr og utførelse er samlet i ett fagmiljø. Det som publiseres her, styres fra redaksjonen, ikke fra et oppdiktet nyhetsrom.",
    body: [
      "FLO Brannsikring har hovedkontor i Stryn og avdelingskontor på Nordfjordeid. Digital lesning dekker hele landet. Befaring, kontroll og utførelse er Nordvestlandet.",
      "Nyheter og artikler på denne siden er et redaksjonelt spor. Kunder kan legge inn innhold og ta det ned igjen. FLO styrer arbeidsverktøyet og det som skal stå.",
      "Vi publiserer ikke oppdiktede resultater. Der bevis mangler, står det.",
    ],
  },
] as const;

export const articles = [
  {
    slug: "brannkonsept-eller-prosjektering",
    title: "Brannkonsept eller detaljprosjektering?",
    date: "2026-09-16",
    kicker: "Brannkonsept",
    excerpt: "To dokumenter, to jobber. Å blande dem er en vanlig grunn til at tiltak blir både for dyre og for sene.",
    body: [
      "Brannkonseptet er det overordnede dokumentet som beskriver hvordan bygget skal sikres. Det sier hva som skal til.",
      "Brannteknisk prosjektering omsetter konseptet i detaljerte løsninger. Den sier hvordan det skal gjøres, alarm, ledesystem, seksjonering, røykventilasjon og det øvrige som tegnes og spesifikeres.",
      "Når de to blandes, settes tiltak ofte i gang før noen har skilt prosjektvalg fra faktisk krav. Det er en av de vanligste grunnene til at tiltak blir både for dyre og for sene.",
      "FLO har sentral godkjenning som prosjekterende brannkonsept i tiltaksklasse 3, og som uavhengig kontrollerende brannsikkerhet i tiltaksklasse 3. Det er dokumentert hos DiBK. Det er ikke det samme som at hvert råd på et møte er et pålegg.",
    ],
  },
  {
    slug: "nar-bruken-endres",
    title: "Når bruken endres, endres ofte kravet",
    date: "2026-09-16",
    kicker: "Bruksendring",
    excerpt: "Ny leietaker er ikke bare en kontrakt. Det kan være en ny forutsetning for hele brannkonseptet.",
    body: [
      "Ny leietaker, nytt utstyr eller endret drift er ikke bare en kontraktssak. Det kan endre forutsetningene konseptet ble skrevet på.",
      "TEK17 kapittel 11 gjelder i hovedsak nybygg, ombygging, tilbygg og bruksendring. Eksisterende bygg styres normalt av reglene som gjaldt på byggetidspunktet, med unntak der bruken endres eller sikkerheten er vesentlig mangelfull.",
      "Et oppdatert konsept trengs typisk ved nybygg, bruksendring, større ombygging, endringer i branntekniske installasjoner, og ved vesentlige endringer i virksomheten. Hva som treffer et konkret bygg, avklares mot dokumentene, ikke mot et stikkord.",
      "Eier har det overordnede ansvaret. Bruker har ansvar for daglig drift. Leiekontrakten kan fordele oppgaver, men det offentligrettslige ansvaret kan ikke avtales bort. Dette er veiledning, ikke en juridisk konklusjon for ditt bygg.",
    ],
  },
  {
    slug: "ns-3924",
    title: "NS 3924 og felles språk for branntegninger",
    date: "2025-10-06",
    kicker: "Tegninger",
    excerpt:
      "NS 3924:2025 er en felles måte å tegne brann på. FLO kan levere tegninger i dette språket. Vi siterer ikke morselskapets forvaltningsblogg som FLO-stemme.",
    body: [
      "NS 3924:2025 gir et felles språk for branntegninger. Når arkitekt, RIBr, utførende og forvalter tegner i samme kode, blir det lettere å se hva som faktisk er forutsatt i bygget.",
      "FLO leverer branntegninger og orienteringsplaner som del av brannvernrådgivning og RIBr-oppdrag. At en standard finnes, betyr ikke at alle eldre tegninger automatisk er ugyldige.",
      "Vi bruker ikke forvaltningsinnhold fra andre merkevarer som om det var skrevet av FLO. Denne teksten holder seg til hva standarden er, og hva FLO faktisk leverer.",
    ],
  },
  {
    slug: "flere-krav-samme-bygg",
    title: "Når tilsyn, internkontroll og TEK treffer samme bygg",
    date: "2026-09-16",
    kicker: "Tilsyn og TEK",
    excerpt:
      "Et påbud, et avvik i internkontrollen og et krav i et ombyggingsprosjekt er ofte tre lesninger av samme bygg, ikke tre separate jobber.",
    body: [
      "Det som kommer som tilsyn eller påbud, treffer ofte det samme som internkontrollforskriften krever dokumentert i drift. Når bygget samtidig skal endres, kan TEK17 kapittel 11 og SAK10 treffe i tillegg. Da er det lett å sette i gang tre tiltak. Det som trengs, er én avklaring av bygg, bruk og dokumentasjon.",
      "Eier har det overordnede ansvaret for at brannsikkerheten er ivaretatt. Bruker har ansvar for daglig drift. Leiekontrakten kan fordele oppgaver, men det offentligrettslige ansvaret kan ikke avtales bort. Derfor må eier og bruker leses sammen, ikke som to isolerte kunder.",
      "Før tiltak settes i gang: hva er observert, hvilket regelsett det bygger på, og om det er krav, anbefaling eller faglig vurdering. Mye av det kan leses digitalt. Befaring kommer når dokumentasjonen ikke kan svare alene.",
      "Dette er veiledning, ikke et vedtak for ditt bygg. FLO klassifiserer kilden før noe kalles pålegg.",
    ],
  },
  {
    slug: "hva-kan-avklares-digitalt",
    title: "Hva kan avklares digitalt, og hva krever befaring?",
    date: "2026-09-16",
    kicker: "Befaring",
    excerpt:
      "Ikke alle saker trenger befaring. Ikke alle saker kan løses fra dokumentene. Forskjellen er hva usikkerheten faktisk gjelder.",
    body: [
      "Dokumentasjon, tegninger, tilsynsrapporter, konsept og spørsmål om ansvar kan ofte leses først. Det senker terskelen: start med det vi allerede vet, før noen reiser.",
      "Befaring trengs når dokumentasjonen ikke stemmer med virkeligheten, når installasjoner eller rømning må ses, eller når risikoen ikke kan vurderes fra papir. Da skal den fysiske delen ha en grunn, ikke være et automatisk første steg.",
      "Hybrid er det vanlige sporvalget: digital gjennomgang, identifisere usikkerhet, målrettet befaring bare der svaret mangler. 3D-skanning og kartlegging er verktøy når underlaget ikke treffer bygget, ikke et eget produkt man skal kjøpe «i tillegg».",
      "Send rapporten, tegningene eller det som ble sagt. Vi sier om det kan leses herfra, eller om bygget må ses.",
    ],
  },
] as const;

export const regulations = [
  {
    id: "lov",
    label: "Brann- og eksplosjonsvernloven",
    note: "Overordnet pliktgrunnlag for eier og bruker.",
  },
  {
    id: "fob",
    label: "Forskrift om brannforebygging",
    note: "Krav til forebygging, dokumentasjon og tilrettelegging.",
  },
  {
    id: "tek17",
    label: "TEK17 kapittel 11",
    note: "Brannsikkerhet ved nybygg, ombygging, tilbygg og bruksendring.",
  },
  {
    id: "ik",
    label: "Internkontrollforskriften",
    note: "Skriftlig dokumentasjon av internkontroll, jf. § 5.",
  },
  {
    id: "sak10",
    label: "SAK10",
    note: "Ansvar og kontroll i byggesak. Relevant via DiBK-godkjenning.",
  },
  {
    id: "ns3924",
    label: "NS 3924:2025",
    note: "Felles tegnespråk for branntegninger.",
  },
] as const;

export const claimClasses = [
  {
    id: "krav",
    label: "Faktisk krav",
    meaning: "Kan vises til lov, forskrift, vedtak eller vilkår som gjelder dette bygget.",
  },
  {
    id: "anbefaling",
    label: "Anbefaling",
    meaning: "Bør gjøres ut fra veiledning eller god praksis, uten at det er dokumentert som krav.",
  },
  {
    id: "vurdering",
    label: "Faglig vurdering",
    meaning: "FLO eller annen fagpart mener dette er riktig nivå. Det er ikke automatisk et pålegg.",
  },
  {
    id: "prosjektvalg",
    label: "Prosjektvalg",
    meaning: "En løsning blant flere. Kostnad og fremdrift, ikke nødvendigvis minstekrav.",
  },
  {
    id: "praksis",
    label: "Praksis",
    meaning: "Slik det «pleier» å gjøres. Praksis er ikke bevis.",
  },
  {
    id: "uklart",
    label: "Uklart",
    meaning: "Kilden mangler, eller den er for svak til å klassifisere. Da stopper vi og henter grunnlag.",
  },
] as const;

export const nav = [
  {
    href: "/situasjon",
    short: "Avvik",
    label: "Avvik og ombygging",
    children: [
      { href: "/situasjon/papekt", label: "Vi har fått avvik" },
      { href: "/situasjon/endres", label: "Vi skal bygge om" },
      { href: "/situasjon/uklart", label: "Er dette et krav?" },
    ],
  },
  { href: "/fag-og-kunnskap/pastand-eller-krav", short: "Påbudt?", label: "Er det påbudt?" },
  {
    href: "/hvem-er-du",
    short: "Ansvar",
    label: "Eier eller bruker?",
    children: [
      { href: "/hvem-er-du/eier-forvalter", label: "Eiendom / forvaltning" },
      { href: "/hvem-er-du/virksomhet-bruker", label: "Virksomhet / bruker" },
      { href: "/hvem-er-du/arkitekt-byggherre", label: "Arkitekt / byggherre" },
      { href: "/hvem-er-du/entreprenor", label: "Entreprenør" },
      { href: "/hvem-er-du/industri-kraft", label: "Industri / kraft" },
      { href: "/hvem-er-du/kommune", label: "Kommune / offentlig" },
      { href: "/privat", label: "Privat / bolig" },
    ],
  },
  {
    href: "/losninger",
    short: "RIBr",
    label: "Rådgivning og RIBr",
    children: [
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
      { href: "/losninger/ribr", label: "Branningeniører / RIBr" },
      { href: "/losninger/brannteknisk-utforelse", label: "Brannteknisk utførelse" },
    ],
  },
  { href: "/digitalt", short: "Digitalt", label: "Dette kan gjøres digitalt" },
  {
    href: "/fagmiljo",
    short: "Fagmiljø",
    label: "Fagmiljø",
    children: [
      { href: "/fagmiljo", label: "Fagmiljøet" },
      { href: "/nyheter", label: "Nyheter" },
      { href: "/artikler", label: "Artikler" },
      { href: "/fag-og-kunnskap", label: "Spørsmål" },
    ],
  },
  { href: "/om-flo", short: "Om FLO", label: "Om FLO" },
] as const;

export const stills = {
  internkontroll: "/media/sikkerhetsvegg.jpg",
  internkontrollRom: "/media/internkontroll-rom.jpg",
  coop: "/media/coop-extra.jpg",
  classicNorway: "/media/classic-norway.jpg",
  weenaasBygg: "/partners/weenaas.jpg",
  bygg: "/media/naeringsbygg.jpg",
  romning: "/media/romningstrapp.jpg",
  romningOvenfra: "/media/romning-ovenfra.jpg",
  digitalt: "/media/fagmiljo-to.jpg",
  digitaltTo: "/media/skjerm-peker.jpg",
  slokke: "/media/slokkeanlegg.jpg",
  slokkeManometer: "/media/slokke-manometer.jpg",
  slokker: "/media/slokker-kontroll.jpg",
  slokkerHaand: "/media/slokker-haand.jpg",
  avklaring: "/media/team.jpg",
  skjerm: "/media/skjermarbeid.jpg",
  skjermPeker: "/media/skjerm-peker.jpg",
  befaring: "/media/teknisk-anlegg.jpg",
  anlegg: "/media/anlegg-gjennomgang.jpg",
  anleggNar: "/media/anlegg-nar.jpg",
  tavle: "/media/tavle-laptop.jpg",
  skanner: "/media/skanner.jpg",
  offentlig: "/media/brannskilt.jpg",
  detektor: "/media/roykvarsler.jpg",
  hero: "/media/nodutgang-lys.jpg",
  nodutgang: "/media/nodutgang-lys.jpg",
  nodutgangKorridor: "/media/nodutgang-korridor.jpg",
  fjord: "/media/classic-norway.jpg",
  entrance: "/media/utgang.jpg",
  alarm: "/media/sikkerhetsvegg.jpg",
  stair: "/media/romningstrapp.jpg",
  drawings: "/media/fagmiljo.jpg",
  corridor: "/media/brannskilt.jpg",
  ceiling: "/media/roykvarsler.jpg",
  technical: "/media/teknisk-anlegg.jpg",
  smoke: "/media/roykvarsler.jpg",
  sign: "/media/brannskilt.jpg",
  team: "/media/team.jpg",
  utgang: "/media/utgang.jpg",
} as const;

export const photoAlt: Record<string, string> = {
  "/media/classic-norway.jpg":
    "Classic Norway Hotels, navngitt relasjon. Foto fra kildematerialet, ikke et dokumentert brannresultat",
  "/partners/weenaas.jpg":
    "Wenaas, navngitt relasjon. Foto fra kildematerialet, ikke et dokumentert brannresultat",
  "/media/coop-extra.jpg":
    "Coop Extra-fasade. Navngitt relasjon, ikke et dokumentert brannresultat",
  "/media/sikkerhetsvegg.jpg":
    "Internkontrollvegg med branninstruks, rømningsplan, slokkeapparat, alarmpunkt og rømningsdør",
  "/media/internkontroll-rom.jpg":
    "Internkontroll ved rømningsdør: instruks, rømningsplan, slokker, alarmpunkt og døråpner, Stryn voksenopplæringssenter",
  "/media/naeringsbygg.jpg": "Fasade på næringsbygg i tegl, bygget som eier og konsept skal kunne beskrive",
  "/media/romningstrapp.jpg": "Utvendig rømningstrapp. Når bruk eller planløsning endres, endres ofte rømningen",
  "/media/romning-ovenfra.jpg": "Rømningstrapp sett ovenfra, premiss i planen, ikke et tillegg etter anbud",
  "/media/fagmiljo.jpg": "Faglig gjennomgang av tegninger og dokumentasjon hos FLO",
  "/media/fagmiljo-to.jpg": "To leser underlaget på skjerm, digital avklaring før tiltak settes i gang",
  "/media/slokkeanlegg.jpg": "Ventil og trykk på slokkeanlegg, installasjon som må treffe dokumentert nivå",
  "/media/slokke-manometer.jpg": "Manometer og strømningsvakt på slokkeanlegg. Det som faktisk står i bygget",
  "/media/team.jpg": "To fagfolk hos FLO peker på underlag på skjerm, digital avklaring",
  "/media/skjermarbeid.jpg": "Fagperson leser underlag på skjerm, digital vurdering i hele landet",
  "/media/skjerm-peker.jpg": "To peker på dokumentasjon på skjerm, kilden leses før noe kalles pålegg",
  "/media/teknisk-anlegg.jpg": "Befaring i teknisk rom, når dokumentene ikke kan svare alene",
  "/media/anlegg-gjennomgang.jpg": "Gjennomgang av teknisk anlegg mellom rør, fysisk tilstedeværelse i Nordvestlandet",
  "/media/anlegg-nar.jpg": "Nær gjennomgang av anlegg, når papirene ikke stemmer med virkeligheten",
  "/media/brannskilt.jpg": "Manuelt brannalarmpunkt i et offentlig rom med brukere",
  "/media/roykvarsler.jpg": "Røykvarsler i tak, varsling som del av det som faktisk står i bygget",
  "/media/utgang.jpg": "Rømningsutgang i butikk. Det som står i bygget, må treffe den bruken som faktisk er der",
  "/media/skanner.jpg": "FLO-medarbeider med 3D-laserskanner. Bygget måles slik det faktisk står, når tegningene ikke stemmer",
  "/media/slokker-kontroll.jpg": "Kontroll av håndslokker. Det som henger på veggen, må virke den dagen det trengs",
  "/media/slokker-haand.jpg": "Fagperson hos FLO med håndslokker under gjennomgang av slokkeutstyr",
  "/media/tavle-laptop.jpg": "Tekniker med laptop ved brannalarmsentral. Anlegget leses mot dokumentasjonen",
  "/media/nodutgang-lys.jpg":
    "Illustrasjonsfoto: nødutgangslys i korridor med brannmelder. Generert stemningsbilde, ikke et FLO-oppdrag",
  "/media/nodutgang-korridor.jpg":
    "Illustrasjonsfoto: nødutgangslys over rømningsvei i mørk korridor. Generert stemningsbilde, ikke et FLO-oppdrag",
};

export const articleStill: Record<string, string> = {
  "brannkonsept-eller-prosjektering": stills.bygg,
  "nar-bruken-endres": stills.romning,
  "ns-3924": stills.drawings,
  "flere-krav-samme-bygg": stills.internkontroll,
  "hva-kan-avklares-digitalt": stills.skjermPeker,
  "3d-skanning": stills.skanner,
};

export const situationStill: Record<string, string> = {
  papekt: stills.internkontrollRom,
  endres: stills.romning,
  uklart: stills.skjerm,
};

export const projectStill: Record<string, string> = {
  coop: stills.coop,
  "classic-norway": stills.classicNorway,
  weenaas: stills.weenaasBygg,
};

export const serviceStill: Record<string, string> = {
  brannvernradgivning: stills.avklaring,
  ribr: stills.drawings,
  "brannteknisk-utforelse": stills.anleggNar,
};

export const customerStill: Record<string, string> = {
  "eier-forvalter": stills.bygg,
  "virksomhet-bruker": stills.slokker,
  "arkitekt-byggherre": stills.drawings,
  entreprenor: stills.tavle,
  "industri-kraft": stills.befaring,
  kommune: stills.offentlig,
  privat: stills.detektor,
};

export const planStill = {
  rule: stills.internkontroll,
  tilsyn: stills.internkontrollRom,
  prosjekt: stills.bygg,
  drift: stills.slokker,
  avklaring: stills.avklaring,
  digitalt: stills.skjerm,
  hybrid: stills.digitalt,
  fysisk: stills.anleggNar,
  claim: stills.utgang,
  goals: stills.romningOvenfra,
  skanning: stills.skanner,
} as const;

export const partners = [
  { name: "Coop", file: "/partners/coop.svg", invert: true, mark: "logo", url: "https://www.coop.no/" },
  { name: "AHDA AS", file: "/partners/ahda.png", invert: true, mark: "logo", url: "https://www.ahda.no/" },
  {
    name: "Bremanger kommune",
    file: "/partners/bremanger.png",
    invert: true,
    mark: "logo",
    url: "https://bremanger.kommune.no/",
  },
  { name: "Agri Eiendom AS", file: "/partners/agri-eiendom.png", invert: true, mark: "logo", url: null },
  { name: "Musea i Sogn og Fjordane", file: "/partners/misf.png", invert: true, mark: "logo", url: "https://misf.no/" },
  {
    name: "Byggforvaltning Norge",
    file: "/partners/byggforvaltning.png",
    invert: true,
    mark: "logo",
    url: "https://www.byggforvaltningnorge.no/",
  },
  {
    name: "Classic Norway Hotels",
    file: "/partners/classic-norway.jpg",
    invert: false,
    mark: "type",
    url: "https://classicnorway.no/",
  },
  { name: "Wenaas", file: "/partners/weenaas.jpg", invert: false, mark: "type", url: null },
] as const;

export function serviceBySlug(slug: string) {
  return services.find((s) => s.slug === slug);
}

export function situationBySlug(slug: string) {
  return situations.find((s) => s.slug === slug);
}

export function customerBySlug(slug: string) {
  return customers.find((c) => c.slug === slug);
}

export const commercialCustomers = customers.filter((c) => c.track !== "privat");
export const privateCustomers = customers.filter((c) => c.track === "privat");

export function projectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function faqById(id: string) {
  return faqs.find((f) => f.id === id);
}

export function articleBySlug(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function newsBySlug(slug: string) {
  return news.find((item) => item.slug === slug);
}

