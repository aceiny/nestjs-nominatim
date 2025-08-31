export interface NominatimNameDetails {
  name?: string;
  "name:en"?: string;
  "name:fr"?: string;
  "name:es"?: string;
  "name:de"?: string;
  alt_name?: string;
  short_name?: string;
  old_name?: string;
  [key: string]: string | undefined; // any other possible language or alternate name
}
