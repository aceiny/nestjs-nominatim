/**
 * Example usage in a consuming NestJS project
 * This file demonstrates proper TypeScript type inference and autocomplete
 */

import { Module } from '@nestjs/common';
import { 
  NominatimModule, 
  NominatimModuleOptions,
  NominatimService 
} from 'nestjs-nominatim';

// Example 1: Basic configuration with full type support
@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: 'https://nominatim.openstreetmap.org',
      language: 'en',
      userAgent: 'MyApp/1.0',
      timeout: 5000,
      addressdetails: true,
      extratags: false,
      namedetails: true,
    }),
  ],
})
export class BasicAppModule {}

// Example 2: Configuration with caching
@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: 'https://nominatim.openstreetmap.org',
      language: 'fr',
      userAgent: 'MyGeoApp/2.0 (contact@example.com)',
      timeout: 10000,
      addressdetails: true,
      cache: {
        ttl: 3600000, // 1 hour
        max: 1000,
      },
    }),
  ],
})
export class CachedAppModule {}

// Example 3: Minimal configuration (using defaults)
@Module({
  imports: [
    NominatimModule.forRoot(), // All options are optional
  ],
})
export class MinimalAppModule {}

// Example 4: Using configuration from external source
const config: NominatimModuleOptions = {
  baseUrl: process.env.NOMINATIM_URL || 'https://nominatim.openstreetmap.org',
  language: process.env.NOMINATIM_LANG || 'en',
  userAgent: `${process.env.APP_NAME}/${process.env.APP_VERSION}`,
  timeout: parseInt(process.env.NOMINATIM_TIMEOUT || '5000'),
  addressdetails: process.env.NOMINATIM_ADDRESS_DETAILS === 'true',
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '3600000'),
    max: parseInt(process.env.CACHE_MAX || '1000'),
  },
};

@Module({
  imports: [
    NominatimModule.forRoot(config),
  ],
})
export class ConfigurableAppModule {}

// Example service usage
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocationService {
  constructor(private readonly nominatimService: NominatimService) {}

  async searchLocation(query: string) {
    // Full type support for all methods
    const results = await this.nominatimService.search(query);
    return results;
  }

  async reverseGeocode(lat: number, lon: number) {
    const place = await this.nominatimService.getLocationFromCords({ lat, lon });
    
    // Format the address with full type support
    const formatted = this.nominatimService.formatLocation(place);
    
    return {
      original: place,
      formatted: {
        country: formatted.country,
        region: formatted.region,
        commune: formatted.commune,
        street: formatted.street,
        fullAddress: formatted.fullAddress,
      },
    };
  }

  async lookupByOsmIds(osmIds: string[]) {
    return await this.nominatimService.lookup(osmIds);
  }

  async checkHealth() {
    return await this.nominatimService.healthCheck();
  }
}
