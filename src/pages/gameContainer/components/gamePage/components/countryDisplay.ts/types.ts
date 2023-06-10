import { guessStatus } from "state/GameData/modes/NukePartyData/types";

export interface CountryDisplayState {}
export interface CountryDisplayAttrs {
  name?: string;
  countryCode?: string;
  guessStatus?: guessStatus;
}
