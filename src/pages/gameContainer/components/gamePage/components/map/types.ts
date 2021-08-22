import {BaseState, BaseAttrs} from "base/types"
import mapboxgl from "mapbox-gl";
import { CapitalProState } from "state/capitalProData/types";
import { MapStyle } from "state/UserData/types";

export interface MapState extends BaseState {
    mapStyle: MapStyle;
    map: mapboxgl.Map;
    marker: mapboxgl.Marker;
    bestMarker: mapboxgl.Marker;
    viewState: CapitalProState
}

export interface MapAttrs extends BaseAttrs {}