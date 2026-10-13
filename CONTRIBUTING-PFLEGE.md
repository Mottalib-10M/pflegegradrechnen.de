# Seiten von Pflegerechnung (de-pflege) schreiben und erweitern

Notice pour les agents qui prolongent le site (Pflegegrad, prestations SGB XI 2026, Pflegeheim par Land ; de + en).
À lire en entier avec `~/Documents/GitHub/RECETTE-SITE.md` (§0, §3, §6, §7, §9.3, §11, §17.4, §21, §26).

## Principe : une page = un fichier

- `src/content/guides/<id>.ts` : guide (champ `mini`) ;
- `src/content/rechner/<id>.ts` : page outil (champ `tool`) ;
- `src/content/laender/pflegeheim-kosten-<land>.ts` : page Land (outil `heim` + `toolPreset: { land: 'XX' }`).

Liste fermée des pages prévues (id, slug de/en, groupe, mini ou outil, requête KP) : `tests/planned-ids.json`.
Modèles : guide `src/content/guides/pflegegrad-3.ts`, outil `src/content/rechner/pflegegrad-rechner.ts`, Land `src/content/laender/pflegeheim-kosten-bayern.ts`.
Copier la **structure**, jamais les phrases.

Le cœur (routes, menus, sitemap, hreflang, schémas, pied de page) lit ces fichiers seul : **ne modifiez aucun fichier du cœur**
(`src/components`, `src/layouts`, `src/i18n`, `src/lib/*.ts` hors `minis/`, `src/pages`).

## Les données

| Fichier | Contenu |
|---|---|
| `src/data/params-2026.json` | Toutes les valeurs 2026 (§§ 36-45f SGB XI, NBA Anlage 1/2, vdek par Land 1.1 et 1.7.2026, Rente, Pauschbetrag, Sozialhilfe, Reform) + `sources` |
| `tests/fixtures/vdek-2026-0{1,7}.json` | Tableaux vdek complets (Bund + 16 Länder, 5 lignes) pour les tests |
| `research/` | Textes lus : SGB XI complet au 24.7.2026 (`sgb11.txt`), Anlagen, PDF vdek, volumes KP |

Moteur (`src/lib/engine/`) : `nba.ts` (Pflegegrad), `leistungen.ts` (Pflegegeld, Kombination, Jahresbetrag…), `heim.ts`
(Eigenanteil, Zuschlag, Reichweite, `kosten(land)`, `rangliste()`), `angehoerige.ts` (Rente, Pauschbetrag), `sozialhilfe.ts` (Barbetrag, Einkommensgrenze § 85). Tests : `tests/engine.test.ts`.

Mini-simulateurs : `src/lib/minis/<kind>.ts`, chargés automatiquement ; ils appellent le moteur. Outils : `_kit.ts`.

## Règles propres à ce site

- **Aucune valeur réglementaire en dur** : `h.P` dans `body`, `P` et `DE`/`EN` (`src/lib/fmt.ts`) ailleurs ; les exemples sont des appels au moteur en tête de fichier.
- **Nouvelle source** : ajouter la clé dans `params-2026.json > sources` avec une mise à jour atomique (lire, modifier, réécrire le JSON en une commande python), URL https lue, libellé `de` et `en` exacts. Nouvelle valeur = nouveau bloc avec `_quelle`.
- **Un point incertain ne se publie pas.** Sources primaires seulement : gesetze-im-internet.de, BMG, vdek, DRV, sites des Länder (recht.<land>.de, ministères), MD. Pas de blog ni de portail.
- **Réforme 2027 (PNOG)** : Kabinettsbeschluss du 30.09.2026, **pas en vigueur** ; jamais calculée, jamais présentée comme acquise. Pas de montants du projet non lus sur une source officielle.
- **Règles qui piègent** (vérifiées dans le SGB XI) : Beratungseinsatz obligatoire **halbjährlich** pour les Grade 2 à 5 en Pflegegeld seul (Grade 4-5 *peuvent* trimestriellement) ; Pflegegeld 2024 = 332/573/765/947 ; Pflege-Pauschbetrag seulement si le soignant ne reçoit **aucune** somme pour la pflege (§ 33b Abs. 6) ; Pflegegeld non compté comme revenu pour les prestations sociales (§ 13 Abs. 5) ; transmis à un proche, exonéré jusqu'au montant du Pflegegeld (§ 3 Nr. 36 EStG) ; à l'étranger : pas de suspension UE/EEE/Suisse (§ 34 Abs. 1a), ailleurs 8 semaines ; Vorversicherungszeit 2 ans sur 10 (§ 33 Abs. 2) ; Entlastungsbetrag reportable jusqu'au 30 juin de l'année suivante ; Verhinderungspflege par proches non professionnels : 2 × Pflegegeld + frais prouvés ; demande de remboursement jusqu'à la fin de l'année suivante (§ 39 Abs. 1) ; plus de Vorpflegezeit de 6 mois.
- **Pas de lead, pas de téléphone, aucun prestataire nommé**, aucun lien vers un autre site du portefeuille.
- **Allemand** : pas de numéros pointés (« Nr. 13.1 ») ; pas de tiret cadratin. **Anglais** : pour un expatrié en Allemagne ou un enfant à l'étranger d'un parent en Allemagne ; terme allemand entre parenthèses à la première occurrence ; montants en euros.
- **Unicité** (§6) : `check-unique` ≤ 30 % entre pages ; chaque page Land a son angle propre (rang, écart Jan→Jul, composante dominante, aide du Land, comparaison voisins) ; chaque page Grad son angle (seuils, cas typique, ce qui change par rapport au grade voisin).
- **FAQ** : 4 à 8 questions (3 minimum sur une page outil ou Land), réponses 40 à 90 mots ; une question n'existe qu'une fois sur tout le site.
- **Snippets** : titre 50-60 car., description 150-160, l'année 2026 dans les deux, terme-clé en tête (jamais pays, « Rechner », question).
- `resume` : UN paragraphe ≥ 120 mots, citable, avec les chiffres. Le chapeau replié coupe après la 1re phrase.
- Longueur (test) : guide ≥ 1 100 mots (resume + FAQ + corps), page outil/Land ≥ 450.

