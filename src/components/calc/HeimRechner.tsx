/** Eigenanteil im Pflegeheim nach Land und Aufenthaltsmonat (vdek 1.7.2026, § 43c SGB XI), mit Reichweite des Vermögens bis zum Schonbetrag (§ 90 SGB XII). */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import { kosten, heimMonat, heimVerlauf, reichweite, LAENDER, LAND_NAME, type Land } from '../../lib/engine/heim';
import { P, type Grad } from '../../lib/engine/params';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import { Zeilen, Aktionen, Kopf, Rechenweg, Hinweis, kasten, rahmen, raster, tx, fm, type L } from './kit';
import { gradOpt } from './opts';

export default function HeimRechner({ lang = 'de', methodHref, preset = {} }: { lang?: L; methodHref?: string; preset?: { land?: string } }) {
  const f = fm(lang);
  const [land, setLand] = useState(preset.land ?? 'BUND');
  const [g, setG] = useState('3');
  const [mon, setMon] = useState(0);
  const [eee, setEee] = useState(0);
  const [rente, setRente] = useState(1600);
  const [verm, setVerm] = useState(40000);
  useEffect(() => {
    const u = readParams(window.location.search); if (![...u.keys()].length) return;
    if (!preset.land) setLand(str(u, 'l', land)); setG(str(u, 'g', '3')); setMon(num(u, 'm', 0)); setEee(num(u, 'e', 0)); setRente(num(u, 'r', 1600)); setVerm(num(u, 'v', 40000));
  }, []);
  useEffect(() => { updateURL({ ...(preset.land ? {} : { l: land }), g, m: mon, e: eee, r: rente, v: verm }); }, [land, g, mon, eee, rente, verm]);
  const grad = Number(g) as Grad;
  const basis = kosten(land as Land | 'BUND');
  const k = useMemo(() => (eee > 0 ? { ...basis, eee } : basis), [basis, eee]);
  const monat = Math.max(1, Math.round(mon) + 1);
  const jetzt = heimMonat(k, monat, grad);
  const drei = heimVerlauf(k, monat, 36, grad);
  const rw = reichweite(k, rente, verm, monat, grad);
  const name = land === 'BUND' ? tx(lang, 'Bundesdurchschnitt', 'national average') : LAND_NAME[land as Land][lang];
  const pg1 = grad < 2;
  const steps = [
    tx(lang, `vdek-Durchschnitt ${name} am 1. Juli 2026: EEE ${f.eur(basis.eee)} (davon Ausbildung ${f.eur(basis.ausbildung)}), Unterkunft und Verpflegung ${f.eur(basis.uv)}, Investitionskosten ${f.eur(basis.invest)}.`, `vdek average for ${name} on 1 July 2026: EEE ${f.eur(basis.eee)} (incl. training levy ${f.eur(basis.ausbildung)}), board and lodging ${f.eur(basis.uv)}, investment costs ${f.eur(basis.invest)}.`),
    pg1 ? tx(lang, `Pflegegrad 1: kein Leistungszuschlag; die Kasse zahlt nur ${f.eur(P.vollstationaer['1'])} Zuschuss (§ 43 Abs. 3). Den Pflegesatz für Grad 1 legt jedes Heim selbst fest; er steckt nicht im EEE.`, `Care grade 1: no supplement; the fund only pays a ${f.eur(P.vollstationaer['1'])} grant (section 43(3)). Each home sets its own grade 1 care rate, which is not part of the EEE.`)
      : tx(lang, `Aufenthaltsmonat ${monat}: Leistungszuschlag ${f.pct(jetzt.satz, 0)} auf den EEE = ${f.eur2(jetzt.zuschlag)} (§ 43c).`, `Month ${monat} in the home: supplement ${f.pct(jetzt.satz, 0)} of the EEE = ${f.eur2(jetzt.zuschlag)} (section 43c).`),
    tx(lang, `Eigenanteil = ${f.eur2(jetzt.eeeNachZuschlag)} + ${f.eur(k.uv)} + ${f.eur(k.invest)} = ${f.eur2(jetzt.eigenanteil)}.`, `Co-payment = ${f.eur2(jetzt.eeeNachZuschlag)} + ${f.eur(k.uv)} + ${f.eur(k.invest)} = ${f.eur2(jetzt.eigenanteil)}.`),
  ];
  if (land === 'BY') steps.push(tx(lang, `Bayern zahlt ab Pflegegrad 2 Landespflegegeld von ${f.eur(P.landespflegegeld_by.euro_jahr)} je Pflegegeldjahr, auch im Heim; im Rechner nicht abgezogen.`, `Bavaria pays a state care allowance of ${f.eur(P.landespflegegeld_by.euro_jahr)} per year from grade 2, also in a care home; not deducted here.`));
  const stufen = [1, 13, 25, 37].map((m) => heimMonat(k, m, grad));
  const landOpt = [{ value: 'BUND', label: tx(lang, 'Bundesdurchschnitt', 'National average') }, ...LAENDER.map((l) => ({ value: l, label: LAND_NAME[l][lang] }))];
  return (
    <div className={rahmen} data-chrome>
      <div className="srg h-1.5" aria-hidden="true" />
      <div className={raster}>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {preset.land ? <NumberField id="hr-m" label={tx(lang, 'Schon im Heim seit (Monaten)', 'Already in the home (months)')} value={mon} onChange={setMon} max={600} lang={lang} help={tx(lang, '0 = Einzug jetzt', '0 = moving in now')} />
              : <SelectField id="hr-l" label={tx(lang, 'Bundesland des Heims', 'State where the home is')} value={land} onChange={setLand} options={landOpt} />}
            <SelectField id="hr-g" label={tx(lang, 'Pflegegrad', 'Care grade')} value={g} onChange={setG} options={gradOpt(lang)} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {!preset.land && <NumberField id="hr-m" label={tx(lang, 'Schon im Heim seit (Monaten)', 'Already in the home (months)')} value={mon} onChange={setMon} max={600} lang={lang} help={tx(lang, '0 = Einzug jetzt', '0 = moving in now')} />}
            <NumberField id="hr-e" label={tx(lang, 'EEE laut Heimvertrag (optional)', 'EEE from the home contract (optional)')} value={eee} onChange={setEee} unit="€" max={10000} lang={lang} help={tx(lang, 'leer = Landesschnitt', 'empty = state average')} />
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            <NumberField id="hr-r" label={tx(lang, 'Rente und Einkommen netto', 'Net pension and income')} value={rente} onChange={setRente} unit="€" max={50000} lang={lang} />
            <NumberField id="hr-v" label={tx(lang, 'Erspartes', 'Savings')} value={verm} onChange={setVerm} unit="€" max={10000000} lang={lang} />
          </div>
        </form>
        <div aria-live="polite" data-resultat className={kasten}>
          <Kopf label={tx(lang, `Eigenanteil pro Monat, ${name}`, `Monthly co-payment, ${name}`)} wert={f.eur(jetzt.eigenanteil)} unter={pg1 ? tx(lang, 'ohne den hauseigenen Pflegesatz für Grad 1', 'excluding the home’s own grade 1 care rate') : tx(lang, `im ${monat}. Aufenthaltsmonat, Zuschlag ${f.pct(jetzt.satz, 0)}`, `in month ${monat}, supplement ${f.pct(jetzt.satz, 0)}`)} />
          <Zeilen rows={[
            { label: tx(lang, 'Pflege (EEE) nach Zuschlag', 'Care (EEE) after supplement'), value: f.eur(jetzt.eeeNachZuschlag) },
            { label: tx(lang, 'Unterkunft und Verpflegung', 'Board and lodging'), value: f.eur(k.uv) },
            { label: tx(lang, 'Investitionskosten', 'Investment costs'), value: f.eur(k.invest) },
            { label: tx(lang, 'Pflegekasse zahlt ans Heim', 'Fund pays the home'), value: f.eur(jetzt.kasseLeistung + jetzt.zuschlag), muted: true },
            { label: tx(lang, 'Monatliche Lücke nach Rente', 'Monthly gap after pension'), value: f.eur(rw.luecke), strong: true, sep: true },
            { label: tx(lang, 'Ersparnis reicht bis zum Schonbetrag', 'Savings last until the protected amount'), value: rw.monateBisSchonvermoegen === null ? tx(lang, 'dauerhaft', 'indefinitely') : tx(lang, `${rw.monateBisSchonvermoegen} Monate`, `${rw.monateBisSchonvermoegen} months`) },
            { label: tx(lang, 'Eigenanteile der nächsten 36 Monate', 'Co-payments over the next 36 months'), value: f.eur(drei.summe), muted: true },
          ]} />
          <Zeilen caption={tx(lang, 'Nach Aufenthaltsjahr', 'By year in the home')} rows={stufen.map((s, i) => ({ label: tx(lang, `${i + 1}. Jahr (${f.pct(s.satz, 0)})`, `Year ${i + 1} (${f.pct(s.satz, 0)})`), value: f.eur(s.eigenanteil) }))} />
          <Rechenweg lang={lang} steps={steps} />
          <Aktionen lang={lang} text={() => tx(lang, `Pflegeheim ${name}, Stand 1.7.2026: ${f.eur(jetzt.eigenanteil)} Eigenanteil im ${monat}. Monat`, `Care home ${name}, 1 July 2026 data: ${f.eur(jetzt.eigenanteil)} co-payment in month ${monat}`)} />
          <Hinweis lang={lang} methodHref={methodHref} />
        </div>
      </div>
    </div>
  );
}
