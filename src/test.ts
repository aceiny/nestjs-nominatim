import { NestFactory } from "@nestjs/core";
import { NominatimModule } from "./nominatim.module";
import { NominatimService } from "./nominatim.service";
import {
  NominatimPlace,
  NominatimSearchResults,
} from "./types/nominatim.types";

async function bootstrap() {
  try {
    // Create a Nest application context
    const appContext = await NestFactory.createApplicationContext(
      NominatimModule.forRoot({
        baseUrl: "https://nominatim.openstreetmap.org",
        extratags: false,
        namedetails: false,
        language: "en",
        userAgent: "MyApp/1.0",
        timeout: 5000,
      }),
    );

    // Get the service from the DI container
    const nominatim = appContext.get(NominatimService);

    console.log("--- Starting Nominatim Service Tests ---");

    // Test 1: Health Check
    console.log("\n1. Running health check...");
    const status = await nominatim.healthCheck();
    console.log("Health check result:", status);

    // Test 2: Search for a place
    console.log("\n2. Searching for 'Paris'...");
    const searchResults: NominatimSearchResults =
      await nominatim.search("Paris");
    console.log("Search results:", searchResults.length, "places found.");
    if (searchResults.length > 0) {
      console.log("First result:", searchResults[0].display_name);

      // Test 3: Lookup by OSM ID from the search result
    }

    console.log("\n3. Looking up by OSM ID...");
    const osmIdToLookup = ["R146656", "W104393803", "N240109189"];
    const lookupResults = await nominatim.lookup(osmIdToLookup);
    console.log("Lookup results:", lookupResults.length, "places found.");
    if (lookupResults.length > 0) {
      console.log("Looked up place:", lookupResults[0].display_name);
    }

    // Test 4: Reverse geocoding from coordinates
    console.log(
      "\n4. Reverse geocoding for coordinates of Paris (48.8566, 2.3522)...",
    );
    const reverseResult: NominatimPlace = await nominatim.reverse({
      lat: 48.8566,
      lon: 2.3522,
    });
    console.log("Reverse geocoding result:", reverseResult.display_name);

    // Test 5: Format the location data
    console.log("\n5. Formatting the reverse geocoding result...");
    const formattedAddress = nominatim.formatLocation(reverseResult);
    console.log("Formatted address:", formattedAddress);

    console.log("\n--- All tests completed successfully ---");
    await appContext.close();
  } catch (error: any) {
    console.error("An error occurred during tests:", error.message);
    // Ensure the application context is closed even on error
    const appContext =
      await NestFactory.createApplicationContext(NominatimModule);
    await appContext.close();
  }
}

bootstrap();
