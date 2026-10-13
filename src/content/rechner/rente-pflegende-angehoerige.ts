import { defineGuide } from '../../lib/guide-types';
import { rentenpunkte } from '../../lib/engine/angehoerige';
import { P, DE, EN } from '../../lib/fmt';

/** Beispiele aus dem Motor: Rente je Pflegejahr für jeden Grad und jede Leistungsart; Mehrfachpflege 60/40 bei Grad 4. */
const G = [2, 3, 4, 5] as const;
const R = P.rente;
const g3 = rentenpunkte(3, 'geld');
const zwei = rentenpunkte(4, 'geld', 0.6);

export default defineGuide({
  id: 'rente-pflegende-angehoerige',
  group: 'angehoerige',
  order: 10,
  tool: 'rente',
  related: ['pflege-pauschbetrag', 'pflegezeit', 'pflegegrad-4', 'pflegegrad-5', 'pflegegeld', 'kombinationsleistung'],
  sources: ['sgb11_44', 'sgb6_166', 'drvRechengroessen', 'drvRentenwert'],
  de: {
    slug: 'rente-pflegende-angehoerige',
    nav: 'Rente für pflegende Angehörige',
    card: 'Was ein Jahr Pflege an Rentenpunkten und Monatsrente bringt, je nach Pflegegrad und Leistungsart.',
    title: 'Rente für pflegende Angehörige 2026: Punkte je Pflegejahr',
    description: `Rente für pflegende Angehörige 2026: Rentenbeiträge auf 18,9 bis 100 % der Bezugsgröße von ${DE.eur(R.bezugsgroesse_monat)}, bis ${DE.num(rentenpunkte(5, 'geld').punkteJahr, 2)} Rentenpunkte pro Pflegejahr. Mit Rechner.`,
    h1: 'Rentenpunkte für die Pflege eines Angehörigen berechnen',
    intro: 'Pflegegrad, bezogene Leistung und Ihr Anteil an der Pflege: Der Rechner zeigt, wie viel gesetzliche Rente ein Jahr Pflege bringt.',
    resume: `Wer einen Angehörigen mit mindestens Pflegegrad 2 zu Hause pflegt, mindestens zehn Stunden pro Woche an mindestens zwei Tagen, und daneben höchstens 30 Stunden erwerbstätig ist, für den zahlt die Pflegekasse Beiträge zur gesetzlichen Rentenversicherung (§ 44 SGB XI). Die Höhe hängt vom Pflegegrad und von der bezogenen Leistung ab: Als beitragspflichtige Einnahme gilt ein Anteil der Bezugsgröße von ${DE.eur(R.bezugsgroesse_monat)} im Monat, von 18,9 Prozent bei Pflegegrad 2 mit Sachleistung bis 100 Prozent bei Pflegegrad 5 mit reinem Pflegegeld (§ 166 Abs. 2 SGB VI). Daraus entstehen Entgeltpunkte nach dem vorläufigen Durchschnittsentgelt 2026 von ${DE.eur(R.durchschnittsentgelt)}. Ein Jahr Pflege bei Pflegegrad 3 und reinem Pflegegeld ergibt ${DE.num(g3.punkteJahr, 4)} Punkte, das sind beim Rentenwert von ${DE.eur(R.rentenwert, 2)} ab Juli 2026 ${DE.eur(g3.renteProJahr, 2)} Monatsrente. Pflegen mehrere Personen, wird nach dem jeweiligen Anteil geteilt.`,
    faqs: [
      { q: 'Muss ich die Rentenbeiträge selbst beantragen?', a: 'Die Pflegekasse prüft die Voraussetzungen im Rahmen der Begutachtung: Der Medizinische Dienst fragt nach den Pflegepersonen und ihrem Zeitaufwand. Geben Sie dabei an, wer wie viele Stunden pflegt, und füllen Sie den Fragebogen zur Pflegeperson aus, den die Kasse schickt. Die Kasse meldet Sie dann der Rentenversicherung; prüfen Sie Ihren Versicherungsverlauf nach einem Jahr.' },
      { q: 'Bekomme ich Rentenpunkte, wenn ich Vollzeit arbeite?', a: `Nein. Wer regelmäßig mehr als ${R.max_erwerb_stunden} Stunden pro Woche erwerbstätig ist, erhält keine Beiträge aus der Pflege (§ 44 Abs. 1 SGB XI). Wer die Arbeitszeit auf 30 Stunden oder weniger reduziert, um zu pflegen, kann die Lücke so teilweise ausgleichen. Die Unfallversicherung während der Pflegetätigkeit gilt unabhängig davon.` },
      { q: 'Wie wird geteilt, wenn zwei Geschwister pflegen?', a: `Nach dem Anteil jeder Person am gesamten Pflegeaufwand, wie ihn die Kasse feststellt; ohne übereinstimmende Angaben zu gleichen Teilen (§ 44 Abs. 1 SGB XI). Pflegt eine Schwester bei Pflegegrad 4 zu 60 Prozent, gelten für sie ${DE.eur(zwei.einnahmeMonat)} im Monat als beitragspflichtig. Jede Person muss für sich die zehn Stunden pro Woche erreichen.` },
    ],
    body: (h) => `
<h2>Monatsrente je Pflegejahr</h2>
${h.table(['Pflegegrad', 'nur Pflegegeld', 'Kombination', 'nur Sachleistung'],
  G.map((g) => [String(g), h.eur(rentenpunkte(g, 'geld').renteProJahr, 2), h.eur(rentenpunkte(g, 'kombi').renteProJahr, 2), h.eur(rentenpunkte(g, 'sach').renteProJahr, 2)]),
  `Zusätzliche Monatsrente für ein Jahr Pflege, eine Pflegeperson, Rentenwert ${h.eur(R.rentenwert, 2)} ab 1. Juli 2026.`, ['l', 'r', 'r', 'r'])}
<p>Die Tabelle zeigt, warum sich die Wahl der Leistungsart auch auf die Rente auswirkt: Je mehr die Familie selbst pflegt, desto höher die Beiträge. Bei Pflegegrad 5 mit reinem Pflegegeld zahlt die Kasse Beiträge auf die volle Bezugsgröße, als hätte die Pflegeperson ein Jahr zum Durchschnittslohn gearbeitet (${h.src('sgb6_166', '§ 166 Abs. 2 SGB VI')}).</p>
<p>Die Werte gelten für die Rechengrößen 2026 (${h.src('drvRechengroessen', 'DRV')}) und den Rentenwert ab Juli 2026 (${h.src('drvRentenwert', 'DRV')}). Spätere Rentenanpassungen erhöhen den Wert jedes Punktes. Wer bereits eine Vollrente wegen Alters bezieht, erwirbt in der Regel keine neuen Beiträge aus der Pflege mehr; prüfen Sie das mit der Rentenversicherung.</p>
<p>Neben der Rente sichert die Pflegekasse die Pflegeperson in der Unfallversicherung und, wenn die Voraussetzungen erfüllt sind, in der Arbeitslosenversicherung ab (${h.src('sgb11_44', '§ 44 Abs. 2a und 2b SGB XI')}). Steuerlich kommt der ${h.a('pflege-pauschbetrag', 'Pflege-Pauschbetrag')} hinzu, wenn Sie für die Pflege kein Geld erhalten.</p>
`,
  },
  en: {
    slug: 'pension-for-family-carers',
    nav: 'Pension for family carers',
    card: 'What a year of caring earns in German pension points and monthly pension, by care grade and benefit type.',
    title: 'Pension for Family Carers Germany 2026: Points per Year',
    description: `German pension for family carers 2026: contributions on 18.9 to 100% of the ${EN.eur(R.bezugsgroesse_monat)} reference value, up to ${EN.num(rentenpunkte(5, 'geld').punkteJahr, 2)} points per year of care. With calculator.`,
    h1: 'Work out the German pension points earned by caring',
    intro: 'Care grade, benefit received and your share of the caring: the calculator shows how much statutory pension one year of caring earns.',
    resume: `If you care at home for a relative with at least care grade 2 for at least ten hours a week over at least two days, and work no more than 30 hours a week, the German long-term care fund pays contributions to the statutory pension insurance for you (section 44 of Book XI of the Social Code). The amount depends on the grade and the benefit drawn: the contribution base is a share of the reference value (Bezugsgröße) of ${EN.eur(R.bezugsgroesse_monat)} a month, from 18.9 percent at grade 2 with services only to 100 percent at grade 5 with allowance only (section 166(2) of Book VI). Pension points follow from the provisional 2026 average pay of ${EN.eur(R.durchschnittsentgelt)}. One year of caring at grade 3 with allowance only gives ${EN.num(g3.punkteJahr, 4)} points, worth ${EN.eur(g3.renteProJahr, 2)} of monthly pension at the pension value of ${EN.eur(R.rentenwert, 2)} from July 2026. If several people care, the contribution is split by each person’s share.`,
    faqs: [
      { q: 'Do I have to apply for the pension contributions?', a: 'The care fund checks the conditions as part of the assessment: the Medical Service asks who provides care and for how long. State who cares and how many hours, and complete the carer questionnaire the fund sends. The fund then reports you to the pension insurance; check your insurance record after a year.' },
      { q: 'I live outside Germany and care during long visits. Do I qualify?', a: 'The rule requires regular care of at least ten hours a week over two days. Occasional visits from abroad rarely meet that. If you move to Germany to care, or live in another EU country and care across the border, ask the Pflegekasse and the German Pension Insurance in writing how your case is treated, as EU coordination rules can apply.' },
      { q: 'How is it split when two siblings share the care?', a: `By each person’s share of the total care effort as established by the fund, or equally without matching statements (section 44(1) SGB XI). A sister caring 60 percent at grade 4 has ${EN.eur(zwei.einnahmeMonat)} a month counted as contribution base. Each carer must reach the ten hours a week individually.` },
    ],
    body: (h) => `
<h2>Monthly pension per year of caring</h2>
${h.table(['Care grade', 'allowance only', 'combined', 'services only'],
  G.map((g) => [String(g), h.eur(rentenpunkte(g, 'geld').renteProJahr, 2), h.eur(rentenpunkte(g, 'kombi').renteProJahr, 2), h.eur(rentenpunkte(g, 'sach').renteProJahr, 2)]),
  `Additional monthly pension for one year of caring, one carer, pension value ${h.eur(R.rentenwert, 2)} from 1 July 2026.`, ['l', 'r', 'r', 'r'])}
<p>The table shows why the choice of benefit also affects the carer’s pension: the more care the family provides itself, the higher the contributions. At grade 5 with allowance only, the fund pays contributions on the full reference value, as if the carer had worked a year at average pay (${h.src('sgb6_166', 'section 166(2) SGB VI')}).</p>
<p>The figures use the 2026 reference values (${h.src('drvRechengroessen', 'German Pension Insurance')}) and the pension value from July 2026 (${h.src('drvRentenwert', 'German Pension Insurance')}). Future pension increases raise the value of every point. Anyone already drawing a full old-age pension usually earns no new contributions from caring; check with the pension insurance.</p>
<p>Besides the pension, the fund covers the carer under statutory accident insurance and, where conditions are met, unemployment insurance (${h.src('sgb11_44', 'section 44(2a) and (2b) SGB XI')}). A carer who takes no money for caring can also claim the ${h.a('pflege-pauschbetrag', 'carer’s tax lump sum')}.</p>
`,
  },
});
