import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, rangliste } from '../../lib/engine/heim';
import { DE, EN } from '../../lib/fmt';

/** Hamburg: kräftigster Sprung beim Pflegeanteil seit Januar, hohe Ausbildungsumlage; Umland Schleswig-Holstein. */
const k = kosten('HH'), v = kosten('HH', 'vorher'), b = kosten('BUND'), sh = kosten('SH');
const j4 = heimMonat(k, 37);
const platz = rangliste().indexOf('HH') + 1;
const platzVorher = [...rangliste()].sort((x, y) => kosten(y, 'vorher').mit15 - kosten(x, 'vorher').mit15).indexOf('HH') + 1;
const sprung = k.eee - v.eee;

export default defineGuide({
  id: 'pflegeheim-kosten-hamburg',
  group: 'land',
  order: 60,
  tool: 'heim',
  toolPreset: { land: 'HH' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-schleswig-holstein', 'pflegeheim-kosten-bremen', 'eigenanteil-pflegeheim', 'leistungszuschlag'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'sgb11_84'],
  de: {
    slug: 'pflegeheim-kosten-hamburg',
    nav: 'Hamburg',
    card: `Pflegeanteil seit Januar um ${DE.eur(sprung)} gestiegen: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j4.eigenanteil)} ab dem vierten.`,
    title: 'Pflegeheim Kosten Hamburg 2026: Eigenanteil und Anstieg',
    description: `Pflegeheim in Hamburg 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j4.eigenanteil)} ab dem vierten (vdek, 1.7.2026); Pflegeanteil seit Januar um ${DE.eur(sprung)} höher als zuvor.`,
    h1: 'Pflegeheim in Hamburg: ein halbes Jahr, ein großer Sprung',
    intro: 'In Hamburg ist der Pflegeanteil im Heim in sechs Monaten so stark gestiegen wie kaum anderswo. Wo die Stadt jetzt steht und was das Umland kostet.',
    resume: `Zwischen dem 1. Januar und dem 1. Juli 2026 stieg der einrichtungseinheitliche Eigenanteil für die Pflege in Hamburger Heimen von ${DE.eur(v.eee)} auf ${DE.eur(k.eee)}, ein Plus von ${DE.eur(sprung)} im Monat (vdek). Damit kletterte Hamburg beim Eigenanteil im ersten Jahr von Rang ${platzVorher} auf Rang ${platz} der 16 Länder: Bewohner zahlen jetzt im Schnitt ${DE.eur(k.mit15)} im Monat. Darin stecken neben dem Pflegeanteil ${DE.eur(k.uv)} für Unterkunft und Verpflegung und ${DE.eur(k.invest)} Investitionskosten, beides über dem Bundesschnitt. Auffällig ist die Ausbildungsumlage von ${DE.eur(k.ausbildung)} im Pflegeanteil, eine der höchsten in Deutschland. Mit dem Leistungszuschlag der Pflegekasse sinkt der Eigenanteil im zweiten Jahr auf ${DE.eur(heimMonat(k, 13).eigenanteil)}, im dritten auf ${DE.eur(heimMonat(k, 25).eigenanteil)} und ab dem vierten auf ${DE.eur(j4.eigenanteil)}. Im benachbarten Schleswig-Holstein liegt er im ersten Jahr bei ${DE.eur(sh.mit15)}, ${DE.eur(k.mit15 - sh.mit15)} niedriger.`,
    faqs: [
      { q: 'Warum ist der Eigenanteil in Hamburg 2026 so stark gestiegen?', a: `Fast der gesamte Anstieg kommt aus dem Pflegeanteil (${DE.eur(sprung)} mehr), nur wenig aus Unterkunft und Verpflegung (${DE.eur(k.uv - v.uv)}). Neue Pflegesatzvereinbarungen mit höheren Löhnen und mehr Personal führen zu solchen Sprüngen. Der vdek fordert deshalb eine Begrenzung des Kostenanstiegs; eine Reform ist geplant, aber noch nicht beschlossen.` },
      { q: 'Wie viel teurer ist Hamburg als das Umland?', a: `Gegenüber Schleswig-Holstein im ersten Jahr ${DE.eur(k.mit15 - sh.mit15)} im Monat, vor allem wegen des höheren Pflegeanteils (${DE.eur(k.eee)} zu ${DE.eur(sh.eee)}). Ab dem vierten Jahr schrumpft der Abstand auf ${DE.eur(j4.eigenanteil - heimMonat(sh, 37).eigenanteil)}. Investitionskosten und Unterkunft sind in beiden Ländern ähnlich hoch, der Unterschied liegt also fast nur in der Pflege.` },
      { q: 'Kann ein Heim in Hamburg den Preis einfach erhöhen?', a: 'Nur nach einer neuen Vereinbarung mit den Pflegekassen und mit vorheriger schriftlicher Ankündigung, in der die Erhöhung begründet wird. Der neue Pflegeanteil gilt dann für alle Bewohner der Grade 2 bis 5 gleich. Prüfen Sie das Schreiben und fragen Sie nach, wenn die Begründung fehlt; der Pflegestützpunkt hilft dabei.' },
    ],
    body: (h) => `
<h2>Hamburg vor und nach dem Sprung</h2>
${h.table(['', 'Hamburg Jan. 2026', 'Hamburg Juli 2026', 'Schleswig-Holstein Juli 2026', 'Bund Juli 2026'], [
  ['Pflegeanteil (EEE)', h.eur(v.eee), h.eur(k.eee), h.eur(sh.eee), h.eur(b.eee)],
  ['davon Ausbildungsumlage', h.eur(v.ausbildung), h.eur(k.ausbildung), h.eur(sh.ausbildung), h.eur(b.ausbildung)],
  ['Unterkunft und Verpflegung', h.eur(v.uv), h.eur(k.uv), h.eur(sh.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(v.invest), h.eur(k.invest), h.eur(sh.invest), h.eur(b.invest)],
  ['Eigenanteil 1. Jahr', h.eur(v.mit15), h.eur(k.mit15), h.eur(sh.mit15), h.eur(b.mit15)],
], 'vdek, Durchschnittswerte.', ['l', 'r', 'r', 'r', 'r'])}
<p>Die Investitionskosten sind in Hamburg zwischen Januar und Juli praktisch gleich geblieben. Der Druck kommt aus der Pflege, und damit aus dem Teil, den die Pflegekasse mit der Zeit stärker bezuschusst. Wer schon drei Jahre im Heim lebt, spürt vom Sprung nur ein Viertel; wer gerade einzieht, trägt im ersten Jahr 85 Prozent davon.</p>
<p>Für die Familie heißt das: Beim Vergleich zweier Hamburger Häuser zählt vor allem der aktuelle EEE, und zwar nach der letzten Vereinbarung. Fragen Sie, wann der Pflegesatz zuletzt verhandelt wurde, und tragen Sie den Wert aus dem Heimvertrag in den Rechner ein. Wie die Rechnung aufgebaut ist, erklärt ${h.a('eigenanteil-pflegeheim', 'Eigenanteil im Pflegeheim')}.</p>
<h2>Die Ausbildungsumlage</h2>
<p>Im Pflegeanteil steckt eine Umlage, mit der die Ausbildung von Pflegefachkräften finanziert wird. In Hamburg sind das ${h.eur(k.ausbildung)} im Monat, in Schleswig-Holstein nur ${h.eur(sh.ausbildung)}. Weil die Umlage Teil des EEE ist, wird sie wie der übrige Pflegeanteil mit den Jahren bezuschusst. Der vdek fordert, dass die Länder diese Kosten selbst tragen; bislang zahlen sie die Bewohner.</p>
`,
  },
  en: {
    slug: 'care-home-costs-hamburg',
    nav: 'Hamburg',
    card: `Care part up ${EN.eur(sprung)} since January: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j4.eigenanteil)} from year four.`,
    title: 'Care Home Costs Hamburg 2026: Co-payment and the 2026 Rise',
    description: `Care home in Hamburg 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j4.eigenanteil)} from year four (vdek, 1 July 2026); the care part has risen by ${EN.eur(sprung)} a month since January.`,
    h1: 'Care homes in Hamburg: six months, one big jump',
    intro: 'In Hamburg the care part of the home’s price rose more in six months than almost anywhere. Where the city stands now and what the surrounding area costs.',
    resume: `Between 1 January and 1 July 2026 the uniform care co-payment (EEE) in Hamburg care homes rose from ${EN.eur(v.eee)} to ${EN.eur(k.eee)}, an increase of ${EN.eur(sprung)} a month (vdek). Hamburg therefore moved from rank ${platzVorher} to rank ${platz} of the 16 states for the first-year co-payment, which now averages ${EN.eur(k.mit15)} a month. Besides the care part this includes ${EN.eur(k.uv)} for board and lodging and ${EN.eur(k.invest)} of investment costs, both above the national average. The nursing training levy within the care part, ${EN.eur(k.ausbildung)}, is one of the highest in Germany. With the care fund’s supplement the co-payment falls to ${EN.eur(heimMonat(k, 13).eigenanteil)} in year two, ${EN.eur(heimMonat(k, 25).eigenanteil)} in year three and ${EN.eur(j4.eigenanteil)} from year four. In neighbouring Schleswig-Holstein the first-year figure is ${EN.eur(sh.mit15)}, ${EN.eur(k.mit15 - sh.mit15)} lower.`,
    faqs: [
      { q: 'Why did Hamburg care home costs jump in 2026?', a: `Almost the entire rise comes from the care part (${EN.eur(sprung)} more) and little from board and lodging (${EN.eur(k.uv - v.uv)}). New rate agreements with higher wages and more staff produce such jumps. The vdek is calling for a cap on cost increases; a reform is planned but not yet passed.` },
      { q: 'How much more does Hamburg cost than the surrounding area?', a: `Compared with Schleswig-Holstein, ${EN.eur(k.mit15 - sh.mit15)} a month in year one, mainly because of the higher care part (${EN.eur(k.eee)} against ${EN.eur(sh.eee)}). From year four the gap narrows to ${EN.eur(j4.eigenanteil - heimMonat(sh, 37).eigenanteil)}. Investment costs and accommodation are similar in both states, so the difference lies almost entirely in care.` },
      { q: 'Can a Hamburg home simply raise its prices?', a: 'Only after a new agreement with the care funds and with prior written notice that explains the increase. The new care part then applies equally to all residents from grade 2 to 5. Check the letter and ask if the reasons are missing; the local Pflegestützpunkt can help families who are not on the spot.' },
    ],
    body: (h) => `
<h2>Hamburg before and after the jump</h2>
${h.table(['', 'Hamburg Jan 2026', 'Hamburg Jul 2026', 'Schleswig-Holstein Jul 2026', 'Germany Jul 2026'], [
  ['Care co-payment (EEE)', h.eur(v.eee), h.eur(k.eee), h.eur(sh.eee), h.eur(b.eee)],
  ['of which training levy', h.eur(v.ausbildung), h.eur(k.ausbildung), h.eur(sh.ausbildung), h.eur(b.ausbildung)],
  ['Board and lodging', h.eur(v.uv), h.eur(k.uv), h.eur(sh.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(v.invest), h.eur(k.invest), h.eur(sh.invest), h.eur(b.invest)],
  ['Co-payment, year 1', h.eur(v.mit15), h.eur(k.mit15), h.eur(sh.mit15), h.eur(b.mit15)],
], 'vdek averages.', ['l', 'r', 'r', 'r', 'r'])}
<p>Investment costs in Hamburg stayed virtually flat between January and July. The pressure comes from care, the part the fund subsidises more with time. A resident in their fourth year feels only a quarter of the jump; someone moving in now bears 85 percent of it in year one.</p>
<p>When comparing two Hamburg homes, the current EEE after the latest agreement matters most. Ask when the rate was last negotiated and enter the figure from the contract in the calculator. ${h.a('eigenanteil-pflegeheim', 'The care home co-payment')} explains how the bill is built.</p>
<h2>The training levy</h2>
<p>The care part includes a levy that funds the training of nurses. In Hamburg it is ${h.eur(k.ausbildung)} a month, in Schleswig-Holstein only ${h.eur(sh.ausbildung)}. As part of the EEE it is subsidised over the years like the rest of the care part. The vdek wants the states to pay these costs themselves; for now residents do.</p>
`,
  },
});
