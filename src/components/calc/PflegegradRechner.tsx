/**
 * Pflegegrad-Rechner mit allen Kriterien der Anlage 1 zu § 15 SGB XI und der Bewertungssystematik der
 * Anlage 2, danach sofort die Leistungen 2026 des errechneten Grades. Startwerte: ein Beispiel (Demenz zu
 * Hause, Pflegegrad 3), damit ein Ergebnis steht, bevor man etwas ändert.
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import { nba, MODUL5_LEER, type NbaEingabe, type Sonde } from '../../lib/engine/nba';
import { jahr } from '../../lib/engine/leistungen';
import { P, type Grad } from '../../lib/engine/params';
import { readParams, updateURL } from '../../lib/url-state';
import { M1, M2, M3, M4, M6, STUFEN_SELB, STUFEN_FAEH, STUFEN_HAEUF, PUNKTE_HAEUF, type K } from '../../data/nba-kriterien';
import { Zeilen, Aktionen, Kopf, Hinweis, kasten, rahmen, raster, tx, fm, type L } from './kit';
import { janeinOpt } from './opts';
import { BEISPIEL } from '../../data/nba-beispiel';

const LEER: NbaEingabe = { m1: Array(5).fill(0), m2: Array(11).fill(0), m3: Array(13).fill(0), m4: Array(12).fill(0), inkontinent: false, sonde: 'entfaellt', m5: { ...MODUL5_LEER }, m6: Array(6).fill(0) };
const cp = (e: NbaEingabe): NbaEingabe => ({ ...e, m1: [...e.m1], m2: [...e.m2], m3: [...e.m3], m4: [...e.m4], m5: { ...e.m5 }, m6: [...e.m6] });
/** Zustand im Link: je Modul eine Ziffernfolge. */
const enc = (e: NbaEingabe) => ({ a: e.m1.join(''), b: e.m2.join(''), c: e.m3.join(''), d: e.m4.join(''), i: e.inkontinent ? 1 : 0, s: e.sonde[0], f: e.m6.join(''), m5: [e.m5.aTag, e.m5.bTag, e.m5.bWoche, e.m5.c512Taeglich ? 1 : 0, e.m5.c513Monat, e.m5.c514Monat, e.m5.c515Monat, e.m5.k516].join('_') });

function Modul({ titel, kurz, offen, children }: { titel: string; kurz: string; offen?: boolean; children: any }) {
  return (
    <details className="rounded-lg border border-navy-200 p-3" open={offen}>
      <summary className="cursor-pointer text-sm font-semibold text-navy-900">{titel} <span className="font-normal text-navy-600">· {kurz}</span></summary>
      <div className="mt-4 grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">{children}</div>
    </details>
  );
}

