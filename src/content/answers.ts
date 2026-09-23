import { customerExplain, serviceExplain, situationAsk, situationExplain } from "@/content/explain";
import { customers, photoAlt, stills } from "@/content/site";

export const answerOrder = [
  "a1",
  "a2",
  "a3",
  "a4",
  "a5",
  "a6",
  "a7",
  "a8",
  "a9",
  "a10",
  "a11",
] as const;

export type AnswerId = (typeof answerOrder)[number];

export const answerQuestion: Record<AnswerId, string> = {
  a1: "Hva gjelder?",
  a2: "Hvem gjelder det for?",
  a3: "Hva betyr det i bygget?",
  a4: "Hvem har ansvaret?",
  a5: "Er dette krav, anbefaling eller påstand?",
  a6: "Hva må vi vite før vi handler?",
  a7: "Kan dere se på dokumentene uten befaring?",
  a8: "Når må noen komme til bygget?",
  a9: "Finnes andre løsninger?",
  a10: "Hva haster, og hva kan vente?",
  a11: "Hva gjør vi nå?",
};

/** CRO-kapitler på undersider. A1–A11 er intern rekkefølge, ikke merkelapper. */
export const answerChapters = [
  { id: "situasjonen", label: "Hva gjelder?", covers: ["a1", "a2"] },
  { id: "praksis", label: "I bygget", covers: ["a3"] },
  { id: "krav-og-kilde", label: "Er det krav?", covers: ["a4", "a5"] },
  { id: "avklaring", label: "Hva må vi vite?", covers: ["a6"] },
  { id: "spor", label: "Befaring?", covers: ["a7", "a8"] },
  { id: "neste", label: "Hva gjør vi nå?", covers: ["a9", "a10", "a11"] },
] as const;

export type AnswerPhoto = {
  src: string;
  alt: string;
  caption: string;
};

export type Answer = {
  answer: string;
  detail?: string;
  points?: readonly string[];
  photo?: AnswerPhoto;
};

export type RelatedLink = { href: string; label: string };

export type AnswerPage = {
  kind: "situation" | "service" | "customer" | "article" | "claim";
  slug: string;
  room: string;
  kicker: string;
  title: string;
  lead: string;
  hero: AnswerPhoto;
  cta: { action: string; href: string };
  answers: Record<AnswerId, Answer>;
  related?: readonly RelatedLink[];
  disclaimer: string;
};

const disclaimer =
  "Dette er veiledning, ikke et vedtak for ditt bygg. FLO konkluderer når bygg, bruk og dokumentasjon er sett.";

function cap(src: string, caption: string): AnswerPhoto {
  return { src, alt: photoAlt[src] ?? caption, caption };
}

function page(
  partial: Omit<AnswerPage, "disclaimer"> & { disclaimer?: string },
): AnswerPage {
  return { disclaimer, ...partial };
}

