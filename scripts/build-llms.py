#!/usr/bin/env python3
"""Erzeugt public/llms.txt aus dem Build (RECETTE §21). Aufruf: npm run build && python3 scripts/build-llms.py && npm run build"""
import glob, html, os, re
SITE = re.search(r'SITE_URL = "([^"]+)"', open('src/data/site-config.ts').read()).group(1)
rows = {'de': [], 'en': []}
for f in sorted(glob.glob('dist/*/**/index.html', recursive=True)):
    d = open(f, encoding='utf-8').read()
    if 'noindex' in d[:3000] or '/embed/' in f: continue
    path = '/' + os.path.relpath(os.path.dirname(f), 'dist').replace(os.sep, '/') + '/'
    lang = path.split('/')[1]
    if lang not in rows: continue
    t = html.unescape(re.search(r'<title>(.*?)</title>', d, re.S).group(1))
    m = re.search(r'name="description" content="(.*?)"', d, re.S)
    rows[lang].append((path, t, html.unescape(m.group(1)) if m else ''))
out = ['# Pflegegrad Rechnen', '',
       '> Unabhängige Seite von Radif Partners auf Deutsch und Englisch zur deutschen Pflegeversicherung 2026: Pflegegrad aus allen 64 Kriterien der Anlage 1 zu § 15 SGB XI geschätzt, Pflegegeld, Sachleistung, Kombinationsleistung, Entlastungsbetrag, Gemeinsamer Jahresbetrag für Verhinderungs- und Kurzzeitpflege, Eigenanteil im Pflegeheim für alle 16 Bundesländer nach den vdek-Daten vom 1. Januar und 1. Juli 2026 mit Leistungszuschlag nach § 43c, Hilfe zur Pflege, Rente und Steuer für pflegende Angehörige. Der Entwurf des Pflegeneuordnungsgesetzes (Kabinett 30.09.2026) wird beschrieben, aber nicht gerechnet.', '',
       'Alle Berechnungen laufen im Browser; keine Datenerhebung, keine Telefonnummer, keine Vermittlung. Ergebnisse sind Schätzungen; über Leistungen entscheidet die Pflegekasse.', '']
for lang, titel in (('de', '## Seiten auf Deutsch'), ('en', '## Pages in English')):
    out.append(titel); out.append('')
    for p, t, d in rows[lang]: out.append(f'- [{t}]({SITE}{p}): {d}')
    out.append('')
open('public/llms.txt', 'w', encoding='utf-8').write('\n'.join(out))
print('llms.txt:', sum(len(v) for v in rows.values()), 'Seiten')
