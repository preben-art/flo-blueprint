# FLO Brannsikring

Uavhengig Next.js-side for FLO. Innholdet er hentet fra register og kildemateriale. Det som mangler bevis, er merket.

## Hva dette er

Nettstedet starter i situasjonen: avvik, ombygging eller usikkerhet om hva som kreves. FLO skiller påstand fra krav, og leser dokumentene først. Befaring skjer fra Stryn og Nordfjordeid når papirene ikke kan svare.

Foto er studiostills uten rødt utstyrlys: næringsbygg, fagmiljø, skjermarbeid og teknisk anlegg. Partnerlogoer er identitet, ikke store brannstills.

Merkevare: FLO-rød `#c62e32`, kull `#161210`, papir `#f4f1ea`. Ikke VCTRA-oransje. Ikke BFN-gul. Teknisk løsning og kunnskapsstruktur er levert av VCTRA, synlig som én linje i bunnen.

## Maskinlesbart

Samme fakta brukes i sidetittel, Open Graph, JSON-LD, `/llms.txt`, `/ai.txt` og `/api/site`. Canonical vert er `https://flo-brannsikring.no`. Forhåndsvisning uten `NEXT_PUBLIC_SITE_URL` satt til den verten er `noindex`.

## Kjør lokalt

```bash
npm install
npm run dev
```

Åpnes på [http://127.0.0.1:4731](http://127.0.0.1:4731).

```bash
npm run build
npm start
```

## Sider

| Rute | Innhold |
---|---|
| `/` | Hva gjelder for bygget, avvik, ombygging, ansvar, oppdrag |
| `/situasjon/{papekt,endres,uklart}` | Vi har fått avvik. Vi skal bygge om. Er dette et krav? |
| `/losninger/...` | Brannvernrådgivning, RIBr, utførelse |
| `/hvem-er-du/...` | Eier, bruker, byggherre og øvrige roller |
| `/privat` | Bolig og utleiedel, eget spor, med direkte svar for søk og AI-oversikter |
| `/digitalt` | Hva som kan gjøres digitalt, hele landet |
| `/fagmiljo` | Fagmiljøet, inngang til nyheter og artikler |
| `/nyheter` og `/artikler` | Mini-redaksjon. Kunder kan legge inn og ta ned innhold |
| `/redaksjon` | Innlogging for kunde og FLO |
| `/fag-og-kunnskap/pastand-eller-krav` | Arbeidsverktøy, styrt fra redaksjonen |
| `/prosjekter` | Navngitte oppdrag, uten oppdiktet resultat |
| `/om-flo` | Selskap, godkjenning, folk |
| `/kontakt` | Send det dere har |

## Redaksjon

Lokal nøkkel, ikke produksjonsinnlogging.

- FLO: `flo-redaksjon` (styrer arbeidsverktøy og alt innhold)
- Kunde: `kunde` (legge inn og ta ned eget innhold)

Overstyr med `FLO_DESK_KEY`, `FLO_DESK_KUNDE` og `FLO_DESK_SECRET`.

Kontaktskjemaet lagrer ikke eksternt. Sitemap og robots er med; forhåndsvisningen er satt til `noindex`.

Kunnskapskartet ligger i `src/content/knowledge/`. Maskinlesbar graf: `/api/knowledge`.

## Bilder og bevegelse

Alle stillbilder ligger i `public/media/` og er hentet fra FLO sin egen side eller skutt for FLO. To korridorbilder (`nodutgang-lys.jpg`, `nodutgang-korridor.jpg`) er AI-genererte illustrasjoner og merket slik i `photoAlt`.

`public/media/motion/` inneholder korte, lydløse kameraloops laget fra de samme fotografiene (ingen nye motiver, ingen tekst). `MediaPhoto` legger loopen over stillbildet i samme ramme og spiller den bare når rammen er synlig. Loopene slås av ved `prefers-reduced-motion`, ved `saveData` og under filmopptak (`window.__FLO_FILM`).

Myk scroll og scroll-drevne bevegelser kjøres av GSAP (`ScrollSmoother`, `ScrollTrigger`) i `src/components/motion-layer.tsx`.

## Partnere

`partners` i `src/content/site.ts` har `url` for partnere med verifisert nettsted. Logoer uten `url` rendres uten lenke.
