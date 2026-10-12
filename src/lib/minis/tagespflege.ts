import { tagespflege } from '../engine/leistungen';
import { T, eur, num, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Wie viele Tage Tagespflege im Monat bezahlt sind', 'How many days of day care a month are covered'),
  cta: T(l, 'Mit Pflegegeld und Entlastungsbetrag rechnen', 'Combine with allowance and relief amount'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l, 2) }, { id: 's', label: T(l, 'Pflegesatz pro Tag (laut Einrichtung)', 'Daily care rate (from the centre)'), def: 75, unit: '€', max: 500 }],
  run: ({ g, s }: Record<string, number>) => { const b = tagespflege(g as 2);
    return { head: [T(l, 'Bezahlte Tage im Monat', 'Covered days per month'), num(s > 0 ? Math.floor(b / s) : 0, l)], rows: [[T(l, 'Budget Tagespflege', 'Day care budget'), eur(b, l)], [T(l, 'Pflegegeld bleibt', 'Allowance stays'), T(l, 'ungekürzt (§ 41 Abs. 3)', 'in full (s. 41(3))')]] as Rows, note: T(l, 'Essen und Investitionskosten der Tagespflege zahlen Sie; dafür passt der Entlastungsbetrag.', 'You pay meals and investment costs; the relief amount can cover them.') }; },
});
