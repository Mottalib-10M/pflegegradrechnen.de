/**
 * Neues Begutachtungsinstrument (NBA) nach § 15 SGB XI mit Anlage 1 (Einzelpunkte) und Anlage 2
 * (Bewertungssystematik). Eingaben sind die Einstufungen je Kriterium; der Motor bildet die Summen je
 * Modul, ordnet sie den Punktbereichen 0 bis 4 zu, gewichtet, nimmt für Module 2 und 3 den höheren Wert
 * und leitet aus den Gesamtpunkten den Pflegegrad ab (§ 15 Abs. 3, bei Kindern bis 18 Monate Abs. 7).
 */
import { P, type Grad } from './params';

const N = P.nba;
export type ModulId = 'm1' | 'm2' | 'm3' | 'm4' | 'm5' | 'm6';

/** Punktbereich 0 bis 4 einer Modulsumme (Anlage 2). */
export function bereich(modul: ModulId, summe: number): number {
  const g = N.bereiche[modul].grenzen;
  let b = 0;
  for (let i = 0; i < g.length; i++) if (summe >= g[i] - 1e-9) b = i + 1;
  return b;
}
/** Gewichtete Punkte eines Moduls aus seiner Summe der Einzelpunkte. */
export const gewichtet = (modul: ModulId, summe: number) => N.bereiche[modul].gewichtet[bereich(modul, summe)];

export interface Modul5 {
  /** Maßnahmen 5.1 bis 5.7 (Medikation, Injektionen, Port, Absaugen, Einreibungen, Messungen, körpernahe Hilfsmittel): Anzahl pro Tag, Woche, Monat. */
  aTag: number; aWoche: number; aMonat: number;
  /** Maßnahmen 5.8 bis 5.11 (Verbände, Stoma, Katheter/Abführen, Therapie zu Hause). */
  bTag: number; bWoche: number; bMonat: number;
  /** 5.12 zeit- und technikintensive Maßnahmen: täglich (ja/nein), sonst Häufigkeit pro Woche/Monat. */
  c512Taeglich: boolean; c512Woche: number; c512Monat: number;
  /** 5.13 Arztbesuche, 5.14 Besuche anderer Einrichtungen bis 3 Stunden, 5.15 länger als 3 Stunden. */
  c513Woche: number; c513Monat: number; c514Woche: number; c514Monat: number; c515Woche: number; c515Monat: number;
  /** 5.16 Diät und Verhaltensvorschriften: 0 entfällt/selbständig bis 3 unselbständig. */
  k516: number;
}
export const MODUL5_LEER: Modul5 = { aTag: 0, aWoche: 0, aMonat: 0, bTag: 0, bWoche: 0, bMonat: 0, c512Taeglich: false, c512Woche: 0, c512Monat: 0, c513Woche: 0, c513Monat: 0, c514Woche: 0, c514Monat: 0, c515Woche: 0, c515Monat: 0, k516: 0 };

/** Häufigkeit pro Tag: Wochenwerte durch 7, Monatswerte durch 30 (Anlage 1, Modul 5). */
export const proTag = (tag: number, woche: number, monat: number) => tag + woche / 7 + monat / 30;

export function modul5Punkte(m: Modul5) {
  const a = proTag(m.aTag, m.aWoche, m.aMonat);
  const [a1, a2, a3] = N.m5_a_tag; // ab 1, über 3, über 8 pro Tag
  const pa = a > a3 + 1e-9 ? 3 : a > a2 + 1e-9 ? 2 : a >= a1 - 1e-9 ? 1 : 0;
  const b = proTag(m.bTag, m.bWoche, m.bMonat);
  const [b1, b2, b3] = N.m5_b_tag; // ab einmal wöchentlich, ab einmal täglich, ab dreimal täglich
  const pb = b >= b3 - 1e-9 ? 3 : b >= b2 - 1e-9 ? 2 : b >= b1 - 1e-9 ? 1 : 0;
  const W = N.m5_c.woechentlich_faktor, M = N.m5_c.monatlich_faktor;
  const summeC = (m.c512Taeglich ? N.m5_c.taeglich_5_12 : m.c512Woche * W['5.12'] + m.c512Monat * M['5.12'])
    + m.c513Woche * W['5.13'] + m.c513Monat * M['5.13'] + m.c514Woche * W['5.14'] + m.c514Monat * M['5.14']
    + m.c515Woche * W['5.15'] + m.c515Monat * M['5.15'];
  const st = N.m5_c.stufen; let pc = 0;
  for (let i = 0; i < st.length; i++) if (summeC >= st[i] - 1e-9) pc = N.m5_c.punkte[i + 1];
  const k516 = Math.max(0, Math.min(3, Math.round(m.k516)));
  return { proTagA: a, proTagB: b, summeC, pa, pb, pc, k516, summe: pa + pb + pc + k516 };
}

