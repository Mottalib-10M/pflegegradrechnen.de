import { pflegegeld } from '../engine/leistungen';
import { T, eur, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Was ein später gestellter Antrag kostet', 'What a late application costs'),
  cta: T(l, 'Pflegegrad vorab schätzen', 'Estimate the care grade first'),
  inputs: [{ id: 'g', label: T(l, 'Erwarteter Pflegegrad', 'Expected care grade'), def: 2, options: gradOpt(l, 2) }, { id: 'm', label: T(l, 'Monate gewartet', 'Months waited'), def: 3, max: 60 }],
  run: ({ g, m }: Record<string, number>) => { const pg = pflegegeld(g as 2);
    return { head: [T(l, 'Verlorenes Pflegegeld', 'Allowance lost'), eur(pg * m, l)], rows: [[T(l, 'Pflegegeld pro Monat', 'Allowance per month'), eur(pg, l)], [T(l, 'gezahlt ab', 'paid from'), T(l, 'Monat des Antrags (§ 33)', 'month of application (s. 33)')]] as Rows, note: T(l, 'Rückwirkend vor den Antragsmonat zahlt die Kasse nicht.', 'The fund does not pay for months before the application.') }; },
});
