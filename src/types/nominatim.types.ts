/**
 * Consolidated type exports for the NestJS Nominatim library.
 * 
 * This file re-exports all the core types used throughout the library,
 * providing a single import point for consuming applications.
 * 
 * @example
 * ```typescript
 * import { 
 *   NominatimPlace, 
 *   NominatimSearchResults, 
 *   FormattedAddress,
 *   Coordinates 
 * } from 'nestjs-nominatim';
 * ```
 */

// Core data structures
export { NominatimPlace } from './interfaces/place.interface';
export { NominatimSearchResults } from './interfaces/search-result.interface';
export { FormattedAddress } from './interfaces/formatted-address.interface';
export { Coordinates } from './interfaces/geolocation-coordinates.interface';

// Configuration and options
export { NominatimModuleOptions } from './interfaces/options.interface';
export { HealthCheck } from './interfaces/health-check.interface';

// Detailed address components
export { NominatimAddress } from './interfaces/address.interface';
export { NominatimExtraTags } from './interfaces/extratags.interface';
export { NominatimNameDetails } from './interfaces/namedetails.interface';

// Enums
export { OSMType } from './enum/osm-type.enum';

// Import types for internal use in type definitions
import { NominatimPlace } from './interfaces/place.interface';
import { NominatimSearchResults } from './interfaces/search-result.interface';
import { HealthCheck } from './interfaces/health-check.interface';
import { Coordinates } from './interfaces/geolocation-coordinates.interface';

/**
 * Type alias for backward compatibility and convenience.
 * @deprecated Use NominatimSearchResults instead
 */
export type SearchResults = NominatimSearchResults;

/**
 * Type alias for commonly used coordinate pair.
 * @deprecated Use Coordinates instead
 */
export type LatLon = Coordinates;

/**
 * Union type representing all possible Nominatim API response types.
 */
export type NominatimApiResponse = NominatimPlace | NominatimSearchResults | HealthCheck;

/**
 * Type guard to check if a response is a single place result.
 * 
 * @param response - The API response to check
 * @returns True if the response is a single NominatimPlace
 * 
 * @example
 * ```typescript
 * const response = await api.someCall();
 * if (isNominatimPlace(response)) {
 *   console.log(response.display_name); // TypeScript knows this is NominatimPlace
 * }
 * ```
 */
export function isNominatimPlace(response: any): response is NominatimPlace {
  return response && typeof response === 'object' && 'place_id' in response && 'lat' in response && 'lon' in response;
}

/**
 * Type guard to check if a response is search results.
 * 
 * @param response - The API response to check
 * @returns True if the response is NominatimSearchResults
 * 
 * @example
 * ```typescript
 * const response = await api.search('Paris');
 * if (isNominatimSearchResults(response)) {
 *   console.log(`Found ${response.length} results`);
 * }
 * ```
 */
export function isNominatimSearchResults(response: any): response is NominatimSearchResults {
  return Array.isArray(response) && (response.length === 0 || isNominatimPlace(response[0]));
}

/**
 * Type guard to check if a response is a health check result.
 * 
 * @param response - The API response to check
 * @returns True if the response is a HealthCheck
 */
export function isHealthCheck(response: any): response is HealthCheck {
  return response && typeof response === 'object' && 'status' in response && 'message' in response;
}
