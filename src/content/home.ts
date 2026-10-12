/** Startseite (Säule): Pflegegeld 2026 und alle Leistungen nach Pflegegrad, in beiden Sprachen. Rechtswerte über P, Beispiele aus dem Motor. */
import type { FAQ, Helpers } from '../lib/guide-types';
import { kombination, jahr } from '../lib/engine/leistungen';
import { kosten, heimMonat } from '../lib/engine/heim';
import { P } from '../lib/fmt';

interface HomeText { title: string; description: string; h1: string; intro: string; resume: (h: Helpers) => string; faqs: (h: Helpers) => FAQ[]; body: (h: Helpers) => string }

const PG = P.pflegegeld, SL = P.sachleistung;
/** Beispiele aus dem Motor: Grad 3 mit Pflegedienst für 600 €, Grad 4 nur Angehörige, Bundesschnitt Heim. */
const k3 = kombination(3, 600);
const j4 = jahr({ grad: 4, versorgung: 'angehoerige' });
const bund1 = heimMonat(kosten('BUND'), 1);
const bund4 = heimMonat(kosten('BUND'), 37);

export const HOME: Record<'de' | 'en', HomeText> = {
  de: {
    title: 'Pflegegeld 2026: Tabelle und Rechner für Pflegegrad 1 bis 5',
    description: `Pflegegeld 2026: ${PG['2']} € bis ${PG['5']} € im Monat je Pflegegrad, Sachleistung, Kombination, Entlastungsbetrag ${P.entlastungsbetrag.monat} € und Jahresbetrag ${P.jahresbetrag.euro} € in einem Rechner.`,
    h1: 'Pflegegeld 2026 und alle Leistungen nach Pflegegrad',
    intro: 'Wählen Sie den Pflegegrad und wer pflegt: Der Rechner zeigt, was jeden Monat aufs Konto kommt und welche Töpfe daneben bereitstehen.',
    resume: (h) => `Das Pflegegeld beträgt 2026 unverändert ${h.eur(PG['2'])} im Monat bei Pflegegrad 2, ${h.eur(PG['3'])} bei Pflegegrad 3, ${h.eur(PG['4'])} bei Pflegegrad 4 und ${h.eur(PG['5'])} bei Pflegegrad 5 (§ 37 SGB XI); die Beträge gelten seit dem 1. Januar 2025, die nächste gesetzliche Anpassung ist für den 1. Januar 2028 vorgesehen (§ 30 SGB XI). Pflegegrad 1 bekommt kein Pflegegeld. Wer statt der Familie einen Pflegedienst beauftragt, erhält die Sachleistung von bis zu ${h.eur(SL['2'])}, ${h.eur(SL['3'])}, ${h.eur(SL['4'])} oder ${h.eur(SL['5'])}; wer beides mischt, bekommt die Kombinationsleistung, bei der das Pflegegeld um den genutzten Anteil der Sachleistung sinkt. Dazu kommen für alle Grade zu Hause der Entlastungsbetrag von ${h.eur(P.entlastungsbetrag.monat)} und Pflegehilfsmittel bis ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} im Monat, ab Pflegegrad 2 der Gemeinsame Jahresbetrag von ${h.eur(P.jahresbetrag.euro)} für Verhinderungs- und Kurzzeitpflege. Ein Beispiel aus dem Rechner: Pflegegrad 4, nur Angehörige pflegen, ergibt ${h.eur(j4.pflegegeld)} Pflegegeld im Monat und mit allen Töpfen ${h.eur(j4.jahrGesamt)} im Jahr.`,
    faqs: (h) => [
      { q: 'Wird das Pflegegeld 2026 erhöht?', a: `Nein. Die Beträge stiegen zuletzt am 1. Januar 2025 um 4,5 Prozent und gelten 2026 unverändert: ${h.eur(PG['2'])}, ${h.eur(PG['3'])}, ${h.eur(PG['4'])} und ${h.eur(PG['5'])} für die Grade 2 bis 5. § 30 SGB XI sieht die nächste Anpassung zum 1. Januar 2028 vor, nach der Kerninflation der drei Vorjahre. Der Regierungsentwurf vom 30. September 2026 würde daran etwas ändern, ist aber noch kein Gesetz.` },
      { q: 'Wann und wie wird das Pflegegeld ausgezahlt?', a: 'Die Pflegekasse überweist es monatlich an die pflegebedürftige Person, nicht an die pflegenden Angehörigen; die Familie regelt die Weitergabe selbst. Beginnt oder endet der Anspruch mitten im Monat, wird tageweise gekürzt, der Monat zählt dabei mit 30 Tagen. Im Sterbemonat wird das volle Pflegegeld noch gezahlt (§ 37 Abs. 2 SGB XI).' },
      { q: 'Muss ich das Pflegegeld versteuern oder bei anderen Leistungen angeben?', a: 'Die pflegebedürftige Person versteuert es nicht, und bei einkommensabhängigen Sozialleistungen wie Bürgergeld oder Wohngeld zählt es nicht als Einkommen (§ 13 Abs. 5 SGB XI). Gibt sie es an pflegende Angehörige weiter, ist es für diese bis zur Höhe des Pflegegeldes steuerfrei (§ 3 Nr. 36 EStG). Wer etwas für die Pflege bekommt, kann dafür aber nicht zusätzlich den Pflege-Pauschbetrag ansetzen.' },
      { q: 'Was passiert, wenn der Beratungsbesuch vergessen wird?', a: `Wer Pflegegeld bezieht, muss in den Pflegegraden 2 bis 5 einmal im Halbjahr einen Beratungseinsatz zu Hause abrufen; bei Pflegegrad 4 und 5 ist auf Wunsch alle ${P.beratung.pg45_monate} Monate ein Besuch möglich (§ 37 Abs. 3). Fehlt der Nachweis, kürzt die Pflegekasse das Pflegegeld angemessen und entzieht es im Wiederholungsfall (§ 37 Abs. 6). Die Kosten des Besuchs trägt die Kasse.` },
      { q: 'Kann ich Pflegegeld und Pflegedienst gleichzeitig bekommen?', a: `Ja, über die Kombinationsleistung nach § 38 SGB XI. Rechnet der Pflegedienst bei Pflegegrad 3 ${h.eur(600)} ab, sind das ${h.pct(k3.anteil, 1)} der Sachleistung von ${h.eur(SL['3'])}; das Pflegegeld sinkt um denselben Anteil auf ${h.eur(k3.pflegegeld, 2)}. An die gewählte Aufteilung ist man sechs Monate gebunden, die Kasse rechnet aber nach der tatsächlichen Rechnung ab.` },
      { q: 'Gibt es Pflegegeld auch im Pflegeheim?', a: `Nein. Im Heim zahlt die Pflegekasse einen festen Betrag direkt an die Einrichtung, ${h.eur(P.vollstationaer['2'])} bis ${h.eur(P.vollstationaer['5'])} je nach Grad (§ 43), dazu einen Zuschlag auf den Eigenanteil, der mit der Aufenthaltsdauer von 15 auf 75 Prozent steigt. Den Rest zahlt die Bewohnerin selbst; im Bundesschnitt sind das im ersten Jahr ${h.eur(bund1.eigenanteil)} im Monat.` },
      { q: 'Wie schnell muss die Pflegekasse über den Antrag entscheiden?', a: `Innerhalb von ${P.verfahren.entscheidung_arbeitstage} Arbeitstagen nach Eingang des Antrags, schriftlich (§ 18c Abs. 1 SGB XI). Das Pflegegeld wird ab dem Monat der Antragstellung gezahlt, also rückwirkend, wenn der Bescheid später kommt. Deshalb lohnt es sich, den Antrag sofort formlos zu stellen, auch telefonisch, und die Unterlagen nachzureichen.` },
      { q: 'Steht das Geld nach dem Tod der gepflegten Person den Angehörigen zu?', a: 'Das Pflegegeld wird bis zum Ende des Sterbemonats gezahlt; was danach noch überwiesen wird, fordert die Kasse über die Bank zurück. Offene Erstattungen, etwa aus dem Entlastungsbetrag oder der Verhinderungspflege, können die Erben mit den Belegen noch geltend machen, wenn die Leistung vor dem Tod erbracht wurde.' },
    ],
    body: (h) => `
<h2>Was der Pflegegrad im Monat bedeutet</h2>
<p>Der Pflegegrad entscheidet über fast alles, was die Pflegeversicherung zahlt. Er wird nicht nach Diagnosen vergeben, sondern nach dem, was ein Mensch im Alltag noch selbst kann: sich bewegen, sich orientieren, essen, sich waschen, mit Medikamenten und Arztterminen umgehen, den Tag gestalten. Der Medizinische Dienst prüft dafür 64 Kriterien in sechs Modulen und rechnet sie in höchstens 100 Punkte um. Ab 12,5 Punkten gibt es Pflegegrad 1, ab 27 Pflegegrad 2, ab 47,5 Pflegegrad 3, ab 70 Pflegegrad 4 und ab 90 Pflegegrad 5 (${h.src('sgb11_15', '§ 15 SGB XI')}). Wer seinen Grad noch nicht kennt, kann ihn mit dem ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} aus genau diesen Kriterien schätzen; der Rechner oben übernimmt dann den Grad.</p>
${h.table(['Leistung 2026', 'PG 1', 'PG 2', 'PG 3', 'PG 4', 'PG 5'], [
  ['Pflegegeld (§ 37)', '–', h.eur(PG['2']), h.eur(PG['3']), h.eur(PG['4']), h.eur(PG['5'])],
  ['Sachleistung bis (§ 36)', '–', h.eur(SL['2']), h.eur(SL['3']), h.eur(SL['4']), h.eur(SL['5'])],
  ['Tages- und Nachtpflege bis (§ 41)', '–', h.eur(P.tagespflege['2']), h.eur(P.tagespflege['3']), h.eur(P.tagespflege['4']), h.eur(P.tagespflege['5'])],
  ['Pflegeheim, an das Heim (§ 43)', h.eur(P.vollstationaer['1']), h.eur(P.vollstationaer['2']), h.eur(P.vollstationaer['3']), h.eur(P.vollstationaer['4']), h.eur(P.vollstationaer['5'])],
  ['Entlastungsbetrag (§ 45b)', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat)],
  ['Jahresbetrag Verhinderung + Kurzzeit (§ 42a)', '–', h.eur(P.jahresbetrag.euro), h.eur(P.jahresbetrag.euro), h.eur(P.jahresbetrag.euro), h.eur(P.jahresbetrag.euro)],
], 'Monatsbeträge, der Jahresbetrag pro Kalenderjahr. Stand SGB XI ' + P.sgb11_stand + '.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Die Tabelle zeigt Höchstbeträge. Nur das Pflegegeld landet als Geld auf dem Konto der pflegebedürftigen Person. Alle anderen Zeilen sind Budgets: Die Pflegekasse bezahlt damit eine Rechnung, entweder direkt an den Pflegedienst oder die Tagespflege, oder sie erstattet Ihnen Belege. Das erklärt, warum zwei Familien mit demselben Pflegegrad sehr unterschiedlich viel herausholen. Die eine nimmt das Pflegegeld und lässt den Entlastungsbetrag verfallen, die andere nutzt Pflegegeld, Entlastungsbetrag, Hilfsmittelpauschale und den Jahresbetrag für zwei Wochen Urlaub der pflegenden Tochter.</p>

<h2>Pflegegeld, Sachleistung oder beides</h2>
<p>Das ${h.a('pflegegeld', 'Pflegegeld')} ist für Familien gedacht, die die Pflege selbst stemmen, mit Angehörigen, Freunden oder Nachbarn. Wer einen zugelassenen ambulanten Dienst holt, nutzt die ${h.a('pflegesachleistung', 'Pflegesachleistung')}: Der Dienst rechnet direkt mit der Kasse ab, bis zur Grenze des Grades. Die beiden Töpfe sind nicht gleich groß. Bei Pflegegrad 3 stehen ${h.eur(PG['3'])} Pflegegeld einer Sachleistung von ${h.eur(SL['3'])} gegenüber, weil professionelle Pflege mehr kostet als die Anerkennung für Angehörige.</p>
<p>Die meisten Familien mischen. Dann greift die ${h.a('kombinationsleistung', 'Kombinationsleistung')}: Die Kasse prüft jeden Monat, welcher Prozentsatz der Sachleistung verbraucht ist, und zahlt das Pflegegeld nur noch zum Rest. Ein Pflegedienst, der bei Pflegegrad 3 für ${h.eur(600)} morgens beim Duschen hilft, verbraucht ${h.pct(k3.anteil, 1)} des Topfs; von den ${h.eur(PG['3'])} Pflegegeld bleiben ${h.eur(k3.pflegegeld, 2)}. Das Rechenbeispiel zeigt auch die Falle: Eine Rechnung über dem Sachleistungsbetrag zahlt die Familie selbst, und das Pflegegeld fällt dann ganz weg.</p>
<!--mini:kombiSchnell-->

<h2>Die Töpfe, die viele liegen lassen</h2>
<p>Drei Leistungen werden besonders oft nicht abgerufen, weil sie nur gegen Beleg fließen.</p>
<ul>
<li>Der ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} von ${h.eur(P.entlastungsbetrag.monat)} im Monat steht allen Pflegegraden zu, auch Pflegegrad 1. Er bezahlt anerkannte Alltagshelfer, Betreuungsgruppen, Haushaltshilfe über einen Pflegedienst oder die Eigenanteile in Tages- und Kurzzeitpflege. Was im Jahr übrig bleibt, verfällt nicht sofort: Es kann bis zum 30. Juni des Folgejahres genutzt werden (${h.src('sgb11_45b', '§ 45b SGB XI')}).</li>
<li>Die ${h.a('pflegehilfsmittel', 'Pflegehilfsmittel zum Verbrauch')}, also Handschuhe, Bettschutzeinlagen und Desinfektionsmittel, bezahlt die Kasse bis ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} im Monat ohne Zuzahlung.</li>
<li>Der Gemeinsame Jahresbetrag von ${h.eur(P.jahresbetrag.euro)} für ${h.a('verhinderungspflege', 'Verhinderungspflege')} und ${h.a('kurzzeitpflege', 'Kurzzeitpflege')} gilt seit dem 1. Juli 2025 als ein einziger Topf. Er deckt die Vertretung, wenn die pflegende Person Urlaub macht oder krank wird, und den vorübergehenden Platz in einer Einrichtung, etwa nach einem Krankenhausaufenthalt (${h.src('sgb11_42a', '§ 42a SGB XI')}).</li>
</ul>
<p>Rechnet man den Pflegegrad 4 mit nur pflegenden Angehörigen durch, sind das ${h.eur(j4.pflegegeld * 12)} Pflegegeld im Jahr. Mit Entlastungsbetrag, Hilfsmittelpauschale und Jahresbetrag kommt die Familie auf ${h.eur(j4.jahrGesamt)}. Der Unterschied ist keine Kleinigkeit, sondern ein Teil des Haushaltsbudgets, der ohne Rechnungen einfach entfällt.</p>

<h2>Vom Antrag bis zum ersten Geld</h2>
<ol>
<li><strong>Antrag stellen.</strong> Ein Anruf oder eine formlose Nachricht an die Pflegekasse genügt; sie sitzt bei der Krankenkasse. Der Antrag wirkt ab dem Monat, in dem er eingeht. Mehr dazu unter ${h.a('pflegegrad-beantragen', 'Pflegegrad beantragen')}.</li>
<li><strong>Begutachtung.</strong> Der Medizinische Dienst, bei Privatversicherten Medicproof, kommt nach Hause oder begutachtet in bestimmten Fällen per Telefon oder Video. Ein Pflegetagebuch über zwei Wochen hilft, nichts zu vergessen.</li>
<li><strong>Bescheid.</strong> Die Kasse muss innerhalb von ${P.verfahren.entscheidung_arbeitstage} Arbeitstagen entscheiden und schickt das Gutachten mit (${h.src('sgb11_18c', '§ 18c SGB XI')}).</li>
<li><strong>Prüfen und gegebenenfalls widersprechen.</strong> Passt der Grad nicht, haben Sie einen Monat Zeit für den ${h.a('widerspruch-pflegegrad', 'Widerspruch')}. Verschlechtert sich der Zustand später, stellen Sie einen ${h.a('hoeherstufung-pflegegrad', 'Antrag auf Höherstufung')}.</li>
<li><strong>Leistungen wählen.</strong> Pflegegeld, Sachleistung oder Kombination; dazu Entlastungsbetrag, Hilfsmittel und gegebenenfalls ein Zuschuss für den Umbau der Wohnung bis ${h.eur(P.wohnumfeld.je_massnahme)}.</li>
</ol>

<h2>Wenn die Pflege zu Hause nicht mehr reicht</h2>
<p>Im Pflegeheim ändert sich die Logik. Pflegegeld gibt es dann nicht mehr; die Kasse zahlt einen festen Betrag an das Heim und zusätzlich einen Leistungszuschlag auf den pflegebedingten Eigenanteil, der im ersten Jahr 15 Prozent beträgt und ab dem vierten Jahr 75 Prozent (${h.src('sgb11_43c', '§ 43c SGB XI')}). Unterkunft, Verpflegung und Investitionskosten bleiben trotzdem ganz bei der Bewohnerin. Im Bundesschnitt waren das nach den Daten des vdek vom 1. Juli 2026 im ersten Jahr ${h.eur(bund1.eigenanteil)} im Monat und ab dem vierten Jahr noch ${h.eur(bund4.eigenanteil)}. Zwischen den Ländern liegen mehrere hundert Euro; der ${h.a('pflegeheim-kosten', 'Pflegeheim-Rechner')} rechnet mit dem Durchschnitt Ihres Landes und mit Ihrem Aufenthaltsmonat, und die Länderseiten wie ${h.a('pflegeheim-kosten-nordrhein-westfalen', 'Nordrhein-Westfalen')} oder ${h.a('pflegeheim-kosten-sachsen-anhalt', 'Sachsen-Anhalt')} erklären, was dort anders ist.</p>

<h2>Was die Familie selbst absichern sollte</h2>
<p>Wer einen Angehörigen mindestens zehn Stunden in der Woche an zwei Tagen pflegt und höchstens 30 Stunden arbeitet, bekommt von der Pflegekasse Beiträge zur Rentenversicherung gezahlt. Bei Pflegegrad 5 und reinem Pflegegeld entspricht ein Jahr Pflege fast einem Jahr Arbeit zum Durchschnittslohn; der ${h.a('rente-pflegende-angehoerige', 'Rentenrechner für pflegende Angehörige')} zeigt den Wert für jeden Grad. Dazu kommen der ${h.a('pflege-pauschbetrag', 'Pflege-Pauschbetrag')} in der Steuererklärung und bis zu zehn Tage ${h.a('pflegezeit', 'Pflegeunterstützungsgeld')}, wenn eine Pflegesituation plötzlich auftritt.</p>

<h2>Was 2027 kommen könnte</h2>
<p>Das Bundeskabinett hat am 30. September 2026 den Entwurf eines Pflegeneuordnungsgesetzes beschlossen (${h.src('bmgPnogPm', 'Pressemitteilung des BMG')}). Er sieht unter anderem ein Sozialraumbudget anstelle des Entlastungsbetrags für Alltagsunterstützung, ein Überbrückungsbudget für Notfälle und geänderte Begutachtungsregeln für die Grade 1 bis 3 vor. Das ist ein Entwurf: Bundestag und Bundesrat beraten noch, und bis zur Verkündung gilt das Recht, mit dem diese Seite rechnet. Was bekannt ist und was nicht, steht unter ${h.a('pflegereform-2027', 'Pflegereform 2027')}.</p>
`,
  },
  en: {
    title: 'Pflegegeld 2026: German Care Allowance by Care Grade',
    description: `German care allowance (Pflegegeld) 2026: ${PG['2']} to ${PG['5']} euros a month by care grade, plus care services, the ${P.entlastungsbetrag.monat} euro relief amount and respite budget in one calculator.`,
    h1: 'German care allowance and benefits by care grade, 2026',
    intro: 'Pick the care grade and who does the caring: the calculator shows what reaches the bank account each month and which budgets sit alongside it.',
    resume: (h) => `In 2026 the German care allowance (Pflegegeld) stays at ${h.eur(PG['2'])} a month for care grade 2, ${h.eur(PG['3'])} for grade 3, ${h.eur(PG['4'])} for grade 4 and ${h.eur(PG['5'])} for grade 5 under section 37 of Book XI of the Social Code (SGB XI). These amounts have applied since 1 January 2025, and the law schedules the next increase for 1 January 2028. Grade 1 gets no allowance. If a registered home care service does the work instead of the family, the long-term care fund (Pflegekasse) pays that service up to ${h.eur(SL['2'])}, ${h.eur(SL['3'])}, ${h.eur(SL['4'])} or ${h.eur(SL['5'])} a month; families who mix both receive a reduced allowance in proportion to the share of the services budget they used. On top of that, everyone cared for at home is entitled to a relief amount of ${h.eur(P.entlastungsbetrag.monat)} and consumable care aids of up to ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} a month, and from grade 2 a joint annual budget of ${h.eur(P.jahresbetrag.euro)} covers respite and short-term care. For example, grade 4 with family care only means ${h.eur(j4.pflegegeld)} a month in allowance and ${h.eur(j4.jahrGesamt)} a year once every budget is counted.`,
    faqs: (h) => [
      { q: 'Does the German care allowance go up in 2026?', a: `No. It last rose by 4.5 percent on 1 January 2025 and stays at ${h.eur(PG['2'])}, ${h.eur(PG['3'])}, ${h.eur(PG['4'])} and ${h.eur(PG['5'])} for grades 2 to 5 throughout 2026. Section 30 SGB XI sets the next adjustment for 1 January 2028, linked to core inflation over three years. The government bill of 30 September 2026 would change the system, but it is not law yet.` },
      { q: 'Who receives the Pflegegeld, the person cared for or the carer?', a: 'The fund pays it every month to the person who needs care, not to the relatives who look after them; families decide among themselves how to pass it on. If the entitlement starts or ends mid-month the amount is reduced day by day, counting the month as 30 days, and the full allowance is still paid for the month in which the person dies.' },
      { q: 'Does the allowance continue if my parent lives or travels abroad?', a: `Inside the EU, the EEA and Switzerland the cash allowance does not pause (section 34(1a) SGB XI), as long as the person stays insured with the German fund. Elsewhere it continues only for temporary stays of up to ${P.ausland.wochen_vorruebergehend} weeks a calendar year; services in kind only if the usual carer travels along. Tell the Pflegekasse before a move.` },
      { q: 'Who can claim if they only recently moved to Germany?', a: `Benefits require at least ${P.vorversicherung.jahre} years of membership or family cover in the German long-term care insurance within the ${P.vorversicherung.zeitraum_jahre} years before the application (section 33(2) SGB XI). Children meet the condition through a parent. Periods in a private German policy count when someone switches into the statutory scheme.` },
      { q: 'Do I need to speak German for the assessment?', a: 'The Medical Service (Medizinischer Dienst) conducts the home assessment in German. You may have a relative or friend translate, and it helps to prepare a two-week care diary in German listing every task you help with. The outcome depends on what the assessor observes and is told, so a missing explanation can cost points.' },
      { q: 'Is the care allowance taxable for the family member who receives it?', a: 'For the person in need of care it is tax-free and it does not count as income for means-tested benefits (section 13(5) SGB XI). Passed on to a relative who provides the care, it stays tax-free up to the amount of the allowance (section 3 no. 36 Income Tax Act). A carer who is paid in this way cannot also claim the carer’s lump sum of 600 to 1,800 euros.' },
      { q: 'What does a care home cost compared with care at home?', a: `In a care home the fund stops paying the allowance and pays the home a fixed amount of ${h.eur(P.vollstationaer['2'])} to ${h.eur(P.vollstationaer['5'])} plus a supplement that grows from 15 to 75 percent of the care co-payment. The resident still pays board, lodging and investment costs; the national average co-payment in the first year was ${h.eur(bund1.eigenanteil)} a month on 1 July 2026.` },
      { q: 'How long does the Pflegekasse take to decide?', a: `It must send a written decision within ${P.verfahren.entscheidung_arbeitstage} working days of receiving the application (section 18c SGB XI). Benefits are paid from the month the application arrived, so a late decision still pays back to that month. A phone call or short email is enough to apply; the form can follow.` },
    ],
    body: (h) => `
<h2>How the German system decides what you get</h2>
<p>Almost everything the German long-term care insurance pays depends on the care grade (Pflegegrad). It is not tied to a diagnosis. The Medical Service (Medizinischer Dienst, often still called MDK) visits and scores 64 criteria in six modules: moving around, understanding and communicating, behaviour, washing and eating, coping with medication and appointments, and organising the day. The result is converted into a score out of 100. From 12.5 points the person has grade 1, from 27 grade 2, from 47.5 grade 3, from 70 grade 4 and from 90 grade 5 (${h.src('sgb11_15', 'section 15 SGB XI')}). If you do not know the grade yet, the ${h.a('pflegegrad-rechner', 'care grade calculator')} works through the same criteria.</p>
${h.table(['Benefit 2026', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5'], [
  ['Care allowance (s. 37)', '–', h.eur(PG['2']), h.eur(PG['3']), h.eur(PG['4']), h.eur(PG['5'])],
  ['Home care services up to (s. 36)', '–', h.eur(SL['2']), h.eur(SL['3']), h.eur(SL['4']), h.eur(SL['5'])],
  ['Day or night care up to (s. 41)', '–', h.eur(P.tagespflege['2']), h.eur(P.tagespflege['3']), h.eur(P.tagespflege['4']), h.eur(P.tagespflege['5'])],
  ['Care home, paid to the home (s. 43)', h.eur(P.vollstationaer['1']), h.eur(P.vollstationaer['2']), h.eur(P.vollstationaer['3']), h.eur(P.vollstationaer['4']), h.eur(P.vollstationaer['5'])],
  ['Relief amount (s. 45b)', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat)],
  ['Respite + short-term care per year (s. 42a)', '–', h.eur(P.jahresbetrag.euro), h.eur(P.jahresbetrag.euro), h.eur(P.jahresbetrag.euro), h.eur(P.jahresbetrag.euro)],
], 'Monthly amounts; the joint budget is per calendar year.', ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Only the first line is money paid into an account. Everything else is a budget the fund spends on your behalf: it pays the care service or the day centre directly, or it refunds receipts you send in. That is why two families with the same grade can end up with very different totals. One takes the allowance and never claims anything else; the other also uses the relief amount for a cleaner from a registered service, orders gloves and bed pads through the consumables allowance, and books two weeks of replacement care so the main carer can take a holiday.</p>

<h2>Allowance, services, or a mix</h2>
<p>The ${h.a('pflegegeld', 'care allowance')} is meant for families who organise care themselves. If you bring in a registered home care service (ambulanter Pflegedienst), you use the ${h.a('pflegesachleistung', 'services in kind')} budget instead, which the service bills to the fund. The budgets differ: at grade 3 the allowance is ${h.eur(PG['3'])} while the services budget is ${h.eur(SL['3'])}, because professional care costs more than the recognition paid to relatives.</p>
<p>Most families combine both. The ${h.a('kombinationsleistung', 'combined benefit')} works by percentage: a care service billing ${h.eur(600)} at grade 3 uses ${h.pct(k3.anteil, 1)} of the services budget, so the allowance drops by the same share to ${h.eur(k3.pflegegeld, 2)}. A bill above the services budget is the family’s to pay, and the allowance then disappears entirely.</p>
<!--mini:kombiSchnell-->

<h2>The budgets expat families most often miss</h2>
<ul>
<li>The ${h.a('entlastungsbetrag', 'relief amount')} of ${h.eur(P.entlastungsbetrag.monat)} a month applies at every grade, including grade 1. It pays recognised everyday helpers, day centre fees and household help from a care service. Unused money carries over until 30 June of the following year (${h.src('sgb11_45b', 'section 45b SGB XI')}).</li>
<li>${h.a('pflegehilfsmittel', 'Consumable care aids')} such as gloves, disposable bed protectors and disinfectant are covered up to ${h.eur(P.pflegehilfsmittel.verbrauch_monat)} a month with no co-payment.</li>
<li>Since 1 July 2025, ${h.a('verhinderungspflege', 'respite care')} and ${h.a('kurzzeitpflege', 'short-term care')} share one annual budget of ${h.eur(P.jahresbetrag.euro)} (${h.src('sgb11_42a', 'section 42a SGB XI')}). It covers a replacement carer when you travel or fall ill, or a temporary bed in a care facility after a hospital stay.</li>
</ul>
<p>Grade 4 with relatives doing the caring means ${h.eur(j4.pflegegeld * 12)} of allowance a year. Add the relief amount, consumables and the joint budget and the household can use ${h.eur(j4.jahrGesamt)}. For someone flying in from abroad to support a parent, knowing that a replacement carer is paid for can decide whether a trip home is possible at all.</p>

<h2>From application to first payment</h2>
<ol>
<li><strong>Apply.</strong> Contact the parent’s Pflegekasse, which sits with their health insurer. A phone call or email counts and benefits start from that month. See ${h.a('pflegegrad-beantragen', 'applying for a care grade')}.</li>
<li><strong>Assessment.</strong> The Medical Service, or Medicproof for privately insured people, assesses at home, in some cases by phone or video.</li>
<li><strong>Decision.</strong> The fund decides within ${P.verfahren.entscheidung_arbeitstage} working days and sends the assessment report (${h.src('sgb11_18c', 'section 18c SGB XI')}).</li>
<li><strong>Check it.</strong> If the grade looks too low you have one month to ${h.a('widerspruch-pflegegrad', 'object')}; later deterioration is handled with a ${h.a('hoeherstufung-pflegegrad', 'request for a higher grade')}.</li>
<li><strong>Choose benefits.</strong> Allowance, services or a mix, plus relief amount, aids and up to ${h.eur(P.wohnumfeld.je_massnahme)} per home adaptation.</li>
</ol>

<h2>When home care is no longer enough</h2>
<p>In a care home there is no allowance. The fund pays the home a fixed amount and a supplement on the care part of the co-payment, rising from 15 percent in the first year to 75 percent from the fourth (${h.src('sgb11_43c', 'section 43c SGB XI')}). Board, lodging and investment costs stay with the resident. On the vdek figures of 1 July 2026 the national average was ${h.eur(bund1.eigenanteil)} a month in year one and ${h.eur(bund4.eigenanteil)} from year four. The ${h.a('pflegeheim-kosten', 'care home calculator')} uses the average for each state, and pages such as ${h.a('pflegeheim-kosten-nordrhein-westfalen', 'North Rhine-Westphalia')} or ${h.a('pflegeheim-kosten-sachsen-anhalt', 'Saxony-Anhalt')} explain what differs there.</p>

<h2>Protecting the carer</h2>
<p>A relative who cares for at least ten hours a week over two days and works no more than 30 hours earns German state pension entitlements paid by the fund; the ${h.a('rente-pflegende-angehoerige', 'carer pension calculator')} shows how much. Carers can also claim the ${h.a('pflege-pauschbetrag', 'carer’s tax lump sum')} and up to ten days of ${h.a('pflegezeit', 'carer’s leave allowance')} in an emergency.</p>

<h2>The 2027 reform is still a draft</h2>
<p>On 30 September 2026 the federal cabinet adopted the draft Care Reorganisation Act (Pflegeneuordnungsgesetz, ${h.src('bmgPnogPm', 'ministry press release')}). It would replace the relief amount for everyday support with a local support budget, add a bridging budget for emergencies and change assessment rules for grades 1 to 3. Parliament has not passed it; until it is published in the Federal Law Gazette, the current law used here applies. See ${h.a('pflegereform-2027', 'the 2027 care reform')}.</p>
`,
  },
};
