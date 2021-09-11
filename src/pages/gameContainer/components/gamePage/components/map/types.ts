import { MapState, MapAttrs } from "base/types";
import { MapStyleTypes } from "state/UserData/types";

export interface IMapState extends MapState {
  preferedMapStyle: MapStyleTypes;
  myTurn?: boolean;
}

export interface IMapAttrs extends MapAttrs {}
