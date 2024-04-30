import { BaseService } from "../base.service";
import { Delivery, DeliveryModel } from "./delivery.model";

class DeliveryService extends BaseService<Delivery> {}

export const deliveryService = new DeliveryService(DeliveryModel);
