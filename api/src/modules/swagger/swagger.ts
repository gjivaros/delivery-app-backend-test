import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { swaggerDefinition } from "./swagger-definition";
export const swaggerRouter = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ["components.yaml", "swagger-docs.js"],
});

swaggerRouter.use("/", swaggerUi.serve);
swaggerRouter.get(
  "/",
  swaggerUi.setup(specs, {
    explorer: true,
  })
);
