import { pflegegeld, pflegegeldTeilmonat } from '../engine/leistungen';
import { T, eur, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Pflegegeld für einen angebrochenen Monat', 'Allowance for part of a month'),
  cta: T(l, 'Alle Leistungen im Monat rechnen', 'Work out all monthly benefits'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l, 2) }, { id: 't', label: T(l, 'Tage mit Anspruch', 'Days of entitlement'), def: 18, max: 30 }],
  run: ({ g, t }: Record<string, number>) => ({ head: [T(l, 'Pflegegeld für den Monat', 'Allowance for the month'), eur(pflegegeldTeilmonat(g as 2, t), l)], rows: [[T(l, 'voller Monat', 'full month'), eur(pflegegeld(g as 2), l)], [T(l, 'pro Tag (Monat = 30 Tage)', 'per day (month = 30 days)'), eur(pflegegeld(g as 2) / 30, l, 2)]] as Rows }),
});
