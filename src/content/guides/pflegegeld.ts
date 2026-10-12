import { defineGuide } from '../../lib/guide-types';
import { pflegegeld, pflegegeldTeilmonat, pflegegeldWaehrendErsatz, kombination } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Grad 4 ab dem 13. eines Monats (18 Tage), Grad 3 drei Wochen Kurzzeitpflege, Grad 2 mit Pflegedienst 300 €. */
const teil = pflegegeldTeilmonat(4, 18);
const ersatz = pflegegeldWaehrendErsatz(3, 21);
const k2 = kombination(2, 300);
const G = [2, 3, 4, 5] as const;
const PG = P.pflegegeld, VJ = P.pflegegeld_2024;

export default defineGuide({
  id: 'pflegegeld',
  group: 'zuhause',
  order: 10,
  mini: 'pflegegeldTage',
  related: ['pflegesachleistung', 'kombinationsleistung', 'beratungseinsatz', 'pflegegrad-beantragen', 'verhinderungspflege', 'pflege-pauschbetrag'],
  sources: ['sgb11_37', 'sgb11_34', 'sgb11_13', 'estg3', 'sgb11_30', 'bmgLeistungen'],
  de: {
    slug: 'pflegegeld',
    nav: 'Pflegegeld',
    card: 'Tabelle 2026, Auszahlung, Kürzung im Teilmonat, Krankenhaus, Urlaub im Ausland, Steuer und Weitergabe an Angehörige.',
    title: 'Pflegegeld Tabelle 2026: Auszahlung, Kürzung, Ausland',
    description: `Pflegegeld Tabelle 2026: ${PG['2']} € bis ${PG['5']} € im Monat. Wann es gezahlt, gekürzt oder weitergezahlt wird: Teilmonat, Krankenhaus, Kurzzeitpflege, Ausland, Steuer.`,
    h1: 'Pflegegeld 2026: Tabelle und alle Regeln zur Auszahlung',
    intro: 'Was die Pflegekasse jeden Monat überweist, in welchen Lagen weniger kommt und wann das Geld trotz Krankenhaus oder Reise weiterläuft.',
    resume: `Das Pflegegeld nach § 37 SGB XI beträgt 2026 ${DE.eur(PG['2'])} bei Pflegegrad 2, ${DE.eur(PG['3'])} bei Pflegegrad 3, ${DE.eur(PG['4'])} bei Pflegegrad 4 und ${DE.eur(PG['5'])} bei Pflegegrad 5; bei Pflegegrad 1 gibt es keines. Es steht der pflegebedürftigen Person zu, die damit ihre Pflege selbst organisiert, meist durch Angehörige. Die Kasse überweist es monatlich auf deren Konto. Beginnt der Anspruch mitten im Monat, wird tageweise gezahlt, der Monat zählt mit 30 Tagen: Wer ab dem 13. Pflegegrad 4 hat, erhält für 18 Tage ${DE.eur(teil)}. Während Kurzzeit- oder Verhinderungspflege läuft die Hälfte weiter, je bis zu acht Wochen im Jahr; im Krankenhaus wird es acht Wochen lang voll gezahlt. In der EU, im EWR und in der Schweiz ruht es nicht. Beim Bürgergeld und anderen Sozialleistungen zählt es nicht als Einkommen, und an pflegende Angehörige weitergegeben ist es bis zur Höhe des Pflegegeldes steuerfrei.`,
    faqs: [
      { q: 'Wie viel Pflegegeld gab es 2024 und warum ist es seitdem gestiegen?', a: `2024 waren es ${DE.eur(VJ['2'])}, ${DE.eur(VJ['3'])}, ${DE.eur(VJ['4'])} und ${DE.eur(VJ['5'])} für die Grade 2 bis 5. Zum 1. Januar 2025 stiegen alle Leistungsbeträge um 4,5 Prozent, so steht es in § 30 Abs. 1 SGB XI. Für 2026 und 2027 sieht das Gesetz keine weitere Erhöhung vor; die nächste ist zum 1. Januar 2028 geplant.` },
      { q: 'Wird das Pflegegeld im Krankenhaus weitergezahlt?', a: `Ja, in den ersten ${P.krankenhaus.pflegegeld_weiter_wochen} Wochen einer vollstationären Krankenhausbehandlung oder einer stationären Reha voll (§ 34 Abs. 2 SGB XI). Dauert der Aufenthalt länger, ruht der Anspruch ab der neunten Woche. Die Pflegekasse erfährt davon über die Krankenkasse; melden Sie lange Aufenthalte trotzdem selbst, um Rückforderungen zu vermeiden.` },
      { q: 'Dürfen wir mit Pflegegeld in Urlaub außerhalb Europas fahren?', a: `Ja, das Pflegegeld läuft bei einem vorübergehenden Aufenthalt außerhalb von EU, EWR und Schweiz bis zu ${P.ausland.wochen_vorruebergehend} Wochen im Kalenderjahr weiter (§ 34 Abs. 1 SGB XI). Danach ruht es. Innerhalb Europas gibt es diese Grenze nicht. Für Sachleistungen gilt die Ausnahme nur, wenn die übliche Pflegekraft mitreist.` },
      { q: 'Wem gehört das Pflegegeld, der gepflegten Person oder der pflegenden Tochter?', a: 'Rechtlich der pflegebedürftigen Person. Sie entscheidet, ob und wie viel sie an die Menschen weitergibt, die sie pflegen. Für die pflegende Tochter ist das weitergeleitete Geld bis zur Höhe des Pflegegeldes steuerfrei (§ 3 Nr. 36 EStG) und wird bei ihrem eigenen Unterhalt grundsätzlich nicht angerechnet (§ 13 Abs. 6 SGB XI).' },
      { q: 'Was wird abgezogen, wenn zusätzlich ein Pflegedienst kommt?', a: `Das Pflegegeld sinkt um den Prozentsatz, zu dem die Sachleistung genutzt wird. Ein Pflegedienst für ${DE.eur(300)} verbraucht bei Pflegegrad 2 ${DE.pct(k2.anteil, 1)} der Sachleistung von ${DE.eur(P.sachleistung['2'])}; vom Pflegegeld bleiben ${DE.eur(k2.pflegegeld, 2)}. Entlastungsbetrag, Tagespflege und Hilfsmittel mindern das Pflegegeld dagegen nicht.` },
      { q: 'Muss das Pflegegeld nach dem Tod zurückgezahlt werden?', a: 'Für den Sterbemonat nicht: Es wird bis zu dessen Ende gezahlt (§ 37 Abs. 2 SGB XI). Was danach noch auf dem Konto eingeht, holt die Kasse über die Bank zurück, die Erben müssen es nicht selbst überweisen, solange das Konto noch gedeckt ist. Melden Sie den Todesfall der Pflegekasse zügig.' },
    ],
    body: (h) => `
<h2>Pflegegeld-Tabelle 2026</h2>
${h.table(['Pflegegrad', 'Pflegegeld im Monat', 'im Jahr', '2024', 'pro Tag (30 Tage)', 'halb, während Ersatzpflege'],
  [['1', '–', '–', '–', '–', '–'], ...G.map((g) => [String(g), h.eur(PG[g]), h.eur(PG[g] * 12), h.eur(VJ[g]), h.eur(PG[g] / 30, 2), h.eur(PG[g] / 2)])],
  'Beträge nach § 37 Abs. 1 SGB XI seit 1. Januar 2025, unverändert 2026.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Das Pflegegeld ist die einzige Leistung der Pflegeversicherung, die frei verfügbar auf dem Konto landet. Die Kasse fragt nicht, wofür es ausgegeben wird. Sie verlangt nur, dass die Pflege damit „in geeigneter Weise“ sichergestellt ist, und kontrolliert das über den ${h.a('beratungseinsatz', 'Beratungseinsatz')} zu Hause, der einmal im Halbjahr Pflicht ist (${h.src('sgb11_37', '§ 37 Abs. 3 SGB XI')}).</p>

<h2>Wann das Pflegegeld weniger wird</h2>
<h3>Angebrochener Monat</h3>
<p>Ab dem Monat des Antrags wird gezahlt, aber erst ab dem Tag, an dem die Pflegebedürftigkeit vorliegt. Für einen angebrochenen Monat rechnet die Kasse mit 30 Tagen: Bei Pflegegrad 4 ab dem 13. eines Monats sind das 18 Tage und ${h.eur(teil)}. Der obige Rechner gibt den Wert für jeden Grad und jede Tageszahl.</p>
<h3>Pflegedienst dazu</h3>
<p>Kommt ein zugelassener Pflegedienst, wird aus dem Pflegegeld die ${h.a('kombinationsleistung', 'Kombinationsleistung')}. Der Anteil, zu dem die ${h.a('pflegesachleistung', 'Sachleistung')} genutzt wurde, geht vom Pflegegeld ab. Das trifft viele Familien unerwartet, wenn der Dienst im Winter mehr Einsätze abrechnet: Das Pflegegeld schwankt dann von Monat zu Monat mit der Rechnung.</p>
<h3>Versäumter Beratungsbesuch</h3>
<p>Fehlt der Nachweis über den halbjährlichen Beratungseinsatz, kürzt die Kasse das Pflegegeld „angemessen“ und entzieht es im Wiederholungsfall (§ 37 Abs. 6). Der Besuch kostet nichts; jeder zweite darf bis zum ${h.date(P.beratung.video_bis)} per Video stattfinden.</p>
<!--mini:beratung-->

<h2>Wann das Pflegegeld trotzdem weiterläuft</h2>
${h.table(['Lage', 'Pflegegeld', 'Grundlage'], [
  ['Krankenhaus oder stationäre Reha', `voll, ${P.krankenhaus.pflegegeld_weiter_wochen} Wochen`, '§ 34 Abs. 2 SGB XI'],
  ['Kurzzeitpflege oder Verhinderungspflege', 'zur Hälfte, je bis zu 8 Wochen im Jahr', '§ 37 Abs. 2 SGB XI'],
  ['Wohnsitz oder Aufenthalt in EU, EWR, Schweiz', 'voll, ohne zeitliche Grenze', '§ 34 Abs. 1a SGB XI'],
  ['Reise in andere Staaten', `voll, bis ${P.ausland.wochen_vorruebergehend} Wochen im Jahr`, '§ 34 Abs. 1 SGB XI'],
  ['Sterbemonat', 'voll bis Monatsende', '§ 37 Abs. 2 SGB XI'],
], 'Was in Sonderlagen mit dem Pflegegeld geschieht.', ['l', 'l', 'l'])}
<p>Bei der Ersatzpflege lohnt ein Blick auf die Zahl: Drei Wochen Kurzzeitpflege bei Pflegegrad 3 bedeuten ${ersatz.tage} Tage mit halbem Pflegegeld, zusammen ${h.eur(ersatz.summe)}, während die Kurzzeitpflege selbst aus dem Jahresbetrag von ${h.eur(P.jahresbetrag.euro)} bezahlt wird. Das hilft, wenn die pflegende Person in dieser Zeit Fahrten oder einen Verdienstausfall hat. Mehr unter ${h.a('verhinderungspflege', 'Verhinderungspflege')} und ${h.a('kurzzeitpflege', 'Kurzzeitpflege')}.</p>

<h2>Steuer, Sozialleistungen und Unterhalt</h2>
<p>Für die pflegebedürftige Person ist das Pflegegeld steuerfrei, und bei einkommensabhängigen Sozialleistungen wie Bürgergeld, Wohngeld oder Grundsicherung bleibt es unberücksichtigt (${h.src('sgb11_13', '§ 13 Abs. 5 SGB XI')}). Gibt sie es an Angehörige oder andere Menschen weiter, die sie aus sittlicher Pflicht pflegen, ist es für diese bis zur Höhe des Pflegegeldes steuerfrei (${h.src('estg3', '§ 3 Nr. 36 EStG')}). Wer allerdings Geld für die Pflege annimmt, kann den ${h.a('pflege-pauschbetrag', 'Pflege-Pauschbetrag')} nicht zusätzlich ansetzen; hier muss die Familie rechnen, was mehr bringt.</p>
<p>Für pflegende Angehörige zählt außerdem, dass die Pflegekasse ab Pflegegrad 2 Rentenbeiträge zahlt, wenn sie mindestens zehn Stunden pro Woche an zwei Tagen pflegen. Die Beiträge sind beim reinen Pflegegeld am höchsten, weil dann die Familie die ganze Arbeit trägt. Den Wert rechnet der ${h.a('rente-pflegende-angehoerige', 'Rentenrechner für Angehörige')}.</p>

<h2>Wer mit dem Pflegegeld bezahlt werden darf</h2>
<p>Das Gesetz schreibt nicht vor, wer pflegt. Neben Kindern und Ehepartnern kommen Nachbarn, Freunde oder eine selbst angestellte Hilfe in Frage. Entscheidend ist, dass die Pflege tatsächlich klappt; das prüft die Beratungsperson beim Hausbesuch. Wer eine Haushaltshilfe auf Minijob-Basis beschäftigt und mit dem Pflegegeld bezahlt, wird zum Arbeitgeber und muss sie anmelden. Bei Freunden und Nachbarn bleibt das Geld steuerfrei, solange sie aus persönlicher Verbundenheit helfen und nicht mehr als das Pflegegeld erhalten.</p>

<h2>Antrag und erste Zahlung</h2>
<p>Pflegegeld gibt es nur auf Antrag, und zwar ab dem Monat, in dem er eingeht (${h.src('sgb11_33', '§ 33 SGB XI')}). Ein Anruf bei der Pflegekasse genügt als Antrag. Die Kasse hat für die Entscheidung ${P.verfahren.entscheidung_arbeitstage} Arbeitstage; kommt der Bescheid später, wird rückwirkend ab dem Antragsmonat gezahlt. Wer zögert, verliert also für jeden Monat einen vollen Betrag. Der Weg ist unter ${h.a('pflegegrad-beantragen', 'Pflegegrad beantragen')} beschrieben.</p>
`,
  },
  en: {
    slug: 'care-allowance',
    nav: 'Care allowance',
    card: '2026 table, payment, part months, hospital stays, travel abroad, tax and passing it on to relatives.',
    title: 'Pflegegeld 2026: German Care Allowance Rules and Table',
    description: `German care allowance (Pflegegeld) table 2026: ${PG['2']} to ${PG['5']} euros a month, and when it is paid, cut or continued: part months, hospital, respite, abroad, tax.`,
    h1: 'German care allowance 2026: table and payment rules',
    intro: 'What the Pflegekasse transfers each month, when less arrives, and when the money keeps coming despite a hospital stay or a trip abroad.',
    resume: `Under section 37 of Book XI of the German Social Code the care allowance (Pflegegeld) is ${EN.eur(PG['2'])} a month at care grade 2, ${EN.eur(PG['3'])} at grade 3, ${EN.eur(PG['4'])} at grade 4 and ${EN.eur(PG['5'])} at grade 5 in 2026; grade 1 receives none. It belongs to the person who needs care, who uses it to organise care themselves, usually through relatives, and the long-term care fund pays it monthly into their account. If entitlement starts mid-month the fund pays by the day, counting the month as 30 days: someone with grade 4 from the 13th receives ${EN.eur(teil)} for 18 days. During short-term or respite care half continues for up to eight weeks a year each, and during a hospital stay it continues in full for eight weeks. It does not pause for people living in the EU, the EEA or Switzerland. It never counts as income for means-tested benefits, and passed on to relatives who provide care it is tax-free up to the amount of the allowance.`,
    faqs: [
      { q: 'What was the German care allowance in 2024?', a: `In 2024 it was ${EN.eur(VJ['2'])}, ${EN.eur(VJ['3'])}, ${EN.eur(VJ['4'])} and ${EN.eur(VJ['5'])} for grades 2 to 5. On 1 January 2025 every benefit rose by 4.5 percent under section 30(1) SGB XI. The law foresees no further rise in 2026 or 2027; the next one is set for 1 January 2028.` },
      { q: 'Does the allowance continue while my parent is in hospital?', a: `Yes, in full for the first ${P.krankenhaus.pflegegeld_weiter_wochen} weeks of an inpatient hospital stay or residential rehabilitation (section 34(2) SGB XI). From the ninth week it pauses. The health insurer usually informs the care fund, but reporting a long stay yourself avoids repayment demands later.` },
      { q: 'Can my parent spend the winter with us outside Europe?', a: `For a temporary stay outside the EU, EEA and Switzerland the allowance continues for up to ${P.ausland.wochen_vorruebergehend} weeks per calendar year (section 34(1) SGB XI) and then pauses. Within Europe there is no such limit. A longer stay abroad also affects German health insurance, so ask both funds in writing before booking.` },
      { q: 'Who owns the money: my mother or me as her carer?', a: 'Legally your mother. She decides whether and how much to pass on to the people caring for her. For you, money passed on is tax-free up to the amount of the allowance (section 3 no. 36 Income Tax Act) and is generally ignored when your own maintenance claims are assessed (section 13(6) SGB XI).' },
      { q: 'Does the allowance stop if my parent moves to live with me in another EU country?', a: 'No. Under section 34(1a) SGB XI the cash allowance does not pause while the insured person lives in the EU, the EEA or Switzerland, provided they remain insured with the German long-term care insurance. Services in kind from German providers end with the move. Tell the Pflegekasse in writing about the new address and ask how it will organise the required advice visits.' },
      { q: 'How much allowance is left when a care service also visits?', a: `The allowance falls by the share of the services budget used. At grade 2 a ${EN.eur(300)} care service bill uses ${EN.pct(k2.anteil, 1)} of the ${EN.eur(P.sachleistung['2'])} budget, leaving ${EN.eur(k2.pflegegeld, 2)}. The relief amount, day care and consumable aids do not reduce the allowance.` },
    ],
    body: (h) => `
<h2>Care allowance table 2026</h2>
${h.table(['Care grade', 'Allowance per month', 'per year', '2024', 'per day (30 days)', 'half, during respite'],
  [['1', '–', '–', '–', '–', '–'], ...G.map((g) => [String(g), h.eur(PG[g]), h.eur(PG[g] * 12), h.eur(VJ[g]), h.eur(PG[g] / 30, 2), h.eur(PG[g] / 2)])],
  'Amounts under section 37(1) SGB XI since 1 January 2025, unchanged in 2026.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>The allowance is the only long-term care benefit paid as free money. The fund does not ask what it is spent on; it only requires that care is properly ensured, and checks this through the ${h.a('beratungseinsatz', 'home advice visit')} that is compulsory every six months (${h.src('sgb11_37', 'section 37(3) SGB XI')}).</p>

<h2>When less is paid</h2>
<h3>Part months</h3>
<p>Payment starts in the month of application, from the day care needs exist. Part months are counted as 30 days: grade 4 from the 13th means 18 days and ${h.eur(teil)}. The calculator above gives the amount for any grade and number of days.</p>
<h3>A care service on top</h3>
<p>Once a registered care service is involved, the allowance turns into the ${h.a('kombinationsleistung', 'combined benefit')}: the share of the ${h.a('pflegesachleistung', 'services budget')} used comes off the allowance. If the service bills more visits in winter, the allowance changes month by month with the bill.</p>
<h3>Missed advice visit</h3>
<p>Without proof of the six-monthly visit the fund cuts the allowance “appropriately” and withdraws it if it happens again (section 37(6)). The visit is free; every second one can be by video until ${h.date(P.beratung.video_bis)}, so a relative abroad can take part.</p>
<!--mini:beratung-->

<h2>When it continues anyway</h2>
${h.table(['Situation', 'Allowance', 'Legal basis'], [
  ['Hospital or residential rehabilitation', `in full, ${P.krankenhaus.pflegegeld_weiter_wochen} weeks`, 'section 34(2) SGB XI'],
  ['Short-term or respite care', 'half, up to 8 weeks a year each', 'section 37(2) SGB XI'],
  ['Living or staying in the EU, EEA, Switzerland', 'in full, no time limit', 'section 34(1a) SGB XI'],
  ['Travel to other countries', `in full, up to ${P.ausland.wochen_vorruebergehend} weeks a year`, 'section 34(1) SGB XI'],
  ['Month of death', 'in full to month end', 'section 37(2) SGB XI'],
], 'What happens to the allowance in special situations.', ['l', 'l', 'l'])}
<p>Three weeks of short-term care at grade 3 mean ${ersatz.tage} days of half allowance, ${h.eur(ersatz.summe)} in total, while the stay itself is paid from the ${h.eur(P.jahresbetrag.euro)} annual budget. See ${h.a('verhinderungspflege', 'respite care')} and ${h.a('kurzzeitpflege', 'short-term care')}.</p>

<h2>Tax, benefits and maintenance</h2>
<p>For the person cared for, the allowance is tax-free and ignored for means-tested benefits such as Bürgergeld, housing benefit or basic income support in old age (${h.src('sgb11_13', 'section 13(5) SGB XI')}). Passed on to relatives or others who care out of moral obligation, it is tax-free up to the allowance amount (${h.src('estg3', 'section 3 no. 36 Income Tax Act')}). A carer who accepts money for caring cannot also claim the ${h.a('pflege-pauschbetrag', 'carer’s lump sum')}, so families should compare which is worth more.</p>
<p>From grade 2 the fund also pays German pension contributions for a relative caring at least ten hours a week over two days, highest when only the allowance is drawn; see the ${h.a('rente-pflegende-angehoerige', 'carer pension calculator')}.</p>

<h2>Who can be paid from the allowance</h2>
<p>The law does not say who must provide the care. Besides children and spouses, neighbours, friends or a privately employed helper all qualify; what counts is that care actually works, which the advice visitor checks. If the family employs a household helper on a German mini-job and pays them from the allowance, the person cared for becomes an employer and has to register the job. Friends and neighbours who help out of personal ties keep the money tax-free as long as they receive no more than the allowance. For families abroad this is often the practical answer: a trusted neighbour covers the daily visits, a relative flies in for longer stays, and the allowance pays for both.</p>

<h2>Application and first payment</h2>
<p>The allowance is only paid on application, from the month it arrives (${h.src('sgb11_33', 'section 33 SGB XI')}). A phone call to the Pflegekasse counts. The fund has ${P.verfahren.entscheidung_arbeitstage} working days to decide; a later decision still pays back to the application month, so every month of delay is a month’s allowance lost. See ${h.a('pflegegrad-beantragen', 'applying for a care grade')}.</p>
`,
  },
});
