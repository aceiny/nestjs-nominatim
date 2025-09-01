import { CacheModuleOptions } from "@nestjs/cache-manager";

export interface NominatimModuleOptions {
  baseUrl?: string; // optional, defaults to OSM
  language?: string; // optional, defaults to 'en'
  addressdetails?: boolean; // optional, defaults to false
  timeout?: number; // optional, defaults to 5000
  userAgent?: string; // optional, defaults to 'nestjs-nominatim'
  extratags?: boolean; // optional, defaults to false
  namedetails?: boolean; // optional, defaults to false
  cache?: CacheModuleOptions;
}
