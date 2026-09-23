# VCTRA Customer Intelligence Onboarding — fylt fra Reality

**Kilde-PDF:** `FLO_Brannsikring_onboarding_utfylt.pdf` — **ikke i workspace** (`CUSTOMER_INPUT_REQUIRED`).  
**Dette dokumentet er derfor et uttrekk**, ikke en erstatning for kundens utfylte skjema.  
Markedskartet vedlagt i chatten er transkribert i `data/source/vctra-markedskart.json` og behandles som **VCTRA-arbeidsdokument**, ikke FLO-publisert sannhet.

Hvert felt: verdi + klasse.

---

## IDENTITET

| | |
|---|---|
| Navn | Flo Brannsikring / FLO BRANNSIKRING AS |
| Klasse | SOURCE_CONFIRMED |
| Hva de er | Brannteknisk fagmiljø: rådgivning, RIBr/prosjektering, kontroll og utførelse. Del av (uklart juridisk låst) Byggforvaltning Norge. |
| Hva de ikke er på ekte | Eiendomsforvalter, energirådgiver, FDV-SaaS. Det er BFN/Eld365. |
| Geografi | HQ Stryn, avdeling Nordfjordeid. Ticker og copy antyder Vestland/Møre. «Digitalt hele Norge» er kart, ikke live. |
| Alder | 1993/1994/1998 avhengig av lag — CONFLICTING |
| Målform | Nynorsk i Brreg, bokmål på nett — CONFLICTING |

## PROBLEMER

Live, kundevendt:

- Manglende oversikt over lovpålagte krav
- Manglende / utdatert dokumentasjon og brannkonsept
- Uklart ansvar eier vs bruker
- Tilsyn, pålegg, konsekvenser
- Behov for tegninger, øvelser, kontroll, prosjektering

Startordre/kart (ikke live-ruter): avvik, pålegg, bruksendring, ny leietaker, «må vi faktisk gjøre dette?»

## FOR / NOT FOR

| FOR (live evidens) | Klasse |
|---|---|
| Eiendomsaktører / forvaltere (Coop, Weenaas) | SOURCE_CONFIRMED, svakt proof |
| Hotell (Classic Norway) | SOURCE_CONFIRMED, svakt proof |
| Virksomheter/brukere med internkontrollansvar | SOURCE_CONFIRMED copy |
| Byggeprosess: eier, arkitekt, entreprenør | INFERRED from copy |

| NOT FOR | Klasse |
|---|---|
| Privat boligeier som kjerne | EVIDENCE_REQUIRED at de *ikke* er marked — de er bare ikke synlige |
| Ren energi-/FDV-kunde uten brannbehov | INFERRED — det er BFN |
| Juridisk erstatning for advokat | SOURCE_CONFIRMED implicit (vi skal ikke gi juridiske konklusjoner uten kilde) |

## MÅLGRUPPER

Se canonical model. **Ikke** lås seks ICP-er fra markedskartet før FLO bekrefter volum.

Live evidens:

- Eiendom/forvaltning: ja, men BFN-stemme (Coop, Weenaas)
- Hotell: Classic Norway, BFN-stemme
- Kommune: kun logo-alt «Bremanger Kommune» — ikke case
- Industri/kraft: ticker-ord
- Arkitekt/entreprenør: nevnt i copy
- Privat: ingen live evidens


## KJØPSSIGNALER

FAQ + brief. Ingen egne landinger. Høyeste live-signaler: ansvar, regelverk, konsept vs prosjektering, TEK17, internkontroll, øvelse, konsekvenser av avvik.

## TJENESTER

Tre live + DiBK TK3 + capabilities. Kurs/industrivern/3D udefinert som produkt.

## PROSESS

Live: kartlegg krav → du velger tiltak → vi følger opp, du styrer.  
Brief: 13-stegs beslutningslag. **Ikke implementert.**

## PRIS / BESLUTNING

«Pris: avklares individuelt» i gammel kurs-snippet. Ingen priser, ingen terskler, ingen «hva påvirker pris/tid» live. `CUSTOMER_INPUT_REQUIRED`.

## KONKURRANSE

Ikke dokumentert på nett. `CUSTOMER_INPUT_REQUIRED` (PDF).

## TILLIT / E-E-A-T

Styrker: navngitte folk, DiBK TK3, orgnr, geografisk forankring, 1990-talls røtter.  
Svakheter: BFN-kontaminering, svake cases, lorem-meta, garanti-claim, manglende personvern, manglende schema, LinkedIn til mor.

## FAGAUTORITET

RIBr TK3 + uavhengig kontroll TK3 er ekte. NS 3924-artikkel er faglig relevant men i feil stemme. Ingen forfattere fra FLO på artikler (Trond F Fredriksen).

## LEVERANDØRER / NETTVERK

Live «partnere»: Byggforvaltning, Eld365.  
Vobling (VR) nevnt i nyhet.  
MISF/Coop/osv. som logoer. Nettverk ellers `CUSTOMER_INPUT_REQUIRED`.

## AI / AEO / AIO / GEO

Dårlig: ingen schema, sitemap, canonical, llms.txt, entity IDs.  
Bra: FAQ som synlig tekst.  
Risiko: Google siterer gammel nynorsk-struktur.

## VEKST

Om-oss narrativ: fra slokkeapparat til total brannfag, inn i BFN. Tall/mål mangler. `CUSTOMER_INPUT_REQUIRED`.

## A1–A11 GAP

Se `docs/audit/FLO_GAP_REPORT.md`. Ingen side dekker hele beslutningskjeden. Forside FAQ dekker A1/A5/A6 delvis. Tjenestesider dekker A8 delvis. Proof (A10) er BFN.

---

## Markedskartet (vedlegg) — bruk som hypotese

Kartets fem lag (situasjon, avklaring, ICP, opplæring/påstand-krav/digital, markedsspørsmål) er **god kommersiell hypotese** og matcher startordren. Full transkripsjon: `data/source/vctra-markedskart.json`. Det er **ikke** source-confirmed FLO-nettinnhold. Oransje profil på kartet er **ikke** live wordmark.

Plantegning-referansen (heronapp.com) er designreferanse, ikke FLO-asset.
