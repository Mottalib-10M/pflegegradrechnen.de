import { kombination } from '../engine/leistungen';
import { T, eur, pct, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Wie viel Pflegegeld neben dem Pflegedienst bleibt', 'How much allowance is left next to a care service'),
  cta: T(l, 'Kombinationsleistung genau rechnen', 'Work out the combined benefit in detail'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l, 2) }, { id: 'pd', label: T(l, 'Rechnung Pflegedienst', 'Care service bill'), def: 600, unit: '€', max: 20000 }],
  run: ({ g, pd }: Record<string, number>) => { const k = kombination(g as 2, pd);
    return { head: [T(l, 'Pflegegeld im Monat', 'Allowance per month'), eur(k.pflegegeld, l)], rows: [[T(l, 'Sachleistung genutzt', 'Services budget used'), pct(k.anteil, l)], [T(l, 'volles Pflegegeld', 'full allowance'), eur(k.pflegegeldVoll, l)], [T(l, 'selbst zu zahlen', 'you pay'), eur(k.ueberMax, l)]] as Rows }; },
});
