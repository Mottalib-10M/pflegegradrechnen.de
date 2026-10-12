import { entlastung } from '../engine/leistungen';
import { T, eur, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Entlastungsbetrag: Was übrig ist und wie lange', 'Relief amount: what is left and for how long'),
  cta: T(l, 'Alle Leistungen zu Hause rechnen', 'Work out every home care benefit'),
  inputs: [{ id: 'm', label: T(l, 'Monate mit Anspruch 2026', 'Months of entitlement in 2026'), def: 12, max: 12 }, { id: 'u', label: T(l, '2026 schon erstattet', 'Already refunded in 2026'), def: 524, unit: '€', max: 5000 }],
  run: ({ m, u }: Record<string, number>) => { const e = entlastung(m, u);
    return { head: [T(l, 'Rest bis 30. Juni 2027 nutzbar', 'Usable until 30 June 2027'), eur(e.uebertrag, l)], rows: [[T(l, 'Anspruch 2026', 'Entitlement 2026'), eur(e.anspruch, l)], [T(l, 'erstattet', 'refunded'), eur(e.genutzt, l)]] as Rows, note: T(l, 'Danach verfällt der Rest aus 2026 (§ 45b Abs. 1).', 'After that the 2026 balance lapses (section 45b(1)).') }; },
});
