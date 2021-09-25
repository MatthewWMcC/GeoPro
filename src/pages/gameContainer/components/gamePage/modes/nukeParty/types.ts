import { BaseAttrs, BaseState } from "base/types";
import {
  countryType,
  guessStatus,
  nukePartyViewStates,
  questionType,
} from "state/GameData/modes/NukePartyData/types";
import { GameViewStates } from "state/GameData/types";

export interface NukePartyState extends BaseState {
  selected?: countryType;
  myTurn: boolean;
  question: questionType;
  canGuess: boolean;
  guessStatus?: guessStatus;
  viewState: nukePartyViewStates | GameViewStates;
  winner?: string;
}

export interface NukePartyAttrs extends BaseAttrs {}
