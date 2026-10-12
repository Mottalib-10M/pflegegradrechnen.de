import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, rangliste, LAND_NAME } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Bund und Länder aus dem Motor (vdek 1.7.2026). */
const b = kosten('BUND');
const j = [1, 13, 25, 37].map((m) => heimMonat(b, m));
const liste = rangliste();
const teuer = liste[0], billig = liste[liste.length - 1];
const kT = kosten(teuer), kB = kosten(billig);
const vier = heimVerlauf(b, 1, 48).summe;

export default defineGuide({
  id: 'pflegeheim-kosten',
  group: 'heim',
  order: 10,
  tool: 'heim',
  related: ['eigenanteil-pflegeheim', 'leistungszuschlag', 'investitionskosten', 'hilfe-zur-pflege', 'pflegeheim-kosten-wer-zahlt', 'pflegeheim-kosten-nordrhein-westfalen'],
  sources: ['vdek2607', 'vdek2601', 'sgb11_43', 'sgb11_43c', 'sgb11_84'],
  de: {
    slug: 'pflegeheim-kosten',
    nav: 'Pflegeheim-Kosten',
    card: 'Eigenanteil im Heim für jedes Bundesland und jedes Aufenthaltsjahr, mit Reichweite der Ersparnisse.',
    title: 'Pflegeheim Kosten 2026: Eigenanteil je Land und Jahr',
    description: `Pflegeheim-Kosten 2026: Eigenanteil im Bundesschnitt ${DE.eur(b.mit15)} im ersten Jahr, ${DE.eur(j[3].eigenanteil)} ab dem vierten, für alle 16 Länder nach vdek, mit Ersparnis-Rechner.`,
    h1: 'Was ein Pflegeheim 2026 selbst kostet',
    intro: 'Land, Pflegegrad und Aufenthaltsmonat wählen: Der Rechner zeigt den Eigenanteil, wie er sich Jahr für Jahr senkt und wie lange Rente und Erspartes reichen.',
    resume: `Ein Platz im Pflegeheim kostete am 1. Juli 2026 im Bundesdurchschnitt ${DE.eur(b.mit15)} im Monat aus eigener Tasche, gerechnet für das erste Aufenthaltsjahr nach dem Zuschlag der Pflegekasse. Der Betrag besteht aus drei Teilen: dem einrichtungseinheitlichen Eigenanteil für die Pflege (EEE) von ${DE.eur(b.eee)} vor Zuschlag, Unterkunft und Verpflegung mit ${DE.eur(b.uv)} und Investitionskosten von ${DE.eur(b.invest)}. Nur der Pflegeteil wird bezuschusst, mit 15 Prozent im ersten Jahr, 30 im zweiten, 50 im dritten und 75 Prozent ab dem vierten (§ 43c SGB XI). So fällt der Eigenanteil von ${DE.eur(j[0].eigenanteil)} auf ${DE.eur(j[1].eigenanteil)}, ${DE.eur(j[2].eigenanteil)} und schließlich ${DE.eur(j[3].eigenanteil)}. Über vier Jahre sind das im Schnitt ${DE.eur(vier)}. Zwischen den Ländern liegen ${DE.eur(kT.mit15 - kB.mit15)} im Monat: am teuersten ist ${LAND_NAME[teuer].de} mit ${DE.eur(kT.mit15)}, am günstigsten ${LAND_NAME[billig].de} mit ${DE.eur(kB.mit15)} (vdek).`,
    faqs: [
      { q: 'Warum zahlt man im Heim mit Pflegegrad 5 nicht mehr als mit Pflegegrad 2?', a: 'Weil der pflegebedingte Eigenanteil in jedem Heim für alle Bewohner der Grade 2 bis 5 gleich hoch ist; das schreibt § 84 Abs. 2 SGB XI als einrichtungseinheitlichen Eigenanteil vor. Ein höherer Grad erhöht nur den Betrag, den die Pflegekasse an das Heim zahlt. Für die Familie ändert ein Höherstufungsantrag im Heim deshalb nichts an der Rechnung.' },
      { q: 'Wird der Zuschlag automatisch abgezogen?', a: 'Ja. Seit dem 1. Juli 2026 berechnet die Pflegekasse den Leistungszuschlag selbst auf Grundlage der Angaben des Heims, zahlt ihn direkt an die Einrichtung, und das Heim stellt nur den verbleibenden Eigenanteil in Rechnung (§ 43c SGB XI). Ein eigener Antrag ist nicht nötig. Monate, in denen nur an einigen Tagen Heimpflege bestand, zählen voll mit.' },
      { q: 'Wie verlässlich sind die Durchschnittswerte für ein bestimmtes Heim?', a: 'Sie zeigen die Größenordnung im Land, nicht den Preis eines Hauses. Zwischen zwei Heimen derselben Stadt können mehrere hundert Euro liegen, vor allem bei Unterkunft und Investitionskosten. Tragen Sie den EEE aus dem Heimvertrag oder der Preisliste in das Feld ein, dann rechnet der Rechner mit diesem Wert statt mit dem Landesdurchschnitt.' },
      { q: 'Was ist im Eigenanteil nicht enthalten?', a: 'Taschengeld für Friseur und Kleidung, Zuzahlungen für Medikamente und Hilfsmittel, Kranken- und Pflegeversicherungsbeiträge auf die Rente und Zusatzleistungen wie ein Einzelzimmerzuschlag. Wer den Eigenanteil gerade so aus der Rente zahlt, hat für diese Posten oft nichts übrig; dann sollte früh geprüft werden, ob Hilfe zur Pflege vom Sozialamt in Betracht kommt.' },
    ],
    body: (h) => `
<h2>Die 16 Länder im Überblick</h2>
${h.table(['Land', 'EEE vor Zuschlag', 'Unterkunft + Verpflegung', 'Investitionskosten', '1. Jahr', 'ab 4. Jahr'],
  liste.map((l) => { const k = kosten(l); return [h.a(`pflegeheim-kosten-${LAND_SLUG[l]}`, LAND_NAME[l].de), h.eur(k.eee), h.eur(k.uv), h.eur(k.invest), h.eur(k.mit15), h.eur(heimMonat(k, 37).eigenanteil)]; }),
  `Durchschnitt je Land, vdek, Stand 1. Juli 2026; sortiert nach dem Eigenanteil im ersten Jahr. Bund: ${h.eur(b.mit15)}.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Die Unterschiede entstehen an verschiedenen Stellen. In ${LAND_NAME[teuer].de} ist es vor allem die Summe aus Unterkunft und Investitionskosten, in Baden-Württemberg und Berlin der hohe Pflegeanteil. Im Osten liegen Investitionskosten und Unterkunft meist niedriger. Weil nur der Pflegeteil mit der Zeit bezuschusst wird, schrumpft der Abstand nach drei Jahren dort weniger, wo die festen Posten den Ausschlag geben.</p>
<h2>Was die Pflegekasse zahlt</h2>
<p>Neben dem Zuschlag zahlt die Kasse einen festen Betrag für die Pflege an das Heim: ${h.eur(P.vollstationaer['2'])} bei Pflegegrad 2 bis ${h.eur(P.vollstationaer['5'])} bei Pflegegrad 5 (${h.src('sgb11_43', '§ 43 SGB XI')}). Dieser Betrag ist im EEE bereits abgezogen. Für Pflegegrad 1 gibt es nur einen Zuschuss von ${h.eur(P.vollstationaer['1'])} und keinen Leistungszuschlag; der Preis für diesen Grad steht in der Preisliste des Hauses.</p>
<p>Wer in das Heim zieht, verliert das Pflegegeld und die meisten Budgets der häuslichen Pflege. Die Rente läuft weiter und bleibt die wichtigste Quelle für den Eigenanteil. Reicht sie nicht, wird das Ersparte bis auf ${h.eur(P.sozialhilfe.schonvermoegen)} eingesetzt; danach springt das Sozialamt mit der ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')} ein. Wer was zahlt und wann Kinder herangezogen werden, steht unter ${h.a('pflegeheim-kosten-wer-zahlt', 'Pflegeheim: wer zahlt')}.</p>
`,
  },
  en: {
    slug: 'care-home-costs',
    nav: 'Care home costs',
    card: 'Care home co-payment for every German state and every year of residence, with a savings run-down.',
    title: 'Care Home Costs Germany 2026: Co-payment by State, Year',
    description: `German care home costs 2026: national average co-payment ${EN.eur(b.mit15)} a month in year one and ${EN.eur(j[3].eigenanteil)} from year four, for all 16 states (vdek), with savings tool.`,
    h1: 'What a care home in Germany costs the resident in 2026',
    intro: 'Choose the state, care grade and month of stay: the calculator shows the monthly co-payment, how it falls each year and how long pension and savings last.',
    resume: `On 1 July 2026 a German care home place cost the resident an average of ${EN.eur(b.mit15)} a month in the first year of residence, after the supplement paid by the long-term care fund (Pflegekasse). The bill has three parts: the home’s uniform care co-payment (einrichtungseinheitlicher Eigenanteil, EEE) of ${EN.eur(b.eee)} before the supplement, board and lodging of ${EN.eur(b.uv)}, and investment costs of ${EN.eur(b.invest)} for the building. Only the care part is subsidised: 15 percent in year one, 30 in year two, 50 in year three and 75 percent from year four under section 43c of Book XI of the Social Code. The co-payment therefore falls from ${EN.eur(j[0].eigenanteil)} to ${EN.eur(j[1].eigenanteil)}, ${EN.eur(j[2].eigenanteil)} and finally ${EN.eur(j[3].eigenanteil)}. Over four years that is about ${EN.eur(vier)} on average. The gap between states is ${EN.eur(kT.mit15 - kB.mit15)} a month: ${LAND_NAME[teuer].en} is the most expensive at ${EN.eur(kT.mit15)} and ${LAND_NAME[billig].en} the cheapest at ${EN.eur(kB.mit15)}, according to the vdek.`,
    faqs: [
      { q: 'Does a higher care grade make a German care home more expensive for us?', a: 'No. Within one home every resident from grade 2 to 5 pays the same care co-payment, the einrichtungseinheitlicher Eigenanteil required by section 84(2) SGB XI. A higher grade only raises what the fund pays the home. Asking for a higher grade after moving in therefore does not change the family’s bill.' },
      { q: 'Do we have to apply for the supplement?', a: 'No. Since 1 July 2026 the Pflegekasse calculates the supplement itself from information supplied by the home, pays it straight to the home, and the home bills only the remaining co-payment (section 43c SGB XI). Months with only a few days in the home count as full months for the rising percentage.' },
      { q: 'How useful are state averages when choosing a specific home?', a: 'They show the price level in a state, not the price of a home. Two homes in the same city can differ by several hundred euros, mostly in accommodation and investment costs. Enter the EEE from the home’s price list or contract and the calculator uses that figure instead of the average.' },
      { q: 'What does the co-payment leave out?', a: 'Personal spending money for clothes and the hairdresser, prescription and aid co-payments, health and care insurance contributions deducted from the pension, and extras such as a single-room surcharge. Families whose parent can only just cover the co-payment from the pension should look early at social assistance for care from the local welfare office.' },
    ],
    body: (h) => `
<h2>The 16 states at a glance</h2>
${h.table(['State', 'EEE before supplement', 'Board and lodging', 'Investment costs', 'Year 1', 'From year 4'],
  liste.map((l) => { const k = kosten(l); return [h.a(`pflegeheim-kosten-${LAND_SLUG[l]}`, LAND_NAME[l].en), h.eur(k.eee), h.eur(k.uv), h.eur(k.invest), h.eur(k.mit15), h.eur(heimMonat(k, 37).eigenanteil)]; }),
  `State averages, vdek, 1 July 2026; sorted by year-one co-payment. National: ${h.eur(b.mit15)}.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>The differences come from different places. In ${LAND_NAME[teuer].en} it is mostly accommodation plus investment costs; in Baden-Württemberg and Berlin it is the high care part. In the eastern states investment costs and accommodation tend to be lower. Because only the care part is subsidised over time, the gap narrows less after three years where fixed costs drive the bill.</p>
<h2>What the fund pays</h2>
<p>Besides the supplement, the fund pays the home a fixed amount for care: ${h.eur(P.vollstationaer['2'])} at grade 2 up to ${h.eur(P.vollstationaer['5'])} at grade 5 (${h.src('sgb11_43', 'section 43 SGB XI')}), already deducted in the EEE. Grade 1 gets only ${h.eur(P.vollstationaer['1'])} and no supplement.</p>
<p>Moving into a home ends the care allowance and most home-care budgets. The pension continues and is the main source for the co-payment. If it is not enough, savings are used down to ${h.eur(P.sozialhilfe.schonvermoegen)}; after that the welfare office can step in with ${h.a('hilfe-zur-pflege', 'social assistance for care')}. Who pays what, and when children are asked, is explained in ${h.a('pflegeheim-kosten-wer-zahlt', 'who pays for a care home')}.</p>
`,
  },
});

const LAND_SLUG: Record<string, string> = { BW: 'baden-wuerttemberg', BY: 'bayern', BE: 'berlin', BB: 'brandenburg', HB: 'bremen', HH: 'hamburg', HE: 'hessen', MV: 'mecklenburg-vorpommern', NI: 'niedersachsen', NW: 'nordrhein-westfalen', RP: 'rheinland-pfalz', SL: 'saarland', SN: 'sachsen', ST: 'sachsen-anhalt', SH: 'schleswig-holstein', TH: 'thueringen' };
