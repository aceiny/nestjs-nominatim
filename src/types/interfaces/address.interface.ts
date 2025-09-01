/**
 * Represents the detailed address components returned by the Nominatim API
 * when addressdetails=true is specified in the request.
 *
 * This interface contains all possible address fields that Nominatim might return,
 * organized by hierarchy level from most specific to most general.
 *
 * @see {@link https://nominatim.org/release-docs/develop/api/Output/#addressdetails Nominatim Address Details Documentation}
 */
export interface NominatimAddress {
  // Building/Street Level
  /** House or building number */
  house_number?: string;

  /** Primary road or street name */
  road?: string;

  /** Alternative street designation */
  street?: string;

  /** Highway or major road designation */
  highway?: string;

  /** Residential area or street */
  residential?: string;

  /** Pedestrian area or walkway */
  pedestrian?: string;

  /** House or building name */
  house?: string;

  /** Building name or designation */
  building?: string;

  /** Public building name */
  public_building?: string;

  /** Amenity name (restaurant, hospital, etc.) */
  amenity?: string;

  /** Shop or commercial establishment name */
  shop?: string;

  /** Tourism-related location (hotel, museum, etc.) */
  tourism?: string;

  /** Leisure facility (park, sports center, etc.) */
  leisure?: string;

  /** Craft or industrial facility */
  craft?: string;

  /** Office building or complex */
  office?: string;

  /** Land use designation */
  landuse?: string;

  // Neighborhood/District Level
  /** Neighborhood or local area name */
  neighbourhood?: string;

  /** Suburb designation */
  suburb?: string;

  /** City district */
  city_district?: string;

  /** Administrative district */
  district?: string;

  /** Borough (mainly used in UK/US) */
  borough?: string;

  // City/Town Level
  /** City name */
  city?: string;

  /** Town name */
  town?: string;

  /** Village name */
  village?: string;

  /** Hamlet or small settlement */
  hamlet?: string;

  /** Municipality name */
  municipality?: string;

  /** Locality designation */
  locality?: string;

  /** County name */
  county?: string;

  /** State district */
  state_district?: string;

  /** State or province name */
  state?: string;

  /** Region name */
  region?: string;

  // Country/Postal Level
  /** Postal code or ZIP code */
  postcode?: string;

  /** Country name */
  country?: string;

  /** ISO 3166-1 alpha-2 country code (e.g., "US", "FR", "DE") */
  country_code?: string;

  // ISO 3166-2 Regional Codes
  /** ISO 3166-2 level 2 subdivision code */
  "ISO3166-2-lvl2"?: string;

  /** ISO 3166-2 level 4 subdivision code */
  "ISO3166-2-lvl4"?: string;

  /** ISO 3166-2 level 6 subdivision code */
  "ISO3166-2-lvl6"?: string;

  /** ISO 3166-2 level 8 subdivision code */
  "ISO3166-2-lvl8"?: string;
}
