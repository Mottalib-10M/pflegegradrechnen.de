/** Pflegende Angehörige: Rentenansprüche (§ 44 SGB XI, § 166 Abs. 2 SGB VI) und Pflege-Pauschbetrag (§ 33b Abs. 6 EStG). */
import { P, proGrad, r2, type Grad } from './params';
import type { Versorgung } from './leistungen';

export type Leistungsart = 'geld' | 'kombi' | 'sach';
export const artAus = (v: Versorgung): Leistungsart => (v === 'angehoerige' ? 'geld' : v === 'kombi' ? 'kombi' : 'sach');

/**
 * Rentenpunkte pro Jahr Pflege: beitragspflichtige Einnahme = Anteil der Bezugsgröße nach Grad und
 * Leistungsart, bei Mehrfachpflege nach dem Anteil der Pflegeperson; Entgeltpunkte = Jahreswert durch
 * das vorläufige Durchschnittsentgelt 2026; Monatsrente = Punkte mal aktueller Rentenwert.
 */
export function rentenpunkte(grad: Grad, art: Leistungsart, anteilPflegeperson = 1, jahre = 1) {
  if (grad < 2) return { einnahmeMonat: 0, anteil: 0, punkteJahr: 0, renteProJahr: 0, punkte: 0, rente: 0 };
  const a = (P.rente.anteil as Record<string, Record<Leistungsart, number>>)[String(grad)][art];
  const teil = Math.max(0, Math.min(1, anteilPflegeperson));
  const einnahmeMonat = r2(P.rente.bezugsgroesse_monat * a * teil);
  const punkteJahr = (einnahmeMonat * 12) / P.rente.durchschnittsentgelt;
  const j = Math.max(0, jahre);
  return {
    einnahmeMonat, anteil: a, punkteJahr: Math.round(punkteJahr * 10000) / 10000,
    renteProJahr: r2(punkteJahr * P.rente.rentenwert),
    punkte: Math.round(punkteJahr * j * 10000) / 10000,
    rente: r2(punkteJahr * j * P.rente.rentenwert),
  };
}

/** Pflege-Pauschbetrag, geteilt durch die Zahl der Pflegepersonen (§ 33b Abs. 6 Satz 9). */
export function pauschbetrag(grad: Grad, pflegepersonen = 1, hilflos = false) {
  const voll = hilflos ? P.pauschbetrag['5'] : proGrad(P.pauschbetrag, grad);
  const n = Math.max(1, Math.round(pflegepersonen));
  return { voll, jePerson: r2(voll / n) };
}

/** Steuerersparnis aus dem Pauschbetrag bei einem angenommenen Grenzsteuersatz (Eingabe des Nutzers). */
export const ersparnis = (betrag: number, grenzsteuersatz: number) => r2(betrag * Math.max(0, Math.min(0.45, grenzsteuersatz)));
