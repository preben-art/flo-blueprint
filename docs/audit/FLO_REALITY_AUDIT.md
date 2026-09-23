# FLO Brannsikring — Reality Audit

**Status:** Fase Reality + Model. **Ikke godkjent for design/build.**  
**Dato:** 2026-09-16  
**Uavhengig re-verify:** 2026-09-16T16:38:33Z (`data/source/raw/live_verify_2026-09-16b.json`)  
**Primærkilde:** https://flo-brannsikring.no/  
**Metode:** Live HTTP-crawl (to pass), original HTML bevart, CDN-assets lastet ned, Brønnøysund API, DiBK sentral godkjenning, Wayback CDX, VCTRA-markedskart transkribert som *egen* kilde.

Tidligere repo-materiale er **referanse, ikke sannhet**. Live re-crawl bekrefter: nettstedet er en Byggforvaltning-Webflow-klon med FLO-navn oppå.

**Onboarding-PDF** `FLO_Brannsikring_onboarding_utfylt.pdf` er **fortsatt ikke i workspace**. Feltene derfra er `CUSTOMER_INPUT_REQUIRED`.

Ingen ny forside, CSS eller copy er skrevet. Utilsiktet Next.js-scaffold er fjernet.

Klassifisering brukt overalt:

| Kode | Betydning |
|---|---|
| `SOURCE_CONFIRMED` | Observert i primærkilde eller offisielt register i denne kjøringen |
| `INFERRED` | Rimelig, men ikke bekreftet som FLO-faktum |
| `CUSTOMER_INPUT_REQUIRED` | Må avklares med FLO/VCTRA før det brukes |
| `EVIDENCE_REQUIRED` | Påstand finnes, bevis mangler |
| `CONFLICTING` | To kilder sier ulike ting |
| `OUTDATED_POSSIBLE` | Fantes, indeksert eller arkivert — ikke nødvendigvis live |

---

## 0. Hva denne passet la til (ikke design)

Uavhengig HTTP-verify bekreftet ruteinventaret. Nye SOURCE_CONFIRMED-funn:

1. **Skjult SVG i header/footer er Byggforvaltning-wordmark**, ikke FLO. Navbar-varianten har gul firkant `#FFC563`. Synlig merke er PNG. Filer: `data/source/assets/brand/bfn-wordmark-leftover-hidden-*.svg`.
2. **FLO har ingen master-SVG.** To PNG-wordmarks + brodert skjorte (rød prikk) er live identitet. Se `data/source/brand.json`.
3. **Partner-alt-tekster:** AHDA AS, Bremanger Kommune, Agri Eiendom AS, Byggforvaltning Norge, MISF, Coop.
4. **FAQPage schema** injiseres med JS på forsiden. Ingen statisk JSON-LD. Ingen Organization/Service-schema.
5. **Kundehistorier-modulen på forsiden er `container hide`.** CTA peker likevel på 404 `/kundehistorier`.
6. **Hero-ticker inkluderer Industrivern** uten rute.
7. **Mapbox_Logo_08** forurenser `<title>` på `/om-oss` og `/kontakt`.
8. **Privacy / Cookie / Instagram** peker på `#`.
9. **`favicon.ico` 404** (PNG via link-tags finnes).
10. VCTRA-markedskartet er transkribert i `data/source/vctra-markedskart.json` (`CUSTOMER_INPUT_REQUIRED`).

---

## 1. Repo-audit

### Hva finnes faktisk i dette repoet?

Dette startet som et **tomt nytt prosjekt**. Rot-commit er `Initialize project` uten filer. Ingen produksjons-app, ingen CMS, ingen tester, ingen deployment-config. Denne fasen har lagt inn **source-inventar og audit-dokumenter**, ikke et nettsted.

| Område | Funn |
|---|---|
| Framework | Ingen |
| Routes / sider | Ingen |
| Components | Ingen |
| Styles | Ingen |
| Assets i git | FLO-logo PNG, 4 portretter, CDN-originaler, BFN leftover SVG, VCTRA-referanser — se `data/source/` |
| Data layer / CMS | Ingen |
| APIs | Ingen |
| Skjema | Ingen |
| Analytics | Ingen |
| Metadata / sitemap / robots / schema | Ingen |
| Deployment | Ingen |
| Dependencies | Ingen |
| Fungende funksjonalitet | Ingen |

### Hva bør bevares?

Ingenting av kode. Etter denne fasen skal **source-inventaret** bevares som sannhetsgrunnlag:

- `data/source/` — original HTML, JSON-inventar, nedlastede bilder, registeruttrekk
- `docs/audit/` — denne rapporten, modell, gap

### Hva er midlertidig / legacy / bør erstattes?

Ikke relevant i repoet. Det som er legacy, er **det live nettstedet** (se under).

