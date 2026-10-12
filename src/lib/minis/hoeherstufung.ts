import { bisNaechsterGrad, gradAusPunkten } from '../engine/nba';
import { pflegegeld, sachleistung } from '../engine/leistungen';
import { T, eur, num, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Wie nah ist der nächste Pflegegrad?', 'How close is the next care grade?'),
  cta: T(l, 'Punkte neu schätzen', 'Re-estimate the points'),
  inputs: [{ id: 'p', label: T(l, 'Gesamtpunkte im letzten Gutachten', 'Total points in the last report'), def: 42, max: 100, decimals: 2 }],
  run: ({ p }: Record<string, number>) => { const g = gradAusPunkten(p); const n = bisNaechsterGrad(p);
    return { head: [T(l, 'Bis zum nächsten Grad fehlen', 'Points missing for the next grade'), n ? num(n.fehlt, l, 2) : '–'], rows: [[T(l, 'Grad heute', 'Grade today'), g ? String(g) : '–'], [T(l, 'Pflegegeld danach mehr', 'Extra allowance after'), n ? eur(pflegegeld(n.grad) - pflegegeld(g), l) : '–'], [T(l, 'Sachleistung danach mehr', 'Extra services budget after'), n ? eur(sachleistung(n.grad) - sachleistung(g), l) : '–']] as Rows }; },
});
