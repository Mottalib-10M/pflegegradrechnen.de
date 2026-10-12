import { defineGuide } from '../../lib/guide-types';
import { jahresbetrag, pflegegeldWaehrendErsatz } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Tochter vertritt zwei Wochen bei Grad 3; Pflegedienst 2.000 € plus Nachbarin. */
const J = P.jahresbetrag;
const tochter = jahresbetrag({ grad: 3, kurzzeitEuro: 0, verhinderungFremdEuro: 0, verhinderungAngehoerigEuro: 1500, angehoerigAufwendungenEuro: 180 });
const mix = jahresbetrag({ grad: 4, kurzzeitEuro: 0, verhinderungFremdEuro: 2000, verhinderungAngehoerigEuro: 0, angehoerigAufwendungenEuro: 0 });
const halb = pflegegeldWaehrendErsatz(4, 14);

export default defineGuide({
  id: 'verhinderungspflege',
  group: 'zuhause',
  order: 50,
  tool: 'jahresbetrag',
  related: ['kurzzeitpflege', 'entlastungsbetrag', 'pflegegeld', 'tagespflege', 'pflegereform-2027', 'pflegezeit'],
  sources: ['sgb11_39', 'sgb11_42a', 'sgb11_37', 'sgb11_42'],
  de: {
    slug: 'verhinderungspflege',
    nav: 'Verhinderungspflege',
    card: `${DE.eur(J.euro)} im Jahr für Vertretung und Kurzzeitpflege: planen, wer einspringt und was erstattet wird.`,
    title: `Verhinderungspflege 2026: ${DE.eur(J.euro)} Jahresbetrag planen`,
    description: `Verhinderungspflege 2026: gemeinsamer Jahresbetrag ${DE.eur(J.euro)} mit der Kurzzeitpflege, Angehörige bis 2 × Pflegegeld, halbes Pflegegeld läuft weiter. Mit Rechner.`,
    h1: 'Verhinderungspflege 2026 berechnen',
    intro: 'Wer springt ein, wenn die pflegende Person Urlaub braucht oder krank wird? Der Rechner teilt den Jahresbetrag auf und zeigt, was übrig bleibt.',
    resume: `Ist die pflegende Person wegen Urlaub, Krankheit oder aus anderen Gründen verhindert, bezahlt die Pflegekasse ab Pflegegrad 2 eine Ersatzpflege für bis zu acht Wochen im Kalenderjahr (§ 39 SGB XI). Seit dem 1. Juli 2025 teilen sich Verhinderungs- und Kurzzeitpflege einen Gemeinsamen Jahresbetrag von ${DE.eur(J.euro)} (§ 42a). Eine Vorpflegezeit gibt es nicht mehr, und ein Antrag vor der Vertretung ist nicht nötig; die Erstattung muss bis zum Ende des Folgejahres beantragt werden. Übernimmt ein Pflegedienst, eine Nachbarin oder ein entfernter Verwandter, zahlt die Kasse die nachgewiesenen Kosten bis zum Jahresbetrag. Springen enge Angehörige bis zum zweiten Grad oder Mitbewohner nicht beruflich ein, zahlt sie regelmäßig höchstens zwei Monatsbeträge Pflegegeld, bei Pflegegrad 3 also ${DE.eur(tochter.capAngehoerig)}, dazu belegte Fahrtkosten oder Verdienstausfall. Während der Vertretung läuft das halbe Pflegegeld weiter, bei Pflegegrad 4 für zwei Wochen ${DE.eur(halb.summe)}.`,
    faqs: [
      { q: 'Muss die Verhinderungspflege vorher beantragt werden?', a: 'Nein. Seit der Neufassung des § 39 SGB XI ist eine vorherige Antragstellung nicht erforderlich. Es genügt, die Kosten nach der Vertretung mit Belegen bei der Pflegekasse einzureichen, spätestens bis zum Ende des Kalenderjahres, das auf die Ersatzpflege folgt. Für die Planung lohnt trotzdem eine kurze Nachricht an die Kasse, damit bekannt ist, wie viel vom Jahresbetrag noch frei ist.' },
      { q: 'Kann ich Verhinderungspflege stundenweise nutzen?', a: 'Ja. Die Vertretung muss nicht ganze Tage dauern. Auch einzelne Stunden, etwa für einen Arzttermin der pflegenden Person oder einen freien Nachmittag, gelten als Verhinderung. Die Kosten werden aus dem Jahresbetrag erstattet. Wie sich eine stundenweise Vertretung auf das Pflegegeld des Tages auswirkt, regelt das Gesetz nicht ausdrücklich; fragen Sie dazu Ihre Pflegekasse vorab schriftlich.' },
      { q: 'Wird die Verhinderungspflege 2027 abgeschafft?', a: `Der Regierungsentwurf zum Pflegeneuordnungsgesetz vom 30. September 2026 sieht Änderungen bei Ersatzpflege und Notfällen vor, unter anderem ein Überbrückungsbudget. Er ist aber noch kein Gesetz. Bis zur Verkündung gilt der Gemeinsame Jahresbetrag von ${DE.eur(J.euro)}, und Ansprüche für 2026 können wie bisher bis Ende 2027 abgerechnet werden.` },
    ],
    body: (h) => `
<h2>Wer einspringt, entscheidet über den Betrag</h2>
${h.table(['Ersatzpflege durch', 'Erstattung', 'Grundlage'], [
  ['Pflegedienst, Betreuungsdienst', `nachgewiesene Kosten bis ${h.eur(J.euro)}`, '§ 39 Abs. 2'],
  ['Nachbarn, Freunde, Verwandte ab dem 3. Grad', `nachgewiesene Kosten bis ${h.eur(J.euro)}`, '§ 39 Abs. 2'],
  ['Kinder, Eltern, Geschwister, Enkel, Schwiegerkinder, Mitbewohner (beruflich)', `bis ${h.eur(J.euro)}`, '§ 39 Abs. 3 Satz 1'],
  ['dieselben, nicht beruflich', `${J.angehoerige_pflegegeld_monate} × Pflegegeld plus belegte Aufwendungen, zusammen höchstens ${h.eur(J.euro)}`, '§ 39 Abs. 3 Satz 2 bis 4'],
], 'Was die Pflegekasse für eine Vertretung erstattet.', ['l', 'l', 'l'])}
<p>Ein Beispiel: Die Tochter vertritt bei Pflegegrad 3 den Vater, der sonst die Mutter pflegt, zwei Wochen lang und setzt ${h.eur(1500)} an. Weil sie als Angehörige ersten Grades nicht beruflich pflegt, erkennt die Kasse höchstens ${h.eur(tochter.capAngehoerig)} an, dazu ${h.eur(180)} belegte Fahrtkosten: Erstattet werden ${h.eur(tochter.erstattet)}, im Topf bleiben ${h.eur(tochter.rest)} für eine spätere Kurzzeitpflege. Bucht dieselbe Familie bei Pflegegrad 4 einen Pflegedienst für ${h.eur(2000)}, zahlt die Kasse ihn ganz und es bleiben ${h.eur(mix.rest)}.</p>
<h2>Halbes Pflegegeld nicht vergessen</h2>
<p>Während der Vertretung zahlt die Kasse die Hälfte des Pflegegeldes weiter, für bis zu acht Wochen im Jahr (${h.src('sgb11_37', '§ 37 Abs. 2 SGB XI')}). Damit kann die Familie zum Beispiel die Vertretung durch Angehörige zusätzlich anerkennen. Das Feld „Tage Ersatzpflege“ im Rechner zeigt die Summe.</p>
<h2>Kurzzeitpflege aus demselben Topf</h2>
<p>Wird ein Platz in einer Einrichtung gebraucht, etwa nach einem Krankenhausaufenthalt, kommt die ${h.a('kurzzeitpflege', 'Kurzzeitpflege')} aus demselben Jahresbetrag. Was für die Vertretung zu Hause verbraucht ist, fehlt dort. Unterkunft und Verpflegung im Heim zahlt der Jahresbetrag nicht; dafür passt der ${h.a('entlastungsbetrag', 'Entlastungsbetrag')}.</p>
`,
  },
  en: {
    slug: 'respite-care',
    nav: 'Respite care',
    card: `${EN.eur(J.euro)} a year for replacement and short-term care: plan who covers and what gets refunded.`,
    title: `Verhinderungspflege 2026: Plan the ${EN.eur(J.euro)} Respite Budget`,
    description: `German respite care 2026: joint annual budget of ${EN.eur(J.euro)} shared with short-term care, relatives up to 2 × the allowance, and the half allowance continues.`,
    h1: 'Work out German respite care for 2026',
    intro: 'Who steps in when the main carer needs a holiday or falls ill? The calculator splits the annual budget and shows what is left.',
    resume: `When the person providing care at home is on holiday, ill or otherwise unable to care, the German long-term care fund pays for replacement care for up to eight weeks per calendar year from care grade 2 (section 39 of Book XI of the Social Code). Since 1 July 2025 respite care (Verhinderungspflege) and short-term care share one joint annual budget of ${EN.eur(J.euro)} (section 42a). There is no longer a six-month waiting period and no need to apply beforehand; the refund must be claimed by the end of the following year. If a care service, a neighbour or a more distant relative covers, the fund refunds documented costs up to the budget. If close relatives up to the second degree or people in the same household cover on a non-professional basis, it normally pays at most twice the monthly care allowance, ${EN.eur(tochter.capAngehoerig)} at grade 3, plus documented travel costs or lost earnings. Half the care allowance continues meanwhile: ${EN.eur(halb.summe)} for two weeks at grade 4.`,
    faqs: [
      { q: 'Do we need approval before booking respite care?', a: 'No. Section 39 SGB XI now states that no prior application is required. Submit the costs with receipts after the replacement care, at the latest by the end of the calendar year after the one in which it took place. A short message to the fund beforehand still helps you find out how much of the joint budget remains.' },
      { q: 'I live abroad and fly in to relieve my mother. Can I be paid?', a: `Yes, as a close relative caring on a non-professional basis. The fund normally recognises up to twice the monthly allowance, plus documented costs such as flights or lost earnings, all within the ${EN.eur(J.euro)} budget (section 39(3) SGB XI). Keep tickets and an employer’s note on unpaid leave to support the claim.` },
      { q: 'Is respite care being abolished in 2027?', a: `The government bill for the Care Reorganisation Act of 30 September 2026 plans changes to replacement and emergency care, including a bridging budget. It is not law yet. Until it is published, the ${EN.eur(J.euro)} joint budget applies, and 2026 entitlements can still be claimed until the end of 2027.` },
    ],
    body: (h) => `
<h2>Who covers decides the amount</h2>
${h.table(['Replacement care by', 'Refund', 'Legal basis'], [
  ['Care service, support service', `documented costs up to ${h.eur(J.euro)}`, 's. 39(2)'],
  ['Neighbours, friends, relatives of 3rd degree or further', `documented costs up to ${h.eur(J.euro)}`, 's. 39(2)'],
  ['Children, parents, siblings, grandchildren, in-laws, household members (professionally)', `up to ${h.eur(J.euro)}`, 's. 39(3) sentence 1'],
  ['the same, non-professionally', `${J.angehoerige_pflegegeld_monate} × allowance plus documented costs, at most ${h.eur(J.euro)}`, 's. 39(3) sentences 2 to 4'],
], 'What the fund refunds for replacement care.', ['l', 'l', 'l'])}
<p>Example: at grade 3 a daughter covers for two weeks for her father, who normally cares for her mother, and claims ${h.eur(1500)}. As a first-degree relative caring non-professionally, the fund recognises at most ${h.eur(tochter.capAngehoerig)} plus ${h.eur(180)} of documented travel: ${h.eur(tochter.erstattet)} is refunded and ${h.eur(tochter.rest)} stays in the pot for later short-term care. If the family books a care service for ${h.eur(2000)} at grade 4 instead, the fund pays it in full and ${h.eur(mix.rest)} remains.</p>
<h2>Do not forget the half allowance</h2>
<p>During replacement care the fund continues paying half the allowance for up to eight weeks a year (${h.src('sgb11_37', 'section 37(2) SGB XI')}). Enter the number of days in the calculator to see the total.</p>
<h2>Short-term care from the same pot</h2>
<p>If a bed in a facility is needed, for example after a hospital stay, ${h.a('kurzzeitpflege', 'short-term care')} is paid from the same annual budget, so whatever was used for cover at home is missing there. Board and lodging in the facility are not covered by the budget; the ${h.a('entlastungsbetrag', 'relief amount')} can pay them.</p>
`,
  },
});
