import { OSMType } from "../enum/osm-type.enum";
import { NominatimAddress } from "./address.interface";
import { NominatimExtraTags } from "./extratags.interface";
import { NominatimNameDetails } from "./namedetails.interface";

export interface NominatimPlace {
  place_id: number;
  licence: string;
  osm_type: OSMType;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype?: string;
  name?: string;
  display_name: string;
  extratags?: NominatimExtraTags;
  namedetails?: NominatimNameDetails;
  address?: NominatimAddress;
  boundingbox: [string, string, string, string];
}