### Hva mangler i repoet?

Hele løsningen. Første leveranse er bevisst **ikke** en ny forside.

---

## 2. Live nettsted — hva FLO faktisk er på nett

### Plattform (`SOURCE_CONFIRMED`)

- **Webflow** (`data-wf-site=68e37c76e21b707b895670f5`, `x-wf-region: us-east-1`)
- Cloudflare CDN, `last-modified: Sat, 12 Sep 2026 05:06:41 GMT`
- Finsweet Attributes + GSAP + jQuery
- Webflow-skjema `wf-form-Kontaktskjema`, `method="get"`
- **Ikke** WordPress (live). Eldre WordPress/Elementor og ASP ligger i Wayback.

### Den viktigste konklusjonen

Live flo-brannsikring.no er **ikke et ferdig FLO-beslutningslag**. Det er et **Byggforvaltning Norge-nettsted med FLO-navn, FLO-personer og FLO-logo lagt oppå**.

Bevis, alle `SOURCE_CONFIRMED`:

- Nesten alle `<title>` slutter med `| Byggforvaltning`
- Meta på `/om-oss`: «Byggforvaltning bistår eiendomsbesittere og leietakere overhele landet»
- `/partnere` handler om Byggforvaltning + Eld365 og energisparing
- Kundehistorier er skrevet i BFN-stemme («Byggforvaltning har tilført Coop…»)
- Artikkel 23. jun 2026 handler om FDV, PropTech og ELD365 EOS, publisert av Trond F Fredriksen, som **ikke** står i FLO sin ansattoversikt
- Artikkel om NS 3924 sier «Vårt datterselskap Flo Brannsikring»
- LinkedIn-lenke går til `linkedin.com/company/byggforvaltning-norge-as`
- `post@bfnorge.no` vises i parentes etter FLO-epost overalt
- Tjeneste-URL-er er BFN-slugger: `/tjenester/teknisk-forvaltning` = «Brannvernrådgivning»
- CSS-token `--colors--orange` er faktisk **rød** `#c62e32`. Typografi er **Beausite Classic** (mal/template)
- Lorem ipsum i meta: «Velit laboris enim irure magna irure cupidatat elit sunt…» på `/tjenester`, `/nyheter`, `/partnere`
- Én bildefil heter `GEMINI_GENERATED_IMAGE_…`

Dette er ikke «litt uryddig copy». Det er **feil virksomhet i DOM**.

---

## 3. Route inventory (kort)

Full tabell: `data/source/routes.json`.

### Live 200 (interne hovedruter)

| Path | Rolle | Merknad |
|---|---|---|
| `/` | Forside | FAQ + 3 tjenester + 3D-scanning-modul |
| `/tjenester` | Tjenesteindeks | Title BFN, lorem-meta |
| `/tjenester/teknisk-forvaltning` | Brannvernrådgivning | Slug ≠ navn |
| `/tjenester/brannforebygging` | Branningeniører / RIBr | Slug ≠ navn |
| `/tjenester/brannteknisk-utforelse` | Utførelse | Tynn passiv-brann-tekst |
| `/om-oss` | Personer + tidslinje | BFN-eierskap limt inn i FLO-historie |
| `/kontakt` | Kontor + skjema + personer | |
| `/partnere` | BFN + Eld365 | Ikke FLO-fagnettverk |
| `/nyheter` + 3 artikler | Nyheter | 1 FLO-relevant, 2 BFN-stemme |
| `/kundehistorier/{coop,classic-norway-hotels,weenaas}` | Cases | Indeks 404 |
| `/kundegrupper/eiendomsselskaper-og-byggeiere` | Kundetype | BFN-forvaltningscopy |
| `/kundegrupper/storre-leietakere` | Kundetype | BFN-forvaltningscopy |
| `/404` | System | |

### Ødelagte interne lenker (`SOURCE_CONFIRMED`)

- `/kundehistorier` → **404** (forsiden lenker «Se alle kundehistorier»)
- `/kundegrupper` → 404
- `/${detailLink}` → 404 (uoppløst Webflow-binding)
- `/provekjoring` → 404

### Redirects som faktisk virker

| Fra | Til |
|---|---|
| `/kurs`, `/kurs/` | `/kontakt` |
| `/tenester-kontroll` | `/tjenester/brannteknisk-utforelse` |
| `/tenester-radgjeving` | `/tjenester/teknisk-forvaltning` |

Google viser fortsatt `/kurs/` som en **kursside** (Varme arbeider, Brannforebygging, Industrivern) og nynorske tjenestesider. Det er `OUTDATED_POSSIBLE` i indeksen, `SOURCE_CONFIRMED` at live `/kurs` er kontakt.

### SEO-maskinlesbarhet

