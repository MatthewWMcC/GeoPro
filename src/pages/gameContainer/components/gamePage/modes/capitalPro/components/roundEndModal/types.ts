import { BaseState, BaseAttrs } from "base/types";
import { IWikiModalData } from "global/types";
import mapboxgl from "mapbox-gl";
import { LocationData } from "state/GameData/modes/CapitalProData/types";
import { MapStyleTypes } from "state/UserData/types";

export interface RoundEndModalState extends BaseState {
  locationData: LocationData;
  roundEndCountdown: number;
  map: mapboxgl.Map;
  mapStyle: MapStyleTypes;
  locationMarker: mapboxgl.Marker;
  playerLocationMarkers: mapboxgl.Marker[];
  yourData: {
    playerDistancekm: number;
    addedScore: number;
  };
  wikiData: IWikiModalData;
}

export interface RoundEndModalAttrs extends BaseAttrs {}
