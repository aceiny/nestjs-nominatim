import { DynamicModule, Module } from "@nestjs/common";
import { NominatimService } from "./nominatim.service";
import { NominatimModuleOptions } from "./types/interfaces/options.interface";
import { HttpModule } from "@nestjs/axios";
import { NominatimConfig } from "./config/nominatim.config";

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
    return {
      module: NominatimModule,
      imports: [HttpModule],
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
