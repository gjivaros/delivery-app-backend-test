import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import * as middlewares from "./middlewares";
import { api } from "./modules/api";

import ws from "ws";
import { swaggerRouter } from "./modules/swagger/swagger";

require("dotenv").config();

export const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use("/api/v1", api);
app.use("/docs", swaggerRouter);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export const server = createServer(app);
export const io = new ws.Server({ server });
