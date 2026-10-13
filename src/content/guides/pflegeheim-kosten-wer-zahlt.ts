import { defineGuide } from '../../lib/guide-types';
import { kosten, heimMonat, reichweite } from '../../lib/engine/heim';
import { P, DE, EN } from '../../lib/fmt';

/** Rechenbeispiel aus dem Motor: Vater in Hessen, 1.600 € Rente, 45.000 € Erspartes; Bundesschnitt für die Reihenfolge. */
const b = kosten('BUND');
const m1 = heimMonat(b, 1);
const he = kosten('HE');
const bsp = reichweite(he, 1600, 45000);
const SH = P.sozialhilfe;

export default defineGuide({
  id: 'pflegeheim-kosten-wer-zahlt',
  group: 'heim',
  order: 60,
  mini: 'elternunterhalt',
  related: ['hilfe-zur-pflege', 'pflegeheim-kosten', 'eigenanteil-pflegeheim', 'investitionskosten', 'pflegeheim-kosten-nordrhein-westfalen', 'rente-pflegende-angehoerige'],
  sources: ['sgb12_94', 'sgb12_90', 'dv90', 'sgb12_61', 'bgb528', 'bgb529', 'sgb12_91'],
  de: {
    slug: 'pflegeheim-kosten-wer-zahlt',
    nav: 'Pflegeheim: wer zahlt?',
    card: 'Rente, Erspartes, Pflegekasse, Sozialamt, Kinder: in welcher Reihenfolge die Heimkosten bezahlt werden.',
    title: 'Pflegeheim Kosten: wer zahlt 2026, Kinder erst ab 100.000 €',
    description: `Pflegeheim-Kosten 2026, wer zahlt: erst Rente und Vermögen bis ${DE.eur(SH.schonvermoegen)} Schonbetrag, dann das Sozialamt; Kinder erst über ${DE.eur(SH.jahreseinkommensgrenze_kinder)} Jahreseinkommen brutto.`,
    h1: 'Pflegeheim: wer die Kosten in welcher Reihenfolge trägt',
    intro: 'Pflegekasse, Rente, Erspartes, Sozialamt, und erst ganz am Ende vielleicht die Kinder: die Reihenfolge, die das Gesetz vorgibt, mit Rechenbeispiel.',
    resume: `Die Kosten eines Pflegeheims tragen mehrere Stellen nacheinander. Zuerst zahlt die Pflegekasse einen festen Betrag je Pflegegrad und den mit der Aufenthaltsdauer steigenden Leistungszuschlag direkt an das Heim. Den verbleibenden Eigenanteil, im Bundesschnitt im ersten Jahr ${DE.eur(m1.eigenanteil)} im Monat, zahlt die Bewohnerin aus ihrer Rente und ihrem sonstigen Einkommen. Reicht das nicht, wird das Vermögen eingesetzt, bis ein Schonbetrag von ${DE.eur(SH.schonvermoegen)} übrig ist (§ 90 SGB XII mit Durchführungsverordnung). Erst dann übernimmt das Sozialamt die Lücke als Hilfe zur Pflege. Ehepartner werden mit ihrem Einkommen und Vermögen einbezogen. Kinder müssen dem Sozialamt nur etwas erstatten, wenn ihr eigenes Jahreseinkommen über ${DE.eur(SH.jahreseinkommensgrenze_kinder)} liegt (§ 94 Abs. 1a SGB XII); das Einkommen von Schwiegerkindern zählt nicht. Schenkungen der letzten zehn Jahre kann das Sozialamt zurückfordern (§§ 528, 529 BGB). Ein Beispiel: Ein Vater in Hessen mit ${DE.eur(1600)} Rente und ${DE.eur(45000)} Erspartem hat eine Lücke von ${DE.eur(bsp.luecke)} im Monat und braucht nach etwa ${bsp.monateBisSchonvermoegen} Monaten Hilfe zur Pflege.`,
    faqs: [
      { q: 'Müssen Kinder für das Pflegeheim ihrer Eltern zahlen?', a: `Nur wenn ihr eigenes Jahres-Gesamteinkommen im Sinne des § 16 SGB IV über ${DE.eur(SH.jahreseinkommensgrenze_kinder)} brutto liegt (§ 94 Abs. 1a SGB XII). Das Sozialamt geht zunächst davon aus, dass die Grenze nicht überschritten ist, und darf nur bei konkreten Anhaltspunkten nachfragen. Es zählt jedes Kind einzeln; das Einkommen des Ehepartners des Kindes bleibt außen vor.` },
      { q: 'Wird das Elternhaus für das Pflegeheim verwertet?', a: 'Ein angemessenes Haus bleibt geschützt, solange der Ehepartner oder andere Angehörige darin wohnen und es nach dem Tod weiter bewohnen sollen (§ 90 Abs. 2 Nr. 8 SGB XII). Steht es leer, ist es grundsätzlich Vermögen. Ist ein sofortiger Verkauf nicht möglich oder eine Härte, soll das Sozialamt die Hilfe als Darlehen leisten, oft gesichert durch eine Grundschuld (§ 91 SGB XII).' },
      { q: 'Kann das Sozialamt ein geschenktes Haus zurückholen?', a: `Ja, wenn die Eltern nach der Schenkung ihren Unterhalt nicht mehr bestreiten können: Der Anspruch auf Rückforderung nach § 528 BGB geht auf das Sozialamt über. Er ist ausgeschlossen, wenn seit der Schenkung ${SH.schenkung_rueckforderung_jahre} Jahre vergangen sind, bevor die Bedürftigkeit eintrat (§ 529 BGB). Statt der Herausgabe kann der Beschenkte den nötigen Unterhalt zahlen.` },
      { q: 'Was zahlt der Ehepartner, der zu Hause bleibt?', a: 'Bei der Hilfe zur Pflege werden Einkommen und Vermögen des nicht getrennt lebenden Ehepartners mit einbezogen (§ 61 SGB XII). Dem Partner zu Hause muss aber genug zum Leben bleiben; die Einkommensgrenze nach § 85 SGB XII enthält einen Zuschlag für ihn und die angemessenen Wohnkosten. Für beide zusammen gelten zudem höhere Vermögensfreibeträge.' },
      { q: 'Bekommt man im Heim noch Taschengeld, wenn das Sozialamt zahlt?', a: 'Ja. Wer Hilfe zur Pflege im Heim erhält, bekommt für persönliche Ausgaben einen Barbetrag und zusätzlich eine Pauschale für Kleidung und Schuhe (§ 27b SGB XII). Der Barbetrag wird aus der Rente zurückbehalten oder vom Sozialamt gezahlt. Er ist für Friseur, Zeitung, Telefon oder kleine Anschaffungen gedacht und darf nicht für die Heimkosten verlangt werden.' },
    ],
    body: (h) => `
<h2>Die Reihenfolge</h2>
${h.table(['Schritt', 'Wer zahlt', 'Was', 'Grundlage'], [
  ['1', 'Pflegekasse', `fester Betrag je Grad (${h.eur(P.vollstationaer['2'])} bis ${h.eur(P.vollstationaer['5'])}) und Leistungszuschlag 15 bis 75 %`, '§§ 43, 43c SGB XI'],
  ['2', 'Bewohnerin', 'Rente, Pension, Mieteinnahmen, Zinsen', '§ 61 SGB XII'],
  ['3', 'Bewohnerin', `Vermögen bis auf ${h.eur(SH.schonvermoegen)} Schonbetrag`, '§ 90 SGB XII'],
  ['4', 'Ehepartner', 'Einkommen und Vermögen, mit Freibeträgen', '§§ 61, 85 SGB XII'],
  ['5', 'Land (wo vorgesehen)', 'Hilfe zu den Investitionskosten, z. B. Pflegewohngeld NRW', 'Landesrecht'],
  ['6', 'Sozialamt', 'Hilfe zur Pflege für die restliche Lücke', '§§ 61 ff. SGB XII'],
  ['7', 'Kinder', `nur bei Jahreseinkommen über ${h.eur(SH.jahreseinkommensgrenze_kinder)}`, '§ 94 Abs. 1a SGB XII'],
], 'Vereinfachte Reihenfolge; Schenkungen der letzten zehn Jahre können zurückgefordert werden.', ['l', 'l', 'l', 'l'])}
<p>Wichtig ist, was nicht in der Liste steht: Kinder werden nicht automatisch angeschrieben, und ein Kind mit durchschnittlichem Einkommen muss nichts zahlen. Seit dem Angehörigen-Entlastungsgesetz gilt die Grenze von ${h.eur(SH.jahreseinkommensgrenze_kinder)} je Kind, und das Sozialamt vermutet zunächst, dass sie nicht überschritten wird (${h.src('sgb12_94', '§ 94 Abs. 1a SGB XII')}). Der Mini-Rechner oben prüft die Grenze.</p>

<h2>Das Rechenbeispiel</h2>
<p>Ein Vater zieht mit Pflegegrad 3 in ein Heim in Hessen. Der Eigenanteil im ersten Jahr liegt im hessischen Schnitt bei ${h.eur(heimMonat(he, 1).eigenanteil)}, seine Rente bei ${h.eur(1600)}. Jeden Monat fehlen ${h.eur(bsp.luecke)}. Von seinen ${h.eur(45000)} Erspartem dürfen ${h.eur(SH.schonvermoegen)} bleiben; der Rest deckt die Lücke etwa ${bsp.monateBisSchonvermoegen} Monate lang, auch weil der Zuschlag ab dem 13. Monat steigt. Danach stellt die Familie den Antrag auf ${h.a('hilfe-zur-pflege', 'Hilfe zur Pflege')}. Seine Tochter verdient ${h.eur(70000)} im Jahr und wird nicht herangezogen, sein Sohn mit ${h.eur(110000)} müsste dagegen mit Auskunftsersuchen und einem Unterhaltsanspruch rechnen. Der Pflegeheim-Rechner rechnet das Beispiel mit Ihren eigenen Zahlen für jedes Land.</p>
<!--mini:reichweite-->

<h2>Wie der Antrag beim Sozialamt abläuft</h2>
<p>Zuständig ist meist das Sozialamt am Ort des Heims oder, je nach Land, ein überörtlicher Träger. Der Antrag kann formlos gestellt werden; danach schickt das Amt Formulare zu Einkommen, Vermögen, Wohnsituation und Unterhaltspflichtigen. Gebraucht werden typischerweise Rentenbescheide, Kontoauszüge der letzten Monate, Nachweise über Sparguthaben, Lebens- und Sterbeversicherungen, der Heimvertrag mit den aktuellen Entgelten und der Bescheid der Pflegekasse über den Pflegegrad. Für Kinder gibt es keinen eigenen Fragebogen zum Einkommen, solange keine Anhaltspunkte für ein Einkommen über ${h.eur(SH.jahreseinkommensgrenze_kinder)} vorliegen; das Amt fragt in der Regel nur nach Namen und Anschrift.</p>
<p>Bis der Bescheid kommt, laufen die Heimrechnungen weiter. Viele Heime stunden die Lücke, wenn der Antrag nachweislich gestellt ist. Wichtig ist deshalb der Zeitpunkt: Das Sozialamt hilft ab dem Tag, an dem es von der Notlage weiß. Ein Antrag einige Wochen, bevor das Ersparte den Schonbetrag erreicht, vermeidet Lücken.</p>

<h2>Was geschützt ist</h2>
<p>Nicht eingesetzt werden müssen ein angemessener Hausrat, Gegenstände für Beruf oder Ausbildung, Familien- und Erbstücke, deren Verkauf eine besondere Härte wäre, ein angemessenes selbst bewohntes Haus, solange Angehörige darin wohnen, und kleinere Barbeträge (${h.src('sgb12_90', '§ 90 Abs. 2 SGB XII')}). Der kleine Barbetrag ist auf ${h.eur(SH.schonvermoegen)} je volljähriger Person festgelegt (${h.src('dv90', '§ 1 DV zu § 90 SGB XII')}). Auch eine angemessene Bestattungsvorsorge wird in der Praxis meist geschützt; klären Sie das mit dem Sozialamt.</p>

<h2>Schenkungen und Übertragungen</h2>
<p>Hat die pflegebedürftige Person in den letzten zehn Jahren Geld oder eine Immobilie verschenkt und kann nun ihren Unterhalt nicht mehr bestreiten, kann sie das Geschenk zurückfordern, und dieser Anspruch geht auf das Sozialamt über (${h.src('bgb528', '§ 528 BGB')}). Liegt die Schenkung länger als zehn Jahre zurück, ist die Rückforderung ausgeschlossen (${h.src('bgb529', '§ 529 BGB')}). Wer heute über die Übertragung eines Hauses an die Kinder nachdenkt, sollte diese Frist kennen und sich vorher beraten lassen.</p>

<h2>Was die Familie früh tun kann</h2>
<ul>
<li>Den Eigenanteil des gewählten Heims mit der Rente vergleichen, bevor der Vertrag unterschrieben ist.</li>
<li>Das Pflegewohngeld oder eine vergleichbare Landeshilfe prüfen, wo es sie gibt, etwa in ${h.a('pflegeheim-kosten-nordrhein-westfalen', 'Nordrhein-Westfalen')}.</li>
<li>Den Antrag auf Hilfe zur Pflege stellen, bevor das Vermögen den Schonbetrag erreicht; das Sozialamt zahlt nicht rückwirkend für Zeiten vor seiner Kenntnis.</li>
<li>Vollmachten klären, damit ein Kind gegenüber Heim, Kasse und Sozialamt handeln darf.</li>
<li>Alle Bescheide, Rechnungen und Kontoauszüge an einem Ort sammeln; das Sozialamt fragt meist nach den letzten drei bis sechs Monaten.</li>
</ul>
`,
  },
  en: {
    slug: 'who-pays-for-a-care-home',
    nav: 'Who pays for a care home?',
    card: 'Pension, savings, care fund, welfare office, children: the order in which German care home costs are paid.',
    title: 'Who Pays for a Care Home in Germany 2026: Children, Savings',
    description: `Who pays for a German care home in 2026? First pension and savings down to ${EN.eur(SH.schonvermoegen)}, then the welfare office; children only above ${EN.eur(SH.jahreseinkommensgrenze_kinder)} annual income.`,
    h1: 'Who pays for a German care home, and in which order',
    intro: 'Care fund, pension, savings, welfare office and only at the very end perhaps the children: the order German law sets, with a worked example.',
    resume: `German care home costs are paid by several parties in turn. First the long-term care fund (Pflegekasse) pays a fixed amount per care grade and the supplement that grows with the length of stay, directly to the home. The remaining co-payment, on average ${EN.eur(m1.eigenanteil)} a month in the first year, is paid by the resident from pension and other income. If that is not enough, savings are used until a protected amount of ${EN.eur(SH.schonvermoegen)} remains (section 90 of Book XII of the Social Code and its implementing regulation). Only then does the welfare office (Sozialamt) cover the gap as social assistance for care (Hilfe zur Pflege). A spouse’s income and assets are taken into account. Children only have to reimburse the welfare office if their own annual income exceeds ${EN.eur(SH.jahreseinkommensgrenze_kinder)} (section 94(1a) SGB XII); a son- or daughter-in-law’s income does not count. Gifts made in the last ten years can be reclaimed (sections 528 and 529 Civil Code). Example: a father in Hesse with a ${EN.eur(1600)} pension and ${EN.eur(45000)} of savings has a monthly gap of ${EN.eur(bsp.luecke)} and needs social assistance after about ${bsp.monateBisSchonvermoegen} months.`,
    faqs: [
      { q: 'Do I have to pay for my parent’s care home in Germany if I live abroad?', a: `Only if your own total annual income exceeds ${EN.eur(SH.jahreseinkommensgrenze_kinder)} (section 94(1a) SGB XII), wherever you live. The welfare office presumes the limit is not exceeded and may only ask for evidence if there are concrete indications. Each child counts separately; your spouse’s income is ignored. Enforcing a claim abroad is a separate question.` },
      { q: 'Will my parents’ house be sold to pay for the home?', a: 'A reasonable house stays protected while a spouse or other relatives live in it and are meant to keep living there (section 90(2) no. 8 SGB XII). If it stands empty it generally counts as an asset. If an immediate sale is impossible or a hardship, the welfare office should pay the assistance as a loan, often secured on the property (section 91 SGB XII).' },
      { q: 'Can the welfare office take back a house my parents gave us?', a: `Yes, if your parents can no longer meet their own needs after the gift: the right to reclaim it under section 528 of the Civil Code passes to the welfare office. It is excluded if ${SH.schenkung_rueckforderung_jahre} years had passed since the gift before the need arose (section 529). Instead of returning the gift, the recipient can pay the maintenance needed.` },
      { q: 'What does the spouse who stays at home have to contribute?', a: 'For social assistance for care, the income and assets of a spouse who is not separated are included (section 61 SGB XII). The spouse at home must still keep enough to live on: the income limit under section 85 includes an allowance for them and reasonable housing costs, and higher asset allowances apply to the couple.' },
    ],
    body: (h) => `
<h2>The order</h2>
${h.table(['Step', 'Who pays', 'What', 'Legal basis'], [
  ['1', 'Care fund', `fixed amount by grade (${h.eur(P.vollstationaer['2'])} to ${h.eur(P.vollstationaer['5'])}) and 15 to 75% supplement`, 'ss. 43, 43c SGB XI'],
  ['2', 'Resident', 'pension, rental income, interest', 's. 61 SGB XII'],
  ['3', 'Resident', `savings down to ${h.eur(SH.schonvermoegen)}`, 's. 90 SGB XII'],
  ['4', 'Spouse', 'income and assets, with allowances', 'ss. 61, 85 SGB XII'],
  ['5', 'State (where provided)', 'help with investment costs, e.g. Pflegewohngeld in NRW', 'state law'],
  ['6', 'Welfare office', 'social assistance for care for the rest', 'ss. 61 ff. SGB XII'],
  ['7', 'Children', `only with annual income above ${h.eur(SH.jahreseinkommensgrenze_kinder)}`, 's. 94(1a) SGB XII'],
], 'Simplified order; gifts made in the last ten years can be reclaimed.', ['l', 'l', 'l', 'l'])}
<p>What is missing from the list matters too: children are not contacted automatically, and a child on an average income pays nothing. Since the Relatives Relief Act the limit is ${h.eur(SH.jahreseinkommensgrenze_kinder)} per child, and the office presumes it is not exceeded (${h.src('sgb12_94', 'section 94(1a) SGB XII')}). The mini calculator above checks the threshold.</p>

<h2>The worked example</h2>
<p>A father with care grade 3 moves into a home in Hesse. The first-year co-payment there averages ${h.eur(heimMonat(he, 1).eigenanteil)}, his pension is ${h.eur(1600)}, so ${h.eur(bsp.luecke)} is missing each month. Of his ${h.eur(45000)} savings, ${h.eur(SH.schonvermoegen)} may be kept; the rest covers the gap for about ${bsp.monateBisSchonvermoegen} months, helped by the supplement rising from month 13. The family then applies for ${h.a('hilfe-zur-pflege', 'social assistance for care')}. His daughter earns ${h.eur(70000)} a year and is not asked to pay, whereas his son, earning ${h.eur(110000)}, could expect a request for information and a maintenance claim.</p>
<!--mini:reichweite-->

<h2>How the application to the welfare office works</h2>
<p>The responsible office is usually the welfare office where the home is, or a regional authority depending on the state. A short written request is enough to apply; the office then sends forms about income, assets, housing and relatives with maintenance obligations. Typically needed are pension statements, recent bank statements, proof of savings, life and funeral insurance policies, the care home contract with current fees and the care fund’s grade decision. Children are not asked to fill in income forms unless there are indications that they earn more than ${h.eur(SH.jahreseinkommensgrenze_kinder)}; usually only names and addresses are requested.</p>
<p>Until the decision arrives, the home’s bills keep coming. Many homes defer the gap once an application has demonstrably been made. Timing matters: the welfare office helps from the day it learns of the need. Applying a few weeks before savings reach the protected amount avoids gaps, and a relative abroad can do this by post or email with a power of attorney.</p>

<h2>What is protected</h2>
<p>Reasonable household goods, items needed for work or training, family heirlooms whose sale would be a hardship, a reasonable owner-occupied house while relatives live in it, and small cash amounts need not be used (${h.src('sgb12_90', 'section 90(2) SGB XII')}). The small cash amount is ${h.eur(SH.schonvermoegen)} per adult (${h.src('dv90', 'section 1 of the implementing regulation')}). Reasonable funeral provision is usually protected in practice; confirm with the welfare office.</p>

<h2>Gifts and transfers</h2>
<p>If the person in care gave away money or property in the last ten years and can now no longer meet their needs, they can reclaim the gift, and that claim passes to the welfare office (${h.src('bgb528', 'section 528 Civil Code')}). After ten years reclaiming is excluded (${h.src('bgb529', 'section 529 Civil Code')}). Families planning to transfer a house to the children should know this deadline and take advice first.</p>

<h2>What the family can do early</h2>
<ul>
<li>Compare the chosen home’s co-payment with the pension before signing the contract.</li>
<li>Check state help such as the Pflegewohngeld in ${h.a('pflegeheim-kosten-nordrhein-westfalen', 'North Rhine-Westphalia')}.</li>
<li>Apply for social assistance for care before savings reach the protected amount; the welfare office does not pay for periods before it knew of the need.</li>
<li>Sort out powers of attorney so a child, wherever they live, may act towards the home, fund and welfare office.</li>
<li>Keep all decisions, invoices and bank statements in one place; the welfare office usually asks for the last three to six months.</li>
</ul>
`,
  },
});
