import type { Locale } from './routes';
const de = {
  updatedOn: 'Aktualisiert am', editorialPolicy: 'Redaktionsgrundsätze', contactLabel: 'Kontakt', reviewedBy: 'Geprüft von',
  skipToContent: 'Zum Inhalt', mainNav: 'Hauptnavigation', breadcrumbLabel: 'Brotkrümelnavigation', breadcrumbHome: 'Start', menuOpen: 'Menü öffnen',
  faqTitle: 'Fragen aus der Praxis', relatedCalculators: 'Weiter mit', sourcesTitle: 'Gesetze und Daten', writtenBy: 'Verfasst von',
  asOf: 'Beträge', lastUpdated: 'nachgelesen am', footerValidated: 'vdek-Tabellen aller 16 Länder und die Bewertungssystematik des § 15 SGB XI im Test nachgerechnet', footerBrowser: 'Alles wird in Ihrem Browser gerechnet · nichts wird gespeichert oder gesendet · kostenlos',
  footerDisclaimer: 'Pflegegrad Rechnen ist ein unabhängiges Angebot von Radif Partners. Wir gehören zu keiner Pflegekasse, keinem Medizinischen Dienst, keinem Heimträger und keiner Pflegeberatung und vermitteln nichts. Ergebnisse sind Schätzungen nach SGB XI und den Durchschnittswerten des vdek; über Ihren Anspruch entscheidet die Pflegekasse.', footerPopular: '', notFound: 'Unter dieser Adresse gibt es keine Seite.',
  readMore: 'Weiterlesen',
};
const en: typeof de = {
  updatedOn: 'Updated on', editorialPolicy: 'Editorial policy', contactLabel: 'Contact', reviewedBy: 'Checked by',
  skipToContent: 'Skip to content', mainNav: 'Main navigation', breadcrumbLabel: 'Breadcrumb', breadcrumbHome: 'Home', menuOpen: 'Open menu',
  faqTitle: 'Questions families ask', relatedCalculators: 'Continue with', sourcesTitle: 'Laws and data', writtenBy: 'Written by',
  asOf: 'Amounts', lastUpdated: 'read on', footerValidated: 'vdek tables for all 16 states and the Section 15 SGB XI scoring system recalculated in tests', footerBrowser: 'Everything is calculated in your browser · nothing is stored or sent · free',
  footerDisclaimer: 'Pflegegrad Rechnen is an independent service by Radif Partners. We are not part of any Pflegekasse, the Medical Service, any care home operator or care advice service, and we refer no one anywhere. Results are estimates only, based on Book XI of the Social Code and vdek averages; they do not replace the decision of your Pflegekasse or personal advice.', footerPopular: '', notFound: 'There is no page at this address.',
  readMore: 'Read more',
};
export function t(lang: Locale) { return lang === 'en' ? en : de; }
