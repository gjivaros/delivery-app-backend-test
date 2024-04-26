import { Router } from "express";
import { deliveryController } from "./delivery/delivery.controller";
import { packageController } from "./package/package.controller";

export const api = Router()

api.use("/delivery", deliveryController)
api.use("/package", packageController)