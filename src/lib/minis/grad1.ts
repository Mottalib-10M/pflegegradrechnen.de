import { entlastung } from '../engine/leistungen';
import { P } from '../engine/params';
import { T, eur, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Pflegegrad 1: Was vom Entlastungsbetrag noch offen ist', 'Care grade 1: what is left of the relief amount'),
  cta: T(l, 'Leistungen aller Grade vergleichen', 'Compare benefits for all grades'),
  inputs: [{ id: 'm', label: T(l, 'Monate mit Pflegegrad 1 in diesem Jahr', 'Months with grade 1 this year'), def: 12, max: 12 }, { id: 'u', label: T(l, 'Schon abgerechnet', 'Already claimed'), def: 400, unit: '€', max: 5000 }],
  run: ({ m, u }: Record<string, number>) => { const e = entlastung(m, u);
    return { head: [T(l, 'Noch abrufbar', 'Still available'), eur(e.uebertrag, l)], rows: [[T(l, 'Anspruch im Jahr', 'Entitlement this year'), eur(e.anspruch, l)], [T(l, 'nutzbar bis', 'usable until'), T(l, '30. Juni des Folgejahres', '30 June next year')], [T(l, 'Pflegehilfsmittel dazu', 'Care aids on top'), `${eur(P.pflegehilfsmittel.verbrauch_monat, l)} / ${T(l, 'Monat', 'month')}`]] as Rows }; },
});
