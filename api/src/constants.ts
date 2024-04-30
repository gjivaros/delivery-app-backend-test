import { Delivery, DeliveryStatus } from "./modules/delivery/delivery.model";
import { Location } from "./modules/package/package.model";

export const EVENT = {
  LOCATON_CHANGED: "location_changed",
  STATUS_CHANGED: "status_changed",
  DELIVERY_UPDATED: "delivery_updated",
} as const;

export interface LocationChanged {
  event: typeof EVENT.LOCATON_CHANGED;
  delivery_id: string;
  location: Location;
}

export interface StatusChanged {
  event: typeof EVENT.STATUS_CHANGED;
  delivery_id: string;
  status: DeliveryStatus;
}

export interface DeliveryUpdated {
  event: typeof EVENT.DELIVERY_UPDATED;
  delivery_object: Delivery;
}

export type EventData = LocationChanged | StatusChanged | DeliveryUpdated;