export const situationAnswers: Record<string, AnswerPage> = {
  papekt: page({
    kind: "situation",
    slug: "papekt",
    room: "02A",
    kicker: "Avvik",
    title: situationAsk.papekt,
    lead: situationExplain.papekt.meaning,
    hero: cap(
      stills.internkontroll,
      "Fagfolk leser observasjonen mot dokumentene og hvordan bygget brukes, før tiltak settes i gang.",
    ),
    cta: { action: situationExplain.papekt.cta, href: situationExplain.papekt.href },
    related: [
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
      { href: "/losninger/brannteknisk-utforelse", label: "Brannteknisk utførelse" },
      { href: "/fag-og-kunnskap/pastand-eller-krav", label: "Påstand eller krav" },
      { href: "/fag-og-kunnskap/vi-har-fatt-avvik", label: "Vi har fått avvik" },
    ],
    answers: {
      a1: {
        answer:
          "Dere har fått tilsyn, avvik, pålegg, et kontrollfunn, eller et krav fra rådgiver.",
        detail:
          "Det som er sagt, er utgangspunktet for saken. Det er ikke automatisk den eneste riktige løsningen. FLO leser observasjonen mot bygg, bruk og dokumentasjon før tiltak settes i gang.",
        points: [
          "Tilsyn, avvik eller pålegg",
          "Kontrollfunn i installasjoner eller internkontroll",
          "Krav fra rådgiver, entreprenør eller annen fagpart",
          "Uenighet om hva som faktisk må gjøres",
        ],
      },
      a2: {
        answer:
          "Det gjelder den som har fått rapporten, oftest eier, forvalter eller bruker, og den som eier avviket i praksis.",
        detail:
          "Tilsyn treffer ofte både eier og bruker i samme bygg. Entreprenør treffes når noen i prosjektet har sagt at «dette må gjøres». Hvem som skal handle, avklares. Det gjettes ikke.",
        points: [
          "Eiendom og forvaltning med portefølje eller enkeltbygg",
          "Virksomhet med internkontrollansvar",
          "Utførende som har fått et krav i anleggsmøtet",
        ],
      },
      a3: {
        answer:
          "Noen har observert noe. Da er det lett å sette i gang første foreslåtte tiltak uten å vite om det er krav, anbefaling eller prosjektvalg.",
        detail:
          "I praksis betyr et avvik at noe ikke stemmer mot et grunnlag. Grunnlaget kan være forskrift, konsept, internkontroll eller bare praksis. Første jobb er å lese observasjonen, ikke å kjøpe en løsning.",
        photo: cap(
          stills.internkontroll,
          "Avviket treffer dokumentasjon og bruk. Første jobb er å lese observasjonen, ikke å kjøpe en løsning.",
        ),
      },
      a4: {
        answer:
          "Eier har det overordnede ansvaret for at brannsikkerheten er ivaretatt. Bruker har ansvar for daglig drift, rutiner, opplæring, øvelser og bruk av bygget.",
        detail:
          "Leiekontrakten kan fordele oppgaver. Det offentligrettslige ansvaret kan ikke avtales bort. Hvem som eier avviket i denne saken, er et avklaringsspørsmål, ikke en ferdig konklusjon på en nettside.",
      },
      a5: {
        answer:
          "Et avvik, et «brannvesenet krever» eller et «dette må gjøres» er en påstand inntil kilden er lest.",
        detail:
          "FLO skiller faktisk krav, anbefaling, faglig vurdering, prosjektvalg, praksis og uklart. Først når kilden holder, kalles noe pålegg. Heuristikk på ord er ikke et vedtak.",
        points: [
          "Krav, kan vises til lov, forskrift, vedtak eller vilkår for dette bygget",
          "Anbefaling, god praksis, ikke dokumentert som eneste måte",
          "Påstand, sagt, men uten tilstrekkelig kilde ennå",
        ],
      },
      a6: {
        answer:
          "Før tiltak bestemmes: hva er observert, hvilket bygg og hvilken bruk, hvilket grunnlag, hvilken klasse, hvem som har ansvaret, og hva som skal dokumenteres når saken er løst.",
        points: [
          "Hva er faktisk observert?",
          "Hvilket bygg og hvilken bruk gjelder det?",
          "Hvilket regelverk eller grunnlag ligger bak?",
          "Er dette krav, anbefaling eller faglig vurdering?",
          "Hvem har ansvaret?",
          "Finnes det alternative måter å oppfylle kravet på?",
          "Hva må dokumenteres når avviket lukkes?",
        ],
      },
      a7: {
        answer:
          "Tilsynsrapporter, avvikslister, konsept, tegninger og spørsmål om ansvar kan leses digitalt, uansett hvor i landet bygget ligger.",
        detail:
          "Kurs og gjennomgang kan også tas digitalt. Start med det som allerede finnes. Rapporten eller tegningene holder for at FLO skal begynne.",
      },
      a8: {
        answer:
          "Befaring, kontroll og utførelse skjer fra Stryn og Nordfjordeid, i Nordvestlandet, når dokumentasjonen ikke kan svare alene.",
        detail:
          "Fysisk tilstedeværelse trengs når installasjoner eller rømning må ses, når papirene ikke stemmer med virkeligheten, eller når risikoen ikke kan vurderes fra underlaget.",
      },
      a9: {
        answer:
          "Kravet, hvis det er et krav, kan ofte oppfylles på flere faglig forsvarlige måter. Å gjøre det som først ble sagt, er ett alternativ, ikke hele kartet.",
        points: [
          "Oppfylle kravet med et annet dokumenterbart tiltak",
          "Vise at eksisterende nivå allerede holder, hvis det gjør det",
          "Hente mer grunnlag før noe settes i gang",
          "Rådgivning, RIBr eller fysisk kontroll, etter hva saken faktisk trenger",
        ],
      },
      a10: {
        answer:
          "Først: les saken og klassifiser kilden. Utførelse venter til kravet er avklart. Det som ikke kan vente, er umiddelbar fare. Det er myndighet og akutt handling, ikke et nettsidevedtak.",
        detail:
          "Kontroll uten spor lukker sjelden avviket. Utførelse uten dokumentasjon lukker det heller ikke. Prioriter avklaring og spor, deretter det fysiske som faktisk trengs.",
      },
      a11: {
        answer:
          "Send rapporten, avviket eller det som ble sagt. FLO leser digitalt, ruter til rådgivning, RIBr eller fysisk kontroll, og sier hva som bør gjøres først.",
        detail:
          "Målet er ikke å gjøre mest mulig. Målet er å gjøre det som faktisk er nødvendig og riktig, og å kunne dokumentere det.",
      },
    },
  }),
  endres: page({
    kind: "situation",
    slug: "endres",
    room: "02B",
    kicker: "Ombygging",
    title: situationAsk.endres,
    lead: situationExplain.endres.meaning,
    hero: cap(
      stills.romning,
      "Når bruk eller planløsning endres, endres ofte forutsetningene konseptet ble skrevet på.",
    ),
    cta: { action: situationExplain.endres.cta, href: situationExplain.endres.href },
    related: [
      { href: "/losninger/ribr", label: "Branningeniører / RIBr" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
      { href: "/fag-og-kunnskap/nar-bruken-endres", label: "Når bruken endres" },
    ],
    answers: {
      a1: {
        answer:
          "Dere skal bygge om, endre bruk, ta inn ny leietaker, sette inn nytt utstyr eller endre drift.",
        detail:
          "Da kan forutsetningene for brannsikkerheten endres. Det som var riktig før endringen, er ikke nødvendigvis tilstrekkelig etterpå.",
        points: [
          "Nybygg eller ombygging",
          "Rehabilitering eller bruksendring",
          "Nye lokaler eller ny leietaker",
          "Nytt utstyr eller endret drift",
        ],
      },
      a2: {
        answer:
          "Det gjelder byggherre og arkitekt som tegner ferdig planløsningen, eier som skal dokumentere bygget etterpå, og utførende som skal treffe et avklart krav.",
        detail:
          "Ny leietaker er ikke bare en kontrakt mellom eier og bruker. Den kan være en ny forutsetning for hele brannkonseptet.",
      },
      a3: {
        answer:
          "Planløsning, tekniske valg og anbud går ofte ut før noen har spurt om konsept, rømning og installasjoner fortsatt stemmer.",
        detail:
          "I praksis betyr det at prosjektet tegner ferdig på gamle premisser. Kostnaden kommer når brannfaget kommer for sent, ikke fordi brann er «dyrt i seg selv».",
        photo: cap(
          stills.romning,
          "Rømningsvei er et premiss, ikke et interiørvalg. Endret personbelastning eller plan kan gjøre den gamle trappen til et nytt spørsmål.",
        ),
      },
      a4: {
        answer:
          "I byggesak styrer SAK10 hvem som er ansvarlig søker, prosjekterende og utførende. I drift har eier overordnet ansvar, bruker daglig drift.",
        detail:
          "Byggherre eier premissene i prosjektet. FLO kan være prosjekterende brannkonsept i tiltaksklasse 3, og uavhengig kontrollerende brannsikkerhet i tiltaksklasse 3, dokumentert hos DiBK. Det er ikke det samme som at hvert råd i et møte er et pålegg.",
      },
      a5: {
        answer:
          "«Vi må oppgradere til TEK17» er ofte en påstand. TEK17 kapittel 11 gjelder i hovedsak nybygg, ombygging, tilbygg og bruksendring.",
        detail:
          "Eksisterende bygg styres normalt av reglene som gjaldt på byggetidspunktet, med unntak der bruken endres eller sikkerheten er vesentlig mangelfull. Hva som treffer dette tiltaket, avklares mot dokumentene, ikke mot et stikkord.",
      },
      a6: {
        answer:
          "Avklar om bruk, personbelastning, rømning, brannceller eller installasjoner endres, og om gjeldende konsept matcher den planlagte bruken, før anbud.",
        points: [
          "Er dette nybygg, ombygging, tilbygg eller bruksendring?",
          "Endres personbelastning eller rømningsforhold?",
          "Påvirkes brannceller, seksjonering eller tekniske installasjoner?",
          "Matcher gjeldende brannkonsept den planlagte bruken?",
          "Når er konsept og detaljprosjektering to ulike jobber?",
          "Hvem eier premissene: byggherre, arkitekt, RIBr eller utførende?",
        ],
      },
      a7: {
        answer:
          "Plantegninger, beskrivelse av tiltaket, planlagt bruk, personantall og eksisterende konsept kan leses digitalt i hele landet.",
        detail:
          "Innledende prosjektavklaring, second opinion og skillet krav versus prosjektvalg starter der. Befaring er ikke automatisk første steg.",
      },
      a8: {
        answer:
          "Når rømning, seksjonering eller installasjoner må ses mot virkeligheten, kommer FLO fra Stryn og Nordfjordeid, i Nordvestlandet.",
        detail:
          "3D-skanning og kartlegging er verktøy når underlaget ikke treffer bygget, ikke et produkt man skal kjøpe «i tillegg».",
      },
      a9: {
        answer:
          "Preaksepterte ytelser er én vei. Analyse og dokumenterbare alternativer er en annen. Kostnad og fremdrift er ikke automatisk minstekrav.",
        detail:
          "FLO viser faglig forsvarlige veier før tiltak settes i gang. Kunden velger. Vi starter ikke utførelse uten at du velger det.",
      },
      a10: {
        answer:
          "Først: premisser og eventuelt oppdatert konsept, før planløsning og anbud er ferdige. Detalj og utførelse kan vente. Bruksendring som allerede er i gang uten avklart konsept, kan ikke vente.",
        detail:
          "Etter ferdig prosjekt skal dokumentasjonen tilbake i drift. Ellers arver neste leietaker et gap.",
      },
      a11: {
        answer:
          "Send tegninger og beskrivelsen av det som skal endres. FLO avklarer premissene, ruter til RIBr når konsept trengs, og til rådgivning når driften skal eie resultatet.",
      },
    },
  }),
  uklart: page({
    kind: "situation",
    slug: "uklart",
    room: "02C",
    kicker: "Krav",
    title: situationAsk.uklart,
    lead: situationExplain.uklart.meaning,
    hero: cap(
      stills.digitalt,
      "Uklarhet løses først ved å lese det som finnes, ikke ved å kjøpe et tiltak i blinde.",
    ),
    cta: { action: situationExplain.uklart.cta, href: situationExplain.uklart.href },
    related: [
      { href: "/fag-og-kunnskap/pastand-eller-krav", label: "Påstand eller krav" },
      { href: "/fag-og-kunnskap/hva-kan-avklares-digitalt", label: "Hva kan avklares digitalt" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
    ],
    answers: {
      a1: {
        answer:
          "Det er uklart hvem som har ansvaret, om dette er et krav, om dokumentasjonen holder, og om noen må komme på befaring.",
        detail:
          "Mange brannsikkerhetssaker starter ikke med et konkret avvik. De starter med usikkerhet. Det er en gyldig start.",
        points: [
          "Hva gjelder, og hvem har ansvaret?",
          "Er dette faktisk et krav?",
          "Hvilke dokumentasjonskrav finnes?",
          "Finnes en enklere løsning?",
        ],
      },
      a2: {
        answer:
          "Det gjelder alle som sitter med et «må» uten kilde: eier, bruker, forvalter, arkitekt, entreprenør, industri eller kommune.",
        detail:
          "Hvis du ikke vet om du er i «påpekt» eller «endres», er du her. FLO ruter deg videre når situasjonen er tydelig.",
      },
      a3: {
        answer:
          "Uten en tydelig situasjon er første trekk ofte å kjøpe et tiltak. Da betaler man for aktivitet, ikke for avklaring.",
        detail:
          "I praksis betyr uklarhet at påstand og krav er blandet, at eier og bruker ikke er enige, eller at regelverket er kjent men ikke anvendt på dette bygget.",
        photo: cap(
          stills.digitalt,
          "Fagfolk leser tegninger og dokumenter. Det er her uklarhet vanligvis løses, før noen reiser.",
        ),
      },
      a4: {
        answer:
          "Eier har overordnet ansvar. Bruker har daglig drift. Hvis det er uklart hvem av dere som eier saken, er det selve spørsmålet, ikke et sidespor.",
        detail:
          "Leiekontrakten forklarer oppgavefordeling. Den flytter ikke det offentligrettslige ansvaret. FLO gjør skillet synlig, uten å late som juridisk dom.",
      },
      a5: {
        answer:
          "Alt som sies uten kilde, er påstand inntil det er klassifisert. Uklart er en gyldig klasse. Da stopper vi og henter grunnlag.",
        detail:
          "FLO skiller krav, anbefaling, faglig vurdering, prosjektvalg og praksis. Verktøyet «påstand eller krav» er arbeidsrom, ikke vedtak.",
      },
      a6: {
        answer:
          "Hva er sagt, og av hvem? Finnes en kilde, lov, forskrift, konsept, tilsyn eller bare praksis? Hva vet vi om bygg, bruk og dokumentasjon i dag? Hva er minste steg som gjør saken tydelig?",
        points: situationExplain.uklart.clarify,
      },
      a7: {
        answer:
          "Det meste av uklarhet kan leses digitalt i hele landet: dokumentasjon, tegninger, konsept, ansvarsspørsmål og second opinion.",
        detail:
          "Send rapporten, tegningene eller det som ble sagt. Vi sier om det kan leses herfra, eller om bygget må ses.",
      },
      a8: {
        answer:
          "Fysisk i Nordvestlandet bare når papirene ikke kan svare. Befaring er et svar på en usikkerhet, ikke et automatisk første steg.",
      },
      a9: {
        answer:
          "Digital avklaring, second opinion, vente på dokumenter, eller målrettet befaring. Å kjøpe tiltak uten klasse er det dårligste alternativet.",
      },
      a10: {
        answer:
          "Først: gjør situasjonen tydelig. Ikke kjøp tiltak. Fysisk kan vente til behovet er avklart. Det som ikke kan vente, er hvis noen allerede har et pålegg med frist. Da leser vi det først.",
      },
      a11: {
        answer:
          "Få en faglig avklaring. Lim inn det som ble sagt, eller beskriv usikkerheten. FLO klassifiserer kilden og sier hva dere gjør nå.",
      },
    },
  }),
};

export const serviceAnswers: Record<string, AnswerPage> = {
  brannvernradgivning: page({
    kind: "service",
    slug: "brannvernradgivning",
    room: "05A",
    kicker: "Rådgivning",
    title: "Brannvernrådgivning",
    lead: serviceExplain.brannvernradgivning.directAnswer,
    hero: cap(
      stills.internkontroll,
      "Rådgivning knytter det som brukes i bygget til sporbar dokumentasjon, ikke til et oppdiktet produkt.",
    ),
    cta: {
      action: serviceExplain.brannvernradgivning.cta,
      href: serviceExplain.brannvernradgivning.href,
    },
    related: [
      { href: "/losninger/ribr", label: "Branningeniører / RIBr" },
      { href: "/losninger/brannteknisk-utforelse", label: "Brannteknisk utførelse" },
      { href: "/situasjon/papekt", label: "Vi har fått avvik" },
    ],
    answers: {
      a1: {
        answer:
          "Brannvernrådgivning er oversikt over brannsikkerheten i drift: dokumentasjon, rutiner, tegninger, øvelser og oppfølging, uten at virksomheten må bli eksperter selv.",
        detail:
          "Mange har papirer. Færre har et system som viser hva som faktisk gjelder i bygget. Det er gapet dette faget treffer.",
      },
      a2: {
        answer:
          "Virksomheter og brukere med internkontrollansvar, og eiere og forvaltere som trenger dokumentert status per bygg eller i porteføljen.",
        points: [
          "Avvik eller tilsyn",
          "Manglende eller utdatert dokumentasjon",
          "Ny leietaker eller endret drift",
          "Behov for øvelser og opplæring",
        ],
      },
      a3: {
        answer:
          "I praksis kartlegger FLO hva bygget er, hvordan det brukes, hvilken dokumentasjon som finnes, hvem som har ansvaret, og hvilke avvik som er reelle.",
        detail:
          "Du får oversikt over tiltak og velger selv hva som skal utføres. Vi følger opp som avtalt. Du beholder styringen.",
        photo: cap(
          stills.internkontroll,
          "Rådgivning knytter det som brukes i bygget til sporbar dokumentasjon, ikke til et oppdiktet produkt.",
        ),
      },
      a4: {
        answer:
          "Eier har overordnet ansvar. Bruker har daglig drift. Rådgivning hjelper begge å vise at pliktene er ivaretatt, uten å flytte ansvaret over på FLO.",
        detail:
          "Leiekontrakten kan fordele oppgaver. Offentligrettslig ansvar kan ikke avtales bort.",
      },
      a5: {
        answer:
          "Internkontrollforskriften § 5 stiller krav til skriftlig dokumentasjon. Årlig øvelse er ofte anbefaling for ordinære virksomheter, og oftere minstekrav for særskilte brannobjekter.",
        detail:
          "FLO klassifiserer før vi kaller noe lovpålagt. At forsikring kan påvirkes ved hendelse, er en kjent risiko, ikke en garanti vi gir på vegne av et selskap.",
        points: [
          "Brann- og eksplosjonsvernloven",
          "Forskrift om brannforebygging",
          "Internkontrollforskriften",
        ],
      },
      a6: {
        answer:
          "Holder internkontrollen mot faktisk bruk? Hvem har ansvaret i praksis? Hva mangler, og hva er utdatert? Når holder rådgivning, og når trenger vi RIBr?",
        points: [...serviceExplain.brannvernradgivning.questions],
      },
      a7: {
        answer:
          "Gjennomgang av dokumentasjon, spørsmål om ansvar, krav versus anbefaling, second opinion og teoretisk opplæring kan gjøres digitalt i hele landet.",
      },
      a8: {
        answer:
          "Når papirene ikke stemmer med veggen, når øvelse må tas i bygget, eller når rømning og utstyr må ses. Da er vi i Nordvestlandet, fra Stryn og Nordfjordeid.",
      },
      a9: {
        answer:
          "Kartlegging og dokumentasjon. Årlig program for portefølje. Opplæring og øvelse. RIBr hvis konseptet er problemet. Utførelse hvis installasjonen er problemet.",
        detail:
          "Vanlige misforståelser: at leiekontrakten kan avtale bort det offentligrettslige ansvaret, og at manglende papirer bare er et formalitetsspørsmål.",
      },
      a10: {
        answer:
          "Først: status og spor. Utførelse og nye installasjoner venter til avviket er klassifisert. Portefølje med gap løses som program, ikke som enkeltstående brannøvelser.",
      },
      a11: {
        answer:
          "Send rapporten eller tegningene. Send adresse, bruk, eksisterende dokumentasjon og eventuelt avvik. Tid og pris avhenger av kompleksitet og om det er ett bygg eller en portefølje, avklares individuelt.",
      },
    },
  }),
  ribr: page({
    kind: "service",
    slug: "ribr",
    room: "05B",
    kicker: "RIBr",
    title: "Branningeniører / RIBr",
    lead: serviceExplain.ribr.directAnswer,
    hero: cap(
      stills.bygg,
      "Bygget er objektet for konseptet. RIBr sier hva som skal til, før detaljene tegnes.",
    ),
    cta: { action: serviceExplain.ribr.cta, href: serviceExplain.ribr.href },
    related: [
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
      { href: "/losninger/brannteknisk-utforelse", label: "Brannteknisk utførelse" },
      { href: "/fag-og-kunnskap/brannkonsept-eller-prosjektering", label: "Konsept eller detalj?" },
    ],
    answers: {
      a1: {
        answer:
          "RIBr er brannkonsept, detaljprosjektering og uavhengig kontroll. Konseptet sier hva som skal til. Prosjekteringen sier hvordan. Kontrollen sjekker grunnlaget.",
        detail:
          "Kostbare løsninger settes ofte i gang før noen har skilt prosjektvalg fra faktisk krav. Det er gapet dette faget treffer.",
      },
      a2: {
        answer:
          "Byggherrer og arkitekter i planlegging, eiere av eksisterende byggverk som trenger dokumentert nivå, og prosjekt der noen har påstått at et tiltak «må» gjøres.",
        points: [
          "Nybygg, ombygging, tilbygg eller bruksendring",
          "Behov for oppdatert brannkonsept",
          "Uavhengig kontroll av brannprosjektering",
          "Ekspertvurdering der preaksepterte ytelser ikke treffer",
        ],
      },
      a3: {
        answer:
          "FLO avklarer bygg, bruk og risikoklasse, leser gjeldende konsept og tegninger, og skiller ytelser som faktisk kreves fra det som bare er sagt.",
        detail:
          "Leveransen kan være brannstrategi og konsept med branntekniske tegninger, detaljprosjektering av alarm, nødlys/ledesystem og røykventilasjon, uavhengig kontroll i tiltaksklasse 3, og beregninger der preaksept ikke treffer.",
        photo: cap(
          stills.bygg,
          "Næringsbygget er det konseptet skal beskrive. Fasaden er ikke bevis på at konseptet er oppdatert.",
        ),
      },
      a4: {
        answer:
          "Byggherre eier premissene. Ansvarlig søker, prosjekterende og kontrollerende følger SAK10. FLO har sentral godkjenning som prosjekterende brannkonsept TK3 og uavhengig kontrollerende brannsikkerhet TK3.",
        detail:
          "Godkjenningen er dokumentert hos DiBK for perioden 12.09.2024 til 12.09.2027. Den gjør ikke hvert møteråd til et pålegg.",
      },
      a5: {
        answer:
          "TEK17 kapittel 11 og SAK10 styrer tiltak. NS 3924:2025 er tegnespråk, ikke et automatisk krav om å tegne om alle eldre plantegninger.",
        detail:
          "At brannkonsept og detaljprosjektering er det samme, er en misforståelse. At eksisterende bygg automatisk skal oppgraderes til TEK17, er en annen.",
      },
      a6: {
        answer:
          "Trenger vi oppdatert konsept, eller holder det eksisterende? Er påstanden et krav eller et prosjektvalg? Hva gjør TEK17 for dette tiltaket, og hva gjør den ikke?",
        points: [...serviceExplain.ribr.questions],
      },
      a7: {
        answer:
          "Tegninger, konsept, tiltakbeskrivelse og second opinion leses digitalt i hele landet. Innledende avklaring før anbud starter der.",
      },
      a8: {
        answer:
          "Når bygget, rømningen eller installasjonene må ses mot konseptet, er fysisk del i Nordvestlandet. Kartlegging brukes når underlaget ikke treffer virkeligheten.",
      },
      a9: {
        answer:
          "Preaksepterte ytelser, analyse, oppdatert konsept, detalj, uavhengig kontroll, eller å dokumentere at eksisterende nivå holder. Flere veier, synlige for kunden før låsing.",
      },
      a10: {
        answer:
          "Først: premiss og konsept. Deretter detalj og kontroll. Utførelse kommer etter avklart ytelse. Anbud uten underlag er det som ikke bør skje.",
      },
      a11: {
        answer:
          "Avklar før anbudet går ut. Send plantegninger, planlagt bruk, eksisterende konsept og tidsplan. Omfang styres av kompleksitet og tiltaksklasse, avklares individuelt.",
      },
    },
  }),
  "brannteknisk-utforelse": page({
    kind: "service",
    slug: "brannteknisk-utforelse",
    room: "05C",
    kicker: "Utførelse",
    title: "Brannteknisk utførelse",
    lead: serviceExplain["brannteknisk-utforelse"].directAnswer,
    hero: cap(
      stills.slokke,
      "Kontroll treffer det som faktisk står i bygget. Utførelse uten spor tilbake i dokumentasjonen lukker sjelden avviket.",
    ),
    cta: {
      action: serviceExplain["brannteknisk-utforelse"].cta,
      href: serviceExplain["brannteknisk-utforelse"].href,
    },
    related: [
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
      { href: "/losninger/ribr", label: "Branningeniører / RIBr" },
      { href: "/situasjon/papekt", label: "Vi har fått avvik" },
    ],
    answers: {
      a1: {
        answer:
          "Brannteknisk utførelse er kontroll og dokumentasjon av branntekniske installasjoner, og utførelse når du er klar, montasje, utbedring og slokkeutstyr.",
        detail:
          "Kontroll uten utførelse, eller utførelse uten sporbar dokumentasjon, løser sjelden avviket.",
      },
      a2: {
        answer:
          "Eiere og forvaltere som trenger kontroll av installasjoner, og virksomheter som skal utbedre avvik.",
        points: [
          "Kontroll av branntekniske installasjoner",
          "Avvik som krever fysisk utbedring",
          "Montasje av slokkeutstyr",
          "Behov for å knytte kontroll til dokumentasjon",
        ],
      },
      a3: {
        answer:
          "FLO ser hvilke installasjoner som finnes, hva kontrollen faktisk viser, og hva som er avvik mot dokumentert nivå, ikke mot «slik vi pleier».",
        detail:
          "Passiv brannsikring spesifiseres per oppdrag. Vi lover ikke «alle områder» uten å navngi ytelser.",
        photo: cap(
          stills.slokke,
          "Fysisk anlegg avklares mot tegning og konsept, ikke mot magefølelse.",
        ),
      },
      a4: {
        answer:
          "Eier har overordnet ansvar for at installasjonene holder. Utførende dokumenterer det som er gjort. FLO eier ikke avviket for deg.",
      },
      a5: {
        answer:
          "Forskrift om brannforebygging og dokumentasjonskrav for utført arbeid styrer sporet. At kontroll alene er det samme som lukket avvik, er en misforståelse.",
        detail:
          "Hva som er avvik og hva som er vedlikehold, klassifiseres før utbedringen starter.",
      },
      a6: {
        answer:
          "Hva viser kontrollen mot dokumentert nivå? Må installasjonen ses på stedet? Hva er avvik, og hva er vedlikehold? Hva må dokumenteres når arbeidet er gjort?",
        points: [...serviceExplain["brannteknisk-utforelse"].questions],
      },
      a7: {
        answer:
          "Avvikslister, FDV, tegninger og kontrollrapporter kan leses digitalt i hele landet. Det avklarer om befaring i det hele tatt trengs.",
      },
      a8: {
        answer:
          "Kontroll, montasje, utbedring og inspeksjon av anlegg skjer fysisk i Nordvestlandet, fra Stryn og Nordfjordeid. Tilgang til bygget er en forutsetning.",
      },
      a9: {
        answer:
          "Bare kontroll. Kontroll pluss utbedring. Utbedring av det du velger, med spor tilbake i drift. RIBr hvis ytelsen ikke er avklart. Rådgivning hvis internkontrollen er gapet.",
      },
      a10: {
        answer:
          "Først: kontroll og oversikt. Deretter utførelse av det du velger. Dokumentasjon tilbake i systemet er del av jobben, ikke et vedlegg «hvis vi husker det».",
      },
      a11: {
        answer:
          "Få vurdert om befaring trengs. Send avviksliste, tegninger og FDV om det finnes. Omfang styres av antall installasjoner, tilkomst og om utbedring inngår.",
      },
    },
  }),
};

function customerPage(
  slug: keyof typeof customerExplain,
  hero: AnswerPhoto,
  answers: Record<AnswerId, Answer>,
  related: RelatedLink[],
): AnswerPage {
  const c = customers.find((item) => item.slug === slug);
  const expl = customerExplain[slug];
  const room = c?.room ?? "03";
  const label = c?.label ?? expl.realQuestion;
  const confirmed = c?.confirmed ?? false;
  return page({
    kind: "customer",
    slug,
    room,
    kicker: "Ansvar",
    title: label,
    lead: expl.meaning,
    hero,
    cta: { action: expl.cta, href: expl.href },
    related,
    answers,
    disclaimer: confirmed
      ? disclaimer
      : `${disclaimer} Denne rollen er relevant, men ikke dokumentert som FLO-kundegruppe med navngitt brannsak.`,
  });
}

export const customerAnswers: Record<string, AnswerPage> = {
  "eier-forvalter": customerPage(
    "eier-forvalter",
    cap(stills.bygg, "Næringsbygget eier skal kunne beskrive: hva gjelder her, og kan det dokumenteres?"),
    {
      a1: {
        answer:
          "Du har ansvar for ett eller flere næringsbygg. Problemet oppstår når dokumentasjon, bruk og faktisk tilstand ikke lenger stemmer overens.",
        detail:
          "Bygg er overtatt, ny leietaker kommer inn, lokaler bygges om, tilsyn avdekker mangler, eller tiltak er gjort over mange år uten samlet spor.",
      },
      a2: {
        answer:
          "Byggeiere, forvaltere og fagmiljø i byggeprosessen. Typisk næringsbygg, porteføljer, kombinerte bygg, butikk og overnatting.",
      },
      a3: {
        answer:
          "Spørsmålet er ikke bare om bygget har slokkeutstyr. Spørsmålet er om vi vet hva som faktisk gjelder for dette bygget, og om vi kan dokumentere at det er ivaretatt.",
        photo: cap(
          stills.bygg,
          "Fasaden er bygget. Statusen er dokumentene pluss det som faktisk står inne. FLO leser begge.",
        ),
      },
      a4: {
        answer:
          "Eier har overordnet ansvar. Forvalter utfører ofte eiers oppgaver. Bruker har daglig drift. Tilsyn og internkontroll treffer begge, samme bygg, to plikter.",
      },
      a5: {
        answer:
          "«Vi har fått et avvik» er en observasjon. Om det er pålegg, anbefaling eller praksis, klassifiseres. Porteføljestandard er prosjektvalg inntil det er forankret i krav per bygg.",
      },
      a6: {
        answer:
          "Per bygg: hva gjelder, hva er dokumentert, hva er brukt til, hvem er bruker, og hva er påpekt. Deretter gap og prioritering, ikke et felles tiltak for hele porteføljen i blinde.",
      },
      a7: {
        answer:
          "Status, dokumentgjennomgang og prioritering per bygg kan startes digitalt i hele landet. Flere bygg gjør ikke befaring til første steg.",
      },
      a8: {
        answer:
          "Når papirene ikke overlever et leietakerskifte, eller når tilstanden må ses, er fysisk del i Nordvestlandet. Kartlegging når underlaget ikke treffer bygget.",
      },
      a9: {
        answer:
          "Status og dokumentasjon. Årlig program. RIBr ved endring. Utførelse ved avvik i anlegg. Ikke tre isolerte jobber for samme bygg hvis én avklaring holder.",
      },
      a10: {
        answer:
          "Først: oversikt. Avvik med frist leses først. Kosmetisk oppgradering av hele porteføljen kan vente. Ny leietaker uten oppdatert forutsetning kan ikke vente.",
      },
      a11: {
        answer:
          "Få oversikt over porteføljen. Send adressene og det som finnes av dokumentasjon. Coop er en navngitt relasjon, brannspesifikk effekt er ikke dokumentert i kildematerialet, og vi late som det ikke.",
      },
    },
    [
      { href: "/hvem-er-du/virksomhet-bruker", label: "Virksomhet / bruker, samme bygg" },
      { href: "/situasjon/papekt", label: "Vi har fått avvik" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
    ],
  ),
  "virksomhet-bruker": customerPage(
    "virksomhet-bruker",
    cap(stills.slokker, "Brukere i bygget hver dag. Internkontrollen må treffe faktisk bruk, ikke bare en perm."),
    {
      a1: {
        answer:
          "Du har ansvar for mennesker i bygget hver dag. Da holder det ikke å arve en perm. Internkontrollen må treffe faktisk bruk.",
      },
      a2: {
        answer:
          "Virksomheter med ansvar for brannsikkerheten til ansatte og brukere. Arbeidsbygninger, butikk, overnatting, industri.",
      },
      a3: {
        answer:
          "Har vi kontroll, og kan vi vise det, eller har vi bare papirer? Øvelse som ikke matcher risikoen, og uklart skille mot eier, er typisk.",
        photo: cap(
          stills.offentlig,
          "Alarmpunkt og mennesker i samme rom. Brukers plikt er daglig drift, opplæring og at folk vet hva de skal gjøre.",
        ),
      },
      a4: {
        answer:
          "Bruker har ansvar for daglig drift. Eier har overordnet ansvar. Dere deler bygget. Tilsyn kan treffe virksomheten selv om eier «eier anlegget».",
      },
      a5: {
        answer:
          "Internkontroll er krav til styring og dokumentasjon, ikke et krav om å eie slokkeanlegget. Hvem som eier utstyret, og hvem som øver, er to ulike spørsmål.",
      },
      a6: {
        answer:
          "Hvem gjør hva i leieforholdet? Holder rutinene mot faktisk bruk? Er øvelse og opplæring tilpasset risikoen? Hva sa tilsynet, hvis det har vært et?",
      },
      a7: {
        answer:
          "Gjennomgang av internkontroll, roller og teoretisk opplæring kan tas digitalt i hele landet.",
      },
      a8: {
        answer:
          "Praktisk øvelse og sjekk av at veggen stemmer med permen, skjer i Nordvestlandet når det trengs.",
      },
      a9: {
        answer:
          "Rutiner og spor. Opplæring. Øvelse. Utførelse hvis utstyr mangler. Ikke mer papir hvis kompetansegapet er det som stopper.",
      },
      a10: {
        answer:
          "Først: roller og om internkontrollen treffer bruken. Ny perm uten øvelse kan vente. Tilsyn med frist kan ikke.",
      },
      a11: {
        answer:
          "Kartlegg roller og kompetanse. Classic Norway er navngitt i overnatting, proof er svakt, og vi merker det.",
      },
    },
    [
      { href: "/hvem-er-du/eier-forvalter", label: "Eiendom / forvaltning, samme bygg" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
      { href: "/situasjon/uklart", label: "Er dette et krav?" },
    ],
  ),
  "arkitekt-byggherre": customerPage(
    "arkitekt-byggherre",
    cap(stills.romning, "Planløsning og bruk tegnes sammen. Brannpremissene må inn før anbud."),
    {
      a1: {
        answer:
          "Dere tegner ferdig. Brannkrav som kommer etter at planløsning og anbud er ferdige, blir dyre.",
      },
      a2: {
        answer:
          "Arkitekt og byggherre i nybygg, ombygging og bruksendring. Rollen er relevant, men ikke dokumentert som FLO-kundegruppe med navngitt oppdrag.",
      },
      a3: {
        answer:
          "Hvilke premisser må prosjektet bygge på, før vi tegner ferdig? Ombygging uten oppdatert konsept og anbud uten brannteknisk underlag er typisk.",
        photo: cap(
          stills.romning,
          "Planløsning og bruk tegnes sammen. Brannpremissene må inn før anbud.",
        ),
      },
      a4: {
        answer: "Byggherre eier premissene. Arkitekt tegner. RIBr beskriver brannytelsene. SAK10 fordeler ansvar i byggesak.",
      },
      a5: {
        answer:
          "At «brann må inn» er en anbefaling om timing. Hva TEK17 faktisk krever for dette tiltaket, er kravet. De to skal ikke blandes.",
      },
      a6: {
        answer:
          "Er dette bruksendring eller interiør? Matcher konseptet? Hva må være avklart før anbud? Kreves uavhengig kontroll?",
      },
      a7: {
        answer: "Tegninger og tiltakbeskrivelse leses digitalt i hele landet. Premissavklaring starter der.",
      },
      a8: {
        answer: "Når eksisterende rømning eller seksjonering må ses, er fysisk del i Nordvestlandet.",
      },
      a9: {
        answer: "Tidlig avklaring. Oppdatert konsept. Detalj og kontroll. Å tegne ferdig og «ta brann etterpå» er det dyreste alternativet.",
      },
      a10: {
        answer: "Først: premisser. Detalj kan vente. Anbud uten underlag bør ikke skje.",
      },
      a11: {
        answer: "Avklar før anbudet går ut. Send plan og bruk. Ingen navngitt FLO-oppdrag er knyttet til denne rollen ennå.",
      },
    },
    [
      { href: "/losninger/ribr", label: "Branningeniører / RIBr" },
      { href: "/situasjon/endres", label: "Vi skal bygge om" },
      { href: "/hvem-er-du/entreprenor", label: "Entreprenør, før anbud" },
    ],
  ),
  entreprenor: customerPage(
    "entreprenor",
    cap(stills.tavle, "På stedet treffer utførende det som ble sagt i møtet. Da trengs et avklart krav, ikke en ny påstand."),
    {
      a1: {
        answer:
          "Du skal utføre. Når andre fag sier at «dette må gjøres», trenger du et avklart krav, ikke en ny påstand i anleggsmøtet.",
      },
      a2: {
        answer:
          "Utførende i nye og eksisterende bygg. Rollen er relevant, uten dokumentert FLO-brannoppdrag.",
      },
      a3: {
        answer:
          "Er tiltaket et krav, eller et prosjektvalg dere kan dokumentere annerledes? Endring i eksisterende bygg uten avklart ytelse er typisk stopp.",
        photo: cap(stills.anleggNar, "Befaring i teknisk rom. Utførelse uten avklart ytelse blir omkamp."),
      },
      a4: {
        answer: "Utførende ansvar etter SAK10 for det som er avtalt. Kravet må være avklart av prosjekterende. FLO kan second-opinione kilden.",
      },
      a5: {
        answer:
          "Krav fra rådgiver er påstand inntil ytelsen er vist. FLO klassifiserer før du river eller monterer.",
      },
      a6: {
        answer: "Hva er sagt? Hvilket dokument? Hva er observert i bygget? Er det krav eller prosjektvalg?",
      },
      a7: {
        answer: "Notater, tegninger og «må-setninger» leses digitalt i hele landet.",
      },
      a8: {
        answer: "Når anlegget må ses, og når utbedring skal gjøres, er vi i Nordvestlandet.",
      },
      a9: {
        answer: "Second opinion. Avklart ytelse. Utførelse med sporbar dokumentasjon. Å gjøre det som ble sagt uten kilde, er det risikable alternativet.",
      },
      a10: {
        answer: "Først: klassifiser. Rive og montere venter. Frist i kontrakt er ikke det samme som offentligrettslig pålegg.",
      },
      a11: {
        answer: "Få vurdert hva som faktisk gjelder. Ingen navngitt FLO-oppdrag på denne rollen ennå.",
      },
    },
    [
      { href: "/fag-og-kunnskap/pastand-eller-krav", label: "Påstand eller krav" },
      { href: "/losninger/ribr", label: "RIBr" },
      { href: "/losninger/brannteknisk-utforelse", label: "Utførelse" },
    ],
  ),
  "industri-kraft": customerPage(
    "industri-kraft",
    cap(stills.slokke, "Endret drift endrer ofte risikoen det gamle konseptet ble skrevet på."),
    {
      a1: {
        answer:
          "Endret drift og nytt utstyr endrer ofte risiko. Da er det gamle konseptet en hypotese, ikke et svar.",
      },
      a2: {
        answer:
          "Virksomheter i industribygg og kraftanlegg, nevnt i FLO sitt tjenestespekter. Ikke dokumentert som FLO-kundegruppe med navngitt oppdrag.",
      },
      a3: {
        answer:
          "Matcher dokumentert nivå den driften dere faktisk har nå? Nytt utstyr uten oppdatert vurdering er typisk.",
        photo: cap(stills.slokkeManometer, "Teknisk anlegg må treffe dokumentert nivå etter at driften har endret seg."),
      },
      a4: {
        answer: "Virksomheten har internkontroll. Eier har overordnet bygningsansvar. Endret produksjon kan treffe begge.",
      },
      a5: {
        answer:
          "At «industri alltid krever mer» er praksis-snakk. Hva som faktisk kreves, følger bygg, bruk, risiko og eventuelt særskilt objekt.",
      },
      a6: {
        answer: "Hva er endret i drift eller utstyr? Matcher tegninger virkeligheten? Er konseptet skrevet på gammel produksjon?",
      },
      a7: {
        answer: "Prosessbeskrivelse, konsept og tegninger leses digitalt i hele landet.",
      },
      a8: {
        answer: "Når anlegg og risiko må ses, er fysisk del i Nordvestlandet.",
      },
      a9: {
        answer: "Oppdatert vurdering. Oppdatert konsept. Internkontroll. Utførelse der anlegget krever det.",
      },
      a10: {
        answer: "Først: matcher dokumentert nivå driften nå. Ny produksjon uten vurdering bør ikke starte.",
      },
      a11: {
        answer: "Avklar før driften endres. Ingen navngitt FLO-oppdrag på denne rollen ennå.",
      },
    },
    [
      { href: "/situasjon/endres", label: "Vi skal bygge om" },
      { href: "/losninger/ribr", label: "RIBr" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
    ],
  ),
  kommune: customerPage(
    "kommune",
    cap(stills.offentlig, "Offentlige rom, mange brukere, tilsyn. Sporbarhet må tåle at folk byttes ut."),
    {
      a1: {
        answer:
          "Offentlige bygg har tilsyn, mange brukere og internkontroll som skal tåle utskifting av folk. Kapasitet og sporbarhet er ofte flaskehalsen.",
      },
      a2: {
        answer:
          "Kommune og offentlig virksomhet med skoler, helse og formålsbygg. Bremanger kommune ligger som navngitt merke på gammelt nettsted. Det er ikke et dokumentert FLO-brannoppdrag.",
      },
      a3: {
        answer:
          "Kan vi vise, bygg for bygg, hva som gjelder og hva som er gjort? Årlig program slår enkeltstående øvelser.",
        photo: cap(
          stills.offentlig,
          "Publikum i kolonaden. Offentlig bygg treffes av tilsyn og av at brukerne ikke er «ansatte i permen».",
        ),
      },
      a4: {
        answer: "Kommunen som eier har overordnet ansvar. Virksomheten i bygget har daglig drift. Mange bygg betyr mange grensesnitt.",
      },
      a5: {
        answer:
          "Tilsyn er observasjon og eventuelt pålegg. Internkontroll er krav til styring. De to skal leses sammen, ikke som to innkjøp.",
      },
      a6: {
        answer: "Hvilke bygg, hvilken dokumentasjon, hva tilsyn har sagt, og om spor tåler personskifte.",
      },
      a7: {
        answer: "Status per bygg og program kan startes digitalt i hele landet.",
      },
      a8: {
        answer: "Når formålsbygg må ses, er fysisk del i Nordvestlandet.",
      },
      a9: {
        answer: "Status, årlig program, dokumentasjon som overlever utskifting. Ikke en øvelse per bygg isolert hvis gapet er system.",
      },
      a10: {
        answer: "Først: oversikt. Tilsyn med frist først. Nye øvelser uten spor kan vente.",
      },
      a11: {
        answer: "Få oversikt over bygningsmassen. Vi merker at Bremanger som logo ikke er et FLO-brannoppdrag.",
      },
    },
    [
      { href: "/hvem-er-du/eier-forvalter", label: "Eiendom / forvaltning" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
      { href: "/situasjon/papekt", label: "Vi har fått avvik" },
    ],
  ),
  privat: customerPage(
    "privat",
    cap(stills.detektor, "Rømning fra bolig er premiss, ikke interiør. Utleiedel vurderes før rommet tas i bruk."),
    {
      a1: {
        answer:
          "Før kjeller, loft eller del av boligen brukes som egen boenhet, må bruk, rømning, brannskille og øvrige byggtekniske forutsetninger vurderes. Det er ikke et interiørvalg.",
      },
      a2: {
        answer:
          "Privat eier og utleier. Eget spor, ikke eiendom/forvaltning, ikke portefølje. Privat er ikke dokumentert som FLO-hovedmarked.",
      },
      a3: {
        answer:
          "Typisk: utleiedel, kjeller som soverom, loft, bruksendring, rehabilitering, usikkerhet etter tilsyn. Spørsmålet er hva som faktisk skal endres, hvilke dokumenter som finnes, og når brannfaglig vurdering trengs sammen med øvrig byggesak.",
        photo: cap(stills.slokkerHaand, "Varsling og slokking i bolig. I bolig er rømning og bruk det som oftest avgjør om rommet kan brukes annerledes."),
      },
      a4: {
        answer:
          "I utleiebolig har eier og den med bruksrett selvstendige plikter. Kontrakten fordeler oppgaver, ikke det offentligrettslige ansvaret. FLO skiller pliktene, vi overtar dem ikke.",
      },
      a5: {
        answer:
          "At «alle utleiedeler krever RIBr» er påstand. At bruksendring og ny boenhet kan treffe TEK og SAK, er det som må avklares. Søknadsplikt avgjøres i saken, ikke av et stikkord.",
      },
      a6: {
        answer:
          "Hva skal rommet brukes til? Blir det egen boenhet? Hvordan rømmer man? Finnes tegninger? Hva er allerede bygget?",
      },
      a7: {
        answer:
          "Tegninger og bilder leses digitalt først, hele landet. Lav terskel: send inn det du har, ikke en ferdig søknad.",
      },
      a8: {
        answer:
          "Befaring når rømning, skille eller det som er bygget ikke kan avgjøres fra underlaget. Fysisk del er Nordvestlandet. Ikke første steg i blinde.",
      },
      a9: {
        answer:
          "Digital førstegangsvurdering. Avklare om befaring trengs. RIBr når tiltaket krever konsept eller søknad. Å ta rommet i bruk uten avklaring er det risikable alternativet.",
      },
      a10: {
        answer:
          "Først: beskriv endringen og send bilder eller tegning. Bygging og utleie venter. FLO konkluderer ikke «lovlig utleie» uten sak.",
      },
      a11: {
        answer:
          "Send inn tegninger eller bilder. Få en digital førstegangsvurdering. Avklar om befaring er nødvendig. Ingen oppdiktet boligsak.",
      },
    },
    [
      { href: "/privat", label: "Privat / bolig" },
      { href: "/fag-og-kunnskap/utleiedel", label: "Utleiedel" },
      { href: "/fag-og-kunnskap/eier-eller-bruker", label: "Eier eller bruker" },
      { href: "/fag-og-kunnskap/hva-kan-avklares-digitalt", label: "Digital først" },
    ],
  ),
};

export const articleAnswers: Record<string, AnswerPage> = {
  "brannkonsept-eller-prosjektering": page({
    kind: "article",
    slug: "brannkonsept-eller-prosjektering",
    room: "06K",
    kicker: "Brannkonsept",
    title: "Brannkonsept eller detaljprosjektering?",
    lead: "To dokumenter, to jobber. Å blande dem er en vanlig grunn til at tiltak blir både for dyre og for sene.",
    hero: cap(stills.bygg, "Bygget konseptet skal beskrive. Detaljen kommer etterpå."),
    cta: { action: "Avklar før anbudet går ut", href: "/kontakt?situasjon=endres&fag=ribr" },
    related: [
      { href: "/losninger/ribr", label: "RIBr" },
      { href: "/situasjon/endres", label: "Vi skal bygge om" },
    ],
    answers: {
      a1: {
        answer:
          "Brannkonseptet er det overordnede dokumentet som beskriver hvordan bygget skal sikres. Det sier hva som skal til. Brannteknisk prosjektering omsetter konseptet i detaljerte løsninger. Den sier hvordan.",
      },
      a2: {
        answer: "Byggherre, arkitekt, RIBr, utførende og de som senere skal eie bygget i drift.",
      },
      a3: {
        answer:
          "Når de to blandes, settes tiltak ofte i gang før noen har skilt prosjektvalg fra faktisk krav. Alarm, ledesystem, seksjonering og røykventilasjon er detalj, ikke konseptets første setning.",
        photo: cap(stills.drawings, "Fasaden er ikke konseptet. Konseptet er premissene bak fasaden."),
      },
      a4: {
        answer:
          "Prosjekterende RIBr eier konseptet når det er oppdraget. Detalj kan være samme eller annen part. Uavhengig kontroll sjekker grunnlaget. FLO har TK3 på konsept og på uavhengig kontroll brannsikkerhet.",
      },
      a5: {
        answer:
          "At «vi trenger et konsept» kan være krav i tiltak, eller anbefaling for å rydde i et eksisterende bygg. At hvert råd er et pålegg, er påstand.",
      },
      a6: {
        answer: "Finnes konsept? Matcher det bruken? Er det som etterspørres konsept eller detalj? Hva må være avklart før anbud?",
      },
      a7: {
        answer: "Eksisterende konsept og tegninger leses digitalt i hele landet.",
      },
      a8: {
        answer: "Når bygget ikke stemmer med konseptet, må det ses i Nordvestlandet.",
      },
      a9: {
        answer: "Oppdatere konsept. Bare detaljere. Dokumentere at eksisterende holder. Blande dem i ett dokument er det som skaper omkamp.",
      },
      a10: {
        answer: "Først: hva. Deretter: hvordan. Utførelse etter begge.",
      },
      a11: {
        answer: "Send konseptet og det som skal endres. FLO skiller de to jobbene før tiltak settes i gang.",
      },
    },
  }),
  "nar-bruken-endres": page({
    kind: "article",
    slug: "nar-bruken-endres",
    room: "06K",
    kicker: "Bruksendring",
    title: "Når bruken endres, endres ofte kravet",
    lead: "Ny leietaker er ikke bare en kontrakt. Det kan være en ny forutsetning for hele brannkonseptet.",
    hero: cap(stills.romning, "Rømning er skrevet for en bruk. Ny bruk kan gjøre den gamle rømningen til et nytt krav."),
    cta: { action: "Avklar før endring", href: "/kontakt?situasjon=endres" },
    related: [
      { href: "/situasjon/endres", label: "Vi skal bygge om" },
      { href: "/losninger/ribr", label: "RIBr" },
      { href: "/hvem-er-du/eier-forvalter", label: "Eiendom / forvaltning" },
    ],
    answers: {
      a1: {
        answer:
          "Ny leietaker, nytt utstyr eller endret drift kan endre forutsetningene konseptet ble skrevet på. Da endres ofte kravet, selv om veggene står.",
      },
      a2: {
        answer: "Eier som skal dokumentere bygget. Bruker som skal inn. Byggherre og arkitekt som tegner om.",
      },
      a3: {
        answer:
          "TEK17 kapittel 11 gjelder i hovedsak nybygg, ombygging, tilbygg og bruksendring. Eksisterende bygg styres normalt av byggetidens regler, med unntak der bruken endres eller sikkerheten er vesentlig mangelfull.",
        photo: cap(stills.romningOvenfra, "Personantall og bruk er det som avgjør om den gamle rømningen fortsatt holder."),
      },
      a4: {
        answer:
          "Eier har overordnet ansvar. Bruker har daglig drift. Leiekontrakten fordeler oppgaver, ikke det offentligrettslige ansvaret.",
      },
      a5: {
        answer:
          "At «ny leietaker alltid krever nytt konsept» er påstand. At bruksendring kan utløse TEK, er det som må avklares. Oppdatert konsept trengs typisk ved nybygg, bruksendring, større ombygging, endringer i installasjoner, og vesentlig endret virksomhet.",
      },
      a6: {
        answer: "Hva var forutsatt? Hva blir ny bruk og personantall? Endres rømning eller installasjoner? Matcher konseptet?",
      },
      a7: {
        answer: "Kontrakt, konsept og plan for ny bruk leses digitalt i hele landet.",
      },
      a8: {
        answer: "Når rømning og faktisk plan må ses, er vi i Nordvestlandet.",
      },
      a9: {
        answer: "Oppdatere konsept. Justere internkontroll. Avvise at endringen er bruksendring, hvis den ikke er det. Ikke låse interiør før premissene er lest.",
      },
      a10: {
        answer: "Først: er dette bruksendring? Innflytting uten avklart forutsetning bør ikke skje.",
      },
      a11: {
        answer: "Send gammel bruk, ny bruk og konseptet. FLO avklarer før leietakeren flytter inn.",
      },
    },
  }),
  "ns-3924": page({
    kind: "article",
    slug: "ns-3924",
    room: "06K",
    kicker: "Tegninger",
    title: "NS 3924 og felles språk for branntegninger",
    lead: "NS 3924:2025 er en felles måte å tegne brann på. FLO kan levere tegninger i dette språket. Vi siterer ikke morselskapets forvaltningsblogg som FLO-stemme.",
    hero: cap(stills.digitalt, "Tegninger leses. Felles språk gjør at arkitekt, RIBr og forvalter ser det samme."),
    cta: { action: "Send rapporten eller tegningene", href: "/kontakt?spor=digitalt" },
    related: [
      { href: "/losninger/ribr", label: "RIBr" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
    ],
    answers: {
      a1: {
        answer:
          "NS 3924:2025 gir et felles språk for branntegninger. Når arkitekt, RIBr, utførende og forvalter tegner i samme kode, blir det lettere å se hva som faktisk er forutsatt i bygget.",
      },
      a2: {
        answer: "De som tegner, leser og forvalter branntegninger, i prosjekt og i drift.",
      },
      a3: {
        answer:
          "FLO leverer branntegninger og orienteringsplaner som del av brannvernrådgivning og RIBr-oppdrag. At en standard finnes, betyr ikke at alle eldre tegninger automatisk er ugyldige.",
        photo: cap(stills.skjerm, "Fagmiljøet leser underlag. Standarden er språk, ikke et automatisk pålegg om å tegne alt på nytt."),
      },
      a4: {
        answer: "Den som bestiller tegningene eier dokumentet. FLO tegner som avtalt. Forvalter skal kunne lese dem i drift.",
      },
      a5: {
        answer:
          "NS 3924 er en standard. Den er ikke i seg selv et vedtak om at eldre tegninger er ugyldige. Å kreve «NS 3924 fordi alle gjør det» er praksis, inntil det er forankret i oppdraget.",
      },
      a6: {
        answer: "Hvilke tegninger finnes? På hvilket språk? Matcher de bygget? Trengs orienteringsplan til internkontroll eller konsepttegning til tiltak?",
      },
      a7: {
        answer: "Eksisterende tegninger leses digitalt i hele landet.",
      },
      a8: {
        answer: "Når tegningene ikke treffer bygget, kan kartlegging i Nordvestlandet være det som må gjøres.",
      },
      a9: {
        answer: "Tegne i NS 3924. Beholde eldre tegninger hvis de fortsatt beskriver bygget. Kartlegge på nytt. Vi bruker ikke forvaltningsinnhold fra andre merkevarer som FLO-stemme.",
      },
      a10: {
        answer: "Først: matcher tegningene virkeligheten. Ny standard uten behov kan vente.",
      },
      a11: {
        answer: "Send tegningene dere har. FLO sier om språket, gapet og hva dere gjør nå.",
      },
    },
  }),
  "flere-krav-samme-bygg": page({
    kind: "article",
    slug: "flere-krav-samme-bygg",
    room: "06K",
    kicker: "Tilsyn og TEK",
    title: "Når tilsyn, internkontroll og TEK treffer samme bygg",
    lead: "Et påbud, et avvik i internkontrollen og et krav i et ombyggingsprosjekt er ofte tre lesninger av samme bygg, ikke tre separate jobber.",
    hero: cap(
      stills.internkontroll,
      "Tilsyn, internkontroll og TEK leser ofte det samme bygget. Bestill én avklaring, ikke tre tiltak i blinde.",
    ),
    cta: { action: "Få avklart hva som faktisk gjelder", href: "/kontakt?situasjon=uklart" },
    related: [
      { href: "/situasjon/papekt", label: "Vi har fått avvik" },
      { href: "/situasjon/endres", label: "Vi skal bygge om" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
    ],
    answers: {
      a1: {
        answer:
          "Det som kommer som tilsyn eller påbud, treffer ofte det samme som internkontrollforskriften krever dokumentert i drift. Når bygget samtidig skal endres, kan TEK17 kapittel 11 og SAK10 treffe i tillegg.",
      },
      a2: {
        answer: "Eier og bruker i samme bygg. Byggherre hvis noe skal endres. Forvalter som skal holde spor.",
      },
      a3: {
        answer:
          "Da er det lett å sette i gang tre tiltak. Det som trengs, er én avklaring av bygg, bruk og dokumentasjon.",
        photo: cap(
          stills.internkontroll,
          "Tilsyn peker hit. Ombygging peker hit. Det er samme bygg, ikke tre separate jobber.",
        ),
      },
      a4: {
        answer:
          "Eier har overordnet ansvar. Bruker har daglig drift. Derfor må eier og bruker leses sammen, ikke som to isolerte kunder.",
      },
      a5: {
        answer:
          "Påbud, internkontrollavvik og TEK-krav kan være tre kilder. Hver kilde klassifiseres. De er ikke automatisk tre ulike minstekrav som skal summeres.",
      },
      a6: {
        answer:
          "Hva er observert? Hvilket regelsett? Er det krav, anbefaling eller vurdering? Endres bygget samtidig?",
      },
      a7: {
        answer: "Tilsyn, internkontroll og konsept kan leses digitalt i hele landet. Mye av sammenhengen synes der.",
      },
      a8: {
        answer: "Befaring når dokumentasjonen ikke kan svare alene, Nordvestlandet.",
      },
      a9: {
        answer: "Én avklaring. Deretter rådgivning, RIBr eller utførelse etter behov. Tre parallelle innkjøp er alternativet som vanligvis koster mest.",
      },
      a10: {
        answer: "Først: les kildene sammen. Tiltak etter klasse. Frist i tilsyn først hvis den finnes.",
      },
      a11: {
        answer: "Send tilsyn, internkontroll og det som skal endres. FLO klassifiserer kildene før noe kalles pålegg.",
      },
    },
  }),
  "hva-kan-avklares-digitalt": page({
    kind: "article",
    slug: "hva-kan-avklares-digitalt",
    room: "06K",
    kicker: "Befaring",
    title: "Hva kan avklares digitalt, og hva krever befaring?",
    lead: "Ikke alle saker trenger befaring. Ikke alle saker kan løses fra dokumentene. Forskjellen er hva usikkerheten faktisk gjelder.",
    hero: cap(stills.avklaring, "To fagfolk peker på underlaget. Det er nasjonal dekning, før noen reiser."),
    cta: { action: "Send rapporten eller tegningene", href: "/kontakt?spor=digitalt" },
    related: [
      { href: "/situasjon/uklart", label: "Er dette et krav?" },
      { href: "/losninger/brannvernradgivning", label: "Brannvernrådgivning" },
    ],
    answers: {
      a1: {
        answer:
          "Dokumentasjon, tegninger, tilsynsrapporter, konsept og spørsmål om ansvar kan ofte leses først. Befaring trengs når dokumentasjonen ikke stemmer med virkeligheten, når installasjoner eller rømning må ses, eller når risikoen ikke kan vurderes fra papir.",
      },
      a2: {
        answer: "Alle med et bygg et sted i landet. Digitalt er nasjonalt. Fysisk er Nordvestlandet.",
      },
      a3: {
        answer:
          "Hybrid er det vanlige sporvalget: digital gjennomgang, identifisere usikkerhet, målrettet befaring bare der svaret mangler.",
        photo: cap(stills.skjermPeker, "Peker på skjermen. Kurs og dokumentgjennomgang kan tas uten at noen må reise først."),
      },
      a4: {
        answer: "Kunden eier saken. FLO ruter sporet. Befaring er ikke et kjøpskrav for å få en første lesning.",
      },
      a5: {
        answer:
          "At «brann alltid krever befaring» er praksis-snakk. At dokumentene kan svare på ansvar og klasse, er det vanlige første steget.",
      },
      a6: {
        answer: "Hva usikkerheten gjelder. Hva som allerede finnes. Om virkeligheten må ses. Send det dere har. Vi sier om det kan leses herfra, eller om bygget må ses.",
      },
      a7: {
        answer:
          "Vurdering, dokumentgjennomgang, konsept, ansvar, krav versus anbefaling, second opinion, tilsyn som kan leses, innledende prosjektavklaring og teoretisk opplæring, hele landet.",
      },
      a8: {
        answer:
          "Bygg må kontrolleres, dokumentasjon stemmer ikke, risiko må ses, installasjoner må inspiseres, kartlegging inkludert 3D-skanning der det er avtalt, utførelse, praktisk øvelse, fra Stryn og Nordfjordeid.",
      },
      a9: {
        answer: "Digitalt. Hybrid. Fysisk. 3D-skanning er verktøy når underlaget ikke treffer, ikke et tilleggskjøp.",
      },
      a10: {
        answer: "Først: det vi allerede vet. Reise når svaret mangler.",
      },
      a11: {
        answer: "Send det dere har og underlaget. FLO ruter. Start digitalt hvis du kan.",
      },
    },
  }),
};

export const claimAnswers: AnswerPage = page({
  kind: "claim",
  slug: "pastand-eller-krav",
  room: "04",
  kicker: "Påstand eller krav",
  title: "Ikke alt som sies i et møte, er et pålegg.",
  lead: "Før et tiltak bestemmes må vi vite hva som faktisk er krav, hva som er anbefaling, og hvilke forutsetninger som gjelder for bygget.",
  hero: cap(stills.skjermPeker, "FLO vurderer dokumentasjonen sammen med opplysninger om bygget og bruken."),
  cta: { action: "Få vurdert hva som faktisk gjelder", href: "/kontakt?situasjon=uklart&tema=krav" },
  related: [
    { href: "/situasjon/uklart", label: "Er dette et krav?" },
    { href: "/situasjon/papekt", label: "Vi har fått avvik" },
    { href: "/losninger/ribr", label: "RIBr" },
  ],
  answers: {
    a1: {
      answer:
        "Noen har sagt at noe må gjøres. Det kan være påstand, anbefaling eller faktisk krav. FLO skiller påstand, fakta og kilde før noe kalles et krav.",
    },
    a2: {
      answer: "Eier, bruker, arkitekt, entreprenør, alle som har fått et «må» i et møte, en rapport eller en e-post.",
    },
    a3: {
      answer:
        "En tydelig begrunnelse gjør det enklere å velge riktig tiltak. Vi ser på beskjeden sammen med byggets bruk, tilstand og dokumentasjon, slik at dere får et bedre grunnlag for beslutningen.",
      photo: cap(stills.slokkeManometer, "Tilstand og dokumentasjon må ses i sammenheng når tiltak vurderes."),
      points: [
        "«Dette må bygges om.»",
        "«Dere må skifte hele løsningen.»",
        "«Dette er ikke lov.»",
        "«Brannvesenet krever dette.»",
      ],
    },
    a4: {
      answer:
        "Eier og bruker har ulike plikter knyttet til brannsikkerheten. FLO kan bistå med faglige vurderinger og dokumentasjon. Ansvar og oppfølging må avklares for det enkelte bygget.",
    },
    a5: {
      answer:
        "Et myndighetspålegg, et faglig råd og et leverandørtilbud har ulik betydning. For å avklare hva som gjelder, må vi undersøke både dokumentet og grunnlaget det viser til.",
      points: [
        "Krav, lov, forskrift, vedtak eller vilkår for dette bygget",
        "Anbefaling, veiledning eller god praksis",
        "Faglig vurdering, FLO eller annen fagpart, ikke automatisk pålegg",
        "Prosjektvalg, én løsning blant flere",
        "Praksis, «slik vi pleier» er ikke bevis",
        "Uklart, kilden mangler eller er for svak",
      ],
    },
    a6: {
      answer:
        "Vi trenger beskjeden dere har fått, hvem den kommer fra og opplysninger om bygget. Ta gjerne med tegninger, brannkonsept, rapporter og eventuelle frister.",
      points: ["Påstand", "Fakta", "Kilde", "Klassifisering", "Alternativer", "Beslutning"],
    },
    a7: {
      answer:
        "En første gjennomgang kan ofte gjøres digitalt. Beskriv saken i kontaktskjemaet eller ta kontakt, så avtaler vi hvordan underlaget kan deles. Veiviseren gir en sjekkliste; den analyserer ikke dokumenter.",
    },
    a8: {
      answer:
        "Hvis dokumentene ikke gir tilstrekkelig informasjon om faktisk tilstand eller bruk, kan det være behov for befaring. Vi avtaler omfanget ut fra saken og byggets beliggenhet.",
    },
    a9: {
      answer:
        "Hvis målet eller kravet kan oppfylles på flere måter, skal kunden se alternativene før tiltak settes i gang. Kostnad og fremdrift er ikke automatisk minstekrav.",
    },
    a10: {
      answer:
        "Samle beskjeden og dokumentene, noter fristene og avklar hvem som følger opp. Ved konkrete sikkerhetsproblemer må nødvendige tiltak håndteres straks. En faglig gjennomgang endrer ikke frister fra myndighetene.",
    },
    a11: {
      answer:
        "Bruk veiviseren for å finne ut hva dere bør undersøke, eller kontakt FLO for en konkret vurdering. Ta med beskjeden og dokumentasjonen dere har, så avklarer vi neste steg sammen.",
    },
  },
});

export function answerPageByKind(
  kind: AnswerPage["kind"],
  slug: string,
): AnswerPage | undefined {
  if (kind === "situation") return situationAnswers[slug];
  if (kind === "service") return serviceAnswers[slug];
  if (kind === "customer") return customerAnswers[slug];
  if (kind === "article") return articleAnswers[slug];
  if (kind === "claim") return claimAnswers;
  return undefined;
}

export function answersAsFaq(page: AnswerPage) {
  return answerOrder.map((id) => ({
    question: answerQuestion[id],
    answer: [page.answers[id].answer, page.answers[id].detail].filter(Boolean).join(" "),
  }));
}

export function firstSentence(text: string) {
  const cut = text.split(/(?<=\.)\s/)[0];
  return cut?.trim() || text;
}
