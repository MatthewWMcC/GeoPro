import { BaseState, BaseAttrs } from "base/types";
import mapboxgl from "mapbox-gl";
import { CapitalProState } from "state/GameData/modes/CapitalProData/types";
import { MapStyleTypes } from "state/UserData/types";

export interface MapState extends BaseState {
  mapStyle: MapStyleTypes;
  map: mapboxgl.Map;
  marker: mapboxgl.Marker;
  bestMarker: mapboxgl.Marker;
  viewState: CapitalProState;
}

export interface MapAttrs extends BaseAttrs {}
