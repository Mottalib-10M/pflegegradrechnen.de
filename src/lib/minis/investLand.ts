import { kosten, LAENDER } from '../engine/heim';
import { P } from '../engine/params';
import { T, eur, pct, landOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Investitionskosten in Ihrem Land', 'Investment costs in your state'),
  cta: T(l, 'Gesamten Eigenanteil rechnen', 'Work out the full co-payment'),
  inputs: [{ id: 'l', label: T(l, 'Bundesland', 'State'), def: 9, options: landOpt(l) }],
  run: ({ l: i }: Record<string, number>) => { const k = kosten(LAENDER[i] ?? 'NW'); const b = P.heim.bund;
    return { head: [T(l, 'Investitionskosten im Monat', 'Investment costs per month'), eur(k.invest, l)], rows: [[T(l, 'im Jahr', 'per year'), eur(k.invest * 12, l)], [T(l, 'Anteil am Eigenanteil (1. Jahr)', 'Share of co-payment (year 1)'), pct(k.invest / k.mit15, l)], [T(l, 'Bundesschnitt', 'National average'), eur(b.invest, l)]] as Rows }; },
});