## Contrôles (tous à 0)

```bash
cd ~/Documents/GitHub/a-publier/Mottalib-10M/de-pflege
export NODE_PATH=$(npm root -g):$PWD/node_modules
PAGE_FILES=<id> npx vitest run tests/pages.test.ts   # une page
npm run build && npx vitest run
python3 scripts/check-seo.py . ; python3 scripts/check-trame.py . ; python3 scripts/check-unique.py dist
python3 scripts/check-simulateurs.py . ; python3 scripts/check-hreflang.py . ; python3 scripts/check-anglais.py .
python3 scripts/check-regles.py . ; python3 scripts/check-portefeuille.py . ; python3 scripts/check-cookies.py . ; python3 scripts/check-snippets.py .
node scripts/check-legal.mjs . ; node scripts/check-sources.mjs . ; node scripts/check-contraste.mjs dist ; node scripts/check-saisie.mjs dist --max=60
node scripts/check-nombres.mjs dist ; node scripts/typo-nbsp.mjs dist --check ; node scripts/check-url-propre.mjs dist ; node scripts/check-premier-ecran.mjs .
node scripts/check-layout.mjs dist
```

Serveur local : port 4501 (`npm run preview`). Arrêt : `lsof -ti tcp:4501 | xargs kill`.

## Mise à jour annuelle

1. Janvier et juillet : nouvelles tables vdek → blocs `heim.laender` / `laender_vorher` + fixtures.
2. Bekanntmachung BMG des Leistungsbeträge (prochaine dynamisation 1.1.2028, § 30) → blocs `pflegegeld`, `sachleistung`, etc.
3. Rechengrößen DRV (Bezugsgröße, Durchschnittsentgelt) en janvier, Rentenwert au 1er juillet.
4. Suivre le PNOG : n'intégrer qu'après promulgation.

## Ce qu'on ne fait pas

Pas de dépôt GitHub, pas de push, pas de DNS. Ne toucher ni `_trame` ni la RECETTE. Aucune identité personnelle : l'éditeur est Radif Partners.

## État au 2026-10-13

- 51 pages de contenu (35 guides, 6 outils, 16 Länder) × 2 langues + accueil, méthode, à propos = 108 pages indexables ; pages de service en noindex.
- `npm run check` reconstruit et enchaîne tous les contrôles ; `python3 scripts/build-llms.py` régénère `public/llms.txt` (puis rebuild).
- Points laissés de côté faute de source lue : montant du Hausnotruf, réduction chiffrée du Pflegegeld après un Beratungseinsatz manqué, obligation du Beratungseinsatz en Kombinationsleistung, Pflegewohngeld hors NRW, montants du PNOG.
- Pistes : pages Pflegewohngeld des autres Länder si une aide existe (sources des Länder), page « 24-Stunden-Pflege » (sans intermédiaire), étendre le Pflegegrad-Rechner aux enfants de moins de 18 mois (4.K).
