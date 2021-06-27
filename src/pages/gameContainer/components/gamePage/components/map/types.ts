import {BaseState, BaseAttrs} from "base/types"
import mapboxgl from "mapbox-gl";
import { MapStyle } from "state/UserData/types";

export interface MapState extends BaseState {
    mapStyle: MapStyle;
    map: mapboxgl.Map;
}

export interface MapAttrs extends BaseAttrs {

}