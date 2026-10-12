import { jahresbetrag, pflegegeldWaehrendErsatz } from '../engine/leistungen';
import { T, eur, gradOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Wie viele Tage Kurzzeitpflege der Jahresbetrag trägt', 'How many days of short-term care the annual budget covers'),
  cta: T(l, 'Verhinderungs- und Kurzzeitpflege zusammen planen', 'Plan respite and short-term care together'),
  inputs: [{ id: 'g', label: T(l, 'Pflegegrad', 'Care grade'), def: 3, options: gradOpt(l, 2) }, { id: 's', label: T(l, 'Pflegesatz pro Tag (ohne Unterkunft)', 'Daily care rate (excl. board)'), def: 95, unit: '€', max: 1000 }, { id: 't', label: T(l, 'Tage', 'Days'), def: 21, max: 56 }],
  run: ({ g, s, t }: Record<string, number>) => { const r = jahresbetrag({ grad: g as 2, kurzzeitEuro: s * t, verhinderungFremdEuro: 0, verhinderungAngehoerigEuro: 0, angehoerigAufwendungenEuro: 0 }); const pg = pflegegeldWaehrendErsatz(g as 2, t);
    return { head: [T(l, 'Pflegekasse zahlt', 'Fund pays'), eur(r.kurzzeit, l)], rows: [[T(l, 'Rest im Jahresbetrag', 'Left in the annual budget'), eur(r.rest, l)], [T(l, 'Pflegeanteil selbst', 'Care share you pay'), eur(r.selbst, l)], [T(l, 'halbes Pflegegeld läuft weiter', 'half allowance continues'), eur(pg.summe, l)]] as Rows, note: T(l, 'Unterkunft, Verpflegung und Investitionskosten zahlt die Kasse nicht; der Entlastungsbetrag kann sie decken.', 'The fund does not pay board, lodging or investment costs; the relief amount can cover them.') }; },
});
