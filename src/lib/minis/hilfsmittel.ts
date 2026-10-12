import { hilfsmittelZuzahlung } from '../engine/leistungen';
import { P } from '../engine/params';
import { T, eur, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Pflegehilfsmittel: was Sie selbst zahlen', 'Care aids: what you pay yourself'),
  cta: T(l, 'Alle Leistungen rechnen', 'Work out all benefits'),
  inputs: [{ id: 'v', label: T(l, 'Verbrauchsprodukte pro Monat', 'Consumables per month'), def: 55, unit: '€', max: 2000 }, { id: 't', label: T(l, 'Preis technisches Hilfsmittel (z. B. Pflegebett)', 'Price of a technical aid (e.g. care bed)'), def: 900, unit: '€', max: 50000 }],
  run: ({ v, t }: Record<string, number>) => { const ue = Math.max(0, v - P.pflegehilfsmittel.verbrauch_monat); const z = hilfsmittelZuzahlung(t);
    return { head: [T(l, 'Eigenanteil gesamt', 'Your share in total'), eur(ue + z, l)], rows: [[T(l, 'Verbrauch über der Pauschale', 'Consumables above the allowance'), eur(ue, l)], [T(l, 'Zuzahlung technisches Hilfsmittel', 'Co-payment for the technical aid'), eur(z, l)]] as Rows }; },
});
