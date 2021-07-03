import { BaseAttrs, BaseState } from "base/types";
import { locationHeaderData } from "state/GameData/types";

export interface CityHeaderAttrs extends BaseAttrs{}

export interface CityHeaderState extends BaseState{
    locationHeaderData: locationHeaderData;
    countdown: number;
}