| Ting | Live |
|---|---|
| sitemap.xml | 404 |
| robots.txt | Tom fil |
| canonical | Ingen |
| JSON-LD | Ingen |
| Unike titles | Delvis, men suffiks Byggforvaltning |
| Unike descriptions | Mange lorem / BFN |
| Personvernside | 404 |
| FAQPage schema | Nei (FAQ er synlig tekst — bra — men uten schema) |

---

## 4. Selskapet — hva som er bekreftet

Kilder: Brønnøysund `979582064`, DiBK sentral godkjenning, `/kontakt`, `/om-oss`. Detaljer i `data/source/company.json`.

| Felt | Verdi | Klasse |
|---|---|---|
| Juridisk navn | FLO BRANNSIKRING AS | SOURCE_CONFIRMED |
| Orgnr | 979 582 064 | SOURCE_CONFIRMED |
| Underenhet | 972 998 648, oppstart 1994-01-01 | SOURCE_CONFIRMED |
| Form | AS, nynorsk målform | SOURCE_CONFIRMED |
| Næringskode (API i dag) | 71.129 Annen teknisk konsulentvirksomhet | SOURCE_CONFIRMED |
| Vedtektsfestet formål | Produksjon og salg av brannvernutstyr samt tilknyttet virksomhet | SOURCE_CONFIRMED |
| Registrert aktivitet | Konsulenttjenester innen brannsikkerhet, utførelse og produkter | SOURCE_CONFIRMED |
| Ansatte | 15 (Brreg) / 14 navngitt på nett | CONFLICTING |
| Aksjekapital | 600 000 / 600 aksjer | SOURCE_CONFIRMED |
| Daglig leder | Mats Flo | SOURCE_CONFIRMED |
| Styrets leder | Bjarne Nedreklepp Dale | SOURCE_CONFIRMED |
| Revisor | BDO AS | SOURCE_CONFIRMED |
| Hovedkontor | Perhusvegen 1A, 6783 Stryn | SOURCE_CONFIRMED |
| Avdeling | Øyane 8, 6770 Nordfjordeid (skrevet «Norfjordeid») | SOURCE_CONFIRMED + skrivefeil |
| Sentralbord | +47 57 87 33 64 | SOURCE_CONFIRMED |
| E-post | post@flo-brannsikring.no | SOURCE_CONFIRMED |

### Sentral godkjenning (`SOURCE_CONFIRMED`, DiBK 12.09.2024–12.09.2027)

- Ansvarlig søker — alle tiltak — tiltaksklasse **1**
- Prosjekterende — **Brannkonsept** — tiltaksklasse **3**
- Uavhengig kontrollerende — **Brannsikkerhet** — tiltaksklasse **3**
- Yrkesskadeforsikring, ansvarsforsikring, godkjent opplæringsbedrift

Dette er det sterkeste FLO-beviset som finnes. Det bør bære RIBr- og kontroll-påstander. Ikke «totalleverandør av eiendomsforvaltning».

### Eierskap (`CONFLICTING` / `CUSTOMER_INPUT_REQUIRED`)

- FLO-siden sier: inn i Byggforvaltning Norge 2018, heleid av BFN 2022.
- Proff/Companybook: BFN 992 986 417 eier 100 %.
- Brreg `erIKonsern: false`.
- Tidslinjen på `/om-oss` lister Coop-eiere som om de eier FLO. Samme tall matcher **Byggforvaltning Norge** (Coop Nordvest 42,5 %, Coop Nordland 42,5 %, osv.).

**Ikke publiser FLO-eierstruktur før aksjeeierboken er avklart.**

### Etableringsår (`CONFLICTING`)

- Nettsted: familiebedrift **1993**, Gunvor Flo på Hool
- Underenhet: oppstart **1994-01-01**
- AS stiftet **1998-01-21**

Alle tre kan være sanne på ulike lag. Ikke slå sammen til ett årstall.

---

## 5. Brand — faktisk FLO, ikke VCTRA og ikke BFN-oransje

Nedlastet til `data/source/assets/brand/`.

**Live wordmark:** `flo` over `brannsikring.` med **rød firkant/prikk**. Svart strek på mørk bunn, rød strek-variant finnes. Mats Flo sin skjorte bekrefter svart wordmark + rød prikk.

**CSS-tokens (Webflow):**

| Token | Verdi | Tolkning |
|---|---|---|
| `--colors--white` | `#faf9f4` | Off-white |
| `--colors--black` | `#000` | Charcoal/svart |
| `--colors--orange` | `#c62e32` | **Rød**, misvisende token-navn |
| `--colors--brown` | `#571115` | Dyp rødbrun |
| `--font-families--primary` | Beausite Classic | Template-font, ikke historisk FLO-bevis |

