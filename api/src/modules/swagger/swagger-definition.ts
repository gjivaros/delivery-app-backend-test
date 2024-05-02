import { appConfig } from "../../context";

export const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API documentation",
    version: "0.0.1",
    description: "Gozem test api documentation",
  },
  servers: [
    {
      url: `http://localhost:${appConfig.thisServer.port}/api/v1`,
      description: "Development Server",
    },
  ],
};
