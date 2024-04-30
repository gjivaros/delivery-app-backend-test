import { nbValOrUndef, strVal } from "@paroi/data-formatters-lib";
import { randomUUID } from "crypto";
import { Request, Response, Router } from "express";
import { formatDeliveryEditWithStatus } from "../../helpers/format-update-delivery-input";
import { createDeliverySchema, updateDeliverySchema } from "./delivery.dto";

import { appLog } from "../../share/app-log";
import { inputValidator } from "../input-validator";
import { packageService } from "../package/package.service";
import { deliveryService } from "./delivery.service";

export const deliveryController = Router();

deliveryController.get("/", async (req, res) => {
  const limit = nbValOrUndef(req.query.limit) ?? 20;
  const page = nbValOrUndef(req.query.page) ?? 1;
  const deliveries = await deliveryService.find({ limit, page });
  return res.json(deliveries);
});

deliveryController.get("/:id", async (req, res) => {
  const id = strVal(req.params.id);
  const delivery = await deliveryService.findOne({ delivery_id: id });

  if (!delivery) {
    return res.status(404).json({
      code: "NOT_FOUND",
      message: `can't find delivery '${id}'`,
    });
  }

  return res.json(delivery);
});

deliveryController.post(
  "/",
  createDeliverySchema,
  inputValidator,
  async (req: Request, res: Response) => {
    const packageData = await packageService.findOne({
      package_id: req.body.package_id,
    });

    if (!packageData) {
      return res.status(404).json({
        code: "NOT_FOUND",
        message: `package '${req.body.package_id}' not found`,
      });
    }

    const delivery_id = randomUUID();

    const delivery = await deliveryService.create({
      ...req.body,
      status: "open",
      delivery_id,
      package_id: packageData.package_id,
    });

    packageData.active_delivery_id = delivery.delivery_id;
    await packageData.save();

    return res.json(delivery);
  }
);

deliveryController.put(
  "/:id",
  updateDeliverySchema,
  inputValidator,
  async (req: Request, res: Response) => {
    try {
      const id = strVal(req.params.id);
      await deliveryService.update(
        { delivery_id: id },
        formatDeliveryEditWithStatus(req.body)
      );

      const data = await deliveryService.findOne({ delivery_id: id });

      if (!data) {
        return res.status(404).json({
          code: "NOT_FOUND",
          message: `delivery< '${id}' not found`,
        });
      }

      return res.json(data);
    } catch (error) {
      appLog.error("update-delivery-error", error);
      return res.status(500).json({
        code: "SERVER_ERROR",
        message: "an error occurred while modifying the delivery",
      });
    }
  }
);

deliveryController.delete("/:id", async (req, res) => {
  const id = strVal(req.params.id);

  const response = await deliveryService.delete({ delivery_id: id });

  return res.json(response);
});
