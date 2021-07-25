import {BaseState, BaseAttrs} from "base/types"
import mapboxgl from "mapbox-gl";
import { locationData, locationHeaderData } from "state/GameData/types";
import { MapStyle } from "state/UserData/types";

export interface RoundEndModalState extends BaseState {
    locationHeaderData: locationHeaderData;
    locationData: locationData;
    roundEndCountdown: number;
    map: mapboxgl.Map;
    mapStyle: MapStyle;
    locationMarker: mapboxgl.Marker;
    playerLocationMarkers: mapboxgl.Marker[];
    yourData: {
        playerDistancekm: number;
        addedScore: number;
    }
}

export interface RoundEndModalAttrs extends BaseAttrs {}