export default function PflegegradRechner({ lang = 'de', methodHref, leistungenHref }: { lang?: L; methodHref?: string; leistungenHref?: string }) {
  const f = fm(lang);
  const [e, setE] = useState<NbaEingabe>(() => cp(BEISPIEL));
  useEffect(() => {
    const u = readParams(window.location.search); if (!u.get('a')) return;
    const d = (k: string, n: number) => (u.get(k) ?? '').padEnd(n, '0').slice(0, n).split('').map(Number);
    const m5 = (u.get('m5') ?? '').split('_').map(Number);
    setE({ m1: d('a', 5), m2: d('b', 11), m3: d('c', 13), m4: d('d', 12), inkontinent: u.get('i') === '1', sonde: (({ e: 'entfaellt', t: 'teilweise', v: 'vollstaendig' } as Record<string, Sonde>)[u.get('s') ?? 'e'] ?? 'entfaellt'), m6: d('f', 6),
      m5: { ...MODUL5_LEER, aTag: m5[0] || 0, bTag: m5[1] || 0, bWoche: m5[2] || 0, c512Taeglich: m5[3] === 1, c513Monat: m5[4] || 0, c514Monat: m5[5] || 0, c515Monat: m5[6] || 0, k516: m5[7] || 0 } });
  }, []);
  useEffect(() => { updateURL(enc(e)); }, [e]);
  const r = useMemo(() => nba(e), [e]);
  const geld = jahr({ grad: r.grad as Grad, versorgung: 'angehoerige' });
  const setArr = (m: 'm1' | 'm2' | 'm3' | 'm4' | 'm6', i: number) => (x: string) => setE((o) => { const n = cp(o); n[m][i] = Number(x); return n; });
  const set5 = (k: keyof NbaEingabe['m5']) => (x: number) => setE((o) => { const n = cp(o); (n.m5 as unknown as Record<string, number | boolean>)[k] = x; return n; });
  const stufen = (s: { de: string[]; en: string[] }, pts = [0, 1, 2, 3]) => s[lang].map((label, i) => ({ value: String(pts[i]), label: `${label} (${pts[i]})` }));
  const feld = (m: 'm1' | 'm2' | 'm3' | 'm4' | 'm6', k: K, i: number, opts: Array<{ value: string; label: string }>) =>
    <SelectField key={k.nr} id={`pg-${k.nr}`} label={`${k.nr} ${k[lang]}`} value={String(e[m][i])} onChange={setArr(m, i)} options={opts} />;
  const gradText = r.grad === 0 ? tx(lang, 'kein Pflegegrad', 'no care grade') : tx(lang, `Pflegegrad ${r.grad}`, `Care grade ${r.grad}`);
  const G = r.gewichtet;
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(ev) => ev.preventDefault()} className="space-y-3">
          <Modul offen titel={tx(lang, 'Modul 1 · Mobilität', 'Module 1 · Mobility')} kurz={tx(lang, `${r.summen.m1} Punkte → ${f.num(G.m1, 2)} gewichtet`, `${r.summen.m1} points → ${f.num(G.m1, 2)} weighted`)}>
            {M1.map((k, i) => feld('m1', k, i, stufen(STUFEN_SELB)))}
          </Modul>
          <Modul titel={tx(lang, 'Modul 2 · Kognition und Kommunikation', 'Module 2 · Thinking and communication')} kurz={tx(lang, `${r.summen.m2} Punkte → ${f.num(G.m2, 2)}`, `${r.summen.m2} points → ${f.num(G.m2, 2)}`)}>
            {M2.map((k, i) => feld('m2', k, i, stufen(STUFEN_FAEH)))}
          </Modul>
          <Modul titel={tx(lang, 'Modul 3 · Verhalten und Psyche', 'Module 3 · Behaviour and mental health')} kurz={tx(lang, `${r.summen.m3} Punkte → ${f.num(G.m3, 2)}`, `${r.summen.m3} points → ${f.num(G.m3, 2)}`)}>
            {M3.map((k, i) => feld('m3', k, i, stufen(STUFEN_HAEUF, PUNKTE_HAEUF)))}
          </Modul>
          <Modul titel={tx(lang, 'Modul 4 · Selbstversorgung', 'Module 4 · Self-care')} kurz={tx(lang, `${r.summen.m4} Punkte → ${f.num(G.m4, 2)}`, `${r.summen.m4} points → ${f.num(G.m4, 2)}`)}>
            {M4.map((k, i) => feld('m4', k, i, stufen(STUFEN_SELB)))}
            <Toggle id="pg-ink" label={tx(lang, 'Überwiegend oder ganz inkontinent, Katheter oder Stoma?', 'Mostly or fully incontinent, catheter or stoma?')} value={e.inkontinent ? '1' : '0'} onChange={(x) => setE((o) => ({ ...cp(o), inkontinent: x === '1' }))} options={janeinOpt(lang)} />
            <SelectField id="pg-sonde" label={tx(lang, '4.13 Ernährung über Sonde oder parenteral', '4.13 Tube or intravenous feeding')} value={e.sonde} onChange={(x) => setE((o) => ({ ...cp(o), sonde: x as Sonde }))} options={[{ value: 'entfaellt', label: tx(lang, 'entfällt (0)', 'none (0)') }, { value: 'teilweise', label: tx(lang, 'teilweise, zusätzlich zum Essen (6)', 'partly, in addition to eating (6)') }, { value: 'vollstaendig', label: tx(lang, 'vollständig (3)', 'completely (3)') }]} />
          </Modul>
          <Modul titel={tx(lang, 'Modul 5 · Krankheit und Therapie', 'Module 5 · Illness and treatment')} kurz={tx(lang, `${r.summen.m5} Punkte → ${f.num(G.m5, 2)}`, `${r.summen.m5} points → ${f.num(G.m5, 2)}`)}>
            <NumberField id="pg-5a" label={tx(lang, '5.1 bis 5.7: Hilfen pro Tag (Tabletten, Spritzen, Messen, Einreiben, Strümpfe)', '5.1 to 5.7: help per day (tablets, injections, measuring, creams, stockings)')} value={e.m5.aTag} onChange={set5('aTag')} max={50} decimals={1} lang={lang} />
            <NumberField id="pg-5b" label={tx(lang, '5.8 bis 5.11: Verbände, Stoma, Katheter, Therapie pro Tag', '5.8 to 5.11: dressings, stoma, catheter, therapy per day')} value={e.m5.bTag} onChange={set5('bTag')} max={20} decimals={1} lang={lang} />
            <NumberField id="pg-5bw" label={tx(lang, 'dieselben Hilfen pro Woche (wenn nicht täglich)', 'the same help per week (if not daily)')} value={e.m5.bWoche} onChange={set5('bWoche')} max={50} lang={lang} />
            <Toggle id="pg-512" label={tx(lang, '5.12 täglich zeit- und technikintensiv (z. B. Beatmung, Dialyse zu Hause)?', '5.12 daily time- and equipment-intensive care (ventilation, home dialysis)?')} value={e.m5.c512Taeglich ? '1' : '0'} onChange={(x) => setE((o) => { const n = cp(o); n.m5.c512Taeglich = x === '1'; return n; })} options={janeinOpt(lang)} />
            <NumberField id="pg-513" label={tx(lang, '5.13 Arztbesuche mit Begleitung pro Monat', '5.13 accompanied doctor visits per month')} value={e.m5.c513Monat} onChange={set5('c513Monat')} max={60} lang={lang} />
            <NumberField id="pg-514" label={tx(lang, '5.14 Therapie- oder Klinikbesuche bis 3 Stunden pro Monat', '5.14 therapy or clinic visits up to 3 hours per month')} value={e.m5.c514Monat} onChange={set5('c514Monat')} max={60} lang={lang} />
            <NumberField id="pg-515" label={tx(lang, '5.15 Besuche über 3 Stunden pro Monat', '5.15 visits over 3 hours per month')} value={e.m5.c515Monat} onChange={set5('c515Monat')} max={60} lang={lang} />
            <SelectField id="pg-516" label={tx(lang, '5.16 Diät und ärztliche Vorschriften einhalten', '5.16 keeping to a diet and medical rules')} value={String(e.m5.k516)} onChange={(x) => set5('k516')(Number(x))} options={stufen(STUFEN_SELB)} />
          </Modul>
          <Modul titel={tx(lang, 'Modul 6 · Alltag und soziale Kontakte', 'Module 6 · Daily life and social contact')} kurz={tx(lang, `${r.summen.m6} Punkte → ${f.num(G.m6, 2)}`, `${r.summen.m6} points → ${f.num(G.m6, 2)}`)}>
            {M6.map((k, i) => feld('m6', k, i, stufen(STUFEN_SELB)))}
          </Modul>
          <div className="flex flex-wrap gap-2 text-sm">
            <button type="button" className="rounded-md border border-navy-300 bg-white px-3 py-1.5 font-medium text-navy-800 hover:bg-navy-50" onClick={() => setE(cp(LEER))}>{tx(lang, 'Alle Antworten auf „selbständig“', 'Reset all answers to “independent”')}</button>
            <button type="button" className="rounded-md border border-navy-300 bg-white px-3 py-1.5 font-medium text-navy-800 hover:bg-navy-50" onClick={() => setE(cp(BEISPIEL))}>{tx(lang, 'Beispiel laden', 'Load the example')}</button>
          </div>
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label={tx(lang, 'Geschätzter Pflegegrad', 'Estimated care grade')} wert={gradText} unter={tx(lang, `${f.num(r.gesamt, 2)} von 100 Gesamtpunkten`, `${f.num(r.gesamt, 2)} of 100 total points`)} />
          <Zeilen rows={[
            { label: tx(lang, 'Mobilität (10 %)', 'Mobility (10%)'), value: f.num(G.m1, 2) },
            { label: tx(lang, `Modul 2 oder 3, der höhere (15 %): Modul ${r.m23aus === 'm3' ? 3 : 2}`, `Module 2 or 3, the higher (15%): module ${r.m23aus === 'm3' ? 3 : 2}`), value: f.num(G.m23, 2) },
            { label: tx(lang, 'Selbstversorgung (40 %)', 'Self-care (40%)'), value: f.num(G.m4, 2) },
            { label: tx(lang, 'Krankheit und Therapie (20 %)', 'Illness and treatment (20%)'), value: f.num(G.m5, 2) },
            { label: tx(lang, 'Alltag und Kontakte (15 %)', 'Daily life and contact (15%)'), value: f.num(G.m6, 2) },
            { label: tx(lang, 'Gesamtpunkte', 'Total points'), value: f.num(r.gesamt, 2), strong: true, sep: true },
            ...(r.naechster ? [{ label: tx(lang, `bis Pflegegrad ${r.naechster.grad} fehlen`, `missing for care grade ${r.naechster.grad}`), value: f.num(r.naechster.fehlt, 2), muted: true }] : []),
          ]} />
          <Zeilen caption={tx(lang, 'Das bringt dieser Grad 2026', 'What this grade brings in 2026')} rows={r.grad >= 2 ? [
            { label: tx(lang, 'Pflegegeld im Monat', 'Care allowance per month'), value: f.eur(geld.pflegegeld), strong: true },
            { label: tx(lang, 'oder Sachleistung bis', 'or care services up to'), value: f.eur(P.sachleistung[String(r.grad) as '2']) },
            { label: tx(lang, 'Entlastungsbetrag', 'Relief amount'), value: f.eur(P.entlastungsbetrag.monat) },
            { label: tx(lang, 'Verhinderungs- und Kurzzeitpflege im Jahr', 'Respite and short-term care per year'), value: f.eur(P.jahresbetrag.euro) },
          ] : r.grad === 1 ? [
            { label: tx(lang, 'Entlastungsbetrag', 'Relief amount'), value: f.eur(P.entlastungsbetrag.monat), strong: true },
            { label: tx(lang, 'Pflegehilfsmittel zum Verbrauch', 'Consumable care aids'), value: f.eur(P.pflegehilfsmittel.verbrauch_monat) },
            { label: tx(lang, 'Umbau je Maßnahme bis', 'Home adaptation per measure up to'), value: f.eur(P.wohnumfeld.je_massnahme) },
          ] : [{ label: tx(lang, 'unter 12,5 Punkten: keine Leistungen', 'under 12.5 points: no benefits'), value: f.eur(0) }]} />
          {leistungenHref && <p className="mt-3 text-sm"><a className="font-medium text-accent-700 underline" href={leistungenHref}>{tx(lang, 'Mit diesem Grad alle Leistungen rechnen', 'Work out all benefits for this grade')}</a></p>}
          <Aktionen lang={lang} text={() => tx(lang, `Pflegegrad-Schätzung: ${gradText}, ${f.num(r.gesamt, 2)} Punkte`, `Care grade estimate: ${gradText}, ${f.num(r.gesamt, 2)} points`)} />
          <Hinweis lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
