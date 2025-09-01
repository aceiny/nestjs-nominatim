/**
 * Represents geographic coordinates in the WGS84 coordinate system.
 *
 * Used for both input (reverse geocoding) and output (search results) coordinates.
 * All coordinates follow the standard decimal degree format used by most mapping APIs.
 *
 * @example
 * ```typescript
 * // Paris coordinates
 * const parisCoords: Coordinates = {
 *   lat: 48.8566,  // Latitude: positive for North, negative for South
 *   lon: 2.3522    // Longitude: positive for East, negative for West
 * };
 *
 * // New York coordinates
 * const nycCoords: Coordinates = {
 *   lat: 40.7128,
 *   lon: -74.0060  // Negative longitude for Western hemisphere
 * };
 * ```
 */
export interface Coordinates {
  /**
   * Latitude in decimal degrees
   * Valid range: -90.0 to +90.0
   * Positive values represent North, negative values represent South
   */
  lat: number;

  /**
   * Longitude in decimal degrees
   * Valid range: -180.0 to +180.0
   * Positive values represent East, negative values represent West
   */
  lon: number;
}
