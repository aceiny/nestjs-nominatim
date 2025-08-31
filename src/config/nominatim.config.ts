export const NominatimConfig = {
  baseUrl: "https://nominatim.openstreetmap.org",
  format: "json",
  language: "en",
  addressdetails: true,
  timeout: 5000,
  userAgent: "nestjs-nominatim/1.0",
  extratags: false,
  namedetails: false,
};
