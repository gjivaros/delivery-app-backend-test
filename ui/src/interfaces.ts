export interface LocationAsItem {
  lat: number;
  lng: number;
}

export interface PackageAsItem {
  package_id: string;
  description: string;
  weight: number;
  width: number;
  height: number;
  depth: number;
  from_name: string;
  from_address: string;
  from_location: LocationAsItem;
  to_name: string;
  to_address: string;
  to_location: LocationAsItem;
  active_delivery_id?: string;
}

export type DeliveryStatus =
  | "open"
  | "picked_up"
  | "in_transit"
  | "delivered"
  | "failed";

export interface DeliveryAsItem {
  delivery_id: string;
  package_id: string;
  location: LocationAsItem;
  status: DeliveryStatus;
  start_time?: string;
  end_time?: string;
  pickup_time?: string;
}

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
  delivery_object: DeliveryAsItem;
}

export type EventData = LocationChanged | StatusChanged | DeliveryUpdated;
