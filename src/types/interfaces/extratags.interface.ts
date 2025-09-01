/**
 * Represents additional OpenStreetMap tags returned when extratags=true is specified.
 *
 * These tags provide enriched metadata about places beyond standard address information.
 * They include references to external databases, operational details, and specialized
 * categorizations that can enhance application functionality.
 *
 * @example
 * ```typescript
 * const extraTags: NominatimExtraTags = {
 *   wikidata: "Q90",               // Wikidata entity ID
 *   wikipedia: "en:Paris",         // Wikipedia article reference
 *   operator: "RATP",              // Operating organization
 *   tourism: "attraction",         // Tourism classification
 *   historic: "castle",            // Historical significance
 *   capacity: "50000",             // Venue capacity
 *   website: "https://example.com", // Official website
 *   phone: "+33123456789"          // Contact phone
 * };
 * ```
 *
 * @see {@link https://nominatim.org/release-docs/develop/api/Output/#extratags Nominatim Extra Tags Documentation}
 * @see {@link https://wiki.openstreetmap.org/wiki/Tags OpenStreetMap Tags Wiki}
 */
export interface NominatimExtraTags {
  /**
   * Wikidata entity identifier (Q-number)
   * Links to structured data about the place
   * @example "Q90" for Paris
   */
  wikidata?: string;

  /**
   * Wikipedia article reference in format "language:article_title"
   * @example "en:Eiffel_Tower", "fr:Tour_Eiffel"
   */
  wikipedia?: string;

  /**
   * Organization or entity that operates this place
   * @example "RATP" for Paris metro, "McDonald's" for restaurants
   */
  operator?: string;

  /**
   * Tourism-related classification
   * @example "attraction", "hotel", "museum", "viewpoint"
   */
  tourism?: string;

  /**
   * Historical significance or type
   * @example "castle", "monument", "archaeological_site"
   */
  historic?: string;

  /**
   * Capacity information (people, vehicles, etc.)
   * @example "50000" for stadium capacity, "200" for parking spaces
   */
  capacity?: string;

  /**
   * Index signature for any additional OSM tags
   * OpenStreetMap uses hundreds of different tags for various purposes
   * Common examples: website, phone, email, opening_hours, wheelchair, etc.
   */
  [key: string]: string | undefined;
}
