import { kombination, sachleistung } from '../engine/leistungen';
import { P } from '../engine/params';
import { T, eur, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Reicht die Sachleistung für den Pflegedienst?', 'Does the services budget cover the care service?'),
  cta: T(l, 'Mit Pflegegeld kombinieren', 'Combine with the allowance'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l, 2) }, { id: 'r', label: T(l, 'Monatsrechnung des Dienstes', 'Monthly service bill'), def: 1300, unit: '€', max: 20000 }],
  run: ({ g, r }: Record<string, number>) => { const k = kombination(g as 2, r); const max = sachleistung(g as 2);
    return { head: [k.ueberMax ? T(l, 'Selbst zu zahlen', 'You pay') : T(l, 'Ungenutzt im Topf', 'Left in the budget'), eur(k.ueberMax || k.rest, l)], rows: [[T(l, 'Sachleistung bis', 'Budget up to'), eur(max, l)], [T(l, 'Pflegegeld daneben', 'Allowance alongside'), eur(k.pflegegeld, l)], [T(l, 'davon für Alltagshilfe umwandelbar', 'convertible for everyday help'), eur(Math.min(k.rest, max * P.umwandlung.anteil_max), l)]] as Rows }; },
});
