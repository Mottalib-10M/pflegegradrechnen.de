import { gewichtet, bereich } from '../engine/nba';
import { T, num, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Demenz: Zählt Modul 2 oder Modul 3?', 'Dementia: does module 2 or module 3 count?'),
  cta: T(l, 'Alle Module durchgehen', 'Go through every module'),
  inputs: [{ id: 'a', label: T(l, 'Summe Modul 2 (Kognition)', 'Module 2 total (cognition)'), def: 12, max: 33 }, { id: 'b', label: T(l, 'Summe Modul 3 (Verhalten)', 'Module 3 total (behaviour)'), def: 5, max: 65 }],
  run: ({ a, b }: Record<string, number>) => { const ga = gewichtet('m2', a), gb = gewichtet('m3', b);
    return { head: [T(l, 'Gewertet für Module 2 und 3', 'Counted for modules 2 and 3'), num(Math.max(ga, gb), l, 2)], rows: [[T(l, 'Modul 2 gewichtet', 'Module 2 weighted'), `${num(ga, l, 2)} (${T(l, 'Bereich', 'band')} ${bereich('m2', a)})`], [T(l, 'Modul 3 gewichtet', 'Module 3 weighted'), `${num(gb, l, 2)} (${T(l, 'Bereich', 'band')} ${bereich('m3', b)})`], [T(l, 'Es zählt', 'Counts'), ga >= gb ? T(l, 'Modul 2', 'module 2') : T(l, 'Modul 3', 'module 3')]] as Rows }; },
});
