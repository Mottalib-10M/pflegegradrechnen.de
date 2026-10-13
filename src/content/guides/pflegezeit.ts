import { defineGuide } from '../../lib/guide-types';
import { rentenpunkte } from '../../lib/engine/angehoerige';
import { P, DE, EN } from '../../lib/fmt';

/** Regeln aus PflegeZG, FPfZG und § 44a SGB XI; Rentenbeispiel aus dem Motor (Grad 3, Pflegegeld, Teilzeit). */
const Z = P.pflegezeit;
const r3 = rentenpunkte(3, 'geld');

export default defineGuide({
  id: 'pflegezeit',
  group: 'angehoerige',
  order: 30,
  mini: 'pflegezeit',
  related: ['rente-pflegende-angehoerige', 'pflege-pauschbetrag', 'pflegegrad-beantragen', 'verhinderungspflege', 'pflegegrad-1', 'kurzzeitpflege'],
  sources: ['pflegezg2', 'pflegezg3', 'pflegezg5', 'pflegezg7', 'fpfzg2', 'fpfzg3', 'sgb11_44a', 'sgb5_45'],
  de: {
    slug: 'pflegezeit',
    nav: 'Pflegezeit und Freistellung',
    card: `${Z.unterstuetzungsgeld_tage} Tage mit Pflegeunterstützungsgeld, ${Z.pflegezeit_monate} Monate Pflegezeit, ${Z.familienpflegezeit_monate} Monate Familienpflegezeit: was der Job erlaubt.`,
    title: 'Pflegezeit 2026: Freistellung, Lohnersatz, Kündigungsschutz',
    description: `Pflegezeit 2026: ${Z.unterstuetzungsgeld_tage} Arbeitstage mit Pflegeunterstützungsgeld, bis ${Z.pflegezeit_monate} Monate Pflegezeit, ${Z.familienpflegezeit_monate} Monate Familienpflegezeit, zinsloses Darlehen und Kündigungsschutz.`,
    h1: 'Pflegezeit: welche Freistellung Beschäftigten zusteht',
    intro: 'Wenn ein Elternteil plötzlich Pflege braucht: wie viele Tage Sie sofort fehlen dürfen, wann der Arbeitgeber eine längere Auszeit gewähren muss und wovon Sie in der Zeit leben.',
    resume: `Beschäftigte haben drei Wege, sich für die Pflege eines nahen Angehörigen freistellen zu lassen. Bei einer akut auftretenden Pflegesituation dürfen sie bis zu ${Z.unterstuetzungsgeld_tage} Arbeitstage der Arbeit fernbleiben, in jedem Betrieb, um die Pflege zu organisieren (§ 2 PflegeZG); als Lohnersatz zahlt die Pflegekasse des Angehörigen Pflegeunterstützungsgeld in Höhe von ${DE.pct(Z.unterstuetzungsgeld_anteil, 0)} des ausgefallenen Nettoentgelts, höchstens ${DE.eur(Z.unterstuetzungsgeld_max_tag, 2)} am Tag (§ 44a Abs. 3 SGB XI). Für eine längere Auszeit gibt es die Pflegezeit von bis zu ${Z.pflegezeit_monate} Monaten, ganz oder teilweise, in Betrieben mit mehr als ${Z.pflegezeit_ab_beschaeftigte} Beschäftigten (§§ 3, 4 PflegeZG), und die Familienpflegezeit von bis zu ${Z.familienpflegezeit_monate} Monaten mit mindestens ${Z.familienpflegezeit_min_stunden} Wochenstunden, in Betrieben mit mehr als ${Z.familienpflegezeit_ab_beschaeftigte} Beschäftigten (§ 2 FPfZG). Beide zusammen dürfen ${Z.gesamtdauer_monate} Monate je Angehörigem nicht übersteigen. Während der Freistellungen schützt ein Kündigungsverbot, und das Bundesamt für Familie und zivilgesellschaftliche Aufgaben gewährt auf Antrag ein zinsloses Darlehen in Höhe der halben Nettolücke.`,
    faqs: [
      { q: 'Wer zählt als naher Angehöriger für die Pflegezeit?', a: 'Großeltern, Eltern, Schwiegereltern und Stiefeltern, Ehegatten, Lebenspartner und Partner einer eheähnlichen Gemeinschaft, Geschwister und deren Ehegatten, Geschwister der Ehegatten, Kinder, Adoptiv- und Pflegekinder, Schwieger- und Enkelkinder (§ 7 Abs. 3 PflegeZG). Für die Pflegezeit muss der Angehörige pflegebedürftig sein, für die kurzzeitige Arbeitsverhinderung genügt, dass eine Pflegebedürftigkeit voraussichtlich vorliegt.' },
      { q: 'Muss der Arbeitgeber die zehn Tage bezahlen?', a: `Nur wenn ein Tarifvertrag, der Arbeitsvertrag oder ein anderes Gesetz das vorsieht (§ 2 Abs. 3 PflegeZG). Sonst beantragen Sie Pflegeunterstützungsgeld bei der Pflegekasse des Angehörigen, unverzüglich und mit ärztlicher Bescheinigung. Es beträgt ${DE.pct(Z.unterstuetzungsgeld_anteil, 0)} des ausgefallenen Nettoentgelts und gilt für bis zu ${Z.unterstuetzungsgeld_tage} Arbeitstage je Kalenderjahr und Pflegebedürftigem.` },
      { q: 'Wie früh muss ich die Pflegezeit ankündigen?', a: `Spätestens ${Z.ankuendigung_pflegezeit_arbeitstage} Arbeitstage vor Beginn in Textform, mit Zeitraum und Umfang der Freistellung und bei teilweiser Freistellung der gewünschten Verteilung der Arbeitszeit (§ 3 Abs. 3 PflegeZG). Die Pflegebedürftigkeit weisen Sie mit einer Bescheinigung der Pflegekasse oder des Medizinischen Dienstes nach. Die Ankündigung verkürzt auch die Begutachtungsfrist für den Angehörigen.` },
      { q: 'Bin ich während der Pflegezeit vor Kündigung geschützt?', a: `Ja. Von der Ankündigung an, höchstens jedoch ${Z.kuendigungsschutz_vorlauf_wochen} Wochen vor dem angekündigten Beginn, bis zum Ende der Freistellung darf der Arbeitgeber nicht kündigen (§ 5 PflegeZG). Das gilt auch für die kurzzeitige Arbeitsverhinderung und über das Familienpflegezeitgesetz für die Familienpflegezeit. Nur die zuständige Landesbehörde kann in besonderen Fällen eine Kündigung zulassen.` },
      { q: 'Wie funktioniert das zinslose Darlehen?', a: 'Das Bundesamt für Familie und zivilgesellschaftliche Aufgaben zahlt während Pflegezeit oder Familienpflegezeit monatliche Raten in Höhe der Hälfte der Differenz zwischen dem pauschalierten Nettoentgelt vor und während der Freistellung (§ 3 FPfZG). Das Darlehen wird nach der Freistellung in Raten zurückgezahlt. Es muss beantragt werden und ersetzt keinen Lohn, sondern glättet den Einkommensverlust.' },
    ],
    body: (h) => `
<h2>Die drei Freistellungen im Vergleich</h2>
${h.table(['', 'Kurzzeitige Arbeitsverhinderung', 'Pflegezeit', 'Familienpflegezeit'], [
  ['Dauer', `bis ${Z.unterstuetzungsgeld_tage} Arbeitstage`, `bis ${Z.pflegezeit_monate} Monate`, `bis ${Z.familienpflegezeit_monate} Monate`],
  ['Umfang', 'vollständig', 'vollständig oder teilweise', `teilweise, mindestens ${Z.familienpflegezeit_min_stunden} Std./Woche`],
  ['Betriebsgröße', 'alle Betriebe', `mehr als ${Z.pflegezeit_ab_beschaeftigte} Beschäftigte`, `mehr als ${Z.familienpflegezeit_ab_beschaeftigte} Beschäftigte`],
  ['Ankündigung', 'unverzüglich', `${Z.ankuendigung_pflegezeit_arbeitstage} Arbeitstage vorher`, `${Z.ankuendigung_familienpflegezeit_wochen} Wochen vorher (§ 2a FPfZG)`],
  ['Geld', `Pflegeunterstützungsgeld ${h.pct(Z.unterstuetzungsgeld_anteil, 0)} netto`, 'zinsloses Darlehen', 'zinsloses Darlehen'],
  ['Grundlage', '§ 2 PflegeZG, § 44a SGB XI', '§§ 3, 4 PflegeZG', '§ 2 FPfZG'],
], `Pflegezeit und Familienpflegezeit zusammen höchstens ${Z.gesamtdauer_monate} Monate je Angehörigem.`, ['l', 'l', 'l', 'l'])}

<h2>Die ersten zehn Tage</h2>
<p>Die kurzzeitige Arbeitsverhinderung ist für den Notfall gedacht: der Sturz der Mutter, die überraschende Entlassung aus dem Krankenhaus, die Demenz, die plötzlich keine Nacht allein mehr zulässt (${h.src('pflegezg2', '§ 2 PflegeZG')}). Sie gilt in jedem Betrieb, unabhängig von der Größe, und braucht keine Ankündigung mit Frist; es genügt, den Arbeitgeber unverzüglich zu informieren und auf Verlangen eine ärztliche Bescheinigung vorzulegen. In diesen Tagen lässt sich viel erledigen: den ${h.a('pflegegrad-beantragen', 'Pflegegrad beantragen')}, einen Pflegedienst suchen, eine ${h.a('kurzzeitpflege', 'Kurzzeitpflege')} organisieren, Hilfsmittel bestellen.</p>
<p>Das Pflegeunterstützungsgeld zahlt die Pflegekasse des Angehörigen, nicht die eigene Krankenkasse. Es beträgt ${h.pct(Z.unterstuetzungsgeld_anteil, 0)} des ausgefallenen Nettoentgelts, wer im Vorjahr Einmalzahlungen wie Weihnachtsgeld erhielt, bekommt ${h.pct(Z.unterstuetzungsgeld_anteil_mit_einmalzahlung, 0)} (${h.src('sgb5_45', '§ 45 Abs. 2 SGB V')}). Die Obergrenze liegt bei 70 Prozent der Beitragsbemessungsgrenze der Krankenversicherung, 2026 rund ${h.eur(Z.unterstuetzungsgeld_max_tag, 2)} am Tag. Teilen sich mehrere Geschwister die Tage, bleibt es bei insgesamt ${Z.unterstuetzungsgeld_tage} Arbeitstagen je Pflegebedürftigem und Jahr (${h.src('sgb11_44a', '§ 44a Abs. 3 SGB XI')}).</p>
<!--mini:pflegezeit-->

<h2>Pflegezeit: bis zu sechs Monate</h2>
<p>Wer einen Angehörigen zu Hause pflegt, kann sich bis zu ${Z.pflegezeit_monate} Monate ganz oder teilweise freistellen lassen, wenn der Arbeitgeber in der Regel mehr als ${Z.pflegezeit_ab_beschaeftigte} Personen beschäftigt (${h.src('pflegezg3', '§ 3 PflegeZG')}). Die Pflegezeit ist unbezahlt. Die Pflegekasse zahlt aber auf Antrag Zuschüsse zur Kranken- und Pflegeversicherung, wenn keine Familienversicherung möglich ist, und Rentenbeiträge, wenn die Pflege mindestens zehn Stunden pro Woche umfasst. Bei Pflegegrad 3 und reinem Pflegegeld bringt ein Jahr Pflege ${h.eur(r3.renteProJahr, 2)} Monatsrente (${h.a('rente-pflegende-angehoerige', 'Rentenrechner')}). Auch die Begleitung eines nahen Angehörigen in der letzten Lebensphase ist bis zu drei Monate möglich.</p>

<h2>Familienpflegezeit: reduzieren statt aussteigen</h2>
<p>Die Familienpflegezeit erlaubt, die Arbeitszeit bis zu ${Z.familienpflegezeit_monate} Monate auf mindestens ${Z.familienpflegezeit_min_stunden} Wochenstunden zu senken, in Betrieben mit mehr als ${Z.familienpflegezeit_ab_beschaeftigte} Beschäftigten ohne Auszubildende (${h.src('fpfzg2', '§ 2 FPfZG')}). Sie passt zu Pflegesituationen, die lange dauern, etwa einer fortschreitenden Demenz. Pflegezeit und Familienpflegezeit lassen sich kombinieren, zusammen höchstens ${Z.gesamtdauer_monate} Monate je Angehörigem. Für beide gibt es das zinslose Darlehen des Bundesamts für Familie und zivilgesellschaftliche Aufgaben in Höhe der halben Nettolücke (${h.src('fpfzg3', '§ 3 FPfZG')}).</p>

<h2>Ein Ablauf aus der Praxis</h2>
<p>Eine Tochter arbeitet Vollzeit in einem Betrieb mit 60 Beschäftigten, ihre Mutter lebt allein in einer anderen Stadt und stürzt an einem Dienstag. Am selben Tag meldet die Tochter dem Arbeitgeber die kurzzeitige Arbeitsverhinderung und fährt hin. In den folgenden Tagen stellt sie aus dem Krankenhaus den Antrag auf einen Pflegegrad, für den die verkürzte Begutachtungsfrist gilt, organisiert mit dem Sozialdienst eine Kurzzeitpflege und beantragt bei der Pflegekasse der Mutter das Pflegeunterstützungsgeld für die fehlenden Arbeitstage. Nach der Rückkehr steht fest, dass die Mutter für einige Monate Unterstützung zu Hause braucht. Die Tochter kündigt mit einer Frist von ${Z.ankuendigung_pflegezeit_arbeitstage} Arbeitstagen eine teilweise Pflegezeit an und reduziert für ${Z.pflegezeit_monate} Monate auf halbe Stelle; für die Einkommenslücke beantragt sie das zinslose Darlehen. Während dieser Zeit ist sie vor Kündigung geschützt, und die Pflegekasse zahlt Rentenbeiträge, weil sie mehr als zehn Stunden pro Woche pflegt. Bleibt der Bedarf danach bestehen, kann sie in eine Familienpflegezeit wechseln, wenn sie diese ${Z.ankuendigung_familienpflegezeit_wochen} Wochen vorher ankündigt, bis die Gesamtdauer von ${Z.gesamtdauer_monate} Monaten erreicht ist.</p>

<h2>Kündigungsschutz</h2>
<p>Ab der Ankündigung, frühestens ${Z.kuendigungsschutz_vorlauf_wochen} Wochen vor Beginn, bis zum Ende der Freistellung ist eine Kündigung ausgeschlossen (${h.src('pflegezg5', '§ 5 PflegeZG')}). Das gilt schon für die zehn Tage der kurzzeitigen Arbeitsverhinderung. Nur die oberste Landesbehörde für Arbeitsschutz kann in besonderen Fällen eine Ausnahme zulassen.</p>

<h2>Was die Freistellung nicht ersetzt</h2>
<p>Pflegezeit ist Zeit, kein Geld. Die laufenden Leistungen kommen aus der Pflegeversicherung des Angehörigen: ${h.a('pflegegeld', 'Pflegegeld')}, ${h.a('verhinderungspflege', 'Verhinderungspflege')} und der Entlastungsbetrag. Wer für die Pflege kein Geld annimmt, kann zusätzlich den ${h.a('pflege-pauschbetrag', 'Pflege-Pauschbetrag')} in der Steuererklärung ansetzen. Und wer die Pflege nach der Freistellung nicht mehr allein tragen kann, findet die nächsten Schritte bei der Pflegeberatung der Kasse, die kostenlos ist und auch zu Hause stattfinden kann.</p>
`,
  },
  en: {
    slug: 'carers-leave',
    nav: 'Carer’s leave',
    card: `${Z.unterstuetzungsgeld_tage} days with carer’s leave allowance, ${Z.pflegezeit_monate} months of care leave, ${Z.familienpflegezeit_monate} months of family care leave: what German employment law allows.`,
    title: 'Pflegezeit 2026: German Carer’s Leave, Pay and Protection',
    description: `German carer’s leave (Pflegezeit) 2026: ${Z.unterstuetzungsgeld_tage} working days with allowance, up to ${Z.pflegezeit_monate} months of care leave, ${Z.familienpflegezeit_monate} months of family care leave, loan, protection.`,
    h1: 'German carer’s leave: the time off employees are entitled to',
    intro: 'When a parent suddenly needs care: how many days you can stay away at once, when an employer in Germany must grant longer leave and what you live on meanwhile.',
    resume: `Employees in Germany have three ways to take time off to care for a close relative. In an acute care situation they may stay away from work for up to ${Z.unterstuetzungsgeld_tage} working days, at any employer, to organise care (section 2 of the Care Leave Act, PflegeZG); the relative’s long-term care fund pays a carer’s leave allowance (Pflegeunterstützungsgeld) of ${EN.pct(Z.unterstuetzungsgeld_anteil, 0)} of lost net pay, at most ${EN.eur(Z.unterstuetzungsgeld_max_tag, 2)} a day (section 44a(3) of Book XI of the Social Code). For longer breaks there is care leave (Pflegezeit) of up to ${Z.pflegezeit_monate} months, full or part time, at employers with more than ${Z.pflegezeit_ab_beschaeftigte} staff (sections 3 and 4 PflegeZG), and family care leave (Familienpflegezeit) of up to ${Z.familienpflegezeit_monate} months with at least ${Z.familienpflegezeit_min_stunden} hours a week, at employers with more than ${Z.familienpflegezeit_ab_beschaeftigte} staff (section 2 of the Family Care Leave Act). Together they may not exceed ${Z.gesamtdauer_monate} months per relative. During leave you are protected against dismissal, and a federal office grants an interest-free loan covering half the net income gap on application.`,
    faqs: [
      { q: 'My parent lives in Germany but I work abroad. Do these rights apply to me?', a: 'The German leave rights apply to employees under German employment law, typically people working for an employer in Germany. If you work abroad, your own country’s rules apply, though many EU countries have similar carer’s leave. The care benefits for your parent, such as the allowance and respite budget, come from the German care fund regardless.' },
      { q: 'Does my employer have to pay me for the ten days?', a: `Only if a collective agreement, your contract or another law says so (section 2(3) PflegeZG). Otherwise apply promptly to the relative’s care fund for the carer’s leave allowance, with a doctor’s certificate. It is ${EN.pct(Z.unterstuetzungsgeld_anteil, 0)} of lost net pay for up to ${Z.unterstuetzungsgeld_tage} working days per calendar year and person in need of care.` },
      { q: 'How early must I announce care leave?', a: `At least ${Z.ankuendigung_pflegezeit_arbeitstage} working days before it starts, in text form, stating the period and extent and, for part-time leave, the desired working pattern (section 3(3) PflegeZG). You prove the care need with a certificate from the care fund or the Medical Service. Announcing leave also shortens the assessment deadline for your relative.` },
      { q: 'Am I protected against dismissal during care leave?', a: `Yes. From the announcement, but no earlier than ${Z.kuendigungsschutz_vorlauf_wochen} weeks before the planned start, until the end of the leave, the employer may not dismiss you (section 5 PflegeZG). This also covers the ten days of short-term leave and, via the Family Care Leave Act, family care leave. Only the state labour authority can allow an exception.` },
      { q: 'Who counts as a close relative for German carer’s leave?', a: 'Grandparents, parents, parents-in-law and step-parents, spouses, registered and unmarried partners, siblings and their spouses, siblings of spouses, children, adopted and foster children, children-in-law and grandchildren (section 7(3) PflegeZG). For care leave the relative must need care; for the ten days it is enough that a care need is likely.' },
    ],
    body: (h) => `
<h2>The three options compared</h2>
${h.table(['', 'Short-term leave', 'Care leave', 'Family care leave'], [
  ['Duration', `up to ${Z.unterstuetzungsgeld_tage} working days`, `up to ${Z.pflegezeit_monate} months`, `up to ${Z.familienpflegezeit_monate} months`],
  ['Extent', 'full', 'full or partial', `partial, at least ${Z.familienpflegezeit_min_stunden} h/week`],
  ['Employer size', 'all employers', `more than ${Z.pflegezeit_ab_beschaeftigte} staff`, `more than ${Z.familienpflegezeit_ab_beschaeftigte} staff`],
  ['Notice', 'without delay', `${Z.ankuendigung_pflegezeit_arbeitstage} working days`, `${Z.ankuendigung_familienpflegezeit_wochen} weeks (s. 2a FPfZG)`],
  ['Money', `carer’s leave allowance ${h.pct(Z.unterstuetzungsgeld_anteil, 0)} of net`, 'interest-free loan', 'interest-free loan'],
  ['Legal basis', 's. 2 PflegeZG, s. 44a SGB XI', 'ss. 3, 4 PflegeZG', 's. 2 FPfZG'],
], `Care leave and family care leave together at most ${Z.gesamtdauer_monate} months per relative.`, ['l', 'l', 'l', 'l'])}

<h2>The first ten days</h2>
<p>Short-term leave is for emergencies: your mother falls, a hospital discharges your father without warning, dementia suddenly makes nights alone impossible (${h.src('pflegezg2', 'section 2 PflegeZG')}). It applies at any employer regardless of size and needs no notice period; tell your employer at once and provide a doctor’s certificate if asked. Ten days are enough to ${h.a('pflegegrad-beantragen', 'apply for a care grade')}, find a care service, arrange ${h.a('kurzzeitpflege', 'short-term care')} and order aids.</p>
<p>The carer’s leave allowance is paid by the relative’s care fund, not your own health insurer. It is ${h.pct(Z.unterstuetzungsgeld_anteil, 0)} of lost net pay, or ${h.pct(Z.unterstuetzungsgeld_anteil_mit_einmalzahlung, 0)} if you received one-off payments such as a Christmas bonus in the previous twelve months (${h.src('sgb5_45', 'section 45(2) SGB V')}). The cap is 70 percent of the health insurance contribution ceiling, about ${h.eur(Z.unterstuetzungsgeld_max_tag, 2)} a day in 2026. Siblings sharing the days get ${Z.unterstuetzungsgeld_tage} working days in total per person in need of care and year (${h.src('sgb11_44a', 'section 44a(3) SGB XI')}).</p>
<!--mini:pflegezeit-->

<h2>Care leave: up to six months</h2>
<p>If you care for a relative at home you can take up to ${h.num(Z.pflegezeit_monate)} months off, fully or partly, if your employer usually employs more than ${Z.pflegezeit_ab_beschaeftigte} people (${h.src('pflegezg3', 'section 3 PflegeZG')}). It is unpaid, but on request the care fund pays subsidies towards health and care insurance where family cover is not possible, and pension contributions if you care at least ten hours a week. At grade 3 with allowance only, one year of caring adds ${h.eur(r3.renteProJahr, 2)} of monthly pension (${h.a('rente-pflegende-angehoerige', 'carer pension calculator')}). Accompanying a close relative in the last phase of life is possible for up to three months.</p>

<h2>Family care leave: reduce rather than stop</h2>
<p>Family care leave lets you cut your hours for up to ${Z.familienpflegezeit_monate} months to at least ${Z.familienpflegezeit_min_stunden} a week, at employers with more than ${Z.familienpflegezeit_ab_beschaeftigte} staff excluding trainees (${h.src('fpfzg2', 'section 2 FPfZG')}). It suits long care situations such as progressing dementia. Both types can be combined, up to ${Z.gesamtdauer_monate} months per relative, and both come with the federal interest-free loan worth half the net income gap (${h.src('fpfzg3', 'section 3 FPfZG')}).</p>

<h2>A typical sequence</h2>
<p>A daughter works full time for a company with 60 staff; her mother lives alone in another city and falls on a Tuesday. That day the daughter notifies short-term leave and travels there. Over the next days she applies for a care grade from the hospital, where the shortened assessment deadline applies, arranges short-term care with the hospital social service and claims the carer’s leave allowance from her mother’s care fund for the missed days. Back home, it is clear her mother will need support for some months, so she announces part-time care leave with ${Z.ankuendigung_pflegezeit_arbeitstage} working days’ notice, halves her hours for ${Z.pflegezeit_monate} months and applies for the interest-free loan. If the need continues she can switch to family care leave, announced ${Z.ankuendigung_familienpflegezeit_wochen} weeks ahead, up to ${Z.gesamtdauer_monate} months in total.</p>

<h2>Protection against dismissal</h2>
<p>From the announcement, no earlier than ${Z.kuendigungsschutz_vorlauf_wochen} weeks before the start, until the leave ends, you cannot be dismissed (${h.src('pflegezg5', 'section 5 PflegeZG')}). This already covers the ten days of short-term leave. Only the highest state labour protection authority may allow an exception in special cases.</p>

<h2>What leave does not replace</h2>
<p>Leave gives time, not money. Ongoing benefits come from your relative’s care insurance: the ${h.a('pflegegeld', 'care allowance')}, ${h.a('verhinderungspflege', 'respite care')} and the relief amount. If you accept no money for caring you can also claim the ${h.a('pflege-pauschbetrag', 'carer’s tax lump sum')} on a German tax return.</p>
`,
  },
});
