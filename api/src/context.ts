import { boolVal, nbVal, strVal } from "@paroi/data-formatters-lib";
import * as dotenv from "dotenv";
import { dirname } from "path";
import { AppConfig } from "./configurations";

dotenv.config();

export const packageDir = dirname(__dirname);

export const appConfig: AppConfig = {
  database: {
    url: strVal(process.env.DATABASE_URL),
  },
  thisServer: {
    port: nbVal(process.env.PORT),
    url: strVal(process.env.SERVER_URL),
  },

  production: boolVal(process.env.PRODUCTION),
};
