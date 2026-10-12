import { defineGuide } from '../../lib/guide-types';
import { jahr, kombination, pflegegeldWaehrendErsatz } from '../../lib/engine/leistungen';
import { rentenpunkte, pauschbetrag } from '../../lib/engine/angehoerige';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Grad 4 nur Familie; Pflegedienst morgens und abends für 1.200 €; Rente bei Kombination. */
const fam = jahr({ grad: 4, versorgung: 'angehoerige' });
const k1200 = kombination(4, 1200);
const renteGeld = rentenpunkte(4, 'geld');
const renteKombi = rentenpunkte(4, 'kombi');
const pb = pauschbetrag(4);
const ers = pflegegeldWaehrendErsatz(4, 28);
const S = P.nba.schwellen;

export default defineGuide({
  id: 'pflegegrad-4',
  group: 'grad',
  order: 50,
  mini: 'gradGeld',
  miniDefaults: { g: 4 },
  related: ['pflegegrad-3', 'pflegegrad-5', 'kombinationsleistung', 'verhinderungspflege', 'rente-pflegende-angehoerige', 'pflegeheim-kosten'],
  sources: ['sgb11_15', 'sgb11_37', 'sgb11_36', 'sgb11_38', 'sgb11_44', 'sgb6_166'],
  de: {
    slug: 'pflegegrad-4',
    nav: 'Pflegegrad 4',
    card: `${DE.eur(P.pflegegeld['4'])} Pflegegeld oder ${DE.eur(P.sachleistung['4'])} Sachleistung: wenn Pflege rund um die Uhr beginnt.`,
    title: 'Pflegegrad 4: wie viel Geld 2026, Punkte und Leistungen',
    description: `Pflegegrad 4 ab ${DE.num(S[3])} Punkten: ${DE.eur(P.pflegegeld['4'])} Pflegegeld oder ${DE.eur(P.sachleistung['4'])} Sachleistung im Monat 2026, Rente für Angehörige, Jahresbetrag und das Pflegeheim im Vergleich.`,
    h1: 'Pflegegrad 4: das Geld, wenn Pflege den Tag bestimmt',
    intro: 'Ab hier bestimmt die Pflege den Tagesablauf der Familie. Was Pflegegrad 4 im Jahr 2026 bringt und wie sich Pflege zu Hause und Heim rechnen.',
    resume: `Pflegegrad 4 gilt bei ${DE.num(S[3])} bis unter ${DE.num(S[4])} Gesamtpunkten, den schwersten Beeinträchtigungen der Selbständigkeit nach § 15 Abs. 3 SGB XI. Die Pflegekasse zahlt 2026 ${DE.eur(P.pflegegeld['4'])} Pflegegeld im Monat, wenn Angehörige pflegen, oder Sachleistungen bis ${DE.eur(P.sachleistung['4'])} für einen Pflegedienst. Viele Familien kombinieren: Ein Dienst morgens und abends für ${DE.eur(1200)} verbraucht ${DE.pct(k1200.anteil, 1)} der Sachleistung, vom Pflegegeld bleiben ${DE.eur(k1200.pflegegeld, 2)}. Dazu kommen Entlastungsbetrag ${DE.eur(P.entlastungsbetrag.monat)}, Hilfsmittel bis ${DE.eur(P.pflegehilfsmittel.verbrauch_monat)}, Tagespflege bis ${DE.eur(P.tagespflege['4'])} und der Jahresbetrag von ${DE.eur(P.jahresbetrag.euro)}. Pflegt nur die Familie, sind das ${DE.eur(fam.jahrGesamt)} im Jahr. Für die pflegende Person zahlt die Kasse Rentenbeiträge auf ${DE.pct(renteGeld.anteil, 0)} der Bezugsgröße, ein Jahr bringt ${DE.eur(renteGeld.renteProJahr, 2)} Monatsrente. Zieht die Person ins Pflegeheim, gehen ${DE.eur(P.vollstationaer['4'])} im Monat direkt an die Einrichtung, das Pflegegeld entfällt.`,
    faqs: [
      { q: 'Woran erkennt man, dass Pflegegrad 4 angemessen ist?', a: 'Meist braucht die Person bei fast allen Tätigkeiten der Selbstversorgung Hilfe oder übernimmt sie gar nicht mehr, kann sich nur noch mit Unterstützung bewegen und braucht auch nachts jemanden. Häufig kommen Inkontinenz, Hilfe beim Essen oder ausgeprägte Verhaltensauffälligkeiten hinzu. Ab 70 gewichteten Punkten ordnet der Medizinische Dienst Pflegegrad 4 zu.' },
      { q: 'Wie oft muss bei Pflegegrad 4 ein Beratungseinsatz stattfinden?', a: 'Wer nur Pflegegeld bezieht, muss den Beratungseinsatz einmal im Halbjahr abrufen. Bei Pflegegrad 4 und 5 darf er auf Wunsch alle drei Monate stattfinden (§ 37 Abs. 3 SGB XI). Das kann sinnvoll sein, wenn sich der Zustand schnell verändert, weil die Beratungsperson Hilfsmittel empfehlen und auf weitere Leistungen hinweisen kann.' },
      { q: 'Bringt die Kombination mit einem Pflegedienst weniger Rente?', a: `Ja, etwas. Bei reinem Pflegegeld gelten ${DE.pct(renteGeld.anteil, 0)} der Bezugsgröße als beitragspflichtige Einnahme, bei der Kombinationsleistung ${DE.pct(renteKombi.anteil, 1)} (§ 166 Abs. 2 SGB VI). Ein Jahr Pflege bringt dann ${DE.eur(renteGeld.renteProJahr, 2)} statt ${DE.eur(renteKombi.renteProJahr, 2)} Monatsrente. Der Unterschied ist klein im Vergleich zur Entlastung durch den Dienst.` },
      { q: 'Wie viel kostet ein Pflegeheim bei Pflegegrad 4 mehr als bei Pflegegrad 3?', a: 'Für die Familie nichts. Der pflegebedingte Eigenanteil ist in jedem Heim für alle Grade von 2 bis 5 gleich (§ 84 Abs. 2 SGB XI). Der höhere Grad erhöht nur den Betrag, den die Pflegekasse an das Heim zahlt. Entscheidend für die Familie sind das Bundesland, das Heim und die Aufenthaltsdauer.' },
      { q: 'Welche Steuervorteile gibt es bei Pflegegrad 4?', a: `Wer einen Angehörigen mit Pflegegrad 4 unentgeltlich zu Hause pflegt, kann den Pflege-Pauschbetrag von ${DE.eur(pb.voll)} im Jahr ansetzen (§ 33b Abs. 6 EStG), geteilt durch die Zahl der Pflegepersonen. Voraussetzung ist, dass die Pflegeperson für die Pflege kein Geld erhält und die Steuer-Identifikationsnummer der gepflegten Person angibt.` },
    ],
    body: (h) => `
<h2>Pflegegrad 4 im Alltag</h2>
<p>Zwischen ${h.num(S[3])} und ${h.num(S[4])} Punkten ist ein Mensch auf Hilfe in fast allen Bereichen angewiesen. Typisch ist der Mann nach einem schweren Schlaganfall, der mit Hilfe vom Bett in den Rollstuhl kommt, angezogen und gewaschen werden muss und beim Essen Unterstützung braucht. Oder die Frau mit fortgeschrittener Demenz, die zwar noch läuft, aber nachts unruhig ist, Pflege abwehrt und sich nicht mehr selbst versorgt. In beiden Fällen zählt vor allem die Selbstversorgung, die mit 40 Prozent gewichtet wird; im höchsten Punktbereich bringt sie allein ${h.num(P.nba.bereiche.m4.gewichtet[4])} Punkte (${h.src('sgb11_15', '§ 15 SGB XI')}).</p>
<p>Pflegegrad 4 ist auch der Grad, an dem viele Familien an ihre Grenzen kommen. Wer pflegt, schläft selten durch, geht kaum noch aus dem Haus und vernachlässigt die eigene Gesundheit. Das Geld der Pflegeversicherung ist deshalb nicht nur Einkommen, sondern vor allem ein Werkzeug, um Entlastung einzukaufen. Wer es so einsetzt, hält die Pflege zu Hause oft deutlich länger durch, als die Familie es selbst erwartet hätte.</p>

<h2>Leistungen im Monat und im Jahr</h2>
${h.table(['Leistung bei Pflegegrad 4', 'Monat', 'Jahr'], [
  ['Pflegegeld (nur Angehörige)', h.eur(P.pflegegeld['4']), h.eur(P.pflegegeld['4'] * 12)],
  ['oder Sachleistung bis', h.eur(P.sachleistung['4']), h.eur(P.sachleistung['4'] * 12)],
  ['Tages- und Nachtpflege bis (zusätzlich)', h.eur(P.tagespflege['4']), h.eur(P.tagespflege['4'] * 12)],
  ['Entlastungsbetrag', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat * 12)],
  ['Pflegehilfsmittel zum Verbrauch', h.eur(P.pflegehilfsmittel.verbrauch_monat), h.eur(P.pflegehilfsmittel.verbrauch_monat * 12)],
  ['Verhinderungs- und Kurzzeitpflege', '–', h.eur(P.jahresbetrag.euro)],
  ['Pflegeheim: Betrag an die Einrichtung', h.eur(P.vollstationaer['4']), h.eur(P.vollstationaer['4'] * 12)],
], 'Höchstbeträge 2026 nach SGB XI.', ['l', 'r', 'r'])}
<p>Bei Pflegegrad 4 lohnt sich die Nachtpflege, die viele nicht kennen: Sie kommt aus demselben Topf wie die Tagespflege und wird nicht auf Pflegegeld oder Sachleistung angerechnet. Wer nachts betreut werden muss, kann so die pflegende Person entlasten, ohne dass Geld an anderer Stelle fehlt.</p>

<h2>Pflegedienst und Pflegegeld mischen</h2>
<p>Die ${h.a('kombinationsleistung', 'Kombinationsleistung')} ist bei Pflegegrad 4 der Normalfall. Ein Dienst, der morgens beim Waschen und Anziehen und abends beim Zubettgehen hilft, rechnet schnell ${h.eur(1200)} im Monat ab. Das sind ${h.pct(k1200.anteil, 1)} der Sachleistung von ${h.eur(P.sachleistung['4'])}, und das Pflegegeld sinkt auf ${h.eur(k1200.pflegegeld, 2)} (${h.src('sgb11_38', '§ 38 SGB XI')}). An die gewählte Aufteilung ist man sechs Monate gebunden, abgerechnet wird aber monatlich nach der tatsächlichen Rechnung.</p>
<!--mini:kombiSchnell-->

<h2>Pausen einplanen</h2>
<p>Der Gemeinsame Jahresbetrag von ${h.eur(P.jahresbetrag.euro)} ist bei Pflegegrad 4 besonders wichtig. Vier Wochen Kurzzeitpflege, damit die Tochter selbst ins Krankenhaus oder in Urlaub kann, sind bei üblichen Pflegesätzen fast vollständig gedeckt, und das halbe Pflegegeld läuft in dieser Zeit weiter: für 28 Tage ${h.eur(ers.summe)}. Wie sich der Topf aufteilen lässt, zeigt der ${h.a('verhinderungspflege', 'Rechner für Verhinderungs- und Kurzzeitpflege')}.</p>

<h2>Rente und Absicherung der Pflegeperson</h2>
<p>Für eine Pflegeperson, die mindestens zehn Stunden pro Woche an zwei Tagen pflegt und höchstens 30 Stunden erwerbstätig ist, zahlt die Pflegekasse Rentenbeiträge (${h.src('sgb11_44', '§ 44 SGB XI')}). Bei Pflegegrad 4 und reinem Pflegegeld gelten ${h.pct(renteGeld.anteil, 0)} der Bezugsgröße von ${h.eur(P.rente.bezugsgroesse_monat)} als beitragspflichtig (${h.src('sgb6_166', '§ 166 Abs. 2 SGB VI')}), also ${h.eur(renteGeld.einnahmeMonat)} im Monat. Ein Jahr Pflege entspricht ${h.num(renteGeld.punkteJahr, 4)} Entgeltpunkten und ${h.eur(renteGeld.renteProJahr, 2)} Monatsrente. Bei fünf Jahren Pflege sind das gut ${h.eur(renteGeld.renteProJahr * 5)} mehr Rente im Monat, ein Leben lang. Der ${h.a('rente-pflegende-angehoerige', 'Rentenrechner')} zeigt den Wert für Kombination und Mehrfachpflege.</p>

<h2>Hilfsmittel und Wohnung</h2>
<p>Bei Pflegegrad 4 ist ein Pflegebett mit Aufrichthilfe fast immer nötig, oft auch ein Lifter, ein Toilettenstuhl und Lagerungskissen gegen Druckgeschwüre. Technische Pflegehilfsmittel stellt die Kasse in der Regel leihweise; die Zuzahlung beträgt zehn Prozent, höchstens ${h.eur(P.pflegehilfsmittel.zuzahlung_max)} je Hilfsmittel. Über einen Antrag auf ein Pflegehilfsmittel muss die Kasse innerhalb von drei Wochen entscheiden, sonst gilt es als genehmigt. Wird das Bad umgebaut oder eine Tür verbreitert, damit ein Rollstuhl durchpasst, zahlt sie bis ${h.eur(P.wohnumfeld.je_massnahme)} je Maßnahme. Mehr unter ${h.a('pflegehilfsmittel', 'Pflegehilfsmittel')} und ${h.a('wohnumfeldverbesserung', 'Wohnumfeldverbesserung')}.</p>

<h2>Zu Hause oder ins Heim?</h2>
<p>Bei Pflegegrad 4 stellt sich die Heimfrage häufiger als bei Grad 3. Finanziell verschiebt sich die Rechnung: Zu Hause fließen bis zu ${h.eur(fam.jahrGesamt)} Leistungen im Jahr in den Haushalt oder an Dienste, im Heim zahlt die Kasse ${h.eur(P.vollstationaer['4'])} im Monat an die Einrichtung, und die Familie trägt den Eigenanteil. Im Bundesschnitt waren das am 1. Juli 2026 im ersten Jahr ${h.eur(P.heim.bund.mit15)} im Monat. Der ${h.a('pflegeheim-kosten', 'Pflegeheim-Rechner')} rechnet mit dem Durchschnitt Ihres Landes und zeigt, wie lange Rente und Ersparnisse reichen.</p>

<h2>Weiter zu Pflegegrad 5</h2>
<p>Ab ${h.num(S[4])} Punkten folgt ${h.a('pflegegrad-5', 'Pflegegrad 5')} mit ${h.eur(P.pflegegeld['5'])} Pflegegeld. Wer knapp unter dieser Grenze liegt und bei dem sich die Lage verschlechtert, etwa durch eine Sondenernährung oder vollständige Bettlägerigkeit, sollte rechtzeitig eine ${h.a("hoeherstufung-pflegegrad", "Höherstufung")} bei der Pflegekasse beantragen.</p>
`,
  },
  en: {
    slug: 'care-grade-4',
    nav: 'Care grade 4',
    card: `${EN.eur(P.pflegegeld['4'])} allowance or ${EN.eur(P.sachleistung['4'])} in services: when care starts to run around the clock.`,
    title: 'Care Grade 4 Germany 2026: Pflegegeld, Points, Benefits',
    description: `German care grade 4 (Pflegegrad 4) from ${EN.num(S[3])} points: ${EN.eur(P.pflegegeld['4'])} allowance or ${EN.eur(P.sachleistung['4'])} in services a month in 2026, carer pension, respite budget and care homes.`,
    h1: 'German care grade 4: the money when care shapes the day',
    intro: 'From here, care sets the family’s daily rhythm. What grade 4 pays in 2026 and how care at home compares with a care home.',
    resume: `German care grade 4 (Pflegegrad 4) applies at ${EN.num(S[3])} to just under ${EN.num(S[4])} total points, which section 15(3) of Book XI of the Social Code describes as the most severe limitations of independence. In 2026 the long-term care fund pays ${EN.eur(P.pflegegeld['4'])} a month in care allowance when relatives provide care, or up to ${EN.eur(P.sachleistung['4'])} for a registered care service. Many families combine both: a care service in the morning and evening billing ${EN.eur(1200)} uses ${EN.pct(k1200.anteil, 1)} of the services budget and leaves ${EN.eur(k1200.pflegegeld, 2)} of allowance. On top come the relief amount of ${EN.eur(P.entlastungsbetrag.monat)}, consumable aids up to ${EN.eur(P.pflegehilfsmittel.verbrauch_monat)}, day or night care up to ${EN.eur(P.tagespflege['4'])} and the joint annual budget of ${EN.eur(P.jahresbetrag.euro)}. With family care only, that totals ${EN.eur(fam.jahrGesamt)} a year. For the carer the fund pays pension contributions on ${EN.pct(renteGeld.anteil, 0)} of the reference value, so one year of caring adds ${EN.eur(renteGeld.renteProJahr, 2)} of monthly pension. In a care home ${EN.eur(P.vollstationaer['4'])} goes to the home.`,
    faqs: [
      { q: 'What usually justifies care grade 4?', a: 'The person typically needs help with almost all self-care or no longer does it at all, can only move with support and needs someone at night too. Incontinence, help with eating or marked behavioural problems are common. From 70 weighted points the Medical Service assigns grade 4. A sudden move to grade 4 often follows a stroke or a fall with a fracture.' },
      { q: 'How often is the advice visit at grade 4?', a: 'With allowance only, once every six months is compulsory. At grades 4 and 5 it may take place every three months on request (section 37(3) SGB XI), which helps when the condition changes quickly. The advisor can recommend aids that are then presumed necessary and point the family to budgets it is not yet using.' },
      { q: 'Does combining with a care service reduce the carer’s pension?', a: `Slightly. With allowance only, ${EN.pct(renteGeld.anteil, 0)} of the reference value counts as contribution base; with the combined benefit ${EN.pct(renteKombi.anteil, 1)} (section 166(2) SGB VI). One year then adds ${EN.eur(renteKombi.renteProJahr, 2)} instead of ${EN.eur(renteGeld.renteProJahr, 2)} of monthly pension, a small difference against the relief a service brings.` },
      { q: 'Is a care home dearer at grade 4 than at grade 3?', a: 'Not for the family. The care co-payment is the same for every grade from 2 to 5 within a home (section 84(2) SGB XI); a higher grade only raises what the fund pays the home. What matters for the family is the federal state, the individual home and how long the person has lived there.' },
    ],
    body: (h) => `
<h2>Grade 4 in daily life</h2>
<p>Between ${h.num(S[3])} and ${h.num(S[4])} points a person depends on help in almost every area. Typical is the man after a severe stroke who gets from bed to wheelchair only with help, has to be washed and dressed and needs support eating; or the woman with advanced dementia who still walks but is restless at night, resists care and no longer looks after herself. Self-care, weighted at 40 percent, carries most of the score; its top band alone gives ${h.num(P.nba.bereiche.m4.gewichtet[4])} points (${h.src('sgb11_15', 'section 15 SGB XI')}).</p>
<p>Grade 4 is also where many families reach their limits. The carer rarely sleeps through the night and hardly leaves the house. The money from the long-term care insurance is therefore not just income but a tool to buy relief, and that is how it is best used.</p>

<h2>Benefits per month and per year</h2>
${h.table(['Benefit at grade 4', 'Month', 'Year'], [
  ['Care allowance (family only)', h.eur(P.pflegegeld['4']), h.eur(P.pflegegeld['4'] * 12)],
  ['or services up to', h.eur(P.sachleistung['4']), h.eur(P.sachleistung['4'] * 12)],
  ['Day or night care up to (additional)', h.eur(P.tagespflege['4']), h.eur(P.tagespflege['4'] * 12)],
  ['Relief amount', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat * 12)],
  ['Consumable care aids', h.eur(P.pflegehilfsmittel.verbrauch_monat), h.eur(P.pflegehilfsmittel.verbrauch_monat * 12)],
  ['Respite and short-term care', '–', h.eur(P.jahresbetrag.euro)],
  ['Care home: amount paid to the home', h.eur(P.vollstationaer['4']), h.eur(P.vollstationaer['4'] * 12)],
], 'Maximum amounts for 2026 under SGB XI.', ['l', 'r', 'r'])}
<p>Night care is little known but valuable at grade 4: it comes from the same budget as day care and does not reduce the allowance or services. If someone needs supervision at night, it gives the main carer sleep without money missing elsewhere.</p>

<h2>Mixing a care service and the allowance</h2>
<p>The ${h.a('kombinationsleistung', 'combined benefit')} is the norm at grade 4. A service that helps with washing and dressing in the morning and getting to bed in the evening easily bills ${h.eur(1200)} a month: ${h.pct(k1200.anteil, 1)} of the ${h.eur(P.sachleistung['4'])} budget, which brings the allowance down to ${h.eur(k1200.pflegegeld, 2)} (${h.src('sgb11_38', 'section 38 SGB XI')}). The chosen split binds for six months, but billing follows the actual invoice each month.</p>
<!--mini:kombiSchnell-->

<h2>Planning breaks</h2>
<p>The joint annual budget of ${h.eur(P.jahresbetrag.euro)} matters most at grade 4. Four weeks of short-term care so the main carer can have treatment or a holiday are almost fully covered at usual rates, and half the allowance continues: ${h.eur(ers.summe)} for 28 days. A son or daughter who lives abroad can use these weeks to come over and take stock. The ${h.a('verhinderungspflege', 'respite and short-term care calculator')} shows how the pot divides.</p>

<h2>Pension and protection for the carer</h2>
<p>For a carer who cares at least ten hours a week over two days and works no more than 30 hours, the fund pays German pension contributions (${h.src('sgb11_44', 'section 44 SGB XI')}). At grade 4 with allowance only, ${h.pct(renteGeld.anteil, 0)} of the reference value of ${h.eur(P.rente.bezugsgroesse_monat)} counts (${h.src('sgb6_166', 'section 166(2) SGB VI')}), ${h.eur(renteGeld.einnahmeMonat)} a month. One year equals ${h.num(renteGeld.punkteJahr, 4)} pension points and ${h.eur(renteGeld.renteProJahr, 2)} of monthly pension; five years add more than ${h.eur(renteGeld.renteProJahr * 5)} a month for life. See the ${h.a('rente-pflegende-angehoerige', 'carer pension calculator')}. A carer who takes no money for caring can also claim the ${h.a('pflege-pauschbetrag', 'carer’s lump sum')} of ${h.eur(pb.voll)}.</p>

<h2>Aids and the home</h2>
<p>At grade 4 a care bed with a lifting aid is almost always needed, often also a hoist, a commode chair and positioning cushions against pressure sores. The fund usually lends technical aids; the co-payment is ten percent, at most ${h.eur(P.pflegehilfsmittel.zuzahlung_max)} per aid. It must decide on an application within three weeks, otherwise the aid counts as approved. Widening a door for a wheelchair or converting a bathroom is subsidised with up to ${h.eur(P.wohnumfeld.je_massnahme)} per measure. See ${h.a('pflegehilfsmittel', 'care aids')} and ${h.a('wohnumfeldverbesserung', 'home adaptation grants')}.</p>

<h2>Home or care home?</h2>
<p>The care home question arises more often at grade 4. At home up to ${h.eur(fam.jahrGesamt)} a year flows to the household or to services; in a home the fund pays ${h.eur(P.vollstationaer['4'])} a month to the home and the family pays the co-payment, which averaged ${h.eur(P.heim.bund.mit15)} a month in year one on 1 July 2026. The ${h.a('pflegeheim-kosten', 'care home calculator')} uses your state’s average and shows how long pension and savings last.</p>

<h2>On to grade 5</h2>
<p>From ${h.num(S[4])} points comes ${h.a('pflegegrad-5', 'grade 5')} with ${h.eur(P.pflegegeld['5'])} of allowance. If someone is just below that line and their condition worsens, for instance with tube feeding or being fully bedbound, request a ${h.a('hoeherstufung-pflegegrad', 'higher grade')} from the Pflegekasse without waiting for the next routine review.</p>
`,
  },
});
