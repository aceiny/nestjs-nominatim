/**
 * @module Nominatim
 */
import { Inject, Injectable, Logger } from "@nestjs/common";
import { NominatimModuleOptions } from "./types/interfaces/options.interface";
import axios, { AxiosInstance } from "axios";
import { NominatimConfig } from "./config/nominatim.config";
import {
  FormattedAddress,
  NominatimPlace,
  NominatimSearchResults,
} from "./types/nominatim.types";
import { Coordinates } from "./types/interfaces/geolocation-coordinates.interface";
import { HealthCheck } from "./types/interfaces/health-check.interface";

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
  ) {
    this.logger = new Logger(NominatimService.name);

    // Build params object conditionally
    const params: Record<string, any> = {
      format: NominatimConfig.format,
      language: this.options.language,
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
   * Searches for a location by a query string.
   * @public
   * @param {string} query - The search query (e.g., a place name or address).
   * @returns {Promise<NominatimSearchResults>} A promise that resolves with the search results.
   */
  public async search(query: string): Promise<NominatimSearchResults> {
    return this.request<NominatimSearchResults>("/search", { q: query });
  }

  /**
   * Reverse geocodes coordinates to find a location.
   * @public
   * @param {Coordinates} coordinates - The latitude and longitude to reverse geocode.
   * @returns {Promise<NominatimPlace>} A promise that resolves with the location information.
   */
  public async getLocationFromCords(
    coordinates: Coordinates,
  ): Promise<NominatimPlace> {
    return this.request<NominatimPlace>("/reverse", {
      lat: coordinates.lat,
      lon: coordinates.lon,
    });
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

    return this.request<NominatimSearchResults>("/lookup", {
      osm_ids: osmIds.join(","),
    });
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
