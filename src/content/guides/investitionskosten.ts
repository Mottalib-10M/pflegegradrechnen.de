import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, LAENDER, LAND_NAME } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Investitionskosten je Land (vdek 1.7.2026), Anteil am Eigenanteil im ersten und vierten Jahr, Veränderung seit Januar. */
const b = kosten('BUND'), bv = kosten('BUND', 'vorher');
const sortiert = [...LAENDER].sort((x, y) => kosten(y).invest - kosten(x).invest);
const hoch = sortiert[0], tief = sortiert[sortiert.length - 1];
const anteil1 = b.invest / b.mit15, anteil4 = b.invest / heimMonat(b, 37).eigenanteil;
const vierJahreInvest = b.invest * 12 * 4;
const PW = P.pflegewohngeld_nw;

export default defineGuide({
  id: 'investitionskosten',
  group: 'heim',
  order: 40,
  mini: 'investLand',
  related: ['eigenanteil-pflegeheim', 'pflegeheim-kosten', 'pflegeheim-kosten-nordrhein-westfalen', 'pflegeheim-kosten-brandenburg', 'hilfe-zur-pflege', 'leistungszuschlag'],
  sources: ['sgb11_82', 'sgb11_9', 'vdek2607', 'vdek2601', 'vzNrwPflegewohngeld', 'wbvg9'],
  de: {
    slug: 'investitionskosten',
    nav: 'Investitionskosten',
    card: `Was Bewohner für das Gebäude zahlen: ${DE.eur(kosten(tief).invest)} bis ${DE.eur(kosten(hoch).invest)} im Monat je nach Land, nie bezuschusst.`,
    title: 'Investitionskosten Pflegeheim 2026: was das Gebäude kostet',
    description: `Investitionskosten im Pflegeheim 2026: Bundesschnitt ${DE.eur(b.invest)} im Monat, ${DE.eur(kosten(tief).invest)} in ${LAND_NAME[tief].de} bis ${DE.eur(kosten(hoch).invest)} in ${LAND_NAME[hoch].de} (vdek). Wer zahlt, wer hilft.`,
    h1: 'Investitionskosten: der Teil der Heimrechnung für das Haus',
    intro: 'Bau, Ausstattung und Instandhaltung eines Heims zahlen die Bewohner mit, sofern das Land nicht fördert. Warum der Posten so verschieden ist und nie kleiner wird.',
    resume: `Investitionskosten sind der Teil der Heimkosten, mit dem die Einrichtung Bau, Modernisierung, Ausstattung, Miete oder Pacht ihres Gebäudes finanziert. Soweit diese Kosten nicht durch öffentliche Förderung des Landes gedeckt sind, darf das Heim sie den Bewohnern gesondert berechnen (§ 82 Abs. 3 SGB XI); geförderte Heime brauchen dafür die Zustimmung der Landesbehörde. Für die Pflegeinfrastruktur sind die Länder verantwortlich (§ 9 SGB XI), fördern aber sehr unterschiedlich. Entsprechend verschieden ist der Posten: Im Bundesschnitt lag er am 1. Juli 2026 bei ${DE.eur(b.invest)} im Monat (vdek), von ${DE.eur(kosten(tief).invest)} in ${LAND_NAME[tief].de} bis ${DE.eur(kosten(hoch).invest)} in ${LAND_NAME[hoch].de}. Die Pflegekasse bezuschusst Investitionskosten nicht, auch nicht mit dem Leistungszuschlag. Ihr Anteil am Eigenanteil wächst deshalb mit der Zeit, von ${DE.pct(anteil1, 0)} im ersten Jahr auf ${DE.pct(anteil4, 0)} ab dem vierten. Einige Länder helfen bedürftigen Bewohnern, etwa Nordrhein-Westfalen mit dem Pflegewohngeld.`,
    faqs: [
      { q: 'Warum muss ich als Heimbewohner das Gebäude mitbezahlen?', a: 'Weil die Pflegeversicherung nur pflegebedingte Kosten trägt und das Land die Gebäude nicht vollständig fördert. Was die öffentliche Förderung nicht deckt, darf das Heim nach § 82 Abs. 3 SGB XI gesondert berechnen. Der vdek fordert, dass die Länder diese Kosten vollständig übernehmen; das würde die Bewohner zusammen mit den Ausbildungskosten im Schnitt um mehrere hundert Euro im Monat entlasten.' },
      { q: 'Werden Investitionskosten mit der Zeit weniger?', a: `Nein. Anders als der Pflegeanteil, auf den die Pflegekasse einen mit den Jahren steigenden Zuschlag zahlt, bleiben die Investitionskosten über den gesamten Aufenthalt gleich, solange das Heim sie nicht ändert. In vier Jahren kommen im Bundesschnitt ${DE.eur(vierJahreInvest)} zusammen. Erhöhungen muss das Heim begründen; Investitionen dürfen nur umgelegt werden, soweit sie notwendig sind.` },
      { q: 'Gibt es Hilfe zu den Investitionskosten?', a: `In Nordrhein-Westfalen das Pflegewohngeld: Es übernimmt die Investitionskosten, wenn Einkommen und Vermögen nicht reichen, bei einem Schonbetrag von ${DE.eur(PW.schonbetrag)} für eine Person. Andere Länder haben eigene oder gar keine Regelungen. Reicht das Geld nicht und gibt es keine Landeshilfe, übernimmt die Hilfe zur Pflege des Sozialamts auch diesen Teil.` },
      { q: 'Zahlt man Investitionskosten auch in der Kurzzeitpflege oder Tagespflege?', a: 'Ja. Auch Einrichtungen der Kurzzeit- und Tagespflege berechnen Investitionskosten gesondert, und die Pflegekasse übernimmt sie dort ebenfalls nicht aus ihrem Budget. In der häuslichen Pflege kann der Entlastungsbetrag diese Eigenanteile in Tages- und Kurzzeitpflege decken. Das Pflegewohngeld in Nordrhein-Westfalen gilt dagegen nur für die dauerhafte vollstationäre Pflege.' },
      { q: 'Warum unterscheiden sich die Investitionskosten so stark?', a: 'Sie hängen vom Alter und Standard des Gebäudes, von Grundstücks- und Baupreisen, von Miete oder Eigentum und von der Förderung des Landes ab. Ein neues Haus in einer Großstadt liegt oft weit über dem Landesdurchschnitt, ein älteres, abbezahltes Haus auf dem Land darunter. Deshalb lohnt beim Vergleich zweier Heime der Blick auf genau diese Zeile.' },
    ],
    body: (h) => `
<h2>Investitionskosten je Land</h2>
${h.table(['Land', 'Juli 2026', 'Januar 2026', 'Anteil am Eigenanteil 1. Jahr', 'Anteil ab 4. Jahr'],
  sortiert.map((l) => { const k = kosten(l), v = kosten(l, 'vorher'); return [h.a(`pflegeheim-kosten-${SLUG[l]}`, LAND_NAME[l].de), h.eur(k.invest), h.eur(v.invest), h.pct(k.invest / k.mit15, 0), h.pct(k.invest / heimMonat(k, 37).eigenanteil, 0)]; }),
  `vdek, Durchschnitt je Land; Bund ${h.eur(b.invest)} (Januar ${h.eur(bv.invest)}).`, ['l', 'r', 'r', 'r', 'r'])}
<p>Zwischen dem teuersten und dem günstigsten Land liegen ${h.eur(kosten(hoch).invest - kosten(tief).invest)} im Monat, über vier Jahre ${h.eur((kosten(hoch).invest - kosten(tief).invest) * 48)}. Anders als beim Pflegeanteil, der sich in einem halben Jahr teils um mehr als hundert Euro bewegt hat, sind die Investitionskosten vergleichsweise stabil; im Bundesschnitt stiegen sie zwischen Januar und Juli 2026 um ${h.eur(b.invest - bv.invest)}.</p>

<h2>Was das Gesetz erlaubt</h2>
<p>Die Länder sind für eine ausreichende pflegerische Infrastruktur zuständig und regeln die Förderung der Einrichtungen selbst (${h.src('sgb11_9', '§ 9 SGB XI')}). Was diese Förderung nicht deckt, darf das Heim den Bewohnern gesondert in Rechnung stellen; bei geförderten Heimen braucht das die Zustimmung der Landesbehörde, nicht geförderte Heime müssen die Berechnung nur mitteilen (${h.src('sgb11_82', '§ 82 Abs. 3 und 4 SGB XI')}). Im Heimvertrag erscheinen die Investitionskosten als eigene Zeile. Steigen sie, gelten die Regeln für Entgelterhöhungen: schriftliche Begründung, und Investitionen nur, soweit sie notwendig und nicht öffentlich gefördert sind (${h.src('wbvg9', '§ 9 WBVG')}).</p>
<!--mini:reichweite-->

<h2>Warum der Posten mit der Zeit an Gewicht gewinnt</h2>
<p>Der Leistungszuschlag der Pflegekasse senkt nur den Pflegeanteil. Im ersten Jahr machen die Investitionskosten deshalb im Bundesschnitt ${h.pct(anteil1, 0)} des Eigenanteils aus, ab dem vierten Jahr ${h.pct(anteil4, 0)}. In Ländern mit hohen Investitionskosten wie ${h.a('pflegeheim-kosten-nordrhein-westfalen', 'Nordrhein-Westfalen')} oder ${h.a('pflegeheim-kosten-bremen', 'Bremen')} ist das noch ausgeprägter. Wer langfristig plant, sollte bei der Heimwahl darum die Investitionskosten über die ganze erwartete Dauer besonders genau vergleichen; im Rechner lassen sie sich über den eigenen EEE und die Rechnung nachvollziehen.</p>

<h2>Zwei Heime in derselben Stadt</h2>
<p>Ein Rechenbeispiel zeigt, warum die Zeile so wichtig ist. Zwei Heime verlangen denselben Pflegeanteil und dieselbe Unterkunft. Das erste ist ein älteres Haus mit Investitionskosten von ${h.eur(400)} im Monat, das zweite ein Neubau mit ${h.eur(750)}. Im ersten Jahr zahlt die Familie im Neubau ${h.eur(350)} mehr im Monat, im vierten Jahr ebenfalls ${h.eur(350)}, denn der Zuschlag gleicht hier nichts aus. Über vier Jahre sind das ${h.eur(350 * 48)}. Über die Qualität der Pflege sagt der Betrag dagegen nur wenig aus; er bildet vor allem das Gebäude und seine Finanzierung ab. Ein modernes Einzelzimmer mit eigenem Bad kann diesen Unterschied wert sein, muss es aber nicht.</p>
<p>Gerade für Familien, deren Angehöriger voraussichtlich lange im Heim lebt, ist das der Posten mit der größten Hebelwirkung über die Jahre. Wer zwischen zwei Häusern in gleicher Lage schwankt, sollte deshalb nicht nur auf den Eigenanteil im ersten Monat schauen, sondern auf die Summe über die erwartete Aufenthaltsdauer. Der Pflegeheim-Rechner rechnet mit dem Landesschnitt; mit dem eigenen EEE und der Rechnung des Heims lässt sich der genaue Betrag nachvollziehen.</p>

<h2>Hilfe für Bewohner mit wenig Geld</h2>
<p>Einige Länder unterstützen bedürftige Bewohner gezielt bei den Investitionskosten. In Nordrhein-Westfalen übernimmt das Pflegewohngeld diesen Teil, wenn Einkommen und Vermögen nicht reichen, ab Pflegegrad 2 bei dauerhafter vollstationärer Pflege (${h.src('vzNrwPflegewohngeld', 'Verbraucherzentrale NRW')}). Wo es keine solche Leistung gibt, gehören die Investitionskosten zu dem, was das Sozialamt im Rahmen der ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')} übernimmt, sobald das Vermögen bis auf ${h.eur(P.sozialhilfe.schonvermoegen)} aufgebraucht ist.</p>

<h2>Beim Heimvergleich fragen</h2>
<ul>
<li>Wie hoch sind die Investitionskosten im Monat, und seit wann gilt der Betrag?</li>
<li>Ist das Heim nach Landesrecht gefördert, und sind Erhöhungen angekündigt, etwa wegen einer Sanierung?</li>
<li>Gibt es Unterschiede zwischen Einzel- und Doppelzimmer?</li>
<li>Kommt in Ihrem Land eine Hilfe zu den Investitionskosten in Betracht, und erfüllt das Heim die Voraussetzungen dafür?</li>
<li>Wie haben sich die Investitionskosten in den letzten Jahren entwickelt? Eine kurze Antwort des Heims zeigt, ob mit baldigen Erhöhungen zu rechnen ist.</li>
</ul>
`,
  },
  en: {
    slug: 'investment-costs',
    nav: 'Investment costs',
    card: `What residents pay for the building: ${EN.eur(kosten(tief).invest)} to ${EN.eur(kosten(hoch).invest)} a month depending on the state, never subsidised.`,
    title: 'Investitionskosten 2026: Care Home Building Costs in Germany',
    description: `German care home investment costs 2026: national average ${EN.eur(b.invest)} a month, from ${EN.eur(kosten(tief).invest)} in ${LAND_NAME[tief].en} to ${EN.eur(kosten(hoch).invest)} in ${LAND_NAME[hoch].en} (vdek); who pays them.`,
    h1: 'Investment costs: the part of the bill that pays for the building',
    intro: 'Residents help pay for building, furnishing and maintaining a care home unless the state funds it. Why the item varies so much and never gets smaller.',
    resume: `Investment costs (Investitionskosten) are the part of German care home fees that pays for the building: construction, modernisation, furnishings, rent or lease. Where public funding from the federal state does not cover them, the home may bill residents separately (section 82(3) of Book XI of the Social Code); funded homes need the state authority’s approval to do so. The states are responsible for care infrastructure (section 9) but fund it very differently, and the figures show it: on 1 July 2026 the national average was ${EN.eur(b.invest)} a month (vdek), ranging from ${EN.eur(kosten(tief).invest)} in ${LAND_NAME[tief].en} to ${EN.eur(kosten(hoch).invest)} in ${LAND_NAME[hoch].en}. The long-term care fund never subsidises investment costs, not even through the supplement. Their share of the co-payment therefore grows over time, from ${EN.pct(anteil1, 0)} in year one to ${EN.pct(anteil4, 0)} from year four. Some states help residents in need, for example North Rhine-Westphalia with its Pflegewohngeld.`,
    faqs: [
      { q: 'Why do residents pay for the building at all?', a: 'Because long-term care insurance only covers care-related costs and the states do not fully fund buildings. Whatever public funding leaves uncovered may be billed separately under section 82(3) SGB XI. The vdek wants the states to take over these costs in full, which together with training costs would save residents several hundred euros a month on average.' },
      { q: 'Do investment costs fall over time?', a: `No. Unlike the care part, which the fund subsidises more each year, investment costs stay the same throughout the stay unless the home changes them. Over four years they add up to ${EN.eur(vierJahreInvest)} at the national average. Increases must be justified, and investments may only be passed on where they are necessary.` },
      { q: 'Is there help with investment costs?', a: `In North Rhine-Westphalia the Pflegewohngeld covers them when income and savings are insufficient, with protected savings of ${EN.eur(PW.schonbetrag)} for a single person. Other states have their own rules or none. Where there is no state help and money runs out, social assistance for care from the welfare office also covers this part.` },
      { q: 'Are investment costs charged in short-term or day care too?', a: 'Yes. Short-term and day care facilities also bill investment costs separately, and the care fund does not cover them from its budgets there either. For people cared for at home, the relief amount can pay these own shares in day and short-term care. NRW’s Pflegewohngeld, by contrast, only applies to permanent residential care.' },
      { q: 'Why do investment costs differ so much between homes?', a: 'They depend on the age and standard of the building, land and construction prices, whether the home rents or owns, and state funding. A new city-centre home is often far above the state average, an older, paid-off rural home below it. When comparing homes for a parent, this line deserves a close look.' },
    ],
    body: (h) => `
<h2>Investment costs by state</h2>
${h.table(['State', 'July 2026', 'January 2026', 'Share of co-payment, year 1', 'Share from year 4'],
  sortiert.map((l) => { const k = kosten(l), v = kosten(l, 'vorher'); return [h.a(`pflegeheim-kosten-${SLUG[l]}`, LAND_NAME[l].en), h.eur(k.invest), h.eur(v.invest), h.pct(k.invest / k.mit15, 0), h.pct(k.invest / heimMonat(k, 37).eigenanteil, 0)]; }),
  `vdek state averages; national ${h.eur(b.invest)} (January ${h.eur(bv.invest)}).`, ['l', 'r', 'r', 'r', 'r'])}
<p>The most and least expensive states are ${h.eur(kosten(hoch).invest - kosten(tief).invest)} a month apart, ${h.eur((kosten(hoch).invest - kosten(tief).invest) * 48)} over four years. Unlike the care part, which moved by more than a hundred euros in six months in some states, investment costs are fairly stable; the national average rose by ${h.eur(b.invest - bv.invest)} between January and July 2026.</p>

<h2>What the law allows</h2>
<p>The states are responsible for adequate care infrastructure and set their own funding rules (${h.src('sgb11_9', 'section 9 SGB XI')}). Whatever that funding does not cover, the home may bill separately; funded homes need the state authority’s consent, unfunded homes only have to notify it (${h.src('sgb11_82', 'section 82(3) and (4) SGB XI')}). The contract shows investment costs as a separate line. Increases follow the rules for fee rises: written reasons, and investments only where necessary and not publicly funded (${h.src('wbvg9', 'section 9 WBVG')}).</p>
<!--mini:reichweite-->

<h2>Why the item weighs more over time</h2>
<p>The care fund’s supplement only reduces the care part. In year one investment costs are ${h.pct(anteil1, 0)} of the co-payment at the national average, from year four ${h.pct(anteil4, 0)}. In states with high investment costs such as ${h.a('pflegeheim-kosten-nordrhein-westfalen', 'North Rhine-Westphalia')} or ${h.a('pflegeheim-kosten-bremen', 'Bremen')} this is even more marked. For long stays, compare this item carefully when choosing a home, ideally over the whole expected length of stay.</p>

<h2>Two homes in the same city</h2>
<p>A worked example shows why this line matters. Two homes charge the same care part and the same board and lodging. The first is an older building with investment costs of ${h.eur(400)} a month, the second a new building at ${h.eur(750)}. In year one the family pays ${h.eur(350)} a month more in the new home, and in year four still ${h.eur(350)}, because the supplement offsets nothing here. Over four years that is ${h.eur(350 * 48)}. The figure says very little about the actual quality of care; it mainly reflects the building and how it was financed. A modern single room with its own bathroom may be worth the difference, but it does not have to be.</p>
<p>For a parent who is likely to stay a long time, this is the item with the greatest effect over the years. If you are torn between two homes in a similar location, compare the total over the expected stay rather than the first month’s co-payment. The care home calculator uses the state average; with the home’s own EEE and its bill you can work out the exact figure.</p>

<h2>Help for residents with little money</h2>
<p>Some states support residents in need with investment costs. In North Rhine-Westphalia the Pflegewohngeld covers this part when income and savings are not enough, from grade 2 in permanent residential care (${h.src('vzNrwPflegewohngeld', 'Consumer Centre NRW')}). Where no such benefit exists, investment costs are part of what the welfare office covers under ${h.a('hilfe-zur-pflege', 'social assistance for care')} once savings are down to ${h.eur(P.sozialhilfe.schonvermoegen)}.</p>

<h2>Questions to ask when comparing homes</h2>
<ul>
<li>How much are the monthly investment costs, and since when has that figure applied?</li>
<li>Is the home state-funded, and are increases announced, for example for renovation?</li>
<li>Do single and double rooms differ?</li>
<li>Is state help with investment costs available, and does the home qualify?</li>
<li>How have investment costs developed over recent years? A short answer from the home shows whether increases are likely soon.</li>
</ul>
`,
  },
});

const SLUG: Record<string, string> = { BW: 'baden-wuerttemberg', BY: 'bayern', BE: 'berlin', BB: 'brandenburg', HB: 'bremen', HH: 'hamburg', HE: 'hessen', MV: 'mecklenburg-vorpommern', NI: 'niedersachsen', NW: 'nordrhein-westfalen', RP: 'rheinland-pfalz', SL: 'saarland', SN: 'sachsen', ST: 'sachsen-anhalt', SH: 'schleswig-holstein', TH: 'thueringen' };
