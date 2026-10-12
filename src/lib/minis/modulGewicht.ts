import { gewichtet, gradAusPunkten } from '../engine/nba';
import { T, num, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Vom Gutachten zum Grad: Ihre Modulpunkte gewichten', 'From report to grade: weight your module points'),
  cta: T(l, 'Alle 64 Kriterien durchgehen', 'Go through all 64 criteria'),
  inputs: [
    { id: 'm1', label: T(l, 'Modul 1, Summe', 'Module 1 total'), def: 6, max: 15 }, { id: 'm23', label: T(l, 'Modul 2 oder 3, höhere Summe (Modul 2)', 'Module 2 total'), def: 8, max: 33 },
    { id: 'm4', label: T(l, 'Modul 4, Summe', 'Module 4 total'), def: 14, max: 54 }, { id: 'm6', label: T(l, 'Modul 6, Summe', 'Module 6 total'), def: 6, max: 18 },
  ],
  run: ({ m1, m23, m4, m6 }: Record<string, number>) => { const p = gewichtet('m1', m1) + gewichtet('m2', m23) + gewichtet('m4', m4) + gewichtet('m6', m6); const g = gradAusPunkten(p);
    return { head: [T(l, 'Gewichtete Punkte (ohne Modul 5)', 'Weighted points (without module 5)'), num(p, l, 2)], rows: [[T(l, 'Pflegegrad daraus', 'Grade from this'), g ? String(g) : '–'], [T(l, 'Selbstversorgung gewichtet', 'Self-care weighted'), num(gewichtet('m4', m4), l, 2)]] as Rows, note: T(l, 'Modul 5 (Medikamente, Arztbesuche) kann bis zu 20 Punkte ergänzen.', 'Module 5 (medication, doctor visits) can add up to 20 points.') }; },
});
