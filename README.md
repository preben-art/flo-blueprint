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

Produksjon avviser innlogging til `FLO_DESK_KEY` og `FLO_DESK_SECRET` er satt til ulike, tilfeldig genererte hemmeligheter på minst 24 tegn. Generer hver med `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Bruk individuelle kundeidentiteter i `FLO_DESK_CUSTOMERS`, for eksempel `[{"id":"kunde-a","passphrase":"EN_EGEN_TILFELDIG_HEMMELIGHET"}]`. Ikke bruk eksempelet som nøkkel. Den gamle delte `FLO_DESK_KUNDE` brukes ikke. Kundens navn er bare byline, ikke tilgangskontroll. Eldre innlegg uten `authorId` administreres av FLO. Gamle økter blir ugyldige; logg inn på nytt. Produksjonscookies krever HTTPS.

Redaksjonen skriver lokalt til `data/editorial/desk.json` og `public/uploads`. Produksjon krever varig lagring og backup. Filbasert lagring har ikke transaksjoner på tvers av prosesser; den bør erstattes før flere serverinstanser tas i bruk. Begrens innloggingsforsøk i driftsplattformen. Opplastinger har størrelses- og MIME-grense, men ikke full innholdsskanning.

## Kontakt med EmailJS

Kopier `.env.example` til `.env.local`. Sett de tre `NEXT_PUBLIC_EMAILJS_*`-verdiene fra EmailJS og start serveren på nytt (bygg på nytt ved produksjon). Uten gyldige verdier er sendeknappen deaktivert, og e-post/telefon er synlig. Ingen falsk kvittering vises. Ingen privat EmailJS-nøkkel skal inn i nettleseren.

I EmailJS setter du mottakeren fast til FLOs kontaktadresse og Reply-To til `{{reply_to}}`. Malen bruker `{{from_name}}`, `{{company}}`, `{{reply_to}}`, `{{phone}}`, `{{situation}}`, `{{delivery}}`, `{{audience}}`, `{{message}}` og `{{page_url}}`. Bruk vanlig tekst eller malens escaping for fritekst. Begrens tillatte domener i EmailJS til nettstedets domene, og localhost bare under testing. Skjemaet sender tekst; vedlegg sendes på e-post. Test faktisk mottak og svaradresse med FLO før publisering. Testene bruker simulert transport og sender ingen e-post.

Sitemap og robots er med; forhåndsvisningen er `noindex` og har tomt sitemap. Sett `NEXT_PUBLIC_SITE_URL=https://flo-brannsikring.no` bare på den offentlige produksjonsinstallasjonen. Sitemap og llms.txt følger publiserte redaksjonsinnlegg. Dokumenterte kunnskapssider beholder sine egne canonical-adresser.

Kunnskapskartet ligger i `src/content/knowledge/`. Maskinlesbar graf: `/api/knowledge`.

## Bilder og bevegelse

Alle stillbilder ligger i `public/media/` og er hentet fra FLO sin egen side eller skutt for FLO. To korridorbilder (`nodutgang-lys.jpg`, `nodutgang-korridor.jpg`) er AI-genererte illustrasjoner og merket slik i `photoAlt`.

Forsiden og undersidene bruker store, statiske bildeheroer. Bilder, innhold og bakgrunn flyttes ikke med parallax. Kameraloopene i `public/media/motion/` er bevart som filer, men spilles ikke på sidene.

Nettleserens vanlige scrolling brukes. `MotionLayer` og `PlanCursor` er koblet fra layouten; kildefilene er bevart.

## Kontroll

`node --test tests/security-contact.test.cjs`, `npx tsc --noEmit`, `npm run lint`, `npm run build`.

## Partnere

`partners` i `src/content/site.ts` har `url` for partnere med verifisert nettsted. Logoer uten `url` rendres uten lenke.
