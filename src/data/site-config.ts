/** Configuration centrale du site (générée par new-site.py). */
export const SITE_URL = "https://pflegegradrechnen.de";
// Partie du nom en couleur dans l'en-tete ('' = aucune).
export const BRAND_ACCENT = 'Rechnen';
export const SITE_NAMES: Record<string, string> = {"de": "Pflegegrad Rechnen", "en": "Pflegegrad Rechnen"};
export const LANG_TAGS: Record<string, string> = {"de": "de-DE", "en": "en-DE"};
export const OG_LOCALES: Record<string, string> = {"de": "de_DE", "en": "en_GB"};
export const LOCALE_TAG = 'de-DE';
export const LOCALE_BY_LANG: Record<string, string> = { de: 'de-DE', en: 'en-GB' };
export const CURRENCY = 'EUR';
export const YEAR = 2026;
/** Année de création du site — signal d'ancienneté (RECETTE §8.0). */
export const SITE_FOUNDED = '2026';
export const LAST_UPDATED = '2026-10-12';
export const AUTHOR_NAME = 'Radif Partners';
export const AUTHOR_ROLE: Record<string, string> = {"de": "Herausgeber von Pflegerechnern: Pflegegrad, Leistungen der Pflegekasse, Heimkosten", "en": "Publisher of German long-term care calculators: care grade, Pflegekasse benefits, care home costs"};
export const AUTHOR_DESC: Record<string, string> = {"de": "Radif Partners rechnet die Pflegeversicherung so nach, wie Familien sie erleben: vom Gutachten des Medizinischen Dienstes mit seinen 64 Kriterien bis zum Betrag, der jeden Monat auf dem Konto ankommt, und bis zur Heimrechnung im eigenen Bundesland. Grundlage sind das SGB XI in der Fassung vom 24. Juli 2026 und die Ländertabellen des vdek vom 1. Juli 2026, jede Zahl mit Paragraf und Datum.", "en": "Radif Partners works through German long-term care insurance the way families meet it: from the Medical Service assessment with its 64 criteria to the money that reaches the bank account each month, and on to the care home bill in a given federal state. The basis is Book XI of the Social Code as amended on 24 July 2026 and the vdek state tables of 1 July 2026, every figure with its section and date."};
/** Sujets sur lesquels l'editeur est competent (schema.org knowsAbout). Ce sont les
 *  themes reellement traites par le site, pas une liste de mots-cles : un sujet
 *  declare ici sans page qui le couvre est une declaration fausse. */
export const KNOWS_ABOUT: Record<string, string[]> = {"de": ["Pflegegrad und Begutachtungsinstrument (§ 15 SGB XI)", "Leistungen der Pflegeversicherung 2026", "Eigenanteile im Pflegeheim nach Bundesland", "Soziale Sicherung pflegender Angehöriger"], "en": ["German care grades and the assessment instrument (Section 15 SGB XI)", "German long-term care insurance benefits 2026", "Care home co-payments by German state", "Pension and tax rules for family carers in Germany"]};
export const CONTACT_EMAIL = "kontakt@pflegegradrechnen.de";
export const THEME_COLOR = '#B42318';
export const LOGO_SYMBOL = 'PG';
export const BING_VERIFY_CODE = '';
export const GOOGLE_VERIFY_CODE = '';
/** Régime : 'none' pour tous les sites (RECETTE §15.6, décision de l'éditeur du 2026-10-06) :
 *  aucun bandeau, aucun cookie, Clarity chargé en mode sans cookie (consentv2 denied).
 *  'opt-in' / 'notice' ne servent plus qu'aux sites anciens qui les portent encore. */
export const CONSENT_MODE: 'opt-in' | 'notice' | 'none' = 'none';
export const GA4_ID = 'G-18GHY6MH6J';
/** Projet Microsoft Clarity (compte amradif), chargé sans cookie. Vide = aucune mesure. */
export const CLARITY_ID = '';
export const INDEXNOW_KEY = 'b7e14c2a9f3d4e6b8a1c5d0e2f7a9b3c';

/* ------------------------------------------------------------------------- *
 * IDENTITÉ LÉGALE — À COMPLÉTER AVANT LA MISE EN LIGNE
 * Ces champs alimentent la mention légale du pays, la politique de confidentialité,
 * la page contact et le schema Organization. Un champ vide s'affiche en jaune
 * sur le site. Contrôle : `npm run check:legal`.
 * ------------------------------------------------------------------------- */
export interface LegalHosting { name: string; address: string; phone: string; url: string }
export interface LegalIdentity {
  entityName: string; legalForm: string; street: string; postalCode: string; city: string;
  country: string; phone: string; registerLabel: string; registerNumber: string;
  vatLabel: string; vatNumber: string; jurisdiction: string;
  supervisoryAuthority: string; supervisoryAuthorityUrl: string; hosting: LegalHosting;
}
export const LEGAL: LegalIdentity = {
  entityName: 'Radif Partners',  // éditeur de tous les sites du portefeuille (RECETTE §8)
  legalForm: '',  // vide : publication à titre personnel, pas de société (comme les autres sites du portefeuille)
  street: '49 rue du Ressort',
  postalCode: '63000',
  city: 'Clermont-Ferrand',
  country: "Frankreich / France",
  phone: '',                 // ligne de contact publiée
  registerLabel: "SIREN",
  registerNumber: '',
  vatLabel: "USt-IdNr.",
  vatNumber: '',             // laisser vide si non assujetti
  jurisdiction: "France",
  supervisoryAuthority: "Commission nationale de l'informatique et des libertés (CNIL)",
  supervisoryAuthorityUrl: "https://www.cnil.fr",
  hosting: { name: 'GitHub, Inc. (GitHub Pages)', address: '88 Colin P Kelly Jr Street, San Francisco, CA 94107, United States', phone: '', url: 'https://pages.github.com' },
};

/** Champs sans lesquels le site ne doit pas être mis en ligne. */
export const LEGAL_REQUIRED: Array<keyof LegalIdentity> = ['entityName', 'street', 'postalCode', 'city'];

/** Profils publics de l'auteur (schema.org sameAs). Laisser vide si aucun. */
export const AUTHOR_SAME_AS: string[] = [];

/** Rythme de revue éditoriale annoncé sur le site, en mois. */
export const REVIEW_CYCLE_MONTHS = 12;
