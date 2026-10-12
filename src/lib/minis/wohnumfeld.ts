import { wohnumfeld } from '../engine/leistungen';
import { T, eur, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Zuschuss für Bad, Treppenlift oder Türen', 'Grant for a bathroom, stairlift or doors'),
  cta: T(l, 'Alle Leistungen rechnen', 'Work out all benefits'),
  inputs: [{ id: 'k', label: T(l, 'Kosten der Maßnahme', 'Cost of the work'), def: 7500, unit: '€', max: 500000 }, { id: 'p', label: T(l, 'Pflegebedürftige in der Wohnung', 'People with a care grade in the home'), def: 1, max: 8 }],
  run: ({ k, p }: Record<string, number>) => { const w = wohnumfeld(k, p);
    return { head: [T(l, 'Zuschuss der Pflegekasse', 'Grant from the fund'), eur(w.zuschuss, l)], rows: [[T(l, 'Obergrenze', 'Cap'), eur(w.cap, l)], [T(l, 'selbst zu zahlen', 'you pay'), eur(w.selbst, l)]] as Rows }; },
});
