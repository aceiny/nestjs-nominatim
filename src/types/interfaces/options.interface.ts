import { CacheModuleOptions } from "@nestjs/cache-manager";

/**
 * Configuration options for the NominatimModule
 */
export interface NominatimModuleOptions {
  /**
   * Base URL for the Nominatim API
   * @default "https://nominatim.openstreetmap.org"
   */
  baseUrl?: string;

  /**
   * Preferred language for results (ISO 639-1 code)
   * @default "en"
   */
  language?: string;

  /**
   * Include detailed address breakdown in results
   * @default false
   */
  addressdetails?: boolean;

  /**
   * Request timeout in milliseconds
   * @default 5000
   */
  timeout?: number;

  /**
   * User agent string for API requests
   * @default "nestjs-nominatim"
   */
  userAgent?: string;

  /**
   * Include extra OSM tags in results
   * @default false
   */
  extratags?: boolean;

  /**
   * Include name details in results
   * @default false
   */
  namedetails?: boolean;

  /**
   * Cache configuration options
   * @default CashConfig (1 day TTL with in-memory store)
   */
  cache?: CacheModuleOptions;
}
