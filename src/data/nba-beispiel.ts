/** Startbeispiel des Pflegegrad-Rechners: Frau mit beginnender Demenz zu Hause (vom Motor als Pflegegrad 3 gerechnet, Test in engine.test.ts). */
import { MODUL5_LEER, type NbaEingabe } from '../lib/engine/nba';
export const BEISPIEL: NbaEingabe = {
  m1: [0, 0, 1, 1, 2], m2: [1, 2, 2, 2, 2, 2, 1, 2, 0, 0, 1], m3: [3, 3, 0, 0, 0, 1, 0, 3, 0, 3, 1, 0, 1],
  m4: [1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 0, 0], inkontinent: false, sonde: 'entfaellt',
  m5: { ...MODUL5_LEER, aTag: 2, c513Monat: 1, k516: 1 }, m6: [2, 1, 2, 3, 1, 2],
};
