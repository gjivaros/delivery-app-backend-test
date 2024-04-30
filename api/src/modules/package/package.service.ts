import { BaseService } from "../base.service";
import { Package, PackageModel } from "./package.model";

class PackageService extends BaseService<Package> {}

export const packageService = new PackageService(PackageModel);
