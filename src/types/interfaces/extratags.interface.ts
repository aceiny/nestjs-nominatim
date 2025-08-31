export interface NominatimExtraTags {
  wikidata?: string;
  wikipedia?: string;
  operator?: string;
  tourism?: string;
  historic?: string;
  capacity?: string;
  [key: string]: string | undefined; // for any other possible tag
}
