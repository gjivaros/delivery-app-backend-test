import mongoose, { Schema, SchemaTypes } from "mongoose";
import { Location, LocationSchema } from "../package/package.model";

export type DeliveryStatus =
  | "open"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "failed";

export interface Delivery {
  delivery_id: string;
  package_id: string;
  pickup_time?: Date;
  start_time?: Date;
  end_time?: Date;
  location: Location;
  status: DeliveryStatus;
}

const deliverySchema = new Schema<Delivery>({
  delivery_id: {
    type: SchemaTypes.String,
    _id: true,
    required: true,
  },

  package_id: {
    type: SchemaTypes.String,
    ref: "Package",
    required: true,
  },

  pickup_time: {
    type: SchemaTypes.Date,
    required: false,
  },

  start_time: {
    type: SchemaTypes.Date,
    required: false,
  },

  end_time: {
    type: SchemaTypes.Date,
    required: false,
  },

  location: {
    type: LocationSchema,
    required: true,
  },

  status: {
    type: SchemaTypes.String,
    enum: ["open", "picked_up", "in_transit", "delivered", "failed"],
    required: true,
  },
});

export const DeliveryModel = mongoose.model<Delivery>(
  "Delivery",
  deliverySchema
);
