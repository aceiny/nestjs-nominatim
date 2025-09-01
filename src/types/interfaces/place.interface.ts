import { OSMType } from "../enum/osm-type.enum";
import { NominatimAddress } from "./address.interface";
import { NominatimExtraTags } from "./extratags.interface";
import { NominatimNameDetails } from "./namedetails.interface";

/**
 * Represents a complete place result from the Nominatim API.
 *
 * This is the primary data structure returned by search, reverse geocoding,
 * and lookup operations. Contains comprehensive information about a geographic
 * location including coordinates, administrative details, and optional
 * extended metadata.
 *
 * @example
 * ```typescript
 * const place: NominatimPlace = {
 *   place_id: 282397895,
 *   licence: "Data © OpenStreetMap contributors, ODbL 1.0...",
 *   osm_type: OSMType.RELATION,
 *   osm_id: 71525,
 *   lat: "48.8566101",
 *   lon: "2.3514992",
 *   class: "place",
 *   type: "city",
 *   place_rank: 16,
 *   importance: 0.9999999999999999,
 *   addresstype: "city",
 *   name: "Paris",
 *   display_name: "Paris, Île-de-France, France",
 *   boundingbox: ["48.815573", "48.902144", "2.224199", "2.4697602"]
 * };
 * ```
 *
 * @see {@link https://nominatim.org/release-docs/develop/api/Output/ Nominatim Output Documentation}
 */
export interface NominatimPlace {
  /**
   * Unique internal identifier for this place in Nominatim's database
   * Used for caching and internal references
   */
  place_id: number;

  /**
   * License information for the data
   * Typically references OpenStreetMap's Open Database License
   */
  licence: string;

  /**
   * OpenStreetMap object type (Node, Way, or Relation)
   * @see {@link OSMType}
   */
  osm_type: OSMType;

  /**
   * OpenStreetMap object identifier
   * Unique within the scope of the osm_type
   */
  osm_id: number;

  /**
   * Latitude coordinate as string
   * String format preserves precision from the API
   */
  lat: string;

  /**
   * Longitude coordinate as string
   * String format preserves precision from the API
   */
  lon: string;

  /**
   * Primary OpenStreetMap class/category
   * @example "place", "highway", "amenity", "building"
   */
  class: string;

  /**
   * Specific type within the class
   * @example "city", "restaurant", "hospital", "residential"
   */
  type: string;

  /**
   * Nominatim's internal ranking of place importance (0-30)
   * Lower numbers indicate higher importance in the settlement hierarchy
   * Used for search result ordering
   */
  place_rank: number;

  /**
   * Calculated importance score (0.0 to 1.0)
   * Based on Wikipedia importance, administrative level, and other factors
   * Higher values indicate more significant places
   */
  importance: number;

  /**
   * Address component type this place represents
   * @example "house", "road", "city", "country"
   * @optional Only present in some contexts
   */
  addresstype?: string;

  /**
   * Primary name of the place
   * @optional May be undefined for some locations
   */
  name?: string;

  /**
   * Human-readable full address string
   * Formatted according to local conventions and requested language
   */
  display_name: string;

  /**
   * Additional OpenStreetMap tags
   * @optional Only included when extratags=true is specified
   * @see {@link NominatimExtraTags}
   */
  extratags?: NominatimExtraTags;

  /**
   * Multilingual name information
   * @optional Only included when namedetails=true is specified
   * @see {@link NominatimNameDetails}
   */
  namedetails?: NominatimNameDetails;

  /**
   * Detailed address breakdown
   * @optional Only included when addressdetails=true is specified
   * @see {@link NominatimAddress}
   */
  address?: NominatimAddress;

  /**
   * Geographic bounding box coordinates [south, north, west, east]
   * All values are strings to preserve API precision
   * @example ["48.815573", "48.902144", "2.224199", "2.4697602"]
   */
  boundingbox: [string, string, string, string];
}
