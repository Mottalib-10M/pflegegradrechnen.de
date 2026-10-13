import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, rangliste, LAENDER } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Hessen: stärkster Anstieg des Pflegeanteils aller Länder zwischen Januar und Juli 2026. */
const k = kosten('HE'), v = kosten('HE', 'vorher'), b = kosten('BUND'), rp = kosten('RP');
const j = [1, 13, 25, 37].map((m) => heimMonat(k, m));
const anstieg = k.eee - v.eee;
const rangAnstieg = [...LAENDER].sort((x, y) => (kosten(y).eee - kosten(y, 'vorher').eee) - (kosten(x).eee - kosten(x, 'vorher').eee)).indexOf('HE') + 1;
const platz = rangliste().indexOf('HE') + 1;
const jahrMehr = (k.mit15 - v.mit15) * 12;

export default defineGuide({
  id: 'pflegeheim-kosten-hessen',
  group: 'land',
  order: 70,
  tool: 'heim',
  toolPreset: { land: 'HE' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-rheinland-pfalz', 'pflegeheim-kosten-baden-wuerttemberg', 'hilfe-zur-pflege', 'pflegereform-2027'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'bmgPnogPm'],
  de: {
    slug: 'pflegeheim-kosten-hessen',
    nav: 'Hessen',
    card: `Kein Land mit stärkerem Anstieg des Pflegeanteils seit Januar: ${DE.eur(anstieg)} mehr, ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr.`,
    title: 'Pflegeheim Kosten Hessen 2026: Eigenanteil nach Heimjahren',
    description: `Pflegeheim in Hessen 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten (vdek, 1.7.2026); Pflegeanteil seit Januar um ${DE.eur(anstieg)} gestiegen, Höchstwert.`,
    h1: 'Pflegeheim in Hessen: der steilste Anstieg des Jahres',
    intro: 'Kein Land hat beim Pflegeanteil im ersten Halbjahr 2026 so stark zugelegt wie Hessen. Was das im Jahr ausmacht und wie es mit den Heimjahren weitergeht.',
    resume: `In Hessen ist der Pflegeanteil im Pflegeheim zwischen dem 1. Januar und dem 1. Juli 2026 um ${DE.eur(anstieg)} im Monat gestiegen, von ${DE.eur(v.eee)} auf ${DE.eur(k.eee)}, so die beiden Auswertungen des vdek. Das ist der stärkste Anstieg aller Länder (Rang ${rangAnstieg}). Der Eigenanteil im ersten Aufenthaltsjahr liegt nun bei ${DE.eur(k.mit15)} im Monat, Rang ${platz} unter den 16 Ländern; aufs Jahr gerechnet zahlen neue Bewohner damit rund ${DE.eur(jahrMehr)} mehr als noch im Januar. Unterkunft und Verpflegung kosten ${DE.eur(k.uv)}, die Investitionskosten ${DE.eur(k.invest)}, beides etwa im Bundesschnitt. Mit dem steigenden Leistungszuschlag der Pflegekasse sinkt der Eigenanteil auf ${DE.eur(j[1].eigenanteil)} im zweiten, ${DE.eur(j[2].eigenanteil)} im dritten und ${DE.eur(j[3].eigenanteil)} ab dem vierten Jahr. Im benachbarten Rheinland-Pfalz liegt der Pflegeanteil mit ${DE.eur(rp.eee)} deutlich niedriger, Unterkunft und Verpflegung aber höher.`,
    faqs: [
      { q: 'Wie viel mehr zahlen Heimbewohner in Hessen seit Januar 2026?', a: `Im ersten Aufenthaltsjahr ${DE.eur(k.mit15 - v.mit15)} im Monat, also rund ${DE.eur(jahrMehr)} im Jahr. Wer schon länger im Heim lebt, spürt weniger, weil der höhere Zuschlag einen größeren Teil des Pflegeanteils abfängt: ab dem vierten Jahr ${DE.eur(heimMonat(k, 37).eigenanteil - heimMonat(v, 37).eigenanteil)} im Monat mehr.` },
      { q: 'Ist Rheinland-Pfalz für Familien aus Hessen günstiger?', a: `Im ersten Jahr ja, um ${DE.eur(k.mit15 - rp.mit15)} im Monat. Ab dem vierten Jahr kehrt sich das um: Rheinland-Pfalz hat hohe Kosten für Unterkunft und Verpflegung, die nicht bezuschusst werden, und liegt dann bei ${DE.eur(heimMonat(rp, 37).eigenanteil)}, Hessen bei ${DE.eur(j[3].eigenanteil)}. Wer mit einem langen Aufenthalt rechnet, gewinnt mit dem Wechsel wenig.` },
      { q: 'Wird die Pflegereform den Anstieg bremsen?', a: 'Das Bundeskabinett hat am 30. September 2026 den Entwurf eines Pflegeneuordnungsgesetzes beschlossen. Ob und wie er die Eigenanteile im Heim begrenzt, entscheidet erst das parlamentarische Verfahren. Bis dahin gelten die Zuschläge nach § 43c SGB XI, mit denen dieser Rechner rechnet.' },
    ],
    body: (h) => `
<h2>Hessen im Halbjahresvergleich</h2>
${h.table(['', 'Hessen Jan. 2026', 'Hessen Juli 2026', 'Rheinland-Pfalz Juli 2026', 'Bund Juli 2026'], [
  ['Pflegeanteil (EEE)', h.eur(v.eee), h.eur(k.eee), h.eur(rp.eee), h.eur(b.eee)],
  ['Unterkunft und Verpflegung', h.eur(v.uv), h.eur(k.uv), h.eur(rp.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(v.invest), h.eur(k.invest), h.eur(rp.invest), h.eur(b.invest)],
  ['1. Jahr', h.eur(v.mit15), h.eur(k.mit15), h.eur(rp.mit15), h.eur(b.mit15)],
  ['ab 4. Jahr', h.eur(heimMonat(v, 37).eigenanteil), h.eur(j[3].eigenanteil), h.eur(heimMonat(rp, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, Durchschnitt der Heime.', ['l', 'r', 'r', 'r', 'r'])}
<p>Zwei Lehren aus der Tabelle. Erstens wirkt ein Anstieg des Pflegeanteils am stärksten auf neue Bewohner, weil der Zuschlag im ersten Jahr nur 15 Prozent abfängt. Zweitens ist der Vergleich mit dem Nachbarland nur eine Momentaufnahme: Welches Land günstiger ist, hängt davon ab, wie lange jemand im Heim lebt.</p>
<p>Für Familien, die das Ersparte planen, empfiehlt sich deshalb, den Rechner mit dem tatsächlichen Einzugsmonat zu füttern und nicht mit dem Landesdurchschnitt allein. Liegt der Eigenanteil dauerhaft über Rente und Vermögen, kommt die ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')} in Betracht. Wie der Reformentwurf einzuordnen ist, steht unter ${h.a('pflegereform-2027', 'Pflegereform')}.</p>
<h2>Was der Anstieg für das Ersparte bedeutet</h2>
<p>Ein Beispiel: Eine Bewohnerin mit ${h.eur(1700)} Rente und ${h.eur(50000)} Erspartem zieht im Juli 2026 in ein hessisches Heim mit Durchschnittspreisen. Die Lücke im ersten Monat beträgt ${h.eur(k.mit15 - 1700)}. Mit den Januarpreisen wären es ${h.eur(v.mit15 - 1700)} gewesen. Über ein Jahr frisst der Anstieg also mehrere tausend Euro zusätzlich vom Vermögen, das bis auf den Schonbetrag von ${h.eur(P.sozialhilfe.schonvermoegen)} aufgebraucht werden muss, bevor das Sozialamt einspringt. Der Rechner oben zeigt die genaue Reichweite mit Ihren Zahlen.</p>
`,
  },
  en: {
    slug: 'care-home-costs-hesse',
    nav: 'Hesse',
    card: `No state saw a steeper rise in the care part since January: ${EN.eur(anstieg)} more, ${EN.eur(k.mit15)} co-payment in year one.`,
    title: 'Care Home Costs Hesse 2026: Co-payment by Year of Stay',
    description: `Care home in Hesse 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j[3].eigenanteil)} from year four (vdek, 1 July 2026); the care part rose ${EN.eur(anstieg)} since January, the most of any state.`,
    h1: 'Care homes in Hesse: the steepest rise of the year',
    intro: 'No state’s care part grew as much in the first half of 2026 as Hesse’s. What it means over a year and how the co-payment develops with each year of stay.',
    resume: `In Hesse the care part of care home costs rose by ${EN.eur(anstieg)} a month between 1 January and 1 July 2026, from ${EN.eur(v.eee)} to ${EN.eur(k.eee)}, according to the two vdek analyses. That is the steepest increase of all German states (rank ${rangAnstieg}). The first-year co-payment is now ${EN.eur(k.mit15)} a month, rank ${platz} of 16; over a year new residents pay about ${EN.eur(jahrMehr)} more than in January. Board and lodging cost ${EN.eur(k.uv)} and investment costs ${EN.eur(k.invest)}, both roughly at the national average. With the care fund’s rising supplement the co-payment falls to ${EN.eur(j[1].eigenanteil)} in year two, ${EN.eur(j[2].eigenanteil)} in year three and ${EN.eur(j[3].eigenanteil)} from year four. In neighbouring Rhineland-Palatinate the care part is much lower at ${EN.eur(rp.eee)}, but board and lodging are higher.`,
    faqs: [
      { q: 'How much more do Hesse care home residents pay since January 2026?', a: `In the first year of residence, ${EN.eur(k.mit15 - v.mit15)} a month, about ${EN.eur(jahrMehr)} a year. Long-term residents feel less, because the higher supplement absorbs more of the care part: from year four it is ${EN.eur(heimMonat(k, 37).eigenanteil - heimMonat(v, 37).eigenanteil)} a month more than under the January rates.` },
      { q: 'Is Rhineland-Palatinate cheaper for families from Hesse?', a: `In year one, yes, by ${EN.eur(k.mit15 - rp.mit15)} a month. From year four it reverses: Rhineland-Palatinate has high board and lodging costs that are never subsidised and reaches ${EN.eur(heimMonat(rp, 37).eigenanteil)}, Hesse ${EN.eur(j[3].eigenanteil)}. For a long stay, moving to the neighbouring state therefore gains very little.` },
      { q: 'Will the planned care reform slow the rise?', a: 'The federal cabinet adopted the draft Care Reorganisation Act on 30 September 2026. Whether and how it caps care home co-payments will only be decided in parliament. Until then the supplements under section 43c SGB XI apply, and those are what this calculator uses.' },
    ],
    body: (h) => `
<h2>Hesse over six months</h2>
${h.table(['', 'Hesse Jan 2026', 'Hesse Jul 2026', 'Rhineland-Palatinate Jul 2026', 'Germany Jul 2026'], [
  ['Care co-payment (EEE)', h.eur(v.eee), h.eur(k.eee), h.eur(rp.eee), h.eur(b.eee)],
  ['Board and lodging', h.eur(v.uv), h.eur(k.uv), h.eur(rp.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(v.invest), h.eur(k.invest), h.eur(rp.invest), h.eur(b.invest)],
  ['Year 1', h.eur(v.mit15), h.eur(k.mit15), h.eur(rp.mit15), h.eur(b.mit15)],
  ['From year 4', h.eur(heimMonat(v, 37).eigenanteil), h.eur(j[3].eigenanteil), h.eur(heimMonat(rp, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, average across homes.', ['l', 'r', 'r', 'r', 'r'])}
<p>Two lessons from the table. A rise in the care part hits new residents hardest, because the supplement absorbs only 15 percent in year one. And comparing with a neighbouring state is only a snapshot: which state is cheaper depends on how long someone stays.</p>
<p>Families planning savings should therefore feed the calculator the actual month of moving in, not just the state average. If the co-payment exceeds pension and savings for good, ${h.a('hilfe-zur-pflege', 'social assistance for care')} can help. See ${h.a('pflegereform-2027', 'the care reform')} for the status of the draft.</p>
<h2>What the rise means for savings</h2>
<p>An example: a resident with a ${h.eur(1700)} pension and ${h.eur(50000)} of savings moves into an average-priced home in Hesse in July 2026. The gap in the first month is ${h.eur(k.mit15 - 1700)}; at January prices it would have been ${h.eur(v.mit15 - 1700)}. Over a year the rise eats several thousand euros more of savings, which must be used down to the protected ${h.eur(P.sozialhilfe.schonvermoegen)} before the welfare office steps in. The calculator above shows the exact run-down with your own figures, which is useful for relatives abroad who manage a parent’s finances from a distance.</p>
`,
  },
});
