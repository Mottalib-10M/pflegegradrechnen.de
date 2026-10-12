import { defineGuide } from '../../lib/guide-types';
import { jahr, kombination } from '../../lib/engine/leistungen';
import { rentenpunkte, pauschbetrag } from '../../lib/engine/angehoerige';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Grad 2 nur Familie; Grad 2 mit Pflegedienst für 400 €; Grad 2 mit Tagespflege. */
const fam = jahr({ grad: 2, versorgung: 'angehoerige' });
const k400 = kombination(2, 400);
const tp = jahr({ grad: 2, versorgung: 'angehoerige', tagespflegeGenutzt: true });
const rente = rentenpunkte(2, 'geld');
const pb = pauschbetrag(2);
const S = P.nba.schwellen;

export default defineGuide({
  id: 'pflegegrad-2',
  group: 'grad',
  order: 30,
  mini: 'gradGeld',
  miniDefaults: { g: 2 },
  related: ['pflegegrad-1', 'pflegegrad-3', 'pflegegrad-rechner', 'entlastungsbetrag', 'tagespflege', 'hoeherstufung-pflegegrad'],
  sources: ['sgb11_15', 'sgb11_37', 'sgb11_36', 'sgb11_41', 'sgb11_42a', 'sgb11_45b'],
  de: {
    slug: 'pflegegrad-2',
    nav: 'Pflegegrad 2',
    card: `Der erste Grad mit Pflegegeld: ${DE.eur(P.pflegegeld['2'])} oder ${DE.eur(P.sachleistung['2'])} Sachleistung, dazu die Töpfe, die oft mehr bringen.`,
    title: 'Pflegegrad 2: wie viel Geld 2026, Punkte und Leistungen',
    description: `Pflegegrad 2 ab ${DE.num(S[1])} Punkten: ${DE.eur(P.pflegegeld['2'])} Pflegegeld oder ${DE.eur(P.sachleistung['2'])} Sachleistung im Monat 2026, dazu Tagespflege, Entlastungsbetrag und Jahresbetrag für Vertretung.`,
    h1: 'Pflegegrad 2: was er 2026 bringt und wann er vorliegt',
    intro: 'Der Grad, bei dem zum ersten Mal Pflegegeld fließt, und bei dem die Budgets neben dem Pflegegeld oft mehr wert sind als das Pflegegeld selbst.',
    resume: `Pflegegrad 2 liegt vor, wenn das Gutachten zwischen ${DE.num(S[1])} und unter ${DE.num(S[2], 1)} Gesamtpunkten ergibt, also erhebliche Beeinträchtigungen der Selbständigkeit (§ 15 Abs. 3 SGB XI). Es ist der erste Grad mit Pflegegeld: ${DE.eur(P.pflegegeld['2'])} im Monat, wenn die Familie pflegt, oder Sachleistungen eines Pflegedienstes bis ${DE.eur(P.sachleistung['2'])}. Kommt ein Dienst für ${DE.eur(400)} dazu, sind ${DE.pct(k400.anteil, 1)} der Sachleistung verbraucht und vom Pflegegeld bleiben ${DE.eur(k400.pflegegeld, 2)}. Neben dem Pflegegeld stehen bei Pflegegrad 2 der Entlastungsbetrag von ${DE.eur(P.entlastungsbetrag.monat)}, Pflegehilfsmittel bis ${DE.eur(P.pflegehilfsmittel.verbrauch_monat)}, ein eigener Topf für die Tagespflege von ${DE.eur(P.tagespflege['2'])} im Monat und der Gemeinsame Jahresbetrag von ${DE.eur(P.jahresbetrag.euro)} für Verhinderungs- und Kurzzeitpflege. Pflegt nur die Familie, kommen ohne Tagespflege ${DE.eur(fam.jahrGesamt)} im Jahr zusammen, von denen nur ${DE.eur(fam.jahrAufsKonto)} als Geld ankommen. Im Pflegeheim zahlt die Kasse ${DE.eur(P.vollstationaer['2'])} an die Einrichtung.`,
    faqs: [
      { q: 'Welche Einschränkungen führen typischerweise zu Pflegegrad 2?', a: 'Häufig sind es Menschen, die sich noch weitgehend selbst versorgen, aber beim Duschen, beim Anziehen der Strümpfe oder bei der Treppe Hilfe brauchen, dazu Unterstützung bei Medikamenten und Arztterminen. Auch eine beginnende Demenz mit Orientierungsproblemen, aber ohne tägliche Unruhe, endet oft bei Pflegegrad 2. Entscheidend ist die Summe aller Module, nicht eine Diagnose.' },
      { q: 'Lohnt sich Tagespflege bei Pflegegrad 2?', a: `Ja, weil sie einen eigenen Topf von ${DE.eur(P.tagespflege['2'])} im Monat hat und weder Pflegegeld noch Sachleistung mindert (§ 41 Abs. 3 SGB XI). Mit einem Tag pro Woche in der Tagespflege steigt das, was der Haushalt im Jahr nutzen kann, auf bis zu ${DE.eur(tp.jahrGesamt)}. Essen und Investitionskosten deckt der Entlastungsbetrag.` },
      { q: 'Muss ich bei Pflegegrad 2 einen Beratungsbesuch machen?', a: 'Ja, wenn nur Pflegegeld bezogen wird: einmal pro Halbjahr ein Beratungseinsatz zu Hause (§ 37 Abs. 3 SGB XI). Ein Pflegedienst oder eine anerkannte Beratungsstelle kommt, die Kasse bezahlt den Besuch. Ohne Nachweis droht eine Kürzung des Pflegegeldes. Wer zusätzlich einen Pflegedienst hat, kann den Besuch freiwillig in Anspruch nehmen.' },
      { q: 'Wie viel Rente bringt die Pflege bei Pflegegrad 2?', a: `Für Angehörige, die mindestens zehn Stunden pro Woche an zwei Tagen pflegen und höchstens 30 Stunden arbeiten, zahlt die Kasse Beiträge auf ${DE.pct(rente.anteil, 0)} der Bezugsgröße. Ein Jahr mit reinem Pflegegeld ergibt ${DE.num(rente.punkteJahr, 4)} Entgeltpunkte, das sind ${DE.eur(rente.renteProJahr, 2)} Monatsrente nach dem Rentenwert ab Juli 2026.` },
      { q: 'Wann sollte man bei Pflegegrad 2 eine Höherstufung beantragen?', a: `Wenn sich der Bedarf dauerhaft erhöht hat, etwa weil nachts Hilfe nötig wird, die Person nicht mehr allein essen kann oder Verhaltensauffälligkeiten täglich auftreten. Pflegegrad 3 bringt ${DE.eur(P.pflegegeld['3'] - P.pflegegeld['2'])} mehr Pflegegeld und ${DE.eur(P.sachleistung['3'] - P.sachleistung['2'])} mehr Sachleistung im Monat. Der Antrag ist formlos, danach folgt ein neues Gutachten.` },
    ],
    body: (h) => `
<h2>Die Punkte hinter Pflegegrad 2</h2>
<p>Zwischen ${h.num(S[1])} und ${h.num(S[2], 1)} Punkten liegt eine breite Spanne, und genau deshalb ist Pflegegrad 2 der häufigste Grad bei der ersten Begutachtung. Wer knapp über ${h.num(S[1])} liegt, braucht vor allem bei einzelnen Handgriffen Hilfe. Wer nahe an ${h.num(S[2], 1)} kommt, ist im Alltag schon deutlich abhängig, und eine Verschlechterung um wenige Punkte führt in Pflegegrad 3. Der ${h.a('pflegegrad-rechner', 'Pflegegrad-Rechner')} zeigt, wie viele Punkte bis zur nächsten Grenze fehlen.</p>
<p>Ein Rechenbeispiel aus der Bewertungssystematik (${h.src('sgb11_15', '§ 15 SGB XI')}): Selbstversorgung im Punktbereich 2 ergibt 20 gewichtete Punkte, Krankheitsbewältigung im Bereich 1 noch 5, Alltag im Bereich 1 dazu 3,75, Mobilität im Bereich 1 2,5. Das sind 31,25 Punkte und Pflegegrad 2. Kommt eine leichte Orientierungsstörung hinzu, die Modul 2 in den Bereich 2 hebt, steigt die Summe um 7,5 auf 38,75; der Grad bleibt derselbe.</p>
<!--mini:hoeherstufung-->

<h2>Das Geld im Monat und im Jahr</h2>
${h.table(['Leistung bei Pflegegrad 2', 'Monat', 'Jahr', 'Art'], [
  ['Pflegegeld', h.eur(P.pflegegeld['2']), h.eur(P.pflegegeld['2'] * 12), 'aufs Konto'],
  ['oder Sachleistung bis', h.eur(P.sachleistung['2']), h.eur(P.sachleistung['2'] * 12), 'an den Pflegedienst'],
  ['Tagespflege bis', h.eur(P.tagespflege['2']), h.eur(P.tagespflege['2'] * 12), 'an die Einrichtung, zusätzlich'],
  ['Entlastungsbetrag', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat * 12), 'gegen Beleg'],
  ['Pflegehilfsmittel zum Verbrauch', h.eur(P.pflegehilfsmittel.verbrauch_monat), h.eur(P.pflegehilfsmittel.verbrauch_monat * 12), 'Sachleistung'],
  ['Verhinderungs- und Kurzzeitpflege', '–', h.eur(P.jahresbetrag.euro), 'gegen Beleg'],
], 'Höchstbeträge 2026 nach §§ 36, 37, 40, 41, 42a und 45b SGB XI.', ['l', 'r', 'r', 'l'])}
<p>Bei Pflegegrad 2 ist das Pflegegeld von ${h.eur(P.pflegegeld['2'])} vergleichsweise klein, die Budgets daneben sind es nicht. Allein Tagespflege und Jahresbetrag übersteigen zusammen das Pflegegeld eines ganzen Jahres. Familien, die nur das Pflegegeld nehmen, nutzen deshalb oft weniger als ein Drittel dessen, was ihnen zusteht.</p>
<p>Ein Pflegedienst lohnt sich bei Pflegegrad 2 vor allem für Aufgaben, die Angehörige schwer übernehmen können, etwa das Duschen oder das Anziehen von Kompressionsstrümpfen. Jeder Euro Sachleistung kostet dabei Pflegegeld nach der ${h.a('kombinationsleistung', 'Kombinationsregel')}: Bei ${h.eur(400)} für den Dienst bleiben ${h.eur(k400.pflegegeld, 2)}.</p>

<h2>Tagespflege und Entlastungsbetrag zusammen denken</h2>
<p>Die ${h.a('tagespflege', 'Tagespflege')} ist bei Pflegegrad 2 der stärkste Hebel, weil sie weder Pflegegeld noch Sachleistung mindert (${h.src('sgb11_41', '§ 41 Abs. 3 SGB XI')}). Mit ${h.eur(P.tagespflege['2'])} lassen sich je nach Pflegesatz einige Tage im Monat bezahlen. Was die Einrichtung für Essen und Investitionskosten verlangt, zahlt die Familie, und dafür ist der ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} da. So kann ein Vater mit Pflegegrad 2 zweimal pro Woche in die Tagespflege gehen, ohne dass die Tochter auf das Pflegegeld verzichtet.</p>

<h2>Wenn die Familie Urlaub braucht</h2>
<p>Ab Pflegegrad 2 gibt es den Gemeinsamen Jahresbetrag von ${h.eur(P.jahresbetrag.euro)} (${h.src('sgb11_42a', '§ 42a SGB XI')}). Er bezahlt eine Vertretung zu Hause oder einige Wochen in einer Einrichtung. Springen nahe Angehörige ein, die nicht beruflich pflegen, erkennt die Kasse regelmäßig das Zweifache des Pflegegeldes an, bei Pflegegrad 2 also ${h.eur(P.pflegegeld['2'] * 2)}, dazu nachgewiesene Fahrtkosten oder Verdienstausfall. Der ${h.a('verhinderungspflege', 'Rechner für Verhinderungspflege')} teilt den Topf auf.</p>

<h2>Was beim Hausbesuch oft fehlt</h2>
<p>Viele Familien erwarten Pflegegrad 2 und erhalten Pflegegrad 1, oder sie erwarten Grad 3 und bleiben bei Grad 2. Der Grund liegt meist nicht in der Gutachterin, sondern in dem, was sie an diesem Vormittag sieht. Ältere Menschen reißen sich beim Besuch zusammen, ziehen sich ordentlich an und sagen auf die Frage nach dem Duschen, das klappe schon. Was danach passiert, die Erschöpfung, der Sturz am Abend, das vergessene Mittagessen, kommt nicht ins Gutachten. Drei Dinge helfen: ein Pflegetagebuch über zwei Wochen, in dem jede Hilfe mit Uhrzeit steht; die Anwesenheit der Person, die am meisten pflegt; und die Arztbriefe und der Medikamentenplan auf dem Tisch. Dann lässt sich Modul für Modul zeigen, wo Hilfe nötig ist. Wie die Begutachtung abläuft, steht unter ${h.a('begutachtung-medizinischer-dienst', 'Begutachtung durch den Medizinischen Dienst')}.</p>
<h2>Pflegegrad 2 im Pflegeheim</h2>
<p>Zieht jemand mit Pflegegrad 2 ins Heim, zahlt die Pflegekasse ${h.eur(P.vollstationaer['2'])} im Monat an die Einrichtung und den Leistungszuschlag auf den Eigenanteil. Weil der Eigenanteil im selben Heim für alle Grade gleich ist, zahlt die Familie bei Grad 2 nicht weniger als bei Grad 5. Das ist ein Grund, warum viele Menschen mit Pflegegrad 2 so lange wie möglich zu Hause bleiben und Tagespflege, Entlastungsbetrag und Jahresbetrag kombinieren.</p>

<h2>Abgrenzung zu Pflegegrad 1 und 3</h2>
<p>Unter ${h.num(S[1])} Punkten gibt es ${h.a('pflegegrad-1', 'Pflegegrad 1')}: kein Pflegegeld, keine Sachleistung, keine Tagespflege und kein Jahresbetrag, nur Entlastungsbetrag, Hilfsmittel und Zuschüsse zum Umbau. Der Sprung von Grad 1 auf Grad 2 ist deshalb der wertvollste der ganzen Skala. Ab ${h.num(S[2], 1)} Punkten folgt ${h.a('pflegegrad-3', 'Pflegegrad 3')} mit ${h.eur(P.pflegegeld['3'])} Pflegegeld. Wer nach dem Bescheid den Eindruck hat, dass Punkte fehlen, sollte innerhalb eines Monats ${h.a('widerspruch-pflegegrad', 'Widerspruch')} einlegen.</p>

<h2>Für pflegende Angehörige</h2>
<p>Bei Pflegegrad 2 beginnt die soziale Absicherung pflegender Angehöriger: Rentenbeiträge, Unfallversicherung während der Pflege und Arbeitslosenversicherung, wenn die Voraussetzungen erfüllt sind. Ein Jahr reines Pflegegeld bringt ${h.eur(rente.renteProJahr, 2)} Monatsrente (${h.a('rente-pflegende-angehoerige', 'Rentenrechner')}). Wer für die Pflege nichts bekommt, kann stattdessen den ${h.a('pflege-pauschbetrag', 'Pflege-Pauschbetrag')} von ${h.eur(pb.voll)} geltend machen.</p>
`,
  },
  en: {
    slug: 'care-grade-2',
    nav: 'Care grade 2',
    card: `The first grade with an allowance: ${EN.eur(P.pflegegeld['2'])} or ${EN.eur(P.sachleistung['2'])} in services, plus budgets that are often worth more.`,
    title: 'Care Grade 2 Germany 2026: Pflegegeld, Points, Benefits',
    description: `German care grade 2 (Pflegegrad 2) from ${EN.num(S[1])} points: ${EN.eur(P.pflegegeld['2'])} allowance or ${EN.eur(P.sachleistung['2'])} in services a month in 2026, plus the separate day care and annual respite budgets.`,
    h1: 'German care grade 2: what it pays in 2026 and when it applies',
    intro: 'The first grade that pays a care allowance, and the one where the budgets next to the allowance are often worth more than the allowance itself.',
    resume: `German care grade 2 (Pflegegrad 2) applies when the assessment produces between ${EN.num(S[1])} and just under ${EN.num(S[2], 1)} total points, described in section 15(3) of Book XI of the Social Code as considerable limitations of independence. It is the first grade with a care allowance: ${EN.eur(P.pflegegeld['2'])} a month if the family provides care, or services from a registered care provider worth up to ${EN.eur(P.sachleistung['2'])}. With a care service billing ${EN.eur(400)}, ${EN.pct(k400.anteil, 1)} of the services budget is used and ${EN.eur(k400.pflegegeld, 2)} of allowance remains. Alongside the allowance, grade 2 brings the ${EN.eur(P.entlastungsbetrag.monat)} relief amount, consumable aids up to ${EN.eur(P.pflegehilfsmittel.verbrauch_monat)}, a separate day care budget of ${EN.eur(P.tagespflege['2'])} a month and the joint annual budget of ${EN.eur(P.jahresbetrag.euro)} for respite and short-term care. With family care only and no day care, that is ${EN.eur(fam.jahrGesamt)} a year, of which only ${EN.eur(fam.jahrAufsKonto)} arrives as money. In a care home the fund pays the home ${EN.eur(P.vollstationaer['2'])} a month.`,
    faqs: [
      { q: 'What kind of needs usually lead to care grade 2?', a: 'Often people who still manage most self-care but need help showering, putting on stockings or using stairs, plus support with medication and appointments. Early dementia with disorientation but without daily restlessness also often ends at grade 2. What counts is the total across all modules, not a diagnosis, which surprises many families with a parent recently diagnosed.' },
      { q: 'Is day care worth it at grade 2?', a: `Yes, because it has its own budget of ${EN.eur(P.tagespflege['2'])} a month and reduces neither the allowance nor the services budget (section 41(3) SGB XI). With day care added, what the household can use in a year rises to as much as ${EN.eur(tp.jahrGesamt)}. Meals and investment costs can be paid from the relief amount.` },
      { q: 'Is a regular advice visit required at grade 2?', a: 'Yes, if only the allowance is drawn: one home visit every six months (section 37(3) SGB XI), paid by the fund. Without proof the allowance can be cut. When a care service is also involved, the visit is optional. Until March 2027 every second visit may be held by video, so a relative abroad can join the call.' },
      { q: 'How much pension does caring at grade 2 earn?', a: `For relatives who care at least ten hours a week over two days and work no more than 30 hours, the fund pays contributions on ${EN.pct(rente.anteil, 0)} of the reference value. One year with allowance only earns ${EN.num(rente.punkteJahr, 4)} pension points, ${EN.eur(rente.renteProJahr, 2)} of monthly pension at the value from July 2026.` },
      { q: 'When should we ask for a higher grade than 2?', a: `When needs have increased for good, for example help is needed at night, the person can no longer eat alone or difficult behaviour occurs daily. Grade 3 pays ${EN.eur(P.pflegegeld['3'] - P.pflegegeld['2'])} more allowance and ${EN.eur(P.sachleistung['3'] - P.sachleistung['2'])} more services each month. A short written request is enough; a new assessment follows.` },
    ],
    body: (h) => `
<h2>The points behind grade 2</h2>
<p>The range from ${h.num(S[1])} to ${h.num(S[2], 1)} points is wide, which is why grade 2 is the most common result of a first assessment. Someone just above ${h.num(S[1])} mainly needs help with individual tasks; someone close to ${h.num(S[2], 1)} is already quite dependent, and a small decline moves them into grade 3. The ${h.a('pflegegrad-rechner', 'care grade calculator')} shows how many points are missing to the next threshold.</p>
<p>A worked example from the scoring system (${h.src('sgb11_15', 'section 15 SGB XI')}): self-care in band 2 gives 20 weighted points, illness management in band 1 adds 5, daily life in band 1 adds 3.75 and mobility in band 1 adds 2.5. That is 31.25 points and grade 2. A mild orientation problem that lifts module 2 into band 2 adds 7.5 to reach 38.75; the grade stays the same.</p>
<!--mini:hoeherstufung-->

<h2>Money per month and per year</h2>
${h.table(['Benefit at grade 2', 'Month', 'Year', 'Paid as'], [
  ['Care allowance', h.eur(P.pflegegeld['2']), h.eur(P.pflegegeld['2'] * 12), 'money to the account'],
  ['or services up to', h.eur(P.sachleistung['2']), h.eur(P.sachleistung['2'] * 12), 'to the care service'],
  ['Day care up to', h.eur(P.tagespflege['2']), h.eur(P.tagespflege['2'] * 12), 'to the centre, in addition'],
  ['Relief amount', h.eur(P.entlastungsbetrag.monat), h.eur(P.entlastungsbetrag.monat * 12), 'against receipts'],
  ['Consumable care aids', h.eur(P.pflegehilfsmittel.verbrauch_monat), h.eur(P.pflegehilfsmittel.verbrauch_monat * 12), 'in kind'],
  ['Respite and short-term care', '–', h.eur(P.jahresbetrag.euro), 'against receipts'],
], 'Maximum amounts for 2026 under sections 36, 37, 40, 41, 42a and 45b SGB XI.', ['l', 'r', 'r', 'l'])}
<p>At grade 2 the allowance of ${h.eur(P.pflegegeld['2'])} is modest, but the budgets beside it are not. Day care and the annual budget together exceed a whole year of allowance. Families who only take the allowance often use less than a third of what they are entitled to.</p>
<p>A care service mostly pays off at grade 2 for tasks relatives find hard, such as showering or fitting compression stockings. Every euro of services costs allowance under the ${h.a('kombinationsleistung', 'combined benefit rule')}: with ${h.eur(400)} for the service, ${h.eur(k400.pflegegeld, 2)} remains.</p>

<h2>Day care and the relief amount together</h2>
<p>${h.a('tagespflege', 'Day care')} is the strongest lever at grade 2, because it reduces neither allowance nor services (${h.src('sgb11_41', 'section 41(3) SGB XI')}). ${h.eur(P.tagespflege['2'])} pays for several days a month depending on the centre’s rate. Meals and investment costs fall to the family, which is what the ${h.a('entlastungsbetrag', 'relief amount')} is for. A father at grade 2 can attend day care twice a week without his daughter giving up any allowance, which matters if she works full time or lives some distance away.</p>

<h2>When the family needs a break</h2>
<p>From grade 2 the joint annual budget of ${h.eur(P.jahresbetrag.euro)} applies (${h.src('sgb11_42a', 'section 42a SGB XI')}). It pays for cover at home or a few weeks in a facility. If close relatives cover on a non-professional basis, the fund normally recognises twice the allowance, ${h.eur(P.pflegegeld['2'] * 2)} at grade 2, plus documented travel or lost earnings. The ${h.a('verhinderungspflege', 'respite calculator')} splits the budget.</p>

<h2>What the home visit often misses</h2>
<p>Older people tend to pull themselves together for the assessor: they dress neatly and say showering is fine. The exhaustion afterwards, the fall in the evening or the forgotten lunch never reach the report. Three things help: a two-week care diary listing every intervention with the time, the main carer being present, and doctors’ letters and the medication plan on the table. If the main carer lives abroad, a video call during the visit is better than nothing, but a written diary sent beforehand carries more weight. See ${h.a('begutachtung-medizinischer-dienst', 'the Medical Service assessment')}.</p>

<h2>How grade 2 differs from grades 1 and 3</h2>
<p>Below ${h.num(S[1])} points there is ${h.a('pflegegrad-1', 'grade 1')}: no allowance, no services, no day care budget and no annual budget, only the relief amount, aids and adaptation grants. The step from grade 1 to 2 is therefore the most valuable on the whole scale. From ${h.num(S[2], 1)} points comes ${h.a('pflegegrad-3', 'grade 3')} with ${h.eur(P.pflegegeld['3'])} of allowance. If points seem to be missing in the decision, ${h.a('widerspruch-pflegegrad', 'object')} within one month.</p>

<h2>For family carers</h2>
<p>Grade 2 is where social security for family carers starts: pension contributions, accident insurance while caring and unemployment insurance if the conditions are met. One year with allowance only adds ${h.eur(rente.renteProJahr, 2)} of monthly pension (${h.a('rente-pflegende-angehoerige', 'carer pension calculator')}). A carer who receives nothing for caring can instead claim the ${h.a('pflege-pauschbetrag', 'carer’s lump sum')} of ${h.eur(pb.voll)}.</p>
`,
  },
});
