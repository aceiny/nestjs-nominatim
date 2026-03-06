import { DynamicModule, Module, Provider } from "@nestjs/common";
import { NominatimService } from "./nominatim.service";
import { NominatimModuleOptions } from "./types/interfaces/options.interface";
import { HttpModule } from "@nestjs/axios";
import { NominatimConfig } from "./config/nominatim.config";
import { CacheModule } from "@nestjs/cache-manager";
import { CacheConfig } from "./config/cache.config";
import { NOMINATIM_MODULE_OPTIONS } from "./nominatim.constants";
import {
  NominatimModuleAsyncOptions,
  NominatimOptionsFactory,
} from "./nominatim.interfaces";

/**
 * Dynamic module for Nominatim integration with NestJS
 * Provides geocoding, reverse geocoding, and place lookup functionality
 */
@Module({})
export class NominatimModule {
  /**
   * Configure the Nominatim module with custom options
   * @param options Configuration options for the Nominatim service
   * @returns A configured dynamic module
   */
  static forRoot(options: NominatimModuleOptions = {}): DynamicModule {
    const resolvedOptions = NominatimModule.resolveOptions(options);
    return {
      module: NominatimModule,
      global: true,
      imports: [
        HttpModule,
        CacheModule.register({
          ...(resolvedOptions.cache ?? CacheConfig),
        }),
      ],
      providers: [
        {
          provide: NOMINATIM_MODULE_OPTIONS,
          useValue: resolvedOptions,
        },
        NominatimService,
      ],
      exports: [NominatimService],
    };
  }

  /**
   * Configure the Nominatim module asynchronously
   * Supports useFactory, useClass, and useExisting patterns
   * @param options Async configuration options
   * @returns A configured dynamic module
   */
  static forRootAsync(options: NominatimModuleAsyncOptions): DynamicModule {
    const asyncProviders = this.createAsyncProviders(options);
    return {
      module: NominatimModule,
      global: true,
      imports: [
        HttpModule,
        CacheModule.registerAsync({
          useFactory: (opts: NominatimModuleOptions) =>
            opts.cache ?? CacheConfig,
          inject: [NOMINATIM_MODULE_OPTIONS],
        }),
        ...(options.imports ?? []),
      ],
      providers: [...asyncProviders, NominatimService],
      exports: [NominatimService],
    };
  }

  private static createAsyncProviders(
    options: NominatimModuleAsyncOptions,
  ): Provider[] {
    if (options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    const providers: Provider[] = [this.createAsyncOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: NominatimModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: NOMINATIM_MODULE_OPTIONS,
        useFactory: async (...args: any[]) => {
          const opts = await options.useFactory!(...args);
          return NominatimModule.resolveOptions(opts);
        },
        inject: options.inject ?? [],
      };
    }

    const inject = options.useExisting ?? options.useClass;
    return {
      provide: NOMINATIM_MODULE_OPTIONS,
      useFactory: async (factory: NominatimOptionsFactory) => {
        const opts = await factory.createNominatimOptions();
        return NominatimModule.resolveOptions(opts);
      },
      inject: inject ? [inject] : [],
    };
  }

  private static resolveOptions(
    options: NominatimModuleOptions,
  ): NominatimModuleOptions {
    return {
      baseUrl: options.baseUrl ?? NominatimConfig.baseUrl,
      language: options.language ?? NominatimConfig.language,
      addressdetails: options.addressdetails ?? NominatimConfig.addressdetails,
      timeout: options.timeout ?? NominatimConfig.timeout,
      userAgent: options.userAgent ?? NominatimConfig.userAgent,
      extratags: options.extratags ?? NominatimConfig.extratags,
      namedetails: options.namedetails ?? NominatimConfig.namedetails,
      cache: options.cache,
    };
  }
}
