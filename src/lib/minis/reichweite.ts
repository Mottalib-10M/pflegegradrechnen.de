import { kosten, reichweite, LAENDER } from '../engine/heim';
import { T, eur, landOpt, type L, type Rows } from './_kit';
export default (l: L) => ({
  title: T(l, 'Wie lange reicht das Ersparte im Heim?', 'How long do savings last in a care home?'),
  cta: T(l, 'Pflegeheim-Rechner mit Aufenthaltsmonat', 'Care home calculator by month of stay'),
  inputs: [{ id: 'l', label: T(l, 'Bundesland', 'State'), def: 9, options: landOpt(l) }, { id: 'r', label: T(l, 'Rente netto', 'Net pension'), def: 1500, unit: '€', max: 50000 }, { id: 'v', label: T(l, 'Erspartes', 'Savings'), def: 50000, unit: '€', max: 10000000 }],
  run: ({ l: i, r, v }: Record<string, number>) => { const x = reichweite(kosten(LAENDER[i] ?? 'NW'), r, v);
    return { head: [T(l, 'Vermögen reicht', 'Savings last'), x.monateBisSchonvermoegen === null ? T(l, 'dauerhaft', 'indefinitely') : T(l, `${x.monateBisSchonvermoegen} Monate`, `${x.monateBisSchonvermoegen} months`)], rows: [[T(l, 'Lücke im 1. Monat', 'Gap in month 1'), eur(x.luecke, l)], [T(l, 'Schonbetrag, der bleibt', 'Protected amount kept'), eur(10000, l)]] as Rows, note: T(l, 'Danach kann das Sozialamt Hilfe zur Pflege zahlen.', 'After that the social welfare office can pay Hilfe zur Pflege.') }; },
});
