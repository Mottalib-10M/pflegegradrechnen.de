import { einkommensgrenze } from '../engine/sozialhilfe';
import { T, eur, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Einkommensgrenze für Hilfe zur Pflege zu Hause', 'Income limit for social assistance for care at home'),
  cta: T(l, 'Heimkosten und Reichweite rechnen', 'Work out care home costs and savings'),
  inputs: [{ id: 'm', label: T(l, 'Warmmiete (angemessen)', 'Rent incl. heating (reasonable)'), def: 650, unit: '€', max: 5000 }, { id: 'p', label: T(l, 'Ehepartner und Unterhaltene', 'Spouse and dependants'), def: 1, max: 6 }, { id: 'e', label: T(l, 'Einkommen netto zusammen', 'Combined net income'), def: 2400, unit: '€', max: 50000 }],
  run: ({ m, p, e }: Record<string, number>) => { const g = einkommensgrenze(m, p);
    return { head: [T(l, 'Einkommen über der Grenze', 'Income above the limit'), eur(Math.max(0, e - g.grenze), l)], rows: [[T(l, 'Einkommensgrenze', 'Income limit'), eur(g.grenze, l)], [T(l, 'Grundbetrag', 'Basic amount'), eur(g.grund, l)], [T(l, 'Familienzuschlag je Person', 'Family supplement per person'), eur(g.zuschlag, l)]] as Rows, note: T(l, 'Über der Grenze ist ein Einsatz in angemessenem Umfang zumutbar (§ 87 SGB XII); darunter nur in Ausnahmen.', 'Above the limit a reasonable contribution can be expected (section 87 SGB XII); below it only in exceptions.') }; },
});
