import { ModuleMetadata, Type } from "@nestjs/common";
import { NominatimModuleOptions } from "./types/interfaces/options.interface";

/**
 * Factory for creating NominatimModuleOptions
 */
export interface NominatimOptionsFactory {
  createNominatimOptions():
    | Promise<NominatimModuleOptions>
    | NominatimModuleOptions;
}

/**
 * Async configuration options for NominatimModule.forRootAsync()
 */
export interface NominatimModuleAsyncOptions extends Pick<
  ModuleMetadata,
  "imports"
> {
  /**
   * Class that implements NominatimOptionsFactory
   */
  useClass?: Type<NominatimOptionsFactory>;

  /**
   * Existing provider to reuse for creating options
   */
  useExisting?: Type<NominatimOptionsFactory>;

  /**
   * Factory function to create options
   */
  useFactory?: (
    ...args: any[]
  ) => Promise<NominatimModuleOptions> | NominatimModuleOptions;

  /**
   * Dependencies to inject into the factory function
   */
  inject?: any[];
}
