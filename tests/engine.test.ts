/** Motor gegen amtliche Werte: vdek-Tabellen (alle Länder, alle Stufen, beide Stichtage), Anlage 2 zu § 15 SGB XI, §§ 37 bis 45f SGB XI. */
import { describe, expect, it } from 'vitest';
import jul from './fixtures/vdek-2026-07.json';
import jan from './fixtures/vdek-2026-01.json';
import { P } from '../src/lib/engine/params';
import { nba, bereich, gradAusPunkten, modul5Punkte, MODUL5_LEER, leereEingabe, modul4Summe } from '../src/lib/engine/nba';
import { kombination, monat, jahr, jahresbetrag, pflegegeldWaehrendErsatz, entlastung, wohnumfeld, hilfsmittelZuzahlung, pflegegeldTeilmonat } from '../src/lib/engine/leistungen';
import { kosten, heimMonat, heimVerlauf, LAENDER, reichweite, zuschlagSatz } from '../src/lib/engine/heim';
import { rentenpunkte, pauschbetrag } from '../src/lib/engine/angehoerige';

describe('vdek: Eigenanteil je Land und Aufenthaltsjahr (±2 € Rundung der Durchschnitte)', () => {
  for (const [fx, stand] of [[jul, 'aktuell'], [jan, 'vorher']] as const) {
    for (const [land, w] of Object.entries(fx.werte)) {
      it(`${fx.stand} ${land}`, () => {
        const k = kosten(land as never, stand);
        expect(Math.abs(k.eee + k.uv + k.invest - w.ohne)).toBeLessThanOrEqual(1);
        expect(Math.abs(heimMonat(k, 1).eigenanteil - w['15'])).toBeLessThanOrEqual(2);
        expect(Math.abs(heimMonat(k, 13).eigenanteil - w['30'])).toBeLessThanOrEqual(2);
        expect(Math.abs(heimMonat(k, 25).eigenanteil - w['50'])).toBeLessThanOrEqual(2);
        expect(Math.abs(heimMonat(k, 37).eigenanteil - w['75'])).toBeLessThanOrEqual(2);
        expect(Math.abs(k.mit15 - w['15'])).toBe(0);
      });
    }
  }
  it('16 Länder', () => expect(LAENDER.length).toBe(16));
  it('Zuschlag: Monat 12 noch 15 %, Monat 13 schon 30 %, ab Monat 37 75 %, Pflegegrad 1 ohne', () => {
    expect(zuschlagSatz(12)).toBe(0.15); expect(zuschlagSatz(13)).toBe(0.3); expect(zuschlagSatz(24)).toBe(0.3); expect(zuschlagSatz(25)).toBe(0.5); expect(zuschlagSatz(36)).toBe(0.5); expect(zuschlagSatz(37)).toBe(0.75); expect(zuschlagSatz(1, 1)).toBe(0);
  });
  it('Verlauf über 48 Monate = Summe der vier Stufen × 12', () => {
    const k = kosten('BUND'); const v = heimVerlauf(k, 1, 48);
    const s = [1, 13, 25, 37].reduce((t, m) => t + heimMonat(k, m).eigenanteil * 12, 0);
    expect(Math.abs(v.summe - s)).toBeLessThan(0.05);
  });
  it('Reichweite: 60.000 € Vermögen, 1.800 € Rente in NRW', () => {
    const r = reichweite(kosten('NW'), 1800, 60000);
    expect(r.monateBisSchonvermoegen).toBeGreaterThan(20); expect(r.monateBisSchonvermoegen).toBeLessThan(40);
    expect(reichweite(kosten('NW'), 5000, 60000).monateBisSchonvermoegen).toBeNull();
  });
});

