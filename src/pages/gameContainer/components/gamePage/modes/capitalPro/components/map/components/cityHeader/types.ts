import { BaseAttrs, BaseState } from "base/types";
import { LocationData } from "state/GameData/modes/CapitalProData/types";

export interface CityHeaderAttrs extends BaseAttrs {}

export interface CityHeaderState extends BaseState {
  locationData: LocationData;
  countdown: number;
  roundNumber: number;
  currentMapGuess?: mapboxgl.LngLatLike;
  submitActive: boolean;
  roomId: string;
}
