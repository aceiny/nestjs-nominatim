// Core module and service exports
export * from "./nominatim.module";
export * from "./nominatim.service";

// Type definitions exports
export * from "./types/interfaces/options.interface";
export * from "./types/interfaces/address.interface";
export * from "./types/interfaces/extratags.interface";
export * from "./types/interfaces/formatted-address.interface";
export * from "./types/interfaces/geolocation-coordinates.interface";
export * from "./types/interfaces/health-check.interface";
export * from "./types/interfaces/namedetails.interface";
export * from "./types/interfaces/place.interface";
export * from "./types/interfaces/search-result.interface";

// Enum exports
export * from "./types/enum/osm-type.enum";

// Configuration exports (for advanced users)
export { NominatimConfig } from "./config/nominatim.config";
export { CashConfig } from "./config/cash.config";