export type Sonde = 'entfaellt' | 'teilweise' | 'vollstaendig';
export interface NbaEingabe {
  m1: number[];   // 5 Kriterien, 0 bis 3
  m2: number[];   // 11 Kriterien, 0 bis 3
  m3: number[];   // 13 Kriterien, je 0, 1, 3 oder 5
  /** 4.1 bis 4.12 als Einstufung 0 bis 3 (4.8 wird mal 3, 4.9 und 4.10 mal 2 gerechnet). */
  m4: number[];
  /** Nur bei „überwiegend“ oder „vollständig inkontinent“ oder künstlicher Ableitung zählen 4.11 und 4.12. */
  inkontinent: boolean;
  sonde: Sonde;
  m5: Modul5;
  m6: number[];   // 6 Kriterien, 0 bis 3
  /** Kind bis 18 Monate: Modul 4 wird durch 4.K ersetzt, Einstufung nach § 15 Abs. 7. */
  kindBis18Monate?: boolean;
  kind4K?: boolean;
}

const clamp03 = (x: number) => Math.max(0, Math.min(3, Math.round(x || 0)));
const sum = (xs: number[]) => xs.reduce((s, x) => s + x, 0);

export function modul4Summe(e: Pick<NbaEingabe, 'm4' | 'inkontinent' | 'sonde' | 'kindBis18Monate' | 'kind4K'>) {
  if (e.kindBis18Monate) return e.kind4K ? N.m4_kind_unter_18_monate : 0;
  const w = N.m4_gewicht as Record<string, number>;
  let s = 0;
  e.m4.slice(0, 12).forEach((x, i) => {
    const nr = `4.${i + 1}`;
    if ((nr === '4.11' || nr === '4.12') && !e.inkontinent) return;
    s += clamp03(x) * (w[nr] ?? 1);
  });
  return s + N.m4_sonde[e.sonde];
}

/** Pflegegrad aus Gesamtpunkten (§ 15 Abs. 3 Satz 4; Kinder bis 18 Monate Abs. 7). 0 = unter 12,5 Punkten. */
export function gradAusPunkten(punkte: number, kindBis18Monate = false): Grad {
  const p = punkte + 1e-9;
  if (kindBis18Monate) {
    const s = N.kinder_18_monate_stufen; // 12,5 → PG 2, 27 → 3, 47,5 → 4, 70 → 5
    if (p >= s[3]) return 5; if (p >= s[2]) return 4; if (p >= s[1]) return 3; if (p >= s[0]) return 2; return 0;
  }
  const s = N.schwellen;
  if (p >= s[4]) return 5; if (p >= s[3]) return 4; if (p >= s[2]) return 3; if (p >= s[1]) return 2; if (p >= s[0]) return 1; return 0;
}

/** Abstand zur nächsten Grenze: so viele gewichtete Punkte fehlen bis zum nächsten Grad. */
export function bisNaechsterGrad(punkte: number): { grad: Grad; fehlt: number } | null {
  const s = N.schwellen;
  for (let i = 0; i < s.length; i++) if (punkte < s[i] - 1e-9) return { grad: (i + 1) as Grad, fehlt: Math.round((s[i] - punkte) * 100) / 100 };
  return null;
}

export function nba(e: NbaEingabe) {
  const s1 = sum(e.m1.slice(0, 5).map(clamp03));
  const s2 = sum(e.m2.slice(0, 11).map(clamp03));
  const s3 = sum(e.m3.slice(0, 13).map((x) => ([0, 1, 3, 5].includes(x) ? x : 0)));
  const s4 = modul4Summe(e);
  const m5 = modul5Punkte(e.m5);
  const s6 = sum(e.m6.slice(0, 6).map(clamp03));
  const g1 = gewichtet('m1', s1), g2 = gewichtet('m2', s2), g3 = gewichtet('m3', s3);
  const g23 = Math.max(g2, g3), g4 = gewichtet('m4', s4), g5 = gewichtet('m5', m5.summe), g6 = gewichtet('m6', s6);
  const gesamt = g1 + g23 + g4 + g5 + g6;
  const grad = gradAusPunkten(gesamt, !!e.kindBis18Monate);
  return {
    summen: { m1: s1, m2: s2, m3: s3, m4: s4, m5: m5.summe, m6: s6 },
    gewichtet: { m1: g1, m2: g2, m3: g3, m23: g23, m4: g4, m5: g5, m6: g6 },
    modul5: m5,
    m23aus: g3 > g2 ? 'm3' as const : 'm2' as const,
    gesamt, grad,
    naechster: e.kindBis18Monate ? null : bisNaechsterGrad(gesamt),
  };
}

export const leereEingabe = (): NbaEingabe => ({
  m1: [0, 0, 0, 0, 0], m2: Array(11).fill(0), m3: Array(13).fill(0), m4: Array(12).fill(0),
  inkontinent: false, sonde: 'entfaellt', m5: { ...MODUL5_LEER }, m6: Array(6).fill(0),
});
