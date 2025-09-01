# NestJS Nominatim

[![npm version](https://badge.fury.io/js/nestjs-nominatim.svg)](https://badge.fury.io/js/nestjs-nominatim)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A powerful and easy-to-use NestJS library for integrating with the Nominatim API (OpenStreetMap geocoding service). This library provides a clean, type-safe interface for performing geocoding, reverse geocoding, and place lookups.

## 🚀 Features

- **🔍 Forward Geocoding**: Search for places by name or address
- **📍 Reverse Geocoding**: Get address information from coordinates
- **🔎 Place Lookup**: Retrieve detailed information by OSM ID
- **💪 TypeScript Support**: Fully typed with comprehensive interfaces
- **⚙️ Configurable**: Flexible configuration options
- **🏥 Health Checks**: Built-in API health monitoring
- **🌐 Language Support**: Multi-language address formatting
- **🔧 NestJS Integration**: Native NestJS module with dependency injection
- **📍 Address Formatting**: Convert raw place data into structured address components
- **⚡ Caching Support**: Built-in configurable caching for improved performance

## 📦 Installation

```bash
npm install nestjs-nominatim
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install @nestjs/common @nestjs/core @nestjs/axios axios @nestjs/cache-manager cache-manager
```

## 🛠️ Quick Start

### 1. Import the Module

```typescript
import { Module } from "@nestjs/common";
import { NominatimModule } from "nestjs-nominatim";

@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: "https://nominatim.openstreetmap.org",
      language: "en",
      userAgent: "YourApp/1.0",
      timeout: 5000,
    }),
  ],
})
export class AppModule {}
```

### 1.1. With Caching (Recommended)

For better performance, integrate with NestJS cache manager:

```typescript
import { Module } from "@nestjs/common";
import { NominatimModule } from "nestjs-nominatim";

@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: "https://nominatim.openstreetmap.org",
      language: "en",
      userAgent: "YourApp/1.0",
      timeout: 5000,
      addressdetails: true, // Recommended for better caching efficiency
      cache: {
        ttl: 3600000, // 1 hour cache (in milliseconds)
        max: 1000, // maximum number of items in cache
      },
    }),
  ],
})
export class AppModule {}
```

### 2. Use the Service

```typescript
import { Injectable } from "@nestjs/common";
import { NominatimService } from "nestjs-nominatim";

@Injectable()
export class LocationService {
  constructor(private readonly nominatimService: NominatimService) {}

  async searchPlace(query: string) {
    return await this.nominatimService.search(query);
  }

  async reverseGeocode(lat: number, lon: number) {
    return await this.nominatimService.getLocationFromCords({ lat, lon });
  }
}
```

## 📚 API Reference

### Configuration Options

| Option           | Type                 | Default                               | Description                        |
| ---------------- | -------------------- | ------------------------------------- | ---------------------------------- |
| `baseUrl`        | `string`             | `https://nominatim.openstreetmap.org` | Nominatim API base URL             |
| `language`       | `string`             | `en`                                  | Preferred language for results     |
| `addressdetails` | `boolean`            | `false`                               | Include detailed address breakdown |
| `timeout`        | `number`             | `5000`                                | Request timeout in milliseconds    |
| `userAgent`      | `string`             | `nestjs-nominatim`                    | User agent string                  |
| `extratags`      | `boolean`            | `false`                               | Include extra OSM tags             |
| `namedetails`    | `boolean`            | `false`                               | Include name details               |
| `cache`          | `CacheModuleOptions` | `CashConfig`                          | Cache configuration options        |

### Service Methods

#### `search(query: string): Promise<NominatimSearchResults>`

Search for places by name or address.

```typescript
const results = await nominatimService.search("Paris, France");
console.log(results[0].display_name); // "Paris, Île-de-France, France"
```

#### `getLocationFromCords(coordinates: Coordinates): Promise<NominatimPlace>`

Perform reverse geocoding from coordinates.

```typescript
const place = await nominatimService.getLocationFromCords({
  lat: 48.8566,
  lon: 2.3522,
});
console.log(place.display_name); // Address at the coordinates
```

#### `lookup(osmIds: string[]): Promise<NominatimPlace[]>`

Look up places by OpenStreetMap IDs.

```typescript
const places = await nominatimService.lookup(["R146656", "W104393803"]);
console.log(places[0].display_name);
```

#### `healthCheck(): Promise<HealthCheck>`

Check the health status of the Nominatim API.

```typescript
const health = await nominatimService.healthCheck();
console.log(health.message, health.status); // 'OK' , 0
```

#### `formatLocation(place: NominatimPlace): FormattedAddress`

Format a place result into a structured address with standardized components.

```typescript
const place = await nominatimService.getLocationFromCords({
  lat: 48.8566,
  lon: 2.3522,
});
const formatted = nominatimService.formatLocation(place);

console.log(formatted.country); // "France"
console.log(formatted.commune); // "Paris"
console.log(formatted.street); // "Rue de Rivoli"
console.log(formatted.postcode); // "75001"
console.log(formatted.fullAddress); // Complete formatted address
```

## 🏗️ Advanced Usage

### Caching Configuration

The library includes built-in caching support to improve performance and reduce API calls. Caching is automatically applied to all search, reverse geocoding, and lookup operations when configured.

#### Basic Caching Setup

```typescript
import { Module } from "@nestjs/common";
import { NominatimModule } from "nestjs-nominatim";

@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: "https://nominatim.openstreetmap.org",
      language: "en",
      userAgent: "YourApp/1.0",
      cache: {
        ttl: 3600000, // Cache for 1 hour (in milliseconds)
        max: 1000, // Store up to 1000 cached responses
      },
    }),
  ],
})
export class AppModule {}
```

#### Advanced Caching with Redis

```typescript
import { Module } from "@nestjs/common";
import { NominatimModule } from "nestjs-nominatim";
import { redisStore } from "cache-manager-redis-store";

@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: "https://nominatim.openstreetmap.org",
      language: "en",
      userAgent: "YourApp/1.0",
      cache: {
        store: redisStore,
        host: "localhost",
        port: 6379,
        ttl: 3600000, // 1 hour in milliseconds
        max: 10000,
      },
    }),
  ],
})
export class AppModule {}
```

#### Default Cache Configuration

If no cache configuration is provided, the library uses these defaults:

```typescript
{
  ttl: 86400000,        // 1 day (in milliseconds)
  namespace: "nominatim", // Cache key prefix
  refreshThreshold: 60000, // Refresh if < 1 min left
  nonBlocking: false,    // Block until store writes are done
}
```

#### Cache Keys

The library uses structured cache keys for different operations:

- Search: `search:{query}`
- Reverse: `reverse:{lat}:{lon}`
- Lookup: `lookup:{osmId1},{osmId2},...`

#### Performance Benefits

With caching enabled, you can expect:

- **Faster Response Times**: Subsequent identical requests return instantly from cache
- **Reduced API Load**: Fewer requests to the Nominatim API
- **Cost Savings**: Lower bandwidth usage and API rate limit consumption
- **Better User Experience**: Instant results for repeated searches

Example performance improvement:

```typescript
// First call - hits the API (slower)
const result1 = await nominatimService.search("Paris, France"); // ~200-500ms

// Second call - served from cache (faster)
const result2 = await nominatimService.search("Paris, France"); // ~1-5ms
```

### Custom Configuration

```typescript
@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: "https://your-nominatim-instance.com",
      language: "fr",
      addressdetails: true,
      extratags: true,
      namedetails: true,
      userAgent: "MyGeocodingApp/2.0 (contact@example.com)",
      timeout: 10000,
    }),
  ],
})
export class AppModule {}
```

### Error Handling

```typescript
@Injectable()
export class LocationService {
  constructor(private readonly nominatimService: NominatimService) {}

  async safeSearch(query: string) {
    try {
      const results = await this.nominatimService.search(query);
      return { success: true, data: results };
    } catch (error) {
      console.error("Geocoding failed:", error.message);
      return { success: false, error: error.message };
    }
  }
}
```

### Health Monitoring

```typescript
@Injectable()
export class HealthService {
  constructor(private readonly nominatimService: NominatimService) {}

  @Get("/health/nominatim")
  async checkNominatimHealth() {
    const health = await this.nominatimService.healthCheck();
    if (health.messasge === "OK" || health.status = 0) {
      throw new ServiceUnavailableException("Nominatim API is unavailable");
    }
    return health;
  }
}
```

## 🌍 Language Support

The library supports multiple languages for address formatting:

```typescript
// French addresses
NominatimModule.forRoot({ language: "fr" });

// German addresses
NominatimModule.forRoot({ language: "de" });

// Spanish addresses
NominatimModule.forRoot({ language: "es" });
```

## 📝 Type Definitions

The library includes comprehensive TypeScript definitions:

- `NominatimSearchResults`: Array of search results
- `NominatimPlace`: Detailed place information
- `Coordinates`: Latitude/longitude coordinates
- `FormattedAddress`: Structured address components
- `HealthCheck`: API health status
- `NominatimModuleOptions`: Configuration options

## 🧪 Testing

To run the included tests:

```bash
npm test
```

The test suite includes examples of all major functionality and can serve as additional documentation.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Issues

If you encounter any issues or have feature requests, please [create an issue](https://github.com/aceiny/nestjs-nominatim/issues) on GitHub.

## 📞 Support

For support and questions, please:

- Check the documentation above
- Look at the [test examples](src/test.ts)
- Create an issue on GitHub

## 🙏 Acknowledgments

- [OpenStreetMap](https://www.openstreetmap.org/) for providing the Nominatim service
- [NestJS](https://nestjs.com/) for the amazing framework
- All contributors to this project

## Author

```
ahmed yassine zeraibi (aceiny.dev@gmail.com)
```

**Made with ❤️ for the NestJS community**
