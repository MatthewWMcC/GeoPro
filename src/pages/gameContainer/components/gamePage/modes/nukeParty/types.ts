import { BaseAttrs, BaseState } from "base/types";
import {
  countryType,
  questionType,
} from "state/GameData/modes/NukePartyData/types";

export interface NukePartyState extends BaseState {
  selected?: countryType;
  myTurn: boolean;
  question: questionType;
}

export interface NukePartyAttrs extends BaseAttrs {}
