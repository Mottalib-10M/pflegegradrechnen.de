import { defineGuide } from '../../lib/guide-types';
import { jahresbetrag, pflegegeldWaehrendErsatz } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: drei Wochen nach Klinik bei Grad 3 (Pflegesatz 95 € am Tag), sechs Wochen bei Grad 5 (110 €). */
const J = P.jahresbetrag;
const drei = jahresbetrag({ grad: 3, kurzzeitEuro: 95 * 21, verhinderungFremdEuro: 0, verhinderungAngehoerigEuro: 0, angehoerigAufwendungenEuro: 0 });
const sechs = jahresbetrag({ grad: 5, kurzzeitEuro: 110 * 42, verhinderungFremdEuro: 0, verhinderungAngehoerigEuro: 0, angehoerigAufwendungenEuro: 0 });
const halb3 = pflegegeldWaehrendErsatz(3, 21);
const tageMax = (satz: number) => Math.floor(J.euro / satz);

export default defineGuide({
  id: 'kurzzeitpflege',
  group: 'zuhause',
  order: 60,
  mini: 'kurzzeitTage',
  related: ['verhinderungspflege', 'entlastungsbetrag', 'pflegegeld', 'pflegeheim-kosten', 'tagespflege', 'pflegegrad-beantragen'],
  sources: ['sgb11_42', 'sgb11_42a', 'sgb11_37', 'sgb5_39c', 'sgb11_45b'],
  de: {
    slug: 'kurzzeitpflege',
    nav: 'Kurzzeitpflege',
    card: 'Vorübergehend ins Heim, etwa nach dem Krankenhaus: was die Kasse zahlt, was selbst bleibt, wie viele Tage der Topf trägt.',
    title: 'Kurzzeitpflege 2026: Kosten, Anspruch und Eigenanteil',
    description: `Kurzzeitpflege 2026: bis 8 Wochen im Jahr aus dem Jahresbetrag von ${DE.eur(J.euro)}, halbes Pflegegeld läuft weiter, Unterkunft über den Entlastungsbetrag zahlen.`,
    h1: 'Kurzzeitpflege: wer zahlt und was übrig bleibt',
    intro: 'Nach dem Krankenhaus, in einer Krise oder wenn zu Hause gerade alles zusammenbricht: einige Wochen in einer Pflegeeinrichtung, und wie sie bezahlt werden.',
    resume: `Kurzzeitpflege ist ein vorübergehender Aufenthalt in einer vollstationären Pflegeeinrichtung, wenn die Pflege zu Hause zeitweise nicht oder noch nicht möglich ist, typischerweise nach einem Krankenhausaufenthalt oder in einer Krise (§ 42 SGB XI). Den Anspruch haben Pflegebedürftige ab Pflegegrad 2, für bis zu acht Wochen im Kalenderjahr. Die Pflegekasse zahlt die pflegebedingten Kosten, die Betreuung und die Behandlungspflege aus dem Gemeinsamen Jahresbetrag von ${DE.eur(J.euro)}, den sie sich mit der Verhinderungspflege teilt (§ 42a). Unterkunft, Verpflegung und Investitionskosten zahlt die Familie; dafür kann der Entlastungsbetrag eingesetzt werden. Bei einem Pflegesatz von ${DE.eur(95)} am Tag deckt der Topf drei Wochen vollständig ab, es bleiben ${DE.eur(drei.rest)} für spätere Vertretungen; bei ${DE.eur(110)} reicht er für ${tageMax(110)} Tage. Während der Kurzzeitpflege wird das halbe Pflegegeld weitergezahlt. Wer keinen Pflegegrad 2 hat, etwa nach einer Operation, kann Kurzzeitpflege über die Krankenkasse erhalten (§ 39c SGB V).`,
    faqs: [
      { q: 'Wie finde ich schnell einen Kurzzeitpflegeplatz nach dem Krankenhaus?', a: 'Zuständig ist zuerst der Sozialdienst des Krankenhauses, der beim Entlassmanagement einen Platz suchen muss. Parallel helfen der Pflegestützpunkt und die Pflegekasse mit Listen freier Plätze. Kurzzeitpflegeplätze sind knapp; eingestreute Plätze in normalen Pflegeheimen sind häufiger als eigene Kurzzeitpflegeeinrichtungen. Fragen Sie mehrere Häuser gleichzeitig an.' },
      { q: 'Gibt es Kurzzeitpflege auch ohne Pflegegrad?', a: `Ja, über die Krankenkasse, wenn nach schwerer Krankheit, einer Operation oder einem Krankenhausaufenthalt die häusliche Krankenpflege nicht ausreicht und kein Pflegegrad 2 bis 5 festgestellt ist (§ 39c SGB V). Für Dauer und Höhe gelten dieselben Grenzen wie bei der Pflegekasse: bis acht Wochen und bis ${DE.eur(J.euro)} im Jahr.` },
      { q: 'Was zahle ich in der Kurzzeitpflege selbst?', a: 'Unterkunft und Verpflegung sowie die Investitionskosten der Einrichtung, außerdem den Pflegeanteil, sobald der Jahresbetrag aufgebraucht ist. Diese Kosten kann der Entlastungsbetrag decken, auch angesparte Reste aus dem Vorjahr bis zum 30. Juni. Wer Hilfe zur Pflege bezieht, kann beim Sozialamt die Übernahme der restlichen Kosten beantragen.' },
      { q: 'Läuft das Pflegegeld während der Kurzzeitpflege weiter?', a: `Zur Hälfte, für bis zu acht Wochen im Jahr (§ 37 Abs. 2 SGB XI). Bei Pflegegrad 3 und drei Wochen Kurzzeitpflege sind das ${DE.eur(halb3.summe)}. Bei der Kombinationsleistung wird die Hälfte des zuletzt gezahlten anteiligen Pflegegeldes fortgezahlt. Die Sachleistung des Pflegedienstes ruht in dieser Zeit, weil er nicht ins Haus kommt.` },
      { q: 'Kann Kurzzeitpflege in einer Behinderteneinrichtung stattfinden?', a: 'In begründeten Einzelfällen ja, wenn die Pflege in einer zugelassenen Kurzzeitpflege nicht möglich oder nicht zumutbar ist, etwa bei jungen Menschen mit Behinderung (§ 42 Abs. 3 SGB XI). Sind Unterkunft, Verpflegung und Investitionen im Entgelt nicht getrennt ausgewiesen, gelten 60 Prozent des Entgelts als zuschussfähig.' },
    ],
    body: (h) => `
<h2>Wann Kurzzeitpflege passt</h2>
<p>Das Gesetz nennt zwei Lagen: die Übergangszeit nach einer stationären Behandlung und sonstige Krisen, in denen häusliche oder teilstationäre Pflege vorübergehend nicht reicht (${h.src('sgb11_42', '§ 42 SGB XI')}). Praktisch heißt das: Die Mutter kommt nach einem Oberschenkelhalsbruch aus der Klinik, kann aber noch nicht allein zur Toilette, und die Wohnung ist noch nicht umgebaut. Oder der pflegende Ehemann muss selbst operiert werden. Oder die Familie braucht Zeit, um einen Heimplatz oder eine Pflege zu Hause zu organisieren.</p>
<p>Von der ${h.a('verhinderungspflege', 'Verhinderungspflege')} unterscheidet sich die Kurzzeitpflege durch den Ort: Sie findet in einer zugelassenen Einrichtung statt, mit Unterkunft und Verpflegung. Die Vertretung bei der Verhinderungspflege kann dagegen zu Hause, stundenweise oder durch Angehörige erfolgen. Seit dem 1. Juli 2025 kommen beide aus einem Topf von ${h.eur(J.euro)} im Kalenderjahr (${h.src('sgb11_42a', '§ 42a SGB XI')}).</p>

<h2>Wie viele Tage der Jahresbetrag trägt</h2>
${h.table(['Pflegesatz pro Tag (Pflegeanteil)', 'Tage aus dem Jahresbetrag', 'drei Wochen kosten', 'Rest nach drei Wochen'],
  [80, 95, 110, 130, 150].map((s) => { const r = jahresbetrag({ grad: 3, kurzzeitEuro: s * 21, verhinderungFremdEuro: 0, verhinderungAngehoerigEuro: 0, angehoerigAufwendungenEuro: 0 }); return [h.eur(s), String(Math.min(tageMax(s), J.wochen_kurzzeit * 7)), h.eur(s * 21), h.eur(r.rest)]; }),
  `Höchstens ${J.wochen_kurzzeit} Wochen im Jahr; Unterkunft, Verpflegung und Investitionskosten kommen hinzu.`, ['r', 'r', 'r', 'r'])}
<p>Die Pflegesätze der Kurzzeitpflege unterscheiden sich von Haus zu Haus. Fragen Sie vor der Aufnahme nach einer Aufstellung, die den Pflegeanteil getrennt von Unterkunft, Verpflegung und Investitionskosten ausweist. Nur der Pflegeanteil wird aus dem Jahresbetrag bezahlt. Ein Aufenthalt von sechs Wochen bei Pflegegrad 5 und ${h.eur(110)} am Tag verbraucht ${h.eur(sechs.kurzzeit)} und lässt ${h.eur(sechs.selbst)} Pflegeanteil offen, dazu die Unterkunft.</p>
<!--mini:kurzzeitTage-->

<h2>Die Kosten, die bei der Familie bleiben</h2>
<p>Unterkunft und Verpflegung liegen in Pflegeheimen im Bundesschnitt bei ${h.eur(P.heim.bund.uv)} im Monat, die Investitionskosten bei ${h.eur(P.heim.bund.invest)} (vdek, 1. Juli 2026). Auf drei Wochen umgerechnet sind das einige hundert Euro. Dafür ist der ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} da: Er darf ausdrücklich für Leistungen der Kurzzeitpflege eingesetzt werden, und wer ihn das Jahr über nicht genutzt hat, hat genug angespart (${h.src('sgb11_45b', '§ 45b SGB XI')}). Reicht das nicht und sind Einkommen und Vermögen gering, übernimmt das Sozialamt die Kosten im Rahmen der Hilfe zur Pflege.</p>

<h2>Kurzzeitpflege ohne Pflegegrad</h2>
<p>Viele brauchen Kurzzeitpflege genau dann, wenn noch gar kein Pflegegrad festgestellt ist, etwa nach einer Operation. Dann ist die Krankenkasse zuständig (${h.src('sgb5_39c', '§ 39c SGB V')}), mit denselben Grenzen wie die Pflegekasse. Liegt dagegen schon ein Antrag auf Pflegegrad vor, lohnt es sich, ihn aus dem Krankenhaus heraus zu stellen: Für Patientinnen im Krankenhaus gelten verkürzte Begutachtungsfristen. Mehr unter ${h.a('pflegegrad-beantragen', 'Pflegegrad beantragen')}.</p>

<h2>Pflegegeld, Sachleistung, Rente während der Kurzzeitpflege</h2>
<p>Das Pflegegeld läuft zur Hälfte weiter (${h.src('sgb11_37', '§ 37 Abs. 2 SGB XI')}), bei drei Wochen und Pflegegrad 3 sind das ${h.eur(halb3.summe)}. Die Sachleistung des Pflegedienstes entfällt für diese Zeit. Rentenbeiträge für pflegende Angehörige laufen bei einer Unterbrechung bis zu acht Wochen grundsätzlich weiter, wenn die Pflegeperson zum Beispiel selbst Urlaub macht. Für die Planung des ganzen Jahres zeigt der ${h.a('verhinderungspflege', 'Jahresbetrag-Rechner')}, was nach einer Kurzzeitpflege für Vertretungen übrig bleibt.</p>

<h2>Wenn aus der Kurzzeitpflege ein Dauerplatz wird</h2>
<p>Nicht selten zeigt sich während der Kurzzeitpflege, dass die Rückkehr nach Hause nicht mehr gelingt. Dann wechselt die Einrichtung oft in die vollstationäre Dauerpflege, manchmal im selben Haus. Ab diesem Tag gelten andere Regeln: Die Kasse zahlt den festen Betrag nach § 43 an das Heim, der Leistungszuschlag auf den Eigenanteil beginnt mit 15 Prozent, und das Pflegegeld endet. Der Jahresbetrag wird für die Dauerpflege nicht mehr gebraucht. Klären Sie den Wechsel schriftlich mit Heim und Pflegekasse, damit die Tage richtig zugeordnet werden, und lassen Sie sich den ab dann geltenden Eigenanteil vorab nennen. Wie hoch er im Land ungefähr ausfällt, zeigt der ${h.a('pflegeheim-kosten', 'Pflegeheim-Rechner')}.</p>
<p>Umgekehrt kann die Kurzzeitpflege den Weg zurück öffnen. Die Wochen in der Einrichtung lassen Zeit, einen Treppenlift oder eine bodengleiche Dusche zu beantragen, für die die Pflegekasse bis ${h.eur(P.wohnumfeld.je_massnahme)} je Maßnahme zuschießt, und die nötigen Pflegehilfsmittel wie ein Pflegebett vor der Heimkehr zu liefern. Wer das in der ersten Woche anstößt, kommt in eine vorbereitete Wohnung zurück.</p>

<h2>Checkliste für die Aufnahme</h2>
<ol>
<li>Pflegegrad oder Antrag, Medikamentenplan, Arztbriefe und Hilfsmittel mitgeben.</li>
<li>Kostenaufstellung anfordern: Pflegeanteil, Unterkunft, Verpflegung, Investitionskosten getrennt.</li>
<li>Mit der Kasse klären, wie viel vom Jahresbetrag schon verbraucht ist.</li>
<li>Rechnungen für Unterkunft und Verpflegung über den Entlastungsbetrag einreichen.</li>
<li>Den Aufenthalt nutzen, um die Rückkehr vorzubereiten: Hilfsmittel bestellen, Umbau beantragen, Pflegedienst suchen und klären, wer am ersten Abend zu Hause da ist.</li>
</ol>
`,
  },
  en: {
    slug: 'short-term-care',
    nav: 'Short-term care',
    card: 'A few weeks in a care facility, for example after hospital: what the fund pays, what remains, how many days the budget covers.',
    title: 'Kurzzeitpflege 2026: German Short-Term Care Costs, Rules',
    description: `German short-term care (Kurzzeitpflege) 2026: up to 8 weeks a year from the ${EN.eur(J.euro)} joint budget, half allowance continues, board paid via the relief amount.`,
    h1: 'German short-term care: who pays and what is left',
    intro: 'After a hospital stay, in a crisis, or when care at home suddenly breaks down: a few weeks in a care facility, and how they are paid for.',
    resume: `Short-term care (Kurzzeitpflege) is a temporary stay in a residential care facility when care at home is not yet or not currently possible, typically after a hospital stay or in a crisis, under section 42 of Book XI of the German Social Code. It is available from care grade 2 for up to eight weeks per calendar year. The long-term care fund pays the care costs, supervision and medical treatment care from the joint annual budget of ${EN.eur(J.euro)}, which it shares with respite care (section 42a). Board, lodging and investment costs are paid by the family, and the relief amount may be used for them. At a daily care rate of ${EN.eur(95)} the budget covers three weeks in full and leaves ${EN.eur(drei.rest)} for later replacement care; at ${EN.eur(110)} it lasts ${tageMax(110)} days. Half the care allowance continues during the stay. Someone without grade 2 or higher, for example after an operation, can receive short-term care through their health insurer under section 39c of Book V.`,
    faqs: [
      { q: 'How do we find a short-term care bed quickly after hospital?', a: 'Start with the hospital’s social service, which must help as part of discharge planning. At the same time the Pflegestützpunkt and the care fund can give lists of free places. Beds are scarce; flexible places inside ordinary care homes are more common than dedicated short-term units, so contact several homes at once.' },
      { q: 'Is short-term care available without a care grade?', a: `Yes, through the health insurer, if home nursing is not enough after serious illness, an operation or a hospital stay and no care grade 2 to 5 has been assessed (section 39c SGB V). The same limits apply as with the care fund: up to eight weeks and ${EN.eur(J.euro)} a year.` },
      { q: 'Which costs of short-term care do we pay ourselves?', a: 'Board, lodging and the facility’s investment costs, plus the care part once the annual budget is used up. The relief amount can cover these, including savings from the previous year until 30 June. If income and savings are low, the welfare office can take over the rest as social assistance for care.' },
      { q: 'Can my father do short-term care in a facility near me in another state?', a: 'Yes. The entitlement applies in any registered short-term care facility in Germany, not only near his home. Families sometimes choose a place close to the child who will visit and organise his return. Board, lodging and care rates differ between states, so ask for a cost breakdown before agreeing.' },
      { q: 'Does the care allowance continue during short-term care?', a: `Half of it, for up to eight weeks a year (section 37(2) SGB XI): ${EN.eur(halb3.summe)} for three weeks at grade 3. With the combined benefit, half of the last pro-rata allowance continues. Services from the home care provider pause, because it is not visiting.` },
    ],
    body: (h) => `
<h2>When short-term care fits</h2>
<p>The law names two situations: the transition after inpatient treatment and other crises in which care at home or day care is temporarily not enough (${h.src('sgb11_42', 'section 42 SGB XI')}). In practice: a mother leaves hospital after a hip fracture but cannot yet get to the toilet alone and the flat has not been adapted. Or the husband who cares for her needs an operation himself. Or the family needs time to arrange a care home place or care at home, perhaps while a son flies in from abroad.</p>
<p>The difference from ${h.a('verhinderungspflege', 'respite care')} is the place: short-term care happens in a registered facility with board and lodging, whereas respite cover can be at home, by the hour or by relatives. Since 1 July 2025 both come from one pot of ${h.eur(J.euro)} per calendar year (${h.src('sgb11_42a', 'section 42a SGB XI')}).</p>

<h2>How many days the budget covers</h2>
${h.table(['Daily care rate (care part)', 'Days from the budget', 'Three weeks cost', 'Left after three weeks'],
  [80, 95, 110, 130, 150].map((s) => { const r = jahresbetrag({ grad: 3, kurzzeitEuro: s * 21, verhinderungFremdEuro: 0, verhinderungAngehoerigEuro: 0, angehoerigAufwendungenEuro: 0 }); return [h.eur(s), String(Math.min(tageMax(s), J.wochen_kurzzeit * 7)), h.eur(s * 21), h.eur(r.rest)]; }),
  `At most ${J.wochen_kurzzeit} weeks a year; board, lodging and investment costs come on top.`, ['r', 'r', 'r', 'r'])}
<p>Daily rates differ between homes. Ask for a breakdown that separates the care part from board, lodging and investment costs before admission, because only the care part comes out of the annual budget. Six weeks at grade 5 at ${h.eur(110)} a day use ${h.eur(sechs.kurzzeit)} and leave ${h.eur(sechs.selbst)} of care costs uncovered, plus accommodation.</p>
<!--mini:kurzzeitTage-->

<h2>Costs that stay with the family</h2>
<p>Board and lodging in German care homes averaged ${h.eur(P.heim.bund.uv)} a month and investment costs ${h.eur(P.heim.bund.invest)} on 1 July 2026 (vdek). Over three weeks that is several hundred euros. The ${h.a('entlastungsbetrag', 'relief amount')} may be used explicitly for short-term care, and anyone who has not used it during the year has enough saved up (${h.src('sgb11_45b', 'section 45b SGB XI')}). If that is not enough and income and savings are low, the welfare office can cover the costs.</p>

<h2>Short-term care without a care grade</h2>
<p>Short-term care is often needed before any care grade exists, for instance after surgery. Then the health insurer pays (${h.src('sgb5_39c', 'section 39c SGB V')}) within the same limits. If a care grade application is already under way, file it from the hospital: shorter assessment deadlines apply to hospital patients. See ${h.a('pflegegrad-beantragen', 'applying for a care grade')}.</p>

<h2>Allowance and services during the stay</h2>
<p>Half the allowance continues (${h.src('sgb11_37', 'section 37(2) SGB XI')}), ${h.eur(halb3.summe)} for three weeks at grade 3. Home care services pause. To plan the whole year, the ${h.a('verhinderungspflege', 'annual budget calculator')} shows what is left for respite cover after a short-term stay.</p>

<h2>When a short stay becomes a permanent place</h2>
<p>It often becomes clear during short-term care that going home is no longer realistic. The facility may then switch to long-term residential care, sometimes in the same building. From that day different rules apply: the fund pays the fixed amount under section 43 to the home, the supplement on the co-payment starts at 15 percent and the care allowance ends. The annual budget is no longer used. Confirm the switch in writing with the home and the fund so that the days are booked correctly, and ask for the co-payment that will apply from then on. The ${h.a('pflegeheim-kosten', 'care home calculator')} shows the typical figure for each state.</p>
<p>The stay can also make the return home possible. While your parent is in the facility there is time to apply for a stairlift or a walk-in shower, for which the fund pays up to ${h.eur(P.wohnumfeld.je_massnahme)} per measure, and to have aids such as a care bed delivered before discharge. Families who live far away often use exactly this window to organise a care service and a neighbour’s support, so the first days back are covered.</p>

<h2>Checklist for admission</h2>
<ol>
<li>Bring the care grade decision or application, medication plan, doctors’ letters and aids.</li>
<li>Ask for a cost breakdown: care part, board, lodging and investment costs separately.</li>
<li>Check with the fund how much of the annual budget is already used.</li>
<li>Claim board and lodging through the relief amount.</li>
<li>Use the stay to prepare the return home: order aids, apply for adaptations, find a care service, and agree who will be there on the first evening back.</li>
</ol>
`,
  },
});
