import { nbValOrUndef, strVal } from "@paroi/data-formatters-lib";
import { randomUUID } from "crypto";
import { Request, Response, Router } from "express";
import { appLog } from "../../share/app-log";
import { inputValidator } from "../input-validator";
import { createPackageSchema, updatePackageSchema } from "./package.dto";
import { packageService } from "./package.service";

export const packageController = Router();

packageController.get("/", async (req, res) => {
  const limit = nbValOrUndef(req.query.limit) ?? 20;
  const page = nbValOrUndef(req.query.page) ?? 1;
  const deliveries = await packageService.find({ limit, page });
  return res.json(deliveries);
});

packageController.get("/:id", async (req, res) => {
  const id = strVal(req.params.id);
  const packages = await packageService.findOne({ package_id: id });

  if (!packages) {
    return res.status(404).json({
      code: "NOT_FOUND",
      message: `can't find package '${id}'`,
    });
  }
  return res.json(packages);
});

packageController.post(
  "/",
  createPackageSchema,
  inputValidator,
  async (req: Request, res: Response) => {
    const package_id = randomUUID();

    const data = await packageService.create({
      ...req.body,
      package_id,
    });

    return res.json(data);
  }
);

packageController.put(
  "/:id",
  updatePackageSchema,
  inputValidator,
  async (req: Request, res: Response) => {
    try {
      const id = strVal(req.params.id);

      await packageService.update({ package_id: id }, req.body);

      const data = await packageService.findOne({ package_id: id });

      if (!data) {
        return res.status(404).json({
          code: "NOT_FOUND",
          message: `package '${id}' not found`,
        });
      }

      return res.json(data);
    } catch (error) {
      appLog.error("update-package-error", error);
      return res.status(500).json({
        code: "SERVER_ERROR",
        message: "an error occurred while modifying the package",
      });
    }
  }
);

packageController.delete("/:id", async (req, res) => {
  const id = strVal(req.params.id);

  const response = await packageService.delete({ package_id: id });

  return res.json(response);
});
