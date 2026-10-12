import { pflegegeld } from '../engine/leistungen';
import { T, eur, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Was ein erfolgreicher Widerspruch nachzahlt', 'What a successful objection pays back'),
  cta: T(l, 'Pflegegrad mit allen Kriterien prüfen', 'Check the grade against all criteria'),
  inputs: [{ id: 'a', label: T(l, 'Bewilligter Grad', 'Grade awarded'), def: 2, options: gradOpt(l, 1) }, { id: 'n', label: T(l, 'Grad nach Widerspruch', 'Grade after objection'), def: 3, options: gradOpt(l, 2) }, { id: 'm', label: T(l, 'Monate seit Antrag', 'Months since application'), def: 4, max: 60 }],
  run: ({ a, n, m }: Record<string, number>) => { const d = Math.max(0, pflegegeld(n as 2) - pflegegeld(a as 2));
    return { head: [T(l, 'Nachzahlung Pflegegeld', 'Back payment of allowance'), eur(d * m, l)], rows: [[T(l, 'mehr pro Monat', 'more per month'), eur(d, l)], [T(l, 'mehr pro Jahr', 'more per year'), eur(d * 12, l)]] as Rows, note: T(l, 'Ab dem Antragsmonat, wenn der höhere Grad von Anfang an bestand.', 'From the month of application if the higher grade applied from the start.') }; },
});
