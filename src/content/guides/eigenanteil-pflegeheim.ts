import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Eine Heimrechnung im Bundesschnitt, zerlegt; Rechenbeispiel mit eigenem EEE von 2.300 € im 14. Monat. */
const b = kosten('BUND');
const m1 = heimMonat(b, 1);
const eigen = heimMonat(b, 14, 3, 2300);
const W = P.heimvertrag.erhoehung_fruehestens_wochen;

export default defineGuide({
  id: 'eigenanteil-pflegeheim',
  group: 'heim',
  order: 20,
  mini: 'eeeZuschlag',
  related: ['pflegeheim-kosten', 'leistungszuschlag', 'investitionskosten', 'hilfe-zur-pflege', 'pflegeheim-kosten-wer-zahlt', 'pflegeheim-kosten-berlin'],
  sources: ['sgb11_84', 'sgb11_43', 'sgb11_43c', 'wbvg9', 'vdek2607'],
  de: {
    slug: 'eigenanteil-pflegeheim',
    nav: 'Eigenanteil Pflegeheim',
    card: 'Die Heimrechnung Zeile für Zeile: EEE, Ausbildungsumlage, Unterkunft, Verpflegung, Investitionskosten und Zuschlag.',
    title: 'Eigenanteil Pflegeheim 2026: die Heimrechnung erklärt',
    description: `Eigenanteil im Pflegeheim 2026: Bundesschnitt ${DE.eur(b.mit15)} im ersten Jahr (vdek). Was EEE, Umlage, Unterkunft und Investitionskosten sind, wie Sie nachrechnen.`,
    h1: 'Eigenanteil im Pflegeheim: die Rechnung Zeile für Zeile',
    intro: 'Was auf der Heimrechnung steht, warum der Betrag für jeden Pflegegrad gleich ist und wie Sie mit Ihrem Heimvertrag selbst nachrechnen.',
    resume: `Der Eigenanteil im Pflegeheim ist der Teil der monatlichen Heimkosten, den die Bewohnerin selbst zahlt, nachdem die Pflegekasse ihren Betrag nach § 43 SGB XI und den Leistungszuschlag nach § 43c übernommen hat. Er besteht aus drei Teilen. Erstens dem einrichtungseinheitlichen Eigenanteil (EEE) für Pflege, Betreuung und Behandlungspflege, einschließlich der Umlage für die Pflegeausbildung; er ist im selben Heim für alle Grade von 2 bis 5 gleich hoch (§ 84 Abs. 2 SGB XI). Zweitens Unterkunft und Verpflegung. Drittens den Investitionskosten für Gebäude und Ausstattung. Im Bundesschnitt waren das am 1. Juli 2026 ${DE.eur(b.eee)}, ${DE.eur(b.uv)} und ${DE.eur(b.invest)}, zusammen vor Zuschlag ${DE.eur(b.eee + b.uv + b.invest)} (vdek). Nur der EEE wird bezuschusst: im ersten Jahr mit 15 Prozent, so dass ${DE.eur(m1.eigenanteil)} bleiben. Erhöht das Heim seine Preise, muss es das schriftlich begründen; der neue Betrag gilt frühestens ${W} Wochen nach Zugang der Mitteilung (§ 9 WBVG).`,
    faqs: [
      { q: 'Was bedeutet EEE auf der Heimrechnung?', a: 'EEE steht für einrichtungseinheitlicher Eigenanteil. Es ist der Betrag für die pflegebedingten Kosten, der nach Abzug der Leistung der Pflegekasse übrig bleibt, und er ist für alle Bewohner der Pflegegrade 2 bis 5 im selben Heim gleich hoch (§ 84 Abs. 2 SGB XI). Auf diesen Betrag gibt die Pflegekasse den Leistungszuschlag, der mit der Aufenthaltsdauer steigt.' },
      { q: 'Steigt der Eigenanteil, wenn meine Mutter einen höheren Pflegegrad bekommt?', a: 'Nein. Ein höherer Pflegegrad erhöht nur den Betrag, den die Pflegekasse an das Heim zahlt. Der EEE bleibt für alle Grade von 2 bis 5 derselbe. Deshalb verlangen manche Heime, dass ein Antrag auf Höherstufung gestellt wird: Er nützt dem Heim, schadet der Familie aber nicht. Bei Pflegegrad 1 gilt ein eigener Preis ohne Zuschlag.' },
      { q: 'Wie früh muss ein Heim eine Preiserhöhung ankündigen?', a: `Das Heim muss die Erhöhung schriftlich mitteilen, den Zeitpunkt nennen und begründen, welche Kosten gestiegen sind, mit einer Gegenüberstellung von alten und neuen Beträgen. Das höhere Entgelt ist frühestens ${W} Wochen nach Zugang einer ausreichend begründeten Mitteilung geschuldet (§ 9 Abs. 2 WBVG). Bewohner können die Unterlagen einsehen.` },
      { q: 'Welche Kosten kommen zum Eigenanteil noch hinzu?', a: 'Zusatzleistungen, die gesondert vereinbart werden, etwa ein Einzelzimmerzuschlag oder besondere Verpflegung, dazu persönliche Ausgaben für Friseur, Fußpflege, Kleidung, Telefon und Zuzahlungen zu Medikamenten. Wer Hilfe zur Pflege bezieht, erhält für solche Ausgaben einen Barbetrag und eine Bekleidungspauschale vom Sozialamt (§ 27b SGB XII).' },
      { q: 'Zählen die Monate in einem früheren Heim beim Zuschlag mit?', a: 'Ja. Für die Stufe des Leistungszuschlags zählen alle Monate, in denen die Person Leistungen der vollstationären Pflege nach § 43 SGB XI bezogen hat, auch in einem anderen Heim oder in einem anderen Bundesland. Ein Umzug setzt die Zählung nicht zurück. Geben Sie dem neuen Heim und der Pflegekasse das Einzugsdatum des ersten Heims an.' },
      { q: 'Wie finde ich den EEE eines bestimmten Heims?', a: 'Er steht in der Preisliste und im Heimvertrag; viele Heime veröffentlichen ihre Entgelte auch auf der eigenen Seite. Fragen Sie vor dem Einzug ausdrücklich nach dem aktuell gültigen EEE und nach angekündigten Erhöhungen. Tragen Sie den Wert in den Pflegeheim-Rechner ein, dann rechnet er mit Ihrem Haus statt mit dem Landesdurchschnitt.' },
    ],
    body: (h) => `
<h2>Eine Heimrechnung im Bundesschnitt</h2>
${h.table(['Zeile', 'Betrag', 'Wer zahlt'], [
  ['Pflegesatz für die Pflege (Grad 3, Beispiel)', `EEE + ${h.eur(P.vollstationaer['3'])}`, 'Kasse und Bewohner'],
  ['davon Leistung der Pflegekasse (§ 43)', h.eur(P.vollstationaer['3']), 'Pflegekasse'],
  ['einrichtungseinheitlicher Eigenanteil (EEE)', h.eur(b.eee), 'Bewohner, abzüglich Zuschlag'],
  ['darin Ausbildungsumlage', h.eur(b.ausbildung), 'Bewohner (Teil des EEE)'],
  ['Leistungszuschlag im 1. Jahr (15 %)', `minus ${h.eur(m1.zuschlag)}`, 'Pflegekasse'],
  ['Unterkunft und Verpflegung', h.eur(b.uv), 'Bewohner'],
  ['Investitionskosten', h.eur(b.invest), 'Bewohner, Ausnahmen nach Landesrecht'],
  ['Eigenanteil', h.eur(m1.eigenanteil), 'Bewohner'],
], 'vdek-Bundesschnitt am 1. Juli 2026, erstes Aufenthaltsjahr.', ['l', 'r', 'l'])}
<p>Die Pflegekasse zahlt also zweimal: einen festen Betrag je Grad und den Zuschlag auf den EEE. Beides fließt direkt an das Heim, die Bewohnerin sieht auf ihrer Rechnung nur noch den Rest. Seit dem 1. Juli 2026 berechnet die Kasse den Zuschlag selbst, auf Grundlage der Angaben des Heims (${h.src('sgb11_43c', '§ 43c SGB XI')}).</p>

<h2>Warum der EEE für alle Grade gleich ist</h2>
<p>Früher stieg der Eigenanteil mit dem Pflegegrad, und Familien zögerten, einen höheren Grad zu beantragen. Seit 2017 schreibt das Gesetz vor, dass jedes Heim für die Grade 2 bis 5 einen einheitlichen Eigenanteil bildet (${h.src('sgb11_84', '§ 84 Abs. 2 SGB XI')}). Der Pflegesatz selbst steigt mit dem Grad, aber der Mehrbetrag wird vollständig von der Kasse getragen, weil ihr Leistungsbetrag nach § 43 entsprechend höher ist. Für die Familie gilt deshalb: Eine Höherstufung im Heim kostet nichts, und sie bringt auch nichts außer einer genaueren Einstufung, die etwa für Hilfsmittel wichtig sein kann.</p>

<h2>Selbst nachrechnen</h2>
<p>Mit dem Heimvertrag lässt sich der Eigenanteil leicht prüfen: EEE mal (1 minus Zuschlagssatz), plus Unterkunft, Verpflegung und Investitionskosten. Ein Beispiel: Ein Heim mit ${h.eur(2300)} EEE, im 14. Aufenthaltsmonat. Der Zuschlag beträgt dann ${h.pct(eigen.satz, 0)}, also ${h.eur(eigen.zuschlag)}; vom EEE bleiben ${h.eur(eigen.eeeNachZuschlag)}. Der Rechner unten nimmt die übrigen Posten aus Ihrer Rechnung.</p>
<!--mini:zuschlagVerlauf-->

<h2>Fünf Fehler, die auf Heimrechnungen vorkommen</h2>
<ol>
<li><strong>Zuschlag nach dem falschen Monat.</strong> Der Zuschlag richtet sich nach den Monaten, in denen die Bewohnerin Leistungen der vollstationären Pflege bezog, angebrochene Monate eingerechnet. Ein Wechsel des Heims setzt die Zählung nicht zurück. Prüfen Sie nach dem 12., 24. und 36. Monat, ob der neue Satz angewendet wurde.</li>
<li><strong>Kurzzeitpflege vor dem Einzug nicht mitgezählt.</strong> Monate in der Kurzzeitpflege zählen nicht als vollstationäre Dauerpflege nach § 43; der Zuschlag beginnt mit dem Dauerplatz. Wer aber direkt im selben Haus bleibt, sollte das Datum des Wechsels auf der Rechnung kontrollieren.</li>
<li><strong>Erhöhung ohne ausreichende Begründung.</strong> Fehlt die Gegenüberstellung von alten und neuen Beträgen, ist das höhere Entgelt noch nicht geschuldet.</li>
<li><strong>Zusatzleistungen ohne Vereinbarung.</strong> Was nicht im Vertrag steht, darf das Heim nicht einfach berechnen.</li>
<li><strong>Abwesenheit falsch abgerechnet.</strong> Bei Krankenhausaufenthalten gelten Abschläge nach dem Rahmenvertrag des Landes; fragen Sie nach, wenn die Rechnung im Monat einer Klinikwoche unverändert bleibt.</li>
</ol>

<h2>Unterkunft und Verpflegung</h2>
<p>Dieser Teil deckt Zimmer, Reinigung, Wäsche und Mahlzeiten. Er wird nie bezuschusst, auch nicht nach Jahren. Zwischen den Ländern liegen hier mehr als ${h.eur(400)} im Monat: Nordrhein-Westfalen ist am teuersten, Niedersachsen am günstigsten. Der Betrag hängt auch vom Zimmer ab; ein Einzelzimmer kostet in vielen Häusern einen Zuschlag. Bei einem längeren Krankenhausaufenthalt oder Urlaub muss das Heim Abwesenheitsregeln anwenden, die im Rahmenvertrag des Landes stehen.</p>

<h2>Investitionskosten</h2>
<p>Mit den ${h.a('investitionskosten', 'Investitionskosten')} finanziert das Heim Bau, Modernisierung und Instandhaltung. Eigentlich sollen die Länder die Pflegeinfrastruktur fördern; wo sie es wenig tun, landen die Kosten bei den Bewohnern. Einige Länder zahlen bedürftigen Bewohnern eine Hilfe zu diesen Kosten, etwa das Pflegewohngeld in ${h.a('pflegeheim-kosten-nordrhein-westfalen', 'Nordrhein-Westfalen')}. Erhöhungen wegen Investitionen sind übrigens nur zulässig, soweit sie notwendig und nicht durch öffentliche Förderung gedeckt sind (${h.src('wbvg9', '§ 9 Abs. 1 WBVG')}).</p>

<h2>Wenn der Eigenanteil nicht bezahlt werden kann</h2>
<p>Reichen Rente und Erspartes nicht, wird das Vermögen bis auf ${h.eur(P.sozialhilfe.schonvermoegen)} eingesetzt; danach übernimmt das Sozialamt die Lücke als ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')}. Kinder zahlen erst ab einem eigenen Jahreseinkommen von ${h.eur(P.sozialhilfe.jahreseinkommensgrenze_kinder)} mit. Wer was in welcher Reihenfolge trägt, steht unter ${h.a('pflegeheim-kosten-wer-zahlt', 'Pflegeheim: wer zahlt')}.</p>
`,
  },
  en: {
    slug: 'care-home-co-payment',
    nav: 'Care home co-payment',
    card: 'The care home bill line by line: EEE, training levy, board, lodging, investment costs and the supplement.',
    title: 'Eigenanteil Pflegeheim 2026: German Care Home Bill Explained',
    description: `German care home co-payment (Eigenanteil) 2026: national average ${EN.eur(b.mit15)} in year one (vdek). What EEE, levy, board and investment costs are and how to check.`,
    h1: 'The German care home co-payment, line by line',
    intro: 'What the care home bill shows, why the amount is the same for every care grade and how to check it yourself with the contract.',
    resume: `The care home co-payment (Eigenanteil) is the part of the monthly fees a German care home resident pays personally, after the long-term care fund has paid its fixed amount under section 43 of Book XI of the Social Code and the supplement under section 43c. It has three parts. First, the uniform care co-payment (einrichtungseinheitlicher Eigenanteil, EEE) for care, supervision and medical treatment care, including the levy for nurse training; it is the same for every resident from grade 2 to 5 in a given home (section 84(2)). Second, board and lodging. Third, investment costs for the building and furnishings. On 1 July 2026 the national averages were ${EN.eur(b.eee)}, ${EN.eur(b.uv)} and ${EN.eur(b.invest)}, together ${EN.eur(b.eee + b.uv + b.invest)} before the supplement (vdek). Only the EEE is subsidised, by 15 percent in year one, leaving ${EN.eur(m1.eigenanteil)}. If a home raises prices it must justify the increase in writing, and the new amount applies at the earliest ${W} weeks after the notice arrives (section 9 of the Residential and Care Contracts Act, WBVG).`,
    faqs: [
      { q: 'What does EEE mean on a German care home bill?', a: 'EEE stands for einrichtungseinheitlicher Eigenanteil, the uniform care co-payment. It is what remains of the care costs after the care fund’s payment and is the same for all residents from grade 2 to 5 in the same home (section 84(2) SGB XI). The fund’s supplement, which grows with the length of stay, is applied to this amount.' },
      { q: 'Will the co-payment rise if my mother is moved to a higher grade?', a: 'No. A higher grade only increases what the care fund pays the home; the EEE stays the same for grades 2 to 5. That is why some homes ask families to apply for a higher grade: it helps the home and does not cost the family anything. Grade 1 has its own price without a supplement.' },
      { q: 'How much notice must a home give before raising prices?', a: `The home must announce the increase in writing, state the date and explain which costs rose, comparing old and new amounts. The higher fee is owed at the earliest ${W} weeks after a sufficiently reasoned notice arrives (section 9(2) WBVG). Residents and their representatives may inspect the supporting documents.` },
      { q: 'What costs come on top of the co-payment?', a: 'Separately agreed extras such as a single-room surcharge or special meals, plus personal spending on the hairdresser, foot care, clothes, phone and prescription co-payments. Residents receiving social assistance for care get a personal allowance and a clothing allowance from the welfare office for such items (section 27b SGB XII).' },
      { q: 'Where do I find a specific home’s EEE?', a: 'In the price list and the contract; many homes also publish their fees online. Before moving in, ask explicitly for the EEE currently in force and any increases already announced. Enter it in the care home calculator so it uses your home’s figure instead of the state average.' },
    ],
    body: (h) => `
<h2>A care home bill at national averages</h2>
${h.table(['Line', 'Amount', 'Who pays'], [
  ['Care rate (grade 3, example)', `EEE + ${h.eur(P.vollstationaer['3'])}`, 'fund and resident'],
  ['of which care fund payment (s. 43)', h.eur(P.vollstationaer['3']), 'care fund'],
  ['Uniform care co-payment (EEE)', h.eur(b.eee), 'resident, minus supplement'],
  ['of which training levy', h.eur(b.ausbildung), 'resident (part of the EEE)'],
  ['Supplement in year 1 (15%)', `minus ${h.eur(m1.zuschlag)}`, 'care fund'],
  ['Board and lodging', h.eur(b.uv), 'resident'],
  ['Investment costs', h.eur(b.invest), 'resident, exceptions under state law'],
  ['Co-payment', h.eur(m1.eigenanteil), 'resident'],
], 'vdek national average on 1 July 2026, first year of residence.', ['l', 'r', 'l'])}
<p>The fund pays twice: a fixed amount by grade and the supplement on the EEE. Both go straight to the home, and the resident only sees the remainder. Since 1 July 2026 the fund calculates the supplement itself from information supplied by the home (${h.src('sgb11_43c', 'section 43c SGB XI')}).</p>

<h2>Why the EEE is the same for every grade</h2>
<p>The co-payment used to rise with the care grade, and families hesitated to ask for a higher grade. Since 2017 the law requires every home to set one uniform co-payment for grades 2 to 5 (${h.src('sgb11_84', 'section 84(2) SGB XI')}). The care rate itself rises with the grade, but the difference is fully covered by the fund, whose payment under section 43 rises accordingly. A higher grade in a home therefore costs the family nothing, although a more accurate grade can matter for aids and equipment.</p>

<h2>Checking it yourself</h2>
<p>With the contract the co-payment is easy to check: EEE times (1 minus the supplement rate), plus board, lodging and investment costs. Example: a home with an EEE of ${h.eur(2300)} in the 14th month of residence. The supplement is then ${h.pct(eigen.satz, 0)}, or ${h.eur(eigen.zuschlag)}, leaving ${h.eur(eigen.eeeNachZuschlag)} of the EEE. The calculator below adds the other items from your bill.</p>
<!--mini:zuschlagVerlauf-->

<h2>Five mistakes seen on care home bills</h2>
<ol>
<li><strong>Supplement for the wrong month.</strong> It depends on the months in which the resident received long-term residential care, part months included. Changing homes does not reset the count. After months 12, 24 and 36 check that the new rate was applied.</li>
<li><strong>Short-term care counted wrongly.</strong> Months of short-term care do not count as long-term care under section 43; the supplement starts with the permanent place. If your parent stayed in the same home, check the date of the switch on the bill.</li>
<li><strong>Increase without proper reasons.</strong> Without a comparison of old and new amounts the higher fee is not yet owed.</li>
<li><strong>Extras without agreement.</strong> The home may not charge for services not in the contract.</li>
<li><strong>Absence billed wrongly.</strong> Hospital stays trigger reductions under the state framework agreement; ask if the bill for a month with a hospital week is unchanged.</li>
</ol>

<h2>Board and lodging</h2>
<p>This covers the room, cleaning, laundry and meals and is never subsidised. Between states it differs by more than ${h.eur(400)} a month: North Rhine-Westphalia is the most expensive, Lower Saxony the cheapest. It also depends on the room; many homes charge extra for a single room. For hospital stays or holidays, absence rules in the state’s framework agreement apply.</p>

<h2>Investment costs</h2>
<p>${h.a('investitionskosten', 'Investment costs')} finance construction, modernisation and maintenance. The states are supposed to fund care infrastructure; where they do little, residents pay. Some states help residents in need, such as the Pflegewohngeld in ${h.a('pflegeheim-kosten-nordrhein-westfalen', 'North Rhine-Westphalia')}. Increases due to investment are, moreover, only allowed where necessary and not covered by public funding (${h.src('wbvg9', 'section 9(1) WBVG')}).</p>

<h2>If the co-payment cannot be paid</h2>
<p>If pension and savings are not enough, savings are used down to ${h.eur(P.sozialhilfe.schonvermoegen)}; the welfare office then covers the gap as ${h.a('hilfe-zur-pflege', 'social assistance for care')}. Children only contribute if their own annual income exceeds ${h.eur(P.sozialhilfe.jahreseinkommensgrenze_kinder)}. See ${h.a('pflegeheim-kosten-wer-zahlt', 'who pays for a care home')}. For families abroad, it helps to have the home send bills and price notices to an email address you check, so increases and missing supplements are noticed in time. A short monthly check against the calculator takes two minutes and catches most errors.</p>
`,
  },
});
