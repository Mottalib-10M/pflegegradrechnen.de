import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, rangliste, LAENDER } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Saarland: höchste Ausbildungsumlage Deutschlands, stärkster Anstieg der Investitionskosten im Halbjahr. */
const k = kosten('SL'), v = kosten('SL', 'vorher'), b = kosten('BUND'), rp = kosten('RP');
const j4 = heimMonat(k, 37);
const platz = rangliste().indexOf('SL') + 1;
const investPlus = k.invest - v.invest;
const investRang = [...LAENDER].sort((x, y) => (kosten(y).invest - kosten(y, 'vorher').invest) - (kosten(x).invest - kosten(x, 'vorher').invest)).indexOf('SL') + 1;
const ausbJahr = k.ausbildung * 12;

export default defineGuide({
  id: 'pflegeheim-kosten-saarland',
  group: 'land',
  order: 120,
  tool: 'heim',
  toolPreset: { land: 'SL' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-rheinland-pfalz', 'investitionskosten', 'eigenanteil-pflegeheim', 'hilfe-zur-pflege'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_84'],
  de: {
    slug: 'pflegeheim-kosten-saarland',
    nav: 'Saarland',
    card: `Höchste Ausbildungsumlage Deutschlands: ${DE.eur(k.ausbildung)} im Monat; Eigenanteil im ersten Jahr ${DE.eur(k.mit15)}.`,
    title: 'Pflegeheim Kosten Saarland 2026: Eigenanteil und Umlage',
    description: `Pflegeheim im Saarland 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j4.eigenanteil)} ab dem vierten (vdek, 1.7.2026); Ausbildungsumlage ${DE.eur(k.ausbildung)}, die höchste aller Länder.`,
    h1: 'Pflegeheim im Saarland: was die Bewohner mitfinanzieren',
    intro: 'Im Saarland tragen Heimbewohner die höchste Umlage für die Pflegeausbildung, und die Gebäudekosten sind im Halbjahr spürbar gestiegen. Eine Rechnung in Teilen.',
    resume: `Das Saarland ist am 1. Juli 2026 beim Eigenanteil im ersten Heimjahr das zweitteuerste Land nach Bremen: ${DE.eur(k.mit15)} im Monat (vdek, Rang ${platz}). Eine Besonderheit steckt im Pflegeanteil von ${DE.eur(k.eee)}: Darin sind ${DE.eur(k.ausbildung)} Ausbildungsumlage enthalten, die höchste in Deutschland und deutlich mehr als im Bundesschnitt von ${DE.eur(b.ausbildung)}. Aufs Jahr gerechnet finanziert eine Bewohnerin damit rund ${DE.eur(ausbJahr)} der Pflegeausbildung, vor Zuschlag. Unterkunft und Verpflegung kosten ${DE.eur(k.uv)}, die Investitionskosten ${DE.eur(k.invest)}. Letztere sind seit Januar um ${DE.eur(investPlus)} gestiegen, der stärkste Anstieg aller Länder bei diesem Posten. Mit dem wachsenden Zuschlag der Pflegekasse sinkt der Eigenanteil auf ${DE.eur(heimMonat(k, 13).eigenanteil)} im zweiten, ${DE.eur(heimMonat(k, 25).eigenanteil)} im dritten und ${DE.eur(j4.eigenanteil)} ab dem vierten Jahr. Im Nachbarland Rheinland-Pfalz beginnt er bei ${DE.eur(rp.mit15)}.`,
    faqs: [
      { q: 'Was ist die Ausbildungsumlage im Pflegeheim?', a: `Ein Betrag, mit dem die Ausbildung von Pflegefachkräften finanziert wird und den die Heime über den Pflegeanteil an die Bewohner weitergeben. Im Saarland sind es ${DE.eur(k.ausbildung)} im Monat. Weil die Umlage zum EEE gehört, bezuschusst die Pflegekasse sie mit 15 bis 75 Prozent; der vdek fordert, dass die Länder sie ganz übernehmen.` },
      { q: 'Warum sind die Investitionskosten im Saarland gestiegen?', a: `Zwischen Januar und Juli 2026 stiegen sie um ${DE.eur(investPlus)} auf ${DE.eur(k.invest)} im Monat, Rang ${investRang} der Anstiege. Investitionskosten bilden Bau, Modernisierung und Instandhaltung der Gebäude ab; neue oder sanierte Häuser bringen höhere Werte in den Landesschnitt. Sie werden von der Pflegekasse nie bezuschusst.` },
      { q: 'Wie lange reicht eine durchschnittliche Rente im Saarland für das Heim?', a: `Gar nicht ganz: Bei ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr bleibt bei den meisten Renten eine monatliche Lücke, die aus Ersparnissen gedeckt wird. Der Rechner oben zeigt mit Ihrer Rente und Ihrem Vermögen, nach wie vielen Monaten der Schonbetrag erreicht ist und die Hilfe zur Pflege beginnt.` },
    ],
    body: (h) => `
<h2>Die Rechnung in Teilen</h2>
${h.table(['Posten', 'Saarland Jan. 2026', 'Saarland Juli 2026', 'Bund Juli 2026'], [
  ['Pflegeanteil (EEE)', h.eur(v.eee), h.eur(k.eee), h.eur(b.eee)],
  ['davon Ausbildungsumlage', h.eur(v.ausbildung), h.eur(k.ausbildung), h.eur(b.ausbildung)],
  ['Unterkunft und Verpflegung', h.eur(v.uv), h.eur(k.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(v.invest), h.eur(k.invest), h.eur(b.invest)],
  ['Eigenanteil 1. Jahr', h.eur(v.mit15), h.eur(k.mit15), h.eur(b.mit15)],
], 'vdek, Durchschnittswerte der saarländischen Heime.', ['l', 'r', 'r', 'r'])}
<p>Auffällig ist, dass sich im Saarland nicht nur der Pflegeanteil bewegt hat, sondern auch der Gebäudeteil. Das ist für die Familien ungünstig, denn Investitionskosten werden mit der Aufenthaltsdauer nicht kleiner. Ab dem vierten Jahr machen sie mit ${h.eur(k.invest)} fast ein Viertel des Eigenanteils von ${h.eur(j4.eigenanteil)} aus.</p>
<h2>Umlage und Zuschlag zusammen</h2>
<p>Die hohe Ausbildungsumlage wird mit den Jahren stärker abgefedert: Im ersten Jahr übernimmt die Kasse 15 Prozent davon, ab dem vierten 75 Prozent, weil sie Teil des Pflegeanteils ist (${h.src('sgb11_84', '§ 84 Abs. 2 SGB XI')} regelt den einheitlichen Eigenanteil je Heim). Wer gerade einzieht, trägt also fast die volle Umlage. Wie der Eigenanteil einer konkreten Rechnung entsteht, zeigt ${h.a('eigenanteil-pflegeheim', 'Eigenanteil im Pflegeheim')}; reicht das Geld nicht, steht der Weg zur ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')} offen.</p>
`,
  },
  en: {
    slug: 'care-home-costs-saarland',
    nav: 'Saarland',
    card: `Germany’s highest training levy at ${EN.eur(k.ausbildung)} a month; first-year co-payment ${EN.eur(k.mit15)}.`,
    title: 'Care Home Costs Saarland 2026: Co-payment and Training Levy',
    description: `Care home in Saarland 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j4.eigenanteil)} from year four (vdek, 1 July 2026); nurse training levy ${EN.eur(k.ausbildung)}, the highest of any state.`,
    h1: 'Care homes in Saarland: what residents help to fund',
    intro: 'In Saarland care home residents pay the highest levy for nurse training, and building costs rose noticeably in six months. The bill in its parts.',
    resume: `On 1 July 2026 Saarland was the second most expensive German state for the first-year care home co-payment after Bremen: ${EN.eur(k.mit15)} a month (vdek, rank ${platz}). One feature lies in the care part of ${EN.eur(k.eee)}: it includes a nursing training levy of ${EN.eur(k.ausbildung)}, the highest in Germany and well above the national ${EN.eur(b.ausbildung)}. Over a year a resident thus funds about ${EN.eur(ausbJahr)} of nurse training before the supplement. Board and lodging cost ${EN.eur(k.uv)} and investment costs ${EN.eur(k.invest)}. The latter rose by ${EN.eur(investPlus)} since January, the largest increase for this item of any state. With the care fund’s growing supplement the co-payment falls to ${EN.eur(heimMonat(k, 13).eigenanteil)} in year two, ${EN.eur(heimMonat(k, 25).eigenanteil)} in year three and ${EN.eur(j4.eigenanteil)} from year four. In neighbouring Rhineland-Palatinate it starts at ${EN.eur(rp.mit15)}.`,
    faqs: [
      { q: 'What is the training levy in a German care home?', a: `An amount that funds the training of nurses and that homes pass on to residents through the care part. In Saarland it is ${EN.eur(k.ausbildung)} a month. Because it belongs to the EEE, the care fund subsidises it at 15 to 75 percent; the vdek wants the states to pay it in full.` },
      { q: 'Why did investment costs rise in Saarland?', a: `Between January and July 2026 they rose by ${EN.eur(investPlus)} to ${EN.eur(k.invest)} a month, rank ${investRang} among the states. Investment costs reflect construction, modernisation and maintenance of buildings; new or renovated homes push the state average up. The care fund never subsidises them.` },
      { q: 'How long does an average pension last in a Saarland care home?', a: `Not fully: with a ${EN.eur(k.mit15)} co-payment in year one, most pensions leave a monthly gap that savings must cover. The calculator above shows, with your pension and savings, after how many months the protected amount is reached and social assistance for care begins.` },
    ],
    body: (h) => `
<h2>The bill in its parts</h2>
${h.table(['Item', 'Saarland Jan 2026', 'Saarland Jul 2026', 'Germany Jul 2026'], [
  ['Care co-payment (EEE)', h.eur(v.eee), h.eur(k.eee), h.eur(b.eee)],
  ['of which training levy', h.eur(v.ausbildung), h.eur(k.ausbildung), h.eur(b.ausbildung)],
  ['Board and lodging', h.eur(v.uv), h.eur(k.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(v.invest), h.eur(k.invest), h.eur(b.invest)],
  ['Co-payment, year 1', h.eur(v.mit15), h.eur(k.mit15), h.eur(b.mit15)],
], 'vdek, averages for Saarland homes.', ['l', 'r', 'r', 'r'])}
<p>In Saarland not only the care part moved but the building part too. That is unfavourable for families, because investment costs do not shrink with the length of stay. From year four they account for almost a quarter of the ${h.eur(j4.eigenanteil)} co-payment.</p>
<h2>Levy and supplement together</h2>
<p>The high training levy is cushioned more over the years: the fund covers 15 percent of it in year one and 75 percent from year four, because it is part of the care part (${h.src('sgb11_84', 'section 84(2) SGB XI')} sets one uniform co-payment per home). Someone moving in now bears almost the full levy in the first twelve months. ${h.a('eigenanteil-pflegeheim', 'The care home co-payment')} shows how a real bill is built; if money runs short, ${h.a('hilfe-zur-pflege', 'social assistance for care')} is the next step.</p>
`,
  },
});
