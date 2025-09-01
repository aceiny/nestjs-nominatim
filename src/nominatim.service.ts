/**
 * @module Nominatim
 */
import { Inject, Injectable, Logger } from "@nestjs/common";
import { NominatimModuleOptions } from "./types/interfaces/options.interface";
import axios, { AxiosInstance } from "axios";
import { NominatimConfig } from "./config/nominatim.config";
import { Coordinates } from "./types/interfaces/geolocation-coordinates.interface";
import { HealthCheck } from "./types/interfaces/health-check.interface";
import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { CacheKeys } from "./helpers/cash-keys";
import { FormattedAddress } from "./types/interfaces/formatted-address.interface";
import { NominatimPlace } from "./types/interfaces/place.interface";
import { NominatimSearchResults } from "./types/interfaces/search-result.interface";
/**
 * Service for interacting with the Nominatim API.
 * @class NominatimService
 */
@Injectable()
export class NominatimService {
  /**
   * Logger instance for the service.
   * @private
   * @readonly
   */
  private readonly logger: Logger;

  /**
   * Axios instance configured for the Nominatim API.
   * @private
   * @readonly
   */
  private readonly httpClient: AxiosInstance;

  /**
   * Creates an instance of NominatimService.
   * @constructor
   * @param {NominatimModuleOptions} options - The module options for configuring the Nominatim service.
   */
  constructor(
    @Inject("NOMINATIM_OPTIONS") private options: NominatimModuleOptions,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.logger = new Logger(NominatimService.name);

    // Build params object conditionally
    const params: Record<string, any> = {
      format: NominatimConfig.format,
      'accept-language': this.options.language,
    };

    // include these parameters if they are explicitly true
    if (this.options.addressdetails) {
      params.addressdetails = 1;
    }
    if (this.options.extratags) {
      params.extratags = 1;
    }
    if (this.options.namedetails) {
      params.namedetails = 1;
    }

    this.httpClient = axios.create({
      baseURL: this.options.baseUrl,
      params,
      headers: {
        "User-Agent": this.options.userAgent,
      },
      timeout: this.options.timeout,
    });
  }

  /**
   * Performs a generic GET request to the Nominatim API.
   * @private
   * @param {string} url - The API endpoint URL.
   * @param {Record<string, any>} [params] - Optional query parameters for the request.
   * @returns {Promise<T>} A promise that resolves with the response data.
   * @throws {Error} Throws an error if the Nominatim request fails.
   * @template T
   */
  private async request<T>(
    url: string,
    params?: Record<string, any>,
  ): Promise<T> {
    try {
      const response = await this.httpClient.get<T>(url, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        this.logger.error(`Nominatim API error: ${error.message}`, error.stack);

        if (error.response) {
          this.logger.error(
            `Status: ${error.response.status}, Data: ${JSON.stringify(
              error.response.data,
            )}`,
          );
        } else if (error.request) {
          this.logger.error("No response received from Nominatim API");
        }
      } else {
        this.logger.error(`Unexpected error: ${error}`);
      }
      throw new Error("Nominatim request failed");
    }
  }

  /**
   * Generic helper for caching API results.
   *
   * Checks if a value exists in the cache for the given key.
   * If a cached value exists, it is returned immediately.
   * Otherwise, the provided request function is called, its result
   * is stored in the cache, and then returned.
   *
   * @template T - The type of the data being cached.
   * @param {string} key - The cache key to store/retrieve the value.
   * @param {() => Promise<T>} requestFn - A function that performs the API request and returns a promise with the result.
   * @param {number} [ttl] - Optional. Time-to-live for the cached value in milliseconds. If not provided, the default TTL from the cache configuration is used.
   * @returns {Promise<T>} - A promise that resolves with either the cached value or the newly fetched result.
   *
   * @example
   * const result = await this.cachedRequest('search:paris', () => this.request('/search', { q: 'paris' }), 3600000);
   */
  private async cachedRequest<T>(
    key: string,
    requestFn: () => Promise<T>,
    ttl?: number,
  ): Promise<T> {
    const cached = await this.cacheManager.get<T>(key);
    if (cached) return cached;

    const result = await requestFn();
    await this.cacheManager.set(key, result, ttl);
    return result;
  }

  /**
   * Searches for a location by a query string.
   * @public
   * @param {string} query - The search query (e.g., a place name or address).
   * @returns {Promise<NominatimSearchResults>} A promise that resolves with the search results.
   */
  public async search(query: string): Promise<NominatimSearchResults> {
    return this.cachedRequest(CacheKeys.SEARCH(query), () =>
      this.request<NominatimSearchResults>("/search", { q: query }),
    );
  }

  /**
   * Reverse geocodes coordinates to find a location.
   * @public
   * @param {Coordinates} coordinates - The latitude and longitude to reverse geocode.
   * @returns {Promise<NominatimPlace>} A promise that resolves with the location information.
   */
  public async reverse(coordinates: Coordinates): Promise<NominatimPlace> {
    return this.cachedRequest(
      CacheKeys.REVERSE(coordinates.lat, coordinates.lon),
      () =>
        this.request<NominatimPlace>("/reverse", {
          lat: coordinates.lat,
          lon: coordinates.lon,
        }),
    );
  }

  /**
   * Looks up a location by one or more OpenStreetMap (OSM) IDs.
   * @public
   * @param {string[]} osmIds - An array of OpenStreetMap IDs.
   * @returns {Promise<NominatimSearchResults>} A promise that resolves with the lookup results.
   * @throws {Error} Throws an error if no OSM IDs are provided.
   */
  public async lookup(osmIds: string[]): Promise<NominatimSearchResults> {
    if (!osmIds.length) {
      throw new Error("lookup requires at least one OSM ID");
    }

    return this.cachedRequest(CacheKeys.LOOKUP(osmIds), () =>
      this.request<NominatimSearchResults>("/lookup", {
        osm_ids: osmIds.join(","),
      }),
    );
  }

  /**
   * Performs a health check on the Nominatim API.
   * @public
   * @returns {Promise<any>} A promise that resolves with the status data.
   */
  public async healthCheck(): Promise<HealthCheck> {
    return this.request<HealthCheck>("/status");
  }

  /**
   * Formats raw Nominatim location data into a simplified address object.
   * @public
   * @param {NominatimPlace} data - The raw Nominatim place data.
   * @returns {FormattedAddress} A formatted address object.
   */
  public formatLocation(data: NominatimPlace): FormattedAddress {
    const { address = {}, display_name = "" } = data;
    return {
      country: address.country ?? null,
      countryCode: address.country_code ?? null,
      postcode: address.postcode ?? null,
      region: address.state ?? address.region ?? null,
      regionCode:
        address["ISO3166-2-lvl2"] ??
        address["ISO3166-2-lvl4"] ??
        address["ISO3166-2-lvl6"] ??
        address["ISO3166-2-lvl8"] ??
        null,
      commune:
        address.municipality ??
        address.city ??
        address.town ??
        address.village ??
        address.county ??
        null,
      district:
        address.city_district ??
        address.district ??
        address.suburb ??
        address.neighbourhood ??
        address.hamlet ??
        null,
      street:
        address.road ??
        address.street ??
        address.highway ??
        address.residential ??
        null,
      placeType:
        address.amenity ??
        address.building ??
        address.public_building ??
        address.office ??
        address.shop ??
        address.tourism ??
        address.leisure ??
        null,
      fullAddress: display_name ?? null,
    };
  }
}
