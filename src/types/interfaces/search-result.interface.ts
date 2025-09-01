import { NominatimPlace } from "./place.interface";

/**
 * Represents an array of search results from the Nominatim API.
 *
 * This interface extends Array<NominatimPlace> to provide a strongly-typed
 * collection of place results. Results are typically ordered by relevance
 * and importance, with the most relevant matches appearing first.
 *
 * @example
 * ```typescript
 * const results: NominatimSearchResults = await nominatimService.search("Paris");
 *
 * // Access first result
 * const bestMatch = results[0];
 * console.log(bestMatch.display_name); // "Paris, Île-de-France, France"
 *
 * // Iterate through all results
 * results.forEach((place, index) => {
 *   console.log(`${index + 1}. ${place.display_name} (importance: ${place.importance})`);
 * });
 *
 * // Filter results by country
 * const frenchResults = results.filter(place =>
 *   place.address?.country_code === 'fr'
 * );
 * ```
 *
 * @see {@link NominatimPlace} for individual result structure
 * @see {@link https://nominatim.org/release-docs/develop/api/Search/ Nominatim Search API Documentation}
 */
export interface NominatimSearchResults extends Array<NominatimPlace> {}
