/** Kennzahlen der Prüfung gegen die veröffentlichten Tabellen, aus den Testdaten gelesen (nie von Hand in Texte schreiben). */
import jul from '../../tests/fixtures/vdek-2026-07.json';
import jan from '../../tests/fixtures/vdek-2026-01.json';
export const PRUEFUNG = {
  vdekWerte: (Object.keys(jul.werte).length + Object.keys(jan.werte).length) * 5,
  vdekRegionen: Object.keys(jul.werte).length,
  kriterien: 64,
};
