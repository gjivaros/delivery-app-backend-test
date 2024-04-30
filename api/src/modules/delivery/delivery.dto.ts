import { body } from "express-validator";
import { Location } from "../package/package.model";
import { DeliveryStatus } from "./delivery.model";
export interface CreateDelivery {
  package_id: string;
  location: Location;
}

export interface UpdateDelivery {
  location?: Location;
  status?: DeliveryStatus;
}

const createDeliveryLocationSchema = [
  body("location.lat").exists().isFloat(),
  body("location.lng").exists().isFloat(),
];

export const createDeliverySchema = [
  body("package_id").exists().isString(),
  ...createDeliveryLocationSchema,
];

const updateDeliveryLocationSchema = [
  body("location.lat").optional().isFloat(),
  body("location.lng").optional().isFloat(),
];

export const updateDeliverySchema = [
  body("status")
    .optional()
    .isIn(["open", "picked_up", "in_transit", "delivered", "failed"]),
  ...updateDeliveryLocationSchema,
];
