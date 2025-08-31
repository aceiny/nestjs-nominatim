export interface NominatimAddress {
  house_number?: string;
  road?: string;
  street?: string;
  highway?: string;
  residential?: string;
  pedestrian?: string;
  house?: string;
  building?: string;
  public_building?: string;
  amenity?: string;
  shop?: string;
  tourism?: string;
  leisure?: string;
  craft?: string;
  office?: string;
  landuse?: string;

  neighbourhood?: string;
  suburb?: string;
  city_district?: string;
  district?: string;
  borough?: string;

  city?: string;
  town?: string;
  village?: string;
  hamlet?: string;
  municipality?: string;
  locality?: string;
  county?: string;
  state_district?: string;
  state?: string;
  region?: string;

  postcode?: string;
  country?: string;
  country_code?: string;

  "ISO3166-2-lvl2"?: string;
  "ISO3166-2-lvl4"?: string;
  "ISO3166-2-lvl6"?: string;
  "ISO3166-2-lvl8"?: string;
}
