import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, reichweite, rangliste } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Sachsen: niedrige Unterkunft, Pflegeanteil über dem Bund und stark gestiegen; Beispiel einer Rentnerin mit 1.400 €. */
const k = kosten('SN'), v = kosten('SN', 'vorher'), b = kosten('BUND'), st = kosten('ST');
const j4 = heimMonat(k, 37);
const platz = rangliste().indexOf('SN') + 1;
const rente = 1400, erspart = 30000;
const rw = reichweite(k, rente, erspart);
const zwei = heimVerlauf(k, 1, 24).summe;

export default defineGuide({
  id: 'pflegeheim-kosten-sachsen',
  group: 'land',
  order: 130,
  tool: 'heim',
  toolPreset: { land: 'SN' },
  related: ['pflegeheim-kosten', 'pflegeheim-kosten-sachsen-anhalt', 'pflegeheim-kosten-thueringen', 'hilfe-zur-pflege', 'pflegeheim-kosten-wer-zahlt'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43c', 'dv90'],
  de: {
    slug: 'pflegeheim-kosten-sachsen',
    nav: 'Sachsen',
    card: `${DE.eur(k.mit15)} im ersten Jahr: Was eine sächsische Rente von ${DE.eur(rente)} im Heim noch trägt und wie lange das Ersparte reicht.`,
    title: 'Pflegeheim Kosten Sachsen 2026: Eigenanteil und Rentenlücke',
    description: `Pflegeheim in Sachsen 2026: ${DE.eur(k.mit15)} Eigenanteil im ersten Jahr, ${DE.eur(j4.eigenanteil)} ab dem vierten (vdek, 1.7.2026). Rechenbeispiel: Rente ${DE.eur(rente)}, Erspartes ${DE.eur(erspart)}.`,
    h1: 'Pflegeheim in Sachsen: Eigenanteil gegen Rente gerechnet',
    intro: 'Sachsen liegt beim Eigenanteil im unteren Drittel. Für viele sächsische Renten reicht er trotzdem nicht. Ein Rechenbeispiel zeigt, wie schnell das Ersparte schmilzt.',
    resume: `In Sachsen kostet ein Pflegeheimplatz am 1. Juli 2026 im ersten Aufenthaltsjahr durchschnittlich ${DE.eur(k.mit15)} im Monat aus eigener Tasche, Platz ${platz} unter den Ländern (vdek). Unterkunft und Verpflegung sind mit ${DE.eur(k.uv)} günstig, die Investitionskosten liegen mit ${DE.eur(k.invest)} unter dem Bund. Der Pflegeanteil dagegen ist mit ${DE.eur(k.eee)} höher als im Bundesschnitt und allein seit Januar um ${DE.eur(k.eee - v.eee)} gestiegen. Ab dem vierten Jahr sinkt der Eigenanteil durch den Zuschlag der Pflegekasse auf ${DE.eur(j4.eigenanteil)}. Ein Rechenbeispiel: Eine Rentnerin mit ${DE.eur(rente)} netto und ${DE.eur(erspart)} Erspartem hat im ersten Monat eine Lücke von ${DE.eur(rw.luecke)}. Ihr Vermögen über dem Schonbetrag von ${DE.eur(P.sozialhilfe.schonvermoegen)} reicht damit etwa ${rw.monateBisSchonvermoegen} Monate; danach ist die Hilfe zur Pflege beim Sozialamt zu beantragen. Die ersten beiden Jahre kosten im Schnitt ${DE.eur(zwei)}.`,
    faqs: [
      { q: 'Wie viel Erspartes darf beim Heimeinzug in Sachsen behalten werden?', a: `Bevor das Sozialamt Hilfe zur Pflege zahlt, muss das Vermögen bis auf einen Schonbetrag eingesetzt werden. Er beträgt ${DE.eur(P.sozialhilfe.schonvermoegen)} je volljähriger Person (§ 1 der Durchführungsverordnung zu § 90 Abs. 2 Nr. 9 SGB XII). Geschützt sind außerdem ein angemessener Hausrat und unter Umständen das Haus, solange Angehörige darin wohnen.` },
      { q: 'Ist ein Heim in Sachsen-Anhalt günstiger als in Sachsen?', a: `Ja, im Schnitt um ${DE.eur(k.mit15 - st.mit15)} im Monat im ersten Jahr: Sachsen-Anhalt hat den niedrigsten Eigenanteil aller Länder (${DE.eur(st.mit15)}). Der Unterschied liegt vor allem im Pflegeanteil und bei den Investitionskosten. Ab dem vierten Jahr beträgt er noch ${DE.eur(j4.eigenanteil - heimMonat(st, 37).eigenanteil)}.` },
      { q: 'Was ändert der steigende Pflegeanteil in Sachsen für Bewohner, die schon länger im Heim sind?', a: `Weniger als für Neue: Ab dem vierten Jahr übernimmt die Pflegekasse 75 Prozent des Pflegeanteils. Vom Anstieg um ${DE.eur(k.eee - v.eee)} seit Januar zahlen Langzeitbewohner daher nur ein Viertel, also etwa ${DE.eur((k.eee - v.eee) * 0.25)} im Monat, neue Bewohner im ersten Jahr dagegen ${DE.eur((k.eee - v.eee) * 0.85)}.` },
    ],
    body: (h) => `
<h2>Sachsen gegen den Bund und Sachsen-Anhalt</h2>
${h.table(['', 'Sachsen', 'Sachsen-Anhalt', 'Bund'], [
  ['Pflegeanteil (EEE)', h.eur(k.eee), h.eur(st.eee), h.eur(b.eee)],
  ['Unterkunft und Verpflegung', h.eur(k.uv), h.eur(st.uv), h.eur(b.uv)],
  ['Investitionskosten', h.eur(k.invest), h.eur(st.invest), h.eur(b.invest)],
  ['1. Jahr', h.eur(k.mit15), h.eur(st.mit15), h.eur(b.mit15)],
  ['ab 4. Jahr', h.eur(j4.eigenanteil), h.eur(heimMonat(st, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, 1. Juli 2026.', ['l', 'r', 'r', 'r'])}
<h2>Das Rechenbeispiel im Detail</h2>
<p>Die Rentnerin aus dem Beispiel zahlt im ersten Jahr jeden Monat ${h.eur(rw.luecke)} aus dem Ersparten. Ab dem 13. Monat wird die Lücke kleiner, weil der Zuschlag auf 30 Prozent steigt. Trotzdem ist das Vermögen über dem Schonbetrag nach etwa ${rw.monateBisSchonvermoegen} Monaten aufgebraucht. Spätestens dann sollte der Antrag auf ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')} beim Sozialamt liegen, am besten einige Wochen vorher, damit keine Rechnung offen bleibt. Der Schonbetrag von ${h.eur(P.sozialhilfe.schonvermoegen)} je Person ist in der ${h.src('dv90', 'Durchführungsverordnung zu § 90 SGB XII')} festgelegt.</p>
<p>Tragen Sie Ihre eigenen Zahlen in den Rechner oben ein. Er rechnet mit dem sächsischen Durchschnitt, solange Sie keinen EEE aus dem Heimvertrag angeben, und berücksichtigt, wie viele Monate jemand schon im Heim lebt. Kinder werden für die Heimkosten erst herangezogen, wenn ihr Jahreseinkommen ${h.eur(P.sozialhilfe.jahreseinkommensgrenze_kinder)} übersteigt; mehr dazu unter ${h.a('pflegeheim-kosten-wer-zahlt', 'Pflegeheim: wer zahlt')}.</p>
`,
  },
  en: {
    slug: 'care-home-costs-saxony',
    nav: 'Saxony',
    card: `${EN.eur(k.mit15)} in year one: what a ${EN.eur(rente)} pension covers in a Saxon care home and how long savings last.`,
    title: 'Care Home Costs Saxony 2026: Co-payment and Pension Gap',
    description: `Care home in Saxony 2026: ${EN.eur(k.mit15)} co-payment in year one, ${EN.eur(j4.eigenanteil)} from year four (vdek, 1 July 2026). Worked example: a ${EN.eur(rente)} pension and ${EN.eur(erspart)} savings.`,
    h1: 'Care homes in Saxony: the co-payment against a pension',
    intro: 'Saxony is in the lower third for care home co-payments, yet many Saxon pensions do not cover them. A worked example shows how fast savings shrink.',
    resume: `In Saxony a care home place cost an average of ${EN.eur(k.mit15)} a month out of pocket in the first year of residence on 1 July 2026, rank ${platz} among the German states (vdek). Board and lodging are cheap at ${EN.eur(k.uv)}, and investment costs of ${EN.eur(k.invest)} are below the national level. The care part, however, is above average at ${EN.eur(k.eee)} and has risen by ${EN.eur(k.eee - v.eee)} since January alone. From the fourth year the care fund’s supplement brings the co-payment down to ${EN.eur(j4.eigenanteil)}. A worked example: a pensioner with ${EN.eur(rente)} net and ${EN.eur(erspart)} in savings faces a gap of ${EN.eur(rw.luecke)} in the first month. Her savings above the protected ${EN.eur(P.sozialhilfe.schonvermoegen)} last about ${rw.monateBisSchonvermoegen} months; after that she needs to apply to the welfare office for social assistance for care (Hilfe zur Pflege). The first two years cost about ${EN.eur(zwei)} on average.`,
    faqs: [
      { q: 'How much savings may a resident keep when moving into a Saxon home?', a: `Before the welfare office pays social assistance for care, savings must be used down to a protected amount of ${EN.eur(P.sozialhilfe.schonvermoegen)} per adult (section 1 of the regulation on section 90(2) no. 9 SGB XII). Reasonable household goods are also protected, and possibly the house while relatives live in it.` },
      { q: 'Is a home in Saxony-Anhalt cheaper than in Saxony?', a: `Yes, by about ${EN.eur(k.mit15 - st.mit15)} a month in year one: Saxony-Anhalt has the lowest co-payment of any state (${EN.eur(st.mit15)}). The difference lies mainly in the care part and in investment costs. From year four the difference is still ${EN.eur(j4.eigenanteil - heimMonat(st, 37).eigenanteil)} a month.` },
      { q: 'What does the rising care part mean for long-term residents in Saxony?', a: `Less than for newcomers: from year four the fund covers 75 percent of the care part. Of the ${EN.eur(k.eee - v.eee)} rise since January, long-term residents pay only a quarter, about ${EN.eur((k.eee - v.eee) * 0.25)} a month, while new residents pay ${EN.eur((k.eee - v.eee) * 0.85)} a month in their first year.` },
    ],
    body: (h) => `
<h2>Saxony against Germany and Saxony-Anhalt</h2>
${h.table(['', 'Saxony', 'Saxony-Anhalt', 'Germany'], [
  ['Care co-payment (EEE)', h.eur(k.eee), h.eur(st.eee), h.eur(b.eee)],
  ['Board and lodging', h.eur(k.uv), h.eur(st.uv), h.eur(b.uv)],
  ['Investment costs', h.eur(k.invest), h.eur(st.invest), h.eur(b.invest)],
  ['Year 1', h.eur(k.mit15), h.eur(st.mit15), h.eur(b.mit15)],
  ['From year 4', h.eur(j4.eigenanteil), h.eur(heimMonat(st, 37).eigenanteil), h.eur(heimMonat(b, 37).eigenanteil)],
], 'vdek, 1 July 2026.', ['l', 'r', 'r', 'r'])}
<h2>The worked example in detail</h2>
<p>The pensioner in the example pays ${h.eur(rw.luecke)} from savings every month in year one. From month 13 the gap shrinks as the supplement rises to 30 percent, but savings above the protected amount are still gone after about ${rw.monateBisSchonvermoegen} months. By then the application for ${h.a('hilfe-zur-pflege', 'social assistance for care')} should be with the welfare office, ideally a few weeks earlier so no bill goes unpaid. The protected amount of ${h.eur(P.sozialhilfe.schonvermoegen)} per person is set in the ${h.src('dv90', 'regulation on section 90 SGB XII')}.</p>
<p>Enter your own figures in the calculator above; it uses the Saxon average unless you give an EEE from the contract. Children are only asked to contribute if their annual income exceeds ${h.eur(P.sozialhilfe.jahreseinkommensgrenze_kinder)}; see ${h.a('pflegeheim-kosten-wer-zahlt', 'who pays for a care home')}.</p>
`,
  },
});