describe('NBA, Anlage 2 zu § 15 SGB XI', () => {
  it('Punktbereiche an jeder Grenze', () => {
    expect([1, 2, 3, 4, 5, 6, 9, 10].map((s) => bereich('m1', s))).toEqual([0, 1, 1, 2, 2, 3, 3, 4]);
    expect([1, 2, 5, 6, 10, 11, 16, 17].map((s) => bereich('m2', s))).toEqual([0, 1, 1, 2, 2, 3, 3, 4]);
    expect([0, 1, 2, 3, 4, 5, 6, 7].map((s) => bereich('m3', s))).toEqual([0, 1, 1, 2, 2, 3, 3, 4]);
    expect([2, 3, 7, 8, 18, 19, 36, 37].map((s) => bereich('m4', s))).toEqual([0, 1, 1, 2, 2, 3, 3, 4]);
    expect([0, 1, 2, 3, 4, 5, 6, 15].map((s) => bereich('m5', s))).toEqual([0, 1, 2, 2, 3, 3, 4, 4]);
    expect([0, 1, 3, 4, 6, 7, 11, 12].map((s) => bereich('m6', s))).toEqual([0, 1, 1, 2, 2, 3, 3, 4]);
  });
  it('Höchstwerte der Module laut Anlage 2 (15, 33, 65, 54, 15, 18)', () => {
    const e = leereEingabe();
    e.m1 = [3, 3, 3, 3, 3]; e.m2 = Array(11).fill(3); e.m3 = Array(13).fill(5); e.m4 = Array(12).fill(3); e.inkontinent = true; e.sonde = 'teilweise'; e.m6 = Array(6).fill(3);
    e.m5 = { ...MODUL5_LEER, aTag: 9, bTag: 3, c512Taeglich: true, k516: 3 };
    const r = nba(e);
    expect(r.summen).toEqual({ m1: 15, m2: 33, m3: 65, m4: 54, m5: 15, m6: 18 });
    expect(r.gesamt).toBe(100); expect(r.grad).toBe(5);
  });
  it('Gradgrenzen 12,5 / 27 / 47,5 / 70 / 90', () => {
    expect([12.4, 12.5, 26.9, 27, 47.4, 47.5, 69.9, 70, 89.9, 90].map((p) => gradAusPunkten(p))).toEqual([0, 1, 1, 2, 2, 3, 3, 4, 4, 5]);
    expect([12.5, 27, 47.5, 70].map((p) => gradAusPunkten(p, true))).toEqual([2, 3, 4, 5]);
  });
  it('Modul 4: 4.8 dreifach, 4.9/4.10 doppelt, 4.11/4.12 nur bei Inkontinenz, Sonde teilweise 6 > vollständig 3', () => {
    const base = { m4: [0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3], inkontinent: false, sonde: 'entfaellt' as const };
    expect(modul4Summe(base)).toBe(9 + 6 + 6);
    expect(modul4Summe({ ...base, inkontinent: true })).toBe(27);
    expect(modul4Summe({ ...base, sonde: 'teilweise' })).toBe(27);
    expect(modul4Summe({ ...base, sonde: 'vollstaendig' })).toBe(24);
    expect(modul4Summe({ ...base, kindBis18Monate: true, kind4K: true })).toBe(20);
  });
  it('Modul 5: Beispiel der Anlage 1 (3 × Medikation + 1 × Blutzucker täglich = 4 pro Tag → 2 Punkte)', () => {
    expect(modul5Punkte({ ...MODUL5_LEER, aTag: 4 }).pa).toBe(2);
    expect(modul5Punkte({ ...MODUL5_LEER, aTag: 3 }).pa).toBe(1);
    expect(modul5Punkte({ ...MODUL5_LEER, aWoche: 6 }).pa).toBe(0);
    expect(modul5Punkte({ ...MODUL5_LEER, bWoche: 1 }).pb).toBe(1);
    expect(modul5Punkte({ ...MODUL5_LEER, bTag: 3 }).pb).toBe(3);
    expect(modul5Punkte({ ...MODUL5_LEER, c513Monat: 4 }).pc).toBe(0);
    expect(modul5Punkte({ ...MODUL5_LEER, c513Woche: 1 }).pc).toBe(1);
    expect(modul5Punkte({ ...MODUL5_LEER, c515Woche: 1 }).pc).toBe(2);
    expect(modul5Punkte({ ...MODUL5_LEER, c512Taeglich: true }).pc).toBe(6);
  });
  it('typischer Fall Demenz zu Hause: Modul 3 schlägt Modul 2', () => {
    const e = leereEingabe();
    e.m1 = [0, 0, 1, 1, 2]; e.m2 = [1, 2, 2, 2, 2, 2, 1, 2, 0, 0, 1]; e.m3 = [3, 3, 0, 0, 0, 1, 0, 3, 0, 3, 1, 0, 1]; e.m4 = [1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 0]; e.m6 = [2, 1, 2, 3, 1, 2];
    e.m5 = { ...MODUL5_LEER, aTag: 2, c513Monat: 1, k516: 1 };
    const r = nba(e);
    expect(r.summen.m3).toBe(15); expect(r.gesamt).toBe(61.25); expect(r.m23aus).toBe('m3'); expect(r.gewichtet.m23).toBe(15);
    expect(r.grad).toBe(3);
  });
});

