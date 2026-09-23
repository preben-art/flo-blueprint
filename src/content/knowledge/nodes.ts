import { stills } from "@/content/site";
import type { SourceId } from "@/content/knowledge/sources";

export type DeliveryMode = "digitalt" | "hybrid" | "fysisk";

export type KnowledgeNode = {
  slug: string;
  room: string;
  domain: string;
  kicker: string;
  question: string;
  still: string;
  icp: readonly string[];
  situation: readonly string[];
  service: readonly string[];
  related: readonly { href: string; label: string }[];
  sourceIds: readonly SourceId[];
  evidence: "SOURCE_CONFIRMED" | "INFERRED" | "EVIDENCE_REQUIRED";
  contract: {
    direct: string;
    appliesTo: string;
    dependsOn: readonly string[];
    requirement: string;
    assessment: string;
    alternatives: readonly string[];
    limitation: string;
    documents: readonly string[];
    next: { mode: DeliveryMode; action: string; href: string };
  };
  distribution: {
    gmb: string;
    linkedin: string;
  };
};

export const knowledgeNodes: readonly KnowledgeNode[] = [
  {
    slug: "eier-eller-bruker",
    room: "06A",
    domain: "ansvar",
    kicker: "Ansvar",
    question: "Hvem har ansvar for brannsikkerheten, eier eller leietaker?",
    still: stills.offentlig,
    icp: ["eier-forvalter", "virksomhet-bruker", "privat"],
    situation: ["uklart", "papekt"],
    service: ["brannvernradgivning"],
    related: [
      { href: "/hvem-er-du/eier-forvalter", label: "Eiendom / forvaltning" },
      { href: "/hvem-er-du/virksomhet-bruker", label: "Virksomhet / bruker" },
      { href: "/fag-og-kunnskap/stemmer-dokumentasjonen", label: "Stemmer dokumentasjonen?" },
      { href: "/fag-og-kunnskap/pastand-eller-krav", label: "Påstand eller krav" },
    ],
    sourceIds: ["fob-eier", "fob-bruker", "dsb-fob", "ik"],
    evidence: "SOURCE_CONFIRMED",
    contract: {
      direct:
        "Begge. Eier og bruker har selvstendige plikter. Leiekontrakten kan fordele oppgaver. Det offentligrettslige ansvaret kan ikke avtales bort.",
      appliesTo:
        "Eier, forvalter, virksomhet med bruksrett, og privat utleier. Tilsyn treffer ofte begge i samme bygg.",
      dependsOn: ["Hvem som har formell eierrett", "Hvem som har formell bruksrett", "Om virksomhet eier eller bruker", "Hva kontrakten faktisk fordeler"],
      requirement:
        "Forskrift om brannforebygging kap. 2: eier skal kjenne kravene, informere brukere, samordne bruk, kontrollere og vedlikeholde sikkerhetsinnretninger, og, når eier er virksomhet, dokumentere systematisk sikkerhetsarbeid (§§ 4–10). Kap. 3: den med bruksrett skal bruke bygget i samsvar med kravene, holde rømning, melde endringer og skader, og, når bruker er virksomhet, ha rutiner for evakuering, opplæring og dokumentasjon (§§ 11–13).",
      assessment:
        "Hvem som eier avviket i denne saken, er et avklaringsspørsmål. DSB: bruker er den med formell bruksrett, ikke «alle som oppholder seg». FLO leser kontrakt, tilsyn og internkontroll mot forskriften, ikke mot vane.",
      alternatives: [
        "Eier tar internkontroll for bygget, bruker tar drift og øvelse, med spor hos begge",
        "Samordning når flere virksomheter deler bygg",
        "Digital gjennomgang av roller før tiltak settes i gang",
      ],
      limitation:
        "Dette er veiledning, ikke en juridisk konklusjon for ditt bygg. Hvem som skal handle nå, avgjøres når bygg, bruk og dokumentasjon er sett.",
      documents: ["Leiekontrakt / bruksrett", "Brannkonsept eller tilsvarende underlag", "Internkontroll eier", "Internkontroll bruker", "Tilsyn eller avvik hvis det finnes"],
      next: {
        mode: "digitalt",
        action: "Send hvem som eier og hvem som bruker, FLO skiller pliktene",
        href: "/kontakt?situasjon=uklart&tema=ansvar",
      },
    },
    distribution: {
      gmb: "Eier og bruker har selvstendige plikter etter forskrift om brannforebygging. Kontrakten fordeler oppgaver, ikke offentligrettslig ansvar.",
      linkedin: "Du eier bygget. Leietaker bruker det. Hvem har ansvar for hva? Ikke én FAQ. To pliktsett.",
    },
  },
  {
    slug: "stemmer-dokumentasjonen",
    room: "06B",
    domain: "dokumentasjon",
    kicker: "Dokumentasjon",
    question: "Stemmer det som er dokumentert med det som faktisk er bygget og brukt?",
    still: stills.digitalt,
    icp: ["eier-forvalter", "industri-kraft", "kommune", "entreprenor"],
    situation: ["uklart", "endres"],
    service: ["brannvernradgivning", "ribr", "brannteknisk-utforelse"],
    related: [
      { href: "/fag-og-kunnskap/hva-har-endret-seg", label: "Hva har endret seg?" },
      { href: "/fag-og-kunnskap/hva-kan-avklares-digitalt", label: "Digitalt eller befaring" },
      { href: "/fag-og-kunnskap/ns-3924", label: "NS 3924" },
      { href: "/losninger/brannteknisk-utforelse", label: "Utførelse" },
    ],
    sourceIds: ["tek17-11", "fob-eier", "ns3924", "dibk-sg"],
    evidence: "SOURCE_CONFIRMED",
    contract: {
      direct:
        "Dokumentasjon er en hypotese inntil den er lest mot bygget. Gammel PDF, ny leietaker og endret drift er tre lag. De treffer ikke automatisk hverandre.",
      appliesTo: "Eksisterende næringsbygg, porteføljer, industri og formålsbygg der tiltak er gjort over tid.",
      dependsOn: ["Hvilket underlag som finnes", "Når det ble skrevet", "Hvilken bruk det forutsetter", "Hva som faktisk står i bygget"],
      requirement:
        "DiBK: forutsetninger for brannteknisk prosjektering skal bestemmes og beskrives, bruk, persontall, areal, etasjer, brannenergi og særskilt risiko. I bruksfasen trenger eier å kjenne forutsetninger og begrensninger. FOB § 4: eier skal kjenne kravene som gjelder for byggverket.",
      assessment:
        "3D-skanning og kartlegging er verktøy når papirene ikke treffer bygget, ikke et produkt man skal kjøpe «i tillegg». FLO starter med det som finnes. Befaring når usikkerheten krever det.",
      alternatives: [
        "Digital lesning av konsept, tegninger og avvik først",
        "Målrettet befaring der papir og virkelighet skilles",
        "Kartlegging / 3D når underlaget mangler eller ikke treffer",
      ],
      limitation:
        "At tegninger finnes, betyr ikke at de gjelder. At de mangler, betyr ikke at alt må bygges om. FLO konkluderer ikke mismatch uten underlag eller syn.",
      documents: ["Brannkonsept / strategi", "Branntegninger", "FDV / as built", "Endringslogg hvis den finnes", "Bilder eller plantegning av dagens bruk"],
      next: {
        mode: "hybrid",
        action: "Send det dere har. FLO sier om papirene kan svare, eller om bygget må ses",
        href: "/kontakt?spor=hybrid&tema=dokumentasjon",
      },
    },
    distribution: {
      gmb: "Har dere et brannkonsept, eller bare en PDF ingen vet om fortsatt gjelder? Start med det som finnes.",
      linkedin: "Stemmer dokumentasjonen med bygget? Gammel PDF + ny leietaker + endret drift er tre lag, ikke ett svar.",
    },
  },
  {
    slug: "hva-har-endret-seg",
    room: "06C",
    domain: "endring",
    kicker: "Endring",
    question: "Hva har endret seg, og hva betyr det for brannsikkerheten?",
    still: stills.romning,
    icp: ["eier-forvalter", "arkitekt-byggherre", "industri-kraft", "privat"],
    situation: ["endres"],
    service: ["ribr", "brannvernradgivning"],
    related: [
      { href: "/situasjon/endres", label: "Vi skal bygge om" },
      { href: "/fag-og-kunnskap/nar-bruken-endres", label: "Når bruken endres" },
      { href: "/losninger/ribr", label: "RIBr" },
      { href: "/fag-og-kunnskap/stemmer-dokumentasjonen", label: "Stemmer dokumentasjonen?" },
    ],
    sourceIds: ["tek17-11", "fob-bruker", "fob-eier"],
    evidence: "SOURCE_CONFIRMED",
    contract: {
      direct:
        "Endring i bruk, persontall, planløsning, leietaker, rømning, brannenergi, utstyr eller organisasjon kan gjøre gamle forutsetninger utilstrekkelige. Det som var riktig før, er ikke automatisk tilstrekkelig etterpå.",
      appliesTo: "Ny leietaker, ombygging, bruksendring, nytt utstyr, endret drift, utleiedel og rehabilitering.",
      dependsOn: ["Hva som faktisk endres", "Hvilke forutsetninger konseptet ble skrevet på", "Om tiltaket treffer TEK/SAK", "Hvem som eier og hvem som bruker etter endringen"],
      requirement:
        "DiBK kap. 11: prosjekteringsforutsetninger om bruk, persontall, areal, brannenergi og særskilt risiko skal bestemmes og dokumenteres. FOB § 11: bruker skal informere eier om endringer som kan påvirke sikkerheten mot brann. TEK17 kap. 11 treffer i hovedsak nybygg, ombygging, tilbygg og bruksendring, ikke automatisk alt eksisterende.",
      assessment:
        "Ny leietaker er ikke bare en kontrakt. FLO leser endringen mot bygg, bruk og dokumentasjon før planløsning, anbud eller utførelse settes i gang.",
      alternatives: [
        "Vise at eksisterende nivå fortsatt holder, hvis det gjør det",
        "Oppdatere konsept uten å bygge om alt",
        "Detaljprosjektere bare det som faktisk treffes",
      ],
      limitation: "Hva som treffer ditt tiltak, avgjøres mot dokumentene og planlagt bruk, ikke mot et stikkord om «ombygging».",
      documents: ["Hva som skal endres, i én setning", "Plantegning / skisse", "Gjeldende konsept hvis det finnes", "Planlagt bruk og persontall"],
      next: {
        mode: "digitalt",
        action: "Beskriv endringen. FLO avklarer før løsningen velges",
        href: "/kontakt?situasjon=endres",
      },
    },
    distribution: {
      gmb: "Ny leietaker i bygget? Endret bruk kan påvirke forutsetningene. Les hva som bør avklares før innflytting.",
      linkedin: "Ny leietaker betyr ikke bare nye vegger. Bruk, persontall og brannenergi er premisser, ikke interiør.",
    },
  },
  {
    slug: "utleiedel",
    room: "06P",
    domain: "privat",
    kicker: "Privat / bolig",
    question: "Kan jeg bruke kjeller, loft eller del av boligen som utleiedel?",
    still: stills.detektor,
    icp: ["privat"],
    situation: ["endres", "uklart"],
    service: ["ribr", "brannvernradgivning"],
    related: [
      { href: "/hvem-er-du/privat", label: "Privat / bolig" },
      { href: "/fag-og-kunnskap/hva-har-endret-seg", label: "Hva har endret seg?" },
      { href: "/fag-og-kunnskap/hva-kan-avklares-digitalt", label: "Digital først" },
      { href: "/fag-og-kunnskap/eier-eller-bruker", label: "Eier eller bruker" },
    ],
    sourceIds: ["tek17-11", "fob", "sak10"],
    evidence: "INFERRED",
    contract: {
      direct:
        "Før kjeller, loft eller del av boligen brukes som egen boenhet, må bruk, rømning, brannskille og øvrige byggtekniske forutsetninger vurderes. Det er ikke et interiørvalg.",
      appliesTo: "Privat eier og utleier. Eget spor, ikke eiendom/forvaltning.",
      dependsOn: ["Hva som faktisk skal endres", "Om det blir egen boenhet", "Rømning fra det nye rommet", "Hvilken dokumentasjon som finnes", "Om tiltaket er søknadspliktig"],
      requirement:
        "TEK17 kap. 11 og SAK10 treffer når tiltaket er nybygg, ombygging, tilbygg eller bruksendring. Eksisterende bolig styres normalt av reglene som gjaldt da den ble oppført, med unntak der bruken endres eller sikkerheten er vesentlig mangelfull. FOB gjelder eier og bruker av byggverk, også bolig.",
      assessment:
        "FLO kan lese tegninger og bilder digitalt først. Befaring når rømning, skille eller det som er bygget ikke kan avgjøres fra underlaget. Vi konkluderer ikke «lovlig utleie» uten sak.",
      alternatives: [
        "Digital førstegangsvurdering av tegning og bilder",
        "Avklare om befaring trengs",
        "RIBr når tiltaket krever konsept eller søknad",
      ],
      limitation:
        "FLO avgjør ikke hele byggesaken alene. Søknadsplikt, kommune og andre fag kan treffe. Privat er ikke dokumentert som FLO-hovedmarked på live nettsted, sporet vises uten oppdiktet case.",
      documents: ["Plantegning eller skisse", "Bilder av rommet og rømning", "Hva rommet skal brukes til", "Eksisterende tillatelser hvis de finnes"],
      next: {
        mode: "digitalt",
        action: "Send inn tegninger eller bilder. Få en digital førstegangsvurdering",
        href: "/kontakt?situasjon=endres&hvem=privat",
      },
    },
    distribution: {
      gmb: "Utleiedel i kjeller eller loft? Bruk, rømning og brannskille må vurderes før rommet tas i bruk. Start digitalt.",
      linkedin: "Privat utleie er et eget spor. Ikke samme tekst som næringseiendom.",
    },
  },
  {
    slug: "nar-ma-ribr-inn",
    room: "06R",
    domain: "ribr",
    kicker: "Prosjekt",
    question: "Når må RIBr inn i prosjektet?",
    still: stills.bygg,
    icp: ["arkitekt-byggherre", "entreprenor", "eier-forvalter"],
    situation: ["endres"],
    service: ["ribr"],
    related: [
      { href: "/losninger/ribr", label: "Branningeniører / RIBr" },
      { href: "/fag-og-kunnskap/brannkonsept-eller-prosjektering", label: "Konsept eller detalj" },
      { href: "/situasjon/endres", label: "Vi skal bygge om" },
    ],
    sourceIds: ["tek17-11", "sak10", "dibk-sg"],
    evidence: "SOURCE_CONFIRMED",
    contract: {
      direct:
        "Før planløsning og anbud er ferdige. Konseptet sier hva som skal til. Detaljprosjekteringen sier hvordan. Kontroll sjekker grunnlaget. Det er tre jobber.",
      appliesTo: "Byggherre, arkitekt og utførende i nybygg, ombygging, tilbygg og bruksendring.",
      dependsOn: ["Tiltakets art og klasse", "Om eksisterende konsept matcher planlagt bruk", "Hvilke ytelser som må være avklart før anbud"],
      requirement:
        "TEK17 kap. 11 setter ytelser for sikkerhet ved brann i tiltak der forskriften gjelder. SAK10 regulerer ansvar og kontroll. FLO har sentral godkjenning som prosjekterende brannkonsept i tiltaksklasse 3 og uavhengig kontrollerende brannsikkerhet i tiltaksklasse 3, dokumentert hos DiBK. Det er ikke det samme som at hvert råd i et møte er et pålegg.",
      assessment: "Å komme inn etter at planen er tegnet ferdig, er ofte det dyreste tidspunktet å diskutere brannpremisser.",
      alternatives: [
        "Tidlig avklaring uten fullt konsept, når usikkerheten er avgrenset",
        "Oppdatere eksisterende konsept",
        "Uavhengig kontroll der det kreves",
      ],
      limitation: "Tiltaksklasse og om kontroll kreves, avgjøres i saken. Godkjenning i registeret er ikke et vedtak for ditt prosjekt.",
      documents: ["Plantegninger", "Planlagt bruk og persontall", "Eksisterende konsept", "Fremdrift for søknad eller anbud"],
      next: {
        mode: "digitalt",
        action: "Avklar før anbudet går ut",
        href: "/kontakt?situasjon=endres&fag=ribr",
      },
    },
    distribution: {
      gmb: "Når bør brannfaget inn? Før planløsning og anbud er ferdige, ikke etter.",
      linkedin: "Det dyreste tidspunktet å diskutere brannpremisser kan være etter at planen er tegnet ferdig.",
    },
  },
  {
    slug: "vi-har-fatt-avvik",
    room: "06D",
    domain: "avvik",
    kicker: "Avvik",
    question: "Vi har fått et brannavvik, hva gjør vi nå?",
    still: stills.internkontroll,
    icp: ["eier-forvalter", "virksomhet-bruker", "entreprenor", "kommune"],
    situation: ["papekt"],
    service: ["brannvernradgivning", "brannteknisk-utforelse", "ribr"],
    related: [
      { href: "/situasjon/papekt", label: "Vi har fått avvik" },
      { href: "/fag-og-kunnskap/pastand-eller-krav", label: "Påstand eller krav" },
      { href: "/fag-og-kunnskap/eier-eller-bruker", label: "Eier eller bruker" },
      { href: "/losninger/brannteknisk-utforelse", label: "Utførelse" },
    ],
    sourceIds: ["fob", "fob-eier", "dsb-fob", "ik"],
    evidence: "SOURCE_CONFIRMED",
    contract: {
      direct:
        "Les observasjonen før du kjøper tiltaket. Avviket er det som er pekt på. Løsningen er det som skal dokumenteres mot kravet, hvis det er et krav.",
      appliesTo: "Eier, forvalter, bruker og utførende som har fått tilsyn, kontrollfunn, pålegg eller et «må» fra annen fagpart.",
      dependsOn: ["Hva som er observert", "Hvilken kilde som er oppgitt", "Frist hvis den finnes", "Hvem som eier og hvem som bruker", "Hva dokumentasjonen allerede viser"],
      requirement:
        "FOB krever at eier kjenner kravene, kontrollerer og vedlikeholder sikkerhetsinnretninger, og dokumenterer når eier er virksomhet. Bruker skal holde rømning og melde endringer. Internkontrollforskriften § 5 krever skriftlig spor. At noe er påpekt, er ikke automatisk det samme som at hele anlegget må skiftes.",
      assessment:
        "FLO klassifiserer: pålegg, anbefaling, faglig vurdering eller uklart. Hvem som skal handle, følger plikten, ikke den som skrev e-posten. Fysisk kontroll når papirene ikke kan svare.",
      alternatives: [
        "Lukke mot dokumentert nivå, hvis nivået holder",
        "Utbedre det som faktisk er avvik",
        "Prosjektere når ytelsen ikke er avklart",
        "Samordne eier og bruker når avviket treffer begge",
      ],
      limitation: "Frist i tilsyn er myndighetens. FLO vedtar ikke for kommunen. Uten rapport eller underlag klassifiserer vi som uklart.",
      documents: ["Tilsyn / avviksrapport", "Bilder av det som er pekt på", "Gjeldende konsept eller internkontroll", "Leiekontrakt hvis ansvaret er uklart"],
      next: {
        mode: "digitalt",
        action: "Send det som er sagt. FLO skiller observasjon fra tiltak",
        href: "/kontakt?situasjon=papekt",
      },
    },
    distribution: {
      gmb: "Har dere fått avvik? Start med det som er observert, ikke med å skifte alt. Les hva som bør avklares først.",
      linkedin: "Avviket er observasjonen. Tiltaket er en hypotese inntil kilden er lest.",
    },
  },
  {
    slug: "gammel-dokumentasjon",
    room: "06E",
    domain: "eksisterende",
    kicker: "Eksisterende bygg",
    question: "Gammel dokumentasjon, hvordan vet du om den fortsatt gjelder?",
    still: stills.digitaltTo,
    icp: ["eier-forvalter", "industri-kraft", "kommune"],
    situation: ["uklart", "endres"],
    service: ["brannvernradgivning", "ribr"],
    related: [
      { href: "/fag-og-kunnskap/stemmer-dokumentasjonen", label: "Stemmer dokumentasjonen?" },
      { href: "/fag-og-kunnskap/hva-har-endret-seg", label: "Hva har endret seg?" },
      { href: "/fag-og-kunnskap/3d-skanning", label: "Når 3D-skanning er nyttig" },
      { href: "/fag-og-kunnskap/overtakelse", label: "Overtakelse" },
    ],
    sourceIds: ["tek17-11", "fob-eier", "ns3924"],
    evidence: "SOURCE_CONFIRMED",
    contract: {
      direct:
        "Datoen på PDF-en er ikke svaret. Gjelder den bruken, persontallet, brannenergien og rømningen dere har nå? Hvis forutsetningene har flyttet seg, er dokumentet en hypotese.",
      appliesTo: "Eksisterende næringsbygg og porteføljer der tiltak, leietakere og drift har laget seg over tid.",
      dependsOn: ["Når underlaget ble skrevet", "Hvilken bruk det forutsetter", "Hva som er endret siden", "Om as built treffer bygget"],
      requirement:
        "DiBK: forutsetninger for brannteknisk prosjektering skal bestemmes og beskrives. FOB § 4: eier skal kjenne kravene som gjelder for byggverket. NS 3924 er felles tegnespråk. Den gjør ikke eldre tegninger automatisk ugyldige.",
      assessment:
        "FLO leser dokumentet mot dagens bruk før noen tegner om. At underlaget er gammelt, er ikke automatisk et pålegg om nytt konsept. At det er nytt, er ikke automatisk dekning.",
      alternatives: [
        "Dokumentere at eksisterende nivå fortsatt holder",
        "Oppdatere konsept for den delen som er endret",
        "Kartlegge når papirene ikke treffer",
      ],
      limitation: "Uten å se underlaget og bruken konkluderer vi ikke «gjelder» eller «gjelder ikke».",
      documents: ["Eldste og nyeste konsept", "Tegninger", "Logg over endringer hvis den finnes", "Dagens bruk og persontall"],
      next: {
        mode: "digitalt",
        action: "Send det eldste og det nyeste. FLO sier om gapet er lesbart",
        href: "/kontakt?situasjon=uklart&tema=dokumentasjon",
      },
    },
    distribution: {
      gmb: "Har dere et brannkonsept, eller en PDF ingen vet om fortsatt gjelder? Start med det som finnes.",
      linkedin: "Gammel dokumentasjon er ikke automatisk ugyldig. Endret bruk kan gjøre den utilstrekkelig.",
    },
  },
  {
    slug: "3d-skanning",
    room: "06F",
    domain: "kartlegging",
    kicker: "Kartlegging",
    question: "Når er 3D-skanning nyttig i eksisterende bygg?",
    still: stills.skanner,
    icp: ["eier-forvalter", "arkitekt-byggherre", "entreprenor"],
    situation: ["uklart", "endres"],
    service: ["brannvernradgivning", "ribr"],
    related: [
      { href: "/fag-og-kunnskap/stemmer-dokumentasjonen", label: "Stemmer dokumentasjonen?" },
      { href: "/fag-og-kunnskap/gammel-dokumentasjon", label: "Gammel dokumentasjon" },
      { href: "/fag-og-kunnskap/hva-kan-avklares-digitalt", label: "Digitalt eller befaring" },
      { href: "/losninger/ribr", label: "RIBr" },
    ],
    sourceIds: ["tek17-11", "fob-eier", "ns3924"],
    evidence: "INFERRED",
    contract: {
      direct:
        "Når papirene ikke treffer bygget, og når rømning, seksjoner eller installasjoner ikke kan avgjøres fra det som finnes. Skanning er verktøy i kartleggingen, ikke et produkt som skal kjøpes «i tillegg».",
      appliesTo: "Eksisterende bygg med manglende, motstridende eller utdatert underlag. Ikke første steg i en lesbar sak.",
      dependsOn: ["Hva som allerede finnes av tegninger", "Om mismatch er synlig uten modell", "Hva neste beslutning faktisk trenger"],
      requirement:
        "Eier skal kjenne kravene for byggverket. Forutsetninger om areal, etasjer, rømning og risiko skal kunne beskrives. Standarden NS 3924 gir språk for tegninger. Den pålegger ikke 3D.",
      assessment:
        "FLO starter med dokumentene. Befaring når usikkerheten krever syn. 3D når underlaget mangler eller ikke treffer, og når det er avtalt. Vi har ikke et eget skanningsprodukt å selge som bevis her.",
      alternatives: [
        "Digital lesning av det som finnes",
        "Målrettet befaring og oppmåling",
        "Kartlegging / 3D når gapet krever modell",
      ],
      limitation:
        "3D-skanning som FLO-hovedytelse er ikke dokumentert som eget produkt på live nettsted. Vi beskriver når verktøyet er nyttig, ikke et oppdiktet leveranseløfte.",
      documents: ["Det som finnes av tegninger", "Bilder av gapet", "Hva neste beslutning skal låse"],
      next: {
        mode: "hybrid",
        action: "Send det dere har. FLO sier om papirene holder, eller om bygget må kartlegges",
        href: "/kontakt?spor=hybrid&tema=dokumentasjon",
      },
    },
    distribution: {
      gmb: "Mangler tegninger, eller treffer de ikke bygget? Kartlegging starter med det som finnes, 3D når gapet krever det.",
      linkedin: "3D-skanning er svar på mismatch, ikke et tilleggskjøp.",
    },
  },
  {
    slug: "overtakelse",
    room: "06G",
    domain: "overtakelse",
    kicker: "Overtakelse",
    question: "Hva skal følge bygget ved overtakelse?",
    still: stills.utgang,
    icp: ["eier-forvalter", "arkitekt-byggherre"],
    situation: ["uklart", "endres"],
    service: ["ribr", "brannvernradgivning"],
    related: [
      { href: "/fag-og-kunnskap/stemmer-dokumentasjonen", label: "Stemmer dokumentasjonen?" },
      { href: "/fag-og-kunnskap/eier-eller-bruker", label: "Eier eller bruker" },
      { href: "/losninger/ribr", label: "RIBr" },
      { href: "/hvem-er-du/eier-forvalter", label: "Eiendom / forvaltning" },
    ],
    sourceIds: ["fob-eier", "sak10", "tek17-11", "dibk-sg"],
    evidence: "SOURCE_CONFIRMED",
    contract: {
      direct:
        "Det som skal styre bygget i drift: konsept eller tilsvarende forutsetninger, branntegninger, as built / FDV, kontrollgrunnlag, og spor av avvik som ikke er lukket. Nøklene er ikke dokumentasjonen.",
      appliesTo: "Den som overtar næringsbygg, eier, forvalter, byggherre ved ferdigstillelse.",
      dependsOn: ["Om det er nybygg eller eksisterende", "Hvilke funksjoner som er utført", "Hva kontrakten faktisk krever overlevert"],
      requirement:
        "FOB: eier skal kjenne kravene og, når eier er virksomhet, dokumentere systematisk sikkerhetsarbeid. SAK10 regulerer ansvar i byggesaken. DiBK: forutsetninger for brann skal være bestemt og beskrevet. Hva som konkret skal ligge i permene, avhenger av tiltaket.",
      assessment:
        "FLO leser det som følger med, mot det som står i bygget. Mangler er vanligere enn for mye. Vi lager ikke en generell sjekkliste som late-som-vedtak.",
      alternatives: [
        "Digital gjennomgang av overtakelsespakke før nøkler",
        "Gap-liste mot FOB og konsept",
        "Befaring når as built ikke treffer",
      ],
      limitation: "Kontrakt og tiltaksklasse styrer hva som er avtalt. FLO ser det brannfaglige sporet, ikke hele overtakelsen alene.",
      documents: ["Brannkonsept", "Branntegninger", "FDV / as built", "Kontrollrapporter", "Åpne avvik"],
      next: {
        mode: "digitalt",
        action: "Send det som følger bygget. FLO sier hva som mangler før drift",
        href: "/kontakt?situasjon=uklart&hvem=eier-forvalter",
      },
    },
    distribution: {
      gmb: "Overtar dere et bygg? Det som skal følge med, er konsept, tegninger og spor, ikke bare nøklene.",
      linkedin: "Overtakelse uten brannspor er å arve en hypotese.",
    },
  },
] as const;

export function knowledgeBySlug(slug: string) {
  return knowledgeNodes.find((n) => n.slug === slug);
}
