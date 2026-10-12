/**
 * Eigenanteil im Pflegeheim nach Bundesland und Aufenthaltsdauer: Durchschnittswerte des vdek
 * (EEE inkl. Ausbildungskosten, Unterkunft und Verpflegung, Investitionskosten) und Leistungszuschlag
 * der Pflegekasse auf den EEE nach § 43c SGB XI (15, 30, 50, 75 %).
 */
import { P, proGrad, r2, type Grad } from './params';

export type Land = keyof typeof P.heim.laender;
export const LAENDER = Object.keys(P.heim.laender) as Land[];
export interface Kosten { eee: number; ausbildung: number; uv: number; invest: number; mit15: number }

export const LAND_NAME: Record<Land, { de: string; en: string }> = {
  BW: { de: 'Baden-Württemberg', en: 'Baden-Württemberg' }, BY: { de: 'Bayern', en: 'Bavaria' }, BE: { de: 'Berlin', en: 'Berlin' },
  BB: { de: 'Brandenburg', en: 'Brandenburg' }, HB: { de: 'Bremen', en: 'Bremen' }, HH: { de: 'Hamburg', en: 'Hamburg' },
  HE: { de: 'Hessen', en: 'Hesse' }, MV: { de: 'Mecklenburg-Vorpommern', en: 'Mecklenburg-Western Pomerania' }, NI: { de: 'Niedersachsen', en: 'Lower Saxony' },
  NW: { de: 'Nordrhein-Westfalen', en: 'North Rhine-Westphalia' }, RP: { de: 'Rheinland-Pfalz', en: 'Rhineland-Palatinate' }, SL: { de: 'Saarland', en: 'Saarland' },
  SN: { de: 'Sachsen', en: 'Saxony' }, ST: { de: 'Sachsen-Anhalt', en: 'Saxony-Anhalt' }, SH: { de: 'Schleswig-Holstein', en: 'Schleswig-Holstein' }, TH: { de: 'Thüringen', en: 'Thuringia' },
};

export const kosten = (land: Land | 'BUND', stand: 'aktuell' | 'vorher' = 'aktuell'): Kosten => {
  if (land === 'BUND') return (stand === 'aktuell' ? P.heim.bund : P.heim.bund_vorher) as Kosten;
  return (stand === 'aktuell' ? P.heim.laender : P.heim.laender_vorher)[land] as Kosten;
};

/** Zuschlagssatz im n-ten Aufenthaltsmonat (1 = erster Monat; angebrochene Monate zählen, § 43c Satz 5). */
export function zuschlagSatz(monat: number, grad: Grad = 3): number {
  if (grad < 2) return 0;
  const ab = P.zuschlag.ab_monat, st = P.zuschlag.stufen;
  let s = st[0];
  for (let i = 0; i < ab.length; i++) if (monat >= ab[i]) s = st[i];
  return s;
}
export const zuschlagJahr = (monat: number) => (monat >= 37 ? 4 : monat >= 25 ? 3 : monat >= 13 ? 2 : 1);

export interface HeimMonat { monat: number; satz: number; eee: number; zuschlag: number; eeeNachZuschlag: number; uv: number; invest: number; eigenanteil: number; kasseLeistung: number }

/** Eigenanteil in einem Aufenthaltsmonat. Pflegegrad 1: kein Leistungszuschlag; der Heimpreis für Grad 1 ist hausindividuell und nicht in den vdek-Werten. */
export function heimMonat(k: Kosten, monat: number, grad: Grad = 3, eeeOverride?: number): HeimMonat {
  const eee = eeeOverride ?? k.eee;
  const satz = zuschlagSatz(monat, grad);
  const z = r2(eee * satz);
  return { monat, satz, eee, zuschlag: z, eeeNachZuschlag: r2(eee - z), uv: k.uv, invest: k.invest, eigenanteil: r2(eee - z + k.uv + k.invest), kasseLeistung: proGrad(P.vollstationaer, grad) };
}

/** Summe der Eigenanteile über einen Zeitraum, ab einem bestimmten Aufenthaltsmonat. */
export function heimVerlauf(k: Kosten, startMonat: number, dauerMonate: number, grad: Grad = 3) {
  const monate: HeimMonat[] = [];
  for (let i = 0; i < Math.max(0, Math.min(600, Math.round(dauerMonate))); i++) monate.push(heimMonat(k, Math.max(1, Math.round(startMonat)) + i, grad));
  const summe = r2(monate.reduce((s, m) => s + m.eigenanteil, 0));
  const jahre = [1, 2, 3, 4].map((j) => monate.filter((m) => zuschlagJahr(m.monat) === j).reduce((s, m) => s + m.eigenanteil, 0));
  return { monate, summe, jahre: jahre.map(r2) };
}

/** Eigenanteil im 1. bis 4. Aufenthaltsjahr, für Tabellen. */
export const heimStufen = (k: Kosten) => [1, 13, 25, 37].map((m) => heimMonat(k, m));

export interface Reichweite { luecke: number; monateBisSchonvermoegen: number | null; abMonat: number | null }

/**
 * Wie lange reicht das Vermögen? Monatliche Lücke = Eigenanteil minus eigenes Einkommen (ohne Barbetrag
 * und Nebenkosten); das Vermögen über dem Schonbetrag (§ 1 DV zu § 90 SGB XII) deckt sie, bis es aufgebraucht
 * ist. Danach kommt Hilfe zur Pflege (§§ 61 ff. SGB XII) in Betracht. Der Zuschlag steigt mit der Dauer.
 */
export function reichweite(k: Kosten, einkommen: number, vermoegen: number, startMonat = 1, grad: Grad = 3, schonbetrag = P.sozialhilfe.schonvermoegen): Reichweite & { verlauf: Array<{ monat: number; luecke: number; vermoegen: number }> } {
  let v = Math.max(0, vermoegen);
  const verlauf: Array<{ monat: number; luecke: number; vermoegen: number }> = [];
  const l0 = Math.max(0, heimMonat(k, startMonat, grad).eigenanteil - einkommen);
  if (v <= schonbetrag) return { luecke: r2(l0), monateBisSchonvermoegen: l0 > 0 ? 0 : null, abMonat: l0 > 0 ? startMonat : null, verlauf };
  for (let i = 0; i < 600; i++) {
    const m = startMonat + i;
    const l = Math.max(0, heimMonat(k, m, grad).eigenanteil - einkommen);
    v -= l;
    verlauf.push({ monat: m, luecke: r2(l), vermoegen: r2(Math.max(v, 0)) });
    if (v <= schonbetrag) return { luecke: r2(l0), monateBisSchonvermoegen: i + 1, abMonat: m + 1, verlauf };
    if (l === 0 && i > 40) break;
  }
  return { luecke: r2(l0), monateBisSchonvermoegen: null, abMonat: null, verlauf };
}

/** Länder nach Eigenanteil im ersten Jahr sortiert (teuerstes zuerst). */
export const rangliste = () => [...LAENDER].sort((a, b) => kosten(b).mit15 - kosten(a).mit15);
