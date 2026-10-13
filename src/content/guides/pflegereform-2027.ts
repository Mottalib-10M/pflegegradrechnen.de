import { defineGuide } from '../../lib/guide-types';
import { jahr } from '../../lib/engine/leistungen';
import { P, DE, EN } from '../../lib/fmt';

/** Stand des Pflegeneuordnungsgesetzes (PNOG) laut BMG; geltendes Recht 2026 aus dem Motor. Nichts aus dem Entwurf wird gerechnet. */
const R = P.reform;
const g3 = jahr({ grad: 3, versorgung: 'angehoerige' });
const VJ = P.heim.bund_vorjahr, B = P.heim.bund;
const heimEee1 = Math.round(B.eee * (1 - P.zuschlag.stufen[0]));
/** Mehrbelastung durch den höheren Kinderlosenzuschlag bei einem Bruttolohn von 3.500 € (Rechenbeispiel, nur der Zuschlag). */
const brutto = 3500, mehr = brutto * R.kinderlosenzuschlag_plus;
const datum = (iso: string, l: 'de' | 'en') => new Date(`${iso}T00:00:00Z`).toLocaleDateString(l === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export default defineGuide({
  id: 'pflegereform-2027',
  group: 'angehoerige',
  order: 40,
  mini: 'heuteRecht',
  related: ['pflegegeld', 'verhinderungspflege', 'entlastungsbetrag', 'pflegegrad-rechner', 'pflegeheim-kosten', 'rente-pflegende-angehoerige'],
  sources: ['bmgPnogPm', 'bmgPnog', 'sgb11_30', 'sgb11_42a', 'sgb11_45b'],
  de: {
    slug: 'pflegereform',
    nav: 'Pflegereform 2027',
    card: 'Was der Kabinettsentwurf vom 30. September 2026 vorsieht, was davon gesichert ist und was bis dahin gilt.',
    title: 'Pflegereform 2027: Entwurf, Stand und was 2026 noch gilt',
    description: `Pflegereform 2027: Kabinett beschließt am ${datum(R.kabinett, 'de')} den PNOG-Entwurf: Sozialraumbudget, Überbrückungsbudget, Beiträge; noch nicht in Kraft (Stand).`,
    h1: 'Pflegereform: was geplant ist und was weiter gilt',
    intro: 'Der Entwurf des Pflegeneuordnungsgesetzes ist im Parlament. Was das Ministerium angekündigt hat, was noch offen ist, und warum diese Seite weiter mit dem Recht von 2026 rechnet.',
    resume: `Das Bundeskabinett hat am ${datum(R.kabinett, 'de')} den Entwurf eines Pflegeneuordnungsgesetzes (PNOG) beschlossen; der Referentenentwurf stammt vom ${datum(R.referentenentwurf, 'de')}. Nach der Pressemitteilung des Bundesgesundheitsministeriums sollen ab Pflegegrad 2 ein Sozialraumbudget an die Stelle des Entlastungsbetrags für Alltagsunterstützung treten, ein Überbrückungsbudget für Notdienste und Kurzzeitpflege entstehen, Pflegegeld und Sachleistungen in den Graden 2 bis 5 steigen und die Begutachtung so geändert werden, dass die Grade 1 bis 3 zielgenauer vergeben werden. Auf der Beitragsseite sind ein höherer Kinderlosenzuschlag von ${DE.pct(R.kinderlosenzuschlag_2027, 1)} ab 1. Januar 2027 und eine um ${DE.eur(R.bbg_plus_monat)} höhere Beitragsbemessungsgrenze vorgesehen. Beträge für Pflegegeld und Budgets nennt die Mitteilung nicht. Wichtig: Der Entwurf ist kein Gesetz. Bis zur Verkündung gelten die Beträge von 2026, also etwa ${DE.eur(P.pflegegeld['3'])} Pflegegeld bei Pflegegrad 3 und der Gemeinsame Jahresbetrag von ${DE.eur(P.jahresbetrag.euro)}.`,
    faqs: [
      { q: 'Wann tritt die Pflegereform in Kraft?', a: 'Das steht noch nicht fest. Mit dem Kabinettsbeschluss vom 30. September 2026 beginnt das parlamentarische Verfahren in Bundestag und Bundesrat; der Text kann sich dabei ändern. Einzelne Maßnahmen sind für den 1. Januar 2027, 2028 oder 2029 vorgesehen. Verbindlich wird nur, was im Bundesgesetzblatt verkündet wird.' },
      { q: 'Fällt die Verhinderungspflege 2027 weg?', a: `Nach der Pressemitteilung des Ministeriums soll ein Überbrückungsbudget entstehen, das für Notdienste in der ambulanten Pflege und für vollstationäre Kurzzeitpflege verwendet werden kann. Wie es sich zur heutigen Verhinderungspflege verhält und wie hoch es wäre, nennt die Mitteilung nicht. Bis zur Verkündung bleibt der Gemeinsame Jahresbetrag von ${DE.eur(P.jahresbetrag.euro)} bestehen.` },
      { q: 'Wird das Pflegegeld durch die Reform höher?', a: 'Das Ministerium kündigt an, Pflegegeld und Ansprüche auf ambulante Sachleistungen in den Pflegegraden 2 bis 5 zu erhöhen, ohne Beträge zu nennen. Unabhängig davon sieht das geltende Recht eine Anpassung zum 1. Januar 2028 vor (§ 30 SGB XI); ab 2029 soll laut Entwurf eine jährliche Dynamisierung nach der Kerninflation folgen.' },
      { q: 'Was bedeutet das Sozialraumbudget für den Entlastungsbetrag?', a: `Es soll ab Pflegegrad 2 den Entlastungsbetrag für Unterstützung im Alltag ersetzen. Für Pflegebedürftige bis zum ${R.sozialraumbudget_alter}. Geburtstag nennt das Ministerium bis zu ${DE.eur(R.sozialraumbudget_u25_monat)} im Monat. Für ältere Pflegebedürftige steht in der Mitteilung kein Betrag. Heute gilt weiter der Entlastungsbetrag von ${DE.eur(P.entlastungsbetrag.monat)}.` },
      { q: 'Verliert meine Mutter durch die Reform ihren Pflegegrad?', a: 'Nach der Mitteilung des Ministeriums sollen bestehende Einstufungen geschützt sein, auch wenn die Begutachtung für die Grade 1 bis 3 geändert wird. Wie dieser Besitzstand genau geregelt wird, entscheidet das parlamentarische Verfahren. Ein heute gültiger Bescheid bleibt bis zu einer Gesetzesänderung bestehen, und auch Wiederholungsbegutachtungen richten sich bis dahin nach dem geltenden Recht.' },
      { q: 'Muss ich jetzt etwas tun, bevor die Reform kommt?', a: `Ja, das Geld von 2026 nutzen. Der Gemeinsame Jahresbetrag von ${DE.eur(P.jahresbetrag.euro)} verfällt am Jahresende, Kosten der Verhinderungspflege können bis Ende des Folgejahres erstattet werden, Reste des Entlastungsbetrags bis 30. Juni. Wer einen Antrag auf Pflegegrad oder Höherstufung plant, sollte ihn nicht hinauszögern: Leistungen gibt es ab dem Antragsmonat.` },
    ],
    body: (h) => `
<h2>Der Stand des Verfahrens</h2>
${h.table(['Schritt', 'Datum', 'Bedeutung'], [
  ['Referentenentwurf des BMG', datum(R.referentenentwurf, 'de'), 'Entwurf zur Stellungnahme der Verbände'],
  ['Kabinettsbeschluss', datum(R.kabinett, 'de'), 'Beginn des parlamentarischen Verfahrens'],
  ['Bundestag, Bundesrat', 'offen', 'Beratung, Änderungen möglich'],
  ['Verkündung im Bundesgesetzblatt', 'offen', 'erst dann gilt das neue Recht'],
], `Quelle: ${h.src('bmgPnog', 'BMG, Gesetzgebungsverfahren PNOG')}.`, ['l', 'l', 'l'])}
<p>Diese Seite rechnet bewusst weiter mit dem geltenden Recht. Ein Rechner, der Beträge aus einem Entwurf übernimmt, würde Familien falsche Erwartungen machen: Im parlamentarischen Verfahren können sich Beträge, Stichtage und ganze Leistungen ändern. Sobald das Gesetz verkündet ist, werden Rechner und Texte umgestellt, mit Datum.</p>

<h2>Was das Ministerium angekündigt hat</h2>
<p>Die folgenden Punkte stammen aus der ${h.src('bmgPnogPm', 'Pressemitteilung vom 30. September 2026')}. Sie beschreiben den Entwurf, nicht geltendes Recht.</p>
<ul>
<li><strong>Sozialraumbudget</strong> ab Pflegegrad 2 anstelle des Entlastungsbetrags für Unterstützung im Alltag; für Pflegebedürftige bis zum ${R.sozialraumbudget_alter}. Lebensjahr bis zu ${h.eur(R.sozialraumbudget_u25_monat)} im Monat, ${h.eur(R.sozialraumbudget_u25_jahr)} im Jahr.</li>
<li><strong>Überbrückungsbudget</strong> für Notdienste in der ambulanten Pflege und für vollstationäre Kurzzeitpflege; Akut-Kurzzeitpflegeplätze ab ${R.akut_kurzzeitpflege_ab_jahr}.</li>
<li><strong>Höheres Pflegegeld und höhere Sachleistungen</strong> in den Graden 2 bis 5, ohne Beträge in der Mitteilung.</li>
<li><strong>Begutachtung</strong>: Die Grade 1 bis 3 sollen zielgenauer vergeben werden; bestehende Einstufungen sollen geschützt sein.</li>
<li><strong>Pflegebegleitung</strong>: frühzeitige und fortlaufende fachliche Unterstützung für Familien, die zu Hause pflegen.</li>
<li><strong>Dynamisierung</strong> der Leistungen ab ${R.dynamisierung_ab_jahr} jährlich nach der Kerninflation.</li>
<li><strong>Rentenbeiträge</strong> für pflegende Angehörige weiterhin in vollem Umfang.</li>
<li><strong>Beiträge</strong>: Kinderlosenzuschlag ab 1. Januar 2027 auf ${h.pct(R.kinderlosenzuschlag_2027, 1)}, höhere Beitragsbemessungsgrenze um ${h.eur(R.bbg_plus_monat)} im Monat, ab 1. Januar 2028 ein Zuschlag von ${h.pct(R.ehegattenzuschlag, 2)} für mitversicherte Ehe- und Lebenspartner.</li>
</ul>

<h2>Was bis zur Verkündung gilt</h2>
${h.table(['Leistung bei Pflegegrad 3', 'Geltendes Recht 2026', 'Grundlage'], [
  ['Pflegegeld', h.eur(P.pflegegeld['3']), '§ 37 SGB XI'],
  ['Sachleistung bis', h.eur(P.sachleistung['3']), '§ 36 SGB XI'],
  ['Entlastungsbetrag', h.eur(P.entlastungsbetrag.monat), '§ 45b SGB XI'],
  ['Verhinderungs- und Kurzzeitpflege im Jahr', h.eur(P.jahresbetrag.euro), '§ 42a SGB XI'],
  ['zusammen im Jahr, nur Angehörige', h.eur(g3.jahrGesamt), 'Rechner'],
], 'Die Beträge gelten seit 1. Januar 2025; die nächste gesetzliche Anpassung ist der 1. Januar 2028 (§ 30 SGB XI).', ['l', 'r', 'l'])}
<p>Wer heute pflegt, sollte die Leistungen von 2026 vollständig nutzen, statt auf die Reform zu warten. Der ${h.a('verhinderungspflege', 'Jahresbetrag für Verhinderungs- und Kurzzeitpflege')} verfällt am Jahresende, der ${h.a('entlastungsbetrag', 'Entlastungsbetrag')} kann bis Ende Juni des Folgejahres abgerechnet werden. Und ein Antrag auf einen Pflegegrad wirkt ab dem Antragsmonat, unabhängig davon, wann das neue Gesetz kommt.</p>

<h2>Warum reformiert wird</h2>
<p>Der Druck kommt von zwei Seiten. Die Pflegeversicherung gibt mehr aus, als sie einnimmt, und die Familien zahlen im Heim immer mehr dazu. Nach dem vdek lag der Eigenanteil im ersten Heimjahr im Bundesschnitt am 1. Juli 2025 bei ${h.eur(VJ.mit15)} und ein Jahr später bei ${h.eur(B.mit15)}. Der Pflegeanteil nach Zuschlag stieg in dieser Zeit von ${h.eur(VJ.eee_nach_zuschlag)} auf ${h.eur(heimEee1)}. Die Ersatzkassen fordern deshalb eine Begrenzung der Eigenanteile und dass die Länder Investitions- und Ausbildungskosten übernehmen. Ob der Entwurf das aufgreift, lässt die Mitteilung des Ministeriums offen.</p>

<h2>Was Beitragszahler betrifft</h2>
<p>Für Beschäftigte ohne Kinder steigt nach dem Entwurf der Beitragszuschlag zum 1. Januar 2027 um ${h.num(R.kinderlosenzuschlag_plus * 100, 1)} Prozentpunkte. Bei einem Bruttolohn von ${h.eur(brutto)} im Monat wären das ${h.eur(mehr, 2)} mehr, nur für diesen Zuschlag gerechnet. Gutverdienende trifft zusätzlich die höhere Beitragsbemessungsgrenze. Neu wäre ab 1. Januar 2028 ein Zuschlag für mitversicherte Ehe- und Lebenspartner, mit denselben Ausnahmen wie in der Krankenversicherung. Auch diese Punkte gelten erst mit der Verkündung.</p>

<h2>So verfolgen Sie den Fortgang</h2>
<p>Den Stand des Verfahrens veröffentlicht das Bundesgesundheitsministerium auf seiner Seite zum Gesetz, mit dem Kabinettsentwurf als Dokument. Sobald Bundestag und Bundesrat beraten haben und das Gesetz verkündet ist, werden auf dieser Seite die neuen Beträge mit Datum eingetragen und die Rechner umgestellt. Bis dahin gilt: Ein Bescheid der Pflegekasse aus 2026 bleibt gültig, und wer einen Antrag stellt, wird nach dem heutigen Recht begutachtet. Schreiben von Anbietern, die mit der Reform für Verträge oder Beratungen werben, sollten Sie mit Vorsicht lesen: Was gilt, steht im Gesetz, nicht in einer Werbung.</p>

<h2>Was noch offen ist</h2>
<p>Offen sind vor allem die Beträge: wie hoch Pflegegeld, Sachleistung und das Überbrückungsbudget werden, wie das Sozialraumbudget für Erwachsene aussieht, und wie die geänderte Begutachtung die Schwellen der Grade 1 bis 3 verschiebt. Ebenso offen ist, ob die Eigenanteile im Pflegeheim begrenzt werden; der vdek fordert das ausdrücklich. Diese Seite wird aktualisiert, sobald der verkündete Gesetzestext vorliegt.</p>
`,
  },
  en: {
    slug: 'care-reform',
    nav: 'Care reform 2027',
    card: 'What the cabinet draft of 30 September 2026 plans, what is certain and what applies until then.',
    title: 'Pflegereform 2027: German Care Reform Draft and 2026 Rules',
    description: `German care reform 2027: on ${datum(R.kabinett, 'en')} the cabinet adopted the PNOG draft: local support budget, bridging budget, contributions; not yet in force.`,
    h1: 'German care reform: what is planned and what still applies',
    intro: 'The draft Care Reorganisation Act is before parliament. What the ministry has announced, what is still open, and why this site keeps calculating with 2026 law.',
    resume: `On ${datum(R.kabinett, 'en')} the German federal cabinet adopted the draft Care Reorganisation Act (Pflegeneuordnungsgesetz, PNOG); the ministry’s first draft dates from ${datum(R.referentenentwurf, 'en')}. According to the Federal Ministry of Health’s press release, a local support budget (Sozialraumbudget) would replace the relief amount for everyday support from care grade 2, a bridging budget would cover emergency services and short-term care, the care allowance and services in kind at grades 2 to 5 would rise, and assessment rules would change so that grades 1 to 3 are awarded more precisely. On the contribution side, the surcharge for childless members would rise to ${EN.pct(R.kinderlosenzuschlag_2027, 1)} from 1 January 2027 and the contribution ceiling by ${EN.eur(R.bbg_plus_monat)} a month. The release gives no amounts for the allowance or budgets. Crucially, the draft is not law. Until it is published, the 2026 amounts apply, for example ${EN.eur(P.pflegegeld['3'])} of care allowance at grade 3 and the joint respite budget of ${EN.eur(P.jahresbetrag.euro)}.`,
    faqs: [
      { q: 'When does the German care reform take effect?', a: 'That is not yet fixed. The cabinet decision of 30 September 2026 starts the parliamentary procedure in the Bundestag and Bundesrat, during which the text may change. Individual measures are planned for 1 January 2027, 2028 or 2029. Only what is published in the Federal Law Gazette becomes binding.' },
      { q: 'Will respite care disappear in 2027?', a: `The ministry’s press release announces a bridging budget for emergency services in home care and for residential short-term care. It does not say how this relates to today’s respite care or how large it would be. Until the law is published, the joint annual budget of ${EN.eur(P.jahresbetrag.euro)} stays in place.` },
      { q: 'Will the care allowance go up with the reform?', a: 'The ministry says it will raise the allowance and home care services at grades 2 to 5, without giving amounts. Separately, current law already provides for an increase on 1 January 2028 (section 30 SGB XI), and the draft plans annual indexation in line with core inflation from 2029.' },
      { q: 'What does the local support budget mean for the relief amount?', a: `It would replace the relief amount for everyday support from grade 2. For people up to their ${R.sozialraumbudget_alter}th birthday the ministry cites up to ${EN.eur(R.sozialraumbudget_u25_monat)} a month; for older people the release gives no figure. Today the relief amount of ${EN.eur(P.entlastungsbetrag.monat)} still applies.` },
      { q: 'Should families abroad act now, before the reform?', a: `Yes: use the 2026 money. The joint respite budget of ${EN.eur(P.jahresbetrag.euro)} lapses at year end, respite costs can be refunded until the end of the following year and leftover relief amounts until 30 June. If you plan to apply for a care grade or a higher one, do not wait, as benefits run from the month of application.` },
    ],
    body: (h) => `
<h2>Where the procedure stands</h2>
${h.table(['Step', 'Date', 'Meaning'], [
  ['Ministry draft', datum(R.referentenentwurf, 'en'), 'draft for comment by associations'],
  ['Cabinet decision', datum(R.kabinett, 'en'), 'start of the parliamentary procedure'],
  ['Bundestag, Bundesrat', 'open', 'debate, changes possible'],
  ['Publication in the Federal Law Gazette', 'open', 'only then does the new law apply'],
], `Source: ${h.src('bmgPnog', 'Federal Ministry of Health, PNOG procedure')}.`, ['l', 'l', 'l'])}
<p>This site deliberately keeps calculating with current law. A calculator using figures from a draft would raise false expectations: amounts, dates and whole benefits can change in parliament. Once the law is published, calculators and pages will be switched over, with a date.</p>

<h2>What the ministry has announced</h2>
<p>These points come from the ${h.src('bmgPnogPm', 'press release of 30 September 2026')}. They describe the draft, not current law.</p>
<ul>
<li><strong>Local support budget</strong> from grade 2 instead of the relief amount for everyday support; up to ${h.eur(R.sozialraumbudget_u25_monat)} a month, ${h.eur(R.sozialraumbudget_u25_jahr)} a year, for people up to age ${R.sozialraumbudget_alter}.</li>
<li><strong>Bridging budget</strong> for emergency services in home care and residential short-term care; acute short-term care places from ${R.akut_kurzzeitpflege_ab_jahr}.</li>
<li><strong>Higher allowance and services</strong> at grades 2 to 5, with no amounts given.</li>
<li><strong>Assessment</strong>: grades 1 to 3 to be awarded more precisely; existing grades protected.</li>
<li><strong>Care guidance</strong>: early and ongoing professional support for families caring at home.</li>
<li><strong>Indexation</strong> of benefits every year from ${R.dynamisierung_ab_jahr} in line with core inflation.</li>
<li><strong>Pension contributions</strong> for family carers continue in full.</li>
<li><strong>Contributions</strong>: childless surcharge of ${h.pct(R.kinderlosenzuschlag_2027, 1)} from 1 January 2027, contribution ceiling up by ${h.eur(R.bbg_plus_monat)} a month, from 1 January 2028 a ${h.pct(R.ehegattenzuschlag, 2)} surcharge for co-insured spouses and partners.</li>
</ul>

<h2>What applies until publication</h2>
${h.table(['Benefit at grade 3', 'Current law 2026', 'Legal basis'], [
  ['Care allowance', h.eur(P.pflegegeld['3']), 's. 37 SGB XI'],
  ['Services up to', h.eur(P.sachleistung['3']), 's. 36 SGB XI'],
  ['Relief amount', h.eur(P.entlastungsbetrag.monat), 's. 45b SGB XI'],
  ['Respite and short-term care per year', h.eur(P.jahresbetrag.euro), 's. 42a SGB XI'],
  ['total per year, family care only', h.eur(g3.jahrGesamt), 'calculator'],
], 'Amounts in force since 1 January 2025; the next statutory adjustment is 1 January 2028 (section 30 SGB XI).', ['l', 'r', 'l'])}
<p>Carers today should use the 2026 benefits in full rather than wait. The ${h.a('verhinderungspflege', 'annual respite budget')} lapses at year end, the ${h.a('entlastungsbetrag', 'relief amount')} can be claimed until the end of June of the following year, and a care grade application takes effect from the month it is made, whenever the new law arrives.</p>

<h2>Why reform is coming</h2>
<p>Pressure comes from two sides: the care insurance spends more than it takes in, and families pay ever more towards care homes. According to the vdek, the national first-year co-payment was ${h.eur(VJ.mit15)} on 1 July 2025 and ${h.eur(B.mit15)} a year later; the care part after the supplement rose from ${h.eur(VJ.eee_nach_zuschlag)} to ${h.eur(heimEee1)}. The substitute health funds call for a cap on co-payments and for the states to pay investment and training costs. The ministry’s release does not say whether the draft does so.</p>

<h2>What contributors should know</h2>
<p>For employees without children the draft raises the contribution surcharge by ${h.num(R.kinderlosenzuschlag_plus * 100, 1)} percentage points on 1 January 2027; on gross pay of ${h.eur(brutto)} a month that is ${h.eur(mehr, 2)} more for the surcharge alone. Higher earners are also affected by the higher contribution ceiling, and from 1 January 2028 there would be a surcharge for co-insured spouses and partners. Expats working in Germany who have children abroad should make sure their employer has proof of parenthood, which already matters for the current surcharge. None of this applies before the law is published.</p>

<h2>How to follow the reform</h2>
<p>The Federal Ministry of Health publishes the procedure’s status on its page for the law, including the cabinet draft. Once parliament has decided and the law is published, this page will list the new amounts with a date and the calculators will switch over. Until then a 2026 care fund decision stays valid, and anyone applying now is assessed under current law.</p>

<h2>What is still open</h2>
<p>Above all the amounts: how high allowance, services and the bridging budget will be, what the local support budget looks like for adults, and how the new assessment rules shift the thresholds of grades 1 to 3. Also open is whether care home co-payments will be capped, which the vdek explicitly demands. This page will be updated once the published text is available.</p>
`,
  },
});
