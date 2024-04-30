import { nbVal } from "@paroi/data-formatters-lib";
import { Location } from "../modules/package/package.model";

export function formatLocation(data: any): Location {
  return {
    lat: nbVal(data.lat),
    lng: nbVal(data.lng),
  };
}
