/**
 * Cache key templates for NominatimService.
 * Use these keys with string interpolation when caching.
 */
export const CacheKeys = {
  SEARCH: (query: string) => `search:${query}`,
  REVERSE: (lat: number, lon: number) => `reverse:${lat}:${lon}`,
  LOOKUP: (osmIds: string[]) => `lookup:${osmIds.join(",")}`,
};
