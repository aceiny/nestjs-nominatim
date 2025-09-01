/**
 * Represents multilingual name information returned when namedetails=true is specified.
 *
 * This interface provides access to place names in various languages and alternative
 * naming conventions. Essential for applications serving international users or
 * requiring localized place names.
 *
 * @example
 * ```typescript
 * const nameDetails: NominatimNameDetails = {
 *   name: "Paris",              // Default/primary name
 *   "name:en": "Paris",         // English name
 *   "name:fr": "Paris",         // French name
 *   "name:es": "París",         // Spanish name
 *   "name:de": "Paris",         // German name
 *   "name:ja": "パリ",           // Japanese name
 *   "name:ar": "باريس",          // Arabic name
 *   alt_name: "City of Light",  // Alternative name
 *   short_name: "PA",           // Abbreviated form
 *   old_name: "Lutetia"         // Historical name
 * };
 * ```
 *
 * @see {@link https://nominatim.org/release-docs/develop/api/Output/#namedetails Nominatim Name Details Documentation}
 * @see {@link https://wiki.openstreetmap.org/wiki/Names OpenStreetMap Names Wiki}
 */
export interface NominatimNameDetails {
  /**
   * Primary/default name of the place
   * Usually in the local language or most commonly used name
   */
  name?: string;

  /** Name in English */
  "name:en"?: string;

  /** Name in French */
  "name:fr"?: string;

  /** Name in Spanish */
  "name:es"?: string;

  /** Name in German */
  "name:de"?: string;

  /**
   * Alternative name(s) for the place
   * May include colloquial names, nicknames, or alternative spellings
   * @example "Big Apple" for New York, "City of Light" for Paris
   */
  alt_name?: string;

  /**
   * Shortened or abbreviated name
   * @example "NYC" for New York City, "LA" for Los Angeles
   */
  short_name?: string;

  /**
   * Historical or former name of the place
   * @example "Lutetia" for Paris, "Byzantium" for Istanbul
   */
  old_name?: string;

  /**
   * Index signature for names in any language
   * Format: "name:LANGUAGE_CODE" where LANGUAGE_CODE follows ISO 639-1
   * @example "name:ja" for Japanese, "name:ar" for Arabic, "name:zh" for Chinese
   */
  [key: string]: string | undefined;
}
