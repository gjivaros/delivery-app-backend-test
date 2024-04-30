export interface AppConfig {
  thisServer: {
    port: number;
    url: string;
  };
  database: {
    url: string;
  };
  production: boolean;
}
