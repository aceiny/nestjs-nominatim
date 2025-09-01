import { DynamicModule, Module } from "@nestjs/common";
import { NominatimService } from "./nominatim.service";
import { NominatimModuleOptions } from "./types/interfaces/options.interface";
import { HttpModule } from "@nestjs/axios";
import { NominatimConfig } from "./config/nominatim.config";
import { CacheModule } from "@nestjs/cache-manager";
import { CashConfig } from "./config/cash.config";

@Module({})
export class NominatimModule {
  static forRoot(options: NominatimModuleOptions = {}): DynamicModule {
    const baseUrl = options.baseUrl ?? NominatimConfig.baseUrl;
    const language = options.language ?? NominatimConfig.language;
    const addressdetails =
      options.addressdetails ?? NominatimConfig.addressdetails;
    const timeout = options.timeout ?? NominatimConfig.timeout;
    const userAgent = options.userAgent ?? NominatimConfig.userAgent;
    const extratags = options.extratags ?? NominatimConfig.extratags;
    const namedetails = options.namedetails ?? NominatimConfig.namedetails;
    const cache = options.cache ?? CashConfig;
    return {
      module: NominatimModule,
      imports: [
        HttpModule,
        CacheModule.register({
          ...cache,
        }),
      ],
      providers: [
        {
          provide: "NOMINATIM_OPTIONS",
          useValue: {
            baseUrl,
            language,
            addressdetails,
            timeout,
            userAgent,
            extratags,
            namedetails,
          },
        },
        NominatimService,
      ],
      exports: [NominatimService],
    };
  }
}
