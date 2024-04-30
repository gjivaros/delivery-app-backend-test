import { Delivery, DeliveryStatus } from "../modules/delivery/delivery.model";
import { formatLocation } from "./format-location";

export function formatDeliveryEditWithStatus(data: any): Partial<Delivery> {
  if ("status" in data) {
    switch (data.status as DeliveryStatus) {
      case "delivered":
        return {
          status: "delivered",
          end_time: new Date(),
          location: data.location ? formatLocation(data.location) : undefined,
        };

      case "failed":
        return {
          status: "failed",
          end_time: new Date(),
          location: data.location ? formatLocation(data.location) : undefined,
        };

      case "in_transit":
        return {
          start_time: new Date(),
          status: "in_transit",
          location: data.location ? formatLocation(data.location) : undefined,
        };

      case "picked_up":
        return {
          status: "picked_up",
          pickup_time: new Date(),
          location: data.location ? formatLocation(data.location) : undefined,
        };

      default:
        return {
          location: data.location ? formatLocation(data.location) : undefined,
        };
    }
  }

  if ("location" in data) {
    return {
      location: data.location ? formatLocation(data.location) : undefined,
    };
  }

  return {};
}
