# NestJS Nominatim

[![npm version](https://badge.fury.io/js/nestjs-nominatim.svg)](https://badge.fury.io/js/nestjs-nominatim)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

NestJS module for the [Nominatim](https://nominatim.openstreetmap.org/) geocoding API (OpenStreetMap). Forward/reverse geocoding, place lookup, address formatting, and built-in caching — fully typed.

## Installation

```bash
npm install nestjs-nominatim
```

Peer dependencies (install the ones you don't already have):

```bash
npm install @nestjs/common @nestjs/core @nestjs/axios axios
# Optional — only needed if you want caching:
npm install @nestjs/cache-manager cache-manager
```

## Quick Start

### Basic Setup

```typescript
import { Module } from "@nestjs/common";
import { NominatimModule } from "nestjs-nominatim";

@Module({
  imports: [
    NominatimModule.forRoot({
      userAgent: "YourApp/1.0",
      language: "en",
      addressdetails: true,
    }),
  ],
})
export class AppModule {}
```

### Async Configuration

Use `forRootAsync()` to resolve config at runtime (e.g. from `ConfigService`):

```typescript
NominatimModule.forRootAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    baseUrl: config.get<string>("GEOLOCATION_API"),
    userAgent: `${config.get<string>("APP_NAME")}/${config.get<string>("API_VERSION")}`,
    language: "en",
    addressdetails: true,
  }),
});
```

Also supports `useClass` and `useExisting` — implement the `NominatimOptionsFactory` interface:

```typescript
@Injectable()
export class NominatimConfigService implements NominatimOptionsFactory {
  createNominatimOptions(): NominatimModuleOptions {
    return {
      userAgent: "MyApp/1.0",
      language: "en",
      addressdetails: true,
    };
  }
}

// useClass — module creates and manages the instance
NominatimModule.forRootAsync({ useClass: NominatimConfigService });

// useExisting — reuse a provider already registered elsewhere
NominatimModule.forRootAsync({
  imports: [ConfigurationModule],
  useExisting: NominatimConfigService,
});
```

### Using the Service

```typescript
import { Injectable } from "@nestjs/common";
import { NominatimService } from "nestjs-nominatim";

@Injectable()
export class LocationService {
  constructor(private readonly nominatim: NominatimService) {}

  async searchPlace(query: string) {
    return this.nominatim.search(query);
  }

  async reverseGeocode(lat: number, lon: number) {
    return this.nominatim.reverse({ lat, lon });
  }

  async lookupByOsmIds(ids: string[]) {
    return this.nominatim.lookup(ids);
  }
}
```

## API Reference

### Configuration Options

| Option           | Type                 | Default                               | Description                       |
| ---------------- | -------------------- | ------------------------------------- | --------------------------------- |
| `baseUrl`        | `string`             | `https://nominatim.openstreetmap.org` | Nominatim API base URL            |
| `language`       | `string`             | `en`                                  | Preferred language (ISO 639-1)    |
| `addressdetails` | `boolean`            | `true`                                | Include address breakdown         |
| `timeout`        | `number`             | `5000`                                | Request timeout (ms)              |
| `userAgent`      | `string`             | `nestjs-nominatim/1.0`                | User agent string                 |
| `extratags`      | `boolean`            | `false`                               | Include extra OSM tags            |
| `namedetails`    | `boolean`            | `false`                               | Include multilingual name details |
| `cache`          | `CacheModuleOptions` | 1 day TTL, in-memory                  | Cache configuration               |

### Service Methods

#### `search(query: string): Promise<NominatimSearchResults>`

Search for places by name or address.

```typescript
const results = await nominatim.search("Paris, France");
```

#### `reverse(coordinates: Coordinates): Promise<NominatimPlace>`

Get location info from coordinates.

```typescript
const place = await nominatim.reverse({ lat: 48.8566, lon: 2.3522 });
```

#### `lookup(osmIds: string[]): Promise<NominatimSearchResults>`

Look up places by OSM IDs.

```typescript
const places = await nominatim.lookup(["R146656", "W104393803"]);
```

#### `healthCheck(): Promise<HealthCheck>`

Check API availability.

```typescript
const health = await nominatim.healthCheck();
// health.status === 0 means OK
```

#### `formatLocation(place: NominatimPlace): FormattedAddress`

Extract structured address components from a place result.

```typescript
const place = await nominatim.reverse({ lat: 48.8566, lon: 2.3522 });
const formatted = nominatim.formatLocation(place);
// { country, countryCode, postcode, region, commune, district, street, placeType, fullAddress }
```

## Caching

Caching is built-in and applied automatically to `search`, `reverse`, and `lookup` calls. Pass a `cache` option to configure:

```typescript
NominatimModule.forRoot({
  userAgent: "YourApp/1.0",
  cache: {
    ttl: 3600000, // 1 hour
    max: 1000,
  },
});
```

For Redis or other stores:

```typescript
import { redisStore } from "cache-manager-redis-store";

NominatimModule.forRoot({
  userAgent: "YourApp/1.0",
  cache: {
    store: redisStore,
    host: "localhost",
    port: 6379,
    ttl: 3600000,
  },
});
```

Default cache config (when no `cache` option is provided): 1 day TTL, in-memory store.

Cache keys follow the pattern: `search:{query}`, `reverse:{lat}:{lon}`, `lookup:{id1},{id2}`.

## Type Exports

All types are exported from the package root:

```typescript
import {
  NominatimPlace,
  NominatimSearchResults,
  Coordinates,
  FormattedAddress,
  HealthCheck,
  NominatimAddress,
  NominatimExtraTags,
  NominatimNameDetails,
  NominatimModuleOptions,
  NominatimModuleAsyncOptions,
  NominatimOptionsFactory,
  NOMINATIM_MODULE_OPTIONS,
  OSMType,
} from "nestjs-nominatim";
```

## License

MIT — see [LICENSE](LICENSE).

## Contributing

1. Fork the repo
2. Create a feature branch
3. Submit a Pull Request

Issues and feature requests: [GitHub Issues](https://github.com/aceiny/nestjs-nominatim/issues)

## Author

Yassine Zeraibi (aceiny.dev@gmail.com)
