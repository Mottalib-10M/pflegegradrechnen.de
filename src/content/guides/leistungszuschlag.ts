import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, heimVerlauf, rangliste, LAND_NAME } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Zuschlag je Stufe im Bund und je Land aus dem Motor; Summe der Zuschläge über vier Jahre. */
const Z = P.zuschlag;
const b = kosten('BUND');
const stufen = Z.ab_monat.map((m) => heimMonat(b, m));
const vierJahre = heimVerlauf(b, 1, 48).monate.reduce((s, m) => s + m.zuschlag, 0);
const liste = rangliste();
const maxZ = liste.reduce((a, l) => (kosten(l).eee > kosten(a).eee ? l : a), liste[0]);
const verlauf = heimVerlauf(b, 1, 48);
const minZ = liste.reduce((a, l) => (kosten(l).eee < kosten(a).eee ? l : a), liste[0]);

export default defineGuide({
  id: 'leistungszuschlag',
  group: 'heim',
  order: 30,
  mini: 'zuschlagVerlauf',
  related: ['eigenanteil-pflegeheim', 'pflegeheim-kosten', 'investitionskosten', 'hilfe-zur-pflege', 'pflegeheim-kosten-berlin', 'pflegeheim-kosten-rheinland-pfalz'],
  sources: ['sgb11_43c', 'sgb11_43', 'sgb11_84', 'vdek2607'],
  de: {
    slug: 'leistungszuschlag',
    nav: 'Leistungszuschlag',
    card: 'Der Zuschuss der Pflegekasse zum Eigenanteil: 15, 30, 50 und 75 Prozent, wie die Monate zählen und was er im eigenen Land bringt.',
    title: 'Leistungszuschlag Pflegeheim 2026: 15 bis 75 % Zuschuss',
    description: `Leistungszuschlag 2026 nach § 43c SGB XI: ${Z.stufen.map((s) => DE.pct(s, 0)).join(', ')} des Pflegeanteils je nach Heimjahr, im Bundesschnitt ${DE.eur(stufen[0].zuschlag)} bis ${DE.eur(stufen[3].zuschlag)} pro Monat (vdek).`,
    h1: 'Leistungszuschlag: wie die Pflegekasse den Eigenanteil senkt',
    intro: 'Je länger jemand im Heim lebt, desto mehr vom Pflegeanteil übernimmt die Kasse. Wie die Stufen funktionieren, wer rechnet und was der Zuschlag in Euro bedeutet.',
    resume: `Pflegebedürftige der Grade 2 bis 5 im Pflegeheim erhalten von ihrer Pflegekasse einen Leistungszuschlag auf den pflegebedingten Eigenanteil (§ 43c SGB XI). Er beträgt ${DE.pct(Z.stufen[0], 0)} in den ersten zwölf Monaten, ${DE.pct(Z.stufen[1], 0)} ab dem 13. Monat, ${DE.pct(Z.stufen[2], 0)} ab dem 25. und ${DE.pct(Z.stufen[3], 0)} ab dem 37. Monat. Monate, in denen nur an einigen Tagen Heimpflege bezogen wurde, zählen voll. Der Zuschlag wirkt nur auf den einrichtungseinheitlichen Eigenanteil (EEE) einschließlich Ausbildungsumlage, nicht auf Unterkunft, Verpflegung und Investitionskosten. Im Bundesschnitt des vdek vom 1. Juli 2026 sind das ${DE.eur(stufen[0].zuschlag)} im Monat im ersten Jahr und ${DE.eur(stufen[3].zuschlag)} ab dem vierten. Über die ersten vier Jahre summiert sich der Zuschlag auf rund ${DE.eur(vierJahre)}. Seit dem 1. Juli 2026 berechnet die Pflegekasse den Zuschlag selbst anhand der Angaben des Heims und zahlt ihn direkt an die Einrichtung; das Heim stellt nur den verbleibenden Eigenanteil in Rechnung. Pflegegrad 1 erhält keinen Zuschlag.`,
    faqs: [
      { q: 'Wie werden die Monate für den Leistungszuschlag gezählt?', a: 'Es zählen alle Monate, in denen die Person Leistungen der vollstationären Pflege nach § 43 SGB XI bezogen hat, auch angebrochene Monate (§ 43c Satz 5 SGB XI). Wer am 28. eines Monats einzieht, hat diesen Monat bereits als ersten Monat. Monate in einem früheren Heim zählen mit, Kurzzeitpflege nach § 42 dagegen nicht.' },
      { q: 'Muss ich den Leistungszuschlag beantragen?', a: 'Nein. Seit dem 1. Juli 2026 berechnet die Pflegekasse den Zuschlag auf Grundlage der Informationen des Heims selbst, zahlt ihn an die Einrichtung, und das Heim berechnet nur noch den Rest (§ 43c SGB XI). Prüfen Sie trotzdem nach dem 12., 24. und 36. Monat, ob die nächste Stufe auf der Rechnung angekommen ist.' },
      { q: 'Warum bringt der Zuschlag in manchen Ländern mehr als in anderen?', a: `Weil er ein Prozentsatz des Pflegeanteils ist, und der ist von Land zu Land verschieden. Am höchsten ist der EEE in ${LAND_NAME[maxZ].de} mit ${DE.eur(kosten(maxZ).eee)}, am niedrigsten in ${LAND_NAME[minZ].de} mit ${DE.eur(kosten(minZ).eee)}. Ab dem vierten Jahr übernimmt die Kasse dort ${DE.eur(kosten(maxZ).eee * Z.stufen[3])} beziehungsweise ${DE.eur(kosten(minZ).eee * Z.stufen[3])} im Monat.` },
      { q: 'Wie viel spart eine Bewohnerin durch den Zuschlag über vier Jahre?', a: `Im Bundesschnitt summieren sich die Zuschläge der Pflegekasse in den ersten vier Jahren auf rund ${DE.eur(vierJahre)}. Der Eigenanteil sinkt dadurch vom ersten zum vierten Jahr um ${DE.eur(stufen[0].eigenanteil - stufen[3].eigenanteil)} im Monat. In Ländern mit hohem Pflegeanteil ist die Ersparnis größer, in Ländern mit hohen Unterkunfts- und Investitionskosten kleiner.` },
      { q: 'Bekommt man den Zuschlag auch bei Pflegegrad 1?', a: `Nein. Der Leistungszuschlag gilt nur für die Pflegegrade 2 bis 5. Bei Pflegegrad 1 zahlt die Pflegekasse im Heim einen Zuschuss von ${DE.eur(P.vollstationaer['1'])} im Monat (§ 43 Abs. 3 SGB XI), und der Pflegesatz für diesen Grad wird vom Heim festgelegt. Wird später ein höherer Grad festgestellt, beginnt der Zuschlag.` },
    ],
    body: (h) => `
<h2>Die vier Stufen in Euro</h2>
${h.table(['Aufenthalt', 'Zuschlag', 'Zuschlag im Bundesschnitt', 'Pflegeanteil, der bleibt', 'Eigenanteil gesamt'],
  stufen.map((s, i) => [[`Monat 1 bis 12`, `Monat 13 bis 24`, `Monat 25 bis 36`, `ab Monat 37`][i], h.pct(s.satz, 0), h.eur(s.zuschlag), h.eur(s.eeeNachZuschlag), h.eur(s.eigenanteil)]),
  `vdek-Bundesschnitt am 1. Juli 2026, EEE ${h.eur(b.eee)}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Der Zuschlag wurde eingeführt, weil die Eigenanteile im Heim stark gestiegen waren und viele Bewohner nach wenigen Jahren auf Sozialhilfe angewiesen waren. Er senkt die Belastung umso stärker, je länger jemand im Heim lebt. Für die Familie bedeutet das: Die ersten zwei Jahre sind die teuersten, danach wird es spürbar leichter, aber nur beim Pflegeanteil (${h.src('sgb11_43c', '§ 43c SGB XI')}).</p>
<!--mini:eeeZuschlag-->

<h2>Ein Aufenthalt über vier Jahre</h2>
<p>Ein Rechenbeispiel mit dem Bundesschnitt zeigt, wie stark die Stufen wirken. Im ersten Jahr zahlt die Bewohnerin zusammen ${h.eur(verlauf.jahre[0])}, im zweiten ${h.eur(verlauf.jahre[1])}, im dritten ${h.eur(verlauf.jahre[2])} und im vierten ${h.eur(verlauf.jahre[3])}. Zwischen dem ersten und dem vierten Jahr liegen damit ${h.eur(verlauf.jahre[0] - verlauf.jahre[3])}, fast vollständig ein Verdienst des Zuschlags. Wer zu Beginn des Aufenthalts plant, wie lange Rente und Erspartes reichen, sollte genau diese Stufen einrechnen; ein Überschlag mit dem Betrag des ersten Monats unterschätzt die Reichweite deutlich. Der Pflegeheim-Rechner tut das automatisch, wenn Sie Rente und Vermögen eintragen.</p>
<p>Umgekehrt gilt: Steigen die Pflegesätze, trifft das neue Bewohner stärker. Eine Erhöhung des EEE um ${h.eur(100)} kostet im ersten Jahr ${h.eur(100 * (1 - Z.stufen[0]))} im Monat mehr, ab dem vierten Jahr nur ${h.eur(100 * (1 - Z.stufen[3]))}. Das erklärt, warum Familien mit einem Angehörigen, der schon lange im Heim lebt, Preiserhöhungen weniger spüren als Familien, die gerade einen Platz suchen.</p>
<h2>So sieht die Stufe auf der Rechnung aus</h2>
<p>Auf der monatlichen Heimrechnung steht der Pflegesatz für den Pflegegrad, davon abgezogen der Leistungsbetrag der Pflegekasse und der Leistungszuschlag, dann Unterkunft, Verpflegung und Investitionskosten. Achten Sie auf die Zeile mit dem Zuschlag: Ihr Prozentsatz muss zur Zahl der Monate passen. Steht nach dem 13. Monat noch 15 Prozent dort, fragen Sie beim Heim und bei der Pflegekasse nach und lassen Sie die Rechnung korrigieren. Bewahren Sie Rechnungen und den Heimvertrag mit dem Einzugsdatum auf; sie sind der Nachweis für die Zahl der Monate, falls es später Streit über die Stufe gibt oder das Sozialamt die Kosten übernimmt und nachrechnet.</p>

<h2>Was der Zuschlag nicht berührt</h2>
<p>Unterkunft und Verpflegung, im Bundesschnitt ${h.eur(b.uv)}, und die Investitionskosten, ${h.eur(b.invest)}, bleiben unverändert, egal wie lange jemand im Heim lebt. In Ländern mit hohen festen Kosten wie Nordrhein-Westfalen oder Rheinland-Pfalz sinkt der Eigenanteil deshalb weniger stark als in Ländern mit hohem Pflegeanteil wie Berlin oder Baden-Württemberg. Wie sich das je Land auswirkt, zeigen die Seiten zu ${h.a('pflegeheim-kosten-rheinland-pfalz', 'Rheinland-Pfalz')} und ${h.a('pflegeheim-kosten-berlin', 'Berlin')}.</p>

<h2>Der Zuschlag je Land</h2>
${h.table(['Land', 'EEE', '1. Jahr', 'ab 4. Jahr'],
  liste.map((l) => { const k = kosten(l); return [LAND_NAME[l].de, h.eur(k.eee), h.eur(heimMonat(k, 1).zuschlag), h.eur(heimMonat(k, 37).zuschlag)]; }),
  'Zuschlag der Pflegekasse im Monat beim Landesdurchschnitt, vdek 1. Juli 2026.', ['l', 'r', 'r', 'r'])}

<h2>Neu seit Juli 2026: die Kasse rechnet</h2>
<p>Bis Mitte 2026 berechneten die Heime den Zuschlag und rechneten ihn mit der Kasse ab. Seit dem 1. Juli 2026 berechnet die Pflegekasse ihn auf Grundlage der Angaben, die das Heim ihr übermittelt, zahlt ihn an die Einrichtung, und das Heim stellt der Bewohnerin den verbleibenden Eigenanteil in Rechnung. Für Familien ändert sich wenig, aber die Rechnung sollte nun klar ausweisen, welcher Zuschlag berücksichtigt wurde. Fehlt der Übergang zur nächsten Stufe, ist die Kasse der richtige Ansprechpartner.</p>

<h2>Typische Fragen bei der Rechnung</h2>
<ul>
<li><strong>Heimwechsel:</strong> Die bisherigen Monate gehen mit; teilen Sie dem neuen Heim und der Kasse das ursprüngliche Einzugsdatum mit.</li>
<li><strong>Krankenhaus:</strong> Monate mit Krankenhausaufenthalt zählen, solange der Heimplatz weiter besteht und Leistungen nach § 43 bezogen werden.</li>
<li><strong>Höherer Pflegegrad:</strong> Er ändert den Zuschlag nicht, weil der EEE für alle Grade gleich ist (${h.src('sgb11_84', '§ 84 Abs. 2 SGB XI')}).</li>
<li><strong>Preiserhöhung:</strong> Steigt der EEE, steigt auch der Zuschlag in Euro; der Prozentsatz bleibt.</li>
<li><strong>Tod im Lauf des Monats:</strong> Der angebrochene Monat zählt als Monat mit Leistungen; für die Abrechnung gelten die Tage bis zum Sterbetag.</li>
</ul>
`,
  },
  en: {
    slug: 'care-home-supplement',
    nav: 'Care home supplement',
    card: 'The care fund’s supplement on the co-payment: 15, 30, 50 and 75 percent, how months count and what it is worth in each state.',
    title: 'Leistungszuschlag 2026: German Care Home Supplement 15–75%',
    description: `German care home supplement (Leistungszuschlag) 2026 under section 43c SGB XI: 15 to 75% of the care part by year of stay, ${EN.eur(stufen[0].zuschlag)} to ${EN.eur(stufen[3].zuschlag)} a month on average.`,
    h1: 'The care home supplement: how the fund cuts the co-payment',
    intro: 'The longer someone lives in a home, the more of the care part the fund pays. How the steps work, who calculates them and what they mean in euros.',
    resume: `Residents of German care homes with care grade 2 to 5 receive a supplement (Leistungszuschlag) from their long-term care fund on the care part of their co-payment (section 43c of Book XI of the Social Code). It is ${EN.pct(Z.stufen[0], 0)} in the first twelve months, ${EN.pct(Z.stufen[1], 0)} from month 13, ${EN.pct(Z.stufen[2], 0)} from month 25 and ${EN.pct(Z.stufen[3], 0)} from month 37. Months with only a few days of residential care count in full. The supplement applies only to the uniform care co-payment (EEE) including the training levy, not to board, lodging or investment costs. On the vdek national average of 1 July 2026 it is worth ${EN.eur(stufen[0].zuschlag)} a month in year one and ${EN.eur(stufen[3].zuschlag)} from year four, about ${EN.eur(vierJahre)} over the first four years. Since 1 July 2026 the care fund calculates the supplement itself from information supplied by the home and pays it directly to the home, which then bills only the remaining co-payment. Care grade 1 receives no supplement.`,
    faqs: [
      { q: 'How are months counted for the care home supplement?', a: 'Every month in which the person received residential care under section 43 SGB XI counts, including part months (section 43c sentence 5). Moving in on the 28th already makes that the first month. Months in an earlier home count too; short-term care under section 42 does not.' },
      { q: 'Do we need to apply for the supplement?', a: 'No. Since 1 July 2026 the fund calculates it from the home’s information, pays it to the home, and the home bills only the rest (section 43c SGB XI). Still check after months 12, 24 and 36 that the next step appears on the bill, especially if you manage a parent’s bills from abroad.' },
      { q: 'Why is the supplement worth more in some states?', a: `Because it is a percentage of the care part, which differs by state. The EEE is highest in ${LAND_NAME[maxZ].en} at ${EN.eur(kosten(maxZ).eee)} and lowest in ${LAND_NAME[minZ].en} at ${EN.eur(kosten(minZ).eee)}. From year four the fund there pays ${EN.eur(kosten(maxZ).eee * Z.stufen[3])} and ${EN.eur(kosten(minZ).eee * Z.stufen[3])} a month respectively.` },
      { q: 'How much does the supplement save over four years?', a: `At national averages the care fund’s supplements add up to about ${EN.eur(vierJahre)} over the first four years. The monthly co-payment falls by ${EN.eur(stufen[0].eigenanteil - stufen[3].eigenanteil)} between year one and year four. The saving is larger in states with a high care part and smaller where accommodation and investment costs dominate.` },
      { q: 'Is there a supplement at care grade 1?', a: `No. It only applies to grades 2 to 5. At grade 1 the fund pays a grant of ${EN.eur(P.vollstationaer['1'])} a month in a home (section 43(3) SGB XI), and the home sets its own grade 1 rate. If a higher grade is assessed later, the supplement starts from then.` },
    ],
    body: (h) => `
<h2>The four steps in euros</h2>
${h.table(['Stay', 'Supplement', 'Supplement, national average', 'Care part remaining', 'Total co-payment'],
  stufen.map((s, i) => [[`months 1 to 12`, `months 13 to 24`, `months 25 to 36`, `from month 37`][i], h.pct(s.satz, 0), h.eur(s.zuschlag), h.eur(s.eeeNachZuschlag), h.eur(s.eigenanteil)]),
  `vdek national average on 1 July 2026, EEE ${h.eur(b.eee)}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>The supplement was introduced because care home co-payments had risen sharply and many residents needed social assistance after a few years. It eases the burden more the longer someone stays. For the family, the first two years are the most expensive; after that it becomes noticeably lighter, but only on the care part (${h.src('sgb11_43c', 'section 43c SGB XI')}).</p>
<!--mini:eeeZuschlag-->

<h2>A four-year stay</h2>
<p>A worked example at national averages shows how much the steps matter. In year one the resident pays ${h.eur(verlauf.jahre[0])} in total, in year two ${h.eur(verlauf.jahre[1])}, in year three ${h.eur(verlauf.jahre[2])} and in year four ${h.eur(verlauf.jahre[3])}. The difference between the first and fourth year, ${h.eur(verlauf.jahre[0] - verlauf.jahre[3])}, is almost entirely the supplement. Anyone estimating at the start how long pension and savings will last should include these steps; a rough sum based on the first month seriously underestimates how far the money goes. The care home calculator does this automatically once you enter pension and savings.</p>
<p>The reverse also holds: when rates rise, new residents are hit harder. A ${h.eur(100)} increase in the EEE costs ${h.eur(100 * (1 - Z.stufen[0]))} a month more in year one but only ${h.eur(100 * (1 - Z.stufen[3]))} from year four, which is why families with a relative in long-term care feel price rises less than those just looking for a place.</p>
<h2>What the step looks like on the bill</h2>
<p>The monthly bill shows the care rate for the grade, minus the care fund’s fixed amount and the supplement, then board, lodging and investment costs. Check the supplement line: its percentage must match the number of months. If it still says 15 percent after month 13, ask the home and the care fund to correct the bill. Keep the bills and the contract with the moving-in date; they prove the number of months if the step is disputed later or the welfare office takes over and recalculates. Relatives abroad can ask the home to email each bill so this check takes a minute.</p>

<h2>What the supplement does not touch</h2>
<p>Board and lodging, on average ${h.eur(b.uv)}, and investment costs, ${h.eur(b.invest)}, stay the same however long someone lives in the home. In states with high fixed costs, such as North Rhine-Westphalia or Rhineland-Palatinate, the co-payment therefore falls less than in states with a high care part such as Berlin or Baden-Württemberg. See the pages on ${h.a('pflegeheim-kosten-rheinland-pfalz', 'Rhineland-Palatinate')} and ${h.a('pflegeheim-kosten-berlin', 'Berlin')}.</p>

<h2>The supplement by state</h2>
${h.table(['State', 'EEE', 'Year 1', 'From year 4'],
  liste.map((l) => { const k = kosten(l); return [LAND_NAME[l].en, h.eur(k.eee), h.eur(heimMonat(k, 1).zuschlag), h.eur(heimMonat(k, 37).zuschlag)]; }),
  'Monthly supplement from the care fund at the state average, vdek 1 July 2026.', ['l', 'r', 'r', 'r'])}

<h2>New since July 2026: the fund calculates</h2>
<p>Until mid-2026 homes calculated the supplement and settled it with the fund. Since 1 July 2026 the fund calculates it from the information the home sends, pays it to the home, and the home bills the resident only for the rest. Little changes for families, but the bill should now show clearly which supplement was applied. If the step to the next level is missing, contact the fund.</p>

<h2>Common questions on the bill</h2>
<ul>
<li><strong>Changing homes:</strong> earlier months carry over; tell the new home and the fund the original moving-in date.</li>
<li><strong>Hospital:</strong> months with a hospital stay count as long as the place in the home continues and section 43 benefits are drawn.</li>
<li><strong>Higher grade:</strong> it does not change the supplement, because the EEE is the same for every grade (${h.src('sgb11_84', 'section 84(2) SGB XI')}).</li>
<li><strong>Price increase:</strong> if the EEE rises, the supplement in euros rises too; the percentage stays.</li>
<li><strong>Death during a month:</strong> the part month counts as a month with benefits; billing covers the days up to the date of death.</li>
</ul>
`,
  },
});