describe('Leistungen 2026, §§ 36 bis 45f SGB XI', () => {
  it('Pflegegeld und Sachleistung je Grad', () => {
    expect([2, 3, 4, 5].map((g) => P.pflegegeld[String(g) as '2'])).toEqual([347, 599, 800, 990]);
    expect([2, 3, 4, 5].map((g) => P.sachleistung[String(g) as '2'])).toEqual([796, 1497, 1859, 2299]);
  });
  it('Kombination: 40 % Sachleistung → 60 % Pflegegeld (Grad 3: 598,80 € Dienst → 359,40 €)', () => {
    const k = kombination(3, 598.8);
    expect(k.anteil).toBeCloseTo(0.4, 6); expect(k.pflegegeld).toBe(359.4);
    expect(kombination(3, 2000).pflegegeld).toBe(0); expect(kombination(3, 2000).ueberMax).toBe(503);
  });
  it('Umwandlung höchstens 40 % des Sachleistungsbetrags', () => {
    const k = kombination(2, 0, 500);
    expect(k.umwandlung).toBe(318.4); expect(k.pflegegeld).toBe(208.2);
  });
  it('Monat: Grad 1 nur Entlastungsbetrag und Hilfsmittel, kein Pflegegeld', () => {
    const m = monat({ grad: 1, versorgung: 'angehoerige' });
    expect(m.pflegegeld).toBe(0); expect(m.gesamt).toBe(131 + 42);
    const j = jahr({ grad: 3, versorgung: 'angehoerige' });
    expect(j.jahrAufsKonto).toBe(599 * 12); expect(j.jahresbetrag).toBe(3539);
  });
  it('Jahresbetrag: Kurzzeitpflege und Verhinderungspflege aus einem Topf, Angehörige bis 2 × Pflegegeld', () => {
    const r = jahresbetrag({ grad: 3, kurzzeitEuro: 2000, verhinderungFremdEuro: 1000, verhinderungAngehoerigEuro: 2000, angehoerigAufwendungenEuro: 0 });
    expect(r.kurzzeit).toBe(2000); expect(r.fremd).toBe(1000); expect(r.angehoerig).toBe(539); expect(r.rest).toBe(0);
    const a = jahresbetrag({ grad: 2, kurzzeitEuro: 0, verhinderungFremdEuro: 0, verhinderungAngehoerigEuro: 1500, angehoerigAufwendungenEuro: 200 });
    expect(a.capAngehoerig).toBe(694); expect(a.angehoerig).toBe(894);
    expect(jahresbetrag({ grad: 1, kurzzeitEuro: 500, verhinderungFremdEuro: 0, verhinderungAngehoerigEuro: 0, angehoerigAufwendungenEuro: 0 }).erstattet).toBe(0);
  });
  it('Halbes Pflegegeld während Ersatzpflege: höchstens 56 Tage', () => {
    expect(pflegegeldWaehrendErsatz(3, 100).tage).toBe(56);
    expect(pflegegeldWaehrendErsatz(3, 30).summe).toBe(299.5);
    expect(pflegegeldTeilmonat(4, 15)).toBe(400);
  });
  it('Entlastungsbetrag, Wohnumfeld, Zuzahlung', () => {
    expect(entlastung(12, 600).uebertrag).toBe(972);
    expect(wohnumfeld(20000, 4).zuschuss).toBe(16720); expect(wohnumfeld(20000, 5).zuschuss).toBe(16720); expect(wohnumfeld(3000).selbst).toBe(0);
    expect(hilfsmittelZuzahlung(100)).toBe(10); expect(hilfsmittelZuzahlung(900)).toBe(25);
  });
});

describe('Angehörige: Rente und Steuer', () => {
  it('Pflegegrad 5, nur Pflegegeld: 100 % der Bezugsgröße → 0,9137 Entgeltpunkte pro Jahr', () => {
    const r = rentenpunkte(5, 'geld');
    expect(r.einnahmeMonat).toBe(3955); expect(r.punkteJahr).toBeCloseTo(47460 / 51944, 4);
    expect(r.renteProJahr).toBe(38.85);
  });
  it('Pflegegrad 2, Sachleistung: 18,9 %', () => expect(rentenpunkte(2, 'sach').einnahmeMonat).toBe(747.5));
  it('Pflege-Pauschbetrag', () => { expect(pauschbetrag(3).voll).toBe(1100); expect(pauschbetrag(4, 2).jePerson).toBe(900); expect(pauschbetrag(2, 1, true).voll).toBe(1800); });
});

import { barbetrag, einkommensgrenze } from '../src/lib/engine/sozialhilfe';
describe('Sozialhilfe 2026', () => {
  it('Barbetrag 27 % von 563 € = 152,01 €', () => expect(barbetrag()).toBe(152.01));
  it('Einkommensgrenze § 85: 1.126 € + Miete 600 € + Zuschlag 395 € für den Ehepartner', () => {
    const e = einkommensgrenze(600, 1);
    expect(e.grund).toBe(1126); expect(e.zuschlag).toBe(395); expect(e.grenze).toBe(2121);
  });
});