**SVG-logo (FLO):** ikke funnet. `CUSTOMER_INPUT_REQUIRED`.  
**SVG i DOM:** Byggforvaltning-leftover, skjult. Ikke bruk.  
**UI-gult:** `rgb(255,197,99)` på «Les mer»-knapper = BFN-aksent, ikke FLO-rød.

**VCTRA-markedskartet i briefen bruker oransje.** Det er VCTRA-arbeidsdokument, ikke live FLO-brand. Startordren sier «orange / charcoal / off-white» — det **konflikter** med live rød wordmark. Brand-beslutning må tas etter godkjenning, ikke antas.

Ingen VCTRA-blå på FLO-logoen. Webflow-default-blå `#3898ec` ligger igjen i CSS.

---

## 6. Hva som faktisk leveres (service inventory)

Kilde: live tjenestesider + forsidemoduler. Fullt tre: `data/source/services.json`.

### Tre kanoniske live tjenester

1. **Brannvernrådgivning** — dokumentasjon, risikoanalyser, tegninger/orienteringsplaner, evakueringsplaner, kurs/øvelser, oppfølging  
2. **Branningeniører / RIBr** — konsept, planleggingsfase, detaljprosjektering, uavhengig kontroll TK3, eksisterende bygg, ekspertvurderinger  
3. **Brannteknisk utførelse** — kontroll av installasjoner, passiv brannsikring, detaljprosjektering; forsiden legger til frityr, slokkeutstyr, montasje, utbedring

### Nevnt, men uten egen sannhetsmodell

| Evne | Status |
|---|---|
| 3D-scanning | Forsidemodul, ingen rute |
| Industrivern | Ticker + om-oss + gammel kurs-snippet. Live 404 |
| Kurs (varme arbeider, brannforebygging, industrivern) | Google `OUTDATED_POSSIBLE`, live redirect til kontakt |
| VR-øvelse | Nyhet, ikke tjenesteentitet |
| NS 3924 / DWG | Nyhet i BFN-stemme |

### Ikke FLO — BFN-chips som gjentas på FLO-sider

Energiledelse, FDV, prosjektledelse, teknisk eiendomsforvaltning, Enova, prediktivt vedlikehold, ELD365 EOS.

**Disse skal ikke inn i FLO service tree.**

Hver tjeneste svarer **ikke** på startordrens 20 spørsmål (pris, tid, hva FLO trenger fra kunden, alternativer, misforståelser, cases). Se gap-rapport.

---

## 7. Kunder og proof

`data/source/projects.json`

Live cases: **Coop**, **Classic Norway Hotels**, **Weenaas/Wenaas** (stavemåte `CONFLICTING`). Alle skrevet som BFN-forvaltning. Ingen bygg, ingen FLO-fagperson, ingen før/etter, ingen brannspesifikk effekt.

Logoer i ticker, navn via **alt** (`SOURCE_CONFIRMED` navn, ikke FLO-case-bevis): AHDA AS, Bremanger Kommune, Agri Eiendom AS, Byggforvaltning Norge, MISF, Coop.

Byggtyper i ticker: kjøpesenter, kombinerte bygg, industri, butikk, overnatting, hotell, kraftverk — **ikke modellert**.

Kundetyper live: **2**, ikke 6. Privat og kommune er **ikke** bevist som FLO-marked på live site. Markedskartets ICP er VCTRA-arbeid (`CUSTOMER_INPUT_REQUIRED`).

---

## 8. Kunnskap / FAQ / claims

- 10 FAQ på forsiden, ekte tekst i DOM (bra). Ingen `/faq`. FAQPage schema **kun** via client JS. Ingen Organization schema.  
- Siste FAQ («Hva må en brannøvelse inneholde?») **gjentar forrige svar** (`CONFLICTING` Q/A).  
- Knowledge hub `/fag-og-kunnskap` finnes ikke.  
- «Påstand eller krav» finnes ikke som konsept i live IA.  
- Claims: se `data/source/claims.json`. Spesielt **ikke** republiser meta-garantien eller BFN-eiertabellen som FLO-faktum.

---

## 9. Onboarding-PDF

Etterspurt: `c:\Users\prebe\Downloads\FLO_Brannsikring_onboarding_utfylt.pdf`

**Ikke tilgjengelig i workspace.** Drive-MCP krever auth. Fylt onboarding i `docs/onboarding/` er derfor **delvis**, merket per felt.

---

## 10. Anbefalt neste steg (ikke utført)

1. Godkjenn Reality: BFN-kontaminering, rød brand vs oransje brief, tre tjenester, eierskap.  
2. Lever onboarding-PDF og SVG-logo.  
3. Godkjenn preliminary model.  
4. Først da: IA-lås, copy, design, build.

Ikke redesign «fungerende arkitektur» i dette repoet — den finnes ikke. Ikke kopier live Webflow-strukturen videre. Bevar **innhold og URL-authority**, ikke malen.
