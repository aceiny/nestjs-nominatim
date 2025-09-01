/**
 * Represents the three fundamental OpenStreetMap object types.
 *
 * These types define the basic structure of geographic data in OpenStreetMap
 * and are used by Nominatim to identify the source and nature of geographic objects.
 *
 * @example
 * ```typescript
 * // Check the type of a place result
 * if (place.osm_type === OSMType.NODE) {
 *   console.log("This is a point location (e.g., POI, address)");
 * } else if (place.osm_type === OSMType.WAY) {
 *   console.log("This is a linear feature (e.g., road, building outline)");
 * } else if (place.osm_type === OSMType.RELATION) {
 *   console.log("This is a complex feature (e.g., city boundary, multipolygon)");
 * }
 * ```
 *
 * @see {@link https://wiki.openstreetmap.org/wiki/Elements OpenStreetMap Elements Documentation}
 */
export enum OSMType {
  /**
   * Point geometry representing a single coordinate
   * Examples: POIs, addresses, individual buildings, street furniture
   * Most specific location type in OpenStreetMap
   */
  NODE = "node",

  /**
   * Linear geometry representing a sequence of connected points
   * Examples: roads, rivers, building outlines, administrative boundaries
   * Can represent both open (roads) and closed (building) geometries
   */
  WAY = "way",

  /**
   * Complex geometry representing relationships between other elements
   * Examples: city boundaries, multipolygons, route relations, restriction relations
   * Used for features too complex to represent as simple nodes or ways
   */
  RELATION = "relation",
}
