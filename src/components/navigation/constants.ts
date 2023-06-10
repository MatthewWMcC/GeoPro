import { MapStyleTypes } from "state/UserData/types";
import { IMapOptions } from "./types";

export const mapOptions: IMapOptions[] = [
  {
    id: "dark-map-option",
    label: "Dark",
    mapType: MapStyleTypes.DARK,
  },
  {
    id: "light-map-option",
    label: "Light",
    mapType: MapStyleTypes.LIGHT,
  },
  {
    id: "street-map-option",
    label: "Street",
    mapType: MapStyleTypes.STREET,
  },
];
