import { defineGuide } from '../../lib/guide-types';
import { barbetrag, einkommensgrenze } from '../../lib/engine/sozialhilfe';
import { kosten, heimMonat, reichweite } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Barbetrag 2026; Einkommensgrenze für ein Ehepaar mit 650 € Miete; Mutter im Saarland mit 1.300 € Rente und 25.000 € Erspartem. */
const S = P.sozialhilfe;
const bb = barbetrag();
const eg = einkommensgrenze(650, 1);
const sl = kosten('SL');
const fall = reichweite(sl, 1300, 25000);
const luecke = heimMonat(sl, 1).eigenanteil - 1300;

export default defineGuide({
  id: 'hilfe-zur-pflege',
  group: 'heim',
  order: 50,
  mini: 'reichweite',
  related: ['pflegeheim-kosten-wer-zahlt', 'pflegeheim-kosten', 'eigenanteil-pflegeheim', 'investitionskosten', 'pflegegrad-beantragen', 'pflegeheim-kosten-saarland'],
  sources: ['sgb12_61', 'sgb12_63', 'sgb12_85', 'sgb12_87', 'sgb12_90', 'dv90', 'sgb12_27b', 'sgb12_anlage', 'sgb12_94'],
  de: {
    slug: 'hilfe-zur-pflege',
    nav: 'Hilfe zur Pflege',
    card: `Wenn Rente und Erspartes nicht reichen: Schonbetrag ${DE.eur(S.schonvermoegen)}, Barbetrag ${DE.eur(bb, 2)}, Einkommensgrenze und Antrag.`,
    title: 'Hilfe zur Pflege 2026: Sozialamt, Schonvermögen, Barbetrag',
    description: `Hilfe zur Pflege 2026: Das Sozialamt zahlt, wenn Rente und Vermögen über ${DE.eur(S.schonvermoegen)} nicht reichen; Barbetrag im Heim ${DE.eur(bb, 2)}, Kinder erst ab ${DE.eur(S.jahreseinkommensgrenze_kinder)}.`,
    h1: 'Hilfe zur Pflege: wann das Sozialamt einspringt',
    intro: 'Die Leistung, die einspringt, wenn die Pflegeversicherung nicht reicht: wer sie bekommt, was vom Einkommen bleiben muss und wie man den Antrag stellt.',
    resume: `Hilfe zur Pflege ist eine Leistung der Sozialhilfe nach §§ 61 ff. SGB XII. Sie übernimmt Pflegekosten, die weder die Pflegeversicherung noch das eigene Einkommen und Vermögen decken, am häufigsten den Eigenanteil im Pflegeheim, aber auch Kosten der häuslichen Pflege über den Leistungen der Pflegekasse. Voraussetzung ist ein Pflegegrad; ab Pflegegrad 2 umfasst sie dieselben Leistungsarten wie die Pflegeversicherung (§ 63 SGB XII). Vom Vermögen bleibt ein Schonbetrag von ${DE.eur(S.schonvermoegen)} je volljähriger Person geschützt (§ 1 der Durchführungsverordnung zu § 90 SGB XII). Bei häuslicher Pflege gilt eine Einkommensgrenze aus dem Zweifachen der Regelbedarfsstufe 1 von ${DE.eur(S.regelbedarf_rbs1)}, den angemessenen Wohnkosten und einem Familienzuschlag (§ 85); für ein Ehepaar mit ${DE.eur(650)} Miete sind das ${DE.eur(eg.grenze)} im Monat. Im Heim bleibt ein Barbetrag von ${DE.eur(bb, 2)} für persönliche Ausgaben (§ 27b). Kinder werden erst ab ${DE.eur(S.jahreseinkommensgrenze_kinder)} eigenem Jahreseinkommen herangezogen. Die Hilfe beginnt, sobald das Sozialamt von der Notlage weiß, nicht rückwirkend.`,
    faqs: [
      { q: 'Ab wann bekommt man Hilfe zur Pflege im Pflegeheim?', a: `Sobald Rente und sonstiges Einkommen den Eigenanteil nicht mehr decken und das Vermögen bis auf den Schonbetrag von ${DE.eur(S.schonvermoegen)} aufgebraucht ist. Das Sozialamt übernimmt dann die Differenz und zahlt direkt an das Heim. Den Antrag sollten Sie stellen, bevor das Ersparte den Schonbetrag erreicht, weil die Hilfe erst ab Kenntnis des Amtes einsetzt.` },
      { q: 'Wie viel Taschengeld bleibt im Heim mit Hilfe zur Pflege?', a: `Der Barbetrag beträgt 2026 ${DE.eur(bb, 2)} im Monat, also 27 Prozent der Regelbedarfsstufe 1 von ${DE.eur(S.regelbedarf_rbs1)} (§ 27b Abs. 3 SGB XII). Dazu kommt eine Bekleidungspauschale, deren Höhe der Sozialhilfeträger festlegt. Der Barbetrag ist für persönliche Ausgaben wie Friseur, Zeitung oder Telefon bestimmt und darf nicht für die Heimrechnung verwendet werden.` },
      { q: 'Wird bei Pflegegrad 4 oder 5 das ganze Einkommen über der Grenze eingesetzt?', a: `Nein. Bei häuslicher Pflege ist Pflegebedürftigen der Pflegegrade 4 und 5 ein Einsatz von mindestens ${DE.pct(S.pg45_nicht_zumutbar_anteil, 0)} des Einkommens über der Einkommensgrenze nicht zuzumuten (§ 87 Abs. 1 SGB XII). Bei den übrigen Graden prüft das Amt, welcher Einsatz angemessen ist, und berücksichtigt Dauer, Höhe der Kosten und besondere Belastungen.` },
      { q: 'Muss die Ehefrau zu Hause ihr Erspartes für das Heim des Mannes einsetzen?', a: 'Einkommen und Vermögen des nicht getrennt lebenden Ehepartners werden einbezogen (§ 61 SGB XII), aber mit Schutz: Für den Partner zu Hause gelten die Einkommensgrenze mit Familienzuschlag und angemessenen Wohnkosten sowie ein eigener Schonbetrag. Das selbst bewohnte, angemessene Haus bleibt geschützt, solange sie darin wohnt.' },
      { q: 'Gibt es Hilfe zur Pflege auch bei Pflegegrad 1?', a: 'Nur eingeschränkt. Bei Pflegegrad 1 umfasst die Hilfe zur Pflege Pflegehilfsmittel, Maßnahmen zur Verbesserung des Wohnumfelds, digitale Pflegeanwendungen und den Entlastungsbetrag, aber kein Pflegegeld und keine stationäre Pflege im vollen Umfang (§ 63 Abs. 2 SGB XII). Wer mit Pflegegrad 1 ins Heim zieht, muss die Kosten deshalb meist selbst tragen.' },
    ],
    body: (h) => `
<h2>Wann die Sozialhilfe zuständig wird</h2>
<p>Die Pflegeversicherung ist eine Teilversicherung: Sie zahlt feste Beträge, nicht die tatsächlichen Kosten. Was darüber hinausgeht, zahlen Pflegebedürftige selbst. Erst wenn sie es nicht können, tritt die Sozialhilfe ein, nachrangig und nach Prüfung von Einkommen und Vermögen (${h.src('sgb12_61', '§ 61 SGB XII')}). In der Praxis betrifft das vor allem Heimbewohner: Bei einem Eigenanteil im Bundesschnitt von ${h.eur(P.heim.bund.mit15)} im ersten Jahr reicht eine durchschnittliche Rente selten aus.</p>
${h.table(['Wert 2026', 'Betrag', 'Grundlage'], [
  ['Regelbedarfsstufe 1', h.eur(S.regelbedarf_rbs1), 'Anlage zu § 28 SGB XII'],
  ['Barbetrag im Heim (27 %)', h.eur(bb, 2), '§ 27b Abs. 3 SGB XII'],
  ['Grundbetrag der Einkommensgrenze', h.eur(eg.grund), '§ 85 Abs. 1 Nr. 1 SGB XII'],
  ['Familienzuschlag je Person', h.eur(eg.zuschlag), '§ 85 Abs. 1 Nr. 3 SGB XII'],
  ['Schonbetrag Vermögen je volljährige Person', h.eur(S.schonvermoegen), '§ 1 DV zu § 90 SGB XII'],
  ['Einkommensgrenze für den Rückgriff auf Kinder', h.eur(S.jahreseinkommensgrenze_kinder), '§ 94 Abs. 1a SGB XII'],
], 'Werte 2026; die Regelbedarfsstufe 1 ist gegenüber 2025 unverändert.', ['l', 'r', 'l'])}

<h2>Im Heim: was vom Einkommen bleibt</h2>
<p>Im Pflegeheim setzt das Sozialamt die Rente praktisch vollständig für die Heimkosten ein. Der Bewohnerin bleibt der Barbetrag von ${h.eur(bb, 2)} für persönliche Bedürfnisse und eine Bekleidungspauschale (${h.src('sgb12_27b', '§ 27b SGB XII')}). Ein Rechenbeispiel: Eine Mutter im Saarland mit ${h.eur(1300)} Rente und ${h.eur(25000)} Erspartem hat im ersten Heimjahr eine Lücke von ${h.eur(luecke)} im Monat. Nach etwa ${fall.monateBisSchonvermoegen} Monaten sind die Ersparnisse bis auf den Schonbetrag aufgebraucht; ab dann übernimmt das Sozialamt die Lücke. Der Rechner oben zeigt das für jedes Land.</p>

<h2>Zu Hause: die Einkommensgrenze</h2>
<p>Wird zu Hause gepflegt und reichen Pflegegeld und Sachleistung nicht, etwa bei einer sehr aufwendigen Pflege mit mehreren Einsätzen täglich, kann die Hilfe zur Pflege die Lücke schließen. Hier gilt eine Einkommensgrenze: das Zweifache der Regelbedarfsstufe 1, die angemessenen Kosten der Unterkunft und ein Familienzuschlag für den Ehepartner und unterhaltene Personen (${h.src('sgb12_85', '§ 85 SGB XII')}). Liegt das Einkommen darunter, muss es in der Regel nicht eingesetzt werden; liegt es darüber, ist ein Einsatz in angemessenem Umfang zumutbar, bei Pflegegrad 4 und 5 aber höchstens ${h.pct(1 - S.pg45_nicht_zumutbar_anteil, 0)} des übersteigenden Betrags (${h.src('sgb12_87', '§ 87 SGB XII')}).</p>
<!--mini:einkommensgrenze-->

<h2>Das Vermögen</h2>
<p>Einzusetzen ist das gesamte verwertbare Vermögen, mit Ausnahmen (${h.src('sgb12_90', '§ 90 SGB XII')}): angemessener Hausrat, ein angemessenes selbst bewohntes Haus, solange Angehörige darin leben, Familien- und Erbstücke, wenn ihr Verkauf eine besondere Härte wäre, und kleinere Barbeträge bis ${h.eur(S.schonvermoegen)} je volljährige Person (${h.src('dv90', '§ 1 DV zu § 90')}). Für jede überwiegend unterhaltene Person kommt ein kleiner Zuschlag hinzu. Ist ein Verkauf nicht sofort möglich, etwa bei einer vermieteten Wohnung, kann die Hilfe als Darlehen geleistet werden.</p>

<h2>Kinder und Ehepartner</h2>
<p>Ehepartner, die nicht getrennt leben, werden mit Einkommen und Vermögen einbezogen. Kinder dagegen müssen nur dann für ihre Eltern zahlen, wenn ihr eigenes Jahreseinkommen ${h.eur(S.jahreseinkommensgrenze_kinder)} übersteigt; das Amt vermutet zunächst, dass es darunter liegt (${h.src('sgb12_94', '§ 94 Abs. 1a SGB XII')}). Alle Einzelheiten zur Reihenfolge stehen unter ${h.a('pflegeheim-kosten-wer-zahlt', 'Pflegeheim: wer zahlt')}.</p>

<h2>Häufige Missverständnisse</h2>
<p><strong>„Dann wird das Haus der Kinder verkauft.“</strong> Nein. Das Vermögen der Kinder spielt für die Hilfe zur Pflege der Eltern keine Rolle, und ihr Einkommen nur über ${h.eur(S.jahreseinkommensgrenze_kinder)} im Jahr. Anders ist es, wenn die Eltern ihnen in den letzten zehn Jahren etwas geschenkt haben; dann kann das Sozialamt die Schenkung zurückfordern.</p>
<p><strong>„Wer Sozialhilfe bekommt, wird schlechter gepflegt.“</strong> Nein. Das Heim erhält denselben Pflegesatz, egal ob die Bewohnerin selbst zahlt oder das Sozialamt. Auch die Pflegekasse zahlt ihren Betrag und den Zuschlag unverändert weiter. Ein Heim darf Bewohner mit Hilfe zur Pflege nicht anders behandeln.</p>
<p><strong>„Das Amt holt sich später alles zurück.“</strong> Die Hilfe zur Pflege ist grundsätzlich kein Darlehen. Eine Rückzahlung kommt nur in besonderen Fällen in Betracht, etwa wenn sie ausdrücklich als Darlehen gewährt wurde, weil ein Haus nicht sofort verkauft werden konnte, und über die Erbenhaftung: Nach dem Tod müssen die Erben Kosten der letzten zehn Jahre aus dem Nachlass ersetzen, soweit dieser das Dreifache des Grundbetrags übersteigt; für Angehörige, die im Haushalt gepflegt haben, gilt ein höherer Freibetrag von ${h.eur(S.erbe_freibetrag_pflegende_angehoerige)} (${h.src('sgb12_102', '§ 102 SGB XII')}).</p>

<h2>Der Antrag Schritt für Schritt</h2>
<ol>
<li>Formlos beim Sozialamt am Wohnort oder am Ort des Heims melden, dass Hilfe zur Pflege benötigt wird. Das Datum zählt.</li>
<li>Unterlagen zusammenstellen: Bescheid der Pflegekasse, Heimvertrag, Rentenbescheide, Kontoauszüge, Nachweise über Sparguthaben und Versicherungen.</li>
<li>Formulare des Amtes ausfüllen; das Heim hilft oft, darf aber nur mit Einwilligung Daten weitergeben.</li>
<li>Bescheid prüfen: Barbetrag, eingesetztes Einkommen, berücksichtigtes Vermögen. Gegen einen Bescheid ist innerhalb eines Monats Widerspruch möglich.</li>
</ol>
`,
  },
  en: {
    slug: 'social-assistance-for-care',
    nav: 'Social assistance for care',
    card: `When pension and savings run out: protected savings ${EN.eur(S.schonvermoegen)}, personal allowance ${EN.eur(bb, 2)}, income limit and how to apply.`,
    title: 'Hilfe zur Pflege 2026: German Social Assistance for Care',
    description: `German social assistance for care (Hilfe zur Pflege) 2026: the welfare office pays once pension and savings above ${EN.eur(S.schonvermoegen)} run out; personal allowance ${EN.eur(bb, 2)}.`,
    h1: 'Hilfe zur Pflege: when the German welfare office steps in',
    intro: 'The benefit that steps in when long-term care insurance is not enough: who gets it, what must be left of income and how to apply.',
    resume: `Social assistance for care (Hilfe zur Pflege) is a German welfare benefit under sections 61 ff. of Book XII of the Social Code. It pays care costs that neither the long-term care insurance nor the person’s own income and savings cover, most often the care home co-payment, but also costs of care at home above what the care fund pays. A care grade is required; from grade 2 it covers the same types of benefit as the care insurance (section 63). Savings of ${EN.eur(S.schonvermoegen)} per adult are protected (section 1 of the regulation on section 90). For care at home an income limit applies, made up of twice the standard rate of ${EN.eur(S.regelbedarf_rbs1)}, reasonable housing costs and a family supplement (section 85); for a couple paying ${EN.eur(650)} rent it is ${EN.eur(eg.grenze)} a month. In a care home the resident keeps a personal allowance of ${EN.eur(bb, 2)} (section 27b). Children only contribute if their own annual income exceeds ${EN.eur(S.jahreseinkommensgrenze_kinder)}. Help starts once the welfare office knows of the need, never retroactively.`,
    faqs: [
      { q: 'When does social assistance pay for a care home?', a: `Once pension and other income no longer cover the co-payment and savings have been used down to the protected ${EN.eur(S.schonvermoegen)}. The welfare office then pays the difference directly to the home. Apply before savings reach that level, because help only starts from the date the office learns of the need.` },
      { q: 'How much pocket money does a resident keep with social assistance?', a: `The personal allowance (Barbetrag) is ${EN.eur(bb, 2)} a month in 2026, 27 percent of the standard rate of ${EN.eur(S.regelbedarf_rbs1)} (section 27b(3) SGB XII), plus a clothing allowance set by the welfare authority. It is meant for personal spending such as the hairdresser, newspapers or phone and may not be claimed for the home’s bill.` },
      { q: 'Is all income above the limit used at care grades 4 and 5?', a: `No. For care at home, people at grades 4 and 5 cannot be required to use at least ${EN.pct(S.pg45_nicht_zumutbar_anteil, 0)} of the income above the limit (section 87(1) SGB XII). For other grades the office decides what is reasonable, taking into account duration, costs and special burdens.` },
      { q: 'Can relatives abroad apply on a parent’s behalf?', a: 'Yes, with a power of attorney or as a court-appointed guardian. The application can be made informally by letter or email to the welfare office where the parent lives or where the home is; the date of receipt counts. Supporting documents can follow. Keep copies and a proof of sending.' },
      { q: 'Is social assistance for care available at care grade 1?', a: 'Only in part. At grade 1 it covers care aids, home adaptations, digital care apps and the relief amount, but no care allowance and not full residential care (section 63(2) SGB XII). Moving into a home at grade 1 therefore usually has to be self-funded.' },
    ],
    body: (h) => `
<h2>When welfare becomes responsible</h2>
<p>German long-term care insurance only pays fixed amounts, not actual costs. Anything above them is paid by the person in care, and only when they cannot pay does welfare step in, after checking income and assets (${h.src('sgb12_61', 'section 61 SGB XII')}). In practice this mainly affects care home residents: with an average first-year co-payment of ${h.eur(P.heim.bund.mit15)}, an average pension is rarely enough.</p>
${h.table(['2026 value', 'Amount', 'Legal basis'], [
  ['Standard rate, level 1', h.eur(S.regelbedarf_rbs1), 'Annex to s. 28 SGB XII'],
  ['Personal allowance in a home (27%)', h.eur(bb, 2), 's. 27b(3) SGB XII'],
  ['Basic amount of the income limit', h.eur(eg.grund), 's. 85(1) no. 1 SGB XII'],
  ['Family supplement per person', h.eur(eg.zuschlag), 's. 85(1) no. 3 SGB XII'],
  ['Protected savings per adult', h.eur(S.schonvermoegen), 's. 1 regulation on s. 90'],
  ['Income threshold for recourse to children', h.eur(S.jahreseinkommensgrenze_kinder), 's. 94(1a) SGB XII'],
], '2026 values; the standard rate is unchanged from 2025.', ['l', 'r', 'l'])}

<h2>In a home: what is left of income</h2>
<p>In a care home the welfare office uses the pension almost entirely for the fees. The resident keeps the personal allowance of ${h.eur(bb, 2)} and a clothing allowance (${h.src('sgb12_27b', 'section 27b SGB XII')}). Example: a mother in Saarland with a ${h.eur(1300)} pension and ${h.eur(25000)} of savings has a gap of ${h.eur(luecke)} a month in her first year. After about ${fall.monateBisSchonvermoegen} months her savings are down to the protected amount, and from then the welfare office covers the gap. The calculator above shows this for every state.</p>

<h2>At home: the income limit</h2>
<p>If care at home costs more than the allowance and services cover, for example with several visits a day, social assistance can close the gap. An income limit applies: twice the standard rate, reasonable housing costs and a family supplement for the spouse and dependants (${h.src('sgb12_85', 'section 85 SGB XII')}). Income below the limit is generally not used; above it a reasonable contribution is expected, but at grades 4 and 5 at most ${h.pct(1 - S.pg45_nicht_zumutbar_anteil, 0)} of the excess (${h.src('sgb12_87', 'section 87 SGB XII')}).</p>
<!--mini:einkommensgrenze-->

<h2>Savings and property</h2>
<p>All realisable assets must be used, with exceptions (${h.src('sgb12_90', 'section 90 SGB XII')}): reasonable household goods, a reasonable owner-occupied home while relatives live in it, heirlooms whose sale would be a hardship, and small cash amounts up to ${h.eur(S.schonvermoegen)} per adult (${h.src('dv90', 'section 1 of the regulation')}). A small extra applies for each dependant. If a sale is not immediately possible, for example a let flat, help can be granted as a loan.</p>

<h2>Spouses and children</h2>
<p>Spouses who are not separated are included with income and assets. Children only pay for their parents if their own annual income exceeds ${h.eur(S.jahreseinkommensgrenze_kinder)}, which the office initially presumes it does not (${h.src('sgb12_94', 'section 94(1a) SGB XII')}). For the full order see ${h.a('pflegeheim-kosten-wer-zahlt', 'who pays for a care home')}.</p>

<h2>Common misunderstandings</h2>
<p><strong>“The children’s house will be sold.”</strong> No. Children’s assets play no part in social assistance for their parents, and their income only above ${h.eur(S.jahreseinkommensgrenze_kinder)} a year. It is different if the parents gave them something in the last ten years; the welfare office can then reclaim the gift.</p>
<p><strong>“Residents on welfare get worse care.”</strong> No. The home receives the same rate whether the resident or the welfare office pays, and the care fund keeps paying its amount and the supplement. A home may not treat residents on social assistance differently.</p>
<p><strong>“The office will claim everything back later.”</strong> Social assistance for care is generally not a loan. Repayment only arises in special cases, for example where it was expressly granted as a loan because a house could not be sold at once, and through heirs’ liability: after death, heirs must repay costs of the last ten years from the estate where it exceeds three times the basic amount, with a higher allowance of ${h.eur(S.erbe_freibetrag_pflegende_angehoerige)} for relatives who lived with and cared for the person (${h.src('sgb12_102', 'section 102 SGB XII')}). Your own savings are never at stake.</p>

<h2>The application step by step</h2>
<ol>
<li>Tell the welfare office where your parent lives or where the home is, informally, that social assistance for care is needed. The date counts.</li>
<li>Gather documents: the care fund decision, the home contract, pension statements, bank statements, proof of savings and insurance policies.</li>
<li>Complete the office’s forms; the home often helps but may only pass on data with consent.</li>
<li>Check the decision: personal allowance, income used, assets counted. An objection is possible within one month.</li>
</ol>
`,
  },
});
