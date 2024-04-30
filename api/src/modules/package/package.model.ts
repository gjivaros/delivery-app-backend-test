import mongoose, { Schema, SchemaTypes } from "mongoose";

export interface Location {
  lat: number;
  lng: number;
}
export interface Package {
  package_id: string;
  active_delivery_id: string;
  description: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  from_location: Location;
  to_name: string;
  to_address: string;
  to_location: Location;
}
export const LocationSchema = new Schema<Location>({
  lat: SchemaTypes.Number,
  lng: SchemaTypes.Number,
});

const packageSchema = new Schema<Package>({
  package_id: {
    type: SchemaTypes.String,
    required: true,
    _id: true,
  },

  active_delivery_id: {
    type: SchemaTypes.String,
    ref: "Delivery",
    required: false,
  },

  description: {
    type: SchemaTypes.String,
    required: false,
  },

  weight: {
    type: SchemaTypes.Number,
    required: true,
  },

  width: {
    type: SchemaTypes.Number,
    required: true,
  },

  height: {
    type: SchemaTypes.Number,
    required: true,
  },

  depth: {
    type: SchemaTypes.Number,
    required: true,
  },

  from_name: {
    type: SchemaTypes.String,
    required: true,
  },

  from_address: {
    type: SchemaTypes.String,
    required: true,
  },

  from_location: {
    type: LocationSchema,
    required: true,
  },

  to_name: {
    type: SchemaTypes.String,
    required: true,
  },

  to_address: {
    type: SchemaTypes.String,
    required: true,
  },

  to_location: {
    type: LocationSchema,
    required: true,
  },
});

export const PackageModel = mongoose.model<Package>("Package", packageSchema);
