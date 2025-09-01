import { CacheManagerOptions } from "@nestjs/cache-manager";

export const CashConfig: CacheManagerOptions = {
  ttl: 86400000, // 1 day (in ms)
  namespace: "nominatim",
  refreshThreshold: 60000, // refresh if < 1 min left
  nonBlocking: false, // block until store writes are done
  stores: [], // defaults to in-memory if empty
};
