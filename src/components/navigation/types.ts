import { BaseAttrs, BaseState } from "base/types";
import { Pages } from "state/CurrentPageState/types";
import { MapStyleTypes } from "state/UserData/types";

export interface NavigationAttrs extends BaseAttrs {}

export interface NavigationState extends BaseState {
  navShown: boolean;
  CurrentPage: Pages;
  mapOptionMaps: mapboxgl.Map[];
}

export interface IMapOptions {
  id: string;
  label: string;
  mapType: MapStyleTypes;
}
