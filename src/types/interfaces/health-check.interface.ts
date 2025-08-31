export interface HealthCheck {
  status: number | string;
  message: string;
  data_updated?: string;
  software_version?: string;
  database_version?: string;
}
