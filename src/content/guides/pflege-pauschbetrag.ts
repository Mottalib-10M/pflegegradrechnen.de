import { defineGuide } from '../../lib/guide-types';
import { pauschbetrag, ersparnis } from '../../lib/engine/angehoerige';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Pauschbetrag je Grad; zwei Geschwister bei Grad 4; Ersparnis bei 30 % Grenzsteuersatz (Annahme). */
const PB = P.pauschbetrag;
const zwei = pauschbetrag(4, 2);
const spar3 = ersparnis(pauschbetrag(3).voll, 0.3);
const pgJahr3 = P.pflegegeld['3'] * 12;

export default defineGuide({
  id: 'pflege-pauschbetrag',
  group: 'angehoerige',
  order: 20,
  mini: 'pauschbetrag',
  related: ['rente-pflegende-angehoerige', 'pflegegeld', 'pflegezeit', 'pflegegrad-4', 'pflegegrad-2', 'entlastungsbetrag'],
  sources: ['estg33b', 'estg3', 'sgb11_13'],
  de: {
    slug: 'pflege-pauschbetrag',
    nav: 'Pflege-Pauschbetrag',
    card: `${DE.eur(PB['2'])} bis ${DE.eur(PB['5'])} im Jahr für die Steuererklärung: wer den Pflege-Pauschbetrag bekommt und wann er entfällt.`,
    title: `Pflege-Pauschbetrag 2026: ${DE.eur(PB['2'])} bis ${DE.eur(PB['5'])} in der Steuer`,
    description: `Pflege-Pauschbetrag 2026: ${DE.eur(PB['2'])} bei Pflegegrad 2, ${DE.eur(PB['3'])} bei Grad 3, ${DE.eur(PB['4'])} bei Grad 4 und 5 nach § 33b EStG. Bedingungen, Teilung und das Pflegegeld.`,
    h1: 'Pflege-Pauschbetrag: was pflegende Angehörige absetzen können',
    intro: 'Wer einen Menschen zu Hause unentgeltlich pflegt, kann einen festen Betrag von der Steuer abziehen, ohne Belege. Die Bedingungen und die Falle mit dem weitergegebenen Pflegegeld.',
    resume: `Pflegende Angehörige können in der Einkommensteuererklärung einen Pflege-Pauschbetrag geltend machen, ohne einzelne Kosten nachzuweisen (§ 33b Abs. 6 EStG). Er beträgt ${DE.eur(PB['2'])} im Jahr bei Pflegegrad 2, ${DE.eur(PB['3'])} bei Pflegegrad 3 und ${DE.eur(PB['4'])} bei Pflegegrad 4 oder 5; denselben Höchstbetrag gibt es, wenn die gepflegte Person als hilflos gilt (Merkzeichen H). Voraussetzung ist, dass die Pflegeperson für die Pflege keine Einnahmen erhält und die Pflege persönlich in ihrer eigenen Wohnung oder der der gepflegten Person leistet, in einem Staat der EU oder des EWR. Wechselt der Pflegegrad im Lauf des Jahres, zählt der höchste. Pflegen mehrere Personen, wird der Betrag durch ihre Zahl geteilt: Zwei Geschwister bei Pflegegrad 4 erhalten je ${DE.eur(zwei.jePerson)}. Die Steuer-Identifikationsnummer der gepflegten Person muss in der Erklärung stehen. Wer das Pflegegeld weitergeleitet bekommt, verliert den Pauschbetrag, weil das als Einnahme zählt; Ausnahme ist das Pflegegeld, das Eltern für ihr Kind mit Behinderung erhalten.`,
    faqs: [
      { q: 'Verliere ich den Pflege-Pauschbetrag, wenn meine Mutter mir ihr Pflegegeld gibt?', a: `In der Regel ja. Das weitergeleitete Pflegegeld gilt als Einnahme für die Pflege, und dann entfällt der Pauschbetrag (§ 33b Abs. 6 EStG). Das Geld selbst ist für Sie steuerfrei. Bei Pflegegrad 3 stehen also ${DE.eur(pgJahr3)} steuerfreies Pflegegeld im Jahr gegen einen Pauschbetrag von ${DE.eur(PB['3'])}, der bei 30 Prozent Steuersatz rund ${DE.eur(spar3)} spart.` },
      { q: 'Kann ich den Pflege-Pauschbetrag nutzen, wenn ich meinen Vater im Ausland pflege?', a: 'Ja, wenn die Pflege in Ihrer Wohnung oder in der Wohnung Ihres Vaters stattfindet und diese in einem Mitgliedstaat der EU oder des Europäischen Wirtschaftsraums liegt. Außerhalb dieser Staaten ist der Pauschbetrag ausgeschlossen. Sie müssen in Deutschland einkommensteuerpflichtig sein und die Identifikationsnummer des Vaters angeben.' },
      { q: 'Gibt es den Pauschbetrag auch bei Pflegegrad 1?', a: 'Nein. Der Pflege-Pauschbetrag beginnt erst bei Pflegegrad 2, außer die gepflegte Person ist hilflos im Sinne des § 33b Abs. 3 EStG; dann gibt es den Höchstbetrag unabhängig vom Pflegegrad. Wer höhere tatsächliche Kosten hat, kann stattdessen außergewöhnliche Belastungen nach § 33 EStG mit Belegen geltend machen, abzüglich der zumutbaren Belastung.' },
      { q: 'Zählt die Pflege im Pflegeheim für den Pauschbetrag?', a: 'Nein. Der Pflege-Pauschbetrag setzt voraus, dass die Pflege in Ihrer eigenen Wohnung oder in der Wohnung der gepflegten Person stattfindet. Besuche im Heim, Wäsche oder Begleitung zu Ärzten reichen nicht aus, auch wenn sie viel Zeit kosten. Pflegen Sie aber regelmäßig an Wochenenden zu Hause, etwa wenn der Vater aus der Tagespflege zu Ihnen kommt, kann der Betrag wieder in Betracht kommen.' },
      { q: 'Wie wird der Pauschbetrag unter Geschwistern geteilt?', a: `Durch die Zahl der Pflegepersonen, bei denen die Voraussetzungen vorliegen, unabhängig davon, wer wie viel pflegt. Zwei Geschwister bei Pflegegrad 4 bekommen je ${DE.eur(zwei.jePerson)}, drei je ${DE.eur(pauschbetrag(4, 3).jePerson)}. Wer Pflegegeld weitergeleitet bekommt, zählt bei der Teilung nicht mit, wenn bei ihm die Voraussetzungen fehlen.` },
    ],
    body: (h) => `
<h2>Die Beträge 2026</h2>
${h.table(['Pflegegrad', 'Pflege-Pauschbetrag', 'bei 2 Pflegepersonen je', 'Ersparnis bei 30 % (Annahme)'], [
  ['1', '–', '–', '–'],
  ...(['2', '3', '4', '5'] as const).map((g) => [g, h.eur(PB[g]), h.eur(PB[g] / 2), h.eur(ersparnis(PB[g], 0.3))]),
  ['hilflos (Merkzeichen H)', h.eur(PB['5']), h.eur(PB['5'] / 2), h.eur(ersparnis(PB['5'], 0.3))],
], 'Pauschbeträge nach § 33b Abs. 6 EStG; die Ersparnis hängt vom persönlichen Grenzsteuersatz ab.', ['l', 'r', 'r', 'r'])}
<p>Der Pauschbetrag wird vom zu versteuernden Einkommen abgezogen, nicht von der Steuer. Was er wirklich bringt, hängt deshalb vom eigenen Grenzsteuersatz ab: bei einem Satz von 30 Prozent sind es bei Pflegegrad 3 rund ${h.eur(spar3)} im Jahr. Wer wenig verdient, profitiert wenig; wer keine Steuern zahlt, gar nicht. Der Mini-Rechner oben rechnet mit Ihrem Satz.</p>

<h2>Die Bedingungen im Einzelnen</h2>
<ul>
<li><strong>Keine Einnahmen für die Pflege.</strong> Wer Geld für die Pflege erhält, etwa das weitergeleitete Pflegegeld, verliert den Pauschbetrag (${h.src('estg33b', '§ 33b Abs. 6 Satz 1 EStG')}). Das Pflegegeld, das Eltern für ihr Kind mit Behinderung bekommen, zählt nicht als Einnahme.</li>
<li><strong>Persönliche Pflege.</strong> Sie müssen selbst pflegen, nicht nur organisieren oder bezahlen. Ein Pflegedienst, der zusätzlich kommt, schadet nicht.</li>
<li><strong>Ort der Pflege.</strong> In Ihrer Wohnung oder der der gepflegten Person, in der EU oder im EWR. Pflege in einem Heim zählt nicht.</li>
<li><strong>Pflegegrad ab 2 oder hilflos.</strong> Maßgeblich ist der höchste Grad, der im Kalenderjahr festgestellt war.</li>
<li><strong>Identifikationsnummer.</strong> Die Steuer-ID der gepflegten Person gehört in die Erklärung, sonst wird der Betrag nicht gewährt.</li>
</ul>

<h2>Pflegegeld oder Pauschbetrag?</h2>
<p>Die Entscheidung ist oft einfacher, als sie scheint. Das Pflegegeld bleibt beim Empfänger steuerfrei, bis zur Höhe des Pflegegeldes (${h.src('estg3', '§ 3 Nr. 36 EStG')}), und zählt bei Sozialleistungen nicht als Einkommen. Bei Pflegegrad 3 sind das ${h.eur(pgJahr3)} im Jahr, während der Pauschbetrag von ${h.eur(PB['3'])} nur die Steuerlast senkt. Rechnerisch gewinnt das weitergeleitete Pflegegeld fast immer. Der Pauschbetrag ist vor allem für diejenigen interessant, die bewusst kein Geld annehmen, etwa weil das Pflegegeld beim Elternteil bleibt, um Hilfen zu bezahlen, oder für Geschwister, die mitpflegen, während ein anderes das Pflegegeld erhält.</p>
<!--mini:pflegegeldTage-->

<h2>So kommt der Pauschbetrag in die Erklärung</h2>
<p>Der Pflege-Pauschbetrag wird in der Anlage für außergewöhnliche Belastungen eingetragen: Name und Identifikationsnummer der gepflegten Person, der Pflegegrad oder das Merkzeichen H, ob die Pflege in der eigenen Wohnung oder in der Wohnung der gepflegten Person stattfand, und ob weitere Personen gepflegt haben. Einen Bescheid der Pflegekasse müssen Sie nicht beilegen, sollten ihn aber aufbewahren, weil das Finanzamt nachfragen kann. Der Betrag gilt für das ganze Kalenderjahr, auch wenn der Pflegegrad erst im Herbst festgestellt wurde; er wird nicht nach Monaten gekürzt. Wer mehrere Jahre nicht daran gedacht hat, kann den Pauschbetrag in vielen Fällen mit einer Erklärung für zurückliegende Jahre nachholen, solange die Festsetzungsfrist noch läuft.</p>

<h2>Drei Familien</h2>
<p><strong>Eine Tochter pflegt ihre Mutter mit Pflegegrad 4</strong>, das Pflegegeld bleibt auf dem Konto der Mutter und bezahlt eine Haushaltshilfe. Die Tochter erhält nichts für die Pflege und setzt ${h.eur(PB['4'])} an.</p>
<p><strong>Zwei Brüder pflegen ihren Vater mit Pflegegrad 3</strong> abwechselnd, keiner bekommt Geld. Jeder setzt die Hälfte an, also ${h.eur(PB['3'] / 2)}.</p>
<p><strong>Ein Ehemann pflegt seine Frau mit Pflegegrad 2</strong>, das Pflegegeld landet auf dem gemeinsamen Konto. Ob das als Einnahme des Mannes gilt, hängt davon ab, ob das Geld ihm für die Pflege zugewendet wird; bei Ehepaaren mit gemeinsamer Kasse ist das eine Einzelfallfrage, die das Finanzamt beurteilt. Wer sichergehen will, lässt das Pflegegeld auf dem Konto der gepflegten Person und verwendet es erkennbar für ihre Versorgung.</p>

<h2>Mehrere Pflegepersonen</h2>
<p>Teilen sich mehrere Angehörige die Pflege, wird der Pauschbetrag durch die Zahl der Personen geteilt, die die Voraussetzungen erfüllen (§ 33b Abs. 6 Satz 9 EStG). Erhält eine Schwester das Pflegegeld und pflegt der Bruder ohne Bezahlung mit, hat nur der Bruder Anspruch, und er bekommt dann den vollen Betrag. Pflegt jemand zwei Personen, etwa beide Eltern, kann er den Pauschbetrag zweimal ansetzen.</p>

<h2>Was daneben möglich ist</h2>
<p>Die gepflegte Person selbst kann einen Behinderten-Pauschbetrag haben, wenn ein Grad der Behinderung festgestellt ist; er steht ihr zu, nicht der Pflegeperson. Wer tatsächlich hohe Kosten trägt, kann statt des Pauschbetrags außergewöhnliche Belastungen nach § 33 EStG geltend machen. Für die Rente zählt die Pflege unabhängig von der Steuer: Die Pflegekasse zahlt ab Pflegegrad 2 Beiträge, wenn die Voraussetzungen erfüllt sind (${h.a('rente-pflegende-angehoerige', 'Rentenrechner')}).</p>
`,
  },
  en: {
    slug: 'carers-tax-lump-sum',
    nav: 'Carer’s tax lump sum',
    card: `${EN.eur(PB['2'])} to ${EN.eur(PB['5'])} a year off your German tax: who gets the carer’s lump sum and when it is lost.`,
    title: 'Pflege-Pauschbetrag 2026: German Carer’s Tax Lump Sum',
    description: `German carer’s tax lump sum (Pflege-Pauschbetrag) 2026: ${EN.eur(PB['2'])} at grade 2, ${EN.eur(PB['3'])} at grade 3, ${EN.eur(PB['4'])} at grades 4 and 5. Conditions, sharing and allowance.`,
    h1: 'The German carer’s tax lump sum explained',
    intro: 'If you care for someone at home without pay, you can deduct a fixed amount on your German tax return with no receipts. The conditions, and the catch with passed-on care allowance.',
    resume: `Family carers who pay income tax in Germany can claim a carer’s lump sum (Pflege-Pauschbetrag) on their tax return without proving individual costs (section 33b(6) of the Income Tax Act). It is ${EN.eur(PB['2'])} a year at care grade 2, ${EN.eur(PB['3'])} at grade 3 and ${EN.eur(PB['4'])} at grades 4 or 5; the maximum also applies if the person cared for is officially helpless (marker H). The carer must receive no income for the care and must care personally in their own home or the home of the person cared for, located in the EU or the European Economic Area. If the grade changes during the year, the highest counts. If several people care, the amount is divided by their number: two siblings at grade 4 get ${EN.eur(zwei.jePerson)} each. The tax identification number of the person cared for must be stated. Receiving the passed-on care allowance counts as income and rules out the lump sum, except for allowance that parents receive for a disabled child.`,
    faqs: [
      { q: 'Do I lose the lump sum if my mother passes her care allowance to me?', a: `Usually yes. Passed-on allowance counts as income for the care, so the lump sum is lost (section 33b(6) Income Tax Act). The money itself is tax-free for you. At grade 3 that means ${EN.eur(pgJahr3)} of tax-free allowance a year against a lump sum of ${EN.eur(PB['3'])}, worth roughly ${EN.eur(spar3)} at a 30 percent tax rate.` },
      { q: 'Can I claim it if I care for my father in another EU country?', a: 'Yes, if the care takes place in your home or your father’s, in an EU or EEA state, and you are liable to German income tax. Outside those states the lump sum is excluded. You must state your father’s German tax identification number; if he has never had one, ask the tax office how to proceed.' },
      { q: 'Is there a lump sum at care grade 1?', a: 'No. It starts at grade 2, unless the person cared for is officially helpless under section 33b(3) Income Tax Act, which brings the maximum regardless of grade. If your actual costs are higher, you can instead claim them as extraordinary expenses under section 33 with receipts, minus a reasonable own share.' },
      { q: 'How do siblings share the lump sum?', a: `It is divided by the number of carers who meet the conditions, regardless of how much each one does. Two siblings at grade 4 get ${EN.eur(zwei.jePerson)} each, three get ${EN.eur(pauschbetrag(4, 3).jePerson)}. A sibling who receives the passed-on allowance does not count in the division if the conditions are not met for them.` },
    ],
    body: (h) => `
<h2>Amounts for 2026</h2>
${h.table(['Care grade', 'Lump sum', 'each, with 2 carers', 'Tax saved at 30% (assumption)'], [
  ['1', '–', '–', '–'],
  ...(['2', '3', '4', '5'] as const).map((g) => [g, h.eur(PB[g]), h.eur(PB[g] / 2), h.eur(ersparnis(PB[g], 0.3))]),
  ['helpless (marker H)', h.eur(PB['5']), h.eur(PB['5'] / 2), h.eur(ersparnis(PB['5'], 0.3))],
], 'Lump sums under section 33b(6) Income Tax Act; the saving depends on your marginal tax rate.', ['l', 'r', 'r', 'r'])}
<p>The lump sum reduces taxable income, not the tax itself, so its value depends on your marginal rate: at 30 percent it is about ${h.eur(spar3)} a year at grade 3. Low earners gain little; someone who pays no German tax gains nothing. The mini calculator above uses your rate.</p>

<h2>The conditions in detail</h2>
<ul>
<li><strong>No income for caring.</strong> Anyone paid for caring, for example with passed-on allowance, loses the lump sum (${h.src('estg33b', 'section 33b(6) sentence 1')}). Allowance that parents receive for a disabled child does not count as income.</li>
<li><strong>Personal care.</strong> You must provide care yourself, not just organise or pay for it. An additional care service does no harm.</li>
<li><strong>Place of care.</strong> Your home or that of the person cared for, in the EU or EEA. Care in a care home does not count.</li>
<li><strong>Grade 2 or higher, or helpless.</strong> The highest grade assessed during the calendar year applies.</li>
<li><strong>Tax ID.</strong> The tax identification number of the person cared for must appear on the return.</li>
</ul>

<h2>Allowance or lump sum?</h2>
<p>The choice is usually simple. Passed-on allowance stays tax-free for the recipient up to the allowance amount (${h.src('estg3', 'section 3 no. 36 Income Tax Act')}) and does not count as income for benefits. At grade 3 that is ${h.eur(pgJahr3)} a year, while the ${h.eur(PB['3'])} lump sum only reduces tax. Arithmetically the allowance almost always wins. The lump sum mainly helps carers who deliberately take no money, for instance because the allowance stays with the parent to pay for help, or a sibling who helps while another receives the allowance. For carers living abroad but taxed in Germany, it is often the only tax relief available.</p>
<!--mini:pflegegeldTage-->

<h2>How to enter it on the tax return</h2>
<p>The lump sum goes on the annex for extraordinary expenses (Anlage Außergewöhnliche Belastungen): name and tax ID of the person cared for, the care grade or marker H, whether care took place in your home or theirs, and whether others also cared. You need not attach the care fund’s decision but should keep it, as the tax office may ask. The amount applies to the whole calendar year even if the grade was only assessed in the autumn; it is not reduced by month. Carers who forgot it in earlier years can often still claim it with a return for those years while the assessment period is open.</p>

<h2>Three families</h2>
<p><strong>A daughter cares for her mother at grade 4</strong>; the allowance stays in the mother’s account and pays a household helper. The daughter receives nothing for caring and claims ${h.eur(PB['4'])}.</p>
<p><strong>Two brothers take turns caring for their father at grade 3</strong>, neither paid. Each claims half, ${h.eur(PB['3'] / 2)}. One of them lives abroad but is still taxed in Germany through German rental income; he can claim his share as long as the care took place in an EU or EEA home.</p>
<p><strong>A husband cares for his wife at grade 2</strong>, and the allowance lands in their joint account. Whether that counts as his income depends on whether the money is given to him for caring; for couples with shared finances the tax office decides case by case. To be safe, keep the allowance in the wife’s account and use it visibly for her care.</p>

<h2>Several carers</h2>
<p>If several relatives share the care, the lump sum is divided by the number who meet the conditions (section 33b(6) sentence 9). If a sister receives the allowance and a brother cares unpaid, only the brother qualifies and gets the full amount. Someone caring for two people, such as both parents, can claim it twice.</p>

<h2>What else is possible</h2>
<p>The person cared for may have their own disability lump sum if a degree of disability has been assessed; it belongs to them, not the carer. Carers with high actual costs can claim extraordinary expenses under section 33 instead. For pension purposes caring counts regardless of tax: the fund pays contributions from grade 2 if the conditions are met (${h.a('rente-pflegende-angehoerige', 'carer pension calculator')}).</p>
`,
  },
});
