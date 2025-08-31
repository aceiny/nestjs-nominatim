export interface FormattedAddress {
  country: string | null;
  countryCode: string | null;
  postcode: string | null;
  region: string | null;
  regionCode: string | null;
  commune: string | null;
  district: string | null;
  street: string | null;
  placeType: string | null;
  fullAddress?: string | null;
}
