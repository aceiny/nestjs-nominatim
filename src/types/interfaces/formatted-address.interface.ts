/**
 * Represents a standardized, formatted address structure derived from raw Nominatim data.
 *
 * This interface provides a clean, consistent address format regardless of the complexity
 * of the original Nominatim response. All fields are nullable since address completeness
 * varies significantly across different locations and data quality.
 *
 * @example
 * ```typescript
 * const formatted: FormattedAddress = {
 *   country: "France",
 *   countryCode: "fr",
 *   postcode: "75001",
 *   region: "Île-de-France",
 *   regionCode: "FR-IDF",
 *   commune: "Paris",
 *   district: "1st Arrondissement",
 *   street: "Rue de Rivoli",
 *   placeType: "retail",
 *   fullAddress: "Rue de Rivoli, 1st Arrondissement, Paris, Île-de-France, 75001, France"
 * };
 * ```
 */
export interface FormattedAddress {
  /** Country name in the requested language */
  country: string | null;

  /** ISO 3166-1 alpha-2 country code (e.g., "us", "fr", "de") */
  countryCode: string | null;

  /** Postal code or ZIP code */
  postcode: string | null;

  /** State, province, or major administrative region */
  region: string | null;

  /** ISO 3166-2 region code when available */
  regionCode: string | null;

  /**
   * Municipality, city, town, or village name
   * Prioritizes the most relevant administrative unit for the location
   */
  commune: string | null;

  /**
   * Local district, neighborhood, or suburb
   * Represents the finest-grained geographic subdivision
   */
  district: string | null;

  /**
   * Street name or road
   * Includes highways, residential roads, and pedestrian areas
   */
  street: string | null;

  /**
   * Type of place or point of interest
   * Examples: "restaurant", "hospital", "shop", "office", "tourism"
   */
  placeType: string | null;

  /**
   * Complete formatted address string as returned by Nominatim
   * Provides the full human-readable address
   */
  fullAddress?: string | null;
}
