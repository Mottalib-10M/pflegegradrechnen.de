import { heimMonat, kosten } from '../engine/heim';
import { T, eur, pct, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Eigenanteil aus Ihrem Heimvertrag nachrechnen', 'Check the co-payment from your home contract'),
  cta: T(l, 'Pflegeheim-Rechner mit Landesschnitt', 'Care home calculator with state average'),
  inputs: [{ id: 'e', label: T(l, 'EEE laut Rechnung', 'EEE on the bill'), def: 2100, unit: '€', max: 10000 }, { id: 'uv', label: T(l, 'Unterkunft, Verpflegung, Investition', 'Board, lodging, investment'), def: 1590, unit: '€', max: 10000 }, { id: 'm', label: T(l, 'Aufenthaltsmonat', 'Month of stay'), def: 1, max: 600 }],
  run: ({ e, uv, m }: Record<string, number>) => { const h = heimMonat({ ...kosten('BUND'), uv, invest: 0 }, Math.max(1, m), 3, e);
    return { head: [T(l, 'Eigenanteil im Monat', 'Co-payment per month'), eur(h.eigenanteil, l)], rows: [[T(l, 'Leistungszuschlag', 'Supplement'), `${pct(h.satz, l, 0)} = ${eur(h.zuschlag, l)}`], [T(l, 'EEE nach Zuschlag', 'EEE after supplement'), eur(h.eeeNachZuschlag, l)]] as Rows }; },
});
