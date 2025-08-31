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

## 📦 Installation

```bash
npm install nestjs-nominatim
```

### Peer Dependencies

Make sure you have the following peer dependencies installed:

```bash
npm install @nestjs/common @nestjs/core @nestjs/axios rxjs axios
```

## 🛠️ Quick Start

### 1. Import the Module

```typescript
import { Module } from '@nestjs/common';
import { NominatimModule } from 'nestjs-nominatim';

@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: 'https://nominatim.openstreetmap.org',
      language: 'en',
      userAgent: 'YourApp/1.0',
      timeout: 5000,
    }),
  ],
})
export class AppModule {}
```

### 2. Use the Service

```typescript
import { Injectable } from '@nestjs/common';
import { NominatimService } from 'nestjs-nominatim';

@Injectable()
export class LocationService {
  constructor(private readonly nominatimService: NominatimService) {}

  async searchPlace(query: string) {
    return await this.nominatimService.search(query);
  }

  async reverseGeocode(lat: number, lon: number) {
    return await this.nominatimService.reverse({ lat, lon });
  }
}
```

## 📚 API Reference

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | `https://nominatim.openstreetmap.org` | Nominatim API base URL |
| `language` | `string` | `en` | Preferred language for results |
| `addressdetails` | `boolean` | `false` | Include detailed address breakdown |
| `timeout` | `number` | `5000` | Request timeout in milliseconds |
| `userAgent` | `string` | `nestjs-nominatim` | User agent string |
| `extratags` | `boolean` | `false` | Include extra OSM tags |
| `namedetails` | `boolean` | `false` | Include name details |

### Service Methods

#### `search(query: string): Promise<NominatimSearchResults>`

Search for places by name or address.

```typescript
const results = await nominatimService.search('Paris, France');
console.log(results[0].display_name); // "Paris, Île-de-France, France"
```

#### `reverse(coordinates: Coordinates): Promise<NominatimPlace>`

Perform reverse geocoding from coordinates.

```typescript
const place = await nominatimService.reverse({ lat: 48.8566, lon: 2.3522 });
console.log(place.display_name); // Address at the coordinates
```

#### `lookup(osmIds: string[]): Promise<NominatimPlace[]>`

Look up places by OpenStreetMap IDs.

```typescript
const places = await nominatimService.lookup(['R146656', 'W104393803']);
console.log(places[0].display_name);
```

#### `healthCheck(): Promise<HealthCheck>`

Check the health status of the Nominatim API.

```typescript
const health = await nominatimService.healthCheck();
console.log(health.status); // 'healthy' | 'unhealthy'
```

#### `getFormattedAddress(place: NominatimPlace): FormattedAddress`

Format a place result into a structured address.

```typescript
const formatted = nominatimService.getFormattedAddress(place);
console.log(formatted.street); // "Rue de la Paix"
console.log(formatted.city); // "Paris"
```

## 🏗️ Advanced Usage

### Custom Configuration

```typescript
@Module({
  imports: [
    NominatimModule.forRoot({
      baseUrl: 'https://your-nominatim-instance.com',
      language: 'fr',
      addressdetails: true,
      extratags: true,
      namedetails: true,
      userAgent: 'MyGeocodingApp/2.0 (contact@example.com)',
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
      console.error('Geocoding failed:', error.message);
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

  @Get('/health/nominatim')
  async checkNominatimHealth() {
    const health = await this.nominatimService.healthCheck();
    if (health.status === 'unhealthy') {
      throw new ServiceUnavailableException('Nominatim API is unavailable');
    }
    return health;
  }
}
```

## 🌍 Language Support

The library supports multiple languages for address formatting:

```typescript
// French addresses
NominatimModule.forRoot({ language: 'fr' })

// German addresses  
NominatimModule.forRoot({ language: 'de' })

// Spanish addresses
NominatimModule.forRoot({ language: 'es' })
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
ahmed yassine zeraibi (aceiny.dev@gmail.com)
---

**Made with ❤️ for the NestJS community**
