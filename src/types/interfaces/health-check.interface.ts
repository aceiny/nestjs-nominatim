/**
 * Represents the health status response from the Nominatim API status endpoint.
 *
 * This interface provides information about the API's operational status,
 * database state, and version information. Useful for monitoring and
 * ensuring service availability.
 *
 * @example
 * ```typescript
 * const health: HealthCheck = {
 *   status: 0,           // 0 = OK, non-zero = error
 *   message: "OK",       // Human-readable status
 *   data_updated: "2023-12-01T10:30:00Z",
 *   software_version: "4.2.3",
 *   database_version: "2023-11-28"
 * };
 * ```
 *
 * @see {@link https://nominatim.org/release-docs/develop/api/Status/ Nominatim Status API Documentation}
 */
export interface HealthCheck {
  /**
   * Numeric or string status indicator
   * 0 or "OK" typically indicates healthy status
   * Non-zero values indicate various error conditions
   */
  status: number | string;

  /**
   * Human-readable status message
   * Common values: "OK", "Database connection failed", etc.
   */
  message: string;

  /**
   * Timestamp of when the OpenStreetMap data was last updated
   * Format: ISO 8601 date string
   * @optional Only present if the API provides this information
   */
  data_updated?: string;

  /**
   * Version of the Nominatim software running on the server
   * @optional Only present if the API provides this information
   */
  software_version?: string;

  /**
   * Version or date of the database being used
   * @optional Only present if the API provides this information
   */
  database_version?: string;
}
