import { defineGuide } from '../../lib/guide-types';
import { jahr, tagespflege } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Grad 3, Familie pflegt, mit und ohne Tagespflege; Tage je Monat bei angenommenen Pflegesätzen. */
const TP = P.tagespflege;
const G = [2, 3, 4, 5] as const;
const ohne3 = jahr({ grad: 3, versorgung: 'angehoerige' });
const mit3 = jahr({ grad: 3, versorgung: 'angehoerige', tagespflegeGenutzt: true });
const tage = (g: 2 | 3 | 4 | 5, satz: number) => Math.floor(tagespflege(g) / satz);
const SAETZE = [70, 90, 110];
const E = P.entlastungsbetrag.monat;
/** Annahme für das Rechenbeispiel: zwei Tage pro Woche, 52 Wochen durch 12 Monate. */
const tageMonat2 = Math.round((2 * 52) / 12 * 10) / 10;

export default defineGuide({
  id: 'tagespflege',
  group: 'zuhause',
  order: 70,
  mini: 'tagespflege',
  related: ['entlastungsbetrag', 'pflegegeld', 'pflegesachleistung', 'kombinationsleistung', 'wohngruppenzuschlag', 'pflegegrad-demenz'],
  sources: ['sgb11_41', 'sgb11_45b', 'sgb11_45f', 'sgb11_28a', 'bmgLeistungen'],
  de: {
    slug: 'tagespflege',
    nav: 'Tagespflege',
    card: `Ein eigener Topf von ${DE.eur(TP['2'])} bis ${DE.eur(TP['5'])} im Monat, der weder Pflegegeld noch Sachleistung kürzt, mit Fahrdienst.`,
    title: 'Tagespflege 2026: eigenes Budget, Fahrdienst, Eigenanteil',
    description: `Tagespflege 2026: ${DE.eur(TP['2'])} bis ${DE.eur(TP['5'])} im Monat zusätzlich zum Pflegegeld, Fahrt inklusive. Wie viele Tage der Topf trägt, was der Entlastungsbetrag zahlt.`,
    h1: 'Tagespflege: tagsüber betreut, abends wieder zu Hause',
    intro: 'Ein Platz in einer Einrichtung für einige Tage in der Woche, abgeholt am Morgen, zurück am Nachmittag. Bezahlt aus einem Budget, das neben allen anderen Leistungen steht.',
    resume: `Tagespflege ist die Betreuung pflegebedürftiger Menschen in einer teilstationären Einrichtung während des Tages, während sie abends und nachts zu Hause leben; die Nachtpflege funktioniert umgekehrt (§ 41 SGB XI). Den Anspruch haben Pflegebedürftige ab Pflegegrad 2, wenn die Pflege zu Hause allein nicht reicht oder ergänzt und gestärkt werden soll. Die Pflegekasse zahlt 2026 im Monat bis ${DE.eur(TP['2'])} bei Pflegegrad 2, ${DE.eur(TP['3'])} bei Grad 3, ${DE.eur(TP['4'])} bei Grad 4 und ${DE.eur(TP['5'])} bei Grad 5. Dieser Topf kommt zusätzlich zu Pflegegeld, Sachleistung oder Kombinationsleistung und wird darauf nicht angerechnet. Er deckt die Pflege, die Betreuung, die Behandlungspflege in der Einrichtung und die Fahrt von der Wohnung zur Einrichtung und zurück. Verpflegung und Investitionskosten berechnet die Einrichtung gesondert; dafür kann der Entlastungsbetrag von ${DE.eur(E)} eingesetzt werden. Pflegt die Familie bei Pflegegrad 3, steigt das nutzbare Jahresvolumen mit Tagespflege von ${DE.eur(ohne3.jahrGesamt)} auf ${DE.eur(mit3.jahrGesamt)}.`,
    faqs: [
      { q: 'Wer bringt meine Mutter morgens in die Tagespflege?', a: 'Die notwendige Beförderung von der Wohnung zur Einrichtung und zurück ist Teil der Leistung (§ 41 Abs. 1 SGB XI). Die meisten Einrichtungen haben einen eigenen Fahrdienst oder beauftragen einen, und die Fahrtkosten laufen über das Tagespflegebudget. Fragen Sie bei der Anmeldung, zu welchen Zeiten abgeholt wird und ob der Fahrdienst beim Anziehen der Jacke und beim Treppensteigen hilft.' },
      { q: 'Bekommt man mit Pflegegrad 1 einen Platz in der Tagespflege?', a: `Einen eigenen Tagespflegetopf gibt es erst ab Pflegegrad 2. Bei Pflegegrad 1 kann der Entlastungsbetrag von ${DE.eur(E)} im Monat für Leistungen der Tagespflege eingesetzt werden (§ 45b Abs. 1 SGB XI). Das reicht je nach Tagessatz für einen oder zwei Tage im Monat. Ob die Einrichtung Gäste mit Pflegegrad 1 aufnimmt, entscheidet sie selbst.` },
      { q: 'Was kostet ein Tag in der Tagespflege die Familie?', a: 'Die Rechnung teilt sich in drei Teile: den Pflegesatz mit Betreuung und Fahrt, den die Kasse aus dem Budget zahlt, sowie Verpflegung und Investitionskosten, die bei der Familie bleiben. Die Höhe hängt von der Einrichtung und dem Land ab. Lassen Sie sich vor dem ersten Tag eine Aufstellung geben, in der diese Teile getrennt ausgewiesen sind, und rechnen Sie den Eigenanteil gegen den Entlastungsbetrag.' },
      { q: 'Gibt es Tagespflege auch in einer ambulant betreuten Wohngruppe?', a: 'Nur unter einer zusätzlichen Bedingung. Wer den Wohngruppenzuschlag bezieht, kann Tages- oder Nachtpflege daneben nur nutzen, wenn eine Prüfung des Medizinischen Dienstes zeigt, dass die Pflege in der Wohngruppe ohne teilstationäre Pflege nicht ausreicht (§ 45f Abs. 1 SGB XI). Ohne diesen Nachweis lehnt die Kasse die Tagespflege ab oder streicht den Zuschlag.' },
      { q: 'Lässt sich ein nicht genutzter Tagespflegebetrag in den nächsten Monat mitnehmen?', a: 'Nein. Das Gesetz bemisst den Anspruch je Kalendermonat (§ 41 Abs. 2 SGB XI), anders als beim Entlastungsbetrag gibt es keine Übertragung. Was im März wegen einer Grippe ungenutzt bleibt, ist verloren. Umgekehrt kann man in einem Monat mit mehr Bedarf zusätzliche Tage buchen, solange der Monatsbetrag reicht; darüber hinaus zahlt die Familie oder der Entlastungsbetrag springt ein.' },
      { q: 'Für wen ist die Nachtpflege gedacht?', a: 'Für Menschen, die tagsüber zu Hause zurechtkommen, nachts aber Betreuung brauchen, etwa bei Demenz mit nächtlicher Unruhe, wenn die pflegende Person sonst nicht mehr schlafen kann. Nachtpflege kommt aus demselben Budget nach § 41 SGB XI wie die Tagespflege. Einrichtungen mit Nachtpflege sind allerdings selten; der Pflegestützpunkt weiß, ob es in der Region ein Angebot gibt.' },
    ],
    body: (h) => `
<h2>Wie ein Tag in der Tagespflege abläuft</h2>
<p>Morgens holt der Fahrdienst ab, gegen acht oder neun Uhr. In der Einrichtung gibt es Frühstück, Bewegungsübungen, Gedächtnistraining, ein gemeinsames Mittagessen, Ruhezeit und am Nachmittag Kaffee, bevor es zurück nach Hause geht. Pflegekräfte helfen bei der Toilette, geben Medikamente und achten auf das Trinken. Für die Familie bedeutet das einen planbaren freien Tag: Die Tochter kann arbeiten, der Ehemann einkaufen oder einfach durchatmen.</p>
<p>Das Gesetz setzt zwei Voraussetzungen: mindestens Pflegegrad 2 und ein Bedarf, weil die Pflege zu Hause nicht ausreicht oder ergänzt und gestärkt werden soll (${h.src('sgb11_41', '§ 41 Abs. 1 SGB XI')}). Die zweite Bedingung ist weit gefasst: Es genügt, dass die Tagespflege die Pflege zu Hause stärkt, etwa weil sie die pflegende Person entlastet. Die Einrichtung muss einen Versorgungsvertrag mit den Pflegekassen haben.</p>

<h2>Der eigene Topf je Pflegegrad</h2>
${h.table(['Pflegegrad', 'Budget Tagespflege', ...SAETZE.map((s) => `Tage bei ${h.eur(s)} Pflegesatz`)],
  G.map((g) => [String(g), h.eur(TP[g]), ...SAETZE.map((s) => String(tage(g, s)))]),
  `Monatsbeträge nach § 41 Abs. 2 SGB XI; die Pflegesätze sind Annahmen, der echte Satz steht im Angebot der Einrichtung.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Wichtiger als die Höhe ist der Satz, der danach im Gesetz steht: Tages- und Nachtpflege können zusätzlich zu Sachleistung, Pflegegeld oder Kombinationsleistung genutzt werden, ohne dass etwas angerechnet wird (${h.src('sgb11_41', '§ 41 Abs. 3 SGB XI')}). Wer bei Pflegegrad 3 zweimal pro Woche geht, also im Mittel rund ${h.num(tageMonat2, 1)} Tage im Monat, bleibt bei einem Pflegesatz von ${h.eur(90)} mit ${h.eur(tageMonat2 * 90, 2)} deutlich unter dem Budget von ${h.eur(TP['3'])}, und das ${h.a('pflegegeld', 'Pflegegeld')} von ${h.eur(P.pflegegeld['3'])} läuft unverändert weiter.</p>

<h2>Was der Topf bezahlt und was nicht</h2>
${h.table(['Teil der Rechnung', 'Wer zahlt', 'Grundlage'], [
  ['Pflegebedingte Aufwendungen und Betreuung', 'Pflegekasse aus dem Tagespflegebudget', '§ 41 Abs. 2'],
  ['Medizinische Behandlungspflege in der Einrichtung', 'Pflegekasse aus dem Tagespflegebudget', '§ 41 Abs. 2'],
  ['Fahrt von der Wohnung und zurück', 'Pflegekasse aus dem Tagespflegebudget', '§ 41 Abs. 1'],
  ['Verpflegung', 'Familie, erstattungsfähig über den Entlastungsbetrag', '§ 45b Abs. 1'],
  ['Investitionskosten der Einrichtung', 'Familie, erstattungsfähig über den Entlastungsbetrag', '§ 45b Abs. 1'],
], 'Aufteilung einer typischen Tagespflegerechnung.', ['l', 'l', 'l'])}
<p>Die Einrichtung schickt der Pflegekasse die Rechnung für den Pflegeanteil direkt. Für Essen und Investitionskosten bekommt die Familie eine eigene Rechnung, deren Höhe je nach Haus und Land verschieden ist. Diese Rechnung kann beim ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} eingereicht werden, weil § 45b die Tages- und Nachtpflege ausdrücklich als Verwendungszweck nennt (${h.src('sgb11_45b', '§ 45b SGB XI')}). Viele Einrichtungen rechnen diesen Teil auf Wunsch direkt mit der Kasse ab, wenn eine Abtretungserklärung vorliegt.</p>
<!--mini:entlastungRest-->

<h2>Was die Tagespflege im Jahr ausmacht</h2>
<p>Eine Familie mit Pflegegrad 3, die nur Pflegegeld, Entlastungsbetrag, Pflegehilfsmittel und den Jahresbetrag für Vertretungen nutzt, kommt auf ${h.eur(ohne3.jahrGesamt)} im Jahr. Mit voll genutzter Tagespflege steigt dieser Rahmen auf ${h.eur(mit3.jahrGesamt)}, ohne dass ein Euro Pflegegeld verloren geht. Kaum eine andere Leistung hat dieses Verhältnis von Nutzen zu Aufwand. Trotzdem nutzen viele Haushalte sie nicht, weil sie glauben, die Tagespflege koste das Pflegegeld. Nach dem geltenden § 41 Abs. 3 ist das ausgeschlossen: Es gibt keine Anrechnung, weder auf das Geld noch auf den Pflegedienst.</p>
<p>Auch wer einen Pflegedienst nutzt, verliert nichts. Die ${h.a('pflegesachleistung', 'Sachleistung')} bleibt in voller Höhe für die Einsätze zu Hause, und die Tagespflege kommt obendrauf. Das ist besonders bei Pflegegrad 4 und 5 wichtig, wenn morgens und abends ein Dienst kommt und der Tag dazwischen betreut werden muss.</p>

<h2>Für wen sich die Tagespflege besonders lohnt</h2>
<p>Für Menschen mit ${h.a('pflegegrad-demenz', 'Demenz')}, die zu Hause unruhig werden, wenn sie den ganzen Tag allein sind, und denen eine feste Struktur hilft. Für Alleinlebende, deren Kinder arbeiten oder weit weg wohnen, weil die Einrichtung an diesen Tagen Essen, Medikamente und Gesellschaft sicherstellt. Und für pflegende Partner, die selbst gesundheitliche Probleme haben und Zeit für Arzttermine brauchen. Fragen Sie nach einem Probetag. Er zeigt schnell, ob die Atmosphäre passt, und nimmt der pflegebedürftigen Person die Angst vor dem Neuen.</p>

<h2>Monat für Monat planen</h2>
<p>Das Budget gilt je Kalendermonat. Es lässt sich weder ansparen noch in den Folgemonat schieben, und ein Monat mit Feiertagen, Krankheit oder Urlaub der Familie bringt weniger Tage. Wer die Tagespflege gut nutzen will, legt deshalb feste Wochentage fest und bucht in Monaten mit Lücken einen zusätzlichen Tag, solange der Betrag reicht. Liegt die Rechnung eines Monats über dem Budget, kommt der Rest aus dem Entlastungsbetrag oder aus der eigenen Tasche. Eine Übersicht über die Tage im laufenden Monat liefert die Einrichtung meist mit der Rechnung; ein Blick darauf zur Monatsmitte verhindert Überraschungen.</p>
<p>Für berufstätige Angehörige ist die Tagespflege oft das Bindeglied zwischen Arbeit und Pflege. Zusammen mit einem Pflegedienst am Morgen, der beim Waschen und Anziehen hilft, und einem Fahrdienst, der zur Einrichtung bringt, lässt sich ein Arbeitstag abdecken. Wer zusätzlich Zeit braucht, findet unter ${h.a('pflegezeit', 'Pflegezeit')} die Freistellungsmöglichkeiten im Beruf.</p>

<h2>Sonderfall Wohngruppe</h2>
<p>Wer in einer ambulant betreuten Wohngruppe lebt und den ${h.a('wohngruppenzuschlag', 'Wohngruppenzuschlag')} erhält, kann Tages- oder Nachtpflege nur nutzen, wenn eine Prüfung des Medizinischen Dienstes bestätigt, dass die Versorgung in der Wohngruppe ohne teilstationäre Pflege nicht ausreicht (${h.src('sgb11_45f', '§ 45f Abs. 1 SGB XI')}). Der Gesetzgeber will damit vermeiden, dass Wohngruppen den Tag regelmäßig in eine Einrichtung auslagern und trotzdem den Zuschlag erhalten.</p>

<h2>In vier Schritten zum Platz</h2>
<ol>
<li>Beim Pflegestützpunkt nach Tagespflegen in Reichweite des Fahrdienstes fragen und zwei oder drei anrufen.</li>
<li>Einen Schnuppertag vereinbaren und eine Kostenaufstellung mit Pflegesatz, Verpflegung und Investitionskosten verlangen.</li>
<li>Mit dem Mini-Rechner prüfen, wie viele Tage der Topf trägt, und die Anzahl der Tage pro Woche festlegen.</li>
<li>Den Eigenanteil über den Entlastungsbetrag abrechnen lassen und Reste aus dem Vorjahr vor dem 30. Juni einsetzen.</li>
</ol>
<p>Klären Sie vor dem ersten Tag mit der Pflegekasse, dass der Pflegegrad festgestellt ist und die Einrichtung einen Versorgungsvertrag hat. Solange der Bescheid aussteht, ist offen, ob die Kasse den Pflegesatz übernimmt, und die Familie trägt das Risiko.</p>
`,
  },
  en: {
    slug: 'day-care',
    nav: 'Day care',
    card: `A separate budget of ${EN.eur(TP['2'])} to ${EN.eur(TP['5'])} a month that cuts neither allowance nor services, with transport included.`,
    title: 'Tagespflege 2026: Day Care Budget, Transport, Own Share',
    description: `German day care (Tagespflege) 2026: ${EN.eur(TP['2'])} to ${EN.eur(TP['5'])} a month on top of the care allowance, transport included. How many days it covers and what the family pays.`,
    h1: 'Day care in Germany: looked after by day, home by evening',
    intro: 'A place in a day centre a few days a week, collected in the morning and brought back in the afternoon, paid from a budget that sits beside every other benefit.',
    resume: `Day care (Tagespflege) means that a person with a German care grade spends the day in a part-residential centre and lives at home in the evening and at night; night care works the other way round (section 41 of Book XI of the Social Code, SGB XI). It is available from care grade 2 when care at home is not enough on its own or needs supplementing. In 2026 the long-term care fund pays up to ${EN.eur(TP['2'])} a month at grade 2, ${EN.eur(TP['3'])} at grade 3, ${EN.eur(TP['4'])} at grade 4 and ${EN.eur(TP['5'])} at grade 5. This budget comes on top of the care allowance, the services budget or the combined benefit and is not deducted from them. It covers care, supervision, medical treatment care at the centre and transport between home and the centre. Meals and investment costs are billed separately; the relief amount of ${EN.eur(E)} can pay them. For a family caring at grade 3, the yearly total of usable benefits rises from ${EN.eur(ohne3.jahrGesamt)} to ${EN.eur(mit3.jahrGesamt)} with day care.`,
    faqs: [
      { q: 'Who takes my father to the day centre in the morning?', a: 'Transport from home to the centre and back is part of the benefit (section 41(1) SGB XI). Most centres run their own minibus or contract one, and the cost comes out of the day care budget. When registering, ask about pick-up times and whether the driver helps with coats and stairs. That detail matters if nobody is at home in the morning.' },
      { q: 'Can someone at care grade 1 attend a day centre?', a: `There is no separate day care budget below grade 2. At grade 1 the relief amount of ${EN.eur(E)} a month can be used for day care (section 45b(1) SGB XI), which covers one or two days a month depending on the rate. Whether a centre accepts guests at grade 1 is its own decision, so ask before you plan around it.` },
      { q: 'What does a day at a German day centre cost the family?', a: 'The bill has three parts: the care rate including supervision and transport, which the fund pays from the budget, and meals plus investment costs, which stay with the family. Amounts vary by centre and federal state. Ask for a written breakdown before the first day and set the family’s share against the relief amount, which covers exactly these items.' },
      { q: 'Is day care possible for someone living in a shared care flat?', a: 'Only with an extra condition. Anyone receiving the shared-flat supplement can use day or night care only if a Medical Service review shows that care in the flat is not sufficient without it (section 45f(1) SGB XI). Without that review the fund refuses day care or stops the supplement, so check before booking.' },
      { q: 'Does unused day care budget carry over to the next month?', a: 'No. The law sets the entitlement per calendar month (section 41(2) SGB XI) and, unlike the relief amount, nothing carries over. Budget left unused in March because of flu is lost. In a month with more need you can book extra days as long as the monthly amount lasts; beyond that the family pays or the relief amount steps in.' },
      { q: 'Who is night care meant for?', a: 'For people who manage at home during the day but need supervision at night, for example dementia with night-time restlessness that keeps the carer from sleeping. Night care uses the same section 41 budget as day care. Centres offering it are rare, so ask the local Pflegestützpunkt whether anything exists in the area before relying on it.' },
    ],
    body: (h) => `
<h2>What a day at the centre looks like</h2>
<p>The minibus collects in the morning, around eight or nine. At the centre there is breakfast, gentle exercise, memory games, a shared lunch, a rest and afternoon coffee before the trip home. Staff help with the toilet, give medication and make sure people drink enough. For the family that is a predictable free day: a daughter can work, a husband can shop or simply rest. For relatives abroad it also means that on those days someone trained sees your parent and would notice a change.</p>
<p>The law sets two conditions: at least grade 2, and a need because care at home is insufficient or should be supplemented and strengthened (${h.src('sgb11_41', 'section 41(1) SGB XI')}). The second condition is broad: it is enough that day care strengthens care at home, for instance by giving the carer a break. The centre must hold a contract with the care funds.</p>

<h2>A separate budget for each grade</h2>
${h.table(['Care grade', 'Day care budget', ...SAETZE.map((s) => `Days at a ${h.eur(s)} rate`)],
  G.map((g) => [String(g), h.eur(TP[g]), ...SAETZE.map((s) => String(tage(g, s)))]),
  `Monthly amounts under section 41(2) SGB XI; the daily rates are assumptions, the real one is in the centre’s offer.`, ['l', 'r', 'r', 'r', 'r'])}
<p>More important than the amount is the next sentence of the law: day and night care may be used in addition to services, allowance or the combined benefit without any deduction (${h.src('sgb11_41', 'section 41(3) SGB XI')}). Someone at grade 3 attending twice a week, about ${h.num(tageMonat2, 1)} days a month on average, stays well below the ${h.eur(TP['3'])} budget at a rate of ${h.eur(90)} with ${h.eur(tageMonat2 * 90, 2)}, and the ${h.a('pflegegeld', 'care allowance')} of ${h.eur(P.pflegegeld['3'])} continues unchanged.</p>

<h2>What the budget pays and what it does not</h2>
${h.table(['Part of the bill', 'Who pays', 'Basis'], [
  ['Care and supervision', 'care fund, from the day care budget', 'section 41(2)'],
  ['Medical treatment care at the centre', 'care fund, from the day care budget', 'section 41(2)'],
  ['Transport from home and back', 'care fund, from the day care budget', 'section 41(1)'],
  ['Meals', 'family, refundable from the relief amount', 'section 45b(1)'],
  ['Investment costs of the centre', 'family, refundable from the relief amount', 'section 45b(1)'],
], 'How a typical day care bill is split.', ['l', 'l', 'l'])}
<p>The centre bills the care part directly to the fund. Meals and investment costs come as a separate invoice to the family, at amounts that differ by centre and state. That invoice can be claimed from the ${h.a('entlastungsbetrag', 'relief amount')}, because section 45b names day and night care as a permitted use (${h.src('sgb11_45b', 'section 45b SGB XI')}). Many centres bill this part directly too if you sign an assignment form, so no money has to be advanced from abroad.</p>
<!--mini:entlastungRest-->

<h2>What day care adds over a year</h2>
<p>A family at grade 3 using only the allowance, the relief amount, consumable aids and the annual respite budget reaches ${h.eur(ohne3.jahrGesamt)} a year. With day care fully used, that rises to ${h.eur(mit3.jahrGesamt)} without losing a euro of allowance. Few benefits offer such a ratio of value to effort, yet many households skip it because they assume day care costs them the allowance. Under the current section 41(3) that cannot happen: nothing is deducted, neither from the money nor from the care service.</p>
<p>Families using a care service lose nothing either. The ${h.a('pflegesachleistung', 'services budget')} stays in full for visits at home and day care comes on top, which matters at grades 4 and 5 when a service comes morning and evening and the hours between need cover.</p>

<h2>Who benefits most</h2>
<p>People with ${h.a('pflegegrad-demenz', 'dementia')} who grow restless alone at home and are steadied by a fixed routine. People living alone whose children work or live far away, because on those days the centre takes care of meals, medication and company. And caring partners with health problems of their own who need time for appointments. Ask for a trial day, which quickly shows whether the atmosphere suits and takes away the fear of the unknown. If you are abroad, ask the centre whether staff can send a short message after the trial day; many are happy to.</p>

<h2>Planning month by month</h2>
<p>The budget applies per calendar month. It cannot be saved or moved to the next month, and a month with public holidays, illness or a family holiday brings fewer days. To use day care well, fix regular weekdays and add an extra day in months with gaps, as long as the amount lasts. If a month’s bill exceeds the budget, the remainder comes from the relief amount or the family. The centre usually lists the days with the bill; a look mid-month avoids surprises.</p>
<p>For working relatives day care is often what links a job with caring. Together with a care service in the morning for washing and dressing and the minibus to the centre, a full working day can be covered. If more time is needed, the ${h.a('pflegezeit', 'carers’ leave')} page explains the options for time off work.</p>

<h2>The shared-flat exception</h2>
<p>Anyone living in a shared care flat and receiving the ${h.a('wohngruppenzuschlag', 'shared-flat supplement')} can use day or night care only if a Medical Service review confirms that care in the flat is not sufficient without it (${h.src('sgb11_45f', 'section 45f(1) SGB XI')}). The rule stops shared flats from routinely sending residents to a centre while still drawing the supplement.</p>

<h2>Four steps to a place</h2>
<ol>
<li>Ask the Pflegestützpunkt for day centres within reach of a minibus route and call two or three.</li>
<li>Arrange a trial day and request a cost breakdown separating care rate, meals and investment costs.</li>
<li>Use the calculator to check how many days the budget covers and decide how many days a week.</li>
<li>Have the family’s share billed against the relief amount and use last year’s balance before 30 June.</li>
</ol>
<p>Before the first day, confirm with the care fund that the grade has been set and that the centre holds a contract with the funds. While the decision is pending it is open whether the fund pays the care rate, and the family carries that risk.</p>
`,
  },
});
