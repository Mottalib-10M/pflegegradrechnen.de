import { heimMonat, kosten, zuschlagSatz } from '../engine/heim';
import { T, eur, pct, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Wann der Zuschlag das nächste Mal steigt', 'When the supplement rises next'),
  cta: T(l, 'Pflegeheim-Rechner öffnen', 'Open the care home calculator'),
  inputs: [{ id: 'm', label: T(l, 'Monate im Heim bisher', 'Months in the home so far'), def: 10, max: 600 }, { id: 'e', label: T(l, 'EEE des Heims', 'Home’s EEE'), def: 2088, unit: '€', max: 10000 }],
  run: ({ m, e }: Record<string, number>) => { const jetzt = Math.max(1, m + 1); const naechste = [13, 25, 37].find((x) => x > jetzt);
    const a = heimMonat(kosten('BUND'), jetzt, 3, e), b = naechste ? heimMonat(kosten('BUND'), naechste, 3, e) : a;
    return { head: [T(l, 'Ersparnis ab nächster Stufe', 'Saving from next step'), eur(a.eigenanteil - b.eigenanteil, l)], rows: [[T(l, 'Zuschlag jetzt', 'Supplement now'), pct(zuschlagSatz(jetzt), l, 0)], [T(l, 'nächste Stufe in', 'next step in'), naechste ? T(l, `${naechste - jetzt} Monaten`, `${naechste - jetzt} months`) : T(l, 'Höchststufe erreicht', 'top step reached')]] as Rows }; },
});
