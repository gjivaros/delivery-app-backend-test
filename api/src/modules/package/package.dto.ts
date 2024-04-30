import { body } from "express-validator";
import { Location } from "./package.model";

export interface createPackage {
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

export const createPackageSchema = [
  body("description").exists().isString(),
  body("weight").exists().isFloat(),
  body("width").exists().isFloat(),
  body("height").exists().isFloat(),
  body("depth").exists().isFloat(),
  body("from_name").exists().isString(),
  body("from_address").exists().isString(),
  body("to_name").exists().isString(),
  body("to_address").exists().isString(),
  body("from_location.lat").exists().isFloat(),
  body("to_location.lat").exists().isFloat(),
  body("from_location.lng").exists().isFloat(),
  body("to_location.lng").exists().isFloat(),
];

export const updatePackageSchema = [
  body("description").optional().isString(),
  body("weight").optional().isFloat(),
  body("width").optional().isFloat(),
  body("height").optional().isFloat(),
  body("depth").optional().isFloat(),
  body("from_name").optional().isString(),
  body("from_address").optional().isString(),
  body("to_name").optional().isString(),
  body("to_address").optional().isString(),
  body("from_location.lat").optional().isFloat(),
  body("to_location.lat").optional().isFloat(),
  body("from_location.lng").optional().isFloat(),
  body("to_location.lng").optional().isFloat(),
